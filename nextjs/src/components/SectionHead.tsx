import type { ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';

type SectionHeadProps = {
  eyebrow: string;
  title: ReactNode;
  /** id do <h2>, para o aria-labelledby da <section>. */
  titleId?: string;
  lead?: ReactNode;
  /** Link ou botão alinhado à direita. */
  action?: ReactNode;
};

/** Cabeçalho de seção: sobretítulo + título (+ linha fina) + ação opcional. */
export function SectionHead({ eyebrow, title, titleId, lead, action }: SectionHeadProps) {
  return (
    <Reveal className="section-head">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="h2" id={titleId}>
          {title}
        </h2>
        {lead ? <p className="lead">{lead}</p> : null}
      </div>
      {action}
    </Reveal>
  );
}
