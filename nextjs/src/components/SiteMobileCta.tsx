'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { sampleHref } from '@/content/nav';
import { waMessages } from '@/content/site';
import { MobileCta } from './MobileCta';

/** Barra fixa de CTA do site: em todas as páginas, exceto Contato (lá o formulário já está na dobra). */
export function SiteMobileCta() {
  const pathname = usePathname() ?? '/';
  const show = !/^\/contato\/?$/.test(pathname);

  useEffect(() => {
    document.body.classList.toggle('has-mobile-cta', show);
    return () => document.body.classList.remove('has-mobile-cta');
  }, [show]);

  return show ? <MobileCta sampleHref={sampleHref} waText={waMessages.sample} /> : null;
}
