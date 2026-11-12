/* Red Clay Land Service — Main JS */

// ── Dark / Light Mode Toggle ──────────────────────────────
(function () {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;

  // Detect system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let currentTheme = prefersDark ? 'dark' : 'light';
  root.setAttribute('data-theme', currentTheme);

  function updateToggleIcon(theme) {
    if (!toggle) return;
    toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
    toggle.innerHTML = theme === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  updateToggleIcon(currentTheme);

  if (toggle) {
    toggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', currentTheme);
      updateToggleIcon(currentTheme);
    });
  }
})();


// ── Mobile Menu ───────────────────────────────────────────
(function () {
  const btn = document.querySelector('.mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
    menu.setAttribute('aria-hidden', !isOpen);
  });

  // Close on nav link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
      menu.setAttribute('aria-hidden', true);
    });
  });
})();


// ── Sticky Header Shadow on Scroll ───────────────────────
(function () {
  const header = document.getElementById('header');
  if (!header) return;
  const onScroll = () => {
    header.style.boxShadow = window.scrollY > 10
      ? 'var(--shadow-md)'
      : 'var(--shadow-sm)';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
})();


// ── Contact Form — mailto fallback ────────────────────────
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = form.name?.value.trim() || '';
    const phone   = form.phone?.value.trim() || '';
    const email   = form.email?.value.trim() || '';
    const service = form.service?.value || '';
    const message = form.message?.value.trim() || '';

    const subject = encodeURIComponent('Website Quote Request — ' + (service || 'Land Clearing'));
    const body = encodeURIComponent(
      'Name: ' + name + '\n' +
      'Phone: ' + phone + '\n' +
      'Email: ' + email + '\n' +
      'Service: ' + service + '\n\n' +
      'Project Details:\n' + message
    );

    window.location.href = 'mailto:lr@redclaylandservice.com?subject=' + subject + '&body=' + body;
  });
})();


