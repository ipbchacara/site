/* ==========================================================================
   AGENDA DA IGREJA — usada pela página inicial e pela página /eventos.
   Para incluir um evento especial, adicione uma linha em EVENTOS_ESPECIAIS.
   ========================================================================== */

// Programação fixa. dia: 0 = domingo, 1 = segunda ... 6 = sábado
const PROGRAMACAO_SEMANAL = [
  { dia: 0, titulo: 'Escola Bíblica Dominical', hora: '18h00', tipo: 'escola', selo: 'Semanal', sub: 'Jovens e adultos: Catecismo Maior', link: '/ministerios#ebd' },
  { dia: 0, titulo: 'Culto de Adoração',        hora: '19h30', tipo: 'culto',  selo: 'Semanal' },
  { dia: 2, titulo: 'Reunião de Oração',        hora: '19h30', tipo: 'oracao', selo: 'Semanal' },
];

// Eventos especiais. Formato da data: 'AAAA-MM-DD'.
// Exemplo:
//   { data: '2026-12-20', titulo: 'Cantata de Natal', hora: '19h30', tipo: 'especial', selo: 'Especial', sub: 'Aberta à comunidade', link: '/natal2026' },
// Campos opcionais:
//   pauta: ['item 1', 'item 2']    lista numerada, mostrada só na página /eventos
//   substitui: 'Culto de Adoração'  tira da agenda, nesse dia, o item semanal com esse título
//   cancela: { 'Escola Bíblica Dominical': 'motivo' }
//                                    mantém o item semanal em /eventos, riscado e com o motivo; some da página inicial
//   arte: '/assets/img/arquivo.jpg' imagem do evento, mostrada só na página /eventos (clicável se houver link)
//   link: endereço de outro site (https://...) abre em nova aba
//   local: 'Nome, endereço'          lugar do evento no "Adicionar à agenda" (padrão: o nosso templo)
//   duracao: 90                      minutos, para o "Adicionar à agenda" (padrão: 120)
//   resumo: { sobretitulo, titulo, texto: ['parágrafo', ...], info: ['etiqueta', ...] }
//                                    mostra a arte com um resumo ao lado e o botão "Saiba mais" embaixo (só em /eventos)
const EVENTOS_ESPECIAIS = [
  { data: '2026-11-08', titulo: 'Assembleia Extraordinária', hora: '8h30', sub: 'Na igreja Sede (IPJC)', local: 'Igreja Presbiteriana em Jardim Camburi (Sede), Vitória - ES',
    pauta: [
      'Aprovação, ou não, da compra do terreno em Santa Maria de Jetibá para a construção do templo da congregação',
      'Aprovação, ou não, de empréstimo junto à Junta Patrimonial da IPB para a construção do templo da congregação em Santa Maria de Jetibá',
      'Proposta de título de diácono emérito ao irmão Ismael Silva',
    ] },
  { data: '2026-12-13', titulo: 'Cantata de Natal “Santo pra Sempre”', hora: '19h30', sub: 'No nosso templo · Aberta à comunidade: traga um convidado', substitui: 'Culto de Adoração',
    cancela: { 'Escola Bíblica Dominical': 'Excepcionalmente neste dia não haverá EBD, por causa da preparação do coral. Esperamos você na Cantata, às 19h30!' },
    link: 'https://natal.ipjc.org.br/?ref=site-chacara', arte: '/assets/img/cantata-santo-pra-sempre.jpg?v=2', duracao: 60,
    resumo: {
      sobretitulo: 'O tema',
      titulo: 'O Santo deitado numa manjedoura',
      texto: [
        'Quando o anjo anunciou a Maria o nascimento de Jesus, disse: “o ente santo que há de nascer será chamado Filho de Deus” (Lucas 1.35). O Deus que os anjos chamam de “Santo, santo, santo” escolheu nascer em Belém, envolto em panos, deitado onde os animais comiam.',
        'A cantata percorre esse plano de Deus: das promessas dos profetas ao anúncio a Maria, até a noite em que a promessa se cumpriu.',
      ],
      info: ['Entrada gratuita', 'Cerca de 1 hora', 'Para toda a família'],
    } },
];

// Atributos do link: endereços de outros sites abrem em nova aba
function attrsLink(link) {
  return /^https?:\/\//.test(link) ? `href="${link}" target="_blank" rel="noopener"` : `href="${link}"`;
}

// ── Adicionar à agenda do celular ─────────────────────────
const LOCAL_PADRAO = 'Igreja Presbiteriana Chácara Parreiral, Rua Teresa Tironi, 15 - Guaraciaba, Serra - ES';

