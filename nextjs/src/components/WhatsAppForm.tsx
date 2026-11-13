'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState, type FormEvent, type RefObject } from 'react';
import {
  formStatus,
  genericErrors,
  type FormField,
  type FormRow,
  type WhatsAppFormConfig,
} from '@/content/forms';
import { mailtoLink, site, waLink } from '@/content/site';
import { getFromPage, getOrigin } from '@/lib/attribution';
import { withMarkers } from '@/lib/markers';
import { buildMailto, buildWhatsAppMessage, type FieldLabels } from '@/lib/whatsapp';
import { Icon } from './Icon';
import { NewTab } from './NewTab';

/**
 * Formulário que vira mensagem pronta no WhatsApp (sem back-end).
 *
 * - Validação própria em pt-BR (noValidate): erro abaixo do campo, aria-invalid,
 *   aria-describedby e foco no primeiro inválido.
 * - Envio honesto: abre wa.me SEM 'noopener' na feature string para saber se o pop-up abriu;
 *   zera `opener` em seguida. Status A (abriu) ou B (bloqueado, com botão para abrir) e
 *   alternativa por e-mail com o mesmo texto.
 * - Linhas automáticas *Origem:* (UTMs) e *Página:* (página anterior / fixa na LP).
 * - Pré-seleção pela URL (?blend=Smash, ?volume=…, ?mensagem=…) com aviso "Blend escolhido".
 */

type Status = { kind: 'opened' | 'blocked'; wa: string; mail: string };
type Errors = Record<string, string>;

const flattenRows = (rows: FormRow[]): FormField[] => rows.flatMap((row) => (Array.isArray(row) ? row : [row]));

function OptionalTag({ show }: { show?: boolean }) {
  return show ? (
    <>
      {' '}
      <span className="optional">(opcional)</span>
    </>
  ) : null;
}

type FieldProps = { field: FormField; idPrefix: string; error?: string; onEdit: (name: string) => void };

