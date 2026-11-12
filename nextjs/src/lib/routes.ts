import { site } from '@/content/site';

/**
 * Na exportação estática (`STATIC_EXPORT=1`) as rotas usam barra final (`/blends/`),
 * igual aos arquivos gerados em `out/`. Este helper mantém canonical e sitemap coerentes
 * com o modo de build. Links internos não precisam dele: o <Link> do Next já aplica a regra.
 */
const trailingSlash = process.env.STATIC_EXPORT === '1';

export function routePath(path: string): string {
  if (path === '/' || !trailingSlash) return path;
  return path.endsWith('/') ? path : `${path}/`;
}

export function absoluteUrl(path: string): string {
  return new URL(routePath(path), site.url).toString();
}