// ── Smooth scroll for anchor links ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ── Desktop Nav Dropdowns (Services / Areas We Serve) ─────
(function () {
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  if (!dropdowns.length) return;

  function closeAll() {
    dropdowns.forEach(dd => {
      dd.classList.remove('open');
      const trigger = dd.querySelector('.dropdown-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  }

  dropdowns.forEach(dd => {
    const trigger = dd.querySelector('.dropdown-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = dd.classList.contains('open');
      closeAll();
      if (!isOpen) {
        dd.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', (e) => {
    dropdowns.forEach(dd => {
      if (!dd.contains(e.target)) {
        dd.classList.remove('open');
        const trigger = dd.querySelector('.dropdown-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
})();


// ── Mobile Accordion Dropdowns ────────────────────────────
(function () {
  const triggers = document.querySelectorAll('.mobile-dropdown-trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const panel = trigger.nextElementSibling;
      if (!panel) return;
      const isOpen = panel.classList.toggle('open');
      trigger.setAttribute('aria-expanded', isOpen);
    });
  });
})();


// ── FAQ Accordion ──────────────────────────────────────────
(function () {
  const questions = document.querySelectorAll('.faq-question');
  questions.forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      const isOpen = answer.classList.contains('open');
      document.querySelectorAll('.faq-answer.open').forEach(a => a.classList.remove('open'));
      document.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(qq => qq.setAttribute('aria-expanded', 'false'));
      if (!isOpen) {
        answer.classList.add('open');
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();


// ── "Areas We Serve" Lead Form Overlay ────────────────────
(function () {
  const AREAS = [
    ['New Market', 'new-market.html'], ['Gurley', 'gurley.html'],
    ['Owens Cross Roads', 'owens-cross-roads.html'], ['Hazel Green', 'hazel-green.html'],
    ['Meridianville', 'meridianville.html'], ['Madison', 'madison.html']
  ];
  const triggers = [...document.querySelectorAll('.dropdown-trigger, .mobile-dropdown-trigger')]
    .filter(t => /areas we serve/i.test(t.textContent));
  if (!triggers.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lead-overlay';
  overlay.setAttribute('hidden', '');
  overlay.innerHTML = `
    <div class="lead-modal" role="dialog" aria-modal="true" aria-labelledby="lead-title">
      <button type="button" class="lead-close" aria-label="Close">&times;</button>
      <div class="lead-body">
        <p class="lead-eyebrow">Serving North Alabama</p>
        <h2 id="lead-title">Get a Free Quote in Your Area</h2>
        <p class="lead-sub">Tell us where your property is and we'll get back to you, usually within a few hours on business days.</p>
        <form class="lead-form" novalidate>
          <div class="form-row">
            <div class="form-group"><label for="lead-name">Your Name</label>
              <input id="lead-name" name="name" type="text" autocomplete="name" required placeholder="John Smith"></div>
            <div class="form-group"><label for="lead-phone">Phone Number</label>
              <input id="lead-phone" name="phone" type="tel" autocomplete="tel" required placeholder="(256) 555-0100"></div>
          </div>
          <div class="form-group"><label for="lead-email">Email (optional)</label>
            <input id="lead-email" name="email" type="email" autocomplete="email" placeholder="you@example.com"></div>
          <div class="form-row">
            <div class="form-group"><label for="lead-area">Area</label>
              <select id="lead-area" name="area" required><option value="">Select your area…</option>
                ${AREAS.map(a => `<option>${a[0]}</option>`).join('')}<option>Other / Nearby</option></select></div>
            <div class="form-group"><label for="lead-service">Service Needed</label>
              <select id="lead-service" name="service"><option value="">Select a service…</option>
                <option>Forestry Mulching</option><option>Brush Clearing</option><option>Fire Mitigation</option>
                <option>Right-of-Way Clearing</option><option>Multiple / Not Sure</option></select></div>
          </div>
          <div class="form-group"><label for="lead-msg">Project Details (optional)</label>
            <textarea id="lead-msg" name="message" rows="3" placeholder="Acreage, current condition, timeline…"></textarea></div>
          <p class="lead-error" role="alert" hidden></p>
          <button type="submit" class="btn btn-primary btn-lg btn-full">Request My Free Quote</button>
        </form>
        <div class="lead-success" hidden>
          <h3>Thanks, we got your request.</h3>
          <p>We'll reach out shortly. Need us sooner? Call <a href="tel:2565139076">(256) 513-9076</a>.</p>
        </div>
        <div class="lead-areas"><span>View our service areas:</span>
          ${AREAS.map(a => `<a href="${a[1]}">${a[0]}</a>`).join('')}</div>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const form = overlay.querySelector('.lead-form');
  const err = overlay.querySelector('.lead-error');
  const success = overlay.querySelector('.lead-success');
  let lastFocus = null;

  function open(e) {
    e.preventDefault(); e.stopImmediatePropagation();
    lastFocus = document.activeElement;
    const mm = document.getElementById('mobile-menu'), mt = document.querySelector('.mobile-menu-toggle');
    if (mm && mm.classList.contains('open')) { mm.classList.remove('open'); mm.setAttribute('aria-hidden', true); if (mt) mt.setAttribute('aria-expanded', false); }
    overlay.removeAttribute('hidden');
    requestAnimationFrame(() => overlay.classList.add('visible'));
    document.body.style.overflow = 'hidden';
    setTimeout(() => overlay.querySelector('#lead-name').focus(), 50);
  }
  function close() {
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
    setTimeout(() => overlay.setAttribute('hidden', ''), 200);
    if (lastFocus) lastFocus.focus();
  }

  triggers.forEach(t => {
    t.setAttribute('aria-haspopup', 'dialog');
    t.addEventListener('click', open, true);
  });
  overlay.querySelector('.lead-close').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !overlay.hidden) close(); });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    if (!d.name.trim() || !d.phone.trim() || !d.area) {
      err.textContent = 'Please enter your name, phone number and area.'; err.hidden = false; return;
    }
    err.hidden = true;
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = 'Sending…';
    const payload = {
      access_key: '40842000-609b-4826-a85e-497e4d490896',
      subject: 'Areas We Serve Lead — ' + d.name + ' — ' + d.area,
      from_name: 'Red Clay Land Service Website',
      replyto: d.email || 'noreply@redclaylandservice.com',
      'Client Name': d.name, 'Phone': d.phone, 'Email': d.email || 'Not provided',
      'Area': d.area, 'Service': d.service || 'Not specified',
      'Project Details': d.message || 'None',
      'Source': 'Areas We Serve popup — ' + location.pathname
    };
    try {
      const r = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });
      const res = await r.json();
      if (!res.success) throw new Error();
      form.hidden = true; success.hidden = false;
    } catch (_) {
      const body = Object.entries(payload).filter(([k]) => !['access_key','from_name','replyto','subject'].includes(k))
        .map(([k, v]) => k + ': ' + v).join('\n');
      location.href = 'mailto:lr@redclaylandservice.com?subject=' + encodeURIComponent(payload.subject) + '&body=' + encodeURIComponent(body);
    } finally { btn.disabled = false; btn.textContent = 'Request My Free Quote'; }
  });
})();
