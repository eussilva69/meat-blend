import { blends, blendHref } from './blends';

export type NavItem = {
  href: string;
  label: string;
};

/** Destino de todo "Pedir amostra" do site: o formulário do Contato. */
export const sampleHref = '/contato#pedir-amostra';

/** Menu principal (cabeçalho do site). */
export const mainNav: NavItem[] = [
  { href: '/sobre', label: 'A marca' },
  { href: '/blends', label: 'Blends' },
  { href: '/hamburguerias', label: 'Para hamburguerias' },
  { href: '/qualidade', label: 'Qualidade' },
  { href: '/contato', label: 'Contato' },
];

/** Botão de destaque do cabeçalho (CTA primário). */
export const headerCta: NavItem = { href: sampleHref, label: 'Pedir amostra' };

/** Coluna "Navegação" do rodapé. */
export const footerNav: NavItem[] = [{ href: '/', label: 'Início' }, ...mainNav];

/** Coluna "Blends" do rodapé. */
export const footerBlends: NavItem[] = blends.map((b) => ({ href: blendHref(b), label: b.name }));

export const privacyLink: NavItem = { href: '/privacidade', label: 'Política de privacidade' };

/** Rota da landing page de captação. */
export const lpPath = '/amostra';
