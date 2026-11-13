import { Crumb } from '@/components/Crumb';
import { Eyebrow } from '@/components/Eyebrow';
import { ArrowIcon, Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { NewTab } from '@/components/NewTab';
import { Reveal } from '@/components/Reveal';
import { WhatsAppForm } from '@/components/WhatsAppForm';
import { contactForm } from '@/content/forms';
import { pages } from '@/content/pages';
import { mailtoLink, site, waLink, waMessages } from '@/content/site';
import { withMarkers } from '@/lib/markers';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumb } from '@/lib/schema';

export const metadata = buildMetadata(pages.contato);

export default function ContatoPage() {
  return (
    <main id="conteudo">
      <JsonLd data={breadcrumb(pages.contato.crumb, pages.contato.path)} />

      {/* HERO COM FORMULÁRIO (na primeira dobra) */}
      <section className="lp-hero contact-hero dark">
        <div className="container lp-hero__grid">
          <div>
            <Crumb current="contato" />
            <h1 className="h1">Peça sua amostra.</h1>
            <p className="lead">
              {withMarkers(
                'Conte sobre a sua hamburgueria. A gente responde pelo WhatsApp com o blend indicado, a tabela de preços e as condições de entrega para a sua região [a confirmar: prazo de resposta, ex.: em até 2 horas úteis].',
              )}
            </p>
          </div>
          <div className="form-card" id="pedir-amostra">
            <div className="form-card__head">
              <h2>Peça amostra ou tabela de preços</h2>
              <p>Leva menos de um minuto. O WhatsApp abre com a sua mensagem pronta: é só tocar em enviar.</p>
            </div>
            <WhatsAppForm config={contactForm} />
          </div>
        </div>
      </section>

      {/* CANAIS */}
      <section className="section bg-paper" aria-labelledby="canais-titulo">
        <div className="container">
          <Reveal className="stack stack--lg">
            <div>
              <Eyebrow>Canais</Eyebrow>
              <h2 className="h2" id="canais-titulo" style={{ marginTop: 14 }}>
                Prefere falar direto?
              </h2>
            </div>
            <ul className="channels channels--grid">
              <li>
                <a href={waLink(waMessages.greeting)} target="_blank" rel="noopener">
                  <Icon name="wa" />
                  <div>
                    <small>WhatsApp comercial</small>
                    <strong>{site.phoneDisplay}</strong>
                    <NewTab />
                  </div>
                  <ArrowIcon />
                </a>
              </li>
              <li>
                <a href={mailtoLink}>
                  <Icon name="mail" />
                  <div>
                    <small>E-mail</small>
                    <strong>{site.email}</strong>
                  </div>
                  <ArrowIcon />
                </a>
              </li>
              <li>
                <a href={site.instagram.url} target="_blank" rel="noopener">
                  <Icon name="ig" />
                  <div>
                    <small>Instagram</small>
                    <strong>{site.instagram.handle}</strong>
                    <NewTab />
                  </div>
                  <ArrowIcon />
                </a>
              </li>
              <li>
                <div className="channel">
                  <Icon name="pin" />
                  <div>
                    <small>Endereço</small>
                    <strong>
                      {site.address.street}
                      <br />
                      {site.address.city}
                    </strong>
                  </div>
                </div>
              </li>
              <li>
                <div className="channel">
                  <Icon name="clock" />
                  <div>
                    <small>Atendimento</small>
                    <strong>{site.hours.long}</strong>
                  </div>
                </div>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
