/* ==========================================================================
   Cabeçalho, menu e rodapé compartilhados por todas as páginas.
   Para mudar contatos, redes sociais ou o menu, edite apenas IGREJA e MENU.
   ========================================================================== */
(function () {

  // ── DADOS DA IGREJA ────────────────────────────────────
  // Deixe a rede social vazia ('') para escondê-la do site.
  const IGREJA = {
    nome: 'Igreja Presbiteriana Chácara Parreiral',
    slogan: 'Uma família enraizada em Cristo.',
    endereco: 'Rua Teresa Tironi, 15 — Guaraciaba',
    cidade: 'Serra — ES',
    email: 'secretaria@ipchacara.org',
    whatsapp: '',   // ex.: '5527999999999'
    instagram: '',  // ex.: 'https://instagram.com/ipchacara'
    youtube: '',    // ex.: 'https://youtube.com/@ipchacara'
    mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Teresa+Tironi%2C+15+-+Guaraciaba%2C+Serra+-+ES'
  };

  const MENU = [
    { rotulo: 'Início',        href: '/' },
    { rotulo: 'Quem somos',    href: '/sobre' },
    { rotulo: 'Em que cremos', href: '/cremos' },
    { rotulo: 'Ministérios',   href: '/ministerios' },
    { rotulo: 'Agenda',        href: '/eventos' },
    { rotulo: 'Contribua',     href: '/contribua' },
    { rotulo: 'Contato',       href: '/contato' },
  ];

  window.IGREJA = IGREJA;

  const ICONES = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    fechar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-4.8.5-4.8s0-3.2-.5-4.8zM9.7 15.1V8.9l5.8 3.1-5.8 3.1z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.4-.5.3-.5v-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.5 13.5 0 0 0 5.2 4.6c1.9.8 2.7.9 3.6.7a3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.2-.3-.3-.6-.4zM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 1 1 8.3 4.6zm0-21.6A11.8 11.8 0 0 0 1.9 18L.2 24l6.2-1.6A11.8 11.8 0 1 0 12 .2z"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>'
  };
  window.ICONES = ICONES;

  const caminho = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';
  function ativo(href) {
    const h = href.replace(/\/$/, '') || '/';
    return h === '/' ? caminho === '/' : (caminho === h || caminho.startsWith(h + '/'));
  }

  // ── CABEÇALHO ──────────────────────────────────────────
  function montarCabecalho() {
    const alvo = document.getElementById('site-header');
    if (!alvo) return;
    const links = MENU.map((l, i) =>
      `<a href="${l.href}" style="--i:${i}"${ativo(l.href) ? ' class="ativo" aria-current="page"' : ''}>${l.rotulo}</a>`
    ).join('');
    alvo.innerHTML = `
      <a class="pular" href="#conteudo">Pular para o conteúdo</a>
      <header class="topo">
        <div class="container topo-inner">
          <a class="marca" href="/" aria-label="Página inicial — ${IGREJA.nome}">
            <img src="/assets/img/logo-horizontal-colorida.svg" alt="" width="162" height="46">
          </a>
          <button class="menu-botao" aria-expanded="false" aria-controls="menu-principal" aria-label="Abrir menu">${ICONES.menu}</button>
          <nav class="menu" id="menu-principal" aria-label="Menu principal">
            ${links}
            <a class="btn btn-uva" href="/visitante" style="--i:${MENU.length}">Sou visitante</a>
          </nav>
        </div>
      </header>`;

    const topo = alvo.querySelector('.topo');
    const botao = alvo.querySelector('.menu-botao');
    const menu = alvo.querySelector('.menu');
    botao.addEventListener('click', () => {
      const aberto = menu.classList.toggle('aberto');
      document.body.classList.toggle('menu-aberto', aberto);
      botao.setAttribute('aria-expanded', aberto);
      botao.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
      botao.innerHTML = aberto ? ICONES.fechar : ICONES.menu;
      botao.classList.add('trocou');
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('aberto')) botao.click(); });
    const aoRolar = () => topo.classList.toggle('rolou', window.scrollY > 8);
    window.addEventListener('scroll', aoRolar, { passive: true });
    aoRolar();
  }

  // ── RODAPÉ ─────────────────────────────────────────────
  function montarRodape() {
    const alvo = document.getElementById('site-footer');
    if (!alvo) return;
    const redes = [
      IGREJA.instagram && `<a href="${IGREJA.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICONES.instagram}</a>`,
      IGREJA.youtube && `<a href="${IGREJA.youtube}" target="_blank" rel="noopener" aria-label="YouTube">${ICONES.youtube}</a>`,
      IGREJA.whatsapp && `<a href="https://wa.me/${IGREJA.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICONES.whatsapp}</a>`,
      `<a href="mailto:${IGREJA.email}" aria-label="E-mail">${ICONES.email}</a>`
    ].filter(Boolean).join('');
    alvo.innerHTML = `
      <footer class="rodape">
        <div class="container">
          <div class="rodape-grade">
            <div>
              <div class="marcas-rodape">
                <a href="/" aria-label="Página inicial"><img class="logo-rodape" src="/assets/img/logo-vertical-branca.svg" alt="Presbiteriana Chácara Parreiral" width="160" height="104"></a>
                <span class="divisor" aria-hidden="true"></span>
                <a class="logo-ipb" href="https://www.ipb.org.br" target="_blank" rel="noopener" title="Site oficial da Igreja Presbiteriana do Brasil"><img src="/assets/img/logo-ipb-vertical-branco.png" alt="Igreja Presbiteriana do Brasil" width="103" height="72"></a>
              </div>
              <p class="slogan">${IGREJA.slogan}</p>
              <div class="redes">${redes}</div>
            </div>
            <div>
              <h4>Navegue</h4>
              <ul>${[...MENU.slice(1, 3), { rotulo: 'Como nos organizamos', href: '/governo' }, ...MENU.slice(3, 5)].map(l => `<li><a href="${l.href}">${l.rotulo}</a></li>`).join('')}</ul>
            </div>
            <div>
              <h4>Participe</h4>
              <ul>
                <li><a href="/visitante">Sou visitante</a></li>
                <li><a href="/contribua">Dízimos e ofertas</a></li>
                <li><a href="/oracao/">Pedido de oração</a></li>
                <li><a href="/contato">Fale conosco</a></li>
              </ul>
            </div>
            <div>
              <h4>Venha nos visitar</h4>
              <p>${IGREJA.endereco}<br>${IGREJA.cidade}</p>
              <p><a href="${IGREJA.mapa}" target="_blank" rel="noopener">Abrir no mapa →</a></p>
              <p><a href="mailto:${IGREJA.email}">${IGREJA.email}</a></p>
            </div>
          </div>
          <div class="rodape-base">
            <span>© ${new Date().getFullYear()} ${IGREJA.nome}</span>
            <span>“Eu sou a videira, vós, os ramos.” — João 15.5</span>
          </div>
        </div>
      </footer>`;
  }

  // ── ANIMAÇÃO DE ENTRADA ────────────────────────────────
  // Itens que entram na tela juntos aparecem em sequência. Terminada a entrada,
  // a classe sai para o elemento voltar às próprias transições (hover dos cartões).
  function revelar() {
    const itens = document.querySelectorAll('.revelar');
    if (!('IntersectionObserver' in window)) { itens.forEach(el => el.classList.add('visivel')); return; }
    const concluir = e => {
      if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;
      const el = e.currentTarget;
      el.removeEventListener('transitionend', concluir);
      el.classList.remove('revelar', 'visivel');
      el.style.removeProperty('--atraso');
      el.style.transitionDelay = '';
    };
    const obs = new IntersectionObserver(entradas => {
      entradas.filter(e => e.isIntersecting).forEach((e, i) => {
        e.target.style.setProperty('--atraso', Math.min(i * 0.09, 0.45) + 's');
        e.target.classList.add('visivel');
        obs.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    itens.forEach(el => { el.addEventListener('transitionend', concluir); obs.observe(el); });
  }

  function iniciar() { montarCabecalho(); montarRodape(); revelar(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();

})();
