import type { UrlObject } from 'url';
import { brandImages, photos, type ImageAsset } from './images';

/**
 * Linha de blends. FONTE ÚNICA usada na home, em /blends (linhas e tabela-resumo), na
 * landing page, no rodapé e nas opções do formulário de contato.
 *
 * ⚠️ Cortes, % de gordura e gramaturas são PROPOSTAS a validar com o cliente.
 * Costela em 77/23 (limite de gordura do RTIQ de hambúrguer): a confirmar com o responsável técnico.
 */

type BlendBase = {
  /** Âncora em /blends (ex.: /blends#smash) */
  slug: string;
  name: string;
  /** Texto do card na home. */
  summary: string;
  /** Texto curto do card na landing page. */
  summaryShort: string;
  /** Linha de cortes em /blends (ex.: "Acém + peito"). */
  cuts: string;
  /** Descrição longa em /blends. */
  description: string;
  /** Aparece na grade de cards (home e landing page). */
  featured: boolean;
  /** Texto do botão em /blends. */
  ctaLabel: string;
};

export type StandardBlend = BlendBase & {
  kind: 'standard';
  /** Proporção carne/gordura, em %. */
  lean: number;
  fat: number;
  /** Gramaturas disponíveis, em gramas. */
  weights: number[];
  format: string;
  /** Formato curto, para a tabela-resumo. */
  formatShort: string;
  idealFor: string;
  image: ImageAsset & { alt: string; position?: string };
};

export type CustomBlend = BlendBase & {
  kind: 'custom';
  /** Chips (destaques). */
  highlights: string[];
  /** Especificações exibidas em /blends. */
  specs: { label: string; value: string | string[] }[];
  /** Colunas da tabela-resumo de /blends. */
  table: { cuts: string; ratio: string; weights: string; format: string };
  image: ImageAsset;
};

export type Blend = StandardBlend | CustomBlend;

