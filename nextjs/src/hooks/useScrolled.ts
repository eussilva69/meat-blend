'use client';

import { useSyncExternalStore } from 'react';

const THRESHOLD = 24;

function subscribe(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}

const getSnapshot = () => window.scrollY > THRESHOLD;
const getServerSnapshot = () => false;

/** `true` quando a página rolou mais de 24px (cabeçalho ganha fundo sólido). */
export function useScrolled(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
