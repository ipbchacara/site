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
| `/identidade`  | `identidade/index.html`    | Guia de identidade visual (fora do menu) |
| `/marca`       | `marca/index.html`         | Download do kit da marca e do manual (fora do menu, noindex). Versão pública do kit: sem capas com lema e sem instalador de fontes |

## Tarefas do dia a dia

**Adicionar um evento especial:** abra `assets/js/agenda.js` e inclua uma linha em `EVENTOS_ESPECIAIS`:

```js
{ data: '2026-12-20', titulo: 'Cantata de Natal', hora: '19h30', sub: 'Aberta à comunidade', link: '/natal2026' },
```

O evento aparece sozinho na agenda e nos "Próximos encontros" da página inicial.

Campos opcionais: `pauta: ['…', '…']` mostra uma lista numerada só em `/eventos` (útil para assembleias), e `substitui: 'Culto de Adoração'` tira da agenda o item semanal daquele dia (útil quando a cantata ocupa o horário do culto).

**Mudar horários fixos:** `PROGRAMACAO_SEMANAL` no mesmo arquivo. Na página inicial, atualize também a faixa de horários (`index.html`, bloco `HORÁRIOS`).

**Mudar e-mail, WhatsApp, Instagram ou YouTube:** objeto `IGREJA` no início de `assets/js/site.js`. Rede social vazia (`''`) não aparece no site.

**Mudar o menu:** lista `MENU` em `assets/js/site.js`.

**Destaque da página inicial** (hoje, nenhum): no lugar do comentário `DESTAQUE SAZONAL` em `index.html`, cole o bloco abaixo e troque os textos e o link.

```html
<section class="secao" style="padding-top:0">
  <div class="container">
    <div class="destaque revelar">
      <div class="destaque-texto">
        <div class="sobretitulo">Sobretítulo</div>
        <h2>Título do destaque</h2>
        <p>Texto curto.</p>
        <a class="btn btn-claro" href="/link">Botão</a>
      </div>
      <div class="destaque-arte" aria-hidden="true">
        <div class="aneis"><span></span><span></span><span></span></div>
        <span class="estrela">✶</span>
      </div>
    </div>
  </div>
</section>
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
