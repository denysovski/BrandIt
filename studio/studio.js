// BrandIt Studio: four screens (Library, Editor, Sets, Brand) over the shared library.
import { templates, formats, themes, render, getTemplate, css, toSVG, toPNG, brandDefaults } from '../lib/brandit.js';

const FONTS = '../fonts/';
document.getElementById('bi-css').textContent = css(FONTS);
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const SETS = {
  'Studio launch': ['wordmark-photo', 'stat-poster', 'statement', 'book-call'],
  'Hiring week': ['hiring', 'team-strip', 'quote', 'services'],
  'Court season': ['court-partner', 'court-contest', 'court-coach', 'court-match'],
  'Shop drop': ['launch', 'product', 'sale', 'tips'],
  'Year in review': ['year-mark', 'big-number', 'new-work', 'event'],
};

// state, kept in this browser only
const saved = (() => { try { return JSON.parse(localStorage.getItem('brandit') || '{}'); } catch { return {}; } })();
const state = { tpl: 'stat-poster', format: 'portrait', themeBy: {}, libFormat: 'portrait', libTheme: 'auto', family: 'All', set: 'Studio launch', setFormat: 'portrait', fields: {}, image: null, brand: { ...brandDefaults }, custom: { bg: '#f4f3f1', ink: '#0b0b0b', accent: '#e8401c', display: 'grotesk' }, ...saved, image: null };
const themeOf = (id) => state.themeBy?.[id] || autoTheme(getTemplate(id));
const save = () => { try { const { image, ...rest } = state; localStorage.setItem('brandit', JSON.stringify(rest)); } catch { /* storage blocked */ } };

const allThemes = () => ({ ...themes, custom: { label: 'Custom', bg: state.custom.bg, ink: state.custom.ink, muted: state.custom.ink, accent: state.custom.accent, accent2: state.custom.accent, onAccent: state.custom.bg, photo: 'grey', display: state.custom.display } });
const autoTheme = (tpl) => (tpl.family === 'Court' ? 'court' : tpl.photo?.[1] === 'red' ? 'signal' : tpl.id.match(/statement|services|quote|tips/) ? 'mono' : 'ink');
const ad = (id, { format, theme, fields, image } = {}) => {
  const f = formats[format];
  return `<div class="ad" style="--ar:${f.w}/${f.h}">${render(id, { theme: allThemes()[theme] || themes.mono, fields: fields || state.fields[id] || {}, brand: state.brand, image })}</div>`;
};
const opt = (o, v, label) => `<option value="${esc(o)}"${o === v ? ' selected' : ''}>${esc(label)}</option>`;

// screens and the dock
const screens = ['library', 'editor', 'sets', 'brand'];
function show() {
  const [name, arg] = (location.hash.slice(1) || 'library').split('/');
  const s = screens.includes(name) ? name : 'library';
  if (s === 'editor' && arg && templates.some((t) => t.id === arg)) state.tpl = arg;
  screens.forEach((n) => { $('#' + n).hidden = n !== s; });
  $$('[data-screen]').forEach((a) => { if (a.dataset.screen === s) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  ({ library: drawLibrary, editor: drawEditor, sets: drawSets, brand: drawBrand })[s]();
  scrollTo(0, 0);
}
addEventListener('hashchange', show);

// Library
const families = ['All', ...new Set(templates.map((t) => t.family))];
$('[data-families]').innerHTML = families.map((f) => `<button type="button" class="chip" data-f="${f}">${f}</button>`).join('');
$('[data-lib-format]').innerHTML = Object.entries(formats).map(([k, v]) => opt(k, state.libFormat, v.label)).join('');
$('[data-lib-theme]').innerHTML = opt('auto', state.libTheme, 'Each its own') + Object.entries(allThemes()).map(([k, v]) => opt(k, state.libTheme, v.label)).join('');
let swap = 0;
function drawLibrary(animate) {
  $$('[data-families] .chip').forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.f === state.family)));
  const grid = $('[data-lib-grid]');
  const paint = () => {
    grid.innerHTML = templates.filter((t) => state.family === 'All' || t.family === state.family).map((t, i) => `<li style="--i:${i % 12}"><a class="card" href="#editor/${t.id}">${ad(t.id, { format: state.libFormat, theme: state.libTheme === 'auto' ? autoTheme(t) : state.libTheme })}<span class="name">${esc(t.name)}<span>${t.family}</span></span></a></li>`).join('');
  };
  if (!animate || matchMedia('(prefers-reduced-motion: reduce)').matches) return paint();
  clearTimeout(swap); grid.classList.add('is-swapping');
  swap = setTimeout(() => { paint(); requestAnimationFrame(() => requestAnimationFrame(() => grid.classList.remove('is-swapping'))); }, 260);
}
$('[data-families]').addEventListener('click', (e) => { const b = e.target.closest('.chip'); if (!b) return; state.family = b.dataset.f; save(); drawLibrary(true); });
$('[data-lib-format]').onchange = (e) => { state.libFormat = e.target.value; save(); drawLibrary(true); };
$('[data-lib-theme]').onchange = (e) => { state.libTheme = e.target.value; save(); drawLibrary(true); };

