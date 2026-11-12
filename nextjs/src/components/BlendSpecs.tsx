import type { CSSProperties } from 'react';

/**
 * Barra de proporção carne × gordura + legenda. A barra é só visual (aria-hidden):
 * a legenda em texto já diz o mesmo.
 */
export function FatRatio({ lean, fat }: { lean: number; fat: number }) {
  return (
    <>
      <div className="ratio" aria-hidden="true">
        <span className="ratio__lean" style={{ '--v': `${lean}%` } as CSSProperties} />
      </div>
      <p className="ratio__legend">
        <span>{lean}% carne</span>
        <span>{fat}% gordura</span>
      </p>
    </>
  );
}

/** Lista de "chips" (gramaturas, destaques): etiquetas planas, não clicáveis. */
export function Chips({ items, label }: { items: readonly string[]; label?: string }) {
  return (
    <ul className="chips" aria-label={label}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/** 150 → "150 g" */
export const formatWeight = (grams: number): string => `${grams} g`;
