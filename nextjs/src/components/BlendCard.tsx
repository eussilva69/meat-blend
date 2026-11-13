import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { blendHref, type StandardBlend } from '@/content/blends';
import { stagger } from '@/lib/format';
import { imageSizes } from '@/lib/imageSizes';
import { Chips, FatRatio, formatWeight } from './BlendSpecs';
import { ArrowIcon } from './Icon';
import { Reveal } from './Reveal';

type BlendCardProps = {
  blend: StandardBlend;
  /** Card clicável que leva a /blends#slug, com sinalizador "Ver blend →" (home). Sem link = <article> (LP). */
  linked?: boolean;
  /** Usa o texto curto (landing page). */
  short?: boolean;
};

export function BlendCard({ blend, linked = false, short = false }: BlendCardProps) {
  const titleId = `card-${blend.slug}-t`;
  const descId = `card-${blend.slug}-d`;

  const body: ReactNode = (
    <>
      <div className="blend-card__media">
        <Image
          src={blend.image.src}
          alt=""
          width={blend.image.width}
          height={blend.image.height}
          sizes={imageSizes.card}
          style={blend.image.position ? { objectPosition: blend.image.position } : undefined}
        />
      </div>
      <div className="blend-card__body">
        <div className="blend-card__top">
          <h3 id={titleId}>{blend.name}</h3>
        </div>
        <p className="blend-card__cuts" id={descId}>
          {short ? blend.summaryShort : blend.summary}
        </p>
        <div>
          <FatRatio lean={blend.lean} fat={blend.fat} />
        </div>
        <Chips items={blend.weights.map(formatWeight)} label="Gramaturas" />
        {linked ? (
          <span className="link-arrow blend-card__more" aria-hidden="true">
            Ver blend <ArrowIcon />
          </span>
        ) : null}
      </div>
    </>
  );

  return linked ? (
    <Link className="blend-card" href={blendHref(blend)} aria-labelledby={titleId} aria-describedby={descId} scroll={false}>
      {body}
    </Link>
  ) : (
    <article className="blend-card">{body}</article>
  );
}

/**
 * Grade dos blends de linha com entrada escalonada.
 * No celular vira carrossel horizontal (scroll-snap) focável por teclado.
 */
export function BlendGrid({ blends, linked, short }: { blends: StandardBlend[]; linked?: boolean; short?: boolean }) {
  return (
    <ul className="blend-grid" tabIndex={0} role="region" aria-label="Blends (role para o lado para ver todos)">
      {blends.map((blend, i) => (
        <Reveal as="li" key={blend.slug} delay={stagger(i, 0.06)}>
          <BlendCard blend={blend} linked={linked} short={short} />
        </Reveal>
      ))}
    </ul>
  );
}
