'use client';

import { useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

/**
 * Ano corrente no rodapé. O HTML sai com o ano do build e o navegador corrige
 * para o ano atual (como o `data-year` do site estático), sem erro de hidratação.
 */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  const year = useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => buildYear,
  );
  return <span>{year}</span>;
}
