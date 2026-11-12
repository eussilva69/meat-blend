import type { NextConfig } from 'next';

/**
 * Dois modos de build:
 *
 * - Padrão (Node.js / Vercel): `npm run build` + `npm start`. O next/image gera WebP nos
 *   tamanhos de `deviceSizes` a partir dos JPEGs recortados de public/img/fotos.
 * - Exportação estática: `STATIC_EXPORT=1 npm run build` gera a pasta `out/` com HTML/CSS/JS
 *   puros, para hospedagem comum. Sem servidor de imagens, o loader de src/lib/imageLoader.ts
 *   aponta para as variantes WebP pré-geradas (`<nome>-480|800|1200.webp`).
 */
const isStaticExport = process.env.STATIC_EXPORT === '1';

const images: NextConfig['images'] = {
  formats: ['image/webp'],
  deviceSizes: [480, 800, 1200, 1600],
  imageSizes: [],
  ...(isStaticExport ? { loader: 'custom' as const, loaderFile: './src/lib/imageLoader.ts' } : {}),
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images,
  ...(isStaticExport ? { output: 'export' as const, trailingSlash: true } : {}),
};

export default nextConfig;
