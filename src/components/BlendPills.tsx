'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Pill = { slug: string; name: string };

/**
 * Rola a barra horizontal de pílulas para manter a pílula ativa visível,
 * ajustando APENAS o `scrollLeft` do contêiner sem nunca chamar `scrollIntoView`
 * (que interfere na rolagem vertical da janela no Chrome/WebKit).
 */
function scrollPillInContainer(list: HTMLUListElement, slug: string, smooth = true) {
  const pill = list.querySelector<HTMLElement>(`a[href="#${CSS.escape(slug)}"]`);
  if (!pill) return;
  const listRect = list.getBoundingClientRect();
  const pillRect = pill.getBoundingClientRect();

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const actualSmooth = smooth && !prefersReducedMotion;

  if (pillRect.left < listRect.left) {
    const delta = pillRect.left - listRect.left - 16;
    list.scrollBy({ left: delta, behavior: actualSmooth ? 'smooth' : 'auto' });
  } else if (pillRect.right > listRect.right) {
    const delta = pillRect.right - listRect.right + 16;
    list.scrollBy({ left: delta, behavior: actualSmooth ? 'smooth' : 'auto' });
  }
}

/**
 * Atalhos para os blends (/blends), com scroll suave coordenado e scrollspy:
 * - O clique rola a página suavemente até a seção, descontando o cabeçalho fixo (68px)
 *   e a barra de pílulas pegajosa (sticky), sem sobressaltos ou cortes.
 * - Suprime temporariamente o scrollspy durante a rolagem do clique para evitar
 *   que seções intermediárias façam a pílula ativa piscar ou engasgar a animação.
 * - Nunca chama `element.scrollIntoView()` na pílula, preservando a suavidade da janela.
 */
export function BlendPills({ items }: { items: Pill[] }) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const isManualScrolling = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToSlug = useCallback(
    (slug: string, smooth = true) => {
      const target = document.getElementById(slug);
      if (!target) return;

      const pillsBar = document.querySelector<HTMLElement>('.pills-bar');

      // Em telas baixas (≤560px, como celular em paisagem), o cabeçalho e as pílulas não são fixos
      const isLowHeight = window.matchMedia('(max-height: 560px)').matches;
      let clearance = 24;
      if (!isLowHeight) {
        // Quando a página é rolada, o cabeçalho comprime para 68px
        const headerH = 68;
        const pillsH = pillsBar ? pillsBar.offsetHeight : 64;
        clearance = headerH + pillsH + 16;
      }
      const targetTop = target.getBoundingClientRect().top + window.scrollY - clearance;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const behavior = !smooth || prefersReducedMotion ? 'auto' : 'smooth';

      window.scrollTo({
        top: Math.max(0, Math.round(targetTop)),
        behavior,
      });

      if (listRef.current) {
        scrollPillInContainer(listRef.current, slug, smooth && !prefersReducedMotion);
      }
    },
    [],
  );

  const handlePillClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    isManualScrolling.current = true;
    setActive(slug);

    if (window.location.hash !== `#${slug}`) {
      window.history.pushState(null, '', `#${slug}`);
    }

    scrollToSlug(slug, true);

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isManualScrolling.current = false;
    }, 850);
  };

  // Trata hash inicial ou navegação vinda de outra página (ex.: home -> /blends#costela)
  useEffect(() => {
    let t1: ReturnType<typeof setTimeout> | undefined;
    let t2: ReturnType<typeof setTimeout> | undefined;

    const checkHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash && items.some((item) => item.slug === hash)) {
        isManualScrolling.current = true;
        setActive(hash);
        if (t1) clearTimeout(t1);
        if (t2) clearTimeout(t2);
        // Aguarda a hidratação e acomodação do layout (fotos/fontes)
        t1 = setTimeout(() => {
          scrollToSlug(hash, true);
          t2 = setTimeout(() => {
            isManualScrolling.current = false;
          }, 850);
        }, 120);
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => {
      window.removeEventListener('hashchange', checkHash);
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
    };
  }, [items, scrollToSlug]);

  // Se o usuário tocar ou rolar a roda do mouse durante a animação, libera o spy imediatamente
  useEffect(() => {
    const handleUserScroll = () => {
      if (isManualScrolling.current) {
        isManualScrolling.current = false;
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      }
    };
    window.addEventListener('wheel', handleUserScroll, { passive: true });
    window.addEventListener('touchstart', handleUserScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleUserScroll);
      window.removeEventListener('touchstart', handleUserScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Scrollspy: detecta qual blend está na tela ao rolar naturalmente
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const spy = new IntersectionObserver(
      (entries) => {
        if (isManualScrolling.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActive(id);
            if (listRef.current) {
              scrollPillInContainer(listRef.current, id, true);
            }
          }
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

  return (
    <nav className="pills-bar" aria-label="Atalhos para os blends">
      <div className="container">
        <ul className="pills" ref={listRef}>
          {items.map(({ slug, name }) => (
            <li key={slug}>
              <a
                href={`#${slug}`}
                aria-current={active === slug ? 'true' : undefined}
                onClick={(e) => handlePillClick(e, slug)}
                onKeyDown={(e) => {
                  if (e.key === ' ') {
                    e.preventDefault();
                    handlePillClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, slug);
                  }
                }}
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
