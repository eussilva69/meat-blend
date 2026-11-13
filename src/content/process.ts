/** Etapas, passos e dicas. Textos com [a confirmar…] são marcadores. */

export type StepItem = { title: string; text: string };

/** Home: "As etapas que mais importam." */
export const processSteps: StepItem[] = [
  { title: 'Seleção', text: 'Cortes bovinos escolhidos por padrão de gordura, cor e textura.' },
  { title: 'Moagem controlada', text: 'Moagem a frio, na granulometria certa para cada blend.' },
  {
    title: 'Porcionamento',
    text: 'Cada porção moldada na gramatura exata, com conferência de peso [a confirmar: método e tolerância, ex.: ±X g].',
  },
  {
    title: 'Entrega congelada',
    text: 'Embalado, congelado e transportado em veículo refrigerado, com o produto mantido congelado [a confirmar].',
  },
];

/** /hamburguerias: "Do primeiro contato ao pedido recorrente." */
export const howItWorksSteps: StepItem[] = [
  { title: 'Conversa', text: 'Você conta sobre o cardápio, o volume e o estilo de burger da casa.' },
  { title: 'Amostras', text: 'A gente indica os blends e envia a amostra para você testar na sua chapa.' },
  { title: 'Ajuste fino', text: 'Afinamos gordura, moagem e gramatura até ficar do seu jeito.' },
  { title: 'Fornecimento', text: 'Pedido recorrente, entrega programada e o mesmo padrão sempre.' },
];

/** Landing page: "Da amostra ao pedido, em três passos." */
export const lpSteps: StepItem[] = [
  {
    title: 'Conte sua operação',
    text: 'Preencha o formulário ou chame no WhatsApp: estilo de burger, volume e cidade. Leva 30 segundos.',
  },
  {
    title: 'Teste na sua chapa',
    text: 'A gente indica os blends certos e envia a amostra [a confirmar: prazo e forma de envio]. Você testa com a sua equipe, no seu ponto.',
  },
  {
    title: 'Receba no seu ritmo',
    text: 'Aprovou? A gente combina gramatura, formato e frequência de entrega. Todo pedido chega no mesmo padrão.',
  },
];

/** /qualidade: "Seis etapas, nenhum atalho." */
export const qualityTimeline: StepItem[] = [
  {
    title: 'Seleção dos cortes',
    text: 'Cortes bovinos escolhidos por padrão de gordura, cor e textura. O blend começa na escolha da matéria-prima, não na máquina.',
  },
  {
    title: 'Limpeza e padronização',
    text: 'Retirada de nervos, cartilagens e excessos. Cada corte entra na receita na proporção definida pela ficha técnica.',
  },
  {
    title: 'Moagem controlada',
    text: 'Moagem com a carne bem fria, na granulometria certa para cada blend. Temperatura baixa preserva textura e suculência.',
  },
  {
    title: 'Porcionamento na gramatura exata',
    text: 'Cada porção é moldada na gramatura exata e o peso é conferido [a confirmar: unidade a unidade / por amostragem em cada lote]. Disco, bolinha ou granel, sempre do mesmo tamanho.',
  },
  {
    title: 'Embalagem e congelamento',
    text: 'Discos intercalados com papel, embalagem fechada e congelamento rápido. Cada lote é identificado com data de produção e validade.',
  },
  {
    title: 'Entrega refrigerada',
    text: 'Transporte em veículo refrigerado, com o produto mantido congelado [a confirmar], até a sua cozinha.',
  },
];

/** /blends: "Quatro regras para tirar o máximo do blend." */
export const griddleTips: StepItem[] = [
  { title: 'Chapa bem quente', text: 'Entre 200 °C e 230 °C. A crosta se forma rápido e segura o suco dentro do burger.' },
  {
    title: 'Não aperte o disco',
    text: 'Só o smash é esmagado, e apenas no primeiro minuto. Nos outros, pressionar expulsa o suco.',
  },
  {
    title: 'Sal na hora',
    text: 'Tempere logo antes de ir para a chapa, ou já com o burger selado. Sal adiantado resseca a carne.',
  },
  {
    title: 'Vire uma vez só',
    text: 'Deixe selar bem antes de virar. Menos manuseio, mais suculência e um ponto mais uniforme.',
  },
];

/** /qualidade: "Como armazenar e preparar." */
export const storageTips: StepItem[] = [
  {
    title: 'Freezer a −18 °C',
    text: 'Guarde congelado, na embalagem original. Validade: [a confirmar: X meses] a −18 °C.',
  },
  { title: 'Descongele na geladeira', text: 'Entre 0 °C e 5 °C, nunca em temperatura ambiente ou água morna.' },
  {
    title: 'Não recongele',
    text: 'Depois de descongelado, mantenha entre 0 °C e 5 °C e use em até [a confirmar: X dias].',
  },
  {
    title: 'Termômetro na chapa',
    text: 'A referência de boas práticas da Anvisa (RDC 216/2004) é chegar a pelo menos 70 °C em todas as partes do alimento. Se a casa serve ao ponto, informe o cliente no cardápio.',
  },
];
