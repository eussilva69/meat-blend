import type { Metadata, Viewport } from 'next';
import { Suspense, type ReactNode } from 'react';
import { VisitTracker } from '@/components/VisitTracker';
import { ogImage } from '@/content/images';
import { pages } from '@/content/pages';
import { site } from '@/content/site';
import { exo, hanken } from './fonts';
import './globals.css';

/** Padrões do site inteiro. Cada página completa com buildMetadata() (src/lib/metadata.ts). */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: pages.home.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  // Sem `robots` aqui: o padrão é indexar; o 404 recebe "noindex" automaticamente do Next.
  openGraph: {
    type: 'website',
    locale: site.locale,
    siteName: site.name,
    images: [{ url: ogImage.src, width: ogImage.width, height: ogImage.height, alt: ogImage.alt }],
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-escuro.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${exo.variable} ${hanken.variable}`}>
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        {children}
        <Suspense fallback={null}>
          <VisitTracker />
        </Suspense>
      </body>
    </html>
  );
}
