import type { StepItem } from '@/content/process';
import { pad2, stagger } from '@/lib/format';
import { withMarkers } from '@/lib/markers';
import { Reveal } from './Reveal';

/** Passos numerados em colunas (01, 02…), com traço vermelho no topo. */
export function Steps({ items }: { items: StepItem[] }) {
  return (
    <ol className={items.length === 3 ? 'steps steps--3' : 'steps'}>
      {items.map((step, i) => (
        <Reveal as="li" key={step.title} className="step" delay={stagger(i, 0.06)}>
          <span className="step__num">{pad2(i + 1)}</span>
          <h3>{step.title}</h3>
          <p>{withMarkers(step.text)}</p>
        </Reveal>
      ))}
    </ol>
  );
}

/** Dicas numeradas em 4 colunas (na chapa, armazenamento). */
export function Tips({ items }: { items: StepItem[] }) {
  return (
    <ol className="tips">
      {items.map((tip, i) => (
        <Reveal as="li" key={tip.title} className="tip" delay={stagger(i, 0.06)}>
          <span className="tip__num">{pad2(i + 1)}</span>
          <h3>{tip.title}</h3>
          <p>{withMarkers(tip.text)}</p>
        </Reveal>
      ))}
    </ol>
  );
}

/** Linha do tempo vertical do processo (/qualidade). */
export function Timeline({ items }: { items: StepItem[] }) {
  return (
    <ol className="timeline">
      {items.map((item, i) => (
        <Reveal as="li" key={item.title}>
          <span className="timeline__num">{pad2(i + 1)}</span>
          <div>
            <h3>{item.title}</h3>
            <p>{withMarkers(item.text)}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