// Horário "de parede" de Brasília guardado nos campos UTC de um Date (não depende do fuso do aparelho)
function horariosAgenda(e, data) {
  const [hh, mm] = e.hora.split('h').map(Number);
  const ini = new Date(Date.UTC(data.getFullYear(), data.getMonth(), data.getDate(), hh, mm || 0));
  const fim = new Date(ini.getTime() + (e.duracao || 120) * 60000);
  return { ini, fim };
}
const fmtAgenda = (d, z) => d.getUTCFullYear() + String(d.getUTCMonth() + 1).padStart(2, '0') + String(d.getUTCDate()).padStart(2, '0')
  + 'T' + String(d.getUTCHours()).padStart(2, '0') + String(d.getUTCMinutes()).padStart(2, '0') + '00' + (z ? 'Z' : '');

// Link do Google Agenda (abre o app no Android)
function linkGoogleAgenda(e, data) {
  const { ini, fim } = horariosAgenda(e, data);
  const url = e.link && /^https?:/.test(e.link) ? e.link : '';
  return 'https://calendar.google.com/calendar/render?action=TEMPLATE'
    + '&text=' + encodeURIComponent(e.titulo)
    + '&dates=' + fmtAgenda(ini) + '/' + fmtAgenda(fim) + '&ctz=America/Sao_Paulo'
    + '&details=' + encodeURIComponent([e.sub, url].filter(Boolean).join('\n\n'))
    + '&location=' + encodeURIComponent(e.local || LOCAL_PADRAO);
}

// Arquivo .ics (iPhone, Outlook e outros apps de agenda). Brasília é UTC-3 o ano todo.
function linkArquivoAgenda(e, data) {
  const { ini, fim } = horariosAgenda(e, data);
  const utc = d => new Date(d.getTime() + 3 * 3600000);
  const esc = t => String(t).replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1').replace(/\n/g, '\\n');
  const url = e.link && /^https?:/.test(e.link) ? e.link : '';
  const linhas = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//IP Chacara Parreiral//Agenda//PT', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:' + dataISO(data) + '-' + e.titulo.normalize('NFD').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '@ipchacara.org',
    'DTSTAMP:' + fmtAgenda(new Date(), true),
    'DTSTART:' + fmtAgenda(utc(ini), true), 'DTEND:' + fmtAgenda(utc(fim), true),
    'SUMMARY:' + esc(e.titulo),
    'DESCRIPTION:' + esc([e.sub, url].filter(Boolean).join('\n\n')),
    'LOCATION:' + esc(e.local || LOCAL_PADRAO),
    url ? 'URL:' + url : '',
    'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:' + esc(e.titulo), 'TRIGGER:-PT2H', 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR'
  ].filter(Boolean);
  return URL.createObjectURL(new Blob([linhas.join('\r\n')], { type: 'text/calendar;charset=utf-8' }));
}

const ROTULO_TIPO = { culto: 'Culto', escola: 'Escola Bíblica', oracao: 'Oração', especial: 'Especial' };

function dataISO(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function eventosDoDia(data) {
  const iso = dataISO(data);
  const especiais = EVENTOS_ESPECIAIS.filter(e => e.data === iso);
  const substituidos = especiais.map(e => e.substitui).filter(Boolean);
  const cancelados = Object.assign({}, ...especiais.map(e => e.cancela || {}));
  const lista = PROGRAMACAO_SEMANAL.filter(e => e.dia === data.getDay() && !substituidos.includes(e.titulo))
    .map(e => cancelados[e.titulo] ? { ...e, cancelado: cancelados[e.titulo] } : { ...e });
  especiais.forEach(e => lista.push({ tipo: 'especial', selo: 'Especial', ...e }));
  // '8h30' antes de '18h00': compara em minutos, não como texto
  const minutos = h => { const [hh, mm] = h.split('h').map(Number); return hh * 60 + (mm || 0); };
  return lista.sort((a, b) => minutos(a.hora) - minutos(b.hora));
}

// Próximos N eventos a partir de hoje (especiais primeiro dentro do mesmo dia)
function proximosEventos(qtd, diasMax) {
  const res = [];
  const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
  for (let i = 0; i < (diasMax || 60) && res.length < qtd; i++) {
    const d = new Date(hoje); d.setDate(hoje.getDate() + i);
    eventosDoDia(d).filter(e => !e.cancelado).forEach(e => { if (res.length < qtd) res.push({ ...e, quando: d }); });
  }
  return res;
}
