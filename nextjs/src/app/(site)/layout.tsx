import type { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { SiteMobileCta } from '@/components/SiteMobileCta';

/** Páginas do site institucional: cabeçalho com navegação, rodapé e barra de CTA no celular. */
export default function SiteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <SiteMobileCta />
    </>
  );
}
