# IPCP — Site da Igreja Presbiteriana Chácara Parreiral

Site institucional publicado em **https://ipchacara.org** pelo GitHub Pages.
É HTML, CSS e JavaScript puros, sem etapa de build: qualquer alteração feita aqui (inclusive pelo editor do próprio GitHub) vai ao ar em poucos minutos.

## Páginas

| Endereço       | Arquivo                    | Conteúdo |
|----------------|----------------------------|----------|
| `/`            | `index.html`               | Página inicial |
| `/sobre`       | `sobre/index.html`         | História, propósito, IPB, liderança |
| `/cremos`      | `cremos/index.html`        | Confissão de fé, Cinco Solas, Westminster |
| `/ministerios` | `ministerios/index.html`   | PGDs, EBD, oração, sociedades, louvor, serviço |
| `/eventos`     | `eventos/index.html`       | Agenda (semana e mês) |
| `/visitante`   | `visitante/index.html`     | Cadastro de visitantes (grava na planilha via Google Apps Script) |
| `/contribua`   | `contribua/index.html`     | Dízimos e ofertas |
| `/contato`     | `contato/index.html`       | Endereço, mapa, mensagem e pedido de oração |
| `/natal2026`   | `natal2026/index.html`     | Inscrição de coristas da Cantata (Google Forms) |
| `/identidade`  | `identidade/index.html`    | Guia de identidade visual (fora do menu) |

## Tarefas do dia a dia

**Adicionar um evento especial:** abra `assets/js/agenda.js` e inclua uma linha em `EVENTOS_ESPECIAIS`:

```js
{ data: '2026-12-20', titulo: 'Cantata de Natal', hora: '19h30', sub: 'Aberta à comunidade', link: '/natal2026' },
```

O evento aparece sozinho na agenda e nos "Próximos encontros" da página inicial.

**Mudar horários fixos:** `PROGRAMACAO_SEMANAL` no mesmo arquivo. Na página inicial, atualize também a faixa de horários (`index.html`, bloco `HORÁRIOS`).

**Mudar e-mail, WhatsApp, Instagram ou YouTube:** objeto `IGREJA` no início de `assets/js/site.js`. Rede social vazia (`''`) não aparece no site.

**Mudar o menu:** lista `MENU` em `assets/js/site.js`.

**Trocar o destaque da página inicial** (hoje, a Cantata): bloco `DESTAQUE SAZONAL` em `index.html`.

**Colocar fotos:** envie a imagem para `Imagens/` e, dentro do `<div class="quadro-arte">` desejado, adicione `<img class="foto" src="/Imagens/arquivo.jpg" alt="descrição">`. Prefira JPG com até 1600 px de largura.

## Conteúdo pendente

Trechos com fundo amarelo listrado (classe `a-definir`) precisam ser preenchidos pela igreja:

- [ ] História da igreja — `sobre/index.html`
- [ ] Nomes e fotos do pastor e do Conselho; diáconos — `sobre/index.html`
- [ ] Classes da Escola Bíblica — `ministerios/index.html`
- [ ] Quais sociedades internas estão ativas — `ministerios/index.html`
- [ ] Chave PIX, QR Code e dados bancários — `contribua/index.html`
- [ ] WhatsApp, Instagram e YouTube — `assets/js/site.js`
- [ ] Fotos reais (fachada, cultos, PGDs, EBD, louvor)
- [ ] Logo em vetor (SVG/PDF) e versão horizontal

## Identidade visual

Cores, fontes e regras de uso estão em `/identidade`. Resumo:

- Vermelho-uva `#BE1E2D`, verde-folha `#3F6005`, verde-videira `#253D1B`, verde-profundo `#15240F`, pergaminho `#F7F3EA`
- Fontes: **Fraunces** (títulos) e **Open Sans** (textos), ambas do Google Fonts

## Estrutura

```
assets/css/site.css   estilos de todo o site
assets/js/site.js     cabeçalho, menu, rodapé e dados de contato
assets/js/agenda.js   programação e eventos especiais
assets/img/           logos recortadas para uso no site
Imagens/              arquivos originais (logos, artes de eventos)
404.html              página de "não encontrado"
CNAME                 domínio ipchacara.org (não apagar)
```

Para ver o site no computador antes de publicar, rode um servidor local na pasta, por exemplo `npx serve .`, e abra o endereço indicado.
