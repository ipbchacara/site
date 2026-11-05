# IPCP — Site da Igreja Presbiteriana Chácara Parreiral

Site institucional publicado em **https://ipchacara.org** pelo GitHub Pages.
É HTML, CSS e JavaScript puros, sem etapa de build: qualquer alteração feita aqui (inclusive pelo editor do próprio GitHub) vai ao ar em poucos minutos.

## Páginas

| Endereço       | Arquivo                    | Conteúdo |
|----------------|----------------------------|----------|
| `/`            | `index.html`               | Página inicial |
| `/sobre`       | `sobre/index.html`         | Propósito e IPB (história e liderança estão em `_rascunhos/`) |
| `/cremos`      | `cremos/index.html`        | Confissão de fé, Cinco Solas, Westminster |
| `/ministerios` | `ministerios/index.html`   | EBD, oração, sociedades, música, serviço |
| `/sociedades/ucp` … `/uph` | `sociedades/*/index.html` | Uma página por sociedade interna (história, propósito, lema) |
| `/eventos`     | `eventos/index.html`       | Agenda (semana e mês) |
| `/visitante`   | `visitante/index.html`     | Cadastro de visitantes (grava na planilha via Google Apps Script) |
| `/contribua`   | `contribua/index.html`     | Dízimos e ofertas (PIX da igreja sede, QR Codes em `assets/img/pix-*.png`) |
| `/oracao`      | `oracao/index.html`        | Pedido de oração (mesmo Apps Script do contato, assunto "Pedido de oração") |
| `/contato`     | `contato/index.html`       | Endereço, mapa, mensagem e pedido de oração (envia e-mail à secretaria via Google Apps Script, código em `_apps-script/contato.gs`) |
| `/natal2026`   | `natal2026/index.html`     | Inscrição de coristas da Cantata (Google Forms). Inscrições encerradas; sem links no site |
| `/boletim`     | `boletim/index.html`       | Acervo da entre nós., a revista mensal (fora do menu, noindex). Cada edição em `boletim/AAAA-MM/`: `index.html` (revista), `email.html` (abrir, copiar e colar no Gmail) as capas `capa-grupo.png` (1080×1350, WhatsApp) e `capa-email.png` (1200×630) e as artes sem texto `arte-larga.png` / `arte-alta.png` (fundo da capa no site). Logo da revista em `assets/marca/entre-nos/`. Todas as seções, diagramadas com textos de exemplo, ficam em `boletim/modelo/` (copie de lá as que entram no mês). Estilos em `assets/css/boletim.css`; as capas saem de `_documentos/boletim/fonte/gerar-capas.ps1` |
| `/identidade`  | `identidade/index.html`    | Guia de identidade visual (fora do menu) |
| `/marca`       | `marca/index.html`         | Download do kit da marca e do manual (fora do menu, noindex). Versão pública do kit: sem capas com lema e sem instalador de fontes |

## Tarefas do dia a dia

**Adicionar um evento especial:** abra `assets/js/agenda.js` e inclua uma linha em `EVENTOS_ESPECIAIS`:

```js
{ data: '2026-12-20', titulo: 'Cantata de Natal', hora: '19h30', sub: 'Aberta à comunidade', link: '/natal2026' },
```

O evento aparece sozinho na agenda e nos "Próximos encontros" da página inicial.

Campos opcionais: `pauta: ['…', '…']` mostra uma lista numerada só em `/eventos` (útil para assembleias), e `substitui: 'Culto de Adoração'` tira da agenda o item semanal daquele dia (útil quando a cantata ocupa o horário do culto). Já `cancela: { 'Escola Bíblica Dominical': 'motivo' }` mantém o item semanal na agenda, riscado e com o motivo, e o tira da página inicial.

Na página `/eventos`, todo evento especial ganha o botão **Adicionar à minha agenda** (no iPhone/iPad/Mac baixa o arquivo `.ics`, que abre o Calendário; nos outros aparelhos abre o Google Agenda). Com `resumo: { sobretitulo, titulo, texto: [...], info: [...] }`, o evento mostra a arte com um resumo ao lado e o botão "Saiba mais" embaixo. Campos opcionais para eles: `local: 'Nome, endereço'` (padrão: o nosso templo) e `duracao: 90` (minutos; padrão: 120). O lembrete fica 2 horas antes.

