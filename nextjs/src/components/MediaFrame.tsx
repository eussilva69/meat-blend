import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import type { ImageAsset } from '@/content/images';
import { imageSizes } from '@/lib/imageSizes';
import { Reveal } from './Reveal';

type MediaFrameProps = {
  image: ImageAsset;
  alt: string;
  /** Proporção: padrão 4/5; square 1/1; tall 3/4; wide 3/2. */
  variant?: 'square' | 'tall' | 'wide';
  /** Etiqueta vermelha no canto ("/rigorosa"). */
  tag?: ReactNode;
  sizes?: string;
  /** object-position da foto (ex.: "50% 40%"). */
  position?: string;
  /** Anima a entrada (data-reveal). Número = atraso em segundos. */
  reveal?: boolean | number;
  style?: CSSProperties;
};

/** Foto recortada com cantos arredondados e etiqueta opcional. */
export function MediaFrame({
  image,
  alt,
  variant,
  tag,
  sizes = imageSizes.half,
  position,
  reveal = false,
  style,
}: MediaFrameProps) {
  const className = variant ? `media-frame media-frame--${variant}` : 'media-frame';
  const content = (
    <>
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        style={position ? { objectPosition: position } : undefined}
      />
      {tag ? (
        <span className="tag" aria-hidden="true">
          {tag}
        </span>
      ) : null}
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