export const blends: Blend[] = [
  {
    kind: 'standard',
    slug: 'classico',
    name: 'Clássico',
    summary: 'Acém + peito. O coringa do cardápio: suculento e com sabor marcante de carne.',
    summaryShort: 'Acém + peito. O coringa do cardápio.',
    cuts: 'Acém + peito',
    description:
      'O equilíbrio que agrada todo mundo. Suculento, com sabor de carne marcante e ótimo rendimento na chapa. É o coringa do cardápio, do burger da casa ao combo do almoço.',
    lean: 80,
    fat: 20,
    weights: [120, 150, 180],
    format: 'Disco moldado, com papel intercalado',
    formatShort: 'Disco',
    idealFor: 'Burger clássico, ponto médio, 1,5 a 2 cm de altura',
    featured: true,
    ctaLabel: 'Quero testar este blend',
    image: { ...photos.burgerClassico, alt: 'Hambúrguer duplo com queijo, molho, alface e tomate' },
  },
  {
    kind: 'standard',
    slug: 'costela',
    name: 'Costela',
    summary: 'Costela + acém. Mais gordura, mais sabor, para burgers altos e suculentos.',
    summaryShort: 'Costela + acém. Alto, macio e suculento.',
    cuts: 'Costela + acém',
    description:
      'Gordura marmorizada que derrete na chapa e deixa o burger alto, macio e muito suculento. Para quem quer um hambúrguer de respeito, com sabor intenso.',
    lean: 77,
    fat: 23,
    weights: [150, 180, 200],
    format: 'Disco moldado, com papel intercalado',
    formatShort: 'Disco',
    idealFor: 'Burgers altos, ponto rosado, cardápio premium',
    featured: true,
    ctaLabel: 'Quero testar este blend',
    image: { ...photos.burgerTriplo, alt: 'Hambúrguer triplo com queijo e bacon sobre tábua de madeira' },
  },
  {
    kind: 'standard',
    slug: 'smash',
    name: 'Smash',
    summary: 'Bolinhas prontas para esmagar. Crosta crocante em segundos, na chapa bem quente.',
    summaryShort: 'Bolinhas prontas para esmagar. Crosta em segundos.',
    cuts: 'Acém + costela, moagem fina',
    description:
      'Bolinhas prontas para esmagar. Na chapa bem quente, formam uma crosta crocante e caramelizada em segundos. Rápido de montar, perfeito para operações com muito giro.',
    lean: 80,
    fat: 20,
    weights: [80, 100],
    format: 'Bolinha porcionada',
    formatShort: 'Bolinha',
    idealFor: 'Smash simples, duplo ou triplo, delivery e alto volume',
    featured: true,
    ctaLabel: 'Quero testar este blend',
    image: { ...photos.smashLinha, alt: 'Smash burger com crosta caramelizada e queijo derretido' },
  },
  {
    kind: 'standard',
    slug: 'fraldinha',
    name: 'Fraldinha',
    summary: 'Fraldinha + costela + peito. Sabor de churrasco, textura macia e fibra delicada.',
    summaryShort: 'Fraldinha + costela + peito. Sabor de churrasco.',
    cuts: 'Fraldinha + costela + peito',
    description:
      'Sabor de churrasco, textura macia e fibra delicada. Um blend com personalidade para burgers autorais e menus de degustação.',
    lean: 78,
    fat: 22,
    weights: [150, 180],
    format: 'Disco moldado, com papel intercalado',
    formatShort: 'Disco',
    idealFor: 'Burgers autorais, ponto médio, pão brioche ou australiano',
    featured: true,
    ctaLabel: 'Quero testar este blend',
    image: {
      ...photos.burgerGourmet,
      alt: 'Hambúrguer artesanal em pão rústico com queijo e folhas',
    },
  },
  {
    kind: 'custom',
    slug: 'sob-medida',
    name: 'Sob medida',
    summary: 'Cortes, gordura, moagem e gramatura definidos com você. A receita é da sua casa, e só dela.',
    summaryShort: 'Receita desenvolvida com você, exclusiva da sua casa.',
    cuts: 'A receita é sua',
    description:
      'Quer um burger que ninguém mais tem? A gente desenvolve o blend com você: escolhe os cortes, ajusta a gordura, define a moagem e a gramatura. Depois de aprovada, a receita fica exclusiva para a sua casa.',
    highlights: ['Receita exclusiva', 'Ficha técnica'],
    specs: [
      { label: 'Cortes', value: 'Definidos com você' },
      { label: 'Gordura', value: 'Do magro ao bem suculento' },
      { label: 'Entregáveis', value: ['Receita exclusiva', 'Ficha técnica', 'Testes na sua chapa'] },
    ],
    table: {
      cuts: 'Definidos com você',
      ratio: 'Do magro ao suculento',
      weights: 'Sob medida',
      format: 'Disco, bolinha ou granel',
    },
    featured: false,
    ctaLabel: 'Desenvolver meu blend',
    image: brandImages.monogramaCreme,
  },
];

/** Blends de linha exibidos em cards (home e landing page). */
export const featuredBlends = blends.filter((b): b is StandardBlend => b.kind === 'standard' && b.featured);

/** O blend sob medida (faixa vermelha abaixo da grade). */
export const customBlend = blends.find((b): b is CustomBlend => b.kind === 'custom')!;

/** Link para o blend na página /blends. */
export const blendHref = (blend: Pick<Blend, 'slug'>): string => `/blends#${blend.slug}`;

/** Link para o formulário de contato com o blend pré-selecionado. */
export const blendContactHref = (blend: Pick<Blend, 'name'>): UrlObject => ({
  pathname: '/contato',
  query: { blend: blend.name },
  hash: 'pedir-amostra',
});

/** Formatos de entrega (seção "Formatos" de /blends). */
export const formats = [
  {
    shape: 'disc',
    title: 'Disco moldado',
    text: 'Porções prensadas no diâmetro certo e separadas por papel, para não grudarem. Do freezer direto para a chapa.',
  },
  {
    shape: 'ball',
    title: 'Bolinha smash',
    text: 'Smash burger porcionado em bolinhas de 80 g ou 100 g, prontas para esmagar. Agilidade no horário de pico.',
  },
  {
    shape: 'bulk',
    title: 'A granel',
    text: 'Blend moído em pacotes de 1 kg ou 2,5 kg, para quem prefere modelar o burger na casa.',
  },
] as const;

export type FormatShape = (typeof formats)[number]['shape'];
