import Link from 'next/link';
import { footerBlends, footerNav, privacyLink } from '@/content/nav';
import { mailtoLink, site, waLink, waMessages } from '@/content/site';
import { withMarkers } from '@/lib/markers';
import { BrandLogo } from './BrandLogo';
import { BrandValues } from './BrandValues';
import { CurrentYear } from './CurrentYear';
import { Icon } from './Icon';
import { Iso } from './Iso';
import { NewTab } from './NewTab';

const buildYear = new Date().getFullYear();

/** Rodapé do site (todas as páginas, exceto a landing page). */
export function Footer() {
  return (
    <footer className="site-footer">
      <Iso />
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <BrandLogo alt={site.nameLower} width={150} height={62} />
            <p>Blends de carne bovina para hamburguerias. Porcionados na gramatura exata e entregues congelados.</p>
            <p className="footer-values">
              <BrandValues />
            </p>
          </div>
          <div>
            <h2 className="footer-title">Navegação</h2>
            <ul className="footer-links">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="footer-title">Blends</h2>
            <ul className="footer-links">
              {footerBlends.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="footer-title">Contato</h2>
            <ul className="footer-links footer-contact">
              <li>
                <a href={waLink(waMessages.greeting)} target="_blank" rel="noopener">
                  <Icon name="wa" />
                  {site.phoneDisplay}
                  <NewTab />
                </a>
              </li>
              <li>
                <a href={mailtoLink}>
                  <Icon name="mail" />
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.instagram.url} target="_blank" rel="noopener">
                  <Icon name="ig" />
                  {site.instagram.handle}
                  <NewTab />
                </a>
              </li>
              <li>
                <span>
                  <Icon name="pin" />
                  {site.address.city}
                </span>
              </li>
              <li>
                <span>
                  <Icon name="clock" />
                  {site.hours.short}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © <CurrentYear buildYear={buildYear} /> {site.name} · CNPJ {site.cnpj} · Registro{' '}
            {withMarkers(site.sanitaryRegistration)} · Todos os direitos reservados.
          </p>
          <p>
            <Link href={privacyLink.href}>{privacyLink.label}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
