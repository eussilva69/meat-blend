import { site } from '@/content/site';

/** Rótulo de cada campo (`name` → rótulo na mensagem). */
export type FieldLabels = Record<string, string>;

/** Linhas extras no fim da mensagem: [rótulo, valor]. Valores vazios são ignorados. */
export type ExtraLines = [label: string, value: string][];

/**
 * Monta a mensagem do WhatsApp:
 *
 *   <intro>
 *
 *   *Nome:* Ana
 *   *Blends de interesse:* Clássico, Smash
 *   *Origem:* instagram / cpc / amostra
 *   *Página:* /blends
 *
 * Os campos seguem a ordem do formulário; valores vazios são ignorados e campos com
 * vários valores (checkboxes) são unidos por vírgula.
 */
export function buildWhatsAppMessage(
  intro: string,
  data: FormData,
  labels: FieldLabels,
  extra: ExtraLines = [],
): string {
  const lines = [intro || 'Olá, Meat Blend!', ''];
  const seen = new Set<string>();

  for (const [name] of data) {
    if (seen.has(name)) continue;
    seen.add(name);
    const values = data
      .getAll(name)
      .map((v) => String(v).trim())
      .filter(Boolean);
    if (!values.length) continue;
    lines.push(`*${labels[name] ?? name}:* ${values.join(', ')}`);
  }

  for (const [label, value] of extra) {
    if (value && value.trim()) lines.push(`*${label}:* ${value.trim()}`);
  }

  return lines.join('\n');
}

/** `mailto:` com o mesmo conteúdo da mensagem (sem os asteriscos do WhatsApp). */
export function buildMailto(subject: string, text: string): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text.replace(/\*/g, ''))}`;
}
