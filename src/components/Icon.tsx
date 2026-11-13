import type { ReactNode } from 'react';

/**
 * Ícones do sprite do site estático (estatico-src/partials/sprite.html), agora como SVG inline.
 * Todos usam viewBox 24×24 e herdam a cor por `currentColor`.
 */
const ICONS = {
  arrow: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </g>
  ),
  check: (
    <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 12.5l4.5 4.5L19.5 7" />
    </g>
  ),
  x: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
    </g>
  ),
  wa: (
    <path
      fill="currentColor"
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"
    />
  ),
  ig: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r=".6" fill="currentColor" />
    </g>
  ),
  mail: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.8 6.8l8.2 6.2 8.2-6.2" />
    </g>
  ),
  pin: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21.5s-7-6.3-7-11.7a7 7 0 0 1 14 0c0 5.4-7 11.7-7 11.7z" />
      <circle cx="12" cy="9.8" r="2.6" />
    </g>
  ),
  clock: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </g>
  ),
  repeat: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 2.5l3.5 3.5-3.5 3.5" />
      <path d="M3.5 11V9.5A3.5 3.5 0 0 1 7 6h13.5" />
      <path d="M7 21.5L3.5 18 7 14.5" />
      <path d="M20.5 13v1.5A3.5 3.5 0 0 1 17 18H3.5" />
    </g>
  ),
  chart: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 3.5v17h17" />
      <path d="M7.5 14.5l4-4 3 3 5.5-6" />
    </g>
  ),
  star: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.2l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17.2l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />
    </g>
  ),
  truck: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 6.5h11V16h-11z" />
      <path d="M13.5 9.5h4l3 3.2V16h-7" />
      <circle cx="6.5" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </g>
  ),
  doc: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 2.5H14l4.5 4.5v14.5h-12z" />
      <path d="M13.5 2.5v5h5M9.5 12.5h6M9.5 16.5h6" />
    </g>
  ),
  shield: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.8l7.5 2.8v6c0 4.6-3.2 8.3-7.5 9.6-4.3-1.3-7.5-5-7.5-9.6v-6z" />
      <path d="M8.6 12.2l2.4 2.4 4.4-4.6" />
    </g>
  ),
  snow: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.5v19M3.8 7.25l16.4 9.5M3.8 16.75l16.4-9.5" />
      <path d="M9.3 4.2L12 6.4l2.7-2.2M9.3 19.8l2.7-2.2 2.7 2.2" />
    </g>
  ),
  scale: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v16M7 20h10M4.5 7.5h15" />
      <path d="M7 7.5L4 14a3 3 0 0 0 6 0L7 7.5zM17 7.5L14 14a3 3 0 0 0 6 0l-3-6.5z" />
    </g>
  ),
  search: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.2-4.2" />
    </g>
  ),
  flame: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21c-3.9 0-6.5-2.6-6.5-6.2 0-3.4 2.3-5.4 3.6-7.6.6 1.6 1.4 2.6 2.4 3.1C11.6 7.1 13 4.6 15 3c.2 2.8 3.5 5.6 3.5 11.2 0 3.9-2.7 6.8-6.5 6.8z" />
    </g>
  ),
  alert: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.5l9.5 16.5h-19z" />
      <path d="M12 10v4.5M12 17.3v.1" />
    </g>
  ),
  box: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.8l8.5 4.6v9.2L12 21.2l-8.5-4.6V7.4z" />
      <path d="M3.5 7.4L12 12l8.5-4.6M12 12v9.2" />
    </g>
  ),
  users: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8.5" r="3.5" />
      <path d="M2.5 20c.6-3.6 3.3-5.5 6.5-5.5s5.9 1.9 6.5 5.5" />
      <path d="M16 5.2a3.5 3.5 0 0 1 0 6.6M18 14.8c2 .6 3.2 2.3 3.5 5.2" />
    </g>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof ICONS;

type IconProps = {
  name: IconName;
  /** Classe do <svg>. Padrão: "icon" (1.25em). Ex.: "icon icon--arrow", "card__icon". */
  className?: string;
};

/** Ícone decorativo (aria-hidden). Para ícones com significado, acompanhe de texto visível. */
export function Icon({ name, className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {ICONS[name]}
    </svg>
  );
}

/** Seta "→" dos botões e links (classe icon icon--arrow, que anima no hover). */
export function ArrowIcon() {
  return <Icon name="arrow" className="icon icon--arrow" />;
}
