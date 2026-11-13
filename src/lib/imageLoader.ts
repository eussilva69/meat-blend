/**
 * Loader do next/image para a EXPORTAÇÃO ESTÁTICA (`STATIC_EXPORT=1`), que não tem servidor
 * de otimização. Aponta cada largura pedida para a variante WebP pré-gerada mais próxima
 * (`/img/fotos/<nome>-480|800|1200.webp`). Outras imagens (SVG de marca) passam como estão.
 */
const AVAILABLE = [480, 800, 1200];

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  if (!src.startsWith('/img/fotos/')) return src;
  const w = AVAILABLE.find((a) => a >= width) ?? AVAILABLE[AVAILABLE.length - 1];
  return src.replace(/\.jpe?g$/i, `-${w}.webp`);
}
