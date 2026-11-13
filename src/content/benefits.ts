import type { IconName } from '@/components/Icon';
import { site } from './site';

/** Textos com [a confirmar…] / [SIF/SIE/SIM nº 0000] são marcadores. */

export type IconCardItem = { icon: IconName; title: string; text: string };
export type ChecklistItem = { icon?: IconName; title?: string; text?: string };

/** Home (hero): três fatos abaixo da dobra. */
export const heroFacts: { title: string; text: string }[] = [
  { title: 'Cortes selecionados', text: 'Padrão de gordura e cor em cada lote' },
  { title: 'Gramatura exata', text: 'Custo por burger sob controle' },
  { title: 'Entrega congelada', text: 'Cadeia de frio até a sua cozinha' },
];

/** Home: "Seu fornecedor de blend, sem surpresa." */
export const homeChecklist: ChecklistItem[] = [
  { title: 'Padrão em todo pedido', text: 'O burger de segunda é igual ao de sábado.' },
  { title: 'CMV previsível', text: 'Gramatura exata: você sabe quanto custa cada burger antes de vender.' },
  { title: 'Menos trabalho na cozinha', text: 'Chega porcionado e pronto para a chapa.' },
  { title: 'Entrega programada', text: 'Frequência combinada com você, para não faltar blend no fim de semana.' },
];

/** /hamburguerias: "Menos variável na cozinha. Mais controle no caixa." */
export const benefitCards: IconCardItem[] = [
  {
    icon: 'repeat',
    title: 'Padrão em todo pedido',
    text: 'Mesma gordura, mesmo peso, mesmo sabor. O burger de segunda é igual ao de sábado.',
  },
  {
    icon: 'chart',
    title: 'CMV previsível',
    text: 'Gramatura exata significa custo por burger previsível. Você precifica com segurança.',
  },
  {
    icon: 'clock',
    title: 'Menos trabalho na cozinha',
    text: 'Nada de moer, pesar e modelar. Chega porcionado e pronto para a chapa.',
  },
  {
    icon: 'star',
    title: 'Blend exclusivo',
    text: 'A gente desenvolve uma receita só sua. É o sabor que o cliente só encontra na sua casa.',
  },
  {
    icon: 'truck',
    title: 'Entrega programada',
    text: 'Combine a frequência e mantenha o estoque enxuto, sem faltar no fim de semana.',
  },
  {
    icon: 'doc',
    title: 'Ficha técnica',
    text: 'Composição, gramatura e orientação de preparo para treinar a equipe da chapa.',
  },
];

/** /qualidade: cadeia de frio. */
export const coldChainChecklist: ChecklistItem[] = [
  { icon: 'snow', title: 'Congelamento rápido', text: 'Preserva a textura e a suculência da carne.' },
  { icon: 'box', title: 'Embalagem fechada', text: 'Identificada com lote, data de produção e validade.' },
  {
    icon: 'truck',
    title: 'Transporte refrigerado',
    text: 'Veículo refrigerado, com o produto mantido congelado [a confirmar].',
  },
];

/** /qualidade: "Tudo o que sai daqui tem registro." */
export const traceabilityCards: IconCardItem[] = [
  {
    icon: 'search',
    title: 'Lote identificado',
    text: 'Cada embalagem traz lote, data de produção e validade. Se precisar, sabemos exatamente de onde veio.',
  },
  {
    icon: 'doc',
    title: 'Ficha técnica por blend',
    text: 'Composição, gramatura e orientações de preparo e armazenamento documentadas para a sua equipe.',
  },
  {
    icon: 'shield',
    title: 'Inspeção sanitária',
    text: `Produção sob inspeção oficial, registro ${site.sanitaryRegistration}. A ficha técnica e os dados do registro ficam à disposição da sua vigilância sanitária.`,
  },
];

/** Landing page (hero): destaques. */
export const lpHighlights: ChecklistItem[] = [
  { title: 'Mesmo sabor e ponto de segunda a sábado' },
  { title: 'CMV fechado: você sabe quanto custa cada burger' },
  { title: 'Nada de moer, pesar e modelar na cozinha' },
];

/** Landing page: "Se isso acontece na sua cozinha…" */
export const lpPains: IconCardItem[] = [
  {
    icon: 'alert',
    title: 'Cada lote, um burger diferente',
    text: 'A gordura muda, o ponto muda e o cliente reclama. E ninguém sabe explicar por quê.',
  },
  {
    icon: 'scale',
    title: 'Peso no olho, margem no escuro',
    text: 'Sem gramatura exata, o custo de cada burger é um chute. E o lucro também.',
  },
  {
    icon: 'clock',
    title: 'Equipe moendo e pesando',
    text: 'Horas toda semana moendo, pesando e modelando carne, em vez de produzir e vender.',
  },
];

/** Landing page: comparativo "Do jeito de sempre vs. meat blend". */
export const lpComparisonColumns = { common: 'Do jeito de sempre', brand: 'meat blend' } as const;
export const lpComparison: { criterion: string; common: string; meatBlend: string }[] = [
  { criterion: 'Gordura', common: 'Muda conforme a peça do dia', meatBlend: 'Padronizada por ficha técnica' },
  { criterion: 'Gramatura', common: 'No olho ou burger a burger na balança', meatBlend: 'Porcionada na gramatura exata' },
  { criterion: 'Mão de obra', common: 'Equipe moendo, pesando e modelando', meatBlend: 'Chega pronto para a chapa' },
  {
    criterion: 'Custo por burger',
    common: 'Difícil de fechar: aparas, perdas e horas',
    meatBlend: 'Fechado: preço do kg × gramatura',
  },
  { criterion: 'Receita', common: 'A mesma de todo mundo', meatBlend: 'Pode ser exclusiva da sua casa' },
];
