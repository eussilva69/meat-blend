import type { FaqItem } from '@/content/faq';
import { site } from '@/content/site';
import { hasMarker } from './markers';
import { absoluteUrl } from './routes';

/**
 * Dados estruturados (JSON-LD). Sem telefone, endereço, CNPJ ou `sameAs` enquanto forem
 * marcadores; sem `Product`. Renderizados por <JsonLd />.
 */
const root = absoluteUrl('/');

export const organization = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${root}#org`,
      name: site.name,
      url: root,
      logo: `${root}apple-touch-icon.png`,
      description:
        'Blends de carne bovina para hamburguerias: cortes selecionados, gordura padronizada e gramatura exata.',
    },
    {
      '@type': 'WebSite',
      '@id': `${root}#site`,
      url: root,
      name: site.name,
      inLanguage: 'pt-BR',
      publisher: { '@id': `${root}#org` },
    },
  ],
});

/** Trilha igual ao crumb visível: "meat blend" › página. */
export const breadcrumb = (name: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: site.nameLower, item: root },
    { '@type': 'ListItem', position: 2, name, item: absoluteUrl(path) },
  ],
});

/** FAQPage só com as perguntas cuja resposta não tem marcador; null se nenhuma. */
export const faqPage = (items: FaqItem[]) => {
  const ready = items.filter((q) => !hasMarker(q.question) && !q.answer.some(hasMarker));
  if (!ready.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ready.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer.join(' ') },
    })),
  };
};
