import type { FaqItem } from '@/content/faq';
import { withMarkers } from '@/lib/markers';
import { Reveal } from './Reveal';

/** Perguntas frequentes em <details> nativos (abrem sem JavaScript). */
export function Faq({ items, delay = 0.08 }: { items: FaqItem[]; delay?: number }) {
  return (
    <Reveal className="faq" delay={delay}>
      {items.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <div className="faq__answer">
            {item.answer.map((paragraph) => (
              <p key={paragraph}>{withMarkers(paragraph)}</p>
            ))}
          </div>
        </details>
      ))}
    </Reveal>
  );
}
