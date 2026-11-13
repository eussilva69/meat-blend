/**
 * Valores de `sizes` do next/image para cada contexto de layout.
 * Base: container de 1240px + respiro lateral; quebras em 1100/900/640px (responsive.css).
 * Ajuste aqui se o layout mudar, para o navegador baixar a resolução certa.
 */
export const imageSizes = {
  /** Foto do hero da home (coluna .88fr ao lado do texto). */
  hero: '(max-width: 900px) 92vw, 520px',
  /** Foto do hero de página com mídia (Blends, Para hamburguerias). */
  pageHero: '(max-width: 900px) 92vw, 540px',
  /** Metade de um .split ou .media-frame. */
  half: '(max-width: 900px) 92vw, 580px',
  /** Foto de um .blend-row. */
  row: '(max-width: 900px) 92vw, 590px',
  /** Foto grande do .media-stack (86% da metade). */
  stackMain: '(max-width: 900px) 92vw, 500px',
  /** Foto pequena sobreposta do .media-stack. */
  stackSmall: '(max-width: 900px) 42vw, 260px',
  /** Card da .blend-grid: carrossel (80%) no celular, 2 colunas até 1100px, 4 acima. */
  card: '(max-width: 640px) 80vw, (max-width: 1100px) 46vw, 300px',
} as const;
