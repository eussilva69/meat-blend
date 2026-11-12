/**
 * Registro das imagens em `public/img`. As dimensões são as do arquivo original
 * (usadas pelo next/image para reservar espaço e gerar o srcset).
 *
 * As fotos são PROVISÓRIAS (Unsplash). Ao trocar por fotos reais, mantenha o nome do
 * arquivo e atualize `width`/`height` aqui se a proporção mudar.
 */
export type ImageAsset = {
  src: string;
  width: number;
  height: number;
};

const photo = (file: string, width: number, height: number): ImageAsset => ({
  src: `/img/fotos/${file}`,
  width,
  height,
});

const brand = (file: string, width: number, height: number): ImageAsset => ({
  src: `/img/marca/${file}`,
  width,
  height,
});

/**
 * Cada foto já vem RECORTADA na proporção do slot principal (FX-14), em 1200 px (JPEG) +
 * variantes WebP `<nome>-480/-800/-1200.webp` usadas pela exportação estática
 * (src/lib/imageLoader.ts). No modo servidor o next/image gera os tamanhos sozinho.
 */
export const photos = {
  /** 4:5 · hero da home */
  heroSmash: photo('hero-smash.jpg', 1200, 1500),
  /** 5:4 · blend-row/card Clássico */
  burgerClassico: photo('burger-classico.jpg', 1200, 960),
  /** 5:4 · reserva */
  burgerDuplo: photo('burger-duplo.jpg', 1200, 960),
  /** 5:4 · blend-row/card Costela */
  burgerTriplo: photo('burger-triplo.jpg', 1200, 960),
  /** 5:4 · blend-row/card Fraldinha */
  burgerGourmet: photo('burger-gourmet.jpg', 1200, 960),
  /** 5:4 · blend-row/card Smash (recorte do hero-smash, FX-31) */
  smashLinha: photo('smash-linha.jpg', 1200, 960),
  /** 1:1 · home, Para hamburguerias */
  burgersTrio: photo('burgers-trio.jpg', 1200, 1200),
  /** 4:3 · hero de /hamburguerias */
  burgersTrio4x3: photo('burgers-trio-4x3.jpg', 1200, 900),
  /** 4:5 · Sobre e foto pequena do manifesto da home */
  cortesCrus: photo('cortes-crus.jpg', 1200, 1500),
  /** 4:5 · manifesto da home */
  medalhoesCrus: photo('medalhoes-crus.jpg', 1200, 1500),
  /** 4:3 · hero de /blends */
  medalhoesCrus4x3: photo('medalhoes-crus-4x3.jpg', 1200, 900),
  /** 3:4 · Qualidade (processo) */
  carneTemperos: photo('carne-temperos.jpg', 1200, 1600),
  /** 4:5 · Qualidade (cadeia de frio) */
  carneGelo: photo('carne-gelo.jpg', 1200, 1500),
} as const;

export const brandImages = {
  logotipoCreme: brand('logotipo-creme.svg', 2002, 822),
  monogramaCreme: brand('monograma-creme.svg', 1001, 913),
  isotipoVermelho: brand('isotipo-vermelho.svg', 1001, 954),
} as const;

export const ogImage = {
  src: '/img/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Logotipo meat blend e a frase “O blend que vira assinatura da sua casa” ao lado de um hambúrguer duplo',
} as const;
