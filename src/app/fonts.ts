import localFont from 'next/font/local';

/**
 * Exo (marca/títulos): WOFF2 variável (100–900) com subset latino (~20 KB), gerado a partir do
 * arquivo oficial do cliente (Exo-Variable.ttf, guardado em estatico/assets/fonts). Licença OFL
 * em ./fonts/Exo-OFL.txt. Exposta como --font-exo e ligada a --f-display em src/styles/tokens.css.
 */
export const exo = localFont({
  src: './fonts/exo-latin.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-exo',
});

/**
 * Hanken Grotesk (textos): WOFF2 variável (100–900 / 400–700) com subset latino (~35 KB),
 * servida localmente e sem dependência externa de build ou Google Fonts.
 * Licença OFL em ./fonts/HankenGrotesk-OFL.txt.
 * Exposta como --font-hanken e ligada a --f-body em src/styles/tokens.css.
 */
export const hanken = localFont({
  src: './fonts/hanken-grotesk-latin.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-hanken',
});
