import Image from 'next/image';
import { brandImages } from '@/content/images';

type BrandLogoProps = {
  /** Texto alternativo ("" quando o link ao redor já tem aria-label). */
  alt?: string;
  /** Largura/altura dos atributos HTML (o CSS define o tamanho final). */
  width: number;
  height: number;
  /** Logo do topo: carrega já (não é lazy). */
  eager?: boolean;
};

/** Logotipo "meat blend" em creme (SVG oficial). */
export function BrandLogo({ alt = '', width, height, eager = false }: BrandLogoProps) {
  return (
    <Image
      src={brandImages.logotipoCreme.src}
      alt={alt}
      width={width}
      height={height}
      priority={eager}
      unoptimized
    />
  );
}
