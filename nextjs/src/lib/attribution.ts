/**
 * Origem do lead: UTMs (utm_source / utm_medium / utm_campaign) e a página anterior do site,
 * guardados na sessão do navegador. A navegação do Next é client-side, por isso a página
 * anterior vem daqui e não de `document.referrer`.
 * Tudo em try/catch: com sessionStorage bloqueado (modo privado etc.) o envio segue normal.
 */
const safe = {
  get: (k: string): string => {
    try {
      return sessionStorage.getItem(k) ?? '';
    } catch {
      return '';
    }
  },
  set: (k: string, v: string): void => {
    try {
      sessionStorage.setItem(k, v);
    } catch {
      /* modo privado */
    }
  },
};

/** Normaliza o caminho (sem barra final, que aparece na exportação estática). */
const clean = (pathname: string): string => (pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname);

export function rememberVisit(pathname: string, search: URLSearchParams): void {
  const utm = ['utm_source', 'utm_medium', 'utm_campaign']
    .map((k) => search.get(k))
    .filter(Boolean)
    .join(' / ');
  if (utm) safe.set('mb-utm', utm);
  const path = clean(pathname);
  const current = safe.get('mb-current');
  if (current && current !== path) safe.set('mb-prev', current);
  safe.set('mb-current', path);
}

/** "instagram / cpc / amostra" ou "". */
export const getOrigin = (): string => safe.get('mb-utm');

/** Página do site visitada antes da atual, ou "". */
export const getFromPage = (): string => safe.get('mb-prev');
