import Link from 'next/link';
import type { ReactNode } from 'react';
import { sampleHref } from '@/content/nav';
import { waLink, waMessages } from '@/content/site';
import { ArrowIcon, Icon } from './Icon';
import { Iso } from './Iso';
import { NewTab } from './NewTab';
import { Reveal } from './Reveal';

type CtaBandProps = {
  titleId?: string;
  title?: ReactNode;
  text?: ReactNode;
  /** Botões. Padrão: "Pedir amostra" (formulário) + "Chamar no WhatsApp". */
  actions?: ReactNode;
};

const defaultActions = (
  <>
    <Link className="btn btn--white" href={sampleHref}>
      Pedir amostra <ArrowIcon />
    </Link>
    <a className="btn btn--outline-white" href={waLink(waMessages.sample)} target="_blank" rel="noopener">
      <Icon name="wa" />
      Chamar no WhatsApp
      <NewTab />
    </a>
  </>
);

/** Faixa vermelha de chamada final ("Prove na sua chapa."). */
export function CtaBand({
  titleId = 'cta-titulo',
  title = 'Prove na sua chapa.',
  text = 'Conte como é a sua operação. A gente indica o blend certo para começar e envia uma amostra para você testar com a sua equipe.',
  actions = defaultActions,
}: CtaBandProps) {
  return (
    <section className="cta-band bg-red" aria-labelledby={titleId}>
      <Iso />
      <div className="container cta-band__inner">
        <Reveal>
          <h2 id={titleId}>{title}</h2>
          <p>{text}</p>
        </Reveal>
        <Reveal className="cta-band__actions" delay={0.1}>
          {actions}
        </Reveal>
      </div>
    </section>
  );
}
