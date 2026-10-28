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
const EVENTOS_ESPECIAIS = [
  { data: '2026-11-08', titulo: 'Assembleia Extraordinária', hora: '8h30', sub: 'Na igreja Sede (IPJC)',
    pauta: [
      'Aprovação, ou não, da compra do terreno em Santa Maria de Jetibá para a construção do templo da congregação',
      'Aprovação, ou não, de empréstimo junto à Junta Patrimonial da IPB para a construção do templo da congregação em Santa Maria de Jetibá',
      'Proposta de título de diácono emérito ao irmão Ismael Silva',
    ] },
  { data: '2026-12-13', titulo: 'Cantata de Natal “Santo pra Sempre”', hora: '19h30', sub: 'No nosso templo · Aberta à comunidade: traga um convidado', substitui: 'Culto de Adoração' },
];

const ROTULO_TIPO = { culto: 'Culto', escola: 'Escola Bíblica', oracao: 'Oração', especial: 'Especial' };

function dataISO(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function eventosDoDia(data) {
  const iso = dataISO(data);
  const especiais = EVENTOS_ESPECIAIS.filter(e => e.data === iso);
  const substituidos = especiais.map(e => e.substitui).filter(Boolean);
  const lista = PROGRAMACAO_SEMANAL.filter(e => e.dia === data.getDay() && !substituidos.includes(e.titulo)).map(e => ({ ...e }));
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
    eventosDoDia(d).forEach(e => { if (res.length < qtd) res.push({ ...e, quando: d }); });
  }
  return res;
}
