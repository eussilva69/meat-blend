import { site, waLink, waMessages } from '@/content/site';
import { BrandLogo } from '../BrandLogo';
import { HeaderShell } from '../HeaderShell';
import { Icon } from '../Icon';
import { NewTab } from '../NewTab';

/**
 * Cabeçalho enxuto da landing page: logo SEM link (nenhuma saída acidental) e WhatsApp.
 * No celular o botão vira só ícone (o texto fica para leitores de tela).
 */
export function LpHeader() {
  return (
    <HeaderShell>
      <span className="brand">
        <BrandLogo alt={site.nameLower} width={118} height={48} eager />
      </span>
      <a className="btn btn--outline-light btn--sm" href={waLink(waMessages.lpHeader)} target="_blank" rel="noopener">
        <Icon name="wa" />
        <span className="btn__label">Chamar no WhatsApp</span>
        <NewTab />
      </a>
    </HeaderShell>
  );
}
