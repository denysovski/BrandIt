// BrandIt Studio: sign in (simulated), Library, Editor, Sets and Brands over the shared library.
// Everything is stored in this browser's localStorage, per account. Nothing is sent anywhere.
import { templates, categories, formats, palettes, fonts, render, getTemplate, css, toSVG, toPNG, brandDefaults } from '../lib/brandit.js';

const FONTS = '../fonts/';
document.getElementById('bi-css').textContent = css(FONTS);
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const uid = () => Math.random().toString(36).slice(2, 9);
const readFile = (file, as = 'dataURL') => new Promise((r, j) => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.onerror = j; as === 'buffer' ? fr.readAsArrayBuffer(file) : fr.readAsDataURL(file); });

/* ---------------- sounds: short synthesised clicks, off with the speaker toggle ---------------- */
let actx = null;
function click(kind = 'tap') {
  if (state?.muted) return;
  try {
    actx ||= new (window.AudioContext || window.webkitAudioContext)();
    const t = actx.currentTime, o = actx.createOscillator(), g = actx.createGain(), f = actx.createBiquadFilter();
    const p = { tap: [1800, 0.035, 0.12], nav: [1100, 0.06, 0.16], key: [2600, 0.025, 0.08], ok: [880, 0.12, 0.12] }[kind] || [1500, 0.04, 0.1];
    o.type = kind === 'ok' ? 'sine' : 'square'; o.frequency.setValueAtTime(p[0], t); o.frequency.exponentialRampToValueAtTime(p[0] * 0.5, t + p[1]);
    f.type = 'bandpass'; f.frequency.value = p[0]; f.Q.value = 1.4;
    g.gain.setValueAtTime(p[2], t); g.gain.exponentialRampToValueAtTime(0.0001, t + p[1]);
    o.connect(f).connect(g).connect(actx.destination); o.start(t); o.stop(t + p[1] + 0.02);
    if (kind === 'nav') { const n = actx.createBufferSource(), b = actx.createBuffer(1, 800, actx.sampleRate), d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length) ** 3; const ng = actx.createGain(); ng.gain.value = 0.08; n.buffer = b; n.connect(ng).connect(actx.destination); n.start(t); }
  } catch { /* audio blocked */ }
}

/* ---------------- accounts (simulated, localStorage) ---------------- */
const LS = { users: 'brandit.users', session: 'brandit.session' };
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const store = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } };
async function hash(s) { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('brandit:' + s)); return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join(''); }

const newBrand = (o = {}) => ({ id: uid(), ...brandDefaults, logo: '', useLogo: false, colors: { bg: '#0b0b0b', ink: '#ffffff', accent: '#e8401c', g1: '#e8401c', g2: '#0b0b0b' }, fonts: { d: '', t: '', m: '' }, ...o });
const freshState = (name) => ({ name, tpl: 'mo-crosshair', format: 'portrait', custom: { w: 1080, h: 1350 }, libFormat: 'portrait', libPal: 'own', cat: 'All', set: 'Launch week', setFormat: 'portrait', fields: {}, styles: {}, pal: {}, brands: [newBrand({ name: 'north.', short: 'NO' })], brand: null, userFonts: [], muted: false });
let user = null, state = null, image = null, picked = null;

function save() {
  if (!user) return;
  const users = load(LS.users, {});
  if (!users[user]) return;
  users[user].data = state;
  if (!store(LS.users, users)) status('Storage is full: remove a big logo or font so changes keep saving.');
}
const brand = () => state.brands.find((b) => b.id === state.brand) || state.brands[0];
const brandForRender = () => { const b = brand(); return { ...b, logo: b.useLogo ? b.logo : '' }; };

/* ---------------- custom fonts ---------------- */
function installFonts() {
  $('#bi-user-fonts').textContent = state.userFonts.map((f) => `@font-face{font-family:"${f.name}";src:url(${f.data})}`).join('');
}
const userFontCss = () => state.userFonts.map((f) => `@font-face{font-family:"${f.name}";src:url(${f.data})}`).join('');

