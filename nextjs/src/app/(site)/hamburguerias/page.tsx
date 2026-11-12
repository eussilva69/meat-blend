import Link from 'next/link';
import { IconCards } from '@/components/Cards';
import { CostCalculator } from '@/components/CostCalculator';
import { CtaBand } from '@/components/CtaBand';
import { Eyebrow } from '@/components/Eyebrow';
import { Faq } from '@/components/Faq';
import { ArrowIcon, Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { NewTab } from '@/components/NewTab';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { SectionHead } from '@/components/SectionHead';
import { Steps } from '@/components/Steps';
import { benefitCards } from '@/content/benefits';
import { faqHamburguerias } from '@/content/faq';
import { photos } from '@/content/images';
import { sampleHref } from '@/content/nav';
import { pages } from '@/content/pages';
import { howItWorksSteps } from '@/content/process';
import { waLink, waMessages } from '@/content/site';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumb, faqPage } from '@/lib/schema';

export const metadata = buildMetadata(pages.hamburguerias);

export default function HamburgueriasPage() {
  return (
    <main id="conteudo">
      <JsonLd data={breadcrumb(pages.hamburguerias.crumb, pages.hamburguerias.path)} />
      <JsonLd data={faqPage(faqHamburguerias)} />
      <PageHero
        crumb="para hamburguerias"
        title="Seu fornecedor de blend, sem surpresa."
        lead="Blend de carne porcionado e congelado para hamburguerias, dark kitchens, food trucks e restaurantes: o mesmo burger todo dia, custo por burger previsível e entrega programada."
        actions={
          <Link className="btn btn--red" href={sampleHref}>
            Pedir amostra <ArrowIcon />
          </Link>
        }
        media={{
          image: {
            ...photos.burgersTrio4x3,
            alt: 'Três hambúrgueres lado a lado em uma tábua com batatas fritas e molhos',
          },
          tag: '/exclusiva',
        }}
        num="/03"
      />

      {/* BENEFÍCIOS */}
      <section className="section bg-paper" aria-labelledby="beneficios-titulo">
        <div className="container">
          <SectionHead
            eyebrow="Por que meat blend"
            titleId="beneficios-titulo"
            title="Menos variável na cozinha. Mais controle no caixa."
          />
          <IconCards items={benefitCards} carousel label="Vantagens (role para o lado para ver todas)" />
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="section bg-char" aria-labelledby="como-titulo">
        <div className="container">
          <SectionHead
            eyebrow="Como funciona"
            titleId="como-titulo"
            title="Do primeiro contato ao pedido recorrente."
            action={
              <Link className="btn btn--red" href={sampleHref}>
                Pedir amostra <ArrowIcon />
              </Link>
            }
          />
          <Steps items={howItWorksSteps} />
        </div>
      </section>

      {/* SIMULADOR */}
      <section className="section bg-cream" aria-labelledby="calc-titulo">
        <div className="container">
          <SectionHead
            eyebrow="Simulador"
            titleId="calc-titulo"
            title="Quanto custa a carne de cada burger?"
            lead="Com gramatura exata, a conta fecha antes do pedido sair. Simule com os seus números."
          />
          <CostCalculator />
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-paper" aria-labelledby="faq-titulo">
        <div className="container split split--top split--wide-left">
          <Reveal className="stack">
            <Eyebrow>Dúvidas frequentes</Eyebrow>
            <h2 className="h2" id="faq-titulo">
              Perguntas de quem está na chapa.
            </h2>
            <p className="lead">Não achou a sua? Chama a gente no WhatsApp.</p>
            <p>
              <a className="btn btn--black" href={waLink(waMessages.question)} target="_blank" rel="noopener">
                <Icon name="wa" />
                Tirar dúvida no WhatsApp
                <NewTab />
              </a>
            </p>
          </Reveal>
          <Faq items={faqHamburguerias} />
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
