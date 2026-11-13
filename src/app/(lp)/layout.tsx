import type { ReactNode } from 'react';
import { LpFooter } from '@/components/lp/LpFooter';
import { LpHeader } from '@/components/lp/LpHeader';
import { MobileCta } from '@/components/MobileCta';
import { waMessages } from '@/content/site';

/**
 * Landing pages de captação: sem a navegação do site (menos saídas), rodapé mínimo e
 * barra fixa de CTA no celular. `has-mobile-cta` reserva o espaço da barra no fim da página.
 */
export default function LpLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="has-mobile-cta">
      <LpHeader />
      {children}
      <LpFooter />
      <MobileCta sampleHref="#amostra" waText={waMessages.lpSample} />
    </div>
  );
}
