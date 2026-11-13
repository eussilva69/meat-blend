/**
 * Perguntas frequentes: lista mestra (fonte única). Cada resposta é uma lista de parágrafos.
 * Textos entre colchetes [a confirmar…] são MARCADORES: preencha com o dado real do cliente.
 * Perguntas sem marcador entram no JSON-LD FAQPage de /hamburguerias automaticamente.
 */
export type FaqItem = {
  question: string;
  answer: string[];
};

type MasterItem = FaqItem & {
  id: string;
  /** Versão da resposta usada na landing page, quando difere. */
  answerLp?: string[];
};

export const faqMaster: MasterItem[] = [
  {
    id: 'amostra',
    question: 'Como funciona a amostra?',
    answer: [
      'Você conta como é a sua operação (estilo de burger, volume e equipamento) e a gente indica os blends mais adequados. A amostra chega [a confirmar: por entrega própria / visita do comercial / transportadora], com [a confirmar: quantidade, ex.: X discos de cada blend indicado], para você testar na sua chapa, com a sua equipe.',
    ],
  },
  {
    id: 'amostra-paga',
    question: 'A amostra é paga?',
    answer: [
      '[a confirmar: é gratuita / custa R$ X, abatidos no primeiro pedido / o frete fica por conta de quem pede]. Em qualquer caso, você só fecha pedido depois de testar.',
    ],
  },
  {
    id: 'preco',
    question: 'Quanto custa o blend?',
    answer: [
      'Depende do blend, do formato, da gramatura e do volume por mês. Peça a tabela pelo WhatsApp e receba os valores e as condições para a sua região. Para estimar o custo de carne por burger, use o simulador desta página.',
    ],
    answerLp: [
      'Depende do blend, do formato, da gramatura e do volume por mês. Peça a tabela pelo WhatsApp e receba os valores e as condições para a sua região.',
    ],
  },
  {
    id: 'minimo',
    question: 'Qual é o pedido mínimo?',
    answer: [
      '[a confirmar: X kg (ou R$ X) por entrega; pode / não pode misturar blends e formatos]. Vende pouco ou ainda vai abrir? Conte no contato e a gente vê a melhor forma de atender.',
    ],
  },
  {
    id: 'entrega',
    question: 'Vocês entregam na minha cidade? Em quanto tempo?',
    answer: [
      'Hoje atendemos [a confirmar: cidades / regiões]. O prazo é de [a confirmar: X dias úteis] depois do pedido confirmado, com entrega [a confirmar: semanal / quinzenal] em dia combinado. Está fora dessa área? Informe a sua cidade no WhatsApp ou no formulário que a gente verifica.',
    ],
  },
  {
    id: 'como-chega',
    question: 'Como o produto chega?',
    answer: [
      'Congelado, em embalagem fechada e identificada com lote, data de produção e validade. Os discos vêm separados por papel, para não grudarem, em caixas de [a confirmar: X kg]. O transporte é feito [a confirmar: em veículo refrigerado, com o produto mantido congelado].',
    ],
  },
  {
    id: 'armazenar',
    question: 'Como armazenar e descongelar?',
    answer: [
      'Mantenha em freezer a −18 °C ou menos. Para descongelar, deixe na geladeira (entre 0 °C e 5 °C), nunca em temperatura ambiente. Depois de descongelado, não volte a congelar.',
      'Os discos também podem ir congelados direto para a chapa, ajustando o tempo de cocção.',
    ],
  },
  {
    id: 'validade',
    question: 'Qual é a validade?',
    answer: [
      'Congelado a −18 °C ou menos, na embalagem original, a validade é de [a confirmar: X meses]. Depois de descongelado na geladeira, use em até [a confirmar: X dias].',
    ],
  },
  {
    id: 'inspecao',
    question: 'O produto tem inspeção sanitária?',
    answer: [
      'Sim. A produção é feita sob inspeção oficial, registro [SIF/SIE/SIM nº 0000]. Se a vigilância sanitária ou o seu nutricionista pedirem, a gente envia a ficha técnica e os dados do registro.',
    ],
  },
  {
    id: 'nf',
    question: 'Vocês emitem nota fiscal? Como é o pagamento?',
    answer: [
      '[a confirmar: todo pedido sai com nota fiscal]. Pagamento por [a confirmar: Pix / boleto / cartão], [a confirmar: com prazo de X dias para clientes recorrentes].',
    ],
  },
  {
    id: 'troca',
    question: 'E se algum lote chegar fora do padrão?',
    answer: [
      '[a confirmar: política de troca. Ex.: avise em até X horas do recebimento, com foto da etiqueta, e a gente repõe ou credita no próximo pedido]. Como cada embalagem tem lote identificado, dá para rastrear exatamente o que aconteceu.',
    ],
  },
  {
    id: 'fornecimento',
    question: 'Vocês garantem o fornecimento toda semana?',
    answer: [
      'Com pedido recorrente, a sua entrega entra na programação combinada. [a confirmar: como o abastecimento é garantido, ex.: estoque de segurança para clientes ativos; aviso com X dias de antecedência se houver mudança de prazo.]',
    ],
  },
  {
    id: 'contrato',
    question: 'Preciso assinar contrato ou fidelidade?',
    answer: ['[a confirmar: não há fidelidade, você pede quando precisar / contrato de X meses para blend sob medida].'],
  },
  {
    id: 'exclusivo',
    question: 'Posso ter um blend só meu?',
    answer: [
      'Sim. No blend sob medida, a gente define com você os cortes, a proporção de gordura, a moagem e a gramatura, e testa na sua chapa até aprovar. A receita aprovada fica exclusiva para a sua casa. As condições (volume mínimo e prazo de desenvolvimento) são combinadas no contato.',
    ],
  },
  {
    id: 'pf',
    question: 'Vocês vendem para pessoa física?',
    answer: [
      '[a confirmar: atendemos apenas empresas com CNPJ (hamburguerias, restaurantes, dark kitchens e food trucks) / também vendemos para pessoa física, com pedido mínimo de X].',
    ],
  },
  {
    id: 'resposta',
    question: 'Em quanto tempo vocês respondem?',
    answer: [
      '[a confirmar: prazo de resposta, ex.: em até 2 horas úteis], no horário de atendimento (seg a sex, 8h às 18h).',
    ],
  },
];

const byId = (id: string): MasterItem => {
  const item = faqMaster.find((q) => q.id === id);
  if (!item) throw new Error(`FAQ sem id "${id}"`);
  return item;
};

/** /hamburguerias: as 16 perguntas, na ordem da lista mestra. */
export const faqHamburguerias: FaqItem[] = faqMaster.map(({ question, answer }) => ({ question, answer }));

/** Landing page: 14 perguntas. */
export const faqLp: FaqItem[] = [
  'amostra',
  'amostra-paga',
  'preco',
  'minimo',
  'entrega',
  'como-chega',
  'validade',
  'inspecao',
  'nf',
  'troca',
  'fornecimento',
  'contrato',
  'exclusivo',
  'pf',
].map((id) => {
  const item = byId(id);
  return { question: item.question, answer: item.answerLp ?? item.answer };
});