// Editor
$('[data-ed-template]').innerHTML = templates.map((t) => opt(t.id, state.tpl, `${t.name} · ${t.family}`)).join('');
function drawEditor() {
  const tpl = getTemplate(state.tpl);
  $('[data-ed-template]').value = tpl.id;
  $('[data-ed-name]').textContent = tpl.name;
  $('[data-ed-formats]').innerHTML = Object.entries(formats).map(([k, v]) => `<button type="button" class="chip" data-format="${k}" aria-pressed="${k === state.format}">${v.label}</button>`).join('');
  $('[data-ed-themes]').innerHTML = Object.entries(allThemes()).map(([k, v]) => `<button type="button" class="sw" data-theme="${k}" aria-pressed="${k === themeOf(state.tpl)}" aria-label="${v.label} theme" title="${v.label}" style="background:${v.bg};--a:${v.accent}"></button>`).join('');
  const values = { ...tpl.fields, ...(state.fields[tpl.id] || {}) };
  $('[data-fields]').innerHTML = Object.entries(values).map(([k, v]) => {
    const long = String(tpl.fields[k]).includes('\n') || String(tpl.fields[k]).length > 46;
    return `<label>${esc(k)}${long ? `<textarea data-k="${k}" rows="${String(v).split('\n').length + 1}">${esc(v)}</textarea>` : `<input data-k="${k}" value="${esc(v)}">`}</label>`;
  }).join('');
  $('[data-ed-image]').closest('.file').hidden = !tpl.photo;
  drawCanvas();
}
function drawCanvas() {
  const f = formats[state.format];
  const canvas = $('[data-canvas]');
  canvas.style.setProperty('--fw', `${Math.round(560 * Math.min(1.6, f.w / f.h) )}px`);
  canvas.innerHTML = ad(state.tpl, { format: state.format, theme: themeOf(state.tpl), image: state.image });
  $('[data-v-formats]').innerHTML = Object.entries(formats).map(([k, v]) => `<button type="button" data-format="${k}">${ad(state.tpl, { format: k, theme: themeOf(state.tpl), image: state.image })}${v.label}</button>`).join('');
  $('[data-v-themes]').innerHTML = Object.entries(allThemes()).map(([k, v]) => `<button type="button" data-theme="${k}">${ad(state.tpl, { format: 'square', theme: k, image: state.image })}${v.label}</button>`).join('');
}
$('[data-ed-template]').onchange = (e) => { location.hash = 'editor/' + e.target.value; };
$('#editor').addEventListener('click', (e) => {
  const f = e.target.closest('[data-format]'), t = e.target.closest('[data-theme]');
  if (f) { state.format = f.dataset.format; save(); $$('[data-ed-formats] .chip').forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.format === state.format))); drawCanvas(); }
  if (t) { state.themeBy[state.tpl] = t.dataset.theme; save(); $$('[data-ed-themes] .sw').forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.theme === themeOf(state.tpl)))); drawCanvas(); }
});
$('[data-fields]').addEventListener('input', (e) => { const k = e.target.dataset.k; if (!k) return; (state.fields[state.tpl] ||= {})[k] = e.target.value; save(); drawCanvas(); });
$('[data-ed-reset]').onclick = () => { delete state.fields[state.tpl]; save(); drawEditor(); };
$('[data-ed-image]').onchange = (e) => { const file = e.target.files[0]; if (!file) return; const fr = new FileReader(); fr.onload = () => { state.image = fr.result; drawCanvas(); }; fr.readAsDataURL(file); };

