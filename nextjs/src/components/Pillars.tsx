import type { Pillar } from '@/content/brand';
import { stagger } from '@/lib/format';
import { withMarkers } from '@/lib/markers';
import { Reveal } from './Reveal';

/** Três pilares da marca (Exclusiva / Rigorosa / Segura) em colunas. */
export function Pillars({ items }: { items: Pillar[] }) {
  return (
    <ul className="pillars">
      {items.map((pillar, i) => (
        <Reveal as="li" key={pillar.title} className="pillar" delay={stagger(i, 0.08)}>
          <h3>{pillar.title}</h3>
          <p>{withMarkers(pillar.text)}</p>
        </Reveal>
      ))}
    </ul>
  );
}
