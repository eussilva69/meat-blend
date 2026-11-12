import Image from 'next/image';
import type { ReactNode } from 'react';
import type { ImageAsset } from '@/content/images';
import { imageSizes } from '@/lib/imageSizes';
import { Crumb } from './Crumb';

type PageHeroProps = {
  /** Trilha "meat blend/<crumb>". */
  crumb: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Botões abaixo do lead. */
  actions?: ReactNode;
  /** Foto de produto à direita (variante --media). É a candidata a LCP: carrega com prioridade. */
  media?: { image: ImageAsset & { alt: string; position?: string }; tag: string };
  /** Numeral gigante no canto ("/02"). */
  num?: string;
  /** Versão baixa (política de privacidade). */
  small?: boolean;
};

/** Abertura das páginas internas, no estilo das aberturas do guia de marca. */
export function PageHero({ crumb, title, lead, actions, media, num, small = false }: PageHeroProps) {
  const className = ['page-hero', small && 'page-hero--sm', media && 'page-hero--media', 'dark']
    .filter(Boolean)
    .join(' ');
  return (
    <section className={className}>
      <div className="container">
        <Crumb current={crumb} />
        <h1 className="h1">{title}</h1>
        {lead ? <p className="lead">{lead}</p> : null}
        {actions ? <div className="hero__actions">{actions}</div> : null}
        {media ? (
          <figure className="page-hero__media">
            <Image
              src={media.image.src}
              alt={media.image.alt}
              width={media.image.width}
              height={media.image.height}
              sizes={imageSizes.pageHero}
              style={media.image.position ? { objectPosition: media.image.position } : undefined}
              preload
            />
            <span className="tag" aria-hidden="true">
              {media.tag}
            </span>
          </figure>
        ) : null}
      </div>
      {num ? (
        <span className="page-hero__num" aria-hidden="true">
          {num}
        </span>
      ) : null}
    </section>
  );
}
