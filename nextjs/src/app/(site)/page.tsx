import Image from 'next/image';
import Link from 'next/link';
import { BlendBanner } from '@/components/BlendBanner';
import { BlendGrid } from '@/components/BlendCard';
import { Checklist } from '@/components/Checklist';
import { CtaBand } from '@/components/CtaBand';
import { Eyebrow } from '@/components/Eyebrow';
import { ArrowIcon, Icon } from '@/components/Icon';
import { Iso } from '@/components/Iso';
import { JsonLd } from '@/components/JsonLd';
import { Marquee } from '@/components/Marquee';
import { MediaFrame } from '@/components/MediaFrame';
import { Pillars } from '@/components/Pillars';
import { Reveal } from '@/components/Reveal';
import { SectionHead } from '@/components/SectionHead';
import { Steps } from '@/components/Steps';
import { heroFacts, homeChecklist } from '@/content/benefits';
import { blendContactHref, customBlend, featuredBlends } from '@/content/blends';
import { marqueeValues, pillarsHome } from '@/content/brand';
import { photos } from '@/content/images';
import { sampleHref } from '@/content/nav';
import { pages } from '@/content/pages';
import { processSteps } from '@/content/process';
import { imageSizes } from '@/lib/imageSizes';
import { withMarkers } from '@/lib/markers';
import { buildMetadata } from '@/lib/metadata';
import { organization } from '@/lib/schema';

export const metadata = buildMetadata(pages.home);

export default function HomePage() {
  return (
    <main id="conteudo">
      <JsonLd data={organization()} />

      {/* HERO */}
      <section className="hero dark">
        <Iso />
        <div className="container">
          <div className="hero__grid">
            <div className="hero__copy">
              <Eyebrow>Blends de carne para hamburguerias</Eyebrow>
              <h1 className="display">
                O blend que vira <em>assinatura</em> da sua casa.
              </h1>
              <p className="lead">
                Gordura padronizada, gramatura exata e entrega congelada, pronto para a chapa. O burger sai igual de
                segunda a sábado e você sabe quanto custa cada um antes de vender.
              </p>
              <div className="hero__actions">
                <Link className="btn btn--red" href={sampleHref}>
                  Pedir amostra <ArrowIcon />
                </Link>
                <Link className="btn btn--outline-light" href="/blends">
                  Ver os blends
                </Link>
              </div>
              <p className="hero__note">
                {withMarkers(
                  'Venda para empresas [a confirmar: só CNPJ?] · Amostra para testar na sua chapa · Atendimento pelo WhatsApp',
                )}
              </p>
            </div>
            <figure className="hero__media">
              <Image
                src={photos.heroSmash.src}
                alt="Hambúrguer duplo com queijo derretido e picles, sobre fundo escuro"
                width={photos.heroSmash.width}
                height={photos.heroSmash.height}
                sizes={imageSizes.hero}
                preload
              />
              <span className="tag" aria-hidden="true">
                /exclusiva
              </span>
            </figure>
          </div>
          <ul className="hero__facts">
            {heroFacts.map((fact) => (
              <li className="fact" key={fact.title}>
                <strong>{fact.title}</strong>
                <span>{fact.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Marquee words={marqueeValues} repeat={4} />

      {/* A MARCA */}
      <section className="section bg-paper">
        <div className="container split">
          <Reveal className="stack">
            <Eyebrow>A marca</Eyebrow>
            <h2 className="h2">Hambúrguer bom não pode depender da sorte do dia.</h2>
            <p className="lead">
              Gordura que varia, peso no olho, fornecedor que troca a carne sem avisar. Toda hamburgueria conhece
              essas dores, e o cliente sente na primeira mordida.
            </p>
            <p>
              A Meat Blend existe para tirar a carne da sua lista de preocupações. A gente cuida do blend com rigor de
              ficha técnica e precisão de balança. Você cuida do resto: o pão, o molho, o atendimento e a fila na
              porta.
            </p>
            <p>
              <Link className="link-arrow" href="/sobre">
                Conhecer a marca <Icon name="arrow" />
              </Link>
            </p>
          </Reveal>
          <Reveal className="media-stack" delay={0.12}>
            <MediaFrame
              image={photos.medalhoesCrus}
              alt="Porções de carne bovina crua sobre papel, com sal e pimenta ao lado"
              sizes={imageSizes.stackMain}
              tag="/rigorosa"
            />
            <div className="media-stack__small">
              <Image
                src={photos.cortesCrus.src}
                alt="Dois cortes de carne bovina crua sobre tábua de madeira escura"
                width={photos.cortesCrus.width}
                height={photos.cortesCrus.height}
                sizes={imageSizes.stackSmall}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PILARES */}
      <section className="section bg-red" aria-labelledby="pilares-titulo">
        <div className="container">
          <SectionHead eyebrow="O que nos move" titleId="pilares-titulo" title="Três palavras. Nenhuma negociável." />
          <Pillars items={pillarsHome} />
        </div>
      </section>

      {/* BLENDS */}
      <section className="section bg-paper" aria-labelledby="blends-titulo">
        <div className="container">
          <SectionHead
            eyebrow="Blends"
            titleId="blends-titulo"
            title="Uma linha pensada para a chapa."
            action={
              <Link className="link-arrow" href="/blends">
                Ver todos os blends <Icon name="arrow" />
              </Link>
            }
          />
          <BlendGrid blends={featuredBlends} linked />
          <BlendBanner
            blend={customBlend}
            href={blendContactHref(customBlend)}
            label="Desenvolver meu blend"
            text={customBlend.summary}
          />
        </div>
      </section>

      {/* PARA HAMBURGUERIAS */}
      <section className="section bg-char" aria-labelledby="hamb-titulo">
        <div className="container split split--reverse">
          <Reveal className="stack stack--lg">
            <Eyebrow>Para hamburguerias</Eyebrow>
            <h2 className="h2" id="hamb-titulo">
              Seu fornecedor de blend, sem surpresa.
            </h2>
            <Checklist items={homeChecklist} />
            <div className="hero__actions hero__actions--inline">
              <Link className="btn btn--red" href={sampleHref}>
                Pedir amostra <ArrowIcon />
              </Link>
              <Link className="btn btn--outline-light" href="/hamburguerias">
                Ver como funciona
              </Link>
            </div>
            <p>
              <Link className="link-arrow" href="/hamburguerias#faq-titulo">
                Dúvidas frequentes <Icon name="arrow" />
              </Link>
            </p>
          </Reveal>
          <MediaFrame
            image={photos.burgersTrio}
            alt="Três hambúrgueres lado a lado em uma tábua com batatas fritas e molhos"
            variant="square"
            tag="/exclusiva"
            reveal={0.1}
          />
        </div>
      </section>

      {/* PROCESSO */}
      <section className="section bg-paper" aria-labelledby="processo-titulo">
        <div className="container">
          <SectionHead
            eyebrow="Do corte à chapa"
            titleId="processo-titulo"
            title="As etapas que mais importam."
            action={
              <Link className="link-arrow" href="/qualidade">
                Ver as 6 etapas <Icon name="arrow" />
              </Link>
            }
          />
          <Steps items={processSteps} />
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
