# Relatório de QA e Consolidação — Meat Blend

Data: 12/11/2026  
Status geral: **Aprovado (100% dos fluxos validados)**  
Stack ativa: **Next.js 16.4.6 (App Router + Turbopack)** + versão estática sincronizada

---

## 1. Resumo da Conferência Final

| Item | Estático | Next.js | Status | Evidência / Notas |
|---|---|---|---|---|
| **1. Dados para o Google (JSON-LD)** | Gerado em `build.ps1` | `src/lib/schema.ts` | **Aprovado** | `Organization`, `WebSite`, `BreadcrumbList` e `FAQPage` (exclui perguntas com marcadores). |
| **2. Fotos responsivas em WebP** | Variantes 480/800/1200w | `public/img/fotos/` + `next/image` | **Aprovado** | 13 imagens provisórias com proporções corrigidas (FX-14) e variantes WebP completas. |
| **3. Fontes locais (WOFF2)** | Exo (20 KB) + Hanken (35 KB) | `next/font/local` (WOFF2 locais) | **Aprovado** | Zero requisições externas no build. `display: swap` ativado. |
| **4. Marcadores de pendência** | `<span class="tbc">` | `withMarkers()` (`src/lib/markers.tsx`) | **Aprovado** | `[a confirmar...]` e `[SIF/SIE/SIM nº 0000]` formatados com sublinhado pontilhado. |
| **5. Página 404** | `404.html` (links absolutos) | `src/app/not-found.tsx` | **Aprovado** | `noindex` automático, caminhos absolutos, header/footer integrados. |
| **6. Formulário honesto** | `assets/js/main.js` | `WhatsAppForm.tsx` | **Aprovado** | Alerta "Falta só um passo", botão de retry em caso de pop-up bloqueado, fallback por e-mail. Campo telefone removido. |
| **7. "Pedir amostra"** | `href="contato.html#pedir-amostra"` | `href="/contato#pedir-amostra"` | **Aprovado** | Âncora direta no formulário; evita cabeçalho gigante fora da tela. |
| **8. Barra de CTA no celular** | `.mobile-cta` fixo | `SiteMobileCta.tsx` / `MobileCta.tsx` | **Aprovado** | Exibida em todas as páginas, exceto Contato. |
| **9. Remoção de Portas de Norman** | `a.blend-card:hover` | `a.blend-card:hover` restrito | **Aprovado** | Cards informativos na LP não simulam clique. |
| **10. Ajustes regulatórios** | Costela 77/23 e 70 °C | Costela 77/23 e 70 °C | **Aprovado** | Alinhados à RTIQ e RDC 216/2004 da Anvisa. |

---

## 2. Testes de Build e Execução

### Next.js
- `npm run typecheck`: **0 erros** (TypeScript estrito).
- `npm run lint`: **0 erros / 0 avisos** (ESLint 9).
- `npm run build`: **12/12 rotas geradas estaticamente** (`○ Static`).
- `STATIC_EXPORT=1 npm run build`: **Exportação para `out/` concluída**.
- `npm run dev`: **Ativo em `http://localhost:3000`**.

### Estático
- `estatico-src/build.ps1`: **9 páginas geradas em `estatico/`**.

---

## 3. URLs do Servidor Local

- Home: [http://localhost:3000/](http://localhost:3000/)
- Blends: [http://localhost:3000/blends](http://localhost:3000/blends)
- Para Hamburguerias: [http://localhost:3000/hamburguerias](http://localhost:3000/hamburguerias)
- Sobre: [http://localhost:3000/sobre](http://localhost:3000/sobre)
- Qualidade: [http://localhost:3000/qualidade](http://localhost:3000/qualidade)
- Contato: [http://localhost:3000/contato#pedir-amostra](http://localhost:3000/contato#pedir-amostra)
- Landing Page (Amostra): [http://localhost:3000/amostra](http://localhost:3000/amostra)
- Política de Privacidade: [http://localhost:3000/privacidade](http://localhost:3000/privacidade)
