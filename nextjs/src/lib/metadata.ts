import type { Metadata } from 'next';
import { ogImage } from '@/content/images';
import type { PageSeo } from '@/content/pages';
import { site } from '@/content/site';
import { routePath } from './routes';

/** Título completo, como aparece na aba e no Open Graph. */
export const fullTitle = (page: PageSeo): string =>
  page.absoluteTitle ? page.title : `${page.title} | ${site.name}`;

/**
 * Metadata de uma página. O Next mescla metadata de forma rasa (objetos como `openGraph`
 * são substituídos, não combinados), por isso cada página recebe o bloco completo.
 */
export function buildMetadata(page: PageSeo, extra: Metadata = {}): Metadata {
  const title = fullTitle(page);
  const path = routePath(page.path);
  return {
    title: page.absoluteTitle ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: site.locale,
      siteName: site.name,
      title,
      description: page.description,
      url: path,
      images: [{ url: ogImage.src, width: ogImage.width, height: ogImage.height, alt: ogImage.alt }],
    },
    twitter: { card: 'summary_large_image' },
    ...extra,
  };
}