`arte: '/assets/img/arquivo.jpg'` mostra a arte do evento em `/eventos` (clicável quando há `link`). Link para outro site (`https://...`) abre em nova aba.

**Mudar horários fixos:** `PROGRAMACAO_SEMANAL` no mesmo arquivo. Na página inicial, atualize também a faixa de horários (`index.html`, bloco `HORÁRIOS`).

**Mudar e-mail, WhatsApp, Instagram ou YouTube:** objeto `IGREJA` no início de `assets/js/site.js`. Rede social vazia (`''`) não aparece no site.

**Mudar o menu:** lista `MENU` em `assets/js/site.js`.

**Destaques da página inicial** (carrossel; hoje: Domingo Feliz até 08/11 e Cantata de Natal até 13/12). Cada destaque é um `.carrossel-slide` dentro do bloco `DESTAQUES DA PÁGINA INICIAL` em `index.html` e some sozinho depois da data em `data-ate`. O carrossel avança sozinho a cada 7 s; com um slide só, as setas e bolinhas somem, e sem nenhum a seção some. Para incluir um destaque, cole um slide como o abaixo dentro de `.carrossel-trilho`, na ordem em que deve aparecer. Fundos prontos: `destaque` (vermelho), `destaque festa` (vermelho com cartaz em imagem, classe `cartaz-img`) e `destaque cartaz` (madeira, usado na Cantata, cujo cartaz é feito em HTML/CSS na classe `cartaz-natal`).

```html
<div class="carrossel-slide" data-ate="AAAA-MM-DD" role="group" aria-roledescription="slide">
  <div class="destaque festa">
    <div class="destaque-texto">
      <div class="sobretitulo">Nome do evento · data, hora</div>
      <h2>Título do destaque</h2>
      <p>Texto curto.</p>
      <div class="botoes">
        <a class="btn btn-branco" href="/eventos?dia=AAAA-MM-DD">Ver na agenda</a>
      </div>
    </div>
    <div class="destaque-arte">
      <a class="cartaz-img" href="/eventos?dia=AAAA-MM-DD"><img src="/assets/img/arquivo.jpg" alt="Descrição do cartaz" loading="lazy"></a>
    </div>
  </div>
</div>
```

**PDFs dos Símbolos de Fé:** ficam em `assets/docs/` (Confissão, Catecismo Maior e Breve Catecismo) e são linkados pelos cartões da página `/cremos`. Para trocar um documento, substitua o arquivo mantendo o mesmo nome.

**Colocar fotos:** envie a imagem para `Imagens/` e, dentro do `<div class="quadro-arte">` desejado, adicione `<img class="foto" src="/Imagens/arquivo.jpg" alt="descrição">`. Prefira JPG com até 1600 px de largura.

## Conteúdo pendente

- [ ] História da igreja e liderança (pastor, presbíteros e diáconos): o layout está pronto em `_rascunhos/sobre-historia-e-lideranca.html`, com instruções para voltar à página `/sobre`
- [ ] WhatsApp, Instagram e YouTube — `assets/js/site.js`
- [x] Logo em vetor (SVG/PDF) e versão horizontal

A pasta `_rascunhos/` não é publicada pelo GitHub Pages (pastas que começam com `_` são ignoradas).

## Identidade visual

Cores, fontes e regras de uso estão em `/identidade`. Resumo:

- Vermelho-uva `#BE1E2D`, verde-folha `#3F6005`, verde-videira `#253D1B`, verde-profundo `#15240F`, pergaminho `#F7F3EA`
- Fontes: **Fraunces** (títulos) e **Open Sans** (textos), ambas do Google Fonts. O nome na logo é Segoe UI convertida em curvas (só no desenho da logo, não em textos)

## Estrutura

```
assets/css/site.css   estilos de todo o site
assets/js/site.js     cabeçalho, menu, rodapé e dados de contato
assets/js/agenda.js   programação e eventos especiais
assets/img/           logos (SVG) e imagens usadas no site
assets/marca/         logos para download (svg/png/pdf), linkadas em /identidade; kit .zip e manual PDF, linkados em /marca
Imagens/              favicon e arquivos antigos (logos em PNG, artes de eventos)
404.html              página de "não encontrado"
CNAME                 domínio ipchacara.org (não apagar)
```

Para ver o site no computador antes de publicar, rode um servidor local na pasta, por exemplo `npx serve .`, e abra o endereço indicado.
