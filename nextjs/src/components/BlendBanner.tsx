import Image from 'next/image';
import Link from 'next/link';
import type { UrlObject } from 'url';
import type { CustomBlend } from '@/content/blends';
import { ArrowIcon } from './Icon';
import { Reveal } from './Reveal';

type BlendBannerProps = {
  blend: CustomBlend;
  /** Com `href`, a faixa inteira é link (home). Sem `href`, é <div> com link "#amostra" (LP). */
  href?: string | UrlObject;
  label: string;
  text: string;
};

/** Faixa vermelha do blend Sob medida, abaixo da grade de blends. */
export function BlendBanner({ blend, href, label, text }: BlendBannerProps) {
  const content = (
    <>
      <Image src={blend.image.src} alt="" width={96} height={87} unoptimized />
      <div>
        <h3>{blend.name}</h3>
        <p>{text}</p>
      </div>
    </>
  );

  return (
    <Reveal>
      {href ? (
        <Link className="blend-banner bg-red" href={href}>
          {content}
          <span className="link-arrow">
            {label} <ArrowIcon />
          </span>
        </Link>
      ) : (
        <div className="blend-banner bg-red">
          {content}
          <a className="link-arrow" href="#amostra">
            {label} <ArrowIcon />
          </a>
        </div>
      )}
    </Reveal>
  );
}
