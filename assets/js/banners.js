/* ==========================================================================
   ARTES DA AGENDA feitas em HTML/CSS (não são imagens chapadas).
   Uso no agenda.js: banner: 'oracao'  ou  banner: ['ebd-adultos', 'ebd-criancas']
   Estilos em /assets/css/banners.css
   ========================================================================== */
(function () {
  let seed = 1;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  // ── Reunião de Oração: bairro à noite ───────────────────
  function predio(x, w, top, cor, apagada, acesas, o) {
    let s = `<rect x="${x}" y="${top}" width="${w}" height="${1010 - top}" fill="${cor}"/>`;
    if (o.topo) s += `<rect x="${x + 6}" y="${top - 10}" width="${w - 12}" height="10" fill="${cor}"/>`;
    const n = Math.floor((w - 16 + o.gx) / (o.ww + o.gx));
    const x0 = x + (w - (n * o.ww + (n - 1) * o.gx)) / 2;
    for (let y = top + 18; y + o.wh < 998; y += o.wh + o.gy) {
      for (let i = 0; i < n; i++) {
        const acesa = rnd() < acesas;
        s += `<rect x="${(x0 + i * (o.ww + o.gx)).toFixed(1)}" y="${y}" width="${o.ww}" height="${o.wh}" fill="${acesa ? '#F2C46B' : apagada}"${acesa ? ` fill-opacity="${(0.55 + rnd() * 0.4).toFixed(2)}"` : ''}/>`;
      }
    }
    return s;
  }
  function pessoa(x, h, dir) {
    const b = 1012, c = h * 0.13, t = b - h + c * 2 + 2;
    return `<g fill="#0B1024"><circle cx="${x}" cy="${b - h + c}" r="${c.toFixed(1)}"/>
      <path d="M ${x - h * .13} ${b - h * .45} L ${x - h * .15} ${t + 6} Q ${x} ${t - 4} ${x + h * .15} ${t + 6} L ${x + h * .13} ${b - h * .45} Z"/>
      <path d="M ${x - h * .1} ${b - h * .47} L ${x - h * .1 - dir * h * .08} ${b} L ${x - h * .02 - dir * h * .08} ${b} L ${x + 1} ${b - h * .3} Z"/>
      <path d="M ${x + h * .1} ${b - h * .47} L ${x + h * .1 + dir * h * .1} ${b} L ${x + h * .02 + dir * h * .1} ${b} L ${x - 1} ${b - h * .3} Z"/></g>`;
  }
  function horizonte() {
    seed = 7;
    let s = `<defs>
      <radialGradient id="bn-halo"><stop offset="0" stop-color="#FFC857" stop-opacity=".38"/><stop offset=".45" stop-color="#FFC857" stop-opacity=".14"/><stop offset="1" stop-color="#FFC857" stop-opacity="0"/></radialGradient>
      <linearGradient id="bn-feixe" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFC857" stop-opacity=".45"/><stop offset="1" stop-color="#FFC857" stop-opacity="0"/></linearGradient></defs>
      <circle cx="1330" cy="860" r="520" fill="url(#bn-halo)"/>`;
    const longe = [[0,150,830],[150,120,850],[270,170,815],[440,140,845],[580,190,800],[770,130,780],[900,150,640],[1050,120,520],[1170,170,600],[1340,110,470],[1450,160,560],[1610,130,430],[1740,180,520],[1890,40,600]];
    longe.forEach(([x, w, t]) => { s += predio(x, w, t, '#232E57', '#2C3864', 0.1, { ww: 10, wh: 14, gx: 10, gy: 14, topo: rnd() < 0.4 }); });
    const perto = [[0,200,880],[200,160,905],[360,220,870],[580,150,895],[730,200,860],[930,160,820],[1090,70,800],[1500,130,770],[1630,120,800],[1750,170,740]];
    perto.forEach(([x, w, t]) => { s += predio(x, w, t, '#18203F', '#212A4E', 0.14, { ww: 14, wh: 20, gx: 14, gy: 18 }); });
    const C = '#141B38';
    s += `<path d="M 1270 760 L 1370 700 L 1470 760 L 1470 1010 L 1270 1010 Z" fill="${C}"/>
      <rect x="1180" y="600" width="90" height="410" fill="${C}"/><path d="M 1172 600 L 1225 520 L 1278 600 Z" fill="${C}"/>
      <rect x="1222" y="480" width="6" height="44" fill="${C}"/><rect x="1211" y="492" width="28" height="6" fill="${C}"/>
      <path d="M 1213 690 L 1213 650 Q 1213 632 1225 632 Q 1237 632 1237 650 L 1237 690 Z" fill="#FFC857" fill-opacity=".85"/>`;
    [1300, 1352, 1404].forEach(x => {
      s += `<path d="M ${x} 880 L ${x} 806 Q ${x} 786 ${x + 18} 786 Q ${x + 36} 786 ${x + 36} 806 L ${x + 36} 880 Z" fill="#FFC857"/><rect x="${x + 17}" y="786" width="2" height="94" fill="#D99A2B"/>`;
    });
    s += `<circle cx="1370" cy="745" r="14" fill="#FFC857" fill-opacity=".9"/>
      <path d="M 1340 1010 L 1340 945 Q 1340 915 1370 915 Q 1400 915 1400 945 L 1400 1010 Z" fill="#FFD983"/>
      <rect x="0" y="1010" width="1920" height="70" fill="#0F152D"/>
      <path d="M 1340 1010 L 1400 1010 L 1520 1080 L 1220 1080 Z" fill="url(#bn-feixe)"/>`;
    s += pessoa(1060, 74, 1) + pessoa(1092, 70, 1) + pessoa(1150, 60, 1) + pessoa(1170, 40, 1) + pessoa(1590, 72, -1) + pessoa(1640, 76, -1);
    return `<svg class="bn-horizonte" viewBox="0 420 1920 660" aria-hidden="true">${s}</svg>`;
  }
  function estrelas() {
    seed = 11;
    let s = '';
    for (let i = 0; i < 40; i++) s += `<circle cx="${(rnd() * 1000).toFixed(0)}" cy="${(rnd() * 460).toFixed(0)}" r="${(1 + rnd() * 1.8).toFixed(1)}" fill="#F4E9D2" fill-opacity="${(0.25 + rnd() * 0.6).toFixed(2)}"/>`;
    return `<svg class="bn-estrelas" viewBox="0 0 1000 460" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${s}</svg>`;
  }
  const oracao = () => `
    <div class="bn bn-oracao"><div class="bn-in">
      ${estrelas()}<span class="bn-lua" aria-hidden="true"></span>${horizonte()}
      <div class="bn-texto">
        <div class="bn-sobre"><i></i>Reunião de Oração</div>
        <p class="bn-titulo">Terça à noite,<br>tem luz acesa<br><em>no bairro.</em></p>
        <p class="bn-hora">Toda terça <b>19h30</b></p>
        <p class="bn-versiculo">“Todos estes perseveravam<br>unânimes em oração.”</p>
        <p class="bn-ref">Atos 1.14</p>
      </div>
    </div></div>`;

  // ── EBD jovens e adultos: Catecismo Maior ───────────────
  const ebdAdultos = () => `
    <div class="bn bn-ebd-adultos"><div class="bn-in">
      <div class="bn-gravura">
        <img src="/assets/img/westminster-hollar-1655.jpg" alt="Fachada oeste da Abadia de Westminster, gravura de Wenceslaus Hollar, c. 1655" loading="lazy">
        <span class="bn-credito">Abadia de Westminster · W. Hollar, c. 1655</span>
      </div>
      <span class="bn-filete" aria-hidden="true"></span>
      <div class="bn-texto">
        <div class="bn-sobre">Escola Bíblica Dominical</div>
        <p class="bn-titulo">Catecismo<br><em>Maior</em></p>
        <p class="bn-de"><span>de Westminster</span><i aria-hidden="true"></i><b>1647</b></p>
        <p class="bn-pergunta">“Qual é o fim supremo e principal do homem?” <span>· Pergunta 1</span></p>
      </div>
      <div class="bn-rodape">
        <span class="bn-classe">Classe de jovens e adultos</span>
        <span class="bn-quando">Domingo, 18h</span>
      </div>
      <div class="bn-selo"><div><b>196</b><span>perguntas<br>uma de cada vez</span></div></div>
    </div></div>`;

  // ── EBD das crianças ────────────────────────────────────
  const sol = (cx, cy) => {
    let s = '';
    for (let i = 0; i < 16; i++) s += `<rect x="${cx - 11}" y="${cy - 192}" width="22" height="62" rx="6" transform="rotate(${i * 22.5} ${cx} ${cy})"/>`;
    return `<g fill="#F2B233">${s}<circle cx="${cx}" cy="${cy}" r="112"/></g>`;
  };
  const nuvem = (x, y, k) => `<g fill="#FFFDF8" transform="translate(${x} ${y}) scale(${k})"><circle cx="40" cy="62" r="42"/><circle cx="90" cy="40" r="56"/><circle cx="148" cy="64" r="40"/><rect x="0" y="62" width="185" height="42" rx="21"/></g>`;
  const pinheiro = `<g transform="translate(-1000 0)"><path d="M 1222 640 L 1206 1000 L 1180 1000 L 1196 640 Z" fill="#C79A6B"/><path d="M 1212 820 L 1258 778 L 1264 790 L 1214 842 Z" fill="#C79A6B"/><path d="M 1200 760 L 1160 728 L 1154 740 L 1198 780 Z" fill="#C79A6B"/><path d="M 1160 1000 L 1230 1000 L 1238 1012 L 1150 1012 Z" fill="#C79A6B"/><path d="M 1208 300 C 1300 400 1330 560 1318 640 C 1306 712 1110 712 1098 640 C 1086 560 1116 400 1208 300 Z" fill="#2F6B45"/></g>`;
  const arvore = `<g><path d="M 1812 600 L 1830 1000 L 1790 1000 L 1806 600 Z" fill="#C79A6B"/><path d="M 1826 760 L 1872 724 L 1878 736 L 1828 780 Z" fill="#C79A6B"/><path d="M 1800 840 L 1756 808 L 1750 820 L 1798 862 Z" fill="#C79A6B"/><path d="M 1770 1000 L 1852 1000 L 1862 1012 L 1760 1012 Z" fill="#C79A6B"/><g fill="#2F6B45"><circle cx="1810" cy="520" r="120"/><circle cx="1712" cy="600" r="96"/><circle cx="1906" cy="600" r="96"/><circle cx="1810" cy="660" r="104"/></g></g>`;
  const ovelha = `<g transform="translate(-1000 0)"><rect x="1290" y="760" width="200" height="210" rx="60" fill="#FFFFFF"/><g fill="#FFF6E6"><circle cx="1350" cy="870" r="40"/><circle cx="1400" cy="850" r="44"/><circle cx="1440" cy="884" r="38"/><circle cx="1360" cy="910" r="36"/><circle cx="1418" cy="916" r="36"/></g><rect x="1352" y="930" width="14" height="30" rx="6" fill="#4A3A33"/><rect x="1414" y="930" width="14" height="30" rx="6" fill="#4A3A33"/><ellipse cx="1326" cy="812" rx="20" ry="12" fill="#E9CFAE" transform="rotate(-25 1326 812)"/><ellipse cx="1390" cy="812" rx="20" ry="12" fill="#E9CFAE" transform="rotate(25 1390 812)"/><ellipse cx="1358" cy="826" rx="38" ry="42" fill="#F4E2C6"/><circle cx="1358" cy="790" r="20" fill="#FFF6E6"/><circle cx="1342" cy="796" r="14" fill="#FFF6E6"/><circle cx="1374" cy="796" r="14" fill="#FFF6E6"/><circle cx="1345" cy="828" r="6" fill="#2B2B2B"/><circle cx="1371" cy="828" r="6" fill="#2B2B2B"/><circle cx="1335" cy="846" r="7" fill="#F4A6A0"/><circle cx="1381" cy="846" r="7" fill="#F4A6A0"/><path d="M 1352 850 Q 1358 856 1364 850" fill="none" stroke="#6B4A3A" stroke-width="3" stroke-linecap="round"/></g>`;
  const leao = (() => {
    let juba = '';
    for (let i = 0; i < 14; i++) { const a = i * Math.PI / 7; juba += `<circle cx="${(1560 + 92 * Math.cos(a)).toFixed(1)}" cy="${(850 + 92 * Math.sin(a)).toFixed(1)}" r="30"/>`; }
    return `<g transform="translate(-60 0)"><circle cx="1560" cy="850" r="136" fill="#FFFFFF"/><g fill="#E07A22">${juba}<circle cx="1560" cy="850" r="96"/></g><circle cx="1508" cy="796" r="18" fill="#F6C35A"/><circle cx="1612" cy="796" r="18" fill="#F6C35A"/><circle cx="1560" cy="858" r="68" fill="#F6C35A"/><circle cx="1538" cy="846" r="7" fill="#2B2B2B"/><circle cx="1582" cy="846" r="7" fill="#2B2B2B"/><circle cx="1522" cy="868" r="9" fill="#F4A6A0"/><circle cx="1598" cy="868" r="9" fill="#F4A6A0"/><path d="M 1550 864 L 1570 864 L 1560 876 Z" fill="#6B3A1E"/><path d="M 1548 884 Q 1554 892 1560 884 Q 1566 892 1572 884" fill="none" stroke="#6B3A1E" stroke-width="3" stroke-linecap="round"/></g>`;
  })();
  // Põe um desenho (feito nas coordenadas da arte larga) em outro lugar e escala
  const por = (g, bx, by, x, y, k) => `<g transform="translate(${x - bx * k} ${y - by * k}) scale(${k})">${g}</g>`;
  const sombra = id => `<defs><filter id="${id}" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="6" dy="10" stdDeviation="8" flood-color="#1B2638" flood-opacity=".22"/></filter></defs>`;
  const cenaLarga = `<svg class="bn-cena bn-larga" viewBox="0 0 1920 1080" aria-hidden="true">${sombra('bn-sombra-l')}
    <rect x="0" y="660" width="1920" height="420" fill="#5B6B78"/><g filter="url(#bn-sombra-l)">${sol(155, 145)}
    ${nuvem(1580, 68, 1)}${nuvem(1376, 48, .6)}${nuvem(402, 70, .7)}
    ${pinheiro}${arvore}${ovelha}${leao}</g></svg>`;
  const cenaAlta = `<svg class="bn-cena bn-alta" viewBox="0 0 900 1125" aria-hidden="true">${sombra('bn-sombra-a')}
    <rect x="0" y="760" width="900" height="365" fill="#5B6B78"/><g filter="url(#bn-sombra-a)">${por(sol(155, 145), 155, 145, 96, 96, .55)}
    ${nuvem(690, 58, .6)}${nuvem(560, 26, .4)}
    ${por(pinheiro, 98, 300, 4, 404, .5)}${por(arvore, 1616, 400, 722, 454, .5)}
    ${por(ovelha, 290, 760, 26, 996, .5)}${por(leao, 1364, 714, 754, 979, .45)}</g></svg>`;
  const ebdCriancas = () => `
    <div class="bn bn-ebd-criancas"><div class="bn-in">
      ${cenaLarga}${cenaAlta}
      <div class="bn-topo">
        <div class="bn-sobre">Escola Bíblica das Crianças</div>
        <p class="bn-titulo"><span>Hora de <em>aprender</em></span> <span class="bn-verde">com a Bíblia!</span></p>
      </div>
      <div class="bn-base">
        <p class="bn-hora"><b>18h</b> todo domingo</p>
        <p class="bn-sub">Classes por idade, no mesmo horário<br>da classe dos adultos.</p>
      </div>
    </div></div>`;

  const ARTES = { 'oracao': oracao, 'ebd-adultos': ebdAdultos, 'ebd-criancas': ebdCriancas };
  window.bannersHTML = nomes => {
    const lista = [].concat(nomes || []).filter(n => ARTES[n]);
    return lista.length ? `<div class="bns">${lista.map(n => ARTES[n]()).join('')}</div>` : '';
  };
})();
