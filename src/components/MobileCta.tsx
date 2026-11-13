'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { waLink } from '@/content/site';
import { Icon } from './Icon';

type MobileCtaProps = {
  /** Destino de "Pedir amostra" (site: /contato#pedir-amostra; LP: #amostra). */
  sampleHref: string;
  /** Mensagem pronta do botão de WhatsApp. */
  waText: string;
};

const HERO = '.hero, .page-hero, .lp-hero, .notfound';

/**
 * Barra fixa de CTA no celular (≤ 640px; o CSS a esconde acima disso).
 * Aparece quando o hero sai da tela; some com um formulário visível, com o menu aberto
 * ou com foco dentro de um formulário. Escondida = `inert` (fora do Tab).
 */
export function MobileCta({ sampleHref, waText }: MobileCtaProps) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(true);
  const navRef = useRef<HTMLElement>(null);

  // Escondida = fora do Tab e da árvore de acessibilidade. (Via DOM: o menu também
  // liga/desliga `inert` nesta barra quando abre.)
  useEffect(() => {
    if (navRef.current) navRef.current.inert = hidden;
  }, [hidden]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const hero = document.querySelector(HERO);
    const card = document.querySelector('.form-card');
    let heroOn = Boolean(hero);
    let formOn = false;

    const sync = () => {
      const active = document.activeElement;
      setHidden(
        heroOn ||
          formOn ||
          document.body.classList.contains('nav-open') ||
          Boolean(active && active.closest('form')),
      );
    };

    const observers: IntersectionObserver[] = [];
    if (hero) {
      const io = new IntersectionObserver(([entry]) => {
        heroOn = entry.isIntersecting;
        sync();
      });
      io.observe(hero);
      observers.push(io);
    }
    if (card) {
      const io = new IntersectionObserver(
        ([entry]) => {
          formOn = entry.isIntersecting;
          sync();
        },
        { threshold: 0.15 },
      );
      io.observe(card);
      observers.push(io);
    }
    const onFocusOut = () => setTimeout(sync, 0);
    document.addEventListener('focusin', sync);
    document.addEventListener('focusout', onFocusOut);
    const mo = new MutationObserver(sync);
    mo.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observers.forEach((io) => io.disconnect());
      mo.disconnect();
      document.removeEventListener('focusin', sync);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, [pathname]);

  const isHash = sampleHref.startsWith('#');

  return (
    <nav ref={navRef} className={hidden ? 'mobile-cta is-hidden' : 'mobile-cta'} aria-label="Ações rápidas">
      {isHash ? (
        <a className="btn btn--red" href={sampleHref}>
          Pedir amostra
        </a>
      ) : (
        <Link className="btn btn--red" href={sampleHref}>
          Pedir amostra
        </Link>
      )}
      <a className="btn btn--outline-light" href={waLink(waText)} target="_blank" rel="noopener">
        <Icon name="wa" />
        <span className="sr-only">Chamar no WhatsApp (abre em nova aba)</span>
      </a>
    </nav>
  );
}
