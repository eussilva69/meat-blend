/**
 * FONTE ÚNICA dos dados da empresa.
 *
 * ⚠️ Vários valores abaixo ainda são MARCADORES (não estavam no material do cliente).
 * Troque aqui e o site inteiro é atualizado. Veja a tabela de pendências no README.
 */
export const site = {
  name: 'Meat Blend',
  /** Nome em caixa-baixa, como aparece na marca (proximidade). */
  nameLower: 'meat blend',
  values: 'exclusiva / rigorosa / segura',
  /** Valores da marca, renderizados com "/" vermelho decorativo entre eles. */
  valuesList: ['exclusiva', 'rigorosa', 'segura'],
  description:
    'Fornecedor de blend de carne bovina para hamburguerias: gordura padronizada, gramatura exata e entrega congelada. Peça uma amostra e teste na chapa.',

  /** Domínio de produção (usado em canonical, Open Graph, sitemap e robots). MARCADOR a confirmar. */
  url: 'https://www.meatblend.com.br',

  /** WhatsApp comercial: só dígitos, com DDI 55 + DDD. MARCADOR. */
  whatsapp: '5500000000000',
  /** WhatsApp formatado para exibição. MARCADOR. */
  phoneDisplay: '(00) 00000-0000',

  email: 'contato@meatblend.com.br',
  /** MARCADOR: confirmar se o @ é esse. */
  instagram: {
    handle: '@meatblend',
    url: 'https://instagram.com/meatblend',
  },

  address: {
    /** MARCADOR */
    street: 'Rua Exemplo, 000 – Bairro',
    /** MARCADOR */
    city: 'Cidade – UF',
    /** MARCADOR (usado na política de privacidade). */
    full: '[endereço completo]',
  },

  hours: {
    /** MARCADOR */
    short: 'Seg a sex, 8h às 18h',
    /** MARCADOR */
    long: 'Segunda a sexta, 8h às 18h',
  },

  /** MARCADOR */
  cnpj: '00.000.000/0001-00',
  /** MARCADOR */
  legalName: '[razão social]',
  /** MARCADOR: registro de inspeção sanitária. */
  sanitaryRegistration: '[SIF/SIE/SIM nº 0000]',
  /** MARCADOR: data da última atualização da política de privacidade. */
  privacyUpdatedAt: '[dd/mm/aaaa]',

  themeColor: '#232629',
  locale: 'pt_BR',
} as const;

/** Mensagens prontas usadas nos links de WhatsApp. */
export const waMessages = {
  /** Faixa de CTA, barra mobile do site, header mobile. */
  sample: 'Olá, Meat Blend! Quero pedir uma amostra para a minha hamburgueria.',
  question: 'Olá, Meat Blend! Tenho uma dúvida.',
  greeting: 'Olá, Meat Blend!',
  lpHeader: 'Olá, Meat Blend! Vim pela página de amostras.',
  lpSample: 'Olá, Meat Blend! Quero pedir uma amostra.',
} as const;

/** Monta o link do WhatsApp comercial, opcionalmente com uma mensagem pronta. */
export function waLink(text?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Link `mailto:` do e-mail de contato. */
export const mailtoLink = `mailto:${site.email}`;
