/** Pilares da marca, valores e faixas (marquee). Textos com [a confirmar…] são marcadores. */

export type Pillar = { title: string; text: string };

/** Home: "Três palavras. Nenhuma negociável." (fundo vermelho) */
export const pillarsHome: Pillar[] = [
  {
    title: 'Exclusiva',
    text: 'Blends pensados para o estilo de cada hamburgueria, e receitas sob medida que ficam só com você. No sob medida, seu concorrente não compra o seu sabor.',
  },
  {
    title: 'Rigorosa',
    text: 'Seleção de cortes, moagem controlada e porcionamento na gramatura exata. Todo lote segue a mesma ficha técnica, sem improviso.',
  },
  {
    title: 'Segura',
    text: 'Boas práticas de produção, embalagem fechada e identificada, e cadeia de frio do nosso freezer até o seu.',
  },
];

/** Landing page: "Por que confiar" (fundo vermelho). */
export const pillarsLp: Pillar[] = [
  {
    title: 'Exclusiva',
    text: 'Linha pronta para começar rápido, ou receita sob medida que fica só com a sua casa.',
  },
  {
    title: 'Rigorosa',
    text: 'Ficha técnica para cada blend e porção na gramatura combinada [a confirmar: tolerância ±X g]. O mesmo burger em todo lote.',
  },
  {
    title: 'Segura',
    text: 'Inspeção oficial [SIF/SIE/SIM nº 0000], lote e validade em cada embalagem e cadeia de frio até a sua cozinha.',
  },
];

/** Página "A marca": linhas de valores. */
export const valueRows: { title: string; lead: string; items: string[] }[] = [
  {
    title: 'Exclusiva',
    lead: 'Seu burger não precisa ter o mesmo gosto do burger do vizinho.',
    items: [
      'Linha de blends pensada para estilos diferentes de burger.',
      'Blend sob medida, com receita exclusiva para a sua casa.',
      'Atendimento próximo, de quem entende de hamburgueria.',
    ],
  },
  {
    title: 'Rigorosa',
    lead: 'Consistência não acontece por acaso. É processo.',
    items: [
      'Ficha técnica para cada blend: cortes, gordura e moagem definidos.',
      'Porções na gramatura combinada, com conferência de peso [a confirmar].',
      'Lotes identificados com data de produção e validade.',
    ],
  },
  {
    title: 'Segura',
    lead: 'Alimento é coisa séria. Do nosso freezer até o seu.',
    items: [
      'Produção com boas práticas de manipulação e higiene.',
      'Embalagem fechada e congelamento rápido.',
      'Transporte em veículo refrigerado [a confirmar] e orientação de armazenamento.',
    ],
  },
];

/** Faixas vermelhas animadas. */
export const marqueeValues = ['exclusiva', 'rigorosa', 'segura'];
export const marqueeAudience = ['hamburguerias', 'dark kitchens', 'food trucks', 'restaurantes'];
