'use client';

import { useSyncExternalStore, type ReactNode } from 'react';
import { useScrolled } from '@/hooks/useScrolled';

const noopSubscribe = () => () => {};

/**
 * Barra fixa do topo (site e landing page).
 * Sem JS o fundo é sólido (legível sobre seções claras); depois da hidratação (`is-ready`)
 * fica transparente no topo e ganha fundo ao rolar (`is-scrolled`).
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const scrolled = useScrolled();
  const ready = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const className = ['site-header', ready && 'is-ready', scrolled && 'is-scrolled'].filter(Boolean).join(' ');
  return (
    <header className={className} data-header="">
      <div className="container site-header__bar">{children}</div>
    </header>
  );
}
