import Image from 'next/image';
import { Checklist } from '@/components/Checklist';
import { CtaBand } from '@/components/CtaBand';
import { Eyebrow } from '@/components/Eyebrow';
import { JsonLd } from '@/components/JsonLd';
import { MediaFrame } from '@/components/MediaFrame';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { SectionHead } from '@/components/SectionHead';
import { valueRows } from '@/content/brand';
import { brandImages, photos } from '@/content/images';
import { pages } from '@/content/pages';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumb } from '@/lib/schema';

export const metadata = buildMetadata(pages.sobre);

export default function SobrePage() {
  return (
    <main id="conteudo">
      <JsonLd data={breadcrumb(pages.sobre.crumb, pages.sobre.path)} />
      <PageHero
        crumb="a marca"
        title={
          <>
            Carne é commodity. Blend é <em>assinatura</em>.
          </>
        }
        lead="A Meat Blend desenvolve e produz blends de carne bovina para hamburguerias que levam o burger a sério."
        num="/01"
      />

      {/* QUEM SOMOS */}
      <section className="section bg-paper">
        <div className="container split">
          <Reveal className="stack">
            <Eyebrow>Quem somos</Eyebrow>
            <h2 className="h2">Feita para somar à hamburgueria, não para aparecer mais que ela.</h2>
            <p className="lead">
              O burger é a estrela do cardápio. A carne é o que decide se ele brilha todo dia ou só de vez em quando.
            </p>
            <p>
              A Meat Blend nasceu para resolver a parte menos glamourosa e mais importante do hambúrguer: um blend
              consistente, porcionado com precisão e entregue do jeito certo. Selecionamos os cortes, controlamos a
              gordura, moemos no ponto e porcionamos na gramatura exata.
            </p>
            <p>
              Assim, quem está na chapa recebe sempre o mesmo produto. E quem está no caixa sabe exatamente quanto
              custa cada burger que sai da cozinha.
            </p>
          </Reveal>
          <MediaFrame
            image={photos.cortesCrus}
            alt="Dois cortes de carne bovina crua sobre tábua de madeira escura"
            ribbon="seal"
            reveal={0.1}
          />
        </div>
      </section>

      {/* O SÍMBOLO */}
      <section className="section bg-char dark" aria-labelledby="simbolo-titulo">
        <div className="container split split--reverse">
          <Reveal className="stack">
            <Eyebrow>O símbolo</Eyebrow>
            <h2 className="h2" id="simbolo-titulo">
              Um boi que não é igual aos outros.
            </h2>
            <p className="lead">
              Quase toda marca de carne usa um boi, um touro ou um cutelo. A gente também quis o boi, mas desenhado do
              nosso jeito.
            </p>
            <p>
              Um traço contínuo, geométrico e abstrato forma a cabeça do animal sem cair no óbvio. É moderno, limpo e
              fácil de reconhecer em qualquer tamanho: da etiqueta da embalagem ao letreiro da loja.
            </p>
            <p>
              E o nome vem em caixa-baixa de propósito: <strong>{site.nameLower}</strong> é uma marca próxima, que
              entra no dia a dia da cozinha para somar ao seu negócio.
            </p>
          </Reveal>
          <Reveal className="brand-tiles" delay={0.1}>
            <div className="brand-tile brand-tile--red brand-tile--wide">
              <Image
                src={brandImages.logotipoCreme.src}
                alt="Logotipo meat blend em creme sobre vermelho"
                width={400}
                height={164}
                unoptimized
              />
            </div>
            <div className="brand-tile brand-tile--cream">
              <Image
                src={brandImages.isotipoVermelho.src}
                alt="Isotipo da Meat Blend: cabeça de boi em traço contínuo"
                width={200}
                height={191}
                unoptimized
              />
            </div>
            <div className="brand-tile brand-tile--black">
              <Image
                src={brandImages.monogramaCreme.src}
                alt="Monograma mb da Meat Blend"
                width={200}
                height={182}
                unoptimized
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALORES */}
      <section className="section bg-cream" aria-labelledby="valores-titulo">
        <div className="container">
          <SectionHead eyebrow="Valores" titleId="valores-titulo" title="O que a gente promete em cada caixa." />
          {valueRows.map((row) => (
            <Reveal className="value-row" key={row.title}>
              <div>
                <h3>{row.title}</h3>
              </div>
              <div className="stack">
                <p className="lead">{row.lead}</p>
                <Checklist items={row.items.map((text) => ({ text }))} small />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
