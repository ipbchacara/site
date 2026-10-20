/**
 * Formulário de contato do site (ipchacara.org/contato)
 *
 * Recebe a mensagem enviada pela página e manda um e-mail para os destinatários
 * abaixo. Não grava nada em planilha.
 *
 * Como publicar (uma vez só):
 *  1. Entre em https://script.google.com com a conta Google da igreja e crie um
 *     projeto novo (ex.: "Site — Contato").
 *  2. Apague o conteúdo do arquivo Código.gs, cole este arquivo inteiro e salve.
 *  3. Implantar > Nova implantação > tipo "App da Web".
 *       Executar como: Eu
 *       Quem pode acessar: Qualquer pessoa
 *  4. Autorize o envio de e-mails quando o Google pedir.
 *  5. Copie a URL do app da Web (termina em /exec) e cole em CONTATO_URL,
 *     no final de contato/index.html.
 *
 * Se mudar este código depois: Implantar > Gerenciar implantações > editar (lápis)
 * > Versão: Nova versão. Assim a URL continua a mesma.
 */

// Quem recebe as mensagens. Para mais de um, separe por vírgula.
const DESTINATARIOS = 'secretaria@ipchacara.org';

const ASSUNTOS = ['Pedido de oração', 'Visita pastoral', 'Outro assunto'];

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);

    // Campo invisível na página: só robôs preenchem.
    if (d.site) return resposta({ ok: true });

    const nome = limpar(d.nome, 120);
    const mensagem = limpar(d.mensagem, 5000);
    const telefone = limpar(d.telefone, 40);
    const email = limpar(d.email, 120);
    const assunto = ASSUNTOS.indexOf(d.assunto) >= 0 ? d.assunto : 'Outro assunto';

    if (!nome || !mensagem) return resposta({ ok: false, erro: 'campos' });

    const linhas = ['Nome: ' + nome];
    if (telefone) linhas.push('Telefone / WhatsApp: ' + telefone);
    if (email) linhas.push('E-mail: ' + email);
    linhas.push('', mensagem, '', '—',
      'Enviado pelo formulário de contato do site em ' +
        Utilities.formatDate(new Date(), 'America/Sao_Paulo', "dd/MM/yyyy 'às' HH:mm"));

    const opcoes = {
      to: DESTINATARIOS,
      subject: assunto + ' — ' + nome + ' (site)',
      body: linhas.join('\n'),
      name: 'Site IP Chácara Parreiral',
    };
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) opcoes.replyTo = email;

    MailApp.sendEmail(opcoes);
    return resposta({ ok: true });
  } catch (err) {
    console.error(err);
    return resposta({ ok: false, erro: 'interno' });
  }
}

function limpar(valor, max) {
  return String(valor || '').trim().slice(0, max);
}

function resposta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
