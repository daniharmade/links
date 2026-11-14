import { profile, socials, links } from '../data/links.js';

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const isExternal = (l) => l.external !== false && /^https?:/.test(l.url || '');

function card(l) {
  const inner = `
    <span class="flex items-center gap-4 min-w-0">
      <span class="icon-tile flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700"><i class="${esc(l.icon)}" aria-hidden="true"></i></span>
      <span class="min-w-0">
        <span class="block text-sm font-semibold text-slate-900 link-title">${esc(l.title)}</span>
        <span class="block text-xs text-slate-500 link-desc truncate">${esc(l.description)}</span>
      </span>
    </span>
    <i class="link-arrow fa-solid fa-arrow-up-right-from-square text-xs text-slate-400" aria-hidden="true"></i>`;
  const cls = 'link-card reveal flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50';
  if (l.action) return `<button type="button" data-action="${esc(l.action)}" class="${cls} w-full text-left">${inner}</button>`;
  const ext = isExternal(l) || l.url.endsWith('.pdf') ? ' target="_blank" rel="noopener noreferrer"' : '';
  return `<a href="${esc(l.url)}"${ext} class="${cls}">${inner}</a>`;
}

export function renderProfile() {
  document.getElementById('profile-name').textContent = profile.name;
  document.getElementById('profile-role').textContent = profile.role;
  document.getElementById('profile-tagline').textContent = profile.tagline;
  document.getElementById('open-to-work').hidden = !profile.openToWork;
  document.getElementById('stack').innerHTML = profile.stack
    .map((s) => `<span class="chip rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">${esc(s)}</span>`)
    .join('');
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('updated').textContent = profile.lastUpdated;
  document.getElementById('portfolio-cta').href = profile.portfolioUrl;
}

export function renderSocials(onCopy) {
  const el = document.getElementById('socials');
  el.innerHTML = socials
    .map((s) => {
      const cls = 'social-btn flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition duration-200';
      const icon = `<i class="${esc(s.icon)}" aria-hidden="true"></i>`;
      return s.copy
        ? `<button type="button" data-copy="${esc(s.copy)}" aria-label="${esc(s.label)}" class="${cls}">${icon}</button>`
        : `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.label)}" class="${cls}">${icon}</a>`;
    })
    .join('');
  el.querySelectorAll('[data-copy]').forEach((b) => b.addEventListener('click', () => onCopy(b)));
}

export function renderLinks() {
  const el = document.getElementById('links');
  const groups = [...new Set(links.map((l) => l.group || ''))];
  el.innerHTML = groups
    .map((g, i) => {
      const items = links.filter((l) => (l.group || '') === g).map(card).join('');
      const label = g ? `<h2 class="mb-3 ${i ? 'mt-8' : ''} text-xs font-bold uppercase tracking-wider text-slate-500">${esc(g)}</h2>` : '';
      return `<section>${label}<div class="flex flex-col gap-3">${items}</div></section>`;
    })
    .join('');
}
