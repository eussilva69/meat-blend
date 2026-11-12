'use client';

import { useEffect, useRef, useState } from 'react';

type Pill = { slug: string; name: string };

/**
 * Atalhos para os blends (/blends), com "scrollspy": a pílula do blend visível ganha
 * aria-current="true" e é trazida para a vista na barra rolável do celular.
 */
export function BlendPills({ items }: { items: Pill[] }) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    items.forEach(({ slug }) => {
      const el = document.getElementById(slug);
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, [items]);

  useEffect(() => {
    if (!active) return;
    listRef.current
      ?.querySelector(`a[href="#${CSS.escape(active)}"]`)
      ?.scrollIntoView({ inline: 'nearest', block: 'nearest' });
  }, [active]);

  return (
    <nav className="pills-bar" aria-label="Atalhos para os blends">
      <div className="container">
        <ul className="pills" ref={listRef}>
          {items.map(({ slug, name }) => (
            <li key={slug}>
              <a href={`#${slug}`} aria-current={active === slug ? 'true' : undefined}>
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
