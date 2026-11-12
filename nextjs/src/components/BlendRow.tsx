import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { blendContactHref, type Blend } from '@/content/blends';
import { imageSizes } from '@/lib/imageSizes';
import { Chips, FatRatio, formatWeight } from './BlendSpecs';
import { ArrowIcon } from './Icon';
import { Reveal } from './Reveal';

/** Bloco de um blend na página /blends: foto + especificações + botão para o formulário. */
export function BlendRow({ blend, priority = false }: { blend: Blend; priority?: boolean }) {
  const isCustom = blend.kind === 'custom';

  return (
    <article className={isCustom ? 'blend-row blend-row--red' : 'blend-row'} id={blend.slug}>
      <Reveal as="figure" className="blend-row__media">
        {blend.kind === 'standard' ? (
          <Image
            src={blend.image.src}
            alt={blend.image.alt}
            width={blend.image.width}
            height={blend.image.height}
            sizes={imageSizes.row}
            style={blend.image.position ? { objectPosition: blend.image.position } : undefined}
            loading={priority ? 'eager' : undefined}
          />
        ) : (
          <Image src={blend.image.src} alt="" width={blend.image.width} height={blend.image.height} unoptimized />
        )}
      </Reveal>
      <Reveal delay={0.08}>
        <h2>{blend.name}</h2>
        <p className="blend-row__cuts">{blend.cuts}</p>
        <p className="blend-row__desc">{blend.description}</p>
        <dl className="specs">
          {blend.kind === 'standard' ? (
            <>
              <dt>Gordura</dt>
              <dd>
                <FatRatio lean={blend.lean} fat={blend.fat} />
              </dd>
              <dt>Gramaturas</dt>
              <dd>
                <Chips items={blend.weights.map(formatWeight)} />
              </dd>
              <dt>Formato</dt>
              <dd>{blend.format}</dd>
              <dt>Ideal para</dt>
              <dd>{blend.idealFor}</dd>
            </>
          ) : (
            blend.specs.map((spec) => (
              <Fragment key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{Array.isArray(spec.value) ? <Chips items={spec.value} /> : spec.value}</dd>
              </Fragment>
            ))
          )}
        </dl>
        <div className="blend-row__cta">
          <Link className={isCustom ? 'btn btn--white' : 'btn btn--red'} href={blendContactHref(blend)}>
            {blend.ctaLabel} <ArrowIcon />
          </Link>
        </div>
      </Reveal>
    </article>
  );
}
