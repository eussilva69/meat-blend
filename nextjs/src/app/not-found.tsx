import type { Metadata } from 'next';
import Link from 'next/link';
import { Crumb } from '@/components/Crumb';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { SiteMobileCta } from '@/components/SiteMobileCta';
import { pages } from '@/content/pages';

// O Next injeta <meta name="robots" content="noindex"> automaticamente no 404.
export const metadata: Metadata = {
  title: pages.notFound.title,
  description: pages.notFound.description,
};

/** 404 (rotas inexistentes). Na exportação estática vira out/404.html. */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <section className="notfound dark">
          <div className="container">
            <Crumb current="404" />
            <h1 className="h1" style={{ maxWidth: '12ch' }}>
              Esse corte não está no cardápio.
            </h1>
            <p className="lead" style={{ marginTop: 24 }}>
              A página que você procura não existe ou mudou de endereço.
            </p>
            <div className="hero__actions">
              <Link className="btn btn--red" href="/">
                Voltar ao início
              </Link>
              <Link className="btn btn--outline-light" href="/blends">
                Ver os blends
              </Link>
            </div>
          </div>
          <span className="page-hero__num" aria-hidden="true">
            /404
          </span>
        </section>
      </main>
      <Footer />
      <SiteMobileCta />
    </>
  );
}
