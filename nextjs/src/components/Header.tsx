'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { headerCta, mainNav } from '@/content/nav';
import { site, waLink, waMessages } from '@/content/site';
import { BrandLogo } from './BrandLogo';
import { BrandValues } from './BrandValues';
import { HeaderShell } from './HeaderShell';
import { NewTab } from './NewTab';

/** Remove a barra final (export estático usa `/blends/`). */
const normalizePath = (path: string): string => (path.length > 1 ? path.replace(/\/+$/, '') : path);

/**
 * Tudo o que fica atrás do painel do menu aberto e deve sair do Tab/leitor de tela.
 * (A barra .mobile-cta cuida do próprio `inert`: ela se esconde com o menu aberto.)
 */
const BEHIND_MENU = 'main, footer, .skip-link';

/**
 * Cabeçalho do site: logo, "Pedir amostra" compacto (≤ 980px), botão do menu e navegação.
 * No celular o menu vira painel em tela cheia: aria-expanded, foco no 1º link ao abrir,
 * conteúdo atrás `inert`, Escape fecha (devolvendo o foco ao botão), fecha ao navegar.
 */
export function Header() {
  const pathname = normalizePath(usePathname() ?? '/');
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Trocou de rota: fecha o menu (ajuste de estado durante a renderização, sem efeito).
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Menu aberto: trava a rolagem, deixa o conteúdo de trás inerte e foca o 1º link.
  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    const behind = document.querySelectorAll<HTMLElement>(BEHIND_MENU);
    behind.forEach((el) => {
      el.inert = open;
    });
    if (open) navRef.current?.querySelector('a')?.focus();
    return () => {
      document.body.classList.remove('nav-open');
      behind.forEach((el) => {
        el.inert = false;
      });
    };
  }, [open]);

  // Escape fecha o menu e devolve o foco ao botão.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // Voltou para o layout de desktop: garante o menu fechado.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 981px)');
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const close = () => setOpen(false);

  return (
    <HeaderShell>
      <Link className="brand" href="/" aria-label={`${site.name}: página inicial`} onClick={close}>
        <BrandLogo width={118} height={48} eager />
      </Link>
      <Link className="btn btn--red btn--sm header-cta" href={headerCta.href} onClick={close}>
        {headerCta.label}
      </Link>
      <button
        ref={toggleRef}
        className="nav-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="nav"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span className="sr-only">{open ? 'Fechar menu' : 'Abrir menu'}</span>
      </button>
      <nav ref={navRef} className={open ? 'nav is-open' : 'nav'} id="nav" aria-label="Principal">
        <ul>
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                onClick={close}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link className="btn btn--red btn--sm" href={headerCta.href} onClick={close}>
          {headerCta.label}
        </Link>
        <p className="nav__extra">
          <strong>
            <BrandValues />
          </strong>
          <br />
          <a href={waLink(waMessages.greeting)} target="_blank" rel="noopener">
            WhatsApp {site.phoneDisplay}
            <NewTab />
          </a>
        </p>
      </nav>
    </HeaderShell>
  );
}
