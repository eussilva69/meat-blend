# Meat Blend: site + landing page (Next.js)

Versão Next.js do site da Meat Blend. É um **porte fiel** do site estático (`../estatico`): mesmo visual, mesmo conteúdo, mesmas classes CSS. A diferença está na base de código: dados centralizados, componentes reutilizáveis e build otimizado.

- **Next.js 16.4.6** (App Router, Turbopack) · React 19 · TypeScript estrito · ESLint · sem Tailwind
- Todas as páginas são geradas estaticamente (SSG). Não há back-end: os formulários abrem o WhatsApp com a mensagem pronta.

## Como rodar

Requisitos: Node.js 20.9 ou mais recente (testado com Node 24) e npm.

```bash
npm install
npm run dev        # desenvolvimento em http://localhost:3000
npm run build      # build de produção
npm start          # serve o build de produção
npm run lint       # ESLint
npm run typecheck  # gera os tipos de rota e roda tsc --noEmit
```

## Rotas

| Rota | Página | Equivale a (estático) |
|---|---|---|
| `/` | Home | `index.html` |
| `/sobre` | A marca | `sobre.html` |
| `/blends` | Linha de blends, formatos e dicas | `blends.html` |
| `/hamburguerias` | Benefícios, como funciona, simulador, FAQ | `hamburguerias.html` |
| `/qualidade` | Processo, cadeia de frio, rastreabilidade | `qualidade.html` |
| `/contato` | Formulário → WhatsApp + canais (`/contato?blend=Smash` já marca o blend) | `contato.html` |
| `/privacidade` | Política de privacidade (LGPD) | `privacidade.html` |
| `/amostra` | **Landing page** de captação (layout próprio, sem menu do site, barra de CTA fixa no celular) | `lp/index.html` |
| qualquer outra | 404 | `404.html` |

`/sitemap.xml` e `/robots.txt` são gerados a partir dos dados das páginas.

## Estrutura

```
public/
  img/fotos/            Fotos (PROVISÓRIAS, ver abaixo)
  img/marca/            Logotipos, isotipos e monograma (SVG oficiais)
  img/og-image.jpg      Imagem de compartilhamento (1200×630)
  favicon.svg, favicon-escuro.svg, apple-touch-icon.png
src/
  app/
    layout.tsx          Raiz: <html lang="pt-BR">, fontes, metadata padrão, ícones
    fonts.ts            Exo (next/font/local) + Hanken Grotesk (next/font/google)
    fonts/              Exo-Variable.ttf + licença OFL
    globals.css         Importa os arquivos de src/styles na ordem certa
    (site)/             Páginas do site (layout com Header + Footer)
    (lp)/amostra/       Landing page (layout com cabeçalho/rodapé próprios + barra de CTA)
    not-found.tsx       404
    sitemap.ts, robots.ts
  components/           Header, Footer, PageHero, CtaBand, Marquee, BlendCard, BlendRow,
                        Pillars, Steps (Steps/Tips/Timeline), Faq, Checklist, Cards, Icon, Iso,
                        Reveal, WhatsAppForm, CostCalculator, MediaFrame… e lp/ (LpHeader,
                        LpFooter, MobileCta, CompareTable)
  content/              FONTE ÚNICA DE DADOS (ver abaixo)
  hooks/useScrolled.ts  Cabeçalho com fundo ao rolar
  lib/                  metadata, rotas/canonical, mensagem do WhatsApp, máscara de telefone,
                        formatação, valores de `sizes` das imagens
  styles/               CSS portado de estatico/assets/css/style.css, dividido por área
```

### Componentes de servidor × cliente

Tudo é Server Component, exceto o que precisa do navegador: `Header` (menu mobile), `HeaderShell` (fundo ao rolar), `Reveal` (animação de entrada), `WhatsAppForm`, `CostCalculator` e `CurrentYear`.

A animação de entrada (`Reveal`) nunca esconde conteúdo no HTML do servidor: só depois da hidratação, e só o que está fora da tela, é marcado para animar. Com "reduzir movimento" ligado no sistema, nada é escondido nem animado.

## Onde editar

| Quero mudar… | Arquivo |
|---|---|
| WhatsApp, telefone, e-mail, Instagram, endereço, horário, CNPJ, domínio, razão social, registro sanitário | `src/content/site.ts` |
| Mensagens prontas dos botões de WhatsApp | `src/content/site.ts` (`waMessages`) |
| Blends (nome, cortes, % gordura, gramaturas, formato, “ideal para”, textos, foto) e formatos | `src/content/blends.ts` |
| Perguntas frequentes (/hamburguerias e landing page) | `src/content/faq.ts` |
| Menu e links do rodapé | `src/content/nav.ts` |
| Títulos e descrições das páginas (SEO), prioridades do sitemap | `src/content/pages.ts` |
| Campos e textos dos formulários (e rótulos da mensagem do WhatsApp) | `src/content/forms.ts` |
| Valores iniciais do simulador | `src/content/calculator.ts` |
| Pilares, valores da marca, palavras das faixas | `src/content/brand.ts` |
| Etapas, passos, dicas de chapa e armazenamento | `src/content/process.ts` |
| Benefícios, checklists, cards de rastreabilidade, dores e comparativo da LP | `src/content/benefits.ts` |
| Fotos (caminho e dimensões) | `src/content/images.ts` |
| Cores, fontes, espaçamentos | `src/styles/tokens.css` |

