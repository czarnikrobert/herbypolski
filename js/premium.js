/* ==========================================================================
   HERBY POLSKI — wersja PREMIUM — skrypty
   ========================================================================== */
(() => {
  document.documentElement.classList.remove('no-js');
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const HERBY = window.HERBY || [];
  const esc = (s = '') => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

  /* ---------- Menu mobilne + rozwijany „Kontakt” ---------- */
  const hdr = $('.hdr');
  const burger = $('.burger');
  const dd = $('.dd');
  const ddBtn = $('.dd__btn');
  const closeAll = () => {
    hdr.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false');
    dd.classList.remove('is-open'); ddBtn.setAttribute('aria-expanded', 'false');
  };
  burger.addEventListener('click', () => {
    const open = hdr.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
  });
  ddBtn.addEventListener('click', e => {
    e.stopPropagation();
    const open = dd.classList.toggle('is-open');
    ddBtn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', e => { if (!e.target.closest('.dd')) { dd.classList.remove('is-open'); ddBtn.setAttribute('aria-expanded', 'false'); } });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });
  $$('.menu a').forEach(a => a.addEventListener('click', closeAll));

  /* ---------- Podświetlanie aktywnej sekcji w menu ---------- */
  const links = $$('.menu > ul > li > a');
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        links.forEach(a => a.getAttribute('href') === '#' + en.target.id ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(s => spy.observe(s));
  }

  /* ---------- Falująca wstęga (SVG): zatrzymaj przy „ograniczonym ruchu” ---------- */
  const ribbon = $('.ribbon');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const syncMotion = () => ribbon && (motion.matches ? ribbon.pauseAnimations() : ribbon.unpauseAnimations());
  syncMotion(); motion.addEventListener && motion.addEventListener('change', syncMotion);

  /* ---------- Animacje wejścia ---------- */
  let observe = el => el.classList.add('is-visible');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    observe = el => io.observe(el);
  }
  $$('.reveal').forEach(el => observe(el));

  /* ---------- Galeria herbów ---------- */
  const list = $('[data-gallery]');
  const card = (h, i) => `
    <li class="reveal" style="--d:${(i % 6) * .06}s">
      <button class="frame" type="button" data-open="${esc(h.slug)}" aria-haspopup="dialog">
        <img src="${esc(h.herb)}" alt="" width="104" height="125" loading="lazy">
        <h3>${esc(h.nazwa)}</h3>
        <p>${esc(h.krotko)}</p>
        <span class="frame__more">Poznaj miejsce</span>
      </button>
    </li>`;
  const join = `
    <li class="reveal">
      <a class="frame frame--join" href="#kontakt" data-typ="galeria">
        <span class="plus" aria-hidden="true">+</span>
        <h3>Twoja gmina?</h3>
        <p>Dołącz do galerii i pokaż swoje miejsce całej Polsce</p>
      </a>
    </li>`;
  const render = items => {
    list.innerHTML = items.length ? items.map(card).join('') + join : '<li class="empty">Brak miejscowości w tej kategorii.</li>';
    $$('.reveal', list).forEach(el => observe(el));
  };
  if (list) {
    render(HERBY);
    $$('.chip').forEach(ch => ch.addEventListener('click', () => {
      $$('.chip').forEach(c => c.setAttribute('aria-pressed', 'false'));
      ch.setAttribute('aria-pressed', 'true');
      const f = ch.dataset.filter;
      render(f === 'all' ? HERBY : HERBY.filter(h => h.typ === f));
    }));
  }

  /* ---------- Karta miejscowości ---------- */
  const dialog = $('#place-dialog');
  const openPlace = slug => {
    const h = HERBY.find(x => x.slug === slug);
    if (!h) return;
    $('.place__scroll', dialog).innerHTML = `
      <div class="place__head">
        <h2 id="place-title">${esc(h.nazwa)}</h2>
        <p>${h.typ === 'gmina' ? 'Gmina' : 'Miasto'} · woj. ${esc(h.wojewodztwo)}</p>
        <div class="place__pair">
          <figure class="pl"><img src="assets/herby/polska.webp" alt="Herb Polski"><figcaption class="brass brass--lg">HERB POLSKI</figcaption></figure>
          <figure class="loc"><img src="${esc(h.herb)}" alt="Herb: ${esc(h.nazwa)}"><figcaption class="brass">${esc(h.nazwa)}</figcaption></figure>
        </div>
      </div>
      <div class="place__body">
        <div>
          <h3>Symbolika herbu</h3><p>${esc(h.symbolika)}</p>
          <h3>Historia miejsca</h3><p>${esc(h.historia)}</p>
          <h3>Ciekawostki i legendy</h3><ul>${h.ciekawostki.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
        </div>
        <aside class="place__aside">
          <h3>Warto zobaczyć</h3>
          <ul>${h.zobacz.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
          <div class="place__invite">
            <p>„${esc(h.zaproszenie)}”</p>
            ${h.strona
              ? `<a class="btn3d btn3d--red" href="${esc(h.strona)}" target="_blank" rel="noopener">Zaplanuj wizytę<span class="sr-only"> — oficjalna strona: ${esc(h.nazwa)} (otwiera się w nowej karcie)</span></a>`
              : `<a class="btn3d btn3d--red" href="#kontakt" data-close>Zaplanuj wizytę</a>`}
          </div>
          ${h.zweryfikuj ? '<p class="place__note">Karta pilotażowa — treść czeka na zatwierdzenie przez urząd gminy.</p>' : ''}
        </aside>
      </div>`;
    dialog.showModal();
    $('.place__scroll', dialog).scrollTop = 0;
  };
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-open]');
    if (b) openPlace(b.dataset.open);
    if (e.target.closest('[data-close]')) dialog.close();
  });
  $('.place__close', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });

  /* ---------- Formularz (mailto) + ustawianie tematu z linków ---------- */
  const form = $('#contact-form');
  const typSel = $('#f-typ');
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-typ]');
    if (a && typSel) typSel.value = a.dataset.typ;
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const d = Object.fromEntries(new FormData(form));
    const subject = `HERBY POLSKI — zapytanie: ${typSel.selectedOptions[0].text} (${d.instytucja || d.imie})`;
    const body = [`Imię i nazwisko: ${d.imie}`, `Instytucja: ${d.instytucja || '-'}`, `Miejscowość / gmina: ${d.miejscowosc || '-'}`, `E-mail: ${d.email}`, '', d.wiadomosc].join('\n');
    location.href = `mailto:${form.dataset.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    $('.form__status', form).textContent = 'Otwieramy Twój program pocztowy z gotową wiadomością…';
  });

  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();
