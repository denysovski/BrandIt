// BrandIt Studio: sign in (simulated), Library, Editor, Sets and Brands over the shared library.
// Everything is stored in this browser's localStorage, per account. Nothing is sent anywhere.
import { templates, categories, formats, palettes, fonts, pagerKinds, render, getTemplate, css, toSVG, toPNG, brandDefaults } from '../lib/brandit.js?v=9';

const FONTS = '../fonts/';
document.getElementById('bi-css').textContent = css(FONTS);
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const uid = () => Math.random().toString(36).slice(2, 9);
const readFile = (file, as = 'dataURL') => new Promise((r, j) => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.onerror = j; as === 'buffer' ? fr.readAsArrayBuffer(file) : fr.readAsDataURL(file); });

/* ---------------- sounds: short synthesised clicks, off with the speaker toggle ---------------- */
let actx = null;
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

const newBrand = (o = {}) => ({ id: uid(), ...brandDefaults, logo: '', useLogo: false, colors: { bg: '#0b0b0b', ink: '#ffffff', accent: '#e8401c', g1: '#e8401c', g2: '#0b0b0b' }, fonts: { d: '', t: '', m: '' }, ...o });
const freshState = (name) => ({ name, tpl: 'mo-crosshair', format: 'portrait', custom: { w: 1080, h: 1350 }, libFormat: 'portrait', libPal: 'own', cat: 'All', set: 'Launch week', setFormat: 'portrait', fields: {}, styles: {}, pal: {}, brands: [newBrand({ name: 'north.', short: 'NO' })], brand: null, userFonts: [], muted: false, fx: true, snap: true, myPalettes: [], projects: [{ id: uid(), name: 'My first series', posts: [] }], project: null, editing: null });
let user = null, state = null, image = null, picked = null;
const slotImgs = {};
/* ---------------- showcase: random photos and colours on every refresh ---------------- */
// Photos from a folder the user picks, kept in IndexedDB in this browser only (never uploaded).
let pool = [];
const shuf = { photo: {}, slots: {}, pal: {} };
const idb = () => new Promise((res, rej) => { const r = indexedDB.open('brandit-showcase', 1); r.onupgradeneeded = () => r.result.createObjectStore('photos'); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
async function poolLoad() { try { const db = await idb(); return await new Promise((res) => { const q = db.transaction('photos').objectStore('photos').get(user); q.onsuccess = () => res(q.result || []); q.onerror = () => res([]); }); } catch { return []; } }
async function poolSave(list) { const db = await idb(); return new Promise((res, rej) => { const t = db.transaction('photos', 'readwrite'); t.objectStore('photos').put(list, user); t.oncomplete = res; t.onerror = () => rej(t.error); }); }
const lum = (h) => { const m = String(h).match(/^#?([0-9a-f]{6})/i); if (!m) return .5; const n = parseInt(m[1], 16); return (.299 * (n >> 16) + .587 * ((n >> 8) & 255) + .114 * (n & 255)) / 255; };
const pick = (a) => a[Math.floor(Math.random() * a.length)];
function reshuffle() {
  shuf.photo = {}; shuf.slots = {}; shuf.pal = {};
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
const palList = () => [['own', 'Own look'], ['brand', 'Brand'], ...(state.myPalettes || []).map((p) => ['my:' + p.id, p.label]), ...Object.entries(palettes).map(([k, v]) => [k, v.label])];
const palObj = (k) => (typeof k === 'string' && k.startsWith('my:') ? (state.myPalettes || []).find((p) => 'my:' + p.id === k) || 'own' : k);
const palSwatch = (k) => { const p = k === 'brand' ? brand().colors : typeof k === 'string' && k.startsWith('my:') ? palObj(k) : palettes[k]; return p ? `linear-gradient(135deg,${p.bg} 50%,${p.accent} 50%)` : 'conic-gradient(#e8401c,#1f3fe0,#c6f432,#e8401c)'; };
const styleOf = (id) => (state.styles[id] ||= {});
const ad = (id, { format, palette, image: im, fields, style } = {}) => {
  const f = fmt(format);
  return `<div class="ad" style="--ar:${f.w}/${f.h}">${render(id, { palette: palObj(palette ?? palFor(id)), style: style ?? state.styles[id] ?? {}, fields: fields || state.fields[id] || {}, brand: brandForRender(), image: im ?? photoFor(id), images: slotsFor(id) })}</div>`;
};

/* ---------------- top bar: brand switcher and account ---------------- */
function drawTop() {
  dd('brand', [...state.brands.map((b) => ({ value: b.id, label: b.name, swatch: `linear-gradient(135deg,${b.colors.bg} 50%,${b.colors.accent} 50%)` })), { value: '+', label: '+ New brand' }], state.brand || state.brands[0].id, (v) => {
    if (v === '+') { const b = newBrand({ name: `Brand ${state.brands.length + 1}`, short: 'BR' }); state.brands.push(b); state.brand = b.id; save(); location.hash = '/brands'; drawTop(); show(); return; }
    state.brand = v; save(); click('ok'); drawTop(); show(true);
  });
  dd('user', [{ value: 'projects', label: 'My projects' }, { value: 'settings', label: 'Settings' }, { value: 'backup', label: 'Download backup' }, { value: 'out', label: 'Sign out' }], null, (v) => {
    if (v === 'projects') location.hash = '/projects';
    if (v === 'settings') openSettings();
    if (v === 'backup') backup();
    if (v === 'out') signOut();
  });
  $('[data-dd="user"] .dd-btn span').textContent = state.name || user;
}

/* ---------------- screens ---------------- */
const screens = ['library', 'editor', 'sets', 'projects', 'brands'];
let lastScreen = '';
function show(keepScroll) {
  const [name, arg] = (location.hash.replace(/^#\/?/, '') || 'library').split('/');
  const s = screens.includes(name) ? name : 'library';
  if (s === 'editor' && arg && templates.some((t) => t.id === arg)) { if (state.tpl !== arg) picked = null; state.tpl = arg; }
  screens.forEach((n) => { $('#' + n).hidden = n !== s; });
  $$('[data-screen]').forEach((a) => (a.dataset.screen === s ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current')));
  lastScreen = s;
  ({ library: drawLibrary, editor: drawEditor, sets: drawSets, projects: drawProjects, brands: drawBrands })[s]();
  if (!keepScroll) scrollTo(0, 0);
}
addEventListener('hashchange', () => show());
document.addEventListener('click', (e) => { const a = e.target.closest('.dock a, .top .logo'); if (!a) return; click('nav'); if (a.getAttribute('href') === location.hash) { e.preventDefault(); show(); } });

/* ---------------- Library ---------------- */
function drawLibrary(animate) {
  $('[data-cats]').innerHTML = ['All', ...categories].map((c) => `<button type="button" class="chip" data-c="${c}" aria-pressed="${c === state.cat}">${c}<span>${c === 'All' ? templates.length : templates.filter((t) => t.cat === c).length}</span></button>`).join('');
  dd('lib-format', formatItems(), state.libFormat, (v) => { state.libFormat = v; save(); drawLibrary(true); });
  dd('lib-pal', [{ value: 'own', label: 'Each its own' }, ...palList().slice(1).map(([k, l]) => ({ value: k, label: l, swatch: palSwatch(k) }))], state.libPal, (v) => { state.libPal = v; save(); drawLibrary(true); });
  $('[data-sc-note]').textContent ||= pool.length ? `${pool.length} showcase photos · shuffled on every refresh` : 'Load a folder of photos to see every template with them.';
  $('[data-sc-clear]').hidden = !pool.length;
  const grid = $('[data-lib-grid]');
  const paint = () => {
    grid.innerHTML = templates.filter((t) => state.cat === 'All' || t.cat === state.cat).map((t, i) => `<li style="--i:${i % 12}"><a class="card" href="#/editor/${t.id}">${ad(t.id, { format: state.libFormat, palette: state.libPal === 'own' ? palFor(t.id) : state.libPal })}<span class="name">${esc(t.name)}<span>${t.cat}</span></span></a></li>`).join('');
  };
  if (!animate || matchMedia('(prefers-reduced-motion: reduce)').matches) return paint();
  grid.classList.add('is-swapping');
  setTimeout(() => { paint(); requestAnimationFrame(() => requestAnimationFrame(() => grid.classList.remove('is-swapping'))); }, 220);
}
$('[data-sc-folder]').onchange = async (e) => {
  const files = [...e.target.files].filter((f) => /^image\//.test(f.type)).slice(0, 120); if (!files.length) return;
  const note = $('[data-sc-note]'); note.textContent = `Loading ${files.length} photos…`;
  const out = []; for (const f of files) out.push(await shrink(await readFile(f), 1200));
  pool = out; try { await poolSave(out); note.textContent = `${out.length} photos saved in this browser. They shuffle on every refresh.`; } catch { note.textContent = `${out.length} photos loaded for this visit (the browser has no room to keep them).`; }
  image = null; reshuffle(); drawLibrary(true);
};
$('[data-sc-shuffle]').onclick = () => { reshuffle(); drawLibrary(true); };
$('[data-sc-clear]').onclick = async () => { if (!(await ask('Remove the showcase photos?', 'They are deleted from this browser. Your own uploads and projects stay.'))) return; pool = []; try { await poolSave([]); } catch {} reshuffle(); drawLibrary(true); $('[data-sc-note]').textContent = 'Showcase photos removed.'; };
$('[data-lib-image]').onchange = async (e) => { const f = e.target.files[0]; if (!f) return; image = await shrink(await readFile(f)); click('ok'); drawLibrary(true); };
$('[data-cats]').addEventListener('click', (e) => { const b = e.target.closest('.chip'); if (!b) return; state.cat = b.dataset.c; save(); click('tap'); drawLibrary(true); });

/* ---------------- Editor ---------------- */
const fontItems = (lbl) => [{ value: '', label: lbl }, { group: 'Built in' }, ...Object.entries(fonts).map(([k, v]) => ({ value: k, label: v.label, font: `'${v.family}'` })), ...(state.userFonts.length ? [{ group: 'Imported' }, ...state.userFonts.map((f) => ({ value: f.name, label: f.name, font: `'${f.name}'` }))] : [])];
function drawEditor() {
  const tpl = getTemplate(state.tpl), st = styleOf(tpl.id);
  $('[data-ed-name]').textContent = tpl.name;
  $('[data-ed-cat]').textContent = tpl.cat;
  dd('template', [...categories.flatMap((c) => [{ group: c }, ...templates.filter((t) => t.cat === c).map((t) => ({ value: t.id, label: t.name }))])], tpl.id, (v) => { location.hash = '/editor/' + v; });
  $('[data-ed-formats]').innerHTML = formatItems().map((f) => `<button type="button" class="chip" data-format="${f.value}" aria-pressed="${f.value === state.format}">${f.value === 'custom' ? 'Custom' : esc(f.label)}</button>`).join('')
    + (state.format === 'custom' ? `<span class="size"><input type="number" min="200" max="4000" value="${state.custom.w}" data-size="w" aria-label="Width in pixels"> × <input type="number" min="200" max="4000" value="${state.custom.h}" data-size="h" aria-label="Height in pixels"> px</span>` : '');
  // colours
  const cur = palFor(tpl.id);
  $('[data-ed-pals]').innerHTML = palList().map(([k, l]) => `<button type="button" class="sw" data-pal="${k}" aria-pressed="${k === cur}" title="${esc(l)}" aria-label="${esc(l)} colours" style="background:${palSwatch(k)}"></button>`).join('');
  const look = tpl.look || {};
  const pobj = palObj(cur);
  const base = cur === 'own' ? look : cur === 'brand' ? brand().colors : typeof pobj === 'object' ? pobj : palettes[cur] || look;
  $('[data-ed-colours]').innerHTML = [['bg', 'Background'], ['ink', 'Text'], ['accent', 'Accent'], ['accent2', 'Shapes'], ['g1', 'Gradient 1'], ['g2', 'Gradient 2']].map(([k, l]) => { const v = st[k] || base[k] || look[k] || (k === 'accent2' ? base.accent || look.accent : '') || '#000000'; return `<button type="button" class="cbtn" data-colbtn="${k}" data-v="${esc(v)}"><i style="--c:${esc(v)}"></i><span>${l}</span><em>${esc(String(v).toUpperCase())}</em></button>`; }).join('');
  // type
  for (const k of ['fd', 'ft', 'fm']) dd(k, fontItems('Template default'), st[k] || '', (v) => { if (v) st[k] = v; else delete st[k]; save(); drawEditor(); });
  // photo sliders
  const slots = tpl.slots || [];
  $('[data-slots]').innerHTML = slots.length ? `<p class="g-title">This design has ${slots.length} photos</p>` + slots.map((l, i) => { const src = slotsFor(tpl.id)[i]; return `<label class="slot">${src ? `<img src="${src}" alt="">` : '<i>+</i>'}<span>${esc(l)}</span><b>${src ? 'Replace' : 'Upload'}</b><input type="file" accept="image/*" data-slot="${i}" hidden></label>`; }).join('') : '';
  $('[data-one-photo] .file-btn').firstChild.textContent = slots.length ? 'Same photo everywhere' : 'Upload photo';
  $$('[data-st]').forEach((r) => { const k = r.dataset.st; r.value = st[k] ?? { ix: 50, iy: 50, iz: 1, ov: 0.6, ls: 1 }[k]; });
  // text fields, each with its own font, size and colour
  const values = { ...tpl.fields, ...(state.fields[tpl.id] || {}) };
  const map = fieldMap(tpl.id);
  $('[data-onefont]').checked = !!st.oneFont;
  $('[data-dd="onefont"]').hidden = !st.oneFont;
  if (st.oneFont) dd('onefont', fontItems('Template default'), st.fd || '', (v) => { ['fd', 'ft', 'fm'].forEach((k) => (v ? (st[k] = v) : delete st[k])); Object.values(st.el || {}).forEach((e) => delete e.f); save(); drawEditor(); });
  $('[data-fields]').innerHTML = Object.entries(values).map(([k, v]) => {
    const long = String(tpl.fields[k]).includes('\n') || String(tpl.fields[k]).length > 40;
    const ns = map[k] || [], e = (st.el || {})[ns[0]] || {};
    const tools = ns.length ? `<div class="ftools">${st.oneFont ? '' : `<div class="dd mini" data-dd="ff-${k}"></div>`}<span class="sizer"><button type="button" data-fz="${k},-1" aria-label="Smaller text">A−</button><output>${Math.round((e.z || 1) * 100)}%</output><button type="button" data-fz="${k},1" aria-label="Bigger text">A+</button></span><button type="button" class="cdot" title="Text colour" aria-label="Text colour" data-fcp="${k}" data-v="${esc(e.c || '#ffffff')}"><i style="background:${e.c || 'conic-gradient(#e8401c,#1f3fe0,#c6f432,#e8401c)'}"></i></button>${e.c ? `<button type="button" class="link" data-fcx="${k}">Reset colour</button>` : ''}</div>` : '';
    return `<div class="field"><label for="f-${k}">${esc(k)}</label>${long ? `<textarea id="f-${k}" data-k="${k}" rows="${Math.min(8, String(v).split('\n').length + 1)}">${esc(v)}</textarea>` : `<input id="f-${k}" data-k="${k}" value="${esc(v)}">`}${tools}</div>`;
  }).join('');
  if (!st.oneFont) for (const [k, ns] of Object.entries(map)) if (ns.length) dd(`ff-${k}`, fontItems('Font'), ((st.el || {})[ns[0]] || {}).f || '', (v) => { ns.forEach((n) => { const e = elOf(n); v ? (e.f = v) : delete e.f; }); save(); drawEditor(); });
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
  $('[data-save-post]').textContent = ed ? 'Update post' : 'Save to project';
  drawCanvas();
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
const toHex = (c) => (/^#[0-9a-f]{6}$/i.test(c) ? c : '#000000');
function drawCanvas() {
  const f = fmt(state.format), canvas = $('[data-canvas]');
  canvas.style.setProperty('--fw', `${Math.round(560 * Math.min(1.7, f.w / f.h))}px`);
  canvas.innerHTML = ad(state.tpl, { format: state.format });
  if (picked != null) $(`[data-canvas] [data-n="${picked}"]`)?.classList.add('is-picked');
  $('[data-picked]').textContent = picked != null ? `Text ${+picked + 1} selected. Drag it, or use the pad.` : 'Click a text in the preview to select it.';
  $('[data-v-formats]').innerHTML = formatItems().slice(0, 5).map((x) => `<button type="button" data-format="${x.value}">${ad(state.tpl, { format: x.value })}${esc(x.label)}</button>`).join('');
  $('[data-v-pals]').innerHTML = palList().slice(0, 9).map(([k, l]) => `<button type="button" data-pal="${k}">${ad(state.tpl, { format: 'square', palette: k, style: { ...styleOf(state.tpl), bg: '', ink: '', accent: '', g1: '', g2: '' } })}${esc(l)}</button>`).join('');
}
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
    if (k === 'colours') ['bg', 'ink', 'accent', 'accent2', 'g1', 'g2'].forEach((x) => delete st[x]);
    if (k === 'photo') ['ix', 'iy', 'iz', 'ov', 'ls'].forEach((x) => delete st[x]);
    if (k === 'text') delete state.fields[state.tpl];
    if (k === 'nudge') { delete st.nudge; picked = null; }
    if (k === 'text') delete st.el;
    save(); click('tap'); drawEditor();
  }
  if (m && picked != null) { if (m.dataset.move === 'center') centreX(); else { const [dx, dy] = m.dataset.move.split(',').map(Number); const k = state.snap !== false ? 2 : 1; nudgeBy(dx * k, dy * k); } }
  const fz = e.target.closest('[data-fz]'); if (fz) { const [k, d] = fz.dataset.fz.split(','); (fieldMap(state.tpl)[k] || []).forEach((n) => { const el = elOf(n); el.z = Math.max(.4, Math.min(3, +((el.z || 1) + d * .1).toFixed(2))); }); save(); drawEditor(); }
  const fcx = e.target.closest('[data-fcx]'); if (fcx) { (fieldMap(state.tpl)[fcx.dataset.fcx] || []).forEach((n) => delete elOf(n).c); save(); drawEditor(); }
  const pk = e.target.closest('[data-pk]'); if (pk) { const st = styleOf(state.tpl); st.pager = { i: 1, n: 5, pos: 'tr', ...(st.pager || {}), kind: pk.dataset.pk }; save(); drawEditor(); }
  const pp = e.target.closest('[data-pp]'); if (pp) { styleOf(state.tpl).pager.pos = pp.dataset.pp; save(); drawEditor(); }
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
  const a = adEl.getBoundingClientRect(), r = el.getBoundingClientRect(), u = Math.min(a.width, a.height) / 100;
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
  const adEl = e.target.closest('.bi-ad'); if (!adEl) return;
  const rect = adEl.getBoundingClientRect(), u = Math.min(rect.width, rect.height) / 100;
  const textEl = e.target.closest('[data-n]'), st = styleOf(state.tpl);
  const sx = e.clientX, sy = e.clientY;
  e.preventDefault();
  if (textEl) {
    picked = textEl.dataset.n; $$('[data-canvas] .is-picked').forEach((x) => x.classList.remove('is-picked')); textEl.classList.add('is-picked'); $('[data-picked]').textContent = `Text ${+picked + 1} selected. Drag it, or use the pad.`;
    const v0 = (st.nudge || {})[picked] || [0, 0], r0 = textEl.getBoundingClientRect(), snap = state.snap !== false;
    const canvas = $('[data-canvas]'); canvas.classList.add('guiding'); canvas.style.setProperty('--gx', `${rect.left - canvas.getBoundingClientRect().left}px`);
    const lim = (d, lo, hi) => (hi < lo ? d : Math.max(lo, Math.min(hi, d)));
    const move = (ev) => {
      let dx = (ev.clientX - sx) / u, dy = (ev.clientY - sy) / u;
      if (snap) {
        dx = lim(dx, (rect.left - r0.left) / u, (rect.right - r0.right) / u); dy = lim(dy, (rect.top - r0.top) / u, (rect.bottom - r0.bottom) / u);
        const cx = (r0.left + r0.right) / 2 + dx * u - (rect.left + rect.width / 2), cy = (r0.top + r0.bottom) / 2 + dy * u - (rect.top + rect.height / 2);
        canvas.classList.toggle('on-x', Math.abs(cx) < u * 1.5); canvas.classList.toggle('on-y', Math.abs(cy) < u * 1.5);
        if (Math.abs(cx) < u * 1.5) dx -= cx / u; else dx = Math.round((v0[0] + dx) / 2) * 2 - v0[0];
        if (Math.abs(cy) < u * 1.5) dy -= cy / u; else dy = Math.round((v0[1] + dy) / 2) * 2 - v0[1];
      }
      st.nudge ||= {}; st.nudge[picked] = [+(v0[0] + dx).toFixed(2), +(v0[1] + dy).toFixed(2)];
      textEl.style.setProperty('--nx', st.nudge[picked][0]); textEl.style.setProperty('--ny', st.nudge[picked][1]);
    };
    const up = () => { removeEventListener('pointermove', move); canvas.classList.remove('guiding', 'on-x', 'on-y'); save(); drawCanvas(); };
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
$('[data-slots]').addEventListener('change', async (e) => { const i = e.target.dataset.slot; const f = e.target.files?.[0]; if (i == null || !f) return; (slotImgs[state.tpl] ||= [...slotsFor(state.tpl)])[+i] = await shrink(await readFile(f)); drawEditor(); });
$('[data-ed-image]').onchange = async (e) => { const f = e.target.files[0]; if (!f) return; image = await shrink(await readFile(f)); click('ok'); drawEditor(); status('Photo added. Drag it in the preview to move it.'); };
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
  $('[data-proj-hint]').textContent = pr.posts.length ? 'Drag order with the arrows. Numbering on each post follows this order.' : 'Empty. Open a template in the Editor and press “Save to project”.';
  $('[data-proj-grid]').innerHTML = pr.posts.map((p, i) => { const f = p.format === 'custom' ? p.custom : formats[p.format] || formats.portrait;
    return `<li class="post"><div class="ad" style="--ar:${f.w}/${f.h}">${render(p.tpl, { palette: palObj(p.palette), style: postStyle(pr, p), fields: p.fields, brand: brandForRender(), image: p.image, images: p.images || [] })}</div>
      <div class="post-bar"><b>${String(i + 1).padStart(2, '0')}</b><span>${esc(getTemplate(p.tpl).name)}</span><button type="button" data-pmove="${p.id},-1" aria-label="Move earlier">←</button><button type="button" data-pmove="${p.id},1" aria-label="Move later">→</button><button type="button" data-popen="${p.id}">Edit</button><button type="button" data-pdel="${p.id}" aria-label="Remove post">×</button></div></li>`; }).join('');
}
$('#projects').addEventListener('click', async (e) => {
  const pr = projectOf(state.project) || state.projects[0];
  const pid = e.target.closest('[data-pid]'); if (pid) { state.project = pid.dataset.pid; save(); drawProjects(); }
  if (e.target.closest('[data-proj-new]')) { const n = { id: uid(), name: `Project ${state.projects.length + 1}`, posts: [] }; state.projects.push(n); state.project = n.id; save(); drawProjects(); $('[data-proj-name]').select(); }
  const mv = e.target.closest('[data-pmove]'); if (mv) { const [id, d] = mv.dataset.pmove.split(','); const i = pr.posts.findIndex((x) => x.id === id), j = i + +d; if (j >= 0 && j < pr.posts.length) { [pr.posts[i], pr.posts[j]] = [pr.posts[j], pr.posts[i]]; save(); drawProjects(); } }
  const del = e.target.closest('[data-pdel]'); if (del) { pr.posts = pr.posts.filter((x) => x.id !== del.dataset.pdel); save(); drawProjects(); }
  const op = e.target.closest('[data-popen]'); if (op) { const p = pr.posts.find((x) => x.id === op.dataset.popen); state.tpl = p.tpl; state.format = p.format; if (p.custom) state.custom = { ...p.custom }; state.pal[p.tpl] = p.palette; state.styles[p.tpl] = JSON.parse(JSON.stringify(p.style || {})); state.fields[p.tpl] = { ...p.fields }; image = p.image || null; slotImgs[p.tpl] = [...(p.images || [])]; state.editing = { pid: pr.id, postId: p.id }; state.project = pr.id; save(); location.hash = '/editor/' + p.tpl; }
  if (e.target.closest('[data-proj-delete]')) { const b = e.target.closest('[data-proj-delete]'); if (!b.dataset.armed) { b.dataset.armed = 1; b.textContent = 'Click again to delete'; setTimeout(() => { delete b.dataset.armed; b.textContent = 'Delete project'; }, 3000); return; } state.projects = state.projects.filter((x) => x.id !== pr.id); state.project = null; save(); drawProjects(); }
  if (e.target.closest('[data-proj-export]')) { for (const [i, p] of pr.posts.entries()) { const f = p.format === 'custom' ? p.custom : formats[p.format] || formats.portrait; const svg = await toSVG(render(p.tpl, { palette: palObj(p.palette), style: postStyle(pr, p), fields: p.fields, brand: brandForRender(), image: p.image, images: p.images || [] }), { w: f.w, h: f.h, fontBase: new URL(FONTS, location.href).href, extraCss: userFontCss() }); download(await toPNG(svg, { w: f.w, h: f.h }), `${pr.name.replace(/\W+/g, '-')}-${String(i + 1).padStart(2, '0')}.png`); await new Promise((r) => setTimeout(r, 350)); } }
});
$('[data-proj-name]').addEventListener('input', (e) => { const pr = projectOf(state.project); if (pr) { pr.name = e.target.value || 'Untitled'; save(); $(`[data-pid="${pr.id}"] span`).textContent = pr.name; } });

function doReset(k) {
  const st = styleOf(state.tpl);
  if (k === 'colours') ['bg', 'ink', 'accent', 'accent2', 'g1', 'g2'].forEach((x) => delete st[x]);
  if (k === 'photo') { ['ix', 'iy', 'iz', 'ov', 'ls'].forEach((x) => delete st[x]); }
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
    document.addEventListener('pointerdown', (e) => { if (!cpEl.hidden && !cpEl.contains(e.target) && !e.target.closest('[data-colbtn],[data-fcp],[data-pager-cbtn]')) closePicker(); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && !cpEl.hidden) closePicker(); });
  }
  const rgba = parseCol(value) || [255, 255, 255, 1];
  let [h, sv, vv] = rgb2hsv(...rgba), a = rgba[3];
  const sw = cpEl.querySelector('[data-sw]'), rec = cpEl.querySelector('[data-recent]');
  const pal = [...new Set($$('[data-colbtn]').map((b) => b.dataset.v))];
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
function status(t) { const el = $('[data-status]'); if (el) el.textContent = t; }
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
const SETS = {
  'Launch week': ['mo-crosshair', 'x-blue-statement', 'mo-giant-word', 'x-swiss'],
  'Gradient story': ['mo-aura', 'mo-orb', 'mo-glow-step', 'mo-ribbon'],
  'Run club': ['mo-route', 'mo-vertical', 'y-speed', 'mo-echo'],
  'App release': ['x-app-promo', 'x-claim', 'x-profile-card', 'x-wordmark-phone'],
  'Shop drop': ['x-shop-drop', 'x-red-wall', 'x-sale-band', 'y-notch'],
  'Growth report': ['x-big-stat', 'x-kpi', 'x-growth', 'x-price'],
  'Performance agency': ['q-question', 'q-donut', 'q-mixed', 'q-percent-star'],
  'Red studio': ['q-cinema', 'q-services', 'q-centre-mark', 'q-red-words'],
  'Strategy deck': ['z-orange-statement', 'z-peach-stat', 'z-bars', 'z-split-underline'],
  'Editorial grey': ['z-year', 'z-vertical-address', 'z-oval', 'z-date-card'],
  'Team and events': ['y-team-intro', 'y-dot-grid', 'y-numbered-quote', 'x-badge'],
};
function drawSets() {
  $('[data-sets]').innerHTML = Object.keys(SETS).map((s) => `<button type="button" class="chip" data-set="${s}" aria-pressed="${s === state.set}">${s}</button>`).join('');
  dd('set-format', formatItems(), state.setFormat, (v) => { state.setFormat = v; save(); drawSets(); });
  $('[data-set-grid]').innerHTML = (SETS[state.set] || []).map((id, i) => { const t = getTemplate(id); return `<li style="--i:${i}"><a class="card" href="#/editor/${id}">${ad(id, { format: state.setFormat })}<span class="name">${esc(t.name)}<span>edit</span></span></a></li>`; }).join('');
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
$('[data-logo-remove]').onclick = () => { const b = brand(); b.logo = ''; b.useLogo = false; save(); drawBrands(); };
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
const SHOW = ['mo-crosshair', 'x-lime-statement', 'mo-aura', 'y-focus-window', 'x-big-stat', 'z-colour-cards', 'mo-ribbon', 'y-stacked-accent'];
const thumb = (id) => `<div class="ad" style="--ar:4/5">${render(id, { palette: 'own' })}</div>`;
function drawOrbit() {
  const o = $('[data-orbit]'); if (!o || o.childElementCount) return;
  o.innerHTML = SHOW.map((id, i) => `<div class="orb-card" style="--i:${i};--n:${SHOW.length}">${thumb(id)}</div>`).join('');
}
function playLoader(done) {
  if (!fxOn()) return done();
  const l = $('[data-loader]'); $('[data-deck]').innerHTML = SHOW.slice(0, 5).map((id, i) => `<div class="deck-card" style="--i:${i}">${thumb(id)}</div>`).join('');
  l.hidden = false; requestAnimationFrame(() => l.classList.add('run'));
  setTimeout(() => { done(); l.classList.add('out'); }, 1500);
  setTimeout(() => { l.hidden = true; l.classList.remove('run', 'out'); }, 2100);
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
  if (!Array.isArray(state.projects) || !state.projects.length) state.projects = [{ id: uid(), name: 'My first series', posts: [] }];
  installFonts();
  state.userFonts.forEach((f) => { fetch(f.data).then((r) => r.arrayBuffer()).then((buf) => document.fonts.add(new FontFace(f.name, buf))).catch(() => {}); });
  document.documentElement.classList.toggle('no-fx', state.fx === false);
  pool = await poolLoad(); reshuffle();
  const go = () => { $('#auth').hidden = true; $('#app').hidden = false; $('[data-dock]').hidden = false; drawTop(); show(); };
  if (quiet) go(); else playLoader(go);
}
const session = load(LS.session, null);
if (session) start(session); else { $('#auth').hidden = false; authMode('in'); drawOrbit(); }
