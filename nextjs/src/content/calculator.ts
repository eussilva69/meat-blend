/**
 * Simulador de custo por burger (/hamburguerias).
 * ⚠️ R$ 45/kg é só um valor inicial de exemplo; o visitante altera.
 */
export const calculator = {
  defaults: {
    /** Texto do campo de preço (aceita vírgula decimal). */
    pricePerKg: '45,00',
    grams: '150',
    unitsPerMonth: '1500',
  },
  quickGrams: [80, 100, 120, 150, 180, 200],
  priceLabel: 'Preço do blend por kg',
  priceNote:
    'R$ 45/kg é só um valor de exemplo: troque pelo preço que quiser comparar. O preço real depende do blend, do volume e da região. Peça a tabela.',
  hint: 'Preencha preço, gramatura e quantidade com números maiores que zero para ver o custo.',
  ctaLabel: 'Pedir tabela de preços',
} as const;

/** Faixa de volume do formulário a partir de burgers/mês. */
export const volumeBand = (units: number): string =>
  units <= 500 ? 'Até 500' : units <= 1500 ? 'De 500 a 1.500' : units <= 3000 ? 'De 1.500 a 3.000' : 'Mais de 3.000';
