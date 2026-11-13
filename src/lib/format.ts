/** 1 → "01" */
export const pad2 = (n: number): string => String(n).padStart(2, '0');

/** 1 → "/01" (numeração no estilo do guia de marca). */
export const slashNum = (n: number): string => `/${pad2(n)}`;

/** Atraso escalonado (s) para itens de uma grade animada: stagger(2, 0.06) → 0.12 */
export const stagger = (index: number, step: number): number => Math.round(index * step * 100) / 100;

export const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

/** Número com no máximo 1 casa decimal (ex.: 225; 112,5). */
export const decimal1 = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 });
