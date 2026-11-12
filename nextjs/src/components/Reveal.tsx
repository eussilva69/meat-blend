'use client';

import { useEffect, useRef, type CSSProperties, type HTMLAttributes } from 'react';

/**
 * Animação de entrada ao rolar (fade + subida), como o `data-reveal` do site estático.
 *
 * Regras:
 * - O elemento sai do servidor VISÍVEL (sem JS, nada fica escondido).
 * - Depois da hidratação, só esconde (`data-reveal="pending"`) o que ainda está fora da
 *   tela; ao entrar na viewport vira `data-reveal="in"` e anima (ver src/styles/motion.css).
 * - Com "reduzir movimento" ativo no sistema, não esconde nem anima nada.
 */

type RevealTag = 'div' | 'li' | 'figure' | 'article' | 'aside';

type RevealProps = HTMLAttributes<HTMLElement> & {
  /** Elemento renderizado (padrão: div). */
  as?: RevealTag;
  /** Atraso da animação em segundos (vira a variável CSS --d). */
  delay?: number;
};

let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  sharedObserver ??= new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute('data-reveal', 'in');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
  );
  return sharedObserver;
}

function isInViewport(el: Element): boolean {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

/** Interseção que satisfaz o tipo de `ref` de todas as tags aceitas. */
type RevealElement = HTMLDivElement & HTMLLIElement;

export function Reveal({ as: Tag = 'div', delay, style, children, ...rest }: RevealProps) {
  const ref = useRef<RevealElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Já está na tela: não esconde (evita "piscar" conteúdo que o visitante já está vendo).
    if (isInViewport(el)) return;

    el.setAttribute('data-reveal', 'pending');
    const observer = getObserver();
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  const mergedStyle = delay ? ({ ...style, '--d': `${delay}s` } as CSSProperties) : style;

  return (
    <Tag ref={ref} data-reveal="" style={mergedStyle} {...rest}>
      {children}
    </Tag>
  );
}