Os textos corridos de cada página (títulos de seção, parágrafos) ficam no próprio `page.tsx` da rota.

## Como funcionam os formulários

Sem back-end. Ao enviar, `WhatsAppForm` valida os campos (validação nativa do navegador), monta a mensagem igual à do site estático e abre `wa.me/<número>?text=…` numa nova aba:

```
Olá, Meat Blend! Vim pelo site e quero conhecer os blends.

*Nome:* Ana
*Hamburgueria:* Burger da Ana
*Blends de interesse:* Costela, Smash
```

A pré-seleção por URL (`/contato?blend=Smash`) é feita no navegador (`useSearchParams` dentro de `<Suspense>`), por isso funciona tanto no modo servidor quanto na exportação estática. Para receber por e-mail/CRM, troque o `handleSubmit` em `src/components/WhatsAppForm.tsx`.

## Deploy

### Vercel (recomendado)

1. Suba esta pasta (`nextjs/`) para um repositório Git.
2. Na Vercel, importe o repositório. Se o repositório tiver o projeto inteiro, defina **Root Directory = `nextjs`**.
3. Framework: Next.js (detectado). Build: `npm run build`. Não precisa de variáveis de ambiente.
4. Configure o domínio `www.meatblend.com.br` (ou o definitivo, e atualize `site.url` em `src/content/site.ts`).

Nesse modo o `next/image` otimiza as fotos (WebP no tamanho certo para cada tela).

Também roda em qualquer servidor Node: `npm run build && npm start` (porta 3000; use `-p` para outra).

### Exportação estática (hospedagem comum: cPanel/FTP, Netlify, GitHub Pages…)

```bash
# macOS/Linux
STATIC_EXPORT=1 npm run build
```

```powershell
# Windows PowerShell
$env:STATIC_EXPORT='1'; npm run build; Remove-Item Env:STATIC_EXPORT
```

O resultado fica em **`out/`**: suba o conteúdo dessa pasta para a raiz do site. Nesse modo:

- cada rota vira `rota/index.html` (URLs com barra final: `/blends/`); canonical e sitemap acompanham;
- as imagens são servidas como estão (sem otimização), igual ao site estático;
- o 404 é `out/404.html`. Em Apache, adicione um `.htaccess` com `ErrorDocument 404 /404.html` (o `estatico/.htaccess` serve de modelo).

## ⚠️ Pendências antes de publicar

Os dados abaixo **não estavam na pasta do cliente** e seguem como marcadores. Quase todos ficam num lugar só: `src/content/site.ts`.

| O que | Marcador atual | Onde editar |
|---|---|---|
| WhatsApp (link) | `5500000000000` | `site.ts` → `whatsapp` |
| WhatsApp (texto) | `(00) 00000-0000` | `site.ts` → `phoneDisplay` (também usado no placeholder do campo em `forms.ts`, que pode ficar) |
| E-mail | `contato@meatblend.com.br` | `site.ts` → `email` |
| Instagram | `@meatblend` / `instagram.com/meatblend` | `site.ts` → `instagram` (**confirmar se o @ é esse**) |
| Endereço | `Rua Exemplo, 000 – Bairro` / `Cidade – UF` | `site.ts` → `address.street` / `address.city` |
| Horário | `Seg a sex, 8h às 18h` / `Segunda a sexta, 8h às 18h` | `site.ts` → `hours` |
| CNPJ | `00.000.000/0001-00` | `site.ts` → `cnpj` |
| Razão social / endereço completo / data da política | `[razão social]`, `[endereço completo]`, `[dd/mm/aaaa]` | `site.ts` → `legalName`, `address.full`, `privacyUpdatedAt` |
| Registro sanitário | `[SIF/SIE/SIM nº 0000]` | `site.ts` → `sanitaryRegistration` |
| Domínio | `www.meatblend.com.br` | `site.ts` → `url` (canonical, Open Graph, sitemap, robots) |

### Política de privacidade e fontes

O texto da política foi mantido igual ao do site estático, que diz que as fontes “são carregadas do Google Fonts”. **Nesta versão isso não acontece mais**: o `next/font` baixa a Hanken Grotesk no build e a serve pelo próprio domínio, sem requisição do navegador ao Google. Vale ajustar esse parágrafo em `src/app/(site)/privacidade/page.tsx`.

### Conteúdo para validar com o cliente

As **especificações dos produtos são sugestões** e precisam ser confirmadas:
- **Blends:** nomes, cortes, % de gordura e gramaturas (Clássico, Costela, Smash, Fraldinha, Sob medida)
- **Formatos:** disco com papel intercalado, bolinha smash 80/100 g, granel 1 kg / 2,5 kg
- **Operação:** transporte refrigerado, entrega programada, envio de amostras, ficha técnica, lote/validade na embalagem
- **FAQ:** pedido mínimo, cobertura de entrega, preparo direto do congelado
- **Simulador:** usa R$ 45/kg só como valor inicial de exemplo (o próprio visitante altera)

### Fotos provisórias

As fotos em `public/img/fotos/` são do **Unsplash** (licença livre para uso comercial), usadas só para compor o layout. Substitua por fotos reais mantendo os nomes dos arquivos; se a proporção mudar, atualize `width`/`height` em `src/content/images.ts`. A origem de cada foto está em `../estatico/README.md`.

### Marca registrada

Não use o símbolo ® junto ao logotipo até o registro no INPI ser concedido. O site não usa ® propositalmente.
