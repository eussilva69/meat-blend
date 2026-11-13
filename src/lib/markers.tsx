import { Fragment, type ReactNode } from 'react';

/**
 * Marcadores de dado pendente: "[a confirmar…]" e "[SIF/SIE/SIM nº 0000]".
 * Na tela ficam em <span class="tbc"> (itálico com sublinhado pontilhado), com o mesmo
 * texto, para continuar fácil de achar com Ctrl+F. Use só em texto, nunca em atributos.
 */
const RE = /(\[(?:a confirmar[^\]]*|SIF\/SIE\/SIM nº 0000)\])/g;

export function withMarkers(text: string): ReactNode {
  const parts = text.split(RE);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 ? (
      <span className="tbc" key={i}>
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** true se o texto ainda tem algum marcador (fica fora do JSON-LD). */
export const hasMarker = (text: string): boolean => /\[/.test(text);