function Field({ field, idPrefix, error, onEdit }: FieldProps) {
  const id = `${idPrefix}-${field.id}`;
  const errorId = `${id}-erro`;
  const a11y = {
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
  } as const;
  const errorText = error ? (
    <p className="field__error" id={errorId}>
      {error}
    </p>
  ) : null;
  const clear = () => onEdit(field.name);

  switch (field.type) {
    case 'select':
      return (
        <div className="field">
          <label htmlFor={id}>
            {field.label}
            <OptionalTag show={field.optional} />
          </label>
          <select id={id} name={field.name} required={field.required} defaultValue="" onChange={clear} {...a11y}>
            <option value="">Selecione</option>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errorText}
        </div>
      );

    case 'checkboxes':
      return (
        <fieldset className="field">
          <legend>
            {field.label}
            <OptionalTag show={field.optional} />
          </legend>
          <div className="checks">
            {field.options.map((option) => (
              <label className="check" key={option}>
                <input type="checkbox" name={field.name} value={option} />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>
      );

    case 'textarea':
      return (
        <div className="field">
          <label htmlFor={id}>
            {field.label}
            <OptionalTag show={field.optional} />
          </label>
          <textarea
            id={id}
            name={field.name}
            required={field.required}
            placeholder={field.placeholder}
            onChange={clear}
            {...a11y}
          />
          {errorText}
        </div>
      );

    default:
      return (
        <div className="field">
          <label htmlFor={id}>
            {field.label}
            <OptionalTag show={field.optional} />
          </label>
          <input
            id={id}
            name={field.name}
            type="text"
            autoComplete={field.autoComplete}
            placeholder={field.placeholder}
            required={field.required}
            onChange={clear}
            {...a11y}
          />
          {errorText}
        </div>
      );
  }
}

/** Marca/preenche campos a partir da query string e informa os blends escolhidos. */
function PrefillFromUrl({
  formRef,
  onPicked,
}: {
  formRef: RefObject<HTMLFormElement | null>;
  onPicked: (values: string[]) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    searchParams.forEach((value, key) => {
      form.querySelectorAll(`[name="${CSS.escape(key)}"]`).forEach((field) => {
        if (field instanceof HTMLInputElement && (field.type === 'checkbox' || field.type === 'radio')) {
          if (field.value.toLowerCase() === value.toLowerCase()) field.checked = true;
        } else if (field instanceof HTMLSelectElement) {
          if (!field.value && [...field.options].some((o) => o.value === value)) field.value = value;
        } else if (
          field instanceof HTMLTextAreaElement ||
          (field instanceof HTMLInputElement && field.type === 'text')
        ) {
          if (!field.value) field.value = value;
        }
      });
    });
    const picked = [...form.querySelectorAll<HTMLInputElement>('[name="blend"]:checked')].map((i) => i.value);
    onPicked(picked);
  }, [formRef, searchParams, onPicked]);

  return null;
}

function StatusBody({ status }: { status: Status }) {
  if (status.kind === 'opened') {
    return (
      <>
        <Icon name="wa" />
        <div>
          <p>
            <strong>{formStatus.opened.lead}</strong> {formStatus.opened.text}
          </p>
          <p className="form__status-links">
            <a href={status.wa} target="_blank" rel="noopener">
              {formStatus.opened.retry}
              <NewTab />
            </a>{' '}
            · <a href={status.mail}>{formStatus.email}</a>
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <Icon name="wa" />
      <div>
        <p>
          <strong>{formStatus.blocked.lead}</strong> {formStatus.blocked.text}
        </p>
        <p>
          <a className="btn btn--red" href={status.wa} target="_blank" rel="noopener">
            <Icon name="wa" />
            {formStatus.blocked.openButton}
            <NewTab />
          </a>
        </p>
        <p className="form__status-links">
          <a href={status.mail}>{formStatus.email}</a>
        </p>
      </div>
    </>
  );
}

export function WhatsAppForm({ config }: { config: WhatsAppFormConfig }) {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [picked, setPicked] = useState<string[]>([]);

  const fields = flattenRows(config.rows);
  const labels: FieldLabels = Object.fromEntries(fields.map((f) => [f.name, f.waLabel]));
  const byName = new Map(fields.map((f) => [f.name, f]));

  useEffect(() => {
    if (status) statusRef.current?.focus();
  }, [status]);

  const clearError = (name: string) =>
    setErrors((current) => {
      if (!(name in current)) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    // 1. Validação (ordem do DOM).
    const next: Errors = {};
    let firstInvalid: HTMLElement | null = null;
    for (const el of Array.from(form.elements)) {
      if (!(el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement)) continue;
      if (!el.required || el.value.trim()) continue;
      const field = byName.get(el.name);
      next[el.name] = field?.error ?? (el instanceof HTMLSelectElement ? genericErrors.select : genericErrors.text);
      firstInvalid ??= el;
    }
    setErrors(next);
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // 2. Mensagem + linhas automáticas.
    const text = buildWhatsAppMessage(config.intro, new FormData(form), labels, [
      ['Origem', getOrigin()],
      ['Página', config.page ?? (getFromPage() || window.location.pathname)],
    ]);
    const wa = waLink(text);
    const mail = buildMailto(config.subject, text);

    // 3. Abre o WhatsApp sem 'noopener' para saber se o pop-up foi bloqueado.
    const win = window.open(wa, '_blank');
    if (win) {
      try {
        win.opener = null;
      } catch {
        /* outra origem */
      }
    }
    setStatus({ kind: win ? 'opened' : 'blocked', wa, mail });
  };

  return (
    <form ref={formRef} className="form" onSubmit={handleSubmit} noValidate>
      {picked.length ? (
        <p className="form__picked">
          Blend escolhido: <strong>{picked.join(', ')}</strong>. Dá para mudar mais abaixo.
        </p>
      ) : null}
      <p className="form__required">{config.requiredNote}</p>

      {config.rows.map((row) =>
        Array.isArray(row) ? (
          <div className="form__row" key={row.map((f) => f.id).join('+')}>
            {row.map((field) => (
              <Field
                key={field.id}
                field={field}
                idPrefix={config.idPrefix}
                error={errors[field.name]}
                onEdit={clearError}
              />
            ))}
          </div>
        ) : (
          <Field key={row.id} field={row} idPrefix={config.idPrefix} error={errors[row.name]} onEdit={clearError} />
        ),
      )}

      <button className="btn btn--red btn--block" type="submit">
        <Icon name="wa" />
        {config.submit}
      </button>

      <p className="form__note">
        {config.note.lead ? <>{withMarkers(config.note.lead)} </> : null}
        {config.note.privacyBefore}
        {config.privacyNewTab ? (
          <Link href="/privacidade" target="_blank" rel="noopener">
            {config.note.privacyText}
            <NewTab />
          </Link>
        ) : (
          <Link href="/privacidade">{config.note.privacyText}</Link>
        )}
        {config.note.privacyAfter} {formStatus.noWhatsApp} <a href={mailtoLink}>{site.email}</a>.
      </p>

      <div ref={statusRef} className="form__status" role="status" aria-live="polite" tabIndex={-1}>
        {status ? <StatusBody status={status} /> : null}
      </div>

      <Suspense fallback={null}>
        <PrefillFromUrl formRef={formRef} onPicked={setPicked} />
      </Suspense>
    </form>
  );
}
