import type { IconCardItem } from '@/content/benefits';
import type { FormatShape } from '@/content/blends';
import { stagger } from '@/lib/format';
import { withMarkers } from '@/lib/markers';
import { Icon } from './Icon';
import { Reveal } from './Reveal';

type IconCardsProps = {
  items: IconCardItem[];
  /** No celular (≤ 640px) vira carrossel horizontal acessível por teclado. */
  carousel?: boolean;
  /** Nome do carrossel para leitores de tela (obrigatório com `carousel`). */
  label?: string;
};

/** Grade de cards brancos com ícone (benefícios, rastreabilidade). 3 colunas. */
export function IconCards({ items, carousel = false, label }: IconCardsProps) {
  return (
    <ul
      className={carousel ? 'cards cards--carousel' : 'cards'}
      {...(carousel ? { tabIndex: 0, role: 'region', 'aria-label': label } : {})}
    >
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={stagger(i % 3, 0.06)}>
          <div className="card">
            <Icon name={item.icon} className="card__icon" />
            <h3>{item.title}</h3>
            <p>{withMarkers(item.text)}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

/** Cards de "dor" da landing page (borda vermelha no topo). */
export function PainCards({ items }: { items: IconCardItem[] }) {
  return (
    <ul className="cards">
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={stagger(i, 0.06)}>
          <div className="pain">
            <Icon name={item.icon} />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

/** Ícones dos formatos (disco, bolinha, granel) no padrão de traço do sprite. */
export function FormatShapeIcon({ shape }: { shape: FormatShape }) {
  return (
    <svg
      className="format__shape"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {shape === 'disc' ? (
        <>
          <ellipse cx="12" cy="9" rx="8" ry="3" />
          <path d="M4 9v3c0 1.7 3.6 3 8 3s8-1.3 8-3V9M4 15v1c0 1.7 3.6 3 8 3s8-1.3 8-3v-1" />
        </>
      ) : shape === 'ball' ? (
        <>
          <circle cx="7.5" cy="15" r="3.5" />
          <circle cx="16.5" cy="15" r="3.5" />
          <circle cx="12" cy="8" r="3.5" />
        </>
      ) : (
        <>
          <path d="M6 8h12l-1.2 12H7.2z" />
          <path d="M9 8V5.5h6V8" />
          <path d="M9.5 13h5" />
        </>
      )}
    </svg>
  );
}

/** Formatos de entrega (/blends): régua vermelha no topo, sem cara de "card de opção". */
export function FormatCards({ items }: { items: readonly { shape: FormatShape; title: string; text: string }[] }) {
  return (
    <ul className="cards">
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={stagger(i, 0.08)}>
          <div className="card card--line format">
            <FormatShapeIcon shape={item.shape} />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
