import type { MetadataRoute } from 'next';
import { contentUpdatedAt, pages } from '@/content/pages';
import { absoluteUrl } from '@/lib/routes';

export const dynamic = 'force-static';

/** /sitemap.xml gerado a partir de src/content/pages.ts (páginas com `priority`). */
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(pages)
    .filter((page) => 'priority' in page && typeof page.priority === 'number')
    .map((page) => ({
      url: absoluteUrl(page.path),
      lastModified: contentUpdatedAt,
      priority: 'priority' in page ? page.priority : undefined,
    }));
}
