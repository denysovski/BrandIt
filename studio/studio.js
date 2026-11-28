// BrandIt Studio: sign in (simulated), Library, Editor, Sets and Brands over the shared library.
// Everything is stored in this browser's localStorage, per account. Nothing is sent anywhere.
import { templates, categories, formats, palettes, fonts, pagerKinds, gradients, hasPhoto, render, getTemplate, css, toSVG, toPNG, brandDefaults, DEFAULT_MARK, srcKey } from '../lib/brandit.js?v=36';

const FONTS = '../fonts/';
document.getElementById('bi-css').textContent = css(FONTS);
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const uid = () => Math.random().toString(36).slice(2, 9);
const readFile = (file, as = 'dataURL') => new Promise((r, j) => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.onerror = j; as === 'buffer' ? fr.readAsArrayBuffer(file) : fr.readAsDataURL(file); });

/* ---------------- sounds: short synthesised clicks, off with the speaker toggle ---------------- */
let actx = null;
function pop() {
  if (state?.muted) return;
  try {
    actx ||= new (window.AudioContext || window.webkitAudioContext)();
    const t = actx.currentTime;
    // two soft bubble pops, the second a little higher
    [[0, 520, 1250], [0.075, 760, 1700]].forEach(([d, f0, f1]) => { const o = actx.createOscillator(), g = actx.createGain(); o.type = 'sine'; o.frequency.setValueAtTime(f0, t + d); o.frequency.exponentialRampToValueAtTime(f1, t + d + 0.05); g.gain.setValueAtTime(0.0001, t + d); g.gain.exponentialRampToValueAtTime(0.18, t + d + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.11); o.connect(g).connect(actx.destination); o.start(t + d); o.stop(t + d + 0.13); });
  } catch { /* audio blocked */ }
}
function click(kind = 'tap') {
  if (kind !== 'nav' || state?.muted) return;
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

const newBrand = (o = {}) => ({ id: uid(), ...brandDefaults, logo: '', useLogo: true, colors: { bg: '#0b0b0b', ink: '#ffffff', accent: '#e8401c', g1: '#e8401c', g2: '#0b0b0b' }, fonts: { d: '', t: '', m: '' }, ...o });
const freshState = (name) => ({ name, tpl: 'mo-crosshair', format: 'portrait', custom: { w: 1080, h: 1350 }, libFormat: 'portrait', libPal: 'own', cat: 'All', set: 'Launch week', setFormat: 'portrait', fields: {}, styles: {}, pal: {}, brands: [newBrand({ name: 'north.', short: 'NO' })], brand: null, userFonts: [], muted: false, fx: true, snap: true, rulers: true, mirror: true, guides: { v: [], h: [] }, myPalettes: [], projects: [{ id: uid(), name: 'My first series', posts: [] }], project: null, editing: null });
let user = null, state = null, image = null, picked = null;
const slotImgs = {};
/* ---------------- showcase: random photos and colours on every refresh ---------------- */
// Photos from a folder the user picks, kept in IndexedDB in this browser only (never uploaded).
let pool = [], ownPool = false;
// Built-in showcase photos (shipped with the site) are used until the user loads their own folder.
let builtin = null;
async function builtinPool() { if (builtin) return builtin; try { const list = await (await fetch('photos/manifest.json')).json(); builtin = list.map((n) => new URL('photos/' + n, location.href).href); } catch { builtin = []; } return builtin; }
const shuf = { photo: {}, slots: {}, pal: {}, font: {} };
// fonts that hold up in every layout; a poster gets a headline font and a text font, never more than two
const HEAD_FONTS = ['tight', 'grotesk', 'space', 'manrope', 'sora', 'figtree', 'onest', 'bricolage', 'schibsted', 'familjen', 'redhat', 'lexend', 'garamond', 'fraunces', 'dmserif', 'young'];
const TEXT_FONTS = ['grotesk', 'tight', 'manrope', 'figtree', 'onest', 'schibsted', 'space', 'redhat', 'dmmono'];
const idb = () => new Promise((res, rej) => { const r = indexedDB.open('brandit-showcase', 1); r.onupgradeneeded = () => r.result.createObjectStore('photos'); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
async function poolLoad() { try { const db = await idb(); return await new Promise((res) => { const q = db.transaction('photos').objectStore('photos').get(user); q.onsuccess = () => res(q.result || []); q.onerror = () => res([]); }); } catch { return []; } }
async function poolSave(list) { const db = await idb(); return new Promise((res, rej) => { const t = db.transaction('photos', 'readwrite'); t.objectStore('photos').put(list, user); t.oncomplete = res; t.onerror = () => rej(t.error); }); }
const lum = (h) => { const m = String(h).match(/^#?([0-9a-f]{6})/i); if (!m) return .5; const n = parseInt(m[1], 16); return (.299 * (n >> 16) + .587 * ((n >> 8) & 255) + .114 * (n & 255)) / 255; };
const pick = (a) => a[Math.floor(Math.random() * a.length)];
function reshuffle() {
  shuf.photo = {}; shuf.slots = {}; shuf.pal = {}; shuf.font = {};
  if (state.shuffle === false) return;
  const bag = [...pool].sort(() => Math.random() - .5); let k = 0;
  const next = () => (bag.length ? bag[k++ % bag.length] : undefined);
  // palettes with light text stay readable over photos; all palettes are fine on flat backgrounds
  const lightInk = Object.keys(palettes).filter((p) => lum(palettes[p].ink) > .7);
  const any = Object.keys(palettes);
  for (const t of templates) {
    if (pool.length) { shuf.photo[t.id] = next(); if (t.slots) shuf.slots[t.id] = t.slots.map(() => next()); }
    const photo = !!(t.art || t.photo || t.slots);
    shuf.pal[t.id] = Math.random() < .4 ? 'own' : pick(photo ? lightInk : any);
  }
}
const photoFor = (id) => image || shuf.photo[id];
const slotsFor = (id) => slotImgs[id] || shuf.slots[id] || [];
const palFor = (id) => state.pal[id] ?? shuf.pal[id] ?? 'own';
// one calm look everywhere: Inter Tight on about seven in ten templates, never a serif, and never more than two families
const SERIFS = ['serif', 'dmserif', 'young', 'gloock', 'bodoni', 'garamond', 'caslon', 'fraunces'];
const KEEP_DISPLAY = ['condensed', 'pixel', 'dot', 'wide', 'michroma', 'unbounded', 'black'];
const hashId = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const baseFonts = (id) => {
  const lf = getTemplate(id)?.look?.fonts || {}, fix = (k) => (!k || SERIFS.includes(k) ? 'tight' : k);
  const d = fix(lf.d), t = fix(lf.t);
  const hv = hashId(id) % 10, own = KEEP_DISPLAY.includes(d) ? hv >= 5 : hv >= 7;
  return { fd: own ? d : 'tight', ft: 'tight', fm: 'tight' };
};
const styleFor = (id) => { const st = state.styles[id] || {}; return st.fd || st.ft || st.fm ? st : { ...baseFonts(id), ...st }; };

function save() {
  if (!user) return;
  const users = load(LS.users, {});
  if (!users[user]) return;
  users[user].data = state;
  const ok = store(LS.users, users); if (!ok) status('Storage is full: remove a big logo or font so changes keep saving.');
  histTrack();
  return ok;
}
const brand = () => state.brands.find((b) => b.id === state.brand) || state.brands[0];
const brandForRender = () => { const b = brand(); return { ...b, logo: b.useLogo ? b.logo || DEFAULT_MARK : '' }; };

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
  const open = (v) => { list.hidden = !v; btn.setAttribute('aria-expanded', String(v)); host.classList.toggle('open', v); if (v) { ($('[aria-selected="true"]', list) || $('[role=option]', list))?.focus({ preventScroll: true }); click('key'); } };
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
const palList = () => [['own', 'Own look'], ['brand', 'Brand'], ...(state.myPalettes || []).map((p) => ['my:' + p.id, p.label]), ...Object.entries(palettes).map(([k, v]) => [k, v.label])];
const palObj = (k) => (typeof k === 'string' && k.startsWith('my:') ? (state.myPalettes || []).find((p) => 'my:' + p.id === k) || 'own' : k);
const palSwatch = (k) => { const p = k === 'brand' ? brand().colors : typeof k === 'string' && k.startsWith('my:') ? palObj(k) : palettes[k]; return p ? `linear-gradient(135deg,${p.bg} 50%,${p.accent} 50%)` : 'conic-gradient(#e8401c,#1f3fe0,#c6f432,#e8401c)'; };
const styleOf = (id) => (state.styles[id] ||= {});
// small WebP copies of the built-in photos for previews; the editor and exports use the full photo
const thumbOf = (u) => (typeof u === 'string' && /\/photos\/photo-\d+\.jpg$/.test(u) ? u.replace(/\/photos\/(photo-\d+)\.jpg$/, '/photos/thumb/$1.webp') : u);
const ad = (id, { format, palette, image: im, fields, style, full } = {}) => {
  const f = fmt(format), t = full ? (u) => u : thumbOf;
  return `<div class="ad" style="--ar:${f.w}/${f.h}">${render(id, { palette: palObj(palette ?? palFor(id)), style: style ?? styleFor(id), fields: fields || state.fields[id] || {}, brand: brandForRender(), image: im ?? t(photoFor(id)), images: slotsFor(id).map(t) })}</div>`;
};

/* ---------------- top bar: brand switcher and account ---------------- */
function drawTop() {
  dd('brand', [...state.brands.map((b) => ({ value: b.id, label: b.name, swatch: `linear-gradient(135deg,${b.colors.bg} 50%,${b.colors.accent} 50%)` })), { value: '+', label: '+ New brand' }], state.brand || state.brands[0].id, (v) => {
    if (v === '+') { const b = newBrand({ name: `Brand ${state.brands.length + 1}`, short: 'BR' }); state.brands.push(b); state.brand = b.id; save(); location.hash = '/brands'; drawTop(); show(); return; }
    state.brand = v; save(); click('ok'); drawTop(); show(true);
  });
  dd('user', [{ value: 'profile', label: 'My profile' }, { value: 'projects', label: 'My projects' }, { value: 'settings', label: 'Settings' }, { value: 'backup', label: 'Download backup' }, { value: 'out', label: 'Sign out' }], null, (v) => {
    if (v === 'projects') location.hash = '/projects';
    if (v === 'profile') location.hash = '/profile';
    if (v === 'settings') openSettings();
    if (v === 'backup') backup();
    if (v === 'out') signOut();
  });
  $('[data-dd="user"] .dd-btn span').textContent = state.name || user;
}

/* ---------------- screens ---------------- */
const screens = ['library', 'editor', 'sets', 'projects', 'brands', 'guide', 'profile'];
let lastScreen = '';
function show(keepScroll) {
  const [name, arg] = (location.hash.replace(/^#\/?/, '') || 'library').split('/');
  const s = screens.includes(name) ? name : 'library';
  if (s === 'editor' && arg && templates.some((t) => t.id === arg)) { if (state.tpl !== arg) { picked = null; layerSel = null; } state.tpl = arg; }
  if (s === 'editor' && lastScreen !== 'editor') { zoom = 1; pan = null; }
  if (s === 'editor') histMark();
  screens.forEach((n) => { $('#' + n).hidden = n !== s; });
  $$('[data-screen]').forEach((a) => (a.dataset.screen === s ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current')));
  lastScreen = s;
  ({ library: drawLibrary, editor: drawEditor, sets: drawSets, projects: drawProjects, brands: drawBrands, guide: () => {}, profile: () => drawProfile(arg) })[s]();
  if (!keepScroll) scrollTo(0, 0);
}
addEventListener('hashchange', () => show());
document.addEventListener('click', (e) => { const a = e.target.closest('.dock a, .top .logo'); if (!a) return; click('nav'); if (a.getAttribute('href') === location.hash) { e.preventDefault(); show(); } });

/* ---------------- Library ---------------- */
function drawLibrary(animate, skeleton) {
  $('[data-cats]').innerHTML = ['All', ...categories].map((c) => `<button type="button" class="chip" data-c="${c}" aria-pressed="${c === state.cat}">${c}<span>${c === 'All' ? templates.length : templates.filter((t) => t.cat === c).length}</span></button>`).join('');
  dd('lib-format', formatItems(), state.libFormat, (v) => { state.libFormat = v; save(); drawLibrary(true); });
  dd('lib-pal', [{ value: 'own', label: 'Each its own' }, ...palList().slice(1).map(([k, l]) => ({ value: k, label: l, swatch: palSwatch(k) }))], state.libPal, (v) => { state.libPal = v; save(); drawLibrary(true); });
  $('[data-sc-note]').textContent ||= ownPool ? `${pool.length} of your photos · shuffled on every refresh` : '';
  $('[data-sc-clear]').hidden = !ownPool;
  const grid = $('[data-lib-grid]');
  const paint = () => {
    grid.innerHTML = templates.filter((t) => state.cat === 'All' || t.cat === state.cat).map((t, i) => `<li style="--i:${i % 12}"><a class="card" href="#/editor/${t.id}">${ad(t.id, { format: state.libFormat, palette: state.libPal === 'own' ? palFor(t.id) : state.libPal })}<span class="name">${esc(t.name)}<span>${t.cat}</span></span></a></li>`).join('') + `<li class="soon-li"><div class="soon" style="--ar:${fmt(state.libFormat).w}/${fmt(state.libFormat).h}"><b>More coming soon</b><span>New templates are in development</span></div></li>`;
  };
  if (!animate || matchMedia('(prefers-reduced-motion: reduce)').matches) return paint();
  if (skeleton) {
    const f = fmt(state.libFormat), n = templates.filter((t) => state.cat === 'All' || t.cat === state.cat).length;
    grid.innerHTML = Array.from({ length: n }, (_, i) => `<li class="sk" style="--i:${i % 12}"><div class="ad sk-ad" style="--ar:${f.w}/${f.h}"><i></i><i></i><i></i></div><span class="name"><i class="sk-l"></i></span></li>`).join('');
    setTimeout(() => { paint(); grid.classList.add('is-revealing'); setTimeout(() => grid.classList.remove('is-revealing'), 900); }, 750);
    return;
  }
  grid.classList.add('is-swapping');
  setTimeout(() => { paint(); requestAnimationFrame(() => requestAnimationFrame(() => grid.classList.remove('is-swapping'))); }, 220);
}
$('[data-sc-folder]').onchange = async (e) => {
  const files = [...e.target.files].filter((f) => /^image\//.test(f.type)).slice(0, 120); if (!files.length) return;
  const note = $('[data-sc-note]'); note.textContent = `Loading ${files.length} photos…`;
  const out = []; for (const f of files) out.push(await shrink(await readFile(f), 1200));
  pool = out; ownPool = true; try { await poolSave(out); note.textContent = `${out.length} photos saved in this browser. They shuffle on every refresh.`; } catch { note.textContent = `${out.length} photos loaded for this visit (the browser has no room to keep them).`; }
  image = null; reshuffle(); drawLibrary(true);
};
$('[data-sc-shuffle]').onclick = () => { reshuffle(); drawLibrary(true, true); };
$('[data-sc-clear]').onclick = async () => { if (!(await ask('Remove the showcase photos?', 'They are deleted from this browser. Your own uploads and projects stay.'))) return; ownPool = false; try { await poolSave([]); } catch {} pool = await builtinPool(); reshuffle(); drawLibrary(true); $('[data-sc-note]').textContent = 'Your photos were removed. The built-in showcase is back.'; };
$('[data-lib-image]').onchange = async (e) => { const f = e.target.files[0]; if (!f) return; image = await shrink(await readFile(f)); click('ok'); drawLibrary(true); };
$('[data-lib-grid]').addEventListener('click', (e) => {
  const a = e.target.closest('a.card'); if (!a) return;
  const id = a.getAttribute('href').split('/').pop();
  state.format = state.libFormat;
  if (state.libPal !== 'own') state.pal[id] = state.libPal; else if (state.pal[id] == null && shuf.pal[id]) state.pal[id] = shuf.pal[id];
  const st = state.styles[id] ||= {}; if (!st.fd && !st.ft && !st.fm) Object.assign(st, baseFonts(id)); st.sf = 2;
  save();
});
$('[data-cats]').addEventListener('click', (e) => { const b = e.target.closest('.chip'); if (!b) return; state.cat = b.dataset.c; save(); click('tap'); drawLibrary(true); });

/* ---------------- Editor ---------------- */
const FONT_KIND = { Serif: ['serif', 'dmserif', 'young', 'gloock', 'bodoni', 'garamond', 'caslon', 'fraunces'], Mono: ['mono', 'jet', 'spacemono', 'dmmono', 'rubikmono'], Display: ['wide', 'black', 'condensed', 'unbounded', 'michroma', 'syne', 'bebas', 'oswald', 'barlow', 'shoulders', 'chakra', 'orbitron', 'monoton', 'pixel', 'dot'] };
const fontKind = (k) => Object.keys(FONT_KIND).find((g) => FONT_KIND[g].includes(k)) || 'Sans';
const fontItems = (lbl) => [...(lbl ? [{ value: '', label: lbl }] : []), ...['Sans', 'Display', 'Serif', 'Mono'].flatMap((g) => [{ group: g }, ...Object.entries(fonts).filter(([k]) => fontKind(k) === g).map(([k, v]) => ({ value: k, label: v.label, font: `'${v.family}'` }))]), ...(state.userFonts.length ? [{ group: 'Imported' }, ...state.userFonts.map((f) => ({ value: f.name, label: f.name, font: `'${f.name}'` }))] : []), { group: ' ' }, { value: '__import', label: '+ Import font (TTF, OTF, WOFF)' }];
let fontImportTo = null;
const withImport = (fn) => (v) => { if (v === '__import') { fontImportTo = fn; $('[data-font-file]').click(); return; } fn(v); };
function drawEditor() {
  const tpl = getTemplate(state.tpl), st = styleOf(tpl.id);
  // the editor starts with the fonts the library showed; after that the choice is the user's
  if (st.sf !== 2) { if (!st.fd && !st.ft && !st.fm) Object.assign(st, baseFonts(tpl.id)); st.sf = 2; save(); }
  $('[data-ed-name]').textContent = tpl.name;
  $('[data-ed-cat]').textContent = tpl.cat;
  dd('template', [...categories.flatMap((c) => [{ group: c }, ...templates.filter((t) => t.cat === c).map((t) => ({ value: t.id, label: t.name }))])], tpl.id, (v) => { location.hash = '/editor/' + v; });
  $('[data-ed-formats]').innerHTML = formatItems().map((f) => `<button type="button" class="chip" data-format="${f.value}" aria-pressed="${f.value === state.format}">${f.value === 'custom' ? 'Custom' : esc(f.label)}</button>`).join('')
    + (state.format === 'custom' ? `<span class="size"><input type="number" min="200" max="4000" value="${state.custom.w}" data-size="w" aria-label="Width in pixels"> × <input type="number" min="200" max="4000" value="${state.custom.h}" data-size="h" aria-label="Height in pixels"> px</span>` : '');
  // colours
  const cur = palFor(tpl.id);
  { const all = palList(), FEW = 11, ci = all.findIndex(([k]) => k === cur);
    const sw = ([k, l], i) => `<button type="button" class="sw${i >= FEW && i !== ci ? ' more' : ''}" data-pal="${k}" aria-pressed="${k === cur}" title="${esc(l)}" aria-label="${esc(l)} colours" style="background:${palSwatch(k)}"></button>`;
    const box = $('[data-ed-pals]'); box.innerHTML = all.map(sw).join('') + (all.length > FEW ? `<button type="button" class="sw sw-more" data-pals-more aria-expanded="${box.classList.contains('open')}" aria-label="More colours"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></button>` : ''); }
  const look = tpl.look || {};
  const pobj = palObj(cur);
  const base = cur === 'own' ? look : cur === 'brand' ? brand().colors : typeof pobj === 'object' ? pobj : palettes[cur] || look;
  $('[data-ed-colours]').innerHTML = [['bg', 'Background'], ['ink', 'Text'], ['accent', 'Accent'], ['accent2', 'Shapes'], ['g1', 'Gradient 1'], ['g2', 'Gradient 2'], ['logo', 'Logo']].map(([k, l]) => { const v = st[k] || base[k] || look[k] || (k === 'accent2' ? base.accent || look.accent : '') || (k === 'logo' ? base.ink || look.ink : '') || '#000000'; return `<button type="button" class="cbtn" data-colbtn="${k}" data-v="${esc(v)}"><i style="--c:${esc(v)}"></i><span>${l}</span><em>${esc(String(v).toUpperCase())}</em></button>`; }).join('');
  // shade with an arrow
  { const d = st.dg; $('[data-shade]').innerHTML = d
    ? `<div class="chips">${[['#000000', 'Black'], ['#ffffff', 'White'], ['accent', 'Accent'], ['bg', 'Background']].map(([v, l]) => { const c = v === 'accent' ? (st.accent || base.accent) : v === 'bg' ? (st.bg || base.bg) : v; return `<button type="button" class="chip" data-dgc="${esc(c)}" aria-pressed="${(d.c || '#000000') === c}"><i class="dot" style="background:${esc(c)}"></i>${l}</button>`; }).join('')}</div><label class="range"><span>Strength</span><input type="range" min=".05" max="1" step=".01" value="${d.s ?? .6}" data-dgs></label><button type="button" class="btn btn--line" data-dg-off>Remove shade</button>`
    : `<button type="button" class="btn btn--line" data-dg-on><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M10 5h9v9"/></svg>Add shade</button>`; }
  // type
  dd('fd', fontItems(''), st.fd || 'tight', withImport((v) => { st.fd = v; save(); drawEditor(); }));
  dd('ft', fontItems(''), st.ft || 'tight', withImport((v) => { st.ft = v; st.fm = v; save(); drawEditor(); }));
  // photo sliders
  const slots = tpl.slots || [];
  $('[data-slots]').innerHTML = slots.length ? `<p class="g-title">Photos</p>` + slots.map((l, i) => { const src = slotsFor(tpl.id)[i]; return `<label class="slot">${src ? `<img src="${src}" alt="">` : '<i>+</i>'}<span>${esc(l)}</span><b>${src ? 'Replace' : 'Upload'}</b><input type="file" accept="image/*" data-slot="${i}" hidden></label>`; }).join('') : '';
  $('[data-one-photo] .file-btn').hidden = !!slots.length;
  $$('[data-st]').forEach((r) => { const k = r.dataset.st; r.value = st[k] ?? { ix: 50, iy: 50, iz: 1, ov: 0.6, ls: 1 }[k]; });
  $('[data-ed-grads]').hidden = !hasPhoto(tpl); $('[data-ed-grads-l]').hidden = !hasPhoto(tpl);
  $('[data-ed-grads]').innerHTML = [['', 'None'], ...Object.entries(gradients).map(([k, v]) => [k, v.label])].map(([k, l]) => `<button type="button" class="chip" data-grad="${k}" aria-pressed="${(st.grad || '') === k}">${esc(l)}</button>`).join('');
  // text fields, each with its own font, size and colour
  const values = { ...tpl.fields, ...(state.fields[tpl.id] || {}) };
  const map = fieldMap(tpl.id);
  $('[data-onefont]').checked = !!st.oneFont;
  $('[data-onefont-wrap]').classList.toggle('is-open', !!st.oneFont);
  if (st.oneFont) dd('onefont', fontItems(''), st.fd || 'tight', withImport((v) => { ['fd', 'ft', 'fm'].forEach((k) => (v ? (st[k] = v) : delete st[k])); Object.values(st.el || {}).forEach((e) => delete e.f); save(); drawEditor(); }));
  $('[data-fields]').innerHTML = Object.entries(values).map(([k, v]) => {
    const long = String(tpl.fields[k]).includes('\n') || String(tpl.fields[k]).length > 40;
    const ns = map[k] || [], e = (st.el || {})[ns[0]] || {};
    const tools = ns.length ? `<div class="ftools">${st.oneFont ? '' : `<div class="dd mini" data-dd="ff-${k}"></div>`}<span class="sizer"><button type="button" data-fz="${k},-1" aria-label="Smaller text">A−</button><output>${Math.round((e.z || 1) * 100)}%</output><button type="button" data-fz="${k},1" aria-label="Bigger text">A+</button></span><button type="button" class="sel" data-select="${k}">Select</button><button type="button" class="cdot" title="Text colour" aria-label="Text colour" data-fcp="${k}" data-v="${esc(e.c || '#ffffff')}"><i style="background:${e.c || 'conic-gradient(#e8401c,#1f3fe0,#c6f432,#e8401c)'}"></i></button>${e.c ? `<button type="button" class="link" data-fcx="${k}">Reset colour</button>` : ''}</div>` : '';
    return `<div class="field"><label for="f-${k}">${esc(k)}</label>${long ? `<textarea id="f-${k}" data-k="${k}" rows="${Math.min(8, String(v).split('\n').length + 1)}">${esc(v)}</textarea>` : `<input id="f-${k}" data-k="${k}" value="${esc(v)}">`}${tools}</div>`;
  }).join('');
  if (!st.oneFont) for (const [k, ns] of Object.entries(map)) if (ns.length) dd(`ff-${k}`, fontItems('Font'), ((st.el || {})[ns[0]] || {}).f || '', withImport((v) => { ns.forEach((n) => { const e = elOf(n); v ? (e.f = v) : delete e.f; }); save(); drawEditor(); }));
  $('[data-snap]').checked = state.snap !== false;
  // series
  const pg = st.pager || {};
  $('[data-pager-kinds]').innerHTML = [['none', 'None'], ...Object.entries(pagerKinds)].map(([k, l]) => `<button type="button" class="chip" data-pk="${k}" aria-pressed="${(pg.kind || 'none') === k}">${l}</button>`).join('');
  $('[data-pager-ctl]').hidden = !pg.kind || pg.kind === 'none';
  $('[data-pg-i]').textContent = pg.i || 1; $('[data-pg-n]').textContent = pg.n || 5;
  $('[data-pager-pos]').innerHTML = [['tl', 'Top left'], ['tc', 'Top'], ['tr', 'Top right'], ['bl', 'Bottom left'], ['bc', 'Bottom'], ['br', 'Bottom right']].map(([k, l]) => `<button type="button" class="chip" data-pp="${k}" aria-pressed="${(pg.pos || 'tr') === k}">${l}</button>`).join('');
  $('[data-pager-cbtn] i').style.background = pg.c || '#ffffff';
  // projects
  if (!state.projects.length) state.projects.push({ id: uid(), name: 'My first series', posts: [] });
  state.project ||= state.projects[0].id;
  dd('project', [...state.projects.map((p) => ({ value: p.id, label: p.name, note: String(p.posts.length) })), { value: '+', label: '+ New project' }], state.project, (v) => { if (v === '+') { const pr = { id: uid(), name: `Project ${state.projects.length + 1}`, posts: [] }; state.projects.push(pr); v = pr.id; } state.project = v; save(); drawEditor(); });
  const ed = state.editing && projectOf(state.editing.pid)?.posts.find((x) => x.id === state.editing.postId);
  $('[data-editing]').hidden = !ed;
  if (ed) { const pr = projectOf(state.editing.pid); $('[data-editing]').innerHTML = `Editing post ${pr.posts.indexOf(ed) + 1} of “${esc(pr.name)}”. <button type="button" class="link" data-stop-edit>Stop editing</button>`; }
  $('[data-save-post]').textContent = ed ? 'Update' : 'Save';
  drawCanvas();
  drawLayers();
  drawPhotoFx();
  // each text's font menu names the font it really uses
  if (!st.oneFont) for (const [k, ns] of Object.entries(map)) {
    const host = $(`[data-dd="ff-${k}"]`); if (!host || ((st.el || {})[ns[0]] || {}).f) continue;
    const el = $(`[data-canvas] [data-n="${ns[0]}"]`); if (!el) continue;
    const fam = getComputedStyle(el).fontFamily.split(',')[0].replace(/["']/g, '').trim(), fk = Object.values(fonts).find((v) => v.family === fam), sp = $('.dd-btn span', host);
    if (sp) { sp.textContent = fk ? fk.label : fam; sp.style.fontFamily = `'${fam}'`; }
  }
}
const fmCache = {};
// Which text blocks (data-n) show which field: render once with marker text and look for the markers.
function fieldMap(id) {
  if (fmCache[id]) return fmCache[id];
  const t = getTemplate(id), keys = Object.keys(t.fields), mark = Object.fromEntries(keys.map((k, i) => [k, `QZ${i}QZ`]));
  let html = ''; try { html = render(id, { fields: mark }); } catch { html = ''; }
  const out = Object.fromEntries(keys.map((k) => [k, []]));
  for (const m of html.matchAll(/<p data-n="(\d+)"[^>]*>([\s\S]*?)<\/p>/g)) keys.forEach((k, i) => { if (m[2].includes(`QZ${i}QZ`)) out[k].push(m[1]); });
  return (fmCache[id] = out);
}
const elOf = (n) => { const st = styleOf(state.tpl); st.el ||= {}; return (st.el[n] ||= {}); };
const projectOf = (id) => state.projects.find((p) => p.id === id);
const toHex = (c) => { if (/^#[0-9a-f]{6}$/i.test(c)) return c; const p = typeof parseCol === 'function' && parseCol(c); return p ? '#' + p.slice(0, 3).map((v) => Math.round(v).toString(16).padStart(2, '0')).join('') : '#000000'; };
let zoom = 1;
const tickStep = (pxPerUnit) => { for (const st of [5, 10, 20, 25, 50, 100, 200, 250, 500, 1000]) if (st * pxPerUnit >= 46) return st; return 1000; };
function rulerHtml(axis, len, total) {
  const k = len / total, st = tickStep(k), out = [];
  for (let v = 0; v <= total; v += st / 5) { const major = Math.abs(v / st - Math.round(v / st)) < 1e-6; out.push(`<i class="${major ? 'mj' : ''}" style="${axis === 'x' ? 'left' : 'top'}:${(v * k).toFixed(1)}px"></i>${major ? `<b style="${axis === 'x' ? 'left' : 'top'}:${(v * k).toFixed(1)}px">${Math.round(v)}</b>` : ''}`); }
  return out.join('');
}
function drawCanvas() {
  const f = fmt(state.format), canvas = $('[data-canvas]'), R = state.rulers !== false ? 22 : 0;
  const avail = Math.max(200, canvas.clientWidth - 24 - 44), maxH = Math.max(260, innerHeight * (innerWidth < 1100 ? (innerWidth >= 600 ? .62 : .5) : .8) - 130);
  const base = Math.min(avail, 720 * Math.min(1.7, f.w / f.h), maxH * (f.w / f.h)); const H1 = Math.round(base * f.h / f.w);
  const W = Math.round(base * zoom), H = Math.round(W * f.h / f.w);
  const g = state.guides || { v: [], h: [] };
  
  canvas.innerHTML = `<div class="cv-tools">
      <div class="cv-l"><button type="button" class="tb${R ? ' on' : ''}" data-cv="rulers" title="Show or hide rulers"><svg viewBox="0 0 24 24"><path d="M3 8h18v8H3zM7 8v3M11 8v4M15 8v3M19 8v4"/></svg><span>${R ? 'Hide rulers' : 'Rulers'}</span></button>${R ? `<button type="button" class="tb${state.mirror !== false ? ' on' : ''}" data-cv="mirror" title="Mirror new guides from the centre"><svg viewBox="0 0 24 24"><path d="M12 3v18M8 7l-4 5 4 5M16 7l4 5-4 5"/></svg><span>Mirror</span></button>${g.v.length + g.h.length ? '<button type="button" class="tb" data-cv="clear"><span>Clear guides</span></button>' : ''}` : ''}</div>
      <div class="cv-r"><button type="button" class="tb ic" data-undo aria-label="Undo" title="Undo (Ctrl+Z)"${hist.undo.length ? '' : ' disabled'}><svg viewBox="0 0 24 24"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg></button><button type="button" class="tb ic" data-redo aria-label="Redo" title="Redo (Ctrl+Shift+Z)"${hist.redo.length ? '' : ' disabled'}><svg viewBox="0 0 24 24"><path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/></svg></button><i class="cv-sep"></i><button type="button" class="tb ic" data-cv="out" aria-label="Zoom out"><svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21M7.5 10.5h6"/></svg></button><button type="button" class="tb zl" data-cv="fit" title="Fit">${Math.round(zoom * 100)}%</button><button type="button" class="tb ic" data-cv="in" aria-label="Zoom in"><svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21M7.5 10.5h6M10.5 7.5v6"/></svg></button></div></div>
    <div class="cv-scroll" style="height:${H1 + 44 + 8}px"><div class="cv-wrap" style="--R:22px">
      ${R ? `<div class="ruler x" data-ruler="h" style="width:${W}px">${rulerHtml('x', W, f.w)}</div><div class="ruler y" data-ruler="v" style="height:${H}px">${rulerHtml('y', H, f.h)}</div><i class="ruler-c"></i>` : ''}
      <div class="cv-art" style="width:${W}px;height:${H}px">${ad(state.tpl, { format: state.format, full: true })}
        ${R ? `<div class="guides">${g.v.map((x, i) => `<i class="gl v" data-g="v,${i}" style="left:${x}%"></i>`).join('')}${g.h.map((y, i) => `<i class="gl h" data-g="h,${i}" style="top:${y}%"></i>`).join('')}<i class="gl c v" style="left:50%"></i><i class="gl c h" style="top:50%"></i></div>` : ''}
      </div></div></div>`;
  placeWrap();
  if (picked != null) $(`[data-canvas] [data-n="${picked}"]`)?.classList.add('is-picked');
  if (layerSel?.startsWith('x:')) $(`[data-canvas] [data-x="${layerSel.slice(2)}"]`)?.classList.add('is-picked');
  markPhoto();
  drawShadeHandle();
  $('[data-picked]').textContent = picked != null ? `Text ${+picked + 1} selected. Drag it in the preview, use the pad or the arrow keys.` : 'Press Select under a field to move it.';
  { const fm = fieldMap(state.tpl); $$('[data-select]').forEach((b) => { const on = picked != null && (fm[b.dataset.select] || []).map(String).includes(String(picked)); b.setAttribute('aria-pressed', String(on)); b.textContent = on ? 'Selected' : 'Select'; }); }
  drawPhotoSel();
  $('[data-v-formats]').innerHTML = formatItems().slice(0, 5).map((x) => `<button type="button" data-format="${x.value}">${ad(state.tpl, { format: x.value })}${esc(x.label)}</button>`).join('');
  const tplNow = getTemplate(state.tpl), gsec = $('[data-v-grads]');
  gsec.hidden = !hasPhoto(tplNow); $('[data-v-grads-l]').hidden = !hasPhoto(tplNow);
  if (hasPhoto(tplNow)) gsec.innerHTML = [['', 'None'], ...Object.entries(gradients).map(([k, v]) => [k, v.label])].map(([k, l]) => `<button type="button" data-grad="${k}" aria-pressed="${(styleOf(state.tpl).grad || '') === k}">${ad(state.tpl, { format: 'square', style: { ...styleOf(state.tpl), grad: k } })}${esc(l)}</button>`).join('');
  $('[data-v-pals]').innerHTML = palList().slice(0, 9).map(([k, l]) => `<button type="button" data-pal="${k}">${ad(state.tpl, { format: 'square', palette: k, style: { ...styleOf(state.tpl), bg: '', ink: '', accent: '', g1: '', g2: '' } })}${esc(l)}</button>`).join('');
}
// The text's own ink box (not its full CSS box), so short lines can move to the edge.
function inkRect(el) { try { const r = document.createRange(); r.selectNodeContents(el); const b = r.getBoundingClientRect(); return b.width ? b : el.getBoundingClientRect(); } catch { return el.getBoundingClientRect(); } }
// Magnetic snapping: the slower you move, the wider the pull, like Photoshop. Returns [value, snappedTo|null].
function magnet(v, targets, speed, px) { const th = (px || 8) / (1 + speed * 2.5); let best = null; for (const t of targets) if (Math.abs(v - t) <= th && (best == null || Math.abs(v - t) < Math.abs(v - best))) best = t; return best == null ? [v, null] : [best, best]; }
function speedOf(tr, ev) { const now = performance.now(), d = Math.hypot(ev.clientX - tr.x, ev.clientY - tr.y) / Math.max(1, now - tr.t); tr.v = tr.v * .7 + d * .3; tr.x = ev.clientX; tr.y = ev.clientY; tr.t = now; return tr.v; }
function dragGuide(axis, idx, e) {
  const art = $('[data-canvas] .cv-art'); if (!art) return; e.preventDefault();
  const g = state.guides ||= { v: [], h: [] }, list = g[axis], r = art.getBoundingClientRect(), len = axis === 'v' ? r.width : r.height;
  const old = idx == null ? null : list[idx], partner = old == null || state.mirror === false ? -1 : list.findIndex((x, j) => j !== idx && Math.abs(x - (100 - old)) < .3);
  let line = idx == null ? null : art.querySelector(`[data-g="${axis},${idx}"]`);
  if (!line) { line = document.createElement('i'); line.className = `gl ${axis} live`; art.querySelector('.guides').appendChild(line); }
  const mline = partner >= 0 ? art.querySelector(`[data-g="${axis},${partner}"]`) : null;
  const tr = { x: e.clientX, y: e.clientY, t: performance.now(), v: 0 }; let pos = old ?? 0;
  const others = list.filter((_, j) => j !== idx && j !== partner);
  const move = (ev) => {
    const sp = speedOf(tr, ev), raw = ((axis === 'v' ? ev.clientX - r.left : ev.clientY - r.top) / len) * 100;
    const tg = [50, 0, 100, ...others, ...others.map((x) => 100 - x)];
    const [p, hit] = magnet(raw * len / 100, tg.map((x) => x * len / 100), sp, 10);
    pos = +(p / len * 100).toFixed(2);
    line.style[axis === 'v' ? 'left' : 'top'] = pos + '%'; line.classList.toggle('hit', hit != null); line.classList.toggle('out', pos < -1 || pos > 101);
    if (mline) mline.style[axis === 'v' ? 'left' : 'top'] = (100 - pos) + '%';
  };
  const up = () => {
    removeEventListener('pointermove', move);
    const gone = pos < -1 || pos > 101;
    const rest = list.filter((_, j) => j !== idx && j !== partner);
    if (!gone) { rest.push(pos); if (state.mirror !== false && Math.abs(pos - 50) > .3 && (partner >= 0 || idx == null)) rest.push(+(100 - pos).toFixed(2)); }
    g[axis] = [...new Set(rest.map((x) => +x.toFixed(2)))].sort((a, b) => a - b); save(); drawCanvas();
  };
  addEventListener('pointermove', move); addEventListener('pointerup', up, { once: true });
}
// the artboard floats in a fixed viewport; pan holds its top-left corner (null = centred)
let pan = null;
function placeWrap() {
  const sc = $('[data-canvas] .cv-scroll'), w = sc?.querySelector('.cv-wrap'); if (!w) return;
  const sw = sc.clientWidth, sh = sc.clientHeight, ww = w.offsetWidth, wh = w.offsetHeight;
  const clamp = (v, size, box) => Math.max(Math.min(0, box - size) - 120, Math.min(Math.max(0, box - size) + 120, v));
  if (!pan || zoom <= 1) pan = null;
  const x = pan ? clamp(pan.x, ww, sw) : (sw - ww) / 2, y = pan ? clamp(pan.y, wh, sh) : (sh - wh) / 2;
  if (pan) pan = { x, y };
  w.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
  sc.classList.toggle('can-pan', zoom > 1);
}
function setZoom(z, cx, cy) {
  const sc = $('[data-canvas] .cv-scroll'), art = $('[data-canvas] .cv-art'); if (!sc || !art) return;
  const old = zoom; zoom = Math.max(.5, Math.min(5, +z.toFixed(3))); if (zoom === old) return;
  const s0 = sc.getBoundingClientRect(), a = art.getBoundingClientRect();
  if (cx == null) { cx = s0.left + s0.width / 2; cy = s0.top + s0.height / 2; }
  const fx = (cx - a.left) / a.width, fy = (cy - a.top) / a.height;
  drawCanvas();
  const a2 = $('[data-canvas] .cv-art'); if (!a2 || zoom <= 1) return;
  // keep the point under the pointer where it was
  pan = { x: cx - s0.left - fx * a2.offsetWidth - a2.offsetLeft, y: cy - s0.top - fy * a2.offsetHeight - a2.offsetTop };
  placeWrap();
}
$('[data-canvas]').addEventListener('wheel', (e) => { if (!e.target.closest('.cv-scroll')) return; e.preventDefault(); const d = Math.max(-60, Math.min(60, e.deltaMode ? e.deltaY * 16 : e.deltaY)); setZoom(zoom * Math.exp(-d * .0025), e.clientX, e.clientY); }, { passive: false });
// drag the empty area around the artboard to pan when zoomed in
$('[data-canvas]').addEventListener('pointerdown', (e) => {
  const sc = e.target.closest('.cv-scroll'); if (!sc || zoom <= 1 || e.target.closest('.cv-art, [data-ruler], [data-g]')) return;
  e.preventDefault(); const w = sc.querySelector('.cv-wrap'), m = /translate\(([-\d.]+)px, ([-\d.]+)px\)/.exec(w.style.transform) || [0, 0, 0];
  const x0 = +m[1], y0 = +m[2], sx = e.clientX, sy = e.clientY; sc.classList.add('panning');
  const move = (ev) => { pan = { x: x0 + ev.clientX - sx, y: y0 + ev.clientY - sy }; placeWrap(); };
  addEventListener('pointermove', move); addEventListener('pointerup', () => { removeEventListener('pointermove', move); sc.classList.remove('panning'); }, { once: true });
});
$('[data-canvas]').addEventListener('click', (e) => {
  const b = e.target.closest('[data-cv]'); if (!b) return;
  const k = b.dataset.cv;
  if (k === 'in') setZoom(zoom * 1.25); if (k === 'out') setZoom(zoom / 1.25); if (k === 'fit') { zoom = 1; pan = null; drawCanvas(); }
  if (k === 'rulers') { state.rulers = state.rulers === false; save(); drawCanvas(); }
  if (k === 'mirror') { state.mirror = state.mirror === false; save(); drawCanvas(); }
  if (k === 'clear') ask('Remove all guides?', 'The rulers stay, only the guide lines go.').then((ok) => { if (ok) { state.guides = { v: [], h: [] }; save(); drawCanvas(); } });
});
new ResizeObserver(() => { if (!$('#editor').hidden) soon(); }).observe($('[data-canvas]'));
let redraw = 0; const soon = () => { cancelAnimationFrame(redraw); redraw = requestAnimationFrame(drawCanvas); };
$('#editor').addEventListener('click', (e) => {
  const tab = e.target.closest('[data-tab]');
  if (tab) { $$('[data-tab]').forEach((t) => t.setAttribute('aria-selected', String(t === tab))); $$('[data-pane]').forEach((pn) => { pn.hidden = pn.dataset.pane !== tab.dataset.tab; }); }
  const f = e.target.closest('[data-format]'), p = e.target.closest('[data-pal]'), r = e.target.closest('[data-reset]'), m = e.target.closest('[data-move]');
  if (f) { state.format = f.dataset.format; save(); click('tap'); drawEditor(); }
  if (p) { state.pal[state.tpl] = p.dataset.pal; const st = styleOf(state.tpl); ['bg', 'ink', 'accent', 'accent2', 'g1', 'g2'].forEach((k) => delete st[k]); save(); click('tap'); drawEditor(); }
  if (r) {
    const st = styleOf(state.tpl), k = r.dataset.reset;
    const msg = { text: ['Back to the example text?', 'Your texts, fonts, sizes and colours of this template are replaced by the example.'], nudge: ['Reset all positions?', 'Every text you moved goes back to its place.'], colours: ['Reset colours?', 'Your own colours for this template are removed.'], photo: ['Reset the photo?', 'Position, zoom, overlay and logo size go back to default.'] }[k];
    if (msg) { ask(msg[0], msg[1]).then((ok) => { if (ok) doReset(k); }); return; }
  }
  if (false) {
    if (k === 'colours') ['bg', 'ink', 'accent', 'accent2', 'g1', 'g2', 'logo'].forEach((x) => delete st[x]);
    if (k === 'photo') { ['ix', 'iy', 'iz', 'ov', 'ls'].forEach((x) => delete st[x]); delete st.photoFx; if (st.layers?.op) delete st.layers.op.photo; }
    if (k === 'text') delete state.fields[state.tpl];
    if (k === 'nudge') { delete st.nudge; picked = null; }
    if (k === 'text') delete st.el;
    save(); click('tap'); drawEditor();
  }
  if (m && picked != null) { if (m.dataset.move === 'center') centreX(); else { const [dx, dy] = m.dataset.move.split(',').map(Number); const k = state.snap !== false ? 2 : 1; nudgeBy(dx * k, dy * k); } }
  const gb = e.target.closest('[data-grad]'); if (gb) { const st = styleOf(state.tpl); if (gb.dataset.grad) st.grad = gb.dataset.grad; else delete st.grad; save(); drawEditor(); }
  const sel = e.target.closest('[data-select]'); if (sel) { const ns = fieldMap(state.tpl)[sel.dataset.select] || []; if (ns.length) { const on = ns.map(String).includes(String(picked)); picked = on ? null : ns[0]; layerSel = on ? null : 't' + ns[0]; photoSel = null; click('tap'); drawCanvas(); drawLayers(); const c = $('[data-canvas]'); if (c.getBoundingClientRect().bottom < 0 || c.getBoundingClientRect().top > innerHeight) c.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }
  const fz = e.target.closest('[data-fz]'); if (fz) { const [k, d] = fz.dataset.fz.split(','); (fieldMap(state.tpl)[k] || []).forEach((n) => { const el = elOf(n); el.z = Math.max(.4, Math.min(3, +((el.z || 1) + d * .1).toFixed(2))); }); save(); drawEditor(); }
  const fcx = e.target.closest('[data-fcx]'); if (fcx) { (fieldMap(state.tpl)[fcx.dataset.fcx] || []).forEach((n) => delete elOf(n).c); save(); drawEditor(); }
  const pk = e.target.closest('[data-pk]'); if (pk) { const st = styleOf(state.tpl); st.pager = { i: 1, n: 5, pos: 'tr', ...(st.pager || {}), kind: pk.dataset.pk }; save(); drawEditor(); }
  const pp = e.target.closest("[data-ppick]"); if (pp) { styleOf(state.tpl).pager.pos = pp.dataset.pp; save(); drawEditor(); }
  const pgb = e.target.closest('[data-pg]'); if (pgb) { const p = styleOf(state.tpl).pager; const [k, d] = pgb.dataset.pg.split(','); p[k] = Math.max(1, Math.min(20, (+p[k] || (k === 'n' ? 5 : 1)) + +d)); if (p.i > p.n) p.i = p.n; save(); drawEditor(); }
  if (e.target.closest('[data-save-post]')) savePost();
  const cb = e.target.closest('[data-colbtn]'); if (cb) { const k = cb.dataset.colbtn; openPicker(cb, cb.dataset.v, (v) => { styleOf(state.tpl)[k] = v; cb.dataset.v = v; cb.querySelector('i').style.setProperty('--c', v); cb.querySelector('em').textContent = v.toUpperCase(); save(); soon(); }); }
  const fcp = e.target.closest('[data-fcp]'); if (fcp) { const k = fcp.dataset.fcp; openPicker(fcp, fcp.dataset.v, (v) => { (fieldMap(state.tpl)[k] || []).forEach((n) => { elOf(n).c = v; }); fcp.querySelector('i').style.background = v; save(); soon(); }); }
  const pcb = e.target.closest('[data-pager-cbtn]'); if (pcb) openPicker(pcb, styleOf(state.tpl).pager?.c || '#ffffff', (v) => { styleOf(state.tpl).pager.c = v; pcb.querySelector('i').style.background = v; save(); soon(); });
  if (e.target.closest('[data-save-pal]')) { const st = styleOf(state.tpl); const vals = Object.fromEntries($$('[data-colbtn]').map((b) => [b.dataset.colbtn, b.dataset.v])); const pal = { id: uid(), label: `My palette ${(state.myPalettes || []).length + 1}`, ...vals, ...Object.fromEntries(['bg', 'ink', 'accent', 'accent2', 'g1', 'g2'].filter((k) => st[k]).map((k) => [k, st[k]])) }; (state.myPalettes ||= []).push(pal); state.pal[state.tpl] = 'my:' + pal.id; ['bg', 'ink', 'accent', 'accent2', 'g1', 'g2'].forEach((k) => delete st[k]); save(); drawEditor(); status(`Saved as “${pal.label}”. It is now in every palette list.`); }
  if (e.target.closest('[data-stop-edit]')) { state.editing = null; save(); drawEditor(); }
});
function centreX() {
  const adEl = $('[data-canvas] .bi-ad'), el = $(`[data-canvas] [data-n="${picked}"]`); if (!adEl || !el) return;
  const a = adEl.getBoundingClientRect(), r = inkRect(el), u = Math.min(a.width, a.height) / 100;
  nudgeBy(((a.left + a.width / 2) - (r.left + r.width / 2)) / u, 0);
}
function nudgeBy(dx, dy) { const st = styleOf(state.tpl); st.nudge ||= {}; const v = st.nudge[picked] || [0, 0]; st.nudge[picked] = [+(v[0] + dx).toFixed(2), +(v[1] + dy).toFixed(2)]; save(); soon(); }
$('#editor').addEventListener('input', (e) => {
  const t = e.target, st = styleOf(state.tpl);
  if (t.dataset.k) { (state.fields[state.tpl] ||= {})[t.dataset.k] = t.value; save(); soon(); }
  if (t.dataset.col) { st[t.dataset.col] = t.value; save(); soon(); }
  if (t.dataset.st) { st[t.dataset.st] = +t.value; save(); soon(); }
  if (t.dataset.fc) { (fieldMap(state.tpl)[t.dataset.fc] || []).forEach((n) => { elOf(n).c = t.value; }); save(); soon(); }
  if (t.dataset.pagerC !== undefined) { styleOf(state.tpl).pager.c = t.value; save(); soon(); }
  if (t.dataset.onefont !== undefined) { st.oneFont = t.checked; save(); drawEditor(); }
  if (t.dataset.snap !== undefined) { state.snap = t.checked; save(); }
  if (t.dataset.size) { state.custom[t.dataset.size] = Math.max(200, Math.min(4000, +t.value || 1080)); save(); soon(); }
});
// pick and drag text, or drag the photo
$('[data-canvas]').addEventListener('pointerdown', (e) => {
  const rl = e.target.closest('[data-ruler]'); if (rl) return dragGuide(rl.dataset.ruler, null, e);
  const gl = e.target.closest('[data-g]'); if (gl) { const [ax, i] = gl.dataset.g.split(','); return dragGuide(ax, +i, e); }
  const adEl = e.target.closest('.bi-ad'); if (!adEl) return;
  const rect = adEl.getBoundingClientRect(), u = Math.min(rect.width, rect.height) / 100;
  // pick the text whose own letters are under the pointer (a wide text box must not hide a smaller one)
  const hits = $$('[data-n]', adEl).filter((n) => { const r = inkRect(n); return e.clientX >= r.left - 4 && e.clientX <= r.right + 4 && e.clientY >= r.top - 4 && e.clientY <= r.bottom + 4; });
  // nothing is picked by clicking the preview: choose a text, picture or photo in the panel on the left, then drag it here
  const st = styleOf(state.tpl), sx = e.clientX, sy = e.clientY, under = document.elementsFromPoint(sx, sy);
  const textEl = picked != null ? hits.find((n) => n.dataset.n === String(picked)) || null : null;
  const xEl = layerSel?.startsWith('x:') ? under.find((n) => n.matches?.('.bi-extra') && n.dataset.x === layerSel.slice(2)) || null : null;
  const photoHit = layerSel === 'photo' ? under.find((n) => n.matches?.('.bi-media') && adEl.contains(n) && (!photoSel?.startsWith('photo:') || srcKey(n.getAttribute('src')) === photoSel.slice(6))) || null : null;
  if (!textEl && !xEl && !photoHit) return;
  e.preventDefault();
  if (xEl) {
    const x = (st.extra || []).find((q) => q.id === xEl.dataset.x); if (!x) return;
    const x0 = x.x ?? 50, y0 = x.y ?? 50;
    const move = (ev) => {
      let nx = x0 + ((ev.clientX - sx) / rect.width) * 100, ny = y0 + ((ev.clientY - sy) / rect.height) * 100;
      if (!ev.altKey) { if (Math.abs(nx - 50) < 1.2) nx = 50; if (Math.abs(ny - 50) < 1.2) ny = 50; }
      x.x = +nx.toFixed(2); x.y = +ny.toFixed(2);
      xEl.style.left = x.x + '%'; xEl.style.top = x.y + '%';
    };
    addEventListener('pointermove', move); addEventListener('pointerup', () => { removeEventListener('pointermove', move); save(); soon(); }, { once: true });
    return;
  }
  if (textEl) {
    const v0 = (st.nudge || {})[picked] || [0, 0], r0 = inkRect(textEl), snap = state.snap !== false;
    const canvas = $('[data-canvas]'); canvas.classList.add('guiding');
    const lim = (d, lo, hi) => (hi < lo ? d : Math.max(lo, Math.min(hi, d)));
    const g = state.guides || { v: [], h: [] }, tr = { x: sx, y: sy, t: performance.now(), v: 0 };
    const vx = [50, ...(state.rulers !== false ? g.v : [])].map((p) => rect.left + rect.width * p / 100), hy = [50, ...(state.rulers !== false ? g.h : [])].map((p) => rect.top + rect.height * p / 100);
    const move = (ev) => {
      let dx = (ev.clientX - sx) / u, dy = (ev.clientY - sy) / u;
      // hold Alt to move freely: no edges, no magnets, no rounding
      if (ev.altKey) { canvas.classList.remove('on-x', 'on-y'); $$('[data-canvas] .gl').forEach((l) => l.classList.remove('hit')); }
      else if (snap) {
        const sp = speedOf(tr, ev);
        dx = lim(dx, (rect.left - r0.left) / u, (rect.right - r0.right) / u); dy = lim(dy, (rect.top - r0.top) / u, (rect.bottom - r0.bottom) / u);
        const L = r0.left + dx * u, Rr = r0.right + dx * u, C = (L + Rr) / 2, T = r0.top + dy * u, B = r0.bottom + dy * u, M = (T + B) / 2;
        let sxHit = null, syHit = null;
        for (const edge of [C, L, Rr]) { const [v, h] = magnet(edge, vx, sp, 9); if (h != null) { dx += (v - edge) / u; sxHit = h; break; } }
        for (const edge of [M, T, B]) { const [v, h] = magnet(edge, hy, sp, 9); if (h != null) { dy += (v - edge) / u; syHit = h; break; } }
        canvas.classList.toggle('on-x', sxHit === vx[0]); canvas.classList.toggle('on-y', syHit === hy[0]);
        $$('[data-canvas] .gl').forEach((l) => l.classList.remove('hit'));
        if (sxHit != null && sxHit !== vx[0]) $(`[data-canvas] [data-g="v,${vx.indexOf(sxHit) - 1}"]`)?.classList.add('hit');
        if (syHit != null && syHit !== hy[0]) $(`[data-canvas] [data-g="h,${hy.indexOf(syHit) - 1}"]`)?.classList.add('hit');
        if (sxHit == null) dx = Math.round((v0[0] + dx) * 2) / 2 - v0[0];
        if (syHit == null) dy = Math.round((v0[1] + dy) * 2) / 2 - v0[1];
      }
      st.nudge ||= {}; st.nudge[picked] = [+(v0[0] + dx).toFixed(2), +(v0[1] + dy).toFixed(2)];
      textEl.style.setProperty('--nx', st.nudge[picked][0]); textEl.style.setProperty('--ny', st.nudge[picked][1]);
    };
    const up = () => { removeEventListener('pointermove', move); canvas.classList.remove('guiding', 'on-x', 'on-y'); save(); drawCanvas(); };
    addEventListener('pointermove', move); addEventListener('pointerup', up, { once: true });
  } else {
    const media = photoHit;
    const srcs = [...new Set($$('.bi-media', adEl).map((n) => n.getAttribute('src')))];
    const key = srcs.length > 1 ? srcKey(media.getAttribute('src')) : null;
    if (key) {
      st.mpos ||= {}; const p0 = st.mpos[key] || [st.ix ?? 50, st.iy ?? 50, st.iz ?? 1]; const r = media.getBoundingClientRect();
      const same = $$('.bi-media', adEl).filter((n) => n.getAttribute('src') === media.getAttribute('src'));
      const move = (ev) => { const nx = Math.max(0, Math.min(100, p0[0] - ((ev.clientX - sx) / r.width) * 100 / p0[2])), ny = Math.max(0, Math.min(100, p0[1] - ((ev.clientY - sy) / r.height) * 100 / p0[2])); st.mpos[key] = [+nx.toFixed(2), +ny.toFixed(2), p0[2]]; same.forEach((n) => { n.style.objectPosition = `${nx}% ${ny}%`; n.style.transformOrigin = `${nx}% ${ny}%`; }); };
      const up = () => { removeEventListener('pointermove', move); save(); drawEditor(); };
      addEventListener('pointermove', move); addEventListener('pointerup', up, { once: true });
      return;
    }
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
$('[data-slots]').addEventListener('change', async (e) => { const i = e.target.dataset.slot; const f = e.target.files?.[0]; if (i == null || !f) return; (slotImgs[state.tpl] ||= [...slotsFor(state.tpl)])[+i] = await shrink(await readFile(f)); drawEditor(); });
$('[data-ed-image]').onchange = async (e) => { const f = e.target.files[0]; if (!f) return; image = await shrink(await readFile(f)); click('ok'); drawEditor(); status('Photo added. Drag it in the preview to move it.'); };
$('[data-ed-logo]').onchange = async (e) => { const f = e.target.files[0]; if (!f) return; const b = brand(); b.logo = await readFile(f); b.useLogo = true; save(); click('ok'); drawEditor(); status(`Logo saved to ${b.name}.`); };
$('[data-font-file]').onchange = async (e) => {
  const f = e.target.files[0]; if (!f) return;
  const name = f.name.replace(/\.[^.]+$/, '').replace(/[^\w -]/g, '').slice(0, 30) || 'My font';
  try {
    const face = new FontFace(name, await readFile(f, 'buffer')); await face.load(); document.fonts.add(face);
    state.userFonts = state.userFonts.filter((x) => x.name !== name).concat({ name, data: await readFile(f) });
    installFonts(); (fontImportTo || ((v) => { styleOf(state.tpl).fd = v; }))(name); fontImportTo = null; e.target.value = '';
    toast(`${name} imported. It is listed under Imported in every font menu.`);
  } catch { fontImportTo = null; e.target.value = ''; toast('This file could not be read as a font. Try a TTF, OTF or WOFF file.'); }
};

// Photos are scaled to at most 1600 px and saved as JPEG, so projects fit in the browser's storage.
function shrink(src, max = 1600) {
  return new Promise((res) => { const im = new Image(); im.onload = () => { const k = Math.min(1, max / Math.max(im.width, im.height)); if (k === 1 && src.length < 900000) return res(src); const c = document.createElement('canvas'); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); res(c.toDataURL('image/jpeg', .85)); }; im.onerror = () => res(src); im.src = src; });
}

/* ---------------- Projects: save designs, order them, number them ---------------- */
const snapshot = () => ({ tpl: state.tpl, format: state.format, custom: { ...state.custom }, palette: palFor(state.tpl), style: JSON.parse(JSON.stringify(state.styles[state.tpl] || {})), fields: { ...(state.fields[state.tpl] || {}) }, image: photoFor(state.tpl), images: [...slotsFor(state.tpl)] });
function savePost() {
  const pr = projectOf(state.project); if (!pr) return;
  const ed = state.editing && projectOf(state.editing.pid)?.posts.find((x) => x.id === state.editing.postId);
  if (ed) Object.assign(ed, snapshot()); else pr.posts.push({ id: uid(), ...snapshot() });
  if (!save()) {}
  status(ed ? 'Post updated.' : `Saved as post ${pr.posts.length} in “${pr.name}”.`); drawEditor();
}
const postStyle = (pr, p) => { const st = JSON.parse(JSON.stringify(p.style || {})); if (st.pager && st.pager.kind && st.pager.kind !== 'none') { st.pager.i = pr.posts.indexOf(p) + 1; st.pager.n = pr.posts.length; } return st; };
function drawProjects() {
  if (!state.projects.length) state.projects.push({ id: uid(), name: 'My first series', posts: [] });
  state.project ||= state.projects[0].id;
  const pr = projectOf(state.project) || state.projects[0];
  $('[data-proj-list]').innerHTML = state.projects.map((p) => `<li><button type="button" class="brand-card" data-pid="${p.id}" aria-pressed="${p.id === pr.id}"><i class="pcount">${p.posts.length}</i><span>${esc(p.name)}</span></button></li>`).join('');
  $('[data-proj-name]').value = pr.name;
  $('[data-proj-hint]').textContent = pr.posts.length ? '' : 'Empty. Open a template in the Editor and press Save.';
  $('[data-proj-grid]').innerHTML = pr.posts.map((p, i) => { const f = p.format === 'custom' ? p.custom : formats[p.format] || formats.portrait;
    return `<li class="post" data-post="${p.id}"><div class="ad" style="--ar:${f.w}/${f.h}">${render(p.tpl, { palette: palObj(p.palette), style: postStyle(pr, p), fields: p.fields, brand: brandForRender(), image: p.image, images: p.images || [] })}</div>
      <div class="post-bar"><span>${esc(getTemplate(p.tpl).name)}</span><button type="button" class="p-edit" data-popen="${p.id}">Edit</button><button type="button" class="p-del" data-pdel="${p.id}" aria-label="Remove post" title="Remove post"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/></svg></button></div></li>`; }).join('');
}
$('#projects').addEventListener('click', async (e) => {
  const pr = projectOf(state.project) || state.projects[0];
  const pid = e.target.closest('[data-pid]'); if (pid) { state.project = pid.dataset.pid; save(); drawProjects(); }
  if (e.target.closest('[data-proj-new]')) { const n = { id: uid(), name: `Project ${state.projects.length + 1}`, posts: [] }; state.projects.push(n); state.project = n.id; save(); drawProjects(); $('[data-proj-name]').select(); }
  const mv = e.target.closest('[data-pmove]'); if (mv) { const [id, d] = mv.dataset.pmove.split(','); const i = pr.posts.findIndex((x) => x.id === id), j = i + +d; if (j >= 0 && j < pr.posts.length) { [pr.posts[i], pr.posts[j]] = [pr.posts[j], pr.posts[i]]; save(); drawProjects(); } }
  const del = e.target.closest('[data-pdel]'); if (del && await ask('Remove this post?', 'It is taken out of this project. This cannot be undone.')) { pr.posts = pr.posts.filter((x) => x.id !== del.dataset.pdel); save(); drawProjects(); }
  const op = e.target.closest('[data-popen]'); if (op) { const p = pr.posts.find((x) => x.id === op.dataset.popen); state.tpl = p.tpl; state.format = p.format; if (p.custom) state.custom = { ...p.custom }; state.pal[p.tpl] = p.palette; state.styles[p.tpl] = JSON.parse(JSON.stringify(p.style || {})); state.fields[p.tpl] = { ...p.fields }; image = p.image || null; slotImgs[p.tpl] = [...(p.images || [])]; state.editing = { pid: pr.id, postId: p.id }; state.project = pr.id; save(); location.hash = '/editor/' + p.tpl; }
  if (e.target.closest('[data-proj-set]')) { const m = $('[data-proj-menu]'); m.hidden = !m.hidden; $('[data-proj-set]').setAttribute('aria-expanded', String(!m.hidden)); }
  if (e.target.closest('[data-proj-delete]')) { $('[data-proj-menu]').hidden = true; $('[data-proj-set]').setAttribute('aria-expanded', 'false'); if (await ask(`Delete “${pr.name}”?`, `The project and its ${pr.posts.length} saved post${pr.posts.length === 1 ? '' : 's'} are removed. This cannot be undone.`)) { state.projects = state.projects.filter((x) => x.id !== pr.id); state.project = null; save(); drawProjects(); } }
  if (e.target.closest('[data-proj-rename]')) { $('[data-proj-menu]').hidden = true; $('[data-proj-set]').setAttribute('aria-expanded', 'false'); $('[data-proj-name]').focus(); $('[data-proj-name]').select(); }
  if (e.target.closest('[data-proj-export]')) { for (const [i, p] of pr.posts.entries()) { const f = p.format === 'custom' ? p.custom : formats[p.format] || formats.portrait; const svg = await toSVG(render(p.tpl, { palette: palObj(p.palette), style: postStyle(pr, p), fields: p.fields, brand: brandForRender(), image: p.image, images: p.images || [] }), { w: f.w, h: f.h, fontBase: new URL(FONTS, location.href).href, extraCss: userFontCss() }); download(await toPNG(svg, { w: f.w, h: f.h }), `${pr.name.replace(/\W+/g, '-')}-${String(i + 1).padStart(2, '0')}.png`); await new Promise((r) => setTimeout(r, 350)); } }
});
$('[data-proj-name]').addEventListener('input', (e) => { const pr = projectOf(state.project); if (pr) { pr.name = e.target.value || 'Untitled'; save(); $(`[data-pid="${pr.id}"] span`).textContent = pr.name; } });

function doReset(k) {
  const st = styleOf(state.tpl);
  if (k === 'colours') ['bg', 'ink', 'accent', 'accent2', 'g1', 'g2', 'logo'].forEach((x) => delete st[x]);
  if (k === 'photo') { ['ix', 'iy', 'iz', 'ov', 'ls'].forEach((x) => delete st[x]); delete st.photoFx; if (st.layers?.op) delete st.layers.op.photo; }
  if (k === 'text') { delete state.fields[state.tpl]; delete st.el; }
  if (k === 'nudge') { delete st.nudge; picked = null; }
  save(); drawEditor(); status('Done.');
}
// A small confirm dialog: resolves true or false.
function ask(title, text) {
  const d = $('[data-confirm]'); $('[data-cf-title]').textContent = title; $('[data-cf-text]').textContent = text;
  d.hidden = false; requestAnimationFrame(() => d.classList.add('open')); $('[data-cf-no]').focus();
  return new Promise((res) => {
    const end = (v) => { d.classList.remove('open'); setTimeout(() => { d.hidden = true; }, 250); d.onclick = null; removeEventListener('keydown', key); res(v); };
    const key = (e) => { if (e.key === 'Escape') end(false); };
    addEventListener('keydown', key);
    d.onclick = (e) => { if (e.target.closest('[data-cf-yes]')) end(true); else if (e.target.closest('[data-cf-no]') || e.target === d) end(false); };
  });
}

/* ---------------- colour picker: saturation and brightness, hue, opacity, hex, swatches ---------------- */
const hsv2rgb = (h, s, v) => { const f = (n) => { const k = (n + h / 60) % 6; return v - v * s * Math.max(0, Math.min(k, 4 - k, 1)); }; return [f(5), f(3), f(1)].map((x) => Math.round(x * 255)); };
const rgb2hsv = (r, g, b) => { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; let h = 0; if (d) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; return [(h * 60 + 360) % 360, mx ? d / mx : 0, mx]; };
const parseCol = (c) => { const m = String(c).trim().match(/^#?([0-9a-f]{6})([0-9a-f]{2})?$/i); if (!m) return null; const n = parseInt(m[1], 16); return [n >> 16, (n >> 8) & 255, n & 255, m[2] ? parseInt(m[2], 16) / 255 : 1]; };
const toCol = (r, g, b, a) => '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('') + (a < 1 ? Math.round(a * 255).toString(16).padStart(2, '0') : '');
let cpEl = null;
function openPicker(anchor, value, onChange) {
  if (!cpEl) {
    cpEl = document.createElement('div'); cpEl.className = 'cp'; cpEl.hidden = true;
    cpEl.innerHTML = `<div class="cp-sv" data-sv><i class="cp-knob"></i></div><label class="cp-l">Hue<input type="range" min="0" max="360" class="cp-hue" data-h></label><label class="cp-l">Opacity<input type="range" min="0" max="100" class="cp-alpha" data-a></label><div class="cp-row"><i class="cp-prev"></i><input class="cp-hex" data-hex spellcheck="false" aria-label="Hex colour"><output data-ao></output></div><p class="cp-t">This palette</p><div class="cp-sw" data-sw></div><p class="cp-t">Recent</p><div class="cp-sw" data-recent></div>`;
    document.body.appendChild(cpEl);
    document.addEventListener('pointerdown', (e) => { if (!cpEl.hidden && !cpEl.contains(e.target) && !e.target.closest('[data-colbtn],[data-fcp],[data-pager-cbtn],[data-bcol]')) closePicker(); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && !cpEl.hidden) closePicker(); });
  }
  const rgba = parseCol(value) || [255, 255, 255, 1];
  let [h, sv, vv] = rgb2hsv(...rgba), a = rgba[3];
  const sw = cpEl.querySelector('[data-sw]'), rec = cpEl.querySelector('[data-recent]');
  const pal = [...new Set($$('[data-colbtn], [data-bcol]').filter((b) => b.offsetParent).map((b) => b.dataset.v))];
  sw.innerHTML = pal.map((c) => `<button type="button" style="--c:${c}" data-pick="${c}" aria-label="${c}"></button>`).join('');
  rec.innerHTML = (state.recentColours || []).map((c) => `<button type="button" style="--c:${c}" data-pick="${c}" aria-label="${c}"></button>`).join('');
  const out = () => {
    const [r, g, b] = hsv2rgb(h, sv, vv), c = toCol(r, g, b, a);
    cpEl.style.setProperty('--hue', `hsl(${h} 100% 50%)`); cpEl.style.setProperty('--cur', c); cpEl.style.setProperty('--solid', toCol(r, g, b, 1));
    const k = cpEl.querySelector('.cp-knob'); k.style.left = sv * 100 + '%'; k.style.top = (1 - vv) * 100 + '%';
    cpEl.querySelector('[data-h]').value = h; cpEl.querySelector('[data-a]').value = Math.round(a * 100); cpEl.querySelector('[data-ao]').textContent = Math.round(a * 100) + '%';
    if (document.activeElement !== cpEl.querySelector('[data-hex]')) cpEl.querySelector('[data-hex]').value = c.toUpperCase();
    return c;
  };
  const emit = () => { const c = out(); onChange(c); cpEl.dataset.last = c; };
  const svEl = cpEl.querySelector('[data-sv]');
  svEl.onpointerdown = (e) => { const r = svEl.getBoundingClientRect(); const mv = (ev) => { sv = Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width)); vv = Math.max(0, Math.min(1, 1 - (ev.clientY - r.top) / r.height)); emit(); }; mv(e); const up = () => removeEventListener('pointermove', mv); addEventListener('pointermove', mv); addEventListener('pointerup', up, { once: true }); };
  cpEl.querySelector('[data-h]').oninput = (e) => { h = +e.target.value; emit(); };
  cpEl.querySelector('[data-a]').oninput = (e) => { a = +e.target.value / 100; emit(); };
  cpEl.querySelector('[data-hex]').oninput = (e) => { const p = parseCol(e.target.value); if (p) { [h, sv, vv] = rgb2hsv(p[0], p[1], p[2]); a = p[3]; emit(); } };
  cpEl.onclick = (e) => { const b = e.target.closest('[data-pick]'); if (b) { const p = parseCol(b.dataset.pick); if (p) { [h, sv, vv] = rgb2hsv(p[0], p[1], p[2]); a = p[3]; emit(); } } };
  cpEl.hidden = false; out();
  const r = anchor.getBoundingClientRect(), w = 264, hh = cpEl.offsetHeight || 420;
  if (innerWidth < 720) { cpEl.style.left = '8px'; cpEl.style.right = '8px'; cpEl.style.top = 'auto'; cpEl.style.bottom = '8px'; }
  else { cpEl.style.right = 'auto'; cpEl.style.bottom = 'auto'; cpEl.style.left = Math.min(innerWidth - w - 12, Math.max(12, r.left)) + 'px'; cpEl.style.top = (r.bottom + hh + 12 > innerHeight ? Math.max(12, r.top - hh - 8) : r.bottom + 8) + 'px'; }
  requestAnimationFrame(() => cpEl.classList.add('open'));
}
function closePicker() {
  if (!cpEl) return; const c = cpEl.dataset.last;
  if (c) { state.recentColours = [c, ...(state.recentColours || []).filter((x) => x !== c)].slice(0, 12); save(); delete cpEl.dataset.last; }
  cpEl.classList.remove('open'); cpEl.hidden = true;
}

/* ---------------- Export ---------------- */
function status(t) { if (t) toast(t); }
// small notices in the bottom right corner: they pop in with a sound and leave after a few seconds
function toast(text, { time = 4200 } = {}) {
  let box = $('.toasts'); if (!box) { box = document.createElement('div'); box.className = 'toasts'; box.setAttribute('role', 'status'); box.setAttribute('aria-live', 'polite'); document.body.appendChild(box); }
  const last = box.lastElementChild; if (last && last.dataset.text === text) return;
  const busy = /…$/.test(text);
  const el = document.createElement('div'); el.className = 'toast'; el.dataset.text = text;
  el.innerHTML = `<i class="toast-dot${busy ? ' busy' : ''}"></i><p>${esc(text)}</p><button type="button" aria-label="Close">×</button><b class="toast-bar" style="animation-duration:${time}ms"></b>`;
  box.appendChild(el); while (box.children.length > 3) box.firstElementChild.remove();
  // an "…in progress" notice is replaced by the next one
  [...box.children].forEach((x) => { if (x !== el && /…$/.test(x.dataset.text)) x.remove(); });
  requestAnimationFrame(() => el.classList.add('in')); if (!busy) pop();
  let timer; const close = () => { clearTimeout(timer); el.classList.remove('in'); el.classList.add('out'); setTimeout(() => el.remove(), 320); };
  const arm = () => { timer = setTimeout(close, time); };
  el.querySelector('button').onclick = close; el.onmouseenter = () => { clearTimeout(timer); el.classList.add('hold'); }; el.onmouseleave = () => { el.classList.remove('hold'); arm(); }; arm();
}
const download = (blob, name) => { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); };
async function exportOne(id, format, kind = 'png', scale = 1) {
  const f = fmt(format);
  const markup = render(id, { palette: palObj(palFor(id)), style: state.styles[id] || {}, fields: state.fields[id] || {}, brand: brandForRender(), image: photoFor(id), images: slotsFor(id) });
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
// Packs: ten posts that share one look (fonts, colours and the same kind of components)
const PACKS = [
  { name: 'Studio launch', about: 'Big photos, one wordmark, quiet type. For a studio or a brand that opens or shows new work.', pal: 'ink', fd: 'tight', ft: 'tight', fm: 'tight', ids: ['mo-crosshair', 'wordmark-photo', 'x-photo-headline', 'mo-three-words', 'year-mark', 'mo-giant-word', 'x-swiss', 'statement', 'new-work', 'launch'] },
  { name: 'Performance agency', about: 'Numbers, charts and questions in one cool blue. For results, case studies and offers.', pal: 'cobalt', fd: 'tight', ft: 'tight', fm: 'tight', ids: ['q-question', 'q-donut', 'q-percent-star', 'q-dark-metric', 'q-chrome-stat', 'q-curve', 'x-big-stat', 'x-kpi', 'x-growth', 'x-bar-chart'] },
  { name: 'Red studio', about: 'Cinematic photos with red blocks and discs. For a bold creative studio or a launch with attitude.', pal: 'crimson', fd: 'grotesk', ft: 'grotesk', fm: 'mono', ids: ['q-cinema', 'q-red-words', 'q-red-block', 'q-red-disc', 'q-services', 'q-centre-mark', 'q-scribble', 'q-cut-word', 'x-red-wall', 'y-red-profile'] },
  { name: 'Soft gradients', about: 'Haze, glow and soft colour fields. For wellness, apps and calm brands.', pal: 'violet', fd: 'sora', ft: 'sora', fm: 'dmmono', ids: ['mo-haze', 'mo-blur-word', 'mo-aura', 'mo-orb', 'mo-glow-step', 'mo-ribbon', 'mo-pills', 'z-ribbon-headline', 'z-peaks', 'x-badge'] },
  { name: 'Editorial', about: 'Big quiet headlines, dates and calm layouts. For magazines, galleries, architects and events.', pal: 'paper', fd: 'tight', ft: 'tight', fm: 'tight', ids: ['z-serif-centre', 'z-year', 'z-vertical-address', 'z-oval', 'z-date-card', 'x-zine', 'x-type-stack', 'y-numbered-quote', 'q-asterisk', 'q-trends'] },
  { name: 'Run club', about: 'Condensed type, speed and routes. For sport clubs, races and training plans.', pal: 'acid', fd: 'oswald', ft: 'barlow', fm: 'mono', ids: ['mo-route', 'mo-vertical', 'mo-echo', 'mo-ghost-stack', 'mo-cover', 'y-speed', 'y-lineup', 'court-match', 'court-result', 'x-acid'] },
  { name: 'App release', about: 'Screens, specs and dark tech blue. For product launches and feature updates.', pal: 'midnight', fd: 'space', ft: 'space', fm: 'jet', ids: ['mo-data-frame', 'mo-spec-sheet', 'mo-bracket', 'mo-app-tile', 'mo-story', 'x-app-promo', 'x-claim', 'x-profile-card', 'x-wordmark-phone', 'z-cta-black'] },
  { name: 'Strategy deck', about: 'Warm orange statements, bars and portraits. For consultants, coaches and B2B services.', pal: 'tangerine', fd: 'tight', ft: 'tight', fm: 'tight', ids: ['z-orange-statement', 'z-peach-stat', 'z-bars', 'z-split-underline', 'z-navy-photo', 'z-deep-white', 'z-portrait-card', 'x-method', 'book-call', 'team-strip'] },
  { name: 'Brand launch', about: 'Stacked wordmarks, chrome blue, grid paper and a serif card. For a new studio or product showing its identity for the first time.', pal: 'own', fd: 'wide', ft: 'tight', fm: 'tight', ids: ['r-stack-word', 'r-chrome-field', 'r-grid-mark', 'r-serif-card', 'r-split-dark', 'r-mark-portrait', 'r-chrome-word', 'r-horizon', 'r-mist', 'r-terrain'] },
  { name: 'Tips carousel', about: 'A cover, tips and a closing slide with one accent colour. For teaching what you know, one swipe at a time.', pal: 'signalblue', fd: 'tight', ft: 'tight', fm: 'tight', ids: ['r-tips-cover', 'r-pill-cloud', 'r-sun-face', 'r-tip', 'r-save-end', 'q-question', 'q-mixed', 'q-percent-star', 'x-method', 'book-call'] },
  { name: 'Grey editorial', about: 'Paper grey, quiet type and black and white photos. For studios, magazines, galleries and personal brands.', pal: 'own', fd: 'tight', ft: 'tight', fm: 'tight', ids: ['s-inspired', 's-impact', 's-free-fonts', 's-date-card', 's-selection', 's-dont-waste', 's-details', 's-lounge', 's-vertical-city', 's-delay'] },
  { name: 'Run club stories', about: 'Blurred motion, routes, stats and big italic marks. For running clubs, races and sport brands.', pal: 'own', fd: 'wide', ft: 'tight', fm: 'tight', ids: ['s-run-mark', 's-route-stats', 's-vertical-run', 's-staggered', 's-manifesto', 's-motion-word', 's-ghost-words', 's-blur-centre', 's-callouts', 's-blue-fade'] },
  { name: 'Tech partner', about: 'Speed lines, big claims, lab sheets and glowing scores. For agencies, software studios and B2B products.', pal: 'own', fd: 'tight', ft: 'tight', fm: 'tight', ids: ['s-speed', 's-white-claim', 's-blur-name', 's-macro', 's-structural', 's-blob-pattern', 's-orange-glow', 's-roi', 's-scale', 's-ring-mark'] },
  { name: 'Soft minimal', about: 'Lowercase, pills and lots of air. For personal brands, newsletters and small shops.', pal: 'frost', fd: 'tight', ft: 'tight', fm: 'tight', ids: ['q-mixed', 'q-blue-claim', 'q-wave', 'q-lowercase', 'x-soft-story', 'z-pills-lower', 'mo-quiet-card', 'mo-verse', 'x-percent', 'x-asterisk'] },
  { name: 'Shapes', about: 'One photo seen through a star, a flower, an arch or two thick bands. Bold, simple, easy to remember.', pal: 'own', fd: 'tight', ft: 'tight', fm: 'tight', ids: ['t-star', 't-flower', 't-flower-mark', 't-giant-flower', 't-stripes', 't-arch', 't-quarter', 't-half', 't-circle', 't-plus', 't-blob', 't-pills'] },
  { name: 'Swiss sheets', about: 'Thin rules, big grotesk words, one photo and a lot of white. Grain, grid paper, scan lines and a few symbols of our own.', pal: 'own', fd: 'tight', ft: 'tight', fm: 'tight', ids: ['u-pass', 'u-index', 'u-burst', 'u-cards', 'u-letter', 'u-workshop', 'u-giant-cols', 'u-house', 'u-grain-word', 'u-glitch', 'u-nodes', 'u-symbols', 'u-stamp', 'u-dot-word'] },
  { name: 'Big type', about: 'Very big numbers and words, a photo and many small parts around them: stats, events, calls, launches, teams and routes.', pal: 'own', fd: 'tight', ft: 'tight', fm: 'tight', ids: ['v-stat-split', 'v-stat-band', 'v-event-day', 'v-event-ticket', 'v-call-slots', 'v-num-photo', 'v-team-grid', 'v-spec-table', 'v-launch-giant', 'v-car-number', 'v-route-map', 'v-bnp-chart', 'v-grad-word', 'v-max-type'] },
].map((p) => ({ ...p, ids: p.ids.filter((id) => getTemplate(id)) }));
const packOf = () => PACKS.find((p) => p.name === state.set) || PACKS[0];
const packLook = (pk) => ({ palette: state.setPal === 'brand' ? 'brand' : pk.pal, style: { fd: pk.fd, ft: pk.ft, fm: pk.fm } });
function drawSets(animate) {
  const pk = packOf(); state.set = pk.name;
  $('[data-sets]').innerHTML = PACKS.map((p) => `<button type="button" class="chip" data-set="${esc(p.name)}" aria-pressed="${p === pk}">${esc(p.name)}<span>${p.ids.length}</span></button>`).join('');
  $('[data-pack-about]').innerHTML = `<h2>${esc(pk.name)}</h2><p>${esc(pk.about)}</p>`;
  dd('set-format', formatItems(), state.setFormat, (v) => { state.setFormat = v; save(); drawSets(true); });
  dd('set-pal', [{ value: 'pack', label: 'Pack colours' }, { value: 'brand', label: 'My brand colours' }], state.setPal === 'brand' ? 'brand' : 'pack', (v) => { state.setPal = v; save(); drawSets(true); });
  const look = packLook(pk), grid = $('[data-set-grid]');
  const paint = () => { grid.innerHTML = pk.ids.map((id, i) => `<li style="--i:${i}"><a class="card" href="#/editor/${id}" data-pack-open="${id}">${ad(id, { format: state.setFormat, ...look })}<span class="name">${esc(getTemplate(id).name)}<span>${esc(getTemplate(id).cat)}</span></span></a></li>`).join(''); };
  if (!animate || matchMedia('(prefers-reduced-motion: reduce)').matches) return paint();
  grid.classList.add('is-swapping');
  setTimeout(() => { paint(); requestAnimationFrame(() => requestAnimationFrame(() => grid.classList.remove('is-swapping'))); }, 220);
}
$('[data-sets]').addEventListener('click', (e) => { const b = e.target.closest('[data-set]'); if (!b) return; state.set = b.dataset.set; save(); click('tap'); drawSets(true); });
// opening a post from a pack carries the pack's colours, fonts and format into the editor
$('[data-set-grid]').addEventListener('click', (e) => { const a = e.target.closest('[data-pack-open]'); if (!a) return; const id = a.dataset.packOpen, pk = packOf(), look = packLook(pk); state.pal[id] = look.palette; Object.assign(state.styles[id] ||= {}, look.style); state.format = state.setFormat; save(); });
$('[data-set-export]').onclick = async () => { const pk = packOf(), look = packLook(pk); status(''); for (const id of pk.ids) { const prev = [state.pal[id], state.styles[id]]; state.pal[id] = look.palette; state.styles[id] = { ...(state.styles[id] || {}), ...look.style }; await exportOne(id, state.setFormat); [state.pal[id], state.styles[id]] = prev; await new Promise((r) => setTimeout(r, 350)); } };
$('[data-set-save]').onclick = () => {
  const pk = packOf(), look = packLook(pk), f = state.setFormat;
  const pr = { id: uid(), name: pk.name, posts: pk.ids.map((id) => ({ id: uid(), tpl: id, format: f, custom: { ...state.custom }, palette: look.palette, style: { ...JSON.parse(JSON.stringify(state.styles[id] || {})), ...look.style }, fields: { ...(state.fields[id] || {}) }, image: photoFor(id), images: [...slotsFor(id)] })) };
  state.projects.push(pr); state.project = pr.id; save(); click('ok'); location.hash = '#/projects'; toast(`Saved “${pk.name}” as a project with ${pr.posts.length} posts.`);
};

/* ---------------- Brands ---------------- */
function drawBrands() {
  const b = brand();
  $('[data-brand-list]').innerHTML = state.brands.map((x) => `<li><button type="button" class="brand-card" data-bid="${x.id}" aria-pressed="${x.id === b.id}"><i style="background:linear-gradient(135deg,${x.colors.bg} 50%,${x.colors.accent} 50%)">${x.useLogo ? (x.logo ? `<img src="${esc(x.logo)}" alt="">` : `<span class="bmark">${DEFAULT_MARK}</span>`) : esc(x.short)}</i><span>${esc(x.name)}</span></button></li>`).join('') + '<li><button type="button" class="brand-card add" data-bid="+"><i>+</i><span>New brand</span></button></li>';
  const form = $('[data-kit]');
  for (const k of ['name', 'short', 'handle', 'url', 'place']) form.elements[k].value = b[k] || '';
  $('[data-bcols]').innerHTML = [['bg', 'Background'], ['ink', 'Text'], ['accent', 'Accent'], ['g1', 'Gradient 1'], ['g2', 'Gradient 2']].map(([k, l]) => { const v = b.colors[k] || '#000000'; return `<button type="button" class="cbtn" data-bcol="${k}" data-v="${esc(v)}"><i style="--c:${esc(v)}"></i><span>${l}</span><em>${esc(String(v).toUpperCase())}</em></button>`; }).join('');
  $('[data-logo-remove]').hidden = !b.logo; $('[data-logo-prev]').innerHTML = b.logo ? `<img src="${esc(b.logo)}" alt="Logo">` : `<span class="bmark" title="Studio mark, used until you import your own logo">${DEFAULT_MARK}</span>`;
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
  $('[data-kit-preview]').innerHTML = ['x-lime-statement', 'mo-aura', 'x-blue-statement', 'y-letter-window'].map((id) => ad(id, { format: 'square', palette: 'brand' })).join('');
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
$('[data-logo-remove]').onclick = async () => { const b = brand(); if (!b.logo) return; if (!(await ask('Remove the logo?', `The logo of “${b.name}” is deleted from this brand. This cannot be undone.`))) return; b.logo = ''; b.useLogo = false; save(); drawTop(); drawBrands(); };
$('[data-brand-delete]').onclick = () => {
  if (state.brands.length < 2) return;
  if (!confirmDelete()) return;
  state.brands = state.brands.filter((x) => x.id !== brand().id); state.brand = state.brands[0].id; save(); drawTop(); drawBrands();
};
function confirmDelete() { const btn = $('[data-brand-delete]'); if (btn.dataset.armed) { delete btn.dataset.armed; btn.textContent = 'Delete this brand'; return true; } btn.dataset.armed = '1'; btn.textContent = 'Click again to delete'; setTimeout(() => { delete btn.dataset.armed; btn.textContent = 'Delete this brand'; }, 3000); return false; }


/* ---------------- click ripple, button press, theme ---------------- */
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const fxOn = () => (state ? state.fx !== false : true) && !reduced();
document.addEventListener('pointerdown', (e) => {
  if (!fxOn() || e.button > 0) return;
  const r = document.createElement('span'); r.className = 'ripple'; r.style.left = e.clientX + 'px'; r.style.top = e.clientY + 'px';
  document.body.appendChild(r); setTimeout(() => r.remove(), 700);
});
function applyTheme(t) {
  try { localStorage.setItem('brandit.theme', t); } catch { /* blocked */ }
  document.documentElement.dataset.theme = t === 'system' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : t;
  $$('[data-theme-v]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.themeV === t)));
}
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if ((localStorage.getItem('brandit.theme') || 'system') === 'system') applyTheme('system'); });
document.documentElement.classList.toggle('no-fx', false);

/* ---------------- settings sheet ---------------- */
function openSettings() {
  const sh = $('[data-settings]'), bg = $('[data-sheet-bg]');
  $('[data-account]').textContent = `${state.name} · ${user}`;
  $('[data-toggle="sound"]').setAttribute('aria-checked', String(!state.muted));
  $('[data-toggle="fx"]').setAttribute('aria-checked', String(state.fx !== false));
  applyTheme(localStorage.getItem('brandit.theme') || 'system');
  sh.hidden = false; bg.hidden = false; requestAnimationFrame(() => { sh.classList.add('open'); bg.classList.add('open'); });
  $('[data-close]').focus(); click('tap');
}
function closeSettings() {
  const sh = $('[data-settings]'), bg = $('[data-sheet-bg]');
  sh.classList.remove('open'); bg.classList.remove('open');
  setTimeout(() => { sh.hidden = true; bg.hidden = true; }, 380);
}
$('[data-close]').onclick = closeSettings; $('[data-sheet-bg]').onclick = closeSettings;
addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('[data-settings]').hidden) closeSettings(); });
$('[data-settings]').addEventListener('click', (e) => {
  const t = e.target.closest('[data-toggle]'), th = e.target.closest('[data-theme-v]');
  if (t) {
    if (t.dataset.toggle === 'sound') state.muted = !state.muted;
    if (t.dataset.toggle === 'fx') { state.fx = state.fx === false; document.documentElement.classList.toggle('no-fx', state.fx === false); }
    t.setAttribute('aria-checked', String(t.dataset.toggle === 'sound' ? !state.muted : state.fx !== false));
    save(); click('tap');
  }
  if (th) { applyTheme(th.dataset.themeV); click('tap'); }
});
$('[data-signout]').onclick = signOut;
function signOut() { localStorage.removeItem(LS.session); location.reload(); }

/* ---------------- backup and restore ---------------- */
function backup() {
  const data = { app: 'BrandIt Studio', version: 1, exported: new Date().toISOString(), account: { email: user, name: state.name }, theme: localStorage.getItem('brandit.theme') || 'system', data: state, photo: image };
  const blob = new Blob([JSON.stringify(data, null, 1)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = `brandit-backup-${(state.name || 'account').replace(/\W+/g, '-')}-${new Date().toISOString().slice(0, 10)}.json`; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  const n = $('[data-backup-note]'); if (n) n.textContent = `Saved: ${state.brands.length} brands, ${Object.keys(state.fields).length} edited templates, ${state.userFonts.length} fonts${image ? ', the current photo' : ''}.`;
  click('ok');
}
$('[data-backup]').onclick = backup;
$('[data-restore]').onchange = async (e) => {
  const f = e.target.files[0]; if (!f) return; const note = $('[data-backup-note]');
  try {
    const j = JSON.parse(await f.text());
    if (j.app !== 'BrandIt Studio' || !j.data || !Array.isArray(j.data.brands)) throw new Error('not a BrandIt backup');
    const users = load(LS.users, {}); users[user].data = { ...freshState(state.name), ...j.data, name: state.name };
    if (!store(LS.users, users)) throw new Error('this browser has no room left for it');
    if (j.theme) applyTheme(j.theme);
    image = j.photo || image;
    note.textContent = `Restored ${j.data.brands.length} brands from ${new Date(j.exported).toLocaleDateString()}.`;
    click('ok'); start(user, true);
  } catch (err) { note.textContent = 'Could not restore: ' + err.message + '.'; }
};

/* ---------------- 3D: sign-in orbit and the loading deck ---------------- */
const DECK = ['stat-poster', 'year-mark', 'wordmark-photo', 'book-call', 'mo-bracket'];
const SHOW = ['mo-crosshair', 'x-lime-statement', 'mo-aura', 'y-focus-window', 'x-big-stat', 'z-colour-cards', 'mo-ribbon', 'y-stacked-accent'];
const thumb = (id, im) => `<div class="ad" style="--ar:4/5">${render(id, { palette: 'own', image: im })}</div>`;
const rnd = (a) => (a && a.length ? a[Math.floor(Math.random() * a.length)] : undefined);
function drawOrbit() {
  const o = $('[data-orbit]'); if (!o || o.childElementCount) return;
  builtinPool().then((ph) => { o.innerHTML = SHOW.map((id, i) => `<div class="orb-card" style="--i:${i};--n:${SHOW.length}">${thumb(id, rnd(ph))}</div>`).join(''); });
}
function playLoader(done) {
  if (!fxOn()) return done();
  const l = $('[data-loader]');
  // five different photos, never the same one twice
  const src = [...new Set(pool.length ? pool : builtin)];
  for (let i = src.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [src[i], src[j]] = [src[j], src[i]]; }
  // centre card first, then the inner pair, then the outer pair
  const order = [2, 1, 3, 0, 4];
  const tilt = [-9, -4.5, 0, 4.5, 9].map((t) => t + (Math.random() * 3 - 1.5));
  $('[data-deck]').innerHTML = DECK.map((id, i) => `<div class="deck-card" style="--i:${order.indexOf(i)};--d:${Math.abs(i - 2)};--s:${Math.sign(i - 2)};--t:${tilt[i].toFixed(1)}deg;z-index:${5 - Math.abs(i - 2)}"><div class="deck-in">${thumb(id, src.length ? src[i % src.length] : undefined)}</div></div>`).join('');
  document.documentElement.classList.add('is-loading');
  l.hidden = false; requestAnimationFrame(() => l.classList.add('run'));
  // draw the studio behind the loader first, then fade the loader away once it has settled
  setTimeout(done, 2000);
  setTimeout(() => l.classList.add('out'), 2350);
  setTimeout(() => { l.hidden = true; l.classList.remove('run', 'out'); document.documentElement.classList.remove('is-loading'); }, 2950);
}

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
async function start(email, quiet) {
  const users = load(LS.users, {});
  if (!users[email]) { $('#auth').hidden = false; authMode('in'); drawOrbit(); return; }
  user = email;
  state = { ...freshState(users[email].name), ...users[email].data };
  state.brands = (state.brands?.length ? state.brands : [newBrand()]).map((b) => ({ ...newBrand(), ...b, colors: { ...newBrand().colors, ...(b.colors || {}) }, fonts: { ...newBrand().fonts, ...(b.fonts || {}) } }));
  state.brand ||= state.brands[0].id;
  // brands without an uploaded logo start with the studio mark (once)
  if (!state.fontsV2) { Object.values(state.styles || {}).forEach((st) => { if (st && st.sf === 1) { delete st.fd; delete st.ft; delete st.fm; delete st.sf; } }); state.fontsV2 = true; }
  if (!state.markV1) { state.brands.forEach((b) => { if (!b.logo) b.useLogo = true; }); state.markV1 = true; }
  if (!Array.isArray(state.projects) || !state.projects.length) state.projects = [{ id: uid(), name: 'My first series', posts: [] }];
  installFonts();
  histLoad();
  state.userFonts.forEach((f) => { fetch(f.data).then((r) => r.arrayBuffer()).then((buf) => document.fonts.add(new FontFace(f.name, buf))).catch(() => {}); });
  document.documentElement.classList.toggle('no-fx', state.fx === false);
  pool = await poolLoad(); ownPool = pool.length > 0; if (!ownPool) pool = await builtinPool(); reshuffle();
  const go = () => { $('#auth').hidden = true; $('#app').hidden = false; $('[data-dock]').hidden = false; drawTop(); show(); };
  if (quiet) go(); else playLoader(go);
}
const session = load(LS.session, null);
if (session) start(session); else { $('#auth').hidden = false; authMode('in'); drawOrbit(); }

/* guide checklist: round checks you can tick */
document.addEventListener('click', (e) => { const li = e.target.closest('[data-checks] li'); if (!li) return; li.setAttribute('aria-checked', String(li.getAttribute('aria-checked') !== 'true')); click('tap'); const all = $$('[data-checks] li').every((x) => x.getAttribute('aria-checked') === 'true'); $('[data-checks-done]').classList.toggle('is-open', all); });
document.addEventListener('keydown', (e) => { const li = e.target.closest?.('[data-checks] li'); if (li && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); li.click(); } });

/* export menu */
const xbtn = $('[data-xbtn]'), xlist = $('[data-xlist]');
const xopen = (v) => { xlist.hidden = !v; xbtn.setAttribute('aria-expanded', String(v)); if (v) { const f = fmt(state.format); $('[data-xs="png"]').textContent = `${f.w} × ${f.h}`; $('[data-xs="png2"]').textContent = `${f.w * 2} × ${f.h * 2}`; xlist.querySelector('button')?.focus({ preventScroll: true }); click('key'); } };
xbtn.addEventListener('click', () => xopen(xlist.hidden));
xlist.addEventListener('click', (e) => { if (e.target.closest('[data-export]')) xopen(false); });
document.addEventListener('pointerdown', (e) => { if (!xlist.hidden && !e.target.closest('.xmenu')) xopen(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !xlist.hidden) { xopen(false); xbtn.focus(); } });
// the save and export bar sits above the variants on wide screens and under the preview on narrow ones
const edMq = matchMedia('(max-width: 1100px)');
const placeBar = () => { const bar = $('.ed-bar'); (edMq.matches ? $('.stage') : $('.variants')).insertAdjacentElement(edMq.matches ? 'beforeend' : 'afterbegin', bar); };
edMq.addEventListener('change', placeBar); placeBar();

/* loader cards lean towards the pointer */
$('[data-deck]').addEventListener('pointermove', (e) => {
  const c = e.target.closest('.deck-card'); if (!c) return;
  const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
  c.style.setProperty('--ry', (x * 22).toFixed(1) + 'deg'); c.style.setProperty('--rx', (-y * 22).toFixed(1) + 'deg');
});
$('[data-deck]').addEventListener('pointerout', (e) => { const c = e.target.closest('.deck-card'); if (c && !c.contains(e.relatedTarget)) { c.style.removeProperty('--rx'); c.style.removeProperty('--ry'); } });

document.addEventListener('pointerdown', (e) => { const m = $('[data-proj-menu]'); if (m && !m.hidden && !e.target.closest('.proj-set')) { m.hidden = true; $('[data-proj-set]').setAttribute('aria-expanded', 'false'); } });
/* hold a post and drag it to a new place; the others slide aside.
   The slots never move during a drag (same number of equal cells), so the target is simply the slot under the pointer.
   A copy follows the pointer while the original stays in the grid as the empty place it will drop into. */
let dndDone = null, dndRedraw = 0;
$('[data-proj-grid]').addEventListener('pointerdown', (e) => {
  if (dndDone) dndDone(); clearTimeout(dndRedraw);
  const li = e.target.closest('[data-post]'); if (!li || e.button !== 0 || e.target.closest('button')) return;
  const grid = li.parentElement, pr = projectOf(state.project); if (!pr || pr.posts.length < 2) return;
  e.preventDefault();
  const sx = e.clientX, sy = e.clientY; let ghost = null, raf = 0, last = e, slots = null, gx = 0, gy = 0;
  const items = () => [...grid.children].filter((x) => x.dataset.post);
  const docRect = (el) => { const r = el.getBoundingClientRect(); return { l: r.left + scrollX, t: r.top + scrollY, w: r.width, h: r.height }; };
  const start = () => {
    items().forEach((x) => x.getAnimations().forEach((a) => a.cancel()));
    slots = items().map(docRect);
    const r = li.getBoundingClientRect(); gx = sx - r.left; gy = sy - r.top;
    ghost = li.cloneNode(true); ghost.removeAttribute('data-post'); ghost.className = 'post post-ghost';
    Object.assign(ghost.style, { width: r.width + 'px', height: r.height + 'px', left: '0px', top: '0px', transform: `translate(${r.left}px, ${r.top}px)` });
    document.body.appendChild(ghost); li.classList.add('is-placeholder'); grid.classList.add('sorting'); document.body.classList.add('is-sorting');
  };
  const place = () => {
    raf = 0; if (!ghost) return;
    const x = last.clientX, y = last.clientY;
    ghost.style.transform = `translate(${x - gx}px, ${y - gy}px) rotate(1.5deg) scale(1.03)`;
    // the slot nearest to the pointer, measured in page coordinates
    const px = x + scrollX, py = y + scrollY;
    let best = -1, bd = Infinity;
    slots.forEach((s, i) => { const inside = px >= s.l && px <= s.l + s.w && py >= s.t && py <= s.t + s.h; const d = inside ? -1 : Math.hypot(px - (s.l + s.w / 2), py - (s.t + s.h / 2)); if (d < bd) { bd = d; best = i; } });
    const list = items(), from = list.indexOf(li);
    if (best < 0 || best === from) return;
    const before = new Map(list.map((n) => [n, n.getBoundingClientRect()]));
    const ref = list[best]; grid.insertBefore(li, best > from ? ref.nextSibling : ref);
    items().forEach((n) => {
      if (n === li) return;
      const a = before.get(n), b = n.getBoundingClientRect(); const dx = a.left - b.left, dy = a.top - b.top;
      if (!dx && !dy) return;
      n.getAnimations().forEach((an) => an.cancel());
      const b2 = n.getBoundingClientRect();
      n.animate([{ transform: `translate(${a.left - b2.left}px, ${a.top - b2.top}px)` }, { transform: 'none' }], { duration: 240, easing: 'cubic-bezier(.2,.8,.2,1)' });
    });
    // keep the page moving when the pointer is near the top or bottom
  };
  let scrollTimer = 0;
  const edgeScroll = () => { if (!ghost) return; const y = last.clientY, m = 48; const v = y < m ? -(m - y) / 4 : y > innerHeight - m ? (y - (innerHeight - m)) / 4 : 0; if (v) { scrollBy(0, v); if (!raf) raf = requestAnimationFrame(place); } scrollTimer = requestAnimationFrame(edgeScroll); };
  const move = (ev) => {
    last = ev;
    if (!ghost) { if (Math.hypot(ev.clientX - sx, ev.clientY - sy) < 6) return; start(); scrollTimer = requestAnimationFrame(edgeScroll); }
    if (!raf) raf = requestAnimationFrame(place);
  };
  const up = () => {
    removeEventListener('pointermove', move); removeEventListener('pointercancel', up); cancelAnimationFrame(scrollTimer);
    if (!ghost) return;
    cancelAnimationFrame(raf);
    const r = li.getBoundingClientRect(), g = ghost; ghost = null;
    g.style.transition = 'transform .28s cubic-bezier(.2,.8,.2,1)'; g.style.transform = `translate(${r.left}px, ${r.top}px)`;
    // the copy settles into the outlined place, then the real card shows again; a new drag finishes this at once
    let t = 0; const done = () => { clearTimeout(t); g.remove(); li.classList.remove('is-placeholder'); grid.classList.remove('sorting'); document.body.classList.remove('is-sorting'); li.animate([{ opacity: .6 }, { opacity: 1 }], { duration: 180 }); dndDone = null; };
    dndDone = done; t = setTimeout(done, 280);
    const order = items().map((x) => x.dataset.post);
    const changed = order.some((id, i) => pr.posts[i]?.id !== id);
    pr.posts.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id)); save();
    if (changed) { click('ok'); if (pr.posts.some((p) => p.style?.pager?.kind && p.style.pager.kind !== 'none')) dndRedraw = setTimeout(() => { if (!dndDone && !document.querySelector('.post-ghost')) drawProjects(); }, 700); }
  };
  addEventListener('pointermove', move); addEventListener('pointerup', up, { once: true }); addEventListener('pointercancel', up, { once: true });
});

$('[data-bcols]').addEventListener('click', (e) => {
  const cb = e.target.closest('[data-bcol]'); if (!cb) return; const k = cb.dataset.bcol;
  openPicker(cb, cb.dataset.v, (v) => { const b = brand(); b.colors[k] = v; cb.dataset.v = v; cb.querySelector('i').style.setProperty('--c', v); cb.querySelector('em').textContent = v.toUpperCase(); save(); drawKitPreview(); });
});

/* two fingers on the artboard pinch to zoom around their midpoint */
{
  const pts = new Map(); let pinch = null;
  const cv = $('[data-canvas]');
  cv.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'touch' || !e.target.closest('.cv-scroll')) return; pts.set(e.pointerId, [e.clientX, e.clientY]); if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), z: zoom }; } }, true);
  addEventListener('pointermove', (e) => { if (!pts.has(e.pointerId)) return; pts.set(e.pointerId, [e.clientX, e.clientY]); if (pinch && pts.size === 2) { const [a, b] = [...pts.values()]; const d = Math.hypot(a[0] - b[0], a[1] - b[1]); setZoom(pinch.z * d / pinch.d, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2); } });
  const end = (e) => { pts.delete(e.pointerId); if (pts.size < 2) pinch = null; };
  addEventListener('pointerup', end); addEventListener('pointercancel', end);
}

/* ---------------- layers ---------------- */
let layerSel = null, photoSel = null;
function markPhoto() { const art = $('[data-canvas] .cv-art'); if (!art) return; art.classList.toggle('photo-picked', layerSel === 'photo' && photoSel === 'photo'); $$('[data-canvas] .bi-media.media-picked').forEach((n) => n.classList.remove('media-picked')); if (layerSel === 'photo' && photoSel?.startsWith('photo:')) $$('[data-canvas] .bi-media').filter((n) => srcKey(n.getAttribute('src')) === photoSel.slice(6)).forEach((n) => n.classList.add('media-picked')); }
const layerKeys = () => {
  const tpl = getTemplate(state.tpl), st = styleOf(state.tpl);
  const texts = $$('[data-canvas] .bi-ad [data-n]').map((n) => 't' + n.dataset.n);
  const keys = [...(hasPhoto(tpl) ? ['photo'] : []), ...texts, ...(st.extra || []).map((x) => 'x:' + x.id)];
  const ord = (st.layers?.order || []).filter((k) => keys.includes(k));
  keys.forEach((k) => { if (!ord.includes(k)) ord.push(k); });
  return ord; // back to front
};
const IC = {
  eye: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
  off: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6C3.8 8.4 2 12 2 12s3.6 7 10 7a9.6 9.6 0 0 0 4.4-1"/></svg>',
  up: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
  down: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"/></svg>',
  text: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6V4h14v2M12 4v16M9 20h6"/></svg>',
  photo: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5L5 20"/></svg>',
  trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/></svg>',
};
function layerName(k) {
  if (k === 'photo') return 'Template photo';
  if (k.startsWith('x:')) { const i = (styleOf(state.tpl).extra || []).findIndex((x) => 'x:' + x.id === k); return `Image ${i + 1}`; }
  const el = $(`[data-canvas] .bi-ad [data-n="${k.slice(1)}"]`); const t = (el ? el.innerHTML.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '') : '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  return t ? (t.length > 30 ? t.slice(0, 29) + '…' : t) : `Text ${+k.slice(1) + 1}`;
}
function drawLayers() {
  const box = $('[data-layers]'); if (!box || !state?.tpl) return;
  const st = styleOf(state.tpl), keys = layerKeys(), hide = st.layers?.hide || {};
  if (layerSel && !keys.includes(layerSel)) layerSel = null;
  box.innerHTML = keys.slice().reverse().map((k, i, a) => {
    const x = k.startsWith('x:') && (st.extra || []).find((q) => 'x:' + q.id === k);
    const ic = x ? `<img src="${esc(x.src)}" alt="">` : k === 'photo' ? IC.photo : IC.text;
    return `<li class="layer${k === layerSel ? ' on' : ''}${hide[k] ? ' off' : ''}" data-layer="${k}"><span class="lic">${ic}</span><span class="ln">${esc(layerName(k))}</span>
      <button type="button" class="lb" data-lvis="${k}" aria-label="${hide[k] ? 'Show' : 'Hide'} layer" title="${hide[k] ? 'Show' : 'Hide'}">${hide[k] ? IC.off : IC.eye}</button>
      <button type="button" class="lb" data-lmove="${k},1" aria-label="Bring forward" title="Bring forward"${i === 0 ? ' disabled' : ''}>${IC.up}</button>
      <button type="button" class="lb" data-lmove="${k},-1" aria-label="Send backward" title="Send backward"${i === a.length - 1 ? ' disabled' : ''}>${IC.down}</button></li>`;
  }).join('');
  drawLayerProps();
}
const rng = (attr, k, label, min, max, step, v) => `<label class="range"><span>${label}</span><input type="range" min="${min}" max="${max}" step="${step}" value="${v}" ${attr}="${k}"><em>${Math.round(((v - min) / (max - min)) * 100)}</em></label>`;
function drawLayerProps() {
  const box = $('[data-layer-props]'); if (!box) return;
  const st = styleOf(state.tpl), k = layerSel, op = st.layers?.op || {};
  if (!k) { box.innerHTML = ''; return; }
  const order = `<div class="row2"><button type="button" class="btn btn--line" data-lto="${k},front">Bring to front</button><button type="button" class="btn btn--line" data-lto="${k},back">Send to back</button></div>`;
  if (k === 'photo') { box.innerHTML = `<p class="label">Template photo</p>${order}`; return; }
  if (k.startsWith('t')) {
    box.innerHTML = `<p class="label">${esc(layerName(k))}</p><div class="group">${rng('data-lop', k, 'Opacity', 0, 1, .01, op[k] ?? 1)}</div>${order}`;
    return;
  }
  const x = (st.extra || []).find((q) => 'x:' + q.id === k); if (!x) { box.innerHTML = ''; return; }
  box.innerHTML = `<p class="label">${esc(layerName(k))}</p><div class="group">${rng('data-xf', 'w', 'Size', 5, 150, 1, x.w ?? 40)}${rng('data-xf', 'r', 'Rotation', -180, 180, 1, x.r || 0)}${rng('data-xf', 'rad', 'Corners', 0, 50, 1, x.rad || 0)}${rng('data-xf', 'op', 'Opacity', 0, 1, .01, x.op ?? 1)}${rng('data-xf', 'br', 'Brightness', .2, 2, .01, x.br ?? 1)}${rng('data-xf', 'ct', 'Contrast', .2, 2, .01, x.ct ?? 1)}${rng('data-xf', 'sat', 'Saturation', 0, 2, .01, x.sat ?? 1)}${rng('data-xf', 'bl', 'Blur', 0, 6, .1, x.bl ?? 0)}</div>${order}
    <div class="row2"><label class="btn btn--line file-btn">Replace<input type="file" accept="image/*" data-xrep="${x.id}" hidden></label><button type="button" class="btn btn--danger lb-del" data-xdel="${x.id}">${IC.trash}Delete</button></div>`;
}
const setOrder = (fn) => { const st = styleOf(state.tpl), o = layerKeys(); fn(o); st.layers = { ...(st.layers || {}), order: o }; save(); drawLayers(); soon(); };
$('[data-pane="layers"]').addEventListener('click', async (e) => {
  const st = styleOf(state.tpl);
  const vis = e.target.closest('[data-lvis]'); if (vis) { const k = vis.dataset.lvis; st.layers ||= {}; st.layers.hide ||= {}; if (st.layers.hide[k]) delete st.layers.hide[k]; else st.layers.hide[k] = true; save(); drawLayers(); soon(); return; }
  const mv = e.target.closest('[data-lmove]'); if (mv) { const [k, d] = mv.dataset.lmove.split(','); setOrder((o) => { const i = o.indexOf(k), j = i + +d; if (j < 0 || j >= o.length) return; [o[i], o[j]] = [o[j], o[i]]; }); click('tap'); return; }
  const to = e.target.closest('[data-lto]'); if (to) { const [k, w] = to.dataset.lto.split(','); setOrder((o) => { o.splice(o.indexOf(k), 1); if (w === 'front') o.push(k); else o.unshift(k); }); click('tap'); return; }
  const del = e.target.closest('[data-xdel]'); if (del) { if (!(await ask('Delete this image?', 'It is removed from this post. This cannot be undone.'))) return; st.extra = (st.extra || []).filter((x) => x.id !== del.dataset.xdel); if (st.layers?.order) st.layers.order = st.layers.order.filter((k) => k !== 'x:' + del.dataset.xdel); layerSel = null; save(); drawLayers(); soon(); return; }
  const rs = e.target.closest('[data-lreset]'); if (rs) { delete st.photoFx; if (st.layers?.op) delete st.layers.op.photo; save(); drawLayers(); soon(); return; }
  const li = e.target.closest('[data-layer]'); if (li) { layerSel = li.dataset.layer; picked = layerSel.startsWith('t') ? layerSel.slice(1) : null; photoSel = layerSel === 'photo' ? 'photo' : null; drawLayers(); drawCanvas(); }
});
$('[data-pane="layers"]').addEventListener('input', (e) => {
  const t = e.target, st = styleOf(state.tpl), v = +t.value;
  const em = t.parentElement.querySelector('em'); if (em) em.textContent = Math.round(((v - +t.min) / (+t.max - +t.min)) * 100);
  if (t.dataset.lfx) { if (t.dataset.lfx === 'op') { st.layers ||= {}; st.layers.op ||= {}; st.layers.op.photo = v; } else (st.photoFx ||= {})[t.dataset.lfx] = v; save(); soon(); }
  if (t.dataset.lop) { st.layers ||= {}; st.layers.op ||= {}; st.layers.op[t.dataset.lop] = v; save(); soon(); }
  if (t.dataset.xf) { const x = (st.extra || []).find((q) => 'x:' + q.id === layerSel); if (x) { x[t.dataset.xf] = v; save(); soon(); } }
});
$('[data-pane="layers"]').addEventListener('change', async (e) => {
  const t = e.target; if (!t.dataset.xrep || !t.files[0]) return;
  const x = (styleOf(state.tpl).extra || []).find((q) => q.id === t.dataset.xrep); if (!x) return;
  x.src = await shrink(await readFile(t.files[0]), 1600); save(); drawLayers(); soon(); toast('Image replaced.');
});
// add a picture on top of any template, from the Layers tab or the Photo tab
document.addEventListener('change', async (e) => {
  const t = e.target; if (!t.matches('[data-add-img]') || !t.files[0]) return;
  const src = await shrink(await readFile(t.files[0]), 1600); t.value = '';
  const st = styleOf(state.tpl), id = uid(); (st.extra ||= []).push({ id, src, x: 50, y: 50, w: 40 });
  layerSel = 'x:' + id; picked = null; save(); click('ok');
  { $$('[data-tab]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tab === 'layers'))); $$('[data-pane]').forEach((pn) => { pn.hidden = pn.dataset.pane !== 'layers'; }); }
  drawEditor(); toast('Image added. Drag it in the preview to place it.');
});

document.addEventListener('click', (e) => { const m = e.target.closest('[data-pals-more]'); if (!m) return; const box = m.parentElement; const open = !box.classList.contains('open'); box.classList.toggle('open', open); m.setAttribute('aria-expanded', String(open)); click('tap'); });

/* library cards lean towards the pointer; only the card turns, the design inside stays as it is */
document.addEventListener('pointermove', (e) => {
  const card = e.target.closest?.('.grid a.card'); if (!card || document.documentElement.classList.contains('no-fx') || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ad = card.querySelector('.ad'); if (!ad) return; const r = ad.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
  ad.style.setProperty('--tx', (-y * 10).toFixed(2) + 'deg'); ad.style.setProperty('--ty', (x * 12).toFixed(2) + 'deg'); card.classList.add('tilt');
}, { passive: true });
document.addEventListener('pointerout', (e) => { const card = e.target.closest?.('.grid a.card'); if (card && !card.contains(e.relatedTarget)) { card.classList.remove('tilt'); const ad = card.querySelector('.ad'); ad?.style.removeProperty('--tx'); ad?.style.removeProperty('--ty'); } });

/* layers live in the right column on wide screens (switch with the variants), in the left tabs on narrow ones */
function placeLayers() {}
matchMedia('(max-width: 1100px)').addEventListener('change', placeLayers); placeLayers();
function setRTab() { return; $$('[data-rtab]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.rtab === k))); $$('[data-rpane]').forEach((p) => { p.hidden = p.dataset.rpane !== k; }); }
document.addEventListener('click', (e) => { const b = e.target.closest('[data-rtab]'); if (!b) return; state.rtab = b.dataset.rtab; save(); setRTab(state.rtab); click('tap'); });

/* ---------------- undo and redo, kept for good in this browser (IndexedDB) ---------------- */
var hist = { undo: [], redo: [] };
var lastSnap = null, histTimer = 0, restoring = false, histDb = null;
function hdb() { return (histDb ||= new Promise((res, rej) => { const r = indexedDB.open('brandit-history', 1); r.onupgradeneeded = () => r.result.createObjectStore('h'); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); })); }
async function hput() { try { const db = await hdb(); db.transaction('h', 'readwrite').objectStore('h').put({ undo: hist.undo, redo: hist.redo }, user); } catch { /* private mode */ } }
async function histLoad() { try { const db = await hdb(); const v = await new Promise((res) => { const q = db.transaction('h').objectStore('h').get(user); q.onsuccess = () => res(q.result); q.onerror = () => res(null); }); hist = v && Array.isArray(v.undo) ? { undo: v.undo, redo: v.redo || [] } : { undo: [], redo: [] }; } catch { hist = { undo: [], redo: [] }; } histButtons(); }
function snapOf(id) { return JSON.stringify({ tpl: id, style: state.styles[id] || {}, fields: state.fields[id] || {}, pal: state.pal[id] ?? null, format: state.format, custom: state.custom }); }
function histMark() { if (state?.tpl) lastSnap = snapOf(state.tpl); }
function histFlush() {
  clearTimeout(histTimer); histTimer = 0;
  if (restoring || !state?.tpl || $('#editor').hidden) return;
  const cur = snapOf(state.tpl);
  if (lastSnap && cur !== lastSnap) { hist.undo.push(lastSnap); if (hist.undo.length > 150) hist.undo.shift(); hist.redo = []; hput(); histButtons(); }
  lastSnap = cur;
}
function histTrack() { if (restoring) return; clearTimeout(histTimer); histTimer = setTimeout(histFlush, 350); }
function histButtons() { const u = $('[data-undo]'), r = $('[data-redo]'); if (u) u.disabled = !hist.undo.length; if (r) r.disabled = !hist.redo.length; }
function histApply(raw) {
  const p = JSON.parse(raw); restoring = true;
  state.styles[p.tpl] = p.style; state.fields[p.tpl] = p.fields; if (p.pal == null) delete state.pal[p.tpl]; else state.pal[p.tpl] = p.pal;
  if (p.format) state.format = p.format; if (p.custom) state.custom = p.custom;
  save(); restoring = false; lastSnap = snapOf(p.tpl); hput();
  if (state.tpl !== p.tpl) location.hash = '#/editor/' + p.tpl; else drawEditor();
  histButtons();
}
function undo() { histFlush(); const prev = hist.undo.pop(); if (!prev) return; hist.redo.push(snapOf(JSON.parse(prev).tpl)); histApply(prev); click('tap'); }
function redo() { histFlush(); const nxt = hist.redo.pop(); if (!nxt) return; hist.undo.push(snapOf(JSON.parse(nxt).tpl)); histApply(nxt); click('tap'); }
document.addEventListener('click', (e) => { if (e.target.closest('[data-undo]')) undo(); if (e.target.closest('[data-redo]')) redo(); });
addEventListener('keydown', (e) => {
  if (!(e.ctrlKey || e.metaKey) || $('#editor').hidden || /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable) return;
  const k = e.key.toLowerCase();
  if (k === 'z' && !e.shiftKey) { e.preventDefault(); undo(); } else if ((k === 'z' && e.shiftKey) || k === 'y') { e.preventDefault(); redo(); }
});

/* ---------------- shade arrow ---------------- */
function drawShadeHandle() {
  const art = $('[data-canvas] .cv-art'); if (!art) return; art.querySelector('.dg-handle')?.remove();
  const st = styleOf(state.tpl), d = st.dg; if (!d) return;
  const W = art.clientWidth, H = art.clientHeight, cx = W / 2, cy = H / 2, R = Math.min(W, H) * .42;
  const a = ((d.a ?? 135) * Math.PI) / 180, L = 24 + (1 - (d.s ?? .6)) * R, px = cx + Math.sin(a) * L, py = cy - Math.cos(a) * L;
  art.insertAdjacentHTML('beforeend', `<svg class="dg-handle" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><line x1="${cx}" y1="${cy}" x2="${px}" y2="${py}"/><circle class="dg-c" cx="${cx}" cy="${cy}" r="4"/><g class="dg-knob" transform="translate(${px} ${py}) rotate(${d.a ?? 135})"><circle r="15"/><path d="M0 6V-6M-5 -1 0 -6 5 -1"/></g></svg>`);
}
$('[data-canvas]').addEventListener('pointerdown', (e) => {
  const knob = e.target.closest('.dg-knob'); if (!knob) return;
  e.preventDefault(); e.stopImmediatePropagation();
  const art = $('[data-canvas] .cv-art'), r = art.getBoundingClientRect(), st = styleOf(state.tpl), ov = art.querySelector('.bi-dg');
  const R = Math.min(r.width, r.height) * .42, cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  const move = (ev) => {
    const dx = ev.clientX - cx, dy = ev.clientY - cy; let a = (Math.atan2(dx, -dy) * 180) / Math.PI; if (a < 0) a += 360;
    if (!ev.altKey) { const sn = Math.round(a / 45) * 45; if (Math.abs(sn - a) < 4) a = sn % 360; }
    const s = Math.max(.05, Math.min(1, 1 - (Math.hypot(dx, dy) - 24) / R));
    st.dg = { ...st.dg, a: Math.round(a), s: +s.toFixed(2) };
    if (ov) { ov.style.background = `linear-gradient(${st.dg.a}deg, transparent ${Math.round((1 - s) * 75)}%, ${st.dg.c || '#000000'} 100%)`; ov.style.opacity = (0.35 + s * 0.65).toFixed(2); }
    drawShadeHandle();
  };
  addEventListener('pointermove', move); addEventListener('pointerup', () => { removeEventListener('pointermove', move); save(); drawEditor(); }, { once: true });
}, true);
document.addEventListener('click', (e) => {
  if (!e.target.closest('[data-shade]')) return; const st = styleOf(state.tpl);
  if (e.target.closest('[data-dg-on]')) { st.dg = { a: 135, s: .6, c: '#000000' }; save(); click('tap'); drawEditor(); }
  if (e.target.closest('[data-dg-off]')) { delete st.dg; save(); click('tap'); drawEditor(); }
  const c = e.target.closest('[data-dgc]'); if (c) { st.dg.c = c.dataset.dgc; save(); drawEditor(); }
});
document.addEventListener('input', (e) => { if (!e.target.matches('[data-dgs]')) return; const st = styleOf(state.tpl); st.dg.s = +e.target.value; save(); soon(); });

/* ---------------- Profile: a small simulated social network ----------------
   Your profile lives in this browser. The other people are made up, so the feed has something in it:
   you can follow them, like and save their designs, and open any of them in the editor as your own copy. */
const PEOPLE = [
  ['Mara Klein', 'mara.studio', 'Art director. Posters, type and too much coffee.', ['#ff5a1f', '#1a1a1a'], 2841],
  ['Jonas Weber', 'jonas.makes', 'Brand identity for small companies with big plans.', ['#1f3fe6', '#9fb3ff'], 1290],
  ['Lea Novak', 'lea.grid', 'Editorial layouts and slow mornings.', ['#efe7da', '#b5653f'], 3577],
  ['Theo Lambert', 'theo.motion', 'Sport and motion. Fast lines, loud colours.', ['#c9f04b', '#111111'], 912],
  ['Ines Duarte', 'ines.d', 'Soft gradients for skincare and wellness brands.', ['#ffd9e4', '#ff3d7f'], 4410],
  ['Kai Moreno', 'kai.builds', 'Product launches for apps and tools.', ['#0b0b0b', '#3b82f6'], 760],
  ['Nora Lind', 'nora.lind', 'Shapes, flowers and one strong photo.', ['#e8401c', '#ffd2c2'], 2105],
  ['Sami Haddad', 'sami.type', 'Big words, small budgets.', ['#f4f4f2', '#111111'], 1688],
];
const hashStr = (t) => { let h = 2166136261; for (const c of t) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } h ^= h >>> 13; h = Math.imul(h, 2246822507) >>> 0; return (h ^ (h >>> 16)) >>> 0; };
const community = (() => {
  const pals = ['own'];
  const fmts = ['portrait', 'square', 'portrait', 'story', 'portrait', 'square', 'landscape'];
  const pool = templates.filter((t) => !/^(x-|ad-)/.test(t.id) && !Object.values(t.fields || {}).some((v) => /\[|\]/.test(String(v)))), used = new Set();
  return PEOPLE.map(([name, handle, bio, colors, followers], pi) => {
    const posts = Array.from({ length: 6 + (pi % 3) }, (_, k) => {
      const h = hashStr(handle + k); let n = h % pool.length; while (used.has(pool[n].id)) n = (n + 1) % pool.length; const t = pool[n]; used.add(t.id);
      return { id: handle + '-' + k, tpl: t.id, palette: pals[(h >>> 4) % pals.length], format: fmts[(h >>> 8) % fmts.length], fields: {}, style: {}, photo: 1 + ((h >>> 12) % 40), likes: 12 + ((h >>> 6) % 380), by: handle };
    });
    return { name, handle, bio, colors, followers, brand: handle.split('.')[0] + '.', used: 18 + (hashStr(handle) % 90), projects: 3 + (hashStr(handle) % 14), posts };
  });
})();
const pPhoto = (n) => `photos/photo-${String(n).padStart(2, '0')}.jpg`;
const prof = () => (state.profile ||= { cover: null, avatar: null, bio: '', published: [], saved: [], liked: [], following: [] });
const myHandle = () => (state.name || user || 'me').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/@.*/, '').replace(/[^a-z0-9]+/g, '.').replace(/^\.|\.$/g, '') || 'me';
const initialsOf = (n) => n.split(/[\s.@]+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
const avatarHtml = (pp, size = '') => pp.avatar ? `<img src="${pp.avatar}" alt="" class="${size}">` : `<i class="pf-ini ${size}" style="background:linear-gradient(135deg,${pp.colors[0]},${pp.colors[1]})">${esc(initialsOf(pp.name))}</i>`;
const findPost = (id) => { const mine = prof().published.find((p) => p.id === id); if (mine) return mine; for (const u of community) { const p = u.posts.find((x) => x.id === id); if (p) return p; } return null; };
const ICON = {
  heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-9.2-8.6C1.4 8.6 3 5 6.6 5c2 0 3.4 1.1 4.4 2.6C12 6.1 13.4 5 15.4 5 19 5 20.6 8.6 19.2 11.4 17 15.6 12 20 12 20Z"/></svg>',
  save: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12v16l-6-4-6 4Z"/></svg>',
  share: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V4M8 8l4-4 4 4M5 13v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/></svg>',
  trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/></svg>',
};
let pfTab = 'published';
const postPhoto = (p) => p.image || shuf.photo[p.tpl] || pPhoto(p.photo || 1);
const postSlots = (p) => (p.images?.length ? p.images : shuf.slots[p.tpl] || [2, 5, 9].map((k) => pPhoto(((p.photo || 1) + k) % 39 + 1)));
function postAd(p) {
  const f = p.format === 'custom' && p.custom ? p.custom : formats[p.format] || formats.portrait, who = p.by && community.find((u) => u.handle === p.by);
  const style = p.style && Object.keys(p.style).length ? p.style : baseFonts(p.tpl), brand = who ? { ...brandForRender(), name: who.brand, logo: '' } : brandForRender();
  return `<div class="ad" style="--ar:${f.w}/${f.h}">${render(p.tpl, { palette: palObj(p.palette || 'own'), style, fields: p.fields || {}, brand, image: thumbOf(postPhoto(p)), images: postSlots(p).map(thumbOf) })}</div>`;
}
function postCard(p, i, mine) {
  const pf = prof(), who = mine ? null : community.find((u) => u.handle === p.by);
  const liked = pf.liked.includes(p.id), saved = pf.saved.includes(p.id);
  const by = mine ? `<span class="pf-by">${esc(getTemplate(p.tpl)?.name || '')}</span>` : `<a class="pf-by" href="#/profile/${who.handle}">${avatarHtml(who, 'sm')}<span>${esc(who.name)}</span></a>`;
  const tools = mine
    ? `<button type="button" class="pf-ic" data-pf-share="${p.id}" aria-label="Copy link" title="Copy link">${ICON.share}</button><button type="button" class="pf-ic" data-pf-unpub="${p.id}" aria-label="Remove from profile" title="Remove from profile">${ICON.trash}</button>`
    : `<button type="button" class="pf-ic pf-like" data-pf-like="${p.id}" aria-pressed="${liked}" aria-label="Like" title="Like">${ICON.heart}<em>${p.likes + (liked ? 1 : 0)}</em></button><button type="button" class="pf-ic" data-pf-save="${p.id}" aria-pressed="${saved}" aria-label="Save" title="Save">${ICON.save}</button>`;
  return `<li class="pf-post" style="--i:${i}">${postAd(p)}<div class="post-bar">${by}${tools}<button type="button" class="p-edit" data-pf-use="${p.id}">${mine ? 'Edit' : 'Use'}</button></div></li>`;
}
function drawProfile(handle) {
  const pf = prof(), mineH = myHandle(), other = handle && handle !== mineH ? community.find((u) => u.handle === handle) : null;
  const me = { name: state.name || user, handle: mineH, bio: pf.bio, colors: ['#e8401c', '#720004'], avatar: pf.avatar };
  const who = other || me, own = !other;
  const cover = $('[data-pf-cover]');
  cover.style.backgroundImage = own && pf.cover ? `url("${pf.cover}")` : `linear-gradient(135deg, ${who.colors[0]}, ${who.colors[1]})`;
  cover.classList.toggle('has-img', !!(own && pf.cover));
  $('[data-pf-cover-btn]').hidden = !own;
  const av = $('[data-pf-avatar]'); av.innerHTML = avatarHtml(who) + (own ? '<span class="pf-av-btn">Change image</span>' : ''); av.disabled = !own;
  $('[data-pf-name]').textContent = who.name; $('[data-pf-handle]').textContent = '@' + who.handle;
  const bio = $('[data-pf-bio]'); bio.textContent = who.bio || (own ? 'Add a line about you' : ''); bio.contentEditable = own ? 'plaintext-only' : 'false'; bio.classList.toggle('is-empty', own && !who.bio);
  const following = pf.following.includes(who.handle);
  const used = own ? new Set([...state.projects.flatMap((p) => p.posts.map((x) => x.tpl)), ...pf.published.map((x) => x.tpl)]).size : who.used;
  const followers = own ? 24 + pf.published.length * 7 + pf.published.reduce((n, p) => n + (p.likes || 0), 0) : who.followers + (following ? 1 : 0);
  $('[data-pf-stats]').innerHTML = [['Followers', followers], [own ? 'Following' : 'Templates used', own ? pf.following.length : used], [own ? 'Templates used' : 'Projects', own ? used : who.projects], ...(own ? [['Projects', state.projects.length]] : [])].map(([k, v]) => `<button type="button" class="pf-stat" data-pf-list="${k}"><dd>${Number(v).toLocaleString('en')}</dd><dt>${k}</dt></button>`).join('');
  pfWho = who; pfOwn = own;
  $('[data-pf-actions]').innerHTML = own
    ? `<button type="button" class="btn btn--line" data-pf-sharep>Share profile</button>`
    : `<button type="button" class="btn ${following ? 'btn--line' : 'btn--save'}" data-pf-follow="${who.handle}">${following ? 'Following' : 'Follow'}</button><button type="button" class="btn btn--line" data-pf-sharep>Share profile</button>`;
  const tabs = own ? [['published', 'Published', pf.published.length], ['explore', 'Explore', community.reduce((n, u) => n + u.posts.length, 0)], ['following', 'Following', community.filter((u) => pf.following.includes(u.handle)).reduce((n, u) => n + u.posts.length, 0)], ['saved', 'Saved', pf.saved.length]] : [['posts', 'Posts', who.posts.length]];
  if (own && !tabs.some((t) => t[0] === pfTab)) pfTab = 'published';
  const tab = own ? pfTab : 'posts';
  $('[data-pf-tabs]').innerHTML = tabs.map(([k, l, n]) => `<button type="button" class="chip" data-pf-tab="${k}" aria-pressed="${k === tab}">${l}<span>${n}</span></button>`).join('');
  $('[data-pf-tools]').innerHTML = own && tab === 'published' ? `<button type="button" class="btn" data-pf-publish>+ Publish a design</button>` : '';
  let list = [], mine = false, empty = '';
  if (!own) list = who.posts;
  else if (tab === 'published') { list = [...pf.published].reverse(); mine = true; empty = 'Nothing published yet. Publish a post from one of your projects, or use “Publish to my profile” in the editor’s export menu.'; }
  else if (tab === 'explore') { const n = Math.max(...community.map((u) => u.posts.length)); for (let k = 0; k < n; k++) community.forEach((u, j) => { const q = u.posts[(k + j) % u.posts.length]; if (k < u.posts.length) list.push(q); }); }
  else if (tab === 'following') { list = community.filter((u) => pf.following.includes(u.handle)).flatMap((u) => u.posts); empty = 'Follow people from Explore and their designs show up here.'; }
  else if (tab === 'saved') { list = pf.saved.map(findPost).filter(Boolean); empty = 'Designs you save with the bookmark show up here.'; }
  const grid = $('[data-pf-grid]'), key = (who.handle) + ':' + tab, html = list.map((p, i) => postCard(p, Math.min(i, 16), mine)).join('');
  const em = $('[data-pf-empty]');
  const put = () => { grid.innerHTML = html; grid.classList.remove('pf-out'); grid.classList.add('pf-anim'); clearTimeout(grid._t); grid._t = setTimeout(() => grid.classList.remove('pf-anim'), 1400); em.hidden = list.length > 0; em.textContent = empty; };
  if (grid.dataset.key === key) { if (grid.innerHTML !== html) { grid.innerHTML = html; } em.hidden = list.length > 0; em.textContent = empty; return; }
  const had = grid.dataset.key && grid.children.length; grid.dataset.key = key;
  if (had) { grid.classList.add('pf-out'); clearTimeout(grid._o); grid._o = setTimeout(put, 160); } else put();
}
let pfWho = null, pfOwn = true;
let pfFileFor = null;
$('#profile').addEventListener('click', async (e) => {
  const pf = prof();
  if (e.target.closest('[data-pf-cover-btn]')) { pfFileFor = 'cover'; $('[data-pf-file]').click(); return; }
  if (e.target.closest('[data-pf-avatar]') && !$('[data-pf-avatar]').disabled) { pfFileFor = 'avatar'; $('[data-pf-file]').click(); return; }
  const tb = e.target.closest('[data-pf-tab]'); if (tb) { pfTab = tb.dataset.pfTab; click('tap'); drawProfile(); return; }
  const fo = e.target.closest('[data-pf-follow]'); if (fo) { const h = fo.dataset.pfFollow, i = pf.following.indexOf(h); if (i < 0) pf.following.push(h); else pf.following.splice(i, 1); save(); click('ok'); drawProfile(h); return; }
  const lk = e.target.closest('[data-pf-like]'); if (lk) { const id = lk.dataset.pfLike, i = pf.liked.indexOf(id); if (i < 0) pf.liked.push(id); else pf.liked.splice(i, 1); save(); const p = findPost(id); lk.setAttribute('aria-pressed', String(i < 0)); lk.querySelector('em').textContent = p.likes + (i < 0 ? 1 : 0); if (i < 0) { likeBurst(lk); likeSound(); } return; }
  const sv = e.target.closest('[data-pf-save]'); if (sv) { const id = sv.dataset.pfSave, i = pf.saved.indexOf(id); if (i < 0) pf.saved.push(id); else pf.saved.splice(i, 1); save(); sv.setAttribute('aria-pressed', String(i < 0)); if (pfTab === 'saved' && !location.hash.split('/')[2]) drawProfile(); return; }
  const sh = e.target.closest('[data-pf-share]'); if (sh) { copyLink(`#/profile/${myHandle()}`); return; }
  if (e.target.closest('[data-pf-sharep]')) { const h = location.hash.split('/')[2] || myHandle(); copyLink(`#/profile/${h}`); return; }
  const un = e.target.closest('[data-pf-unpub]'); if (un) { if (await ask('Remove from your profile?', 'The post stays in its project. Only the published copy goes away.')) { pf.published = pf.published.filter((p) => p.id !== un.dataset.pfUnpub); save(); drawProfile(); } return; }
  if (e.target.closest('[data-pf-publish]')) { openPublish(); return; }
  const ls = e.target.closest('[data-pf-list]'); if (ls) { openPfList(ls.dataset.pfList); return; }
  const us = e.target.closest('[data-pf-use]'); if (us) { const p = findPost(us.dataset.pfUse); if (p) useDesign(p); }
});
function copyLink(hash) {
  const url = location.href.split('#')[0] + hash;
  (navigator.clipboard?.writeText(url) || Promise.reject()).then(() => toast('Link copied. Anyone with BrandIt open in this browser can view it.'), () => toast(url));
}
function useDesign(p) {
  state.tpl = p.tpl; state.format = formats[p.format] || p.format === 'custom' ? p.format : 'portrait'; if (p.custom) state.custom = { ...p.custom };
  state.pal[p.tpl] = p.palette || 'own'; state.styles[p.tpl] = JSON.parse(JSON.stringify(p.style || {})); state.fields[p.tpl] = { ...(p.fields || {}) };
  image = p.image || pPhoto(p.photo || 1); slotImgs[p.tpl] = p.images?.length ? [...p.images] : [2, 5, 9].map((k) => pPhoto(((p.photo || 1) + k) % 40 + 1));
  state.editing = null; save(); location.hash = '/editor/' + p.tpl;
  toast(p.by ? 'This is your own copy now. Change anything, then press Save.' : 'Editing your design.');
}
$('[data-pf-file]').onchange = async (e) => {
  const f = e.target.files[0]; e.target.value = ''; if (!f) return;
  const url = await new Promise((r) => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(f); });
  const pf = prof(); pf[pfFileFor] = await shrink(url, pfFileFor === 'cover' ? 1800 : 480);
  if (!save()) { pf[pfFileFor] = null; toast('This picture is too large for the browser storage. Try a smaller one.'); }
  drawProfile();
};
document.addEventListener('focusout', (e) => { if (!e.target.matches?.('[data-pf-bio][contenteditable="plaintext-only"]')) return; const t = e.target.textContent.trim(); if (t === 'Add a line about you') return; prof().bio = t.slice(0, 160); save(); drawProfile(); });
document.addEventListener('focusin', (e) => { if (e.target.matches?.('[data-pf-bio].is-empty')) { e.target.textContent = ''; e.target.classList.remove('is-empty'); } });
document.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.matches?.('[data-pf-bio]')) { e.preventDefault(); e.target.blur(); } });
function publishSnap(snap) {
  const pf = prof(), p = { id: 'me-' + uid(), ...JSON.parse(JSON.stringify(snap)), likes: 0, at: Date.now() };
  delete p.postId; pf.published.push(p);
  if (!save()) { pf.published.pop(); toast('Your browser storage is full. Remove a few posts and try again.'); return false; }
  return true;
}
function openPublish() {
  const d = $('[data-pf-pick]'), posts = state.projects.flatMap((pr) => pr.posts.map((p) => ({ pr, p })));
  $('[data-pp-grid]').innerHTML = posts.length ? posts.map(({ pr, p }) => `<li><button type="button" data-ppick="${pr.id}:${p.id}" title="${esc(pr.name)}">${postAd(p)}<span>${esc(pr.name)}</span></button></li>`).join('') : '<li class="pp-none">Your projects are empty. Save a design in the editor first.</li>';
  d.hidden = false; requestAnimationFrame(() => d.classList.add('open'));
  const end = () => { d.classList.remove('open'); setTimeout(() => { d.hidden = true; }, 250); d.onclick = null; };
  d.onclick = (e) => {
    if (e.target === d || e.target.closest('[data-pp-close]')) return end();
    const b = e.target.closest("[data-ppick]"); if (!b) return; const [pid, id] = b.dataset.ppick.split(':'), p = projectOf(pid)?.posts.find((x) => x.id === id);
    if (p && publishSnap(p)) { end(); click('ok'); pfTab = 'published'; drawProfile(); toast('Published. It is on your profile now.'); }
  };
}
document.addEventListener('click', (e) => { if (!e.target.closest('[data-publish]')) return; xopen(false); if (publishSnap(snapshot())) { click('ok'); toast('Published to your profile.'); } });

/* photo selection lives in the Photo tab: one button per different picture in the template */
function drawPhotoSel() {
  const box = $('[data-psel]'); if (!box) return; const adEl = $('[data-canvas] .bi-ad');
  const srcs = adEl ? [...new Set($$('.bi-media', adEl).map((n) => n.getAttribute('src')))] : [];
  if (!srcs.length) { box.innerHTML = ''; return; }
  const items = srcs.length > 1 ? srcs.map((u, i) => ['photo:' + srcKey(u), `Photo ${i + 1}`, u]) : [['photo', 'Select photo', srcs[0]]];
  box.innerHTML = items.map(([k, l, u]) => { const on = layerSel === 'photo' && (photoSel === k || (srcs.length === 1 && photoSel)); return `<button type="button" class="chip psel" data-psel-k="${esc(k)}" aria-pressed="${on}"><img src="${esc(u)}" alt="">${on ? (srcs.length > 1 ? l + ' selected' : 'Photo selected') : l}</button>`; }).join('');
}
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-psel-k]'); if (!b) return; const k = b.dataset.pselK, on = b.getAttribute('aria-pressed') === 'true';
  picked = null; layerSel = on ? null : 'photo'; photoSel = on ? null : k; click('tap'); drawCanvas(); drawLayers();
});
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape' || $('#editor').hidden || /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable) return;
  if (picked == null && !layerSel) return; picked = null; layerSel = null; photoSel = null; drawCanvas(); drawLayers();
});