// Export
const status = (t) => { $('[data-status]').textContent = t; };
const download = (blob, name) => { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); };
async function exportOne(id, format, theme, kind = 'png', scale = 1, image = state.image) {
  const f = formats[format];
  const markup = render(id, { theme: allThemes()[theme], fields: state.fields[id] || {}, brand: state.brand, image });
  const svg = await toSVG(markup, { w: f.w, h: f.h, fontBase: new URL(FONTS, location.href).href });
  const name = `${id}-${format}-${theme}`;
  if (kind === 'svg') return download(new Blob([svg], { type: 'image/svg+xml' }), name + '.svg');
  download(await toPNG(svg, { w: f.w, h: f.h, scale }), name + (scale > 1 ? '@2x' : '') + '.png');
}
$('.actions').addEventListener('click', async (e) => {
  const b = e.target.closest('[data-export]'); if (!b) return;
  const kind = b.dataset.export;
  if (kind === 'json') {
    const json = JSON.stringify({ template: state.tpl, format: state.format, theme: themeOf(state.tpl), fields: state.fields[state.tpl] || {}, brand: state.brand }, null, 2);
    try { await navigator.clipboard.writeText(json); status('Settings copied. Paste them into the Framer component or a teammate\'s studio.'); } catch { status('Copy is blocked here; select the settings from the console.'); console.log(json); }
    return;
  }
  status('Exporting…');
  try { await exportOne(state.tpl, state.format, themeOf(state.tpl), kind === 'svg' ? 'svg' : 'png', kind === 'png2' ? 2 : 1); status(`Saved ${formats[state.format].w * (kind === 'png2' ? 2 : 1)} × ${formats[state.format].h * (kind === 'png2' ? 2 : 1)} px.`); }
  catch (err) { status('Export failed: ' + err.message); }
});

// Sets
$('[data-sets]').innerHTML = Object.keys(SETS).map((s) => `<button type="button" class="chip" data-set="${s}">${s}</button>`).join('');
$('[data-set-format]').innerHTML = Object.entries(formats).map(([k, v]) => opt(k, state.setFormat, v.label)).join('');
function drawSets() {
  $$('[data-sets] .chip').forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.set === state.set)));
  $('[data-set-grid]').innerHTML = SETS[state.set].map((id, i) => { const t = getTemplate(id); return `<li style="--i:${i}"><a class="card" href="#editor/${id}">${ad(id, { format: state.setFormat, theme: autoTheme(t) })}<span class="name">${esc(t.name)}<span>edit</span></span></a></li>`; }).join('');
}
$('[data-sets]').addEventListener('click', (e) => { const b = e.target.closest('.chip'); if (!b) return; state.set = b.dataset.set; save(); drawSets(); });
$('[data-set-format]').onchange = (e) => { state.setFormat = e.target.value; save(); drawSets(); };
$('[data-set-export]').onclick = async () => { for (const id of SETS[state.set]) { await exportOne(id, state.setFormat, autoTheme(getTemplate(id)), 'png', 1, null); await new Promise((r) => setTimeout(r, 350)); } };

// Brand kit
function drawBrand() {
  const form = $('[data-kit]');
  for (const [k, v] of Object.entries(state.brand)) if (form.elements[k]) form.elements[k].value = v;
  for (const [k, v] of Object.entries(state.custom)) if (form.elements[k]) form.elements[k].value = v;
  drawKitPreview();
}
function contrast(a, b) {
  const lum = (h) => { const c = h.match(/\w\w/g).map((x) => parseInt(x, 16) / 255).map((v) => (v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4)); return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]; };
  const [x, y] = [lum(a.slice(1)), lum(b.slice(1))].sort((p, q) => q - p); return (x + .05) / (y + .05);
}
function drawKitPreview() {
  $('[data-kit-preview]').innerHTML = ['statement', 'big-number', 'wordmark-photo', 'stat-poster'].map((id, i) => ad(id, { format: 'square', theme: i < 2 ? 'custom' : autoTheme(getTemplate(id)) })).join('');
  const r = contrast(state.custom.bg, state.custom.ink);
  $('[data-contrast]').textContent = `${r.toFixed(1)} : 1 text on background, ${r >= 4.5 ? 'passes AA' : 'too low for small text, choose darker text or a lighter background'}`;
  $('[data-brand-name]').textContent = state.brand.name;
}
$('[data-kit]').addEventListener('input', (e) => {
  const { name, value } = e.target;
  if (name in state.custom) state.custom[name] = value; else state.brand[name] = value;
  save(); drawKitPreview();
});

// clock
const clock = $('[data-clock]'); const tick = () => { clock.textContent = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); }; tick(); setInterval(tick, 20000);
$('[data-brand-name]').textContent = state.brand.name;
show();
