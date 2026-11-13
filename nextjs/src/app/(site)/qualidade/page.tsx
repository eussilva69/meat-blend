import { IconCards } from '@/components/Cards';
import { Checklist } from '@/components/Checklist';
import { CtaBand } from '@/components/CtaBand';
import { Eyebrow } from '@/components/Eyebrow';
import { JsonLd } from '@/components/JsonLd';
import { MediaFrame } from '@/components/MediaFrame';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { SectionHead } from '@/components/SectionHead';
import { Timeline, Tips } from '@/components/Steps';
import { coldChainChecklist, traceabilityCards } from '@/content/benefits';
import { photos } from '@/content/images';
import { pages } from '@/content/pages';
import { qualityTimeline, storageTips } from '@/content/process';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumb } from '@/lib/schema';

export const metadata = buildMetadata(pages.qualidade);

export default function QualidadePage() {
  return (
    <main id="conteudo">
      <JsonLd data={breadcrumb(pages.qualidade.crumb, pages.qualidade.path)} />
      <PageHero
        crumb="qualidade"
        title={
          <>
            Rigorosa no processo. <em>Segura</em> no prato.
          </>
        }
        lead="Consistência não é sorte: é método repetido todo dia, lote após lote."
        num="/04"
      />

      {/* PROCESSO */}
      <section className="section bg-paper" aria-labelledby="processo-titulo">
        <div className="container split split--top">
          <Reveal className="sticky">
            <Eyebrow>Processo</Eyebrow>
            <h2 className="h2" id="processo-titulo" style={{ marginTop: 18 }}>
              Seis etapas, nenhum atalho.
            </h2>
            <MediaFrame
              image={photos.carneTemperos}
              alt="Peça de carne bovina crua sobre tábua, com pimenta, alho e alecrim"
              variant="tall"
              ribbon="stripe"
              position="50% 45%"
              style={{ marginTop: 36 }}
            />
          </Reveal>
          <Timeline items={qualityTimeline} />
        </div>
      </section>

      {/* CADEIA DE FRIO */}
      <section className="section bg-char" aria-labelledby="frio-titulo">
        <div className="container split">
          <MediaFrame
            image={photos.carneGelo}
            alt="Corte de carne bovina crua sobre gelo picado"
            ribbon="seal"
            position="50% 40%"
            reveal
          />
          <Reveal className="stack stack--lg" delay={0.1}>
            <Eyebrow>Cadeia de frio</Eyebrow>
            <p className="bigstat">
              <span aria-hidden="true">
                −18<small>°C</small>
              </span>
              <span className="sr-only">Menos 18 graus Celsius</span>
            </p>
            <h2 className="h2" id="frio-titulo">
              Do nosso freezer até o seu, sem quebrar o frio.
            </h2>
            <p className="lead">
              Temperatura é segurança alimentar. Por isso o frio acompanha o blend em todas as etapas, da produção à
              sua câmara.
            </p>
            <Checklist items={coldChainChecklist} />
          </Reveal>
        </div>
      </section>

      {/* RASTREABILIDADE */}
      <section className="section bg-cream" aria-labelledby="garantias-titulo">
        <div className="container">
          <SectionHead eyebrow="Rastreabilidade" titleId="garantias-titulo" title="Tudo o que sai daqui tem registro." />
          <IconCards items={traceabilityCards} />
        </div>
      </section>

      {/* NA SUA COZINHA */}
      <section className="section bg-paper" aria-labelledby="armazenar-titulo">
        <div className="container">
          <SectionHead eyebrow="Na sua cozinha" titleId="armazenar-titulo" title="Como armazenar e preparar." />
          <Tips items={storageTips} />
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