/* ---------------- dropdown component ---------------- */
// <div class="dd" data-dd="key" data-label="Label"></div>  → dd('key', items, value, onChange)
function dd(key, items, value, onChange) {
  const host = $(`[data-dd="${key}"]`); if (!host) return;
  const label = host.dataset.label;
  const cur = items.find((i) => i.value === value) || items[0];
  host.innerHTML = `${label ? `<span class="dd-label">${esc(label)}</span>` : ''}<button type="button" class="dd-btn" aria-haspopup="listbox" aria-expanded="false">${cur?.swatch ? `<i class="dd-sw" style="background:${cur.swatch}"></i>` : ''}<span${cur?.font ? ` style="font-family:${cur.font}"` : ''}>${esc(cur?.label ?? '')}</span><svg viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></button>
    <ul class="dd-list" role="listbox" hidden>${items.map((i, k) => i.group ? `<li class="dd-group" role="presentation">${esc(i.group)}</li>` : `<li role="option" tabindex="-1" data-i="${k}" aria-selected="${i.value === value}">${i.swatch ? `<i class="dd-sw" style="background:${i.swatch}"></i>` : ''}<span${i.font ? ` style="font-family:${i.font}"` : ''}>${esc(i.label)}</span>${i.note ? `<em>${esc(i.note)}</em>` : ''}</li>`).join('')}</ul>`;
  const btn = $('.dd-btn', host), list = $('.dd-list', host);
  const open = (v) => { list.hidden = !v; btn.setAttribute('aria-expanded', String(v)); host.classList.toggle('open', v); if (v) { ($('[aria-selected="true"]', list) || $('[role=option]', list))?.focus(); click('key'); } };
  btn.onclick = () => open(list.hidden);
  list.onclick = (e) => { const li = e.target.closest('[role=option]'); if (!li) return; open(false); btn.focus(); click('tap'); onChange(items[+li.dataset.i].value); };
  list.onkeydown = (e) => {
    const opts = $$('[role=option]', list), i = opts.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); opts[Math.min(opts.length - 1, i + 1)]?.focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); opts[Math.max(0, i - 1)]?.focus(); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); document.activeElement.click(); }
    else if (e.key === 'Escape' || e.key === 'Tab') { open(false); btn.focus(); }
  };
}
document.addEventListener('click', (e) => { $$('.dd.open').forEach((d) => { if (!d.contains(e.target)) { $('.dd-list', d).hidden = true; d.classList.remove('open'); $('.dd-btn', d).setAttribute('aria-expanded', 'false'); } }); });

/* ---------------- shared helpers ---------------- */
const fmt = (k) => (k === 'custom' ? { label: `Custom ${state.custom.w} × ${state.custom.h}`, w: state.custom.w, h: state.custom.h } : formats[k]);
const formatItems = () => [...Object.entries(formats).map(([k, v]) => ({ value: k, label: v.label, note: `${v.w}×${v.h}` })), { value: 'custom', label: 'Custom size', note: `${state.custom.w}×${state.custom.h}` }];
const palList = () => [['own', 'Own look'], ['brand', 'Brand'], ...Object.entries(palettes).map(([k, v]) => [k, v.label])];
const palSwatch = (k) => { const p = k === 'brand' ? brand().colors : palettes[k]; return p ? `linear-gradient(135deg,${p.bg} 50%,${p.accent} 50%)` : 'conic-gradient(#e8401c,#1f3fe0,#c6f432,#e8401c)'; };
const styleOf = (id) => (state.styles[id] ||= {});
const ad = (id, { format, palette, image: im, fields, style } = {}) => {
  const f = fmt(format);
  return `<div class="ad" style="--ar:${f.w}/${f.h}">${render(id, { palette: palette ?? state.pal[id] ?? 'own', style: style ?? state.styles[id] ?? {}, fields: fields || state.fields[id] || {}, brand: brandForRender(), image: im })}</div>`;
};

