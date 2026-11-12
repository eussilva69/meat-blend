/**
 * Título, descrição e caminho de cada página: usados na Metadata API (title, description,
 * canonical, Open Graph), no sitemap.xml e no JSON-LD (BreadcrumbList, via `crumb`).
 *
 * `title` recebe o sufixo " | Meat Blend" pelo template do layout raiz.
 * `absoluteTitle` substitui o título inteiro (sem sufixo).
 */
export type PageSeo = {
  path: string;
  title: string;
  absoluteTitle?: boolean;
  description: string;
  /** Nome da página na trilha "meat blend/…" (BreadcrumbList). */
  crumb?: string;
  /** Prioridade no sitemap.xml (0 a 1). Omitir = fora do sitemap. */
  priority?: number;
};

export const pages = {
  home: {
    path: '/',
    title: 'Blend de carne para hamburgueria | Meat Blend',
    absoluteTitle: true,
    description:
      'Fornecedor de blend de carne bovina para hamburguerias: gordura padronizada, gramatura exata e entrega congelada. Peça uma amostra e teste na chapa.',
    priority: 1,
  },
  blends: {
    path: '/blends',
    title: 'Blends para hambúrguer e smash burger',
    description:
      'Clássico 80/20, Costela 77/23, Smash em bolinha, Fraldinha e blend sob medida. Em disco, bolinha ou granel, na gramatura exata. Peça sua amostra.',
    crumb: 'Blends',
    priority: 0.9,
  },
  hamburguerias: {
    path: '/hamburguerias',
    title: 'Hambúrguer congelado para hamburguerias',
    description:
      'Fornecedor de blend porcionado para hamburguerias, dark kitchens e food trucks: padrão em todo pedido, CMV previsível e entrega programada.',
    crumb: 'Para hamburguerias',
    priority: 0.9,
  },
  sobre: {
    path: '/sobre',
    title: 'Sobre a Meat Blend: blends para hamburguerias',
    absoluteTitle: true,
    description:
      'A Meat Blend desenvolve e produz blends de carne bovina para hamburguerias que levam o burger a sério. Exclusiva, rigorosa e segura, do corte à chapa.',
    crumb: 'A marca',
    priority: 0.7,
  },
  qualidade: {
    path: '/qualidade',
    title: 'Qualidade e segurança do blend de carne',
    description:
      'Seleção de cortes, moagem a frio, porcionamento na gramatura exata, lote e validade na embalagem e cadeia de frio até a sua cozinha. Veja o processo.',
    crumb: 'Qualidade',
    priority: 0.7,
  },
  contato: {
    path: '/contato',
    title: 'Pedir amostra e tabela de preços',
    description:
      'Conte sobre a sua hamburgueria e receba pelo WhatsApp o blend indicado, a tabela de preços e as condições de entrega para a sua região.',
    crumb: 'Contato',
    priority: 0.8,
  },
  amostra: {
    path: '/amostra',
    title: 'Amostra de blend para hamburgueria',
    description:
      'Teste na sua chapa: blend de carne bovina com gordura padronizada, gramatura exata e entrega congelada. Peça sua amostra pelo WhatsApp em 30 segundos.',
    priority: 0.8,
  },
  privacidade: {
    path: '/privacidade',
    title: 'Política de privacidade',
    description:
      'Como a Meat Blend trata os dados pessoais enviados pelo site, em conformidade com a LGPD (Lei nº 13.709/2018).',
    crumb: 'Política de privacidade',
    priority: 0.2,
  },
  notFound: {
    path: '/404',
    title: 'Página não encontrada',
    description: 'A página que você procura não existe ou mudou de endereço.',
  },
} satisfies Record<string, PageSeo>;

/** Data de última modificação informada no sitemap. */
export const contentUpdatedAt = '2026-11-12';
