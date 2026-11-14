import { renderProfile, renderSocials, renderLinks } from './render.js';

const $ = (id) => document.getElementById(id);

/* Theme */
const root = document.documentElement;
const themeBtn = $('theme-toggle');
function syncThemeBtn() {
  const dark = root.classList.contains('dark');
  themeBtn.setAttribute('aria-pressed', String(dark));
  themeBtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  themeBtn.innerHTML = `<i class="fa-solid ${dark ? 'fa-sun' : 'fa-moon'}" aria-hidden="true"></i>`;
}
themeBtn.addEventListener('click', () => {
  const dark = root.classList.toggle('dark');
  try { localStorage.theme = dark ? 'dark' : 'light'; } catch (e) {}
  syncThemeBtn();
});

/* Toast */
let toastTimer;
function toast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2000);
}

/* Dialogs */
let lastTrigger = null;
function openDialog(id, trigger) {
  lastTrigger = trigger;
  const d = $(id);
  d.hidden = false;
  d.querySelector('[data-close-btn]').focus();
}
function closeDialog(d) {
  d.hidden = true;
  if (lastTrigger) lastTrigger.focus();
}
document.querySelectorAll('[data-dialog]').forEach((d) => {
  d.addEventListener('click', (e) => {
    if (e.target === d || e.target.closest('[data-close-btn]')) closeDialog(d);
  });
});
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  document.querySelectorAll('[data-dialog]:not([hidden])').forEach(closeDialog);
});
$('avatar-btn').addEventListener('click', (e) => openDialog('photo-dialog', e.currentTarget));

/* Render */
renderProfile();
renderSocials(async (btn) => {
  try {
    await navigator.clipboard.writeText(btn.dataset.copy);
    toast('Email copied to clipboard');
  } catch (e) {
    toast(btn.dataset.copy);
  }
  const icon = btn.querySelector('i');
  const prev = icon.className;
  icon.className = 'fa-solid fa-check';
  setTimeout(() => (icon.className = prev), 2000);
});
renderLinks();
document.querySelectorAll('[data-action="qris"]').forEach((b) =>
  b.addEventListener('click', () => openDialog('qris-dialog', b))
);
syncThemeBtn();

/* Scroll progress */
const bar = $('progress');
addEventListener('scroll', () => {
  const h = root.scrollHeight - innerHeight;
  bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + '%';
}, { passive: true });

/* Reveal on scroll */
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en, i) => {
      if (!en.isIntersecting) return;
      en.target.style.transitionDelay = `${i * 50}ms`;
      en.target.classList.add('in');
      io.unobserve(en.target);
    });
  }, { threshold: 0.1 });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('in'));
}
