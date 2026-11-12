import type { ChecklistItem } from '@/content/benefits';
import { withMarkers } from '@/lib/markers';
import { Icon } from './Icon';

type ChecklistProps = {
  items: readonly ChecklistItem[];
  /** Versão compacta (ícone 22px, espaçamento menor). */
  small?: boolean;
};

/**
 * Lista com ícone de check (ou outro ícone por item).
 * Cada item pode ter título (strong), texto (span) ou ambos.
 */
export function Checklist({ items, small = false }: ChecklistProps) {
  return (
    <ul className={small ? 'checklist checklist--sm' : 'checklist'}>
      {items.map((item) => (
        <li key={item.title ?? item.text}>
          <Icon name={item.icon ?? 'check'} />
          {item.title && item.text ? (
            <div>
              <strong>{item.title}</strong>
              <span>{withMarkers(item.text)}</span>
            </div>
          ) : item.title ? (
            <strong>{item.title}</strong>
          ) : (
            <span>{withMarkers(item.text ?? '')}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
