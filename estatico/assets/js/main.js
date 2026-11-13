/* ==========================================================================
   MEAT BLEND — scripts do site e da landing page
   Sem dependências. Carregado com "defer". A classe "js" no <html> é
   adicionada por um script inline no <head> (evita o "flash" das animações).
   ========================================================================== */
(() => {
  'use strict';

  /* Número do WhatsApp comercial: só dígitos, com DDI 55 + DDD.
     TODO: trocar pelo número real (procure também "5500000000000" nos .html). */
  const WHATSAPP = '5500000000000';
  /* E-mail usado como alternativa ao WhatsApp no formulário. */
  const EMAIL = 'contato@meatblend.com.br';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Origem da visita (UTM + página anterior) ---------- */
  const params = new URLSearchParams(window.location.search);
  const store = {
    get: (k) => { try { return sessionStorage.getItem(k) || ''; } catch (err) { return ''; } },
    set: (k, v) => { try { sessionStorage.setItem(k, v); } catch (err) { /* modo privado */ } },
  };
  const utmNow = ['utm_source', 'utm_medium', 'utm_campaign'].map((k) => params.get(k)).filter(Boolean).join(' / ');
  if (utmNow) store.set('mb-utm', utmNow);
  const fromPage = (() => {
    try {
      const r = new URL(document.referrer);
      return r.origin === location.origin && r.pathname !== location.pathname ? r.pathname : '';
    } catch (err) { return ''; }
  })();

  /* ---------- Cabeçalho: fundo sólido ao rolar ---------- */
  const header = document.querySelector('[data-header]');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Menu mobile ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');
  if (toggle && nav) {
    const label = toggle.querySelector('.sr-only');
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
      if (label) label.textContent = open ? 'Fechar menu' : 'Abrir menu';
      document.querySelectorAll('main, footer, .skip-link').forEach((el) => { el.inert = open; });
      if (open) { const first = nav.querySelector('a'); if (first) first.focus(); }
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 981px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
  }

  /* ---------- Animação de entrada ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Ano no rodapé ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });

  /* ---------- Pré-seleção via URL (ex.: contato.html?blend=Smash) ---------- */
  params.forEach((value, key) => {
    document.querySelectorAll(`form [name="${CSS.escape(key)}"]`).forEach((field) => {
      if (field.type === 'checkbox' || field.type === 'radio') {
        if (field.value.toLowerCase() === value.toLowerCase()) field.checked = true;
      } else if (field.tagName === 'SELECT' || field.tagName === 'TEXTAREA' || field.type === 'text') {
        if (!field.value) field.value = value;
      }
    });
  });

  /* Aviso "Blend escolhido" quando a URL pré-marcou blends */
  document.querySelectorAll('form[data-wa-form]').forEach((form) => {
    const chosen = [...form.querySelectorAll('[name="blend"]:checked')].map((i) => i.value);
    const card = form.closest('.form-card');
    const head = card && card.querySelector('.form-card__head');
    if (!chosen.length || !head) return;
    const p = document.createElement('p'); p.className = 'form__picked';
    const s = document.createElement('strong'); s.textContent = chosen.join(', ');
    p.append('Blend escolhido: ', s, '. Dá para mudar mais abaixo.');
    head.append(p);
  });

  /* ---------- Formulários: validação em pt-BR + mensagem pronta no WhatsApp ---------- */
  const ERR = { text: 'Preencha este campo.', select: 'Selecione uma opção.' };
  const fieldsOf = (form) => [...form.querySelectorAll('input:not([type="checkbox"]):not([type="hidden"]), select, textarea')];
  const check = (f) => {
    const bad = f.required && !String(f.value).trim();
    const box = f.closest('.field');
    let err = document.getElementById(`${f.id}-erro`);
    if (!err && box) { err = document.createElement('p'); err.className = 'field__error'; err.id = `${f.id}-erro`; box.append(err); }
    if (err) err.textContent = bad ? (f.dataset.error || (f.tagName === 'SELECT' ? ERR.select : ERR.text)) : '';
    if (bad) { f.setAttribute('aria-invalid', 'true'); f.setAttribute('aria-describedby', `${f.id}-erro`); }
    else { f.removeAttribute('aria-invalid'); f.removeAttribute('aria-describedby'); }
    return !bad;
  };
  const showStatus = (form, kind, wa, mail) => {
    const box = form.querySelector('[data-status]');
    const tpl = form.querySelector(`template[data-status-tpl="${kind}"]`);
    if (!box || !tpl) return;
    box.replaceChildren(tpl.content.cloneNode(true));
    box.querySelectorAll('[data-wa-link]').forEach((a) => { a.href = wa; });
    box.querySelectorAll('[data-mail-link]').forEach((a) => { a.href = mail; });
    box.focus();
  };

  document.querySelectorAll('form[data-wa-form]').forEach((form) => {
    form.noValidate = true;
    fieldsOf(form).forEach((f) => ['input', 'change'].forEach((ev) => f.addEventListener(ev, () => {
      if (f.getAttribute('aria-invalid') === 'true') check(f);
    })));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const bad = fieldsOf(form).filter((f) => !check(f));
      if (bad.length) { bad[0].focus(); return; }

      const data = new FormData(form);
      const lines = [form.dataset.intro || 'Olá, Meat Blend!', ''];
      const seen = new Set();
      for (const [name] of data) {
        if (seen.has(name)) continue;
        seen.add(name);
        const values = data.getAll(name).map((v) => String(v).trim()).filter(Boolean);
        if (!values.length) continue;
        const field = form.querySelector(`[name="${CSS.escape(name)}"]`);
        const label = (field && field.dataset.label) || name;
        lines.push(`*${label}:* ${values.join(', ')}`);
      }
      const origem = utmNow || store.get('mb-utm');
      if (origem) lines.push(`*Origem:* ${origem}`);
      lines.push(`*Página:* ${form.dataset.page || fromPage || location.pathname}`);

      const text = lines.join('\n');
      const wa = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
      const mail = `mailto:${EMAIL}?subject=${encodeURIComponent(form.dataset.subject || 'Pedido de amostra pelo site')}&body=${encodeURIComponent(text.replace(/\*/g, ''))}`;
      const w = window.open(wa, '_blank'); // sem "noopener": precisamos do retorno para detectar bloqueio
      if (w) { try { w.opener = null; } catch (err) { /* outra origem */ } }
      showStatus(form, w ? 'opened' : 'blocked', wa, mail);
    });
  });

  /* ---------- Calculadora de custo por burger ---------- */
  document.querySelectorAll('[data-calc]').forEach((calc) => {
    const price = calc.querySelector('[data-in="price"]');
    const grams = calc.querySelector('[data-in="grams"]');
    const units = calc.querySelector('[data-in="units"]');
    const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const kg = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 });
    const num = (input) => {
      let s = String(input.value).trim();
      if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
      const v = parseFloat(s);
      return Number.isFinite(v) && v > 0 ? v : NaN;
    };
    const put = (k, v) => calc.querySelectorAll(`[data-out="${k}"]`).forEach((el) => { el.textContent = v; });
    const hint = calc.querySelector('[data-calc-hint]');
    const cta = calc.querySelector('[data-calc-cta]');
    const sr = calc.querySelector('[data-out="sr"]');
    const faixa = (u) => (u <= 500 ? 'Até 500' : u <= 1500 ? 'De 500 a 1.500' : u <= 3000 ? 'De 1.500 a 3.000' : 'Mais de 3.000');
    const quick = calc.querySelectorAll('[data-grams]');
    const syncQuick = () => quick.forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.grams) === num(grams))));
    let t;

    const update = (announce) => {
      const p = num(price), g = num(grams), u = num(units);
      syncQuick();
      if ([p, g, u].some(Number.isNaN)) {
        ['unit', 'month', 'kg', 'grams'].forEach((k) => put(k, '—'));
        if (hint) hint.hidden = false;
        if (cta) cta.href = 'contato.html#pedir-amostra';
        return;
      }
      if (hint) hint.hidden = true;
      const perUnit = (p * g) / 1000;
      const monthKg = (g * u) / 1000;
      put('unit', brl.format(perUnit));
      put('kg', `${kg.format(monthKg)} kg`);
      put('month', brl.format(perUnit * u));
      put('grams', `${kg.format(g)} g`);
      if (cta) {
        const msg = `Quero receber a tabela de preços. Simulei ${kg.format(g)} g por burger e ${kg.format(u)} burgers por mês.`;
        cta.href = `contato.html?volume=${encodeURIComponent(faixa(u))}&mensagem=${encodeURIComponent(msg)}#pedir-amostra`;
      }
      if (announce && sr) {
        clearTimeout(t);
        t = setTimeout(() => { sr.textContent = `Carne por burger: ${brl.format(perUnit)}. Por mês: ${kg.format(monthKg)} kg, ${brl.format(perUnit * u)}.`; }, 700);
      }
    };

    quick.forEach((b) => b.addEventListener('click', () => { grams.value = b.dataset.grams; update(true); }));
    calc.addEventListener('input', () => update(true));
    update(false);
  });

  /* ---------- Barra fixa de CTA no celular ---------- */
  const bar = document.querySelector('[data-mobile-cta]');
  if (bar && 'IntersectionObserver' in window) {
    const hero = document.querySelector('.hero, .page-hero, .lp-hero, .notfound');
    const cards = document.querySelectorAll('.form-card');
    let heroOn = !!hero;
    let formOn = false;
    const sync = () => {
      const active = document.activeElement;
      const inForm = !!(active && active.closest && active.closest('form'));
      const hide = heroOn || formOn || document.body.classList.contains('nav-open') || inForm;
      bar.classList.toggle('is-hidden', hide);
      bar.inert = hide;
    };
    if (hero) new IntersectionObserver(([e]) => { heroOn = e.isIntersecting; sync(); }).observe(hero);
    if (cards.length) {
      const seen = new Map();
      new IntersectionObserver((es) => {
        es.forEach((e) => seen.set(e.target, e.isIntersecting));
        formOn = [...seen.values()].some(Boolean);
        sync();
      }, { threshold: 0.15 }).observe(cards[0]);
    }
    document.addEventListener('focusin', sync);
    document.addEventListener('focusout', () => setTimeout(sync, 0));
    new MutationObserver(sync).observe(document.body, { attributes: true, attributeFilter: ['class'] });
    sync();
  }

  /* ---------- Blends: pílula do blend visível (scrollspy e rolagem coordenada) ---------- */
  const pills = [...document.querySelectorAll('.pills-bar a[href^="#"]')];
  const pillsList = document.querySelector('.pills-bar .pills');
  if (pills.length && pillsList) {
    let isManualScrolling = false;
    let manualTimer = null;

    const scrollPillInBar = (pill) => {
      const listRect = pillsList.getBoundingClientRect();
      const pillRect = pill.getBoundingClientRect();
      if (pillRect.left < listRect.left) {
        pillsList.scrollBy({ left: pillRect.left - listRect.left - 16, behavior: 'smooth' });
      } else if (pillRect.right > listRect.right) {
        pillsList.scrollBy({ left: pillRect.right - listRect.right + 16, behavior: 'smooth' });
      }
    };

    const scrollToTarget = (target) => {
      const headerH = 68;
      const pillsBar = document.querySelector('.pills-bar');
      const pillsH = pillsBar ? pillsBar.offsetHeight : 64;
      const clearance = headerH + pillsH + 16;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - clearance;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({
        top: Math.max(0, Math.round(targetTop)),
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    };

    pills.forEach((p) => {
      p.addEventListener('click', (e) => {
        const target = document.querySelector(p.hash);
        if (!target) return;
        e.preventDefault();
        isManualScrolling = true;
        pills.forEach((item) => {
          if (item === p) {
            item.setAttribute('aria-current', 'true');
            scrollPillInBar(item);
          } else {
            item.removeAttribute('aria-current');
          }
        });
        history.pushState(null, '', p.hash);
        scrollToTarget(target);
        clearTimeout(manualTimer);
        manualTimer = setTimeout(() => { isManualScrolling = false; }, 850);
      });
    });

    if ('IntersectionObserver' in window) {
      const spy = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting || isManualScrolling) return;
        pills.forEach((p) => {
          const on = p.hash === `#${e.target.id}`;
          if (on) {
            p.setAttribute('aria-current', 'true');
            scrollPillInBar(p);
          } else {
            p.removeAttribute('aria-current');
          }
        });
      }), { rootMargin: '-45% 0px -50% 0px' });
      pills.forEach((p) => { const target = document.querySelector(p.hash); if (target) spy.observe(target); });
    }
  }
})();