/* ---------------- photo look: black and white, brightness, contrast, saturation, blur ---------------- */
const greyByDefault = (id) => /img\([^)]*'(grey|soft)'/.test(String(getTemplate(id)?.html || ''));
function drawPhotoFx() {
  const box = $('[data-photo-fx]'); if (!box || !state?.tpl) return; const tpl = getTemplate(state.tpl);
  if (!hasPhoto(tpl)) { box.hidden = true; return; } box.hidden = false;
  const st = styleOf(state.tpl), f = st.photoFx || {}, sat = f.sat ?? (greyByDefault(state.tpl) ? 0 : 1), op = st.layers?.op?.photo ?? f.op ?? 1;
  box.innerHTML = `<label class="check small"><input type="checkbox" data-bw${sat === 0 ? ' checked' : ''}> Black and white</label>${rng('data-pfx', 'sat', 'Saturation', 0, 2, .01, sat)}${rng('data-pfx', 'br', 'Brightness', .2, 2, .01, f.br ?? 1)}${rng('data-pfx', 'ct', 'Contrast', .2, 2, .01, f.ct ?? 1)}${rng('data-pfx', 'bl', 'Blur', 0, 6, .1, f.bl ?? 0)}${rng('data-pfx', 'op', 'Opacity', 0, 1, .01, op)}`;
}
$('[data-pane="photo"]').addEventListener('input', (e) => {
  const t = e.target; if (!t.dataset.pfx) return; const st = styleOf(state.tpl), v = +t.value;
  const em = t.parentElement.querySelector('em'); if (em) em.textContent = Math.round(((v - +t.min) / (+t.max - +t.min)) * 100);
  if (t.dataset.pfx === 'op') { st.layers ||= {}; st.layers.op ||= {}; st.layers.op.photo = v; } else (st.photoFx ||= {})[t.dataset.pfx] = v;
  if (t.dataset.pfx === 'sat') { const bw = $('[data-bw]'); if (bw) bw.checked = v === 0; }
  save(); soon();
});
$('[data-pane="photo"]').addEventListener('change', (e) => {
  if (!e.target.matches('[data-bw]')) return; const st = styleOf(state.tpl); (st.photoFx ||= {}).sat = e.target.checked ? 0 : 1;
  save(); click('tap'); drawPhotoFx(); soon();
});

