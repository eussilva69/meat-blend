import Link from 'next/link';
import { site } from '@/content/site';

/** Trilha "meat blend/<página>" (landmark de navegação estruturado em lista semântica). */
export function Crumb({ current }: { current: string }) {
  return (
    <nav className="crumb" aria-label="Você está em">
      <ol className="crumb__list">
        <li className="crumb__item">
          <Link href="/">{site.nameLower}</Link>
        </li>
        <li className="crumb__sep" aria-hidden="true">/</li>
        <li className="crumb__item">
          <span aria-current="page">{current}</span>
        </li>
      </ol>
    </nav>
  );
}
