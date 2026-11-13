'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { rememberVisit } from '@/lib/attribution';

/** Guarda UTMs e a página anterior na sessão (linhas *Origem:* e *Página:* da mensagem). */
export function VisitTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    rememberVisit(pathname, new URLSearchParams(searchParams.toString()));
  }, [pathname, searchParams]);
  return null;
}