/* a like: the heart fills orange, small stars fly out, and one of three short sounds plays */
function likeBurst(btn) {
  const svg = btn.querySelector('svg'); svg.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.38)' }, { transform: 'scale(.92)' }, { transform: 'scale(1)' }], { duration: 420, easing: 'cubic-bezier(.2,.9,.3,1.3)' });
  const r = svg.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2 + Math.random() * .4, d = 20 + Math.random() * 12, st = document.createElement('i');
    st.className = 'like-star'; st.style.left = cx + 'px'; st.style.top = cy + 'px'; if (k % 3 === 1) st.style.background = '#ffd166';
    document.body.appendChild(st);
    st.animate([{ transform: 'translate(-50%,-50%) scale(.2) rotate(0deg)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * d}px), calc(-50% + ${Math.sin(a) * d}px)) scale(1) rotate(90deg)`, opacity: 1, offset: .6 }, { transform: `translate(calc(-50% + ${Math.cos(a) * (d + 8)}px), calc(-50% + ${Math.sin(a) * (d + 8)}px)) scale(.3) rotate(140deg)`, opacity: 0 }], { duration: 520 + Math.random() * 120, easing: 'cubic-bezier(.15,.8,.3,1)' }).onfinish = () => st.remove();
  }
}
function likeSound() {
  if (state?.muted) return;
  try {
    actx ||= new (window.AudioContext || window.webkitAudioContext)();
    const t = actx.currentTime, out = actx.createGain(); out.gain.value = .16; out.connect(actx.destination);
    const note = (f0, f1, at, len, type = 'sine', vol = 1) => { const o = actx.createOscillator(), g = actx.createGain(); o.type = type; o.frequency.setValueAtTime(f0, t + at); o.frequency.exponentialRampToValueAtTime(f1, t + at + len * .7); g.gain.setValueAtTime(0.0001, t + at); g.gain.exponentialRampToValueAtTime(vol, t + at + .008); g.gain.exponentialRampToValueAtTime(0.0001, t + at + len); o.connect(g).connect(out); o.start(t + at); o.stop(t + at + len + .02); };
    const v = Math.floor(Math.random() * 3);
    if (v === 0) { note(740, 760, 0, .09); note(1110, 1140, .07, .14); }                     // two quick rising notes
    else if (v === 1) { note(520, 1480, 0, .12, 'sine', .9); note(2200, 2000, .05, .06, 'triangle', .3); } // a bubbly pop
    else { note(988, 980, 0, .07, 'triangle'); note(1319, 1310, .05, .08, 'triangle'); note(1760, 1750, .1, .16, 'sine', .7); } // a tiny chime
  } catch { /* audio blocked */ }
}
/* lists behind the numbers: followers, following, templates used and projects, in a window on the page */
const FIRST = ['Ana', 'Ben', 'Clara', 'David', 'Eva', 'Filip', 'Greta', 'Hugo', 'Iris', 'Jakub', 'Klara', 'Leo', 'Mila', 'Nico', 'Olga', 'Pavel', 'Rosa', 'Simon', 'Tereza', 'Viktor', 'Yara', 'Zoe', 'Adam', 'Bea', 'Ema', 'Ivo', 'Lina', 'Marek', 'Nela', 'Ota'];
const LAST = ['Novak', 'Berg', 'Moreau', 'Kral', 'Silva', 'Horak', 'Lund', 'Costa', 'Weiss', 'Dvorak', 'Rossi', 'Hale', 'Varga', 'Kim', 'Fischer', 'Blanco', 'Sato', 'Holm'];
const COLS = [['#ff5a1f', '#1a1a1a'], ['#1f3fe6', '#9fb3ff'], ['#2f7a4f', '#c9f04b'], ['#ff3d7f', '#ffd9e4'], ['#111111', '#8a8a8a'], ['#b5653f', '#efe7da'], ['#6b3cff', '#ffb3f0']];
const demoPeople = (seed, n) => Array.from({ length: n }, (_, i) => { const h = hashStr(seed + ':' + i), f = FIRST[h % FIRST.length], l = LAST[(h >>> 7) % LAST.length]; return { name: `${f} ${l}`, handle: `${f}.${l}`.toLowerCase() + ((h >>> 3) % 7 === 0 ? (h % 90) : ''), colors: COLS[(h >>> 11) % COLS.length] }; });
function personRow(u) {
  const pf = prof(), on = pf.following.includes(u.handle), real = community.some((c) => c.handle === u.handle) || u.handle === myHandle();
  const name = real && u.handle !== myHandle() ? `<a href="#/profile/${u.handle}" data-pm-go>${esc(u.name)}</a>` : esc(u.name);
  return `<li class="pm-row">${avatarHtml(u, 'md')}<span class="pm-n"><b>${name}</b><em>@${esc(u.handle)}</em></span>${u.handle === myHandle() ? '' : `<button type="button" class="btn ${on ? 'btn--line' : ''} pm-follow" data-pm-follow="${esc(u.handle)}">${on ? 'Following' : 'Follow'}</button>`}</li>`;
}
function openPfList(kind) {
  const who = pfWho, own = pfOwn, pf = prof(), modal = $('[data-pf-modal]'), body = $('[data-pm-body]');
  let title = kind, html = '';
  if (kind === 'Followers') {
    const n = Math.min(40, own ? 24 + pf.published.length * 7 : who.followers), people = [...community.filter((c) => c.handle !== who.handle).slice(0, own ? 3 : 2), ...demoPeople(who.handle, n)];
    html = `<ul class="pm-list">${people.map(personRow).join('')}</ul>${(own ? 24 : who.followers) > n ? `<p class="pm-more">and ${((own ? 24 + pf.published.length * 7 : who.followers) - people.length).toLocaleString('en')} more</p>` : ''}`;
  } else if (kind === 'Following') {
    const people = pf.following.map((h) => community.find((c) => c.handle === h) || { name: h.split(/[.\d]/).filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(' '), handle: h, colors: COLS[hashStr(h) % COLS.length] });
    html = people.length ? `<ul class="pm-list">${people.map(personRow).join('')}</ul>` : '<p class="pm-more">Nobody yet. Follow people from Explore or from your followers.</p>';
  } else if (kind === 'Templates used') {
    const ids = own ? [...new Set([...state.projects.flatMap((p) => p.posts.map((x) => x.tpl)), ...pf.published.map((x) => x.tpl)])] : [...new Set([...who.posts.map((p) => p.tpl), ...templates.filter((t, i) => hashStr(who.handle + t.id) % 9 === 0).map((t) => t.id)])].slice(0, 24);
    html = ids.length ? `<ol class="pm-grid">${ids.map((id) => `<li><button type="button" data-pm-tpl="${id}">${postAd({ tpl: id, by: own ? null : who.handle })}<span>${esc(getTemplate(id)?.name || id)}</span></button></li>`).join('')}</ol>` : '<p class="pm-more">Save a design to a project and it shows up here.</p>';
  } else if (kind === 'Projects') {
    const list = own ? state.projects.map((p) => ({ id: p.id, name: p.name, n: p.posts.length, first: p.posts[0] })) : Array.from({ length: who.projects }, (_, i) => { const t = who.posts[i % who.posts.length]; return { name: ['Spring drop', 'Launch week', 'Studio diary', 'Client work', 'Type tests', 'Run club', 'Summer series', 'Open day', 'Workshop', 'Catalogue', 'Behind the scenes', 'New season', 'Talks', 'Archive'][(hashStr(who.handle) + i) % 14], n: 3 + (hashStr(who.handle + i) % 9), first: t }; });
    html = list.length ? `<ol class="pm-grid">${list.map((p) => `<li><button type="button" ${own ? `data-pm-proj="${p.id}"` : 'disabled'}>${p.first ? postAd(p.first) : '<div class="ad pm-empty"></div>'}<span>${esc(p.name)} · ${p.n} ${p.n === 1 ? 'post' : 'posts'}</span></button></li>`).join('')}</ol>` : '<p class="pm-more">No projects yet.</p>';
  }
  $('[data-pm-title]').textContent = title; body.innerHTML = html; body.scrollTop = 0;
  modal.hidden = false; requestAnimationFrame(() => modal.classList.add('open'));
}
function closePfList() { const m = $('[data-pf-modal]'); m.classList.remove('open'); setTimeout(() => { if (!m.classList.contains('open')) m.hidden = true; }, 240); }
$('[data-pf-modal]').addEventListener('click', (e) => {
  const m = $('[data-pf-modal]');
  if (e.target === m || e.target.closest('[data-pm-close]')) return closePfList();
  if (e.target.closest('[data-pm-go]')) { closePfList(); return; }
  const fo = e.target.closest('[data-pm-follow]'); if (fo) { const pf = prof(), h = fo.dataset.pmFollow, i = pf.following.indexOf(h); if (i < 0) pf.following.push(h); else pf.following.splice(i, 1); save(); fo.textContent = i < 0 ? 'Following' : 'Follow'; fo.classList.toggle('btn--line', i < 0); drawProfileStats(); return; }
  const tp = e.target.closest('[data-pm-tpl]'); if (tp) { closePfList(); location.hash = '/editor/' + tp.dataset.pmTpl; return; }
  const pr = e.target.closest('[data-pm-proj]'); if (pr) { closePfList(); state.project = pr.dataset.pmProj; save(); location.hash = '/projects'; }
});
addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('[data-pf-modal]').hidden) closePfList(); });
function drawProfileStats() { const h = location.hash.split('/')[2]; const key = $('[data-pf-grid]').dataset.key; drawProfile(h); $('[data-pf-grid]').dataset.key = key; }
