import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { pages } from '@/content/pages';
import { mailtoLink, site } from '@/content/site';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumb } from '@/lib/schema';

export const metadata = buildMetadata(pages.privacidade);

export default function PrivacidadePage() {
  return (
    <main id="conteudo">
      <JsonLd data={breadcrumb(pages.privacidade.crumb, pages.privacidade.path)} />
      <PageHero crumb="privacidade" title="Política de privacidade" lead={`Última atualização: ${site.privacyUpdatedAt}`} small />

      <section className="section bg-paper">
        <div className="container">
          <div className="prose">
            <h2>Quem somos</h2>
            <p>
              Este site pertence à {site.name}, {site.legalName}, inscrita no CNPJ sob o nº {site.cnpj}, com sede em{' '}
              {site.address.full}. Para qualquer assunto relacionado a dados pessoais, fale com a gente pelo e-mail{' '}
              <a href={mailtoLink}>{site.email}</a>.
            </p>

            <h2>Quais dados coletamos</h2>
            <p>Coletamos apenas os dados que você informa voluntariamente nos formulários de contato e de pedido de amostra:</p>
            <ul>
              <li>nome;</li>
              <li>nome da hamburgueria ou empresa;</li>
              <li>cidade e estado;</li>
              <li>número de WhatsApp (recebido quando você envia a mensagem pelo aplicativo);</li>
              <li>volume estimado de vendas (burgers por mês), blends de interesse e mensagem;</li>
              <li>
                origem do acesso (parâmetros de campanha, como utm_source, e a página do site de onde você veio).
              </li>
            </ul>

            <h2>Como os dados são enviados</h2>
            <p>
              O site não armazena os dados dos formulários. Ao clicar em enviar, o seu navegador abre o WhatsApp com uma
              mensagem pronta, e o envio só acontece quando você confirma no aplicativo. A partir daí, a conversa segue
              as regras de privacidade do WhatsApp.
            </p>

            <h2>Para que usamos</h2>
            <p>
              Usamos os dados exclusivamente para responder ao seu contato, enviar informações comerciais solicitadas
              (como amostras, preços e condições de entrega) e dar continuidade à relação comercial, com base no seu
              consentimento e em procedimentos preliminares a contrato (art. 7º, I e V, da LGPD).
            </p>

            <h2>Compartilhamento</h2>
            <p>
              Não vendemos nem cedemos seus dados. Eles podem ser compartilhados apenas com prestadores de serviço
              necessários à operação (como transporte e emissão de nota fiscal) ou quando exigido por lei.
            </p>

            <h2>Cookies e serviços de terceiros</h2>
            <p>
              Este site não usa cookies de rastreamento. As fontes tipográficas são servidas pelo próprio site, sem
              chamadas a serviços de terceiros.
            </p>

            <h2>Seus direitos</h2>
            <p>
              Você pode, a qualquer momento, pedir a confirmação, o acesso, a correção ou a exclusão dos seus dados, além
              de revogar o consentimento. Basta escrever para <a href={mailtoLink}>{site.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
