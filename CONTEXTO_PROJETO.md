# CONTEXTO_PROJETO.md — Meat Blend

## 1. Identificação do Projeto
- **Nome Comercial:** Meat Blend
- **Descrição:** Fornecedora e distribuidora B2B de blends de carne bovina para hamburguerias, dark kitchens, food trucks e restaurantes. Oferece cortes selecionados, moagem controlada, porcionamento em gramatura exata e desenvolvimento de receitas sob medida com exclusividade.
- **Mercado Inicial:** Brasil (food service B2B).
- **Repositório:** `D:\PROJETOS CLAUDE\MEAT BLEND`
- **Valores da Marca:** Exclusiva / Rigorosa / Segura.

## 2. Decisões Arquiteturais e Stack
- **Arquitetura Next.js Padrão (App Router):**
  - Aplicação 100% Next.js 16.4.6 estruturada na raiz do repositório (App Router + Turbopack, React 19, TypeScript 5 estrito, ESLint 9).
  - Suporte nativo a SSR e SSG (`STATIC_EXPORT=1 npm run build` gera exportação estática na pasta `out/` quando necessário).
  - Remoção completa de arquivos e geradores estáticos legados (`estatico/` e `estatico-src/`).
- **Design System e Estilos:**
  - Tokens CSS em `src/styles/tokens.css` e módulos (`base.css`, `header.css`, `sections.css`, `forms.css`, `pages.css`, `responsive.css`).
  - Paleta com foco em grafite profundo (`#232629`), vermelho de destaque e tons neutros de contraste.
  - Zero dependências de fontes externas: Exo e Hanken Grotesk 100% locais em WOFF2 (`src/app/fonts/`) com `display: swap`.
- **Rotas e Páginas Principais:**
  - Portal Institucional:
    - `/`: Home com proposta de valor, carrossel de blends, calculadora de custo e chamada de amostra.
    - `/blends`: Catálogo de opções prontas e sob medida.
    - `/hamburguerias`: Proposta de parceria e diferenciais para estabelecimentos.
    - `/sobre`: História, valores e posicionamento da marca.
    - `/qualidade`: Cadeia de frio, boas práticas e rigor técnico.
    - `/contato#pedir-amostra`: Âncora direta no formulário de amostra.
    - `/privacidade`: Política de privacidade e tratamento de dados.
    - `/not-found`: Página 404 personalizada sem indexação.
  - Landing Page de Conversão:
    - `/amostra`: LP focada em teste na chapa e solicitação de kit para donos de hamburgueria.

## 3. SEO, Performance e Acessibilidade
- **Dados Estruturados (JSON-LD):** Implementados em `src/lib/schema.ts` (`Organization`, `WebSite`, `BreadcrumbList` e `FAQPage`).
- **Mídia Responsiva:** Imagens de produtos e processos em formato WebP com variantes de 480w, 800w e 1200w via `next/image`.
- **Transparência de Informações:** Utilização do helper `withMarkers()` (`src/lib/markers.tsx`) para identificar visualmente com sublinhado pontilhado dados cadastrais pendentes de definição pelo cliente (`[SIF/SIE/SIM nº 0000]`, telefones provisórios).
- **Conformidade Regulatória:** Parâmetros técnicos alinhados ao RTIQ (Regulamento Técnico de Identidade e Qualidade) e RDC 216/2004 da Anvisa (ex: Costela 77/23 e cocção recomendada a 70 °C no centro geométrico).

## 4. Integração e Fluxo de Conversão
- **Formulário Honesto via WhatsApp:** Implementado em `WhatsAppForm.tsx` com validações no cliente, modal "Falta só um passo", mecanismo de retry para bloqueadores de pop-up e fallback via link direto `mailto:`.
- **Mobile Sticky CTA:** Barra de contato fixa inferior (`SiteMobileCta.tsx` / `MobileCta.tsx`) para conversão rápida em smartphones (oculta na página de contato para evitar redundância).

## 5. Scripts e Comandos de Operação (executados na raiz)
- `npm run dev`: Ambiente de desenvolvimento Next.js (porta 3000).
- `npm run build`: Build de produção otimizado do Next.js.
- `STATIC_EXPORT=1 npm run build`: Exportação estática para a pasta `out/` (SSG puro).
- `npm run start`: Inicia o servidor de produção do Next.js.
- `npm run lint`: Validação ESLint.
- `npm run typecheck`: Verificação estrita de tipagem TypeScript sem emissão.

## 6. Governança e Regras da Frota
- Todas as 114 skills e 80 agentes do Kit Base Antigravity estão instalados em `.agents/skills`, `.claude/skills` e subpastas de agentes.
- Seguir as invariantes de `AI_RULES.md` e consultar `GUIA_TECNICO_DETALHADO.md` quando necessário.
