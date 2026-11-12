$ErrorActionPreference = 'Stop'
# Salve este arquivo em UTF-8 COM BOM (PowerShell 5.1 lê "nº" e acentos errado sem o BOM).
$B   = $PSScriptRoot
$OUT = Join-Path (Split-Path $PSScriptRoot -Parent) 'estatico'
$enc = New-Object System.Text.UTF8Encoding $false
function ReadText([string]$p) { [IO.File]::ReadAllText($p, [Text.Encoding]::UTF8) }
function Attr([string]$s) { $s.Replace('&', '&amp;').Replace('"', '&quot;') }

$v      = Get-Date -Format 'yyyyMMddHHmm'          # FX-30: carimbo de versão de CSS/JS
$site   = 'https://www.meatblend.com.br/'
$head   = ReadText "$B\partials\head.html"
$header = ReadText "$B\partials\header.html"
$footer = ReadText "$B\partials\footer.html"
$sprite = ReadText "$B\partials\sprite.html"
$cta    = ReadText "$B\partials\cta.html"
$formstatus = ReadText "$B\partials\form-status.html"
$navKeys = 'sobre','blends','hamburguerias','qualidade','contato'

# FX-06: barra fixa de CTA no celular (site, exceto Contato)
$mobile = '<nav class="mobile-cta" aria-label="Ações rápidas" data-mobile-cta><a class="btn btn--red" href="contato.html#pedir-amostra">Pedir amostra</a><a class="btn btn--outline-light" href="https://wa.me/5500000000000?text=Ol%C3%A1%2C%20Meat%20Blend!%20Quero%20pedir%20uma%20amostra%20para%20a%20minha%20hamburgueria." target="_blank" rel="noopener"><svg class="icon" aria-hidden="true"><use href="#i-wa"/></svg><span class="sr-only">Chamar no WhatsApp (abre em nova aba)</span></a></nav>'

# FX-14: fotos responsivas. Token nas páginas: <!--pic:NOME|SIZES|ALT|ATRIBUTOS EXTRAS DO IMG-->
# NOME = recorte gerado em assets/img/fotos (NOME-480/-800/-1200[.webp|.jpg]); proporção = largura:altura.
$PICS = @{
  'hero-smash' = @(4, 5); 'smash-linha' = @(5, 4); 'burger-classico' = @(5, 4); 'burger-triplo' = @(5, 4)
  'burger-duplo' = @(5, 4); 'burger-gourmet' = @(5, 4); 'medalhoes-crus' = @(4, 5); 'medalhoes-crus-4x3' = @(4, 3)
  'cortes-crus' = @(4, 5); 'burgers-trio' = @(1, 1); 'burgers-trio-4x3' = @(4, 3); 'carne-temperos' = @(3, 4); 'carne-gelo' = @(4, 5)
}
function Pic([string]$name, [string]$sizes, [string]$alt, [string]$extra, [string]$base) {
  if (-not $PICS.ContainsKey($name)) { throw "Foto desconhecida: $name" }
  $r = $PICS[$name]; $p = "${base}assets/img/fotos/$name"
  $h = [math]::Round(1200 * $r[1] / $r[0])
  $set = (480, 800, 1200 | ForEach-Object { "$p-$_.webp ${_}w" }) -join ', '
  "<picture><source type=`"image/webp`" srcset=`"$set`" sizes=`"$sizes`"><img src=`"$p-800.jpg`" alt=`"$(Attr $alt)`" width=`"1200`" height=`"$h`" decoding=`"async`" $extra></picture>"
}

# FX-26: marcadores [a confirmar…] e [SIF/SIE/SIM nº 0000] fora de atributos viram <span class="tbc">
function Markers([string]$s) { [regex]::Replace($s, '(?<=>[^<>]*)\[(a confirmar[^\]<]*|SIF/SIE/SIM nº 0000)\]', '<span class="tbc">[$1]</span>') }

