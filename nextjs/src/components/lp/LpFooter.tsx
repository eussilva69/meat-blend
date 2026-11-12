import Link from 'next/link';
import { privacyLink } from '@/content/nav';
import { site } from '@/content/site';
import { withMarkers } from '@/lib/markers';
import { BrandLogo } from '../BrandLogo';
import { CurrentYear } from '../CurrentYear';
import { NewTab } from '../NewTab';

const buildYear = new Date().getFullYear();

/** Rodapé mínimo da landing page (privacidade abre em nova aba). */
export function LpFooter() {
  return (
    <footer className="lp-footer">
      <div className="container">
        <BrandLogo alt={site.nameLower} width={110} height={45} />
        <p>
          © <CurrentYear buildYear={buildYear} /> {site.name} · CNPJ {site.cnpj} · Registro{' '}
          {withMarkers(site.sanitaryRegistration)}
        </p>
        <nav aria-label="Links do rodapé">
          <Link href="/">Visitar o site</Link>
          <Link href={privacyLink.href} target="_blank" rel="noopener">
            {privacyLink.label}
            <NewTab />
          </Link>
        </nav>
      </div>
    </footer>
  );
}
