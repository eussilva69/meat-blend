import Link from 'next/link';
import { site } from '@/content/site';

/** Trilha "meat blend/<página>" (landmark de navegação, página atual marcada). */
export function Crumb({ current }: { current: string }) {
  return (
    <nav className="crumb" aria-label="Você está em">
      <Link href="/">{site.nameLower}</Link>/<span aria-current="page">{current}</span>
    </nav>
  );
}