foreach ($f in Get-ChildItem "$B\pages" -Filter *.html) {
  $raw   = ReadText $f.FullName
  $parts = [regex]::Split($raw, '(?m)^---\r?\n', 2)
  $meta  = @{}
  foreach ($line in ($parts[0] -split "\r?\n")) { if ($line -match '^(\w+):\s?(.*)$') { $meta[$matches[1]] = $matches[2].Trim() } }
  $base   = if ($meta.ContainsKey('base')) { $meta['base'] } else { '' }
  $robots = if ($meta.ContainsKey('robots')) { $meta['robots'] } else { 'index, follow' }

  $body = $parts[1].Replace('{{cta}}', $cta).Replace('{{formstatus}}', $formstatus)
  $body = [regex]::Replace($body, '<!--pic:([^|]+)\|([^|]*)\|([^|]*)\|(.*?)-->', [Text.RegularExpressions.MatchEvaluator]{
    param($m) Pic $m.Groups[1].Value.Trim() $m.Groups[2].Value $m.Groups[3].Value $m.Groups[4].Value $base
  })

  # FX-28: JSON-LD (antes do envolvimento dos marcadores)
  $ld = @()
  if ($meta['schema'] -eq 'home') {
    $ld += [ordered]@{ '@context' = 'https://schema.org'; '@graph' = @(
      [ordered]@{ '@type' = 'Organization'; '@id' = "$site#org"; name = 'Meat Blend'; url = $site; logo = "${site}apple-touch-icon.png"; description = 'Blends de carne bovina para hamburguerias: cortes selecionados, gordura padronizada e gramatura exata.' },
      [ordered]@{ '@type' = 'WebSite'; '@id' = "$site#site"; url = $site; name = 'Meat Blend'; inLanguage = 'pt-BR'; publisher = @{ '@id' = "$site#org" } }) }
  }
  if ($meta['crumb']) {
    $ld += [ordered]@{ '@context' = 'https://schema.org'; '@type' = 'BreadcrumbList'; itemListElement = @(
      [ordered]@{ '@type' = 'ListItem'; position = 1; name = 'meat blend'; item = $site },
      [ordered]@{ '@type' = 'ListItem'; position = 2; name = $meta['crumb']; item = $site + $meta['canonical'] }) }
  }
  if ($meta['faqschema'] -eq 'true') {
    $qs = @(foreach ($m in [regex]::Matches($body, '(?s)<details>\s*<summary>(.*?)</summary>\s*<div class="faq__answer">(.*?)</div>\s*</details>')) {
      $q = ($m.Groups[1].Value -replace '<[^>]+>', '').Trim()
      $a = (($m.Groups[2].Value -replace '</p>\s*<p>', ' ') -replace '<[^>]+>', '' -replace '\s+', ' ').Trim()
      if ("$q $a" -notmatch '\[') { [ordered]@{ '@type' = 'Question'; name = $q; acceptedAnswer = [ordered]@{ '@type' = 'Answer'; text = $a } } }
    })
    if ($qs.Count) { $ld += [ordered]@{ '@context' = 'https://schema.org'; '@type' = 'FAQPage'; mainEntity = $qs } }
  }
  $jsonld = ($ld | ForEach-Object { '  <script type="application/ld+json">' + ($_ | ConvertTo-Json -Depth 8 -Compress) + '</script>' }) -join "`n"

  $body = Markers $body
  $h = $head.Replace('{{title}}', (Attr $meta['title'])).Replace('{{description}}', (Attr $meta['description'])).Replace('{{canonical}}', $meta['canonical']).Replace('{{base}}', $base).Replace('{{robots}}', $robots).Replace('{{v}}', $v).Replace('{{jsonld}}', $jsonld)

  if ($meta['layout'] -eq 'lp') {
    $html = $h + "<body class=`"has-mobile-cta`">`n<a class=`"skip-link`" href=`"#conteudo`">Pular para o conteúdo</a>`n" + $sprite + "`n" + $body + "</body>`n</html>`n"
    $dest = Join-Path $OUT 'lp\index.html'
  } else {
    $isContato = $meta['active'] -eq 'contato'
    $hd = $header.Replace('{{sprite}}', $sprite).Replace('{{bodyclass}}', $(if ($isContato) { '' } else { ' class="has-mobile-cta"' }))
    foreach ($k in $navKeys) { $hd = $hd.Replace("{{cur:$k}}", $(if ($k -eq $meta['active']) { ' aria-current="page"' } else { '' })) }
    $ft = Markers ($footer.Replace('{{mobilecta}}', $(if ($isContato) { '' } else { $mobile })))
    $html = $h + $hd + $body + $ft
    $dest = Join-Path $OUT $f.Name
  }

  # FX-29: 404 com caminhos absolutos; páginas noindex sem canonical
  if ($meta['absolute'] -eq 'true') { $html = [regex]::Replace($html, '(href|src|srcset)="(?!https?:|mailto:|tel:|data:|#|/)', '$1="/') }
  if ($robots -match 'noindex') { $html = [regex]::Replace($html, '\s*<link rel="canonical"[^>]*>', '') }

  if ($html -match '\{\{') { throw "Token não substituído em $($f.Name)" }
  if ($html -match '<!--pic:') { throw "Foto não substituída em $($f.Name)" }
  [IO.File]::WriteAllText($dest, $html, $enc)
  "{0,-20} -> {1}  ({2:N0} bytes)" -f $f.Name, $dest.Replace($OUT, ''), $enc.GetByteCount($html)
}
