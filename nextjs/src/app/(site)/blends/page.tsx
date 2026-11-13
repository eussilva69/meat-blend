import { BlendPills } from '@/components/BlendPills';
import { BlendRow } from '@/components/BlendRow';
import { FormatCards } from '@/components/Cards';
import { CtaBand } from '@/components/CtaBand';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { SectionHead } from '@/components/SectionHead';
import { SpecTable } from '@/components/SpecTable';
import { Tips } from '@/components/Steps';
import { blends, formats } from '@/content/blends';
import { photos } from '@/content/images';
import { pages } from '@/content/pages';
import { griddleTips } from '@/content/process';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumb } from '@/lib/schema';

export const metadata = buildMetadata(pages.blends);

export default function BlendsPage() {
  return (
    <main id="conteudo">
      <JsonLd data={breadcrumb(pages.blends.crumb, pages.blends.path)} />
      <PageHero
        crumb="blends"
        title="Blends de carne para cada estilo de burger."
        lead="Clássico, Costela, Smash e Fraldinha prontos para a chapa, ou um blend sob medida só da sua casa. Todos com gordura padronizada e gramatura exata, em disco, bolinha smash ou a granel."
        media={{
          image: { ...photos.medalhoesCrus4x3, alt: 'Porções de carne bovina crua sobre papel' },
          ribbon: 'seal',
        }}
        num="/02"
      />

      <section className="bg-paper" aria-label="Linha de blends">
        <BlendPills items={blends.map(({ slug, name }) => ({ slug, name }))} />
        <SpecTable />
        <div className="container">
          {blends.map((blend, i) => (
            <BlendRow key={blend.slug} blend={blend} priority={i === 0} />
          ))}
        </div>
        <div className="section--tight" />
      </section>

      {/* FORMATOS */}
      <section className="section bg-cream" aria-labelledby="formatos-titulo">
        <div className="container">
          <SectionHead eyebrow="Formatos" titleId="formatos-titulo" title="Disco, bolinha smash ou a granel." />
          <FormatCards items={formats} />
        </div>
      </section>

      {/* DICAS */}
      <section className="section bg-char" aria-labelledby="dicas-titulo">
        <div className="container">
          <SectionHead
            eyebrow="Na chapa"
            titleId="dicas-titulo"
            title="Quatro regras para tirar o máximo do blend."
          />
          <Tips items={griddleTips} />
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
