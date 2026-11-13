import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { ImageAsset } from '@/content/images';
import { imageSizes } from '@/lib/imageSizes';
import { PhotoRibbon, type PhotoRibbonVariant } from './PhotoRibbon';
import { Reveal } from './Reveal';

type MediaFrameProps = {
  image: ImageAsset;
  alt: string;
  /** Proporção: padrão 4/5; square 1/1; tall 3/4; wide 3/2. */
  variant?: 'square' | 'tall' | 'wide';
  /** Detalhe de fita visual vermelha (selo com isotipo, fita chanfrada ou canto). */
  ribbon?: boolean | PhotoRibbonVariant;
  sizes?: string;
  /** object-position da foto (ex.: "50% 40%"). */
  position?: string;
  /** Anima a entrada (data-reveal). Número = atraso em segundos. */
  reveal?: boolean | number;
  /** Prioridade no carregamento (quando na 1ª dobra). */
  priority?: boolean;
  style?: CSSProperties;
};

/** Foto recortada com cantos arredondados e fita vermelha decorativa. */
export function MediaFrame({
  image,
  alt,
  variant,
  ribbon,
  sizes = imageSizes.half,
  position,
  reveal = false,
  priority = false,
  style,
}: MediaFrameProps) {
  const className = variant ? `media-frame media-frame--${variant}` : 'media-frame';
  const ribbonVariant: PhotoRibbonVariant | null =
    ribbon === true ? 'seal' : typeof ribbon === 'string' ? ribbon : null;

  const content = (
    <>
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        style={position ? { objectPosition: position } : undefined}
        priority={priority}
      />
      {ribbonVariant ? <PhotoRibbon variant={ribbonVariant} /> : null}
    </>
  );

  if (reveal === false) {
    return (
      <figure className={className} style={style}>
        {content}
      </figure>
    );
  }
  return (
    <Reveal as="figure" className={className} style={style} delay={typeof reveal === 'number' ? reveal : undefined}>
      {content}
    </Reveal>
  );
}