/* ---------------- top bar: brand switcher and account ---------------- */
function drawTop() {
  dd('brand', [...state.brands.map((b) => ({ value: b.id, label: b.name, swatch: `linear-gradient(135deg,${b.colors.bg} 50%,${b.colors.accent} 50%)` })), { value: '+', label: '+ New brand' }], state.brand || state.brands[0].id, (v) => {
    if (v === '+') { const b = newBrand({ name: `Brand ${state.brands.length + 1}`, short: 'BR' }); state.brands.push(b); state.brand = b.id; save(); location.hash = 'brands'; drawTop(); show(); return; }
    state.brand = v; save(); click('ok'); drawTop(); show(true);
  });
  dd('user', [{ value: 'sound', label: state.muted ? 'Sound: off' : 'Sound: on' }, { value: 'out', label: 'Sign out' }], null, (v) => {
    if (v === 'sound') { state.muted = !state.muted; save(); drawTop(); click('tap'); }
    if (v === 'out') { localStorage.removeItem(LS.session); location.reload(); }
  });
  $('[data-dd="user"] .dd-btn span').textContent = state.name || user;
}

/* ---------------- screens ---------------- */
const screens = ['library', 'editor', 'sets', 'brands'];
let lastScreen = '';
function show(keepScroll) {
  const [name, arg] = (location.hash.slice(1) || 'library').split('/');
  const s = screens.includes(name) ? name : 'library';
  if (s === 'editor' && arg && templates.some((t) => t.id === arg)) { if (state.tpl !== arg) picked = null; state.tpl = arg; }
  screens.forEach((n) => { $('#' + n).hidden = n !== s; });
  $$('[data-screen]').forEach((a) => (a.dataset.screen === s ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current')));
  if (lastScreen && lastScreen !== s) click('nav');
  lastScreen = s;
  ({ library: drawLibrary, editor: drawEditor, sets: drawSets, brands: drawBrands })[s]();
  if (!keepScroll) scrollTo(0, 0);
}
addEventListener('hashchange', () => show());

/* ---------------- Library ---------------- */
function drawLibrary(animate) {
  $('[data-cats]').innerHTML = ['All', ...categories].map((c) => `<button type="button" class="chip" data-c="${c}" aria-pressed="${c === state.cat}">${c}<span>${c === 'All' ? templates.length : templates.filter((t) => t.cat === c).length}</span></button>`).join('');
  dd('lib-format', formatItems(), state.libFormat, (v) => { state.libFormat = v; save(); drawLibrary(true); });
  dd('lib-pal', [{ value: 'own', label: 'Each its own' }, ...palList().slice(1).map(([k, l]) => ({ value: k, label: l, swatch: palSwatch(k) }))], state.libPal, (v) => { state.libPal = v; save(); drawLibrary(true); });
  const grid = $('[data-lib-grid]');
  const paint = () => {
    grid.innerHTML = templates.filter((t) => state.cat === 'All' || t.cat === state.cat).map((t, i) => `<li style="--i:${i % 12}"><a class="card" href="#editor/${t.id}">${ad(t.id, { format: state.libFormat, palette: state.libPal === 'own' ? state.pal[t.id] ?? 'own' : state.libPal, image })}<span class="name">${esc(t.name)}<span>${t.cat}</span></span></a></li>`).join('');
  };
  if (!animate || matchMedia('(prefers-reduced-motion: reduce)').matches) return paint();
  grid.classList.add('is-swapping');
  setTimeout(() => { paint(); requestAnimationFrame(() => requestAnimationFrame(() => grid.classList.remove('is-swapping'))); }, 220);
}
$('[data-lib-image]').onchange = async (e) => { const f = e.target.files[0]; if (!f) return; image = await readFile(f); click('ok'); drawLibrary(true); };
$('[data-cats]').addEventListener('click', (e) => { const b = e.target.closest('.chip'); if (!b) return; state.cat = b.dataset.c; save(); click('tap'); drawLibrary(true); });

/* ---------------- Editor ---------------- */
const fontItems = (lbl) => [{ value: '', label: lbl }, { group: 'Built in' }, ...Object.entries(fonts).map(([k, v]) => ({ value: k, label: v.label, font: `'${v.family}'` })), ...(state.userFonts.length ? [{ group: 'Imported' }, ...state.userFonts.map((f) => ({ value: f.name, label: f.name, font: `'${f.name}'` }))] : [])];
function drawEditor() {
  const tpl = getTemplate(state.tpl), st = styleOf(tpl.id);
  $('[data-ed-name]').textContent = tpl.name;
  $('[data-ed-cat]').textContent = tpl.cat;
  dd('template', [...categories.flatMap((c) => [{ group: c }, ...templates.filter((t) => t.cat === c).map((t) => ({ value: t.id, label: t.name }))])], tpl.id, (v) => { location.hash = 'editor/' + v; });
  $('[data-ed-formats]').innerHTML = formatItems().map((f) => `<button type="button" class="chip" data-format="${f.value}" aria-pressed="${f.value === state.format}">${f.value === 'custom' ? 'Custom' : esc(f.label)}</button>`).join('')
    + (state.format === 'custom' ? `<span class="size"><input type="number" min="200" max="4000" value="${state.custom.w}" data-size="w" aria-label="Width in pixels"> × <input type="number" min="200" max="4000" value="${state.custom.h}" data-size="h" aria-label="Height in pixels"> px</span>` : '');
  // colours
  const cur = state.pal[tpl.id] ?? 'own';
  $('[data-ed-pals]').innerHTML = palList().map(([k, l]) => `<button type="button" class="sw" data-pal="${k}" aria-pressed="${k === cur}" title="${esc(l)}" aria-label="${esc(l)} colours" style="background:${palSwatch(k)}"></button>`).join('');
  const look = tpl.look || {};
  const base = cur === 'own' ? look : cur === 'brand' ? brand().colors : palettes[cur] || look;
  $('[data-ed-colours]').innerHTML = [['bg', 'Background'], ['ink', 'Text'], ['accent', 'Accent'], ['g1', 'Gradient 1'], ['g2', 'Gradient 2']].map(([k, l]) => `<label>${l}<input type="color" data-col="${k}" value="${toHex(st[k] || base[k] || look[k] || '#000000')}"></label>`).join('');
  // type
  for (const k of ['fd', 'ft', 'fm']) dd(k, fontItems('Template default'), st[k] || '', (v) => { if (v) st[k] = v; else delete st[k]; save(); drawEditor(); });
  // photo sliders
  $$('[data-st]').forEach((r) => { const k = r.dataset.st; r.value = st[k] ?? { ix: 50, iy: 50, iz: 1, ov: 0.6, ls: 1 }[k]; });
  // text fields
  const values = { ...tpl.fields, ...(state.fields[tpl.id] || {}) };
  $('[data-fields]').innerHTML = Object.entries(values).map(([k, v]) => {
    const long = String(tpl.fields[k]).includes('\n') || String(tpl.fields[k]).length > 40;
    return `<label>${esc(k)}${long ? `<textarea data-k="${k}" rows="${Math.min(8, String(v).split('\n').length + 1)}">${esc(v)}</textarea>` : `<input data-k="${k}" value="${esc(v)}">`}</label>`;
  }).join('');
  drawCanvas();
}
const toHex = (c) => (/^#[0-9a-f]{6}$/i.test(c) ? c : '#000000');
function drawCanvas() {
  const f = fmt(state.format), canvas = $('[data-canvas]');
  canvas.style.setProperty('--fw', `${Math.round(560 * Math.min(1.7, f.w / f.h))}px`);
  canvas.innerHTML = ad(state.tpl, { format: state.format, image });
  if (picked != null) $(`[data-canvas] [data-n="${picked}"]`)?.classList.add('is-picked');
  $('[data-picked]').textContent = picked != null ? `Text ${+picked + 1} selected` : 'No text selected';
  $('[data-v-formats]').innerHTML = formatItems().slice(0, 5).map((x) => `<button type="button" data-format="${x.value}">${ad(state.tpl, { format: x.value, image })}${esc(x.label)}</button>`).join('');
  $('[data-v-pals]').innerHTML = palList().slice(0, 9).map(([k, l]) => `<button type="button" data-pal="${k}">${ad(state.tpl, { format: 'square', palette: k, image, style: { ...styleOf(state.tpl), bg: '', ink: '', accent: '', g1: '', g2: '' } })}${esc(l)}</button>`).join('');
}
let redraw = 0; const soon = () => { cancelAnimationFrame(redraw); redraw = requestAnimationFrame(drawCanvas); };
$('#editor').addEventListener('click', (e) => {
  const f = e.target.closest('[data-format]'), p = e.target.closest('[data-pal]'), r = e.target.closest('[data-reset]'), m = e.target.closest('[data-move]');
  if (f) { state.format = f.dataset.format; save(); click('tap'); drawEditor(); }
  if (p) { state.pal[state.tpl] = p.dataset.pal; const st = styleOf(state.tpl); ['bg', 'ink', 'accent', 'g1', 'g2'].forEach((k) => delete st[k]); save(); click('tap'); drawEditor(); }
  if (r) {
    const st = styleOf(state.tpl), k = r.dataset.reset;
    if (k === 'colours') ['bg', 'ink', 'accent', 'g1', 'g2'].forEach((x) => delete st[x]);
    if (k === 'photo') ['ix', 'iy', 'iz', 'ov', 'ls'].forEach((x) => delete st[x]);
    if (k === 'text') delete state.fields[state.tpl];
    if (k === 'nudge') { delete st.nudge; picked = null; }
    save(); click('tap'); drawEditor();
  }
  if (m && picked != null) { const [dx, dy] = m.dataset.move.split(',').map(Number); nudgeBy(dx, dy); click('key'); }
});
function nudgeBy(dx, dy) { const st = styleOf(state.tpl); st.nudge ||= {}; const v = st.nudge[picked] || [0, 0]; st.nudge[picked] = [+(v[0] + dx).toFixed(2), +(v[1] + dy).toFixed(2)]; save(); soon(); }
$('#editor').addEventListener('input', (e) => {
  const t = e.target, st = styleOf(state.tpl);
  if (t.dataset.k) { (state.fields[state.tpl] ||= {})[t.dataset.k] = t.value; save(); soon(); }
  if (t.dataset.col) { st[t.dataset.col] = t.value; save(); soon(); }
  if (t.dataset.st) { st[t.dataset.st] = +t.value; save(); soon(); }
  if (t.dataset.size) { state.custom[t.dataset.size] = Math.max(200, Math.min(4000, +t.value || 1080)); save(); soon(); }
});
// pick and drag text, or drag the photo
$('[data-canvas]').addEventListener('pointerdown', (e) => {
  const adEl = e.target.closest('.bi-ad'); if (!adEl) return;
  const rect = adEl.getBoundingClientRect(), u = Math.min(rect.width, rect.height) / 100;
  const textEl = e.target.closest('[data-n]'), st = styleOf(state.tpl);
  const sx = e.clientX, sy = e.clientY;
  e.preventDefault();
  if (textEl) {
    picked = textEl.dataset.n; $$('[data-canvas] .is-picked').forEach((x) => x.classList.remove('is-picked')); textEl.classList.add('is-picked'); $('[data-picked]').textContent = `Text ${+picked + 1} selected`; click('key');
    const v0 = (st.nudge || {})[picked] || [0, 0];
    const move = (ev) => { st.nudge ||= {}; st.nudge[picked] = [+(v0[0] + (ev.clientX - sx) / u).toFixed(2), +(v0[1] + (ev.clientY - sy) / u).toFixed(2)]; textEl.style.setProperty('--nx', st.nudge[picked][0]); textEl.style.setProperty('--ny', st.nudge[picked][1]); };
    const up = () => { removeEventListener('pointermove', move); save(); drawCanvas(); };
    addEventListener('pointermove', move); addEventListener('pointerup', up, { once: true });
  } else {
    const x0 = st.ix ?? 50, y0 = st.iy ?? 50, z = st.iz ?? 1;
    const move = (ev) => { st.ix = Math.max(0, Math.min(100, x0 - ((ev.clientX - sx) / rect.width) * 100 / z)); st.iy = Math.max(0, Math.min(100, y0 - ((ev.clientY - sy) / rect.height) * 100 / z)); adEl.style.setProperty('--ix', st.ix + '%'); adEl.style.setProperty('--iy', st.iy + '%'); };
    const up = () => { removeEventListener('pointermove', move); save(); drawEditor(); };
    addEventListener('pointermove', move); addEventListener('pointerup', up, { once: true });
  }
});
addEventListener('keydown', (e) => {
  if (picked == null || $('#editor').hidden || /INPUT|TEXTAREA/.test(document.activeElement?.tagName)) return;
  const k = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }[e.key]; if (!k) return;
  e.preventDefault(); const s = e.shiftKey ? 5 : 1; nudgeBy(k[0] * s, k[1] * s);
});
$('[data-ed-image]').onchange = async (e) => { const f = e.target.files[0]; if (!f) return; image = await readFile(f); click('ok'); drawEditor(); status('Photo added. Drag it in the preview to move it.'); };
$('[data-ed-logo]').onchange = async (e) => { const f = e.target.files[0]; if (!f) return; const b = brand(); b.logo = await readFile(f); b.useLogo = true; save(); click('ok'); drawEditor(); status(`Logo saved to ${b.name}.`); };
$('[data-font-file]').onchange = async (e) => {
  const f = e.target.files[0]; if (!f) return;
  const name = f.name.replace(/\.[^.]+$/, '').replace(/[^\w -]/g, '').slice(0, 30) || 'My font';
  try {
    const face = new FontFace(name, await readFile(f, 'buffer')); await face.load(); document.fonts.add(face);
    state.userFonts = state.userFonts.filter((x) => x.name !== name).concat({ name, data: await readFile(f) });
    styleOf(state.tpl).fd = name; installFonts(); save(); click('ok'); drawEditor();
    $('[data-font-note]').textContent = `${name} imported and set as the headline font. It is listed under Imported in every font menu.`;
  } catch { $('[data-font-note]').textContent = 'This file could not be read as a font. Try a TTF, OTF or WOFF file.'; }
};

/* ---------------- Export ---------------- */
function status(t) { const el = $('[data-status]'); if (el) el.textContent = t; }
const download = (blob, name) => { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); };
async function exportOne(id, format, kind = 'png', scale = 1) {
  const f = fmt(format);
  const markup = render(id, { palette: state.pal[id] ?? 'own', style: state.styles[id] || {}, fields: state.fields[id] || {}, brand: brandForRender(), image });
  const svg = await toSVG(markup, { w: f.w, h: f.h, fontBase: new URL(FONTS, location.href).href, extraCss: userFontCss() });
  const name = `${id}-${f.w}x${f.h}`;
  if (kind === 'svg') return download(new Blob([svg], { type: 'image/svg+xml' }), name + '.svg');
  download(await toPNG(svg, { w: f.w, h: f.h, scale }), name + (scale > 1 ? '@2x' : '') + '.png');
}
$('.actions').addEventListener('click', async (e) => {
  const b = e.target.closest('[data-export]'); if (!b) return;
  const kind = b.dataset.export; click('tap');
  if (kind === 'json') {
    const json = JSON.stringify({ template: state.tpl, format: state.format, palette: state.pal[state.tpl] ?? 'own', style: state.styles[state.tpl] || {}, fields: state.fields[state.tpl] || {}, brand: { ...brand(), logo: brand().logo ? '(image)' : '' } }, null, 2);
    try { await navigator.clipboard.writeText(json); status('Settings copied.'); } catch { status('Copy is blocked here.'); }
    return;
  }
  status('Exporting…');
  try { await exportOne(state.tpl, state.format, kind === 'svg' ? 'svg' : 'png', kind === 'png2' ? 2 : 1); const f = fmt(state.format); status(`Saved ${f.w * (kind === 'png2' ? 2 : 1)} × ${f.h * (kind === 'png2' ? 2 : 1)} px.`); click('ok'); }
  catch (err) { status('Export failed: ' + err.message); }
});

/* ---------------- Sets ---------------- */
const SETS = {
  'Launch week': ['mo-crosshair', 'x-blue-statement', 'mo-giant-word', 'x-swiss'],
  'Gradient story': ['mo-aura', 'mo-orb', 'mo-glow-step', 'mo-ribbon'],
  'Run club': ['mo-route', 'mo-vertical', 'y-speed', 'mo-echo'],
  'App release': ['x-app-promo', 'x-claim', 'x-profile-card', 'x-wordmark-phone'],
  'Shop drop': ['x-shop-drop', 'x-red-wall', 'x-sale-band', 'y-notch'],
  'Growth report': ['x-big-stat', 'x-kpi', 'x-growth', 'x-price'],
  'Strategy deck': ['z-orange-statement', 'z-peach-stat', 'z-bars', 'z-split-underline'],
  'Editorial grey': ['z-year', 'z-vertical-address', 'z-oval', 'z-date-card'],
  'Team and events': ['y-team-intro', 'y-dot-grid', 'y-numbered-quote', 'x-badge'],
};
function drawSets() {
  $('[data-sets]').innerHTML = Object.keys(SETS).map((s) => `<button type="button" class="chip" data-set="${s}" aria-pressed="${s === state.set}">${s}</button>`).join('');
  dd('set-format', formatItems(), state.setFormat, (v) => { state.setFormat = v; save(); drawSets(); });
  $('[data-set-grid]').innerHTML = (SETS[state.set] || []).map((id, i) => { const t = getTemplate(id); return `<li style="--i:${i}"><a class="card" href="#editor/${id}">${ad(id, { format: state.setFormat, image })}<span class="name">${esc(t.name)}<span>edit</span></span></a></li>`; }).join('');
}
$('[data-sets]').addEventListener('click', (e) => { const b = e.target.closest('.chip'); if (!b) return; state.set = b.dataset.set; save(); click('tap'); drawSets(); });
$('[data-set-export]').onclick = async () => { for (const id of SETS[state.set]) { await exportOne(id, state.setFormat); await new Promise((r) => setTimeout(r, 350)); } };

/* ---------------- Brands ---------------- */
function drawBrands() {
  const b = brand();
  $('[data-brand-list]').innerHTML = state.brands.map((x) => `<li><button type="button" class="brand-card" data-bid="${x.id}" aria-pressed="${x.id === b.id}"><i style="background:linear-gradient(135deg,${x.colors.bg} 50%,${x.colors.accent} 50%)">${x.useLogo && x.logo ? `<img src="${esc(x.logo)}" alt="">` : esc(x.short)}</i><span>${esc(x.name)}</span></button></li>`).join('') + '<li><button type="button" class="brand-card add" data-bid="+"><i>+</i><span>New brand</span></button></li>';
  const form = $('[data-kit]');
  for (const k of ['name', 'short', 'handle', 'url', 'place']) form.elements[k].value = b[k] || '';
  for (const k of ['bg', 'ink', 'accent', 'g1', 'g2']) form.elements['c-' + k].value = toHex(b.colors[k]);
  $('[data-logo-prev]').innerHTML = b.logo ? `<img src="${esc(b.logo)}" alt="Logo">` : `<b>${esc(b.short)}</b>`;
  $('[data-use-logo]') && ($('[data-use-logo]').checked = !!b.useLogo);
  for (const [k, kk] of [['bfd', 'd'], ['bft', 't']]) dd(k, fontItems('Each template’s own'), b.fonts[kk] || '', (v) => { b.fonts[kk] = v; save(); drawBrands(); });
  drawKitPreview();
}
function contrast(a, c) {
  const lum = (h) => { const x = h.match(/\w\w/g).map((v) => parseInt(v, 16) / 255).map((v) => (v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4)); return .2126 * x[0] + .7152 * x[1] + .0722 * x[2]; };
  const [x, y] = [lum(a.slice(1)), lum(c.slice(1))].sort((p, q) => q - p); return (x + .05) / (y + .05);
}
function drawKitPreview() {
  const b = brand();
  $('[data-kit-preview]').innerHTML = ['x-lime-statement', 'mo-aura', 'x-blue-statement', 'y-letter-window'].map((id) => ad(id, { format: 'square', palette: 'brand', image })).join('');
  const r = contrast(toHex(b.colors.bg), toHex(b.colors.ink));
  $('[data-contrast]').textContent = `${r.toFixed(1)} : 1 text on background, ${r >= 4.5 ? 'passes AA' : 'too low for small text'}`;
}
$('[data-brand-list]').addEventListener('click', (e) => {
  const c = e.target.closest('[data-bid]'); if (!c) return;
  if (c.dataset.bid === '+') { const nb = newBrand({ name: `Brand ${state.brands.length + 1}`, short: 'BR' }); state.brands.push(nb); state.brand = nb.id; }
  else state.brand = c.dataset.bid;
  save(); click('ok'); drawTop(); drawBrands();
});
$('[data-kit]').addEventListener('input', (e) => {
  const { name, value, type, checked } = e.target, b = brand();
  if (!name) return;
  if (name.startsWith('c-')) b.colors[name.slice(2)] = value;
  else if (name === 'useLogo') b.useLogo = checked;
  else b[name] = value;
  save(); drawKitPreview(); if (name === 'name') drawTop();
  if (name === 'useLogo' || name === 'short') drawBrands();
});
$('[data-kit-logo]').onchange = async (e) => { const f = e.target.files[0]; if (!f) return; const b = brand(); b.logo = await readFile(f); b.useLogo = true; save(); click('ok'); drawTop(); drawBrands(); };
$('[data-logo-remove]').onclick = () => { const b = brand(); b.logo = ''; b.useLogo = false; save(); drawBrands(); };
$('[data-brand-delete]').onclick = () => {
  if (state.brands.length < 2) return;
  if (!confirmDelete()) return;
  state.brands = state.brands.filter((x) => x.id !== brand().id); state.brand = state.brands[0].id; save(); drawTop(); drawBrands();
};
function confirmDelete() { const btn = $('[data-brand-delete]'); if (btn.dataset.armed) { delete btn.dataset.armed; btn.textContent = 'Delete this brand'; return true; } btn.dataset.armed = '1'; btn.textContent = 'Click again to delete'; setTimeout(() => { delete btn.dataset.armed; btn.textContent = 'Delete this brand'; }, 3000); return false; }

/* ---------------- sign in ---------------- */
let mode = 'in';
function authMode(m) {
  mode = m;
  $('[data-auth-title]').textContent = m === 'in' ? 'Sign in' : 'Create an account';
  $('[data-auth-submit]').textContent = m === 'in' ? 'Sign in' : 'Create account';
  $('[data-auth-switch]').textContent = m === 'in' ? 'No account yet? Create one' : 'Have an account? Sign in';
  $('[data-name-row]').hidden = m === 'in';
  $('[data-auth-err]').textContent = '';
}
$('[data-auth-switch]').onclick = () => { authMode(mode === 'in' ? 'up' : 'in'); click('tap'); };
$('[data-auth-form]').onsubmit = async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target), email = String(fd.get('email')).trim().toLowerCase(), pass = String(fd.get('password')), name = String(fd.get('name') || '').trim();
  const err = (t) => { $('[data-auth-err]').textContent = t; };
  if (!/^\S+@\S+\.\S+$/.test(email)) return err('Enter an email address like name@studio.cz.');
  if (pass.length < 4) return err('Use at least 4 characters for the password.');
  const users = load(LS.users, {}), h = await hash(pass);
  if (mode === 'up') {
    if (users[email]) return err('This email already has an account here. Sign in instead.');
    users[email] = { name: name || email.split('@')[0], pass: h, data: freshState(name || email.split('@')[0]) };
    if (!store(LS.users, users)) return err('This browser blocks storage, so the account cannot be saved.');
  } else if (!users[email] || users[email].pass !== h) return err('Email or password does not match an account in this browser.');
  store(LS.session, email); click('ok'); start(email);
};
function start(email) {
  const users = load(LS.users, {});
  if (!users[email]) { $('#auth').hidden = false; authMode('in'); return; }
  user = email;
  state = { ...freshState(users[email].name), ...users[email].data };
  state.brands = (state.brands?.length ? state.brands : [newBrand()]).map((b) => ({ ...newBrand(), ...b, colors: { ...newBrand().colors, ...(b.colors || {}) }, fonts: { ...newBrand().fonts, ...(b.fonts || {}) } }));
  state.brand ||= state.brands[0].id;
  installFonts();
  state.userFonts.forEach((f) => { fetch(f.data).then((r) => r.arrayBuffer()).then((buf) => document.fonts.add(new FontFace(f.name, buf))).catch(() => {}); });
  $('#auth').hidden = true; $('#app').hidden = false; $('[data-dock]').hidden = false;
  drawTop(); show();
}
const session = load(LS.session, null);
if (session) start(session); else { $('#auth').hidden = false; authMode('in'); }
