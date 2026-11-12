# Meat Blend: site institucional + landing page

Site estático (HTML, CSS e JS puros, sem dependências nem build). Basta subir a pasta inteira para qualquer hospedagem (cPanel/FTP, Netlify, Vercel, GitHub Pages…).

Identidade aplicada conforme o **Guia visual Meat Blend (2024)**:
- **Cores:** vermelho `#CD3B44`, creme `#EBE4E2`, preto e branco, mais o carvão `#232629` e o vinho `#5A2C33` das aberturas do guia
- **Tipografia:** Exo (arquivo oficial da pasta do cliente) nos títulos e Hanken Grotesk nos textos
- **Contraste:** respeita a tabela de "Possibilidades" do guia (sem vermelho sobre vermelho, sem creme sobre creme etc.)

## Estrutura

```
index.html            Home
sobre.html            A marca (história, símbolo, valores)
blends.html           Linha de blends + formatos + dicas de chapa
hamburguerias.html    Para hamburguerias (benefícios, como funciona, simulador de custo, FAQ)
qualidade.html        Processo, cadeia de frio, rastreabilidade, armazenamento
contato.html          Formulário → WhatsApp + canais
privacidade.html      Política de privacidade (LGPD)
404.html              Página de erro
lp/index.html         LANDING PAGE de captação (pedido de amostra)
assets/css/style.css  Todo o visual (tokens de cor no topo do arquivo)
assets/js/main.js     Menu, animações, formulários, simulador
assets/img/marca/     Logotipos, isotipos e monograma (SVG oficiais)
assets/img/fotos/     Fotos (PROVISÓRIAS, ver abaixo)
assets/img/og-image.jpg  Imagem de compartilhamento (1200×630)
assets/fonts/         Exo (licença OFL incluída)
```

Para visualizar localmente, abra `index.html` no navegador. A landing fica em `lp/index.html`.

## Como funcionam os formulários

Não há back-end. Ao enviar, o site monta uma mensagem com os dados preenchidos e abre o **WhatsApp** do comercial com o texto pronto. Links como `contato.html?blend=Smash` já chegam com o blend marcado.

Se preferir receber por e-mail ou CRM, troque o handler `form[data-wa-form]` em `assets/js/main.js` por um serviço como Formspree, RD Station ou um endpoint próprio.

## ⚠️ Pendências antes de publicar

Os dados abaixo **não estavam na pasta do cliente** e foram preenchidos com marcadores. Use "localizar e substituir em todos os arquivos" no editor.

| O que | Marcador atual | Onde |
|---|---|---|
| WhatsApp (link) | `5500000000000` | todos os `.html` + `assets/js/main.js` |
| WhatsApp (texto) | `(00) 00000-0000` | todos os `.html` |
| E-mail | `contato@meatblend.com.br` | rodapé, contato, privacidade |
| Instagram | `@meatblend` / `instagram.com/meatblend` | rodapé, contato (**confirmar se o @ é esse**) |
| Endereço | `Rua Exemplo, 000 – Bairro` / `Cidade – UF` | rodapé, contato |
| Horário | `Seg a sex, 8h às 18h` | rodapé, contato |
| CNPJ | `00.000.000/0001-00` | rodapé, LP, privacidade |
| Razão social / endereço / data | `[razão social]`, `[endereço completo]`, `[dd/mm/aaaa]` | privacidade.html |
| Registro sanitário | `[SIF/SIE/SIM nº 0000]` | qualidade.html |
| Domínio | `www.meatblend.com.br` | `<head>` de todas as páginas, sitemap.xml, robots.txt |

### Conteúdo para validar com o cliente
O texto foi escrito a partir do posicionamento da marca (blends para hamburguerias; "Exclusiva, Rigorosa, Segura"), mas **as especificações dos produtos são sugestões** e precisam ser confirmadas:
- **Blends:** nomes, cortes, % de gordura e gramaturas (Clássico, Costela, Smash, Fraldinha, Sob medida)
- **Formatos:** disco com papel intercalado, bolinha smash 80/100 g, granel 1 kg / 2,5 kg
- **Operação:** transporte refrigerado, entrega programada, envio de amostras, ficha técnica, lote/validade na embalagem
- **FAQ:** pedido mínimo, cobertura de entrega, preparo direto do congelado
- **Simulador:** usa R$ 45/kg só como valor inicial de exemplo (o próprio visitante altera)

### Fotos provisórias
As fotos em `assets/img/fotos/` são do **Unsplash** (licença livre para uso comercial, sem atribuição obrigatória), usadas apenas para compor o layout. O ideal é substituir por fotos reais dos blends, mantendo os mesmos nomes de arquivo:

| Arquivo | Origem |
|---|---|
| hero-smash.jpg | images.unsplash.com/photo-1607013251379-e6eecfffe234 |
| burger-classico.jpg | images.unsplash.com/photo-1568901346375-23c9450c58cd |
| burger-duplo.jpg | images.unsplash.com/photo-1572802419224-296b0aeee0d9 |
| burger-triplo.jpg | images.unsplash.com/photo-1553979459-d2229ba7433b |
| burger-gourmet.jpg | images.unsplash.com/photo-1596662951482-0c4ba74a6df6 |
| burgers-trio.jpg | images.unsplash.com/photo-1610614819513-58e34989848b |
| cortes-crus.jpg | images.unsplash.com/photo-1603048297172-c92544798d5a |
| medalhoes-crus.jpg | images.unsplash.com/photo-1615937691194-97dbd3f3dc29 |
| carne-temperos.jpg | images.unsplash.com/photo-1613454320437-0c228c8b1723 |
| carne-gelo.jpg | images.unsplash.com/photo-1551028150-64b9f398f678 |
| textura-carne.jpg | images.unsplash.com/photo-1602470520998-f4a52199a3d6 (reserva, não usada) |

Sugestão de pauta para a sessão de fotos: discos crus empilhados com papel intercalado, bolinhas smash, o smash sendo esmagado na chapa, embalagem com etiqueta de lote e um burger montado por blend.

### Marca registrada
Pelo material do INPI na pasta do cliente, **não use o símbolo ®** junto ao logotipo até o registro ser concedido (o uso indevido é passível de pena pela Lei 9.279/96). O site não usa ® propositalmente.

## Personalização rápida
- **Cores e espaçamentos:** variáveis no topo de `assets/css/style.css`
- **Cabeçalho e rodapé:** são iguais em todas as páginas do site. Ao alterar um link ou dado, aplique a mesma mudança em todos os `.html` (localizar e substituir)
- **Animações:** respeitam a configuração "reduzir movimento" do sistema do visitante
