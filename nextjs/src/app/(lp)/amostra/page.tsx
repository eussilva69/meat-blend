import { BlendBanner } from '@/components/BlendBanner';
import { BlendGrid } from '@/components/BlendCard';
import { PainCards } from '@/components/Cards';
import { Checklist } from '@/components/Checklist';
import { CtaBand } from '@/components/CtaBand';
import { Eyebrow } from '@/components/Eyebrow';
import { Faq } from '@/components/Faq';
import { Icon } from '@/components/Icon';
import { Iso } from '@/components/Iso';
import { CompareTable } from '@/components/lp/CompareTable';
import { Marquee } from '@/components/Marquee';
import { NewTab } from '@/components/NewTab';
import { Pillars } from '@/components/Pillars';
import { Reveal } from '@/components/Reveal';
import { SectionHead } from '@/components/SectionHead';
import { Steps } from '@/components/Steps';
import { WhatsAppForm } from '@/components/WhatsAppForm';
import { lpHighlights, lpPains } from '@/content/benefits';
import { customBlend, featuredBlends } from '@/content/blends';
import { marqueeAudience, pillarsLp } from '@/content/brand';
import { faqLp } from '@/content/faq';
import { lpForm } from '@/content/forms';
import { pages } from '@/content/pages';
import { lpSteps } from '@/content/process';
import { site, waLink, waMessages } from '@/content/site';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata(pages.amostra);

/** Landing page de captação (pedido de amostra). Equivale a estatico/lp/index.html. */
export default function AmostraPage() {
  return (
    <main id="conteudo">
      {/* HERO + FORMULÁRIO */}
      <section className="lp-hero dark">
        <Iso />
        <div className="container lp-hero__grid">
          <div>
            <Eyebrow>Para hamburguerias, dark kitchens e food trucks</Eyebrow>
            <h1 className="display" style={{ marginTop: 24 }}>
              Seu burger <em>igual</em> em todo pedido.
            </h1>
            <p className="lead">
              Blend de carne bovina com gordura padronizada, porcionado na gramatura exata e entregue congelado. Peça
              uma amostra e teste na sua chapa antes de fechar.
            </p>
            <Checklist items={lpHighlights} small />
          </div>

          <div className="form-card" id="amostra">
            <div className="form-card__head">
              <h2>Peça sua amostra</h2>
              <p>Leva 30 segundos. O WhatsApp abre com a sua mensagem pronta: é só tocar em enviar.</p>
            </div>
            <WhatsAppForm config={lpForm} />
          </div>
        </div>
      </section>

      <Marquee words={marqueeAudience} repeat={8} />

      {/* O PROBLEMA */}
      <section className="section bg-paper" aria-labelledby="dores-titulo">
        <div className="container">
          <SectionHead
            eyebrow="O problema"
            titleId="dores-titulo"
            title="Se isso acontece na sua cozinha, o problema não é o chapeiro."
          />
          <PainCards items={lpPains} />
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="section bg-char" aria-labelledby="lp-como-titulo">
        <div className="container">
          <SectionHead
            eyebrow="Como funciona"
            titleId="lp-como-titulo"
            title="Da amostra ao pedido, em três passos."
            action={
              <a className="btn btn--red" href="#amostra">
                Pedir amostra
              </a>
            }
          />
          <Steps items={lpSteps} />
        </div>
      </section>

      {/* BLENDS */}
      <section className="section bg-paper" aria-labelledby="lp-blends-titulo">
        <div className="container">
          <SectionHead
            eyebrow="Blends"
            titleId="lp-blends-titulo"
            title="Escolha por onde começar."
            lead="Não sabe qual? Conte a sua operação e a gente indica."
            action={
              <a className="btn btn--red" href="#amostra">
                Pedir amostra
              </a>
            }
          />
          <BlendGrid blends={featuredBlends} short />
          <BlendBanner blend={customBlend} label="Pedir amostra" text={customBlend.summaryShort} />
        </div>
      </section>

      {/* A DIFERENÇA */}
      <section className="section bg-char" aria-labelledby="dif-titulo">
        <div className="container">
          <SectionHead
            eyebrow="A diferença"
            titleId="dif-titulo"
            title={
              <>
                Do jeito de sempre <span className="vs">vs.</span>
                <br />
                {site.nameLower}
              </>
            }
          />
          <CompareTable />
        </div>
      </section>

      {/* POR QUE CONFIAR */}
      <section className="section bg-red" aria-labelledby="lp-pilares-titulo">
        <div className="container">
          <SectionHead
            eyebrow="Por que confiar"
            titleId="lp-pilares-titulo"
            title="Exclusiva, rigorosa e segura. Na prática."
          />
          <Pillars items={pillarsLp} />
        </div>
      </section>

      {/* DÚVIDAS */}
      <section className="section bg-paper" aria-labelledby="lp-faq-titulo">
        <div className="container split split--top split--wide-left">
          <Reveal className="stack">
            <Eyebrow>Dúvidas</Eyebrow>
            <h2 className="h2" id="lp-faq-titulo">
              Antes de pedir a amostra.
            </h2>
          </Reveal>
          <Faq items={faqLp} />
        </div>
      </section>

      {/* CTA FINAL */}
      <CtaBand
        titleId="lp-cta-titulo"
        text="Peça sua amostra, teste com a sua equipe e descubra o blend que vai virar a assinatura da sua casa."
        actions={
          <>
            <a className="btn btn--white" href="#amostra">
              Pedir amostra
            </a>
            <a className="btn btn--outline-white" href={waLink(waMessages.lpSample)} target="_blank" rel="noopener">
              <Icon name="wa" />
              Chamar no WhatsApp
              <NewTab />
            </a>
          </>
        }
      />
    </main>
  );
}
