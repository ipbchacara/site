/* ==========================================================================
   AGENDA DA IGREJA — usada pela página inicial e pela página /eventos.
   Para incluir um evento especial, adicione uma linha em EVENTOS_ESPECIAIS.
   ========================================================================== */

// Programação fixa. dia: 0 = domingo, 1 = segunda ... 6 = sábado
const PROGRAMACAO_SEMANAL = [
  { dia: 0, titulo: 'Escola Bíblica Dominical', hora: '18h00', tipo: 'escola', selo: 'Semanal' },
  { dia: 0, titulo: 'Culto de Adoração',        hora: '19h30', tipo: 'culto',  selo: 'Semanal' },
  { dia: 2, titulo: 'Reunião de Oração',        hora: '19h30', tipo: 'oracao', selo: 'Semanal' },
];

// Eventos especiais. Formato da data: 'AAAA-MM-DD'.
// Exemplo:
//   { data: '2026-12-20', titulo: 'Cantata de Natal', hora: '19h30', tipo: 'especial', selo: 'Especial', sub: 'Aberta à comunidade', link: '/natal2026' },
const EVENTOS_ESPECIAIS = [
];

const ROTULO_TIPO = { culto: 'Culto', escola: 'Escola Bíblica', oracao: 'Oração', especial: 'Especial' };

function dataISO(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function eventosDoDia(data) {
  const lista = PROGRAMACAO_SEMANAL.filter(e => e.dia === data.getDay()).map(e => ({ ...e }));
  const iso = dataISO(data);
  EVENTOS_ESPECIAIS.forEach(e => { if (e.data === iso) lista.push({ tipo: 'especial', selo: 'Especial', ...e }); });
  return lista.sort((a, b) => a.hora.localeCompare(b.hora));
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
