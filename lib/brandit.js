// BrandIt: a library of reusable ads in one studio identity.
// Every ad is plain HTML and CSS sized with container units, so one template fits every format.
// Used by the studio (studio/index.html), the Framer code component (framer/BrandItAd.tsx) and any page.
//
//   import { render, templates, formats, themes } from './lib/brandit.js';
//   el.innerHTML = render('stat-poster', { theme: 'signal', format: 'portrait', fields: { … } });

import { motionTemplates, motionCss, fonts, fontCss, portrait, logo } from './motion.js?v=36';
export { DEFAULT_MARK } from './motion.js?v=36';
import { moreTemplates, moreCss } from './more.js?v=36';
import { more2Templates, more2Css } from './more2.js?v=36';
import { more3Templates, more3Css } from './more3.js?v=36';
import { more5Templates, more5Css } from './more5.js?v=36';
import { more6Templates, more6Css } from './more6.js?v=36';
import { more7Templates, more7Css } from './more7.js?v=36';
import { more8Templates, more8Css } from './more8.js?v=36';
import { more9Templates, more9Css } from './more9.js?v=36';
import { more10Templates, more10Css } from './more10.js?v=36';
export { fonts, portrait };
export const hasPhoto = (t) => !!(t.art || t.photo || t.slots);

export const formats = {
  square: { label: 'Square post', w: 1080, h: 1080 },
  portrait: { label: 'Portrait post', w: 1080, h: 1350 },
  story: { label: 'Story and reel', w: 1080, h: 1920 },
  landscape: { label: 'Landscape', w: 1920, h: 1080 },
  link: { label: 'Link and LinkedIn', w: 1200, h: 627 },
  tall: { label: 'Pinterest 2:3', w: 1000, h: 1500 },
  three4: { label: 'Portrait 3:4', w: 1080, h: 1440 },
  a4: { label: 'A4 poster', w: 1240, h: 1754 },
  youtube: { label: 'YouTube thumbnail', w: 1280, h: 720 },
  x: { label: 'X post 16:9', w: 1600, h: 900 },
  cover: { label: 'Facebook cover', w: 1640, h: 624 },
  banner: { label: 'Web banner', w: 1920, h: 600 },
  wide4: { label: 'Display 4:1', w: 1200, h: 300 },
};

// Gradient overlays for photo templates: laid over the photo, under the text.
export const gradients = {
  fade: { label: 'Dark fade', css: 'linear-gradient(180deg,rgba(0,0,0,0) 35%,rgba(0,0,0,.85))' },
  top: { label: 'Top fade', css: 'linear-gradient(0deg,rgba(0,0,0,0) 45%,rgba(0,0,0,.8))' },
  vignette: { label: 'Vignette', css: 'radial-gradient(75% 65% at 50% 45%,rgba(0,0,0,0),rgba(0,0,0,.8))' },
  accent: { label: 'Accent glow', css: 'radial-gradient(70% 55% at 30% 100%,color-mix(in srgb,var(--accent) 85%,transparent),transparent 70%)', blend: 'screen' },
  duo: { label: 'Duotone', css: 'linear-gradient(160deg,var(--g1),var(--g2))', blend: 'multiply', op: .9 },
  sunset: { label: 'Sunset', css: 'linear-gradient(170deg,#ff5f6d 0%,#ffc371 100%)', blend: 'multiply', op: .85 },
  ocean: { label: 'Ocean', css: 'linear-gradient(170deg,#0a2a8a 0%,#2ab5ff 100%)', blend: 'multiply', op: .85 },
  ember: { label: 'Ember', css: 'linear-gradient(180deg,rgba(255,60,0,.15),#ff3c00 75%,#200400)', blend: 'multiply', op: .8 },
  violet: { label: 'Violet haze', css: 'linear-gradient(200deg,#5b3df5,#ff6ad5)', blend: 'soft-light', op: 1 },
  acid: { label: 'Acid', css: 'linear-gradient(180deg,rgba(198,244,50,0) 40%,rgba(198,244,50,.75))', blend: 'normal' },
  mono: { label: 'Black and white', css: 'linear-gradient(#000,#000)', blend: 'saturation', op: 1 },
  light: { label: 'Light haze', css: 'linear-gradient(180deg,rgba(255,255,255,0) 30%,rgba(255,255,255,.75))' },
};

// Numbering for a series of posts. kind: squares, numbers, dots, bars, big, line
export const pagerKinds = { squares: 'Squares', numbers: '01 / 09', dots: 'Dots', bars: 'Story bars', big: 'Big number', line: 'Line and number' };
function pagerHtml(p) {
  const n = Math.max(1, Math.min(20, +p.n || 1)), i = Math.max(1, Math.min(n, +p.i || 1)), pad = (x) => String(x).padStart(2, '0');
  const items = (cls) => Array.from({ length: n }, (_, k) => `<i class="${cls}${k + 1 === i ? ' on' : ''}"></i>`).join('');
  const inner = { squares: items('pg-sq'), dots: items('pg-dot'), bars: items('pg-bar'), numbers: `<b>${pad(i)}</b><span>/ ${pad(n)}</span>`, big: `<b class="pg-big">${pad(i)}</b>`, line: `<b>${pad(i)}</b><i class="pg-line"><i style="width:${(i / n) * 100}%"></i></i><span>${pad(n)}</span>` }[p.kind] || items('pg-sq');
  return `<div class="bi-pager pg-${p.kind || 'squares'} pos-${p.pos || 'tr'}"${p.c ? ` style="color:${p.c}"` : ''} aria-label="Post ${i} of ${n}">${inner}</div>`;
}

// Themes. `ink` is text on `bg`; `accent` is one colour used in blocks, never in small text on photos.
export const themes = {
  mono: { label: 'Mono', bg: '#f4f3f1', ink: '#0b0b0b', muted: '#6e6c68', accent: '#0b0b0b', onAccent: '#ffffff', photo: 'grey', display: 'grotesk' },
  ink: { label: 'Ink', bg: '#0b0b0b', ink: '#ffffff', muted: '#9c9a95', accent: '#ffffff', onAccent: '#0b0b0b', photo: 'grey', display: 'grotesk' },
  signal: { label: 'Signal red', bg: '#e8401c', ink: '#ffffff', muted: '#ffd9cf', accent: '#0b0b0b', onAccent: '#ffffff', photo: 'red', display: 'grotesk' },
  paper: { label: 'Paper', bg: '#e9e5de', ink: '#161512', muted: '#77726a', accent: '#e8401c', onAccent: '#ffffff', photo: 'grey', display: 'grotesk' },
  court: { label: 'Court', bg: '#0c0c0c', ink: '#ffffff', muted: '#b8b8b8', accent: '#8ff0b4', accent2: '#1f4dff', onAccent: '#0c0c0c', photo: 'grey', display: 'condensed' },
  acid: { label: 'Acid and blue', bg: '#343c42', ink: '#ffffff', accent: '#e2ff04', g1: '#243ff7', g2: '#d7d8df' },
  signalblue: { label: 'Blue and orange', bg: '#eef4fd', ink: '#16191b', accent: '#ff6430', g1: '#0055ff', g2: '#16191b' },
  gallery: { label: 'Clay and gallery blue', bg: '#d9d1ca', ink: '#0b369a', accent: '#c34811', g1: '#0b369a', g2: '#c34811' },
  peach: { label: 'Peach', bg: '#ffc9bb', ink: '#141414', accent: '#ff5a1f', g1: '#ff5a1f', g2: '#141414' },
  navy: { label: 'Navy', bg: '#020a2a', ink: '#ffffff', accent: '#2f6bff', g1: '#1f5cff', g2: '#020a2a' },
  stone: { label: 'Stone', bg: '#e4e2de', ink: '#141414', accent: '#141414', g1: '#c9c6c0', g2: '#e4e2de' },
  midnight: { label: 'Midnight mint', bg: '#0d1b2a', ink: '#e0fbfc', accent: '#3ddc97', g1: '#3ddc97', g2: '#0d1b2a' },
  sunset: { label: 'Sunset', bg: '#2b0f2e', ink: '#fff1e6', accent: '#ff8a3d', g1: '#ff4f6d', g2: '#2b0f2e' },
  sand: { label: 'Sand and ink', bg: '#e8dcc8', ink: '#1b1b1b', accent: '#b4532a', g1: '#d6c3a3', g2: '#1b1b1b' },
  forest: { label: 'Forest', bg: '#14281d', ink: '#f1f5ee', accent: '#c9e265', g1: '#2f6b45', g2: '#14281d' },
  bubblegum: { label: 'Bubblegum', bg: '#ffe3ef', ink: '#2a1030', accent: '#ff3d8b', g1: '#ff8ac0', g2: '#ffe3ef' },
  ocean: { label: 'Ocean', bg: '#002b45', ink: '#ffffff', accent: '#00c2d1', g1: '#0077b6', g2: '#002b45' },
  mocha: { label: 'Mocha', bg: '#3b2a22', ink: '#f6ede4', accent: '#d9a066', g1: '#8a5a3c', g2: '#3b2a22' },
  lilac: { label: 'Lilac', bg: '#ece6ff', ink: '#1d1440', accent: '#6c4ef5', g1: '#b7a6ff', g2: '#ece6ff' },
  tangerine: { label: 'Tangerine', bg: '#fff4e6', ink: '#1a1a1a', accent: '#ff7a00', g1: '#ffb35c', g2: '#fff4e6' },
  graphite: { label: 'Graphite', bg: '#1f2326', ink: '#e9ecef', accent: '#9aa5b1', g1: '#3b4249', g2: '#1f2326' },
  cherry: { label: 'Cherry', bg: '#1a0006', ink: '#ffe9ec', accent: '#ff1f4b', g1: '#a3002a', g2: '#1a0006' },
  mint: { label: 'Mint', bg: '#e6fff5', ink: '#0b2a22', accent: '#00b386', g1: '#7fe3c4', g2: '#e6fff5' },
  royal: { label: 'Royal', bg: '#1b1464', ink: '#ffffff', accent: '#ffd23f', g1: '#3b2fc9', g2: '#1b1464' },
  olive: { label: 'Olive', bg: '#2e3320', ink: '#f2efe2', accent: '#d4c26a', g1: '#5f6b3a', g2: '#2e3320' },
  ice: { label: 'Ice', bg: '#f2f8fc', ink: '#0e2233', accent: '#2f8fd8', g1: '#bfe0f5', g2: '#f2f8fc' },
  neon: { label: 'Neon night', bg: '#07070c', ink: '#ffffff', accent: '#00f0ff', g1: '#ff00c8', g2: '#07070c' },
  electric: { label: 'Electric blue', bg: '#efeff1', ink: '#0b0b0b', accent: '#1238ff', g1: '#1238ff', g2: '#ffffff' },
  crimson: { label: 'Crimson night', bg: '#0a0000', ink: '#ffffff', accent: '#ff2a1a', g1: '#ff2a1a', g2: '#0a0000' },
  volt: { label: 'Volt', bg: '#1f4dff', ink: '#ffffff', muted: '#c7d2ff', accent: '#8ff0b4', accent2: '#0c0c0c', onAccent: '#0c0c0c', photo: 'grey', display: 'condensed' },
};

export const brandDefaults = { name: 'set.', short: 'SE', year: '26', handle: '@studio.set', url: 'studio.set', place: 'Prague' };

const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const lines = (s = '') => esc(s).split(/\n/).join('<br>');

// Placeholder pictures: grey or red studio portraits drawn as silhouettes. Replace with real photography.
export function placeholder(kind = 'group', tone = 'grey', seed = 1) {
  const w = 1200, h = 1500;
  const bg = tone === 'red' ? ['#ff6a45', '#c8300f'] : tone === 'blue' ? ['#4d74ff', '#1233c9'] : ['#8d8d8d', '#262626'];
  const fig = tone === 'red' ? '#1a0b07' : '#0a0a0a';
  let body = '';
  const person = (x, y, s) => `<ellipse cx="${x}" cy="${y - 150 * s}" rx="${72 * s}" ry="${88 * s}" fill="${fig}"/><path d="M${x - 190 * s} ${h} C${x - 200 * s} ${y + 40 * s} ${x - 150 * s} ${y - 40 * s} ${x} ${y - 40 * s} C${x + 150 * s} ${y - 40 * s} ${x + 200 * s} ${y + 40 * s} ${x + 190 * s} ${h} Z" fill="${fig}"/>`;
  if (kind === 'group') [0.17, 0.34, 0.5, 0.66, 0.83].forEach((p, i) => { body += person(w * p, h * (0.6 + ((i * 7 + seed) % 3) * 0.025), 0.82 + ((i + seed) % 3) * 0.07); });
  else if (kind === 'portrait') body = person(w * 0.52, h * 0.55, 2.1);
  else if (kind === 'athlete') body = person(w * 0.5, h * 0.5, 2.4) + `<rect x="${w * 0.66}" y="${h * 0.12}" width="${w * 0.05}" height="${h * 0.42}" rx="30" fill="${fig}" transform="rotate(24 ${w * 0.68} ${h * 0.3})"/>`;
  else if (kind === 'object') body = `<ellipse cx="${w / 2}" cy="${h * 0.8}" rx="${w * 0.26}" ry="${h * 0.025}" fill="#000" opacity=".35"/><rect x="${w * 0.34}" y="${h * 0.28}" width="${w * 0.32}" height="${h * 0.52}" rx="70" fill="#d9d9d9"/><rect x="${w * 0.34}" y="${h * 0.28}" width="${w * 0.1}" height="${h * 0.52}" rx="50" fill="#fff" opacity=".4"/>`;
  return 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><radialGradient id="g" cx=".5" cy=".28" r=".9"><stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></radialGradient><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="${seed}"/><feColorMatrix values="0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .16 0"/></filter></defs><rect width="100%" height="100%" fill="url(#g)"/>${body}<rect width="100%" height="100%" filter="url(#n)"/></svg>`);
}

// Marks drawn in code. The star and the brush are original shapes, not any client's logo.
const star = (c) => `<svg class="bi-star" viewBox="0 0 200 200" aria-hidden="true"><path d="M100 0 L118 72 L200 82 L134 120 L156 200 L100 150 L44 200 L66 120 L0 82 L82 72 Z" fill="${c}"/></svg>`;
const brush = (c, seed = 2) => `<svg class="bi-brush" viewBox="0 0 600 260" preserveAspectRatio="none" aria-hidden="true"><defs><filter id="bi-rough${seed}"><feTurbulence type="fractalNoise" baseFrequency=".035 .5" numOctaves="3" seed="${seed}"/><feDisplacementMap in="SourceGraphic" scale="34"/></filter><filter id="bi-grain${seed}"><feTurbulence baseFrequency=".9" seed="${seed}"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.6 1.2"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs><g filter="url(#bi-rough${seed})"><path d="M20 70 C150 20 380 10 590 40 L580 210 C380 240 160 250 10 200 Z" fill="${c}"/></g></svg>`;
const xmark = `<svg class="bi-x" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0 L100 100 M100 0 L0 100" stroke="currentColor" stroke-width="9" opacity=".22"/></svg>`;
const ring = (b) => (b.logo ? `<img class="bi-logo" src="${esc(b.logo)}" alt="" style="height:calc(var(--u)*7*var(--ls,1))">` : `<span class="bi-ring">${esc(b.short)}</span>`);
const media = (src, cls = '') => `<img class="bi-media ${cls}" src="${esc(src)}" alt="" decoding="async">`;

// Templates. `fields` lists what the editor asks for; defaults are written as real-sounding examples for a
// fictional studio, and anything that must come from a real client is in [brackets].
const baseTemplates = [
  // Studio
  { id: 'stat-poster', name: 'Stat poster', family: 'Studio', photo: ['portrait', 'red'],
    fields: { since: 'Since 2020', l1: '7 members', l2: '& 26 awards', l3: '83 projects', note: 'Strategy, identity\nand web from Prague' },
    html: (f, t, b, img) => `${media(img)}<div class="bi-shade"></div><p class="bi-c tl small">${ring(b)}</p><p class="bi-c tr small">${lines(f.note)}</p>
      <div class="bi-stack"><p class="s0"><span class="bi-acc">®</span>${esc(f.since)}</p><p class="s1">${esc(f.l1)}</p><p class="s2">${esc(f.l2).replace(/^&amp;/, '<span class="bi-acc">&amp;</span>')}</p><p class="s3">${esc(f.l3)}</p></div>` },
  { id: 'year-mark', name: 'Year mark', family: 'Studio', photo: ['group', 'grey'],
    fields: { mark: 'SE©26', line: 'A new year,\nthe same care.', foot: 'studio.set' },
    html: (f, t, b, img) => `${media(img, 'dim')}<div class="bi-mark">${xmark}<p>${esc(f.mark)}</p></div><p class="bi-c bl small">${lines(f.line)}</p><p class="bi-c br small">${esc(f.foot)}</p>` },
  { id: 'wordmark-photo', name: 'Wordmark over photo', family: 'Studio', photo: ['group', 'grey'],
    fields: { word: 'set.', b1: 'Dedicated to\ncareful digital work', b2: 'Est.\n2020—2026' },
    html: (f, t, b, img) => `${media(img)}<p class="bi-c tl small">${esc(b.handle)}</p><p class="bi-c tr small">${esc(b.place)}</p><p class="bi-b1 small">${lines(f.b1)}</p><p class="bi-b2 small">${lines(f.b2)}</p><p class="bi-wordmark">${esc(f.word)}</p>` },
  { id: 'statement', name: 'Indented statement', family: 'Studio',
    fields: { label: 'Studio', text: 'Guided by a clear point of view, we help companies stand out and grow their business.', foot: 'studio.set' },
    html: (f, t, b) => `<p class="bi-c tl small">${ring(b)}</p><p class="bi-label small">${esc(f.label)}</p><p class="bi-statement">${esc(f.text)}</p><p class="bi-c br small">${esc(f.foot)}</p>` },
  { id: 'hiring', name: 'We are hiring', family: 'Studio', photo: ['portrait', 'grey'],
    fields: { head: 'We are\nhiring', roles: 'Senior designer\nFront-end developer\nProject manager', how: 'Apply by 15 January\nstudio.set/jobs' },
    html: (f, t, b, img) => `<div class="bi-half">${media(img)}</div><p class="bi-h1 bi-hire">${lines(f.head)}</p><ul class="bi-roles">${esc(f.roles).split('\n').map((r) => `<li>${r}</li>`).join('')}</ul><p class="bi-c bl small">${lines(f.how)}</p><p class="bi-c tr small">${ring(b)}</p>` },
  { id: 'new-work', name: 'New work', family: 'Studio', photo: ['object', 'grey'],
    fields: { kicker: 'New work', project: 'Lamp One', what: 'Identity, packaging, website', link: 'studio.set/work' },
    html: (f, t, b, img) => `<div class="bi-sheet"><div class="bi-cell">${media(img)}</div><div class="bi-cell bi-cap"><p class="small">${esc(f.kicker)}</p><p class="bi-h2">${esc(f.project)}</p><p class="small muted">${esc(f.what)}</p></div></div><p class="bi-c br small">${esc(f.link)}</p>` },
  { id: 'quote', name: 'Client quote', family: 'Studio',
    fields: { quote: '[A real quote from a client, approved for publishing, about the result of the work.]', who: '[Name, role, company]' },
    html: (f, t, b) => `<p class="bi-c tl small">${ring(b)}</p><p class="bi-quote">${esc(f.quote)}</p><p class="bi-c bl small">${esc(f.who)}</p>` },
  { id: 'event', name: 'Event', family: 'Studio',
    fields: { date: '12.02', what: 'Studio evening:\nhow we price a website', where: 'Old print house\nPrague 7', time: '18:30 · free entry' },
    html: (f, t, b) => `<p class="bi-date">${esc(f.date)}</p><p class="bi-what">${lines(f.what)}</p><p class="bi-c bl small">${lines(f.where)}</p><p class="bi-c br small">${esc(f.time)}</p><p class="bi-c tl small">${ring(b)}</p>` },
  { id: 'services', name: 'Services list', family: 'Studio',
    fields: { head: 'What we do', list: 'Brand strategy\nVisual identity\nWebsites\nMotion\nCare', foot: 'studio.set/services' },
    html: (f, t, b) => `<p class="bi-label small">${esc(f.head)}</p><ul class="bi-list">${esc(f.list).split('\n').map((r) => `<li>${r}</li>`).join('')}</ul><p class="bi-c br small">${esc(f.foot)}</p><p class="bi-c tl small">${ring(b)}</p>` },
  { id: 'book-call', name: 'Book a call', family: 'Studio', photo: ['portrait', 'red'],
    fields: { text: 'Attention is easy to buy and hard to keep. Tell us what you are building.', slots: '1 slot left in December', cta: 'Book a call' },
    html: (f, t, b, img) => `<div class="bi-split"><div class="bi-black"><p class="small">Contact</p><p class="bi-h3">${esc(f.text)}</p><p class="bi-pill">${esc(f.cta)} <span>↗</span></p><p class="small muted">${esc(f.slots)}</p></div><div class="bi-photo">${media(img)}</div></div>` },
  { id: 'big-number', name: 'Big number', family: 'Studio',
    fields: { num: '83', cap: 'projects shipped\nsince 2020', foot: 'studio.set' },
    html: (f, t, b) => `<p class="bi-num">${esc(f.num)}</p><p class="bi-numcap small">${lines(f.cap)}</p><p class="bi-c tl small">${ring(b)}</p><p class="bi-c br small">${esc(f.foot)}</p>` },
  { id: 'team-strip', name: 'Team', family: 'Studio', photo: ['group', 'grey'],
    fields: { head: 'Seven people,\none studio', names: 'Kaia · Ondra · Mira · Leon · Sara · Tomas · Eva' },
    html: (f, t, b, img) => `<div class="bi-band">${media(img)}</div><p class="bi-h2 bi-teamh">${lines(f.head)}</p><p class="bi-c bl small">${esc(f.names)}</p><p class="bi-c tr small">${ring(b)}</p>` },
  // Court (sport)
  { id: 'court-partner', name: 'Become a partner', family: 'Court', photo: ['athlete', 'grey'],
    fields: { l1: 'Become', l2: 'our', l3: 'court', l4: 'partner', small: 'Your brand on court,\nin the app and at every\ntournament this season.', club: 'set. padel' },
    html: (f, t, b, img) => `${media(img, 'grey')}${brush(t.accent2 || t.accent, 3)}<div class="bi-cond"><p>${esc(f.l1)}</p><p>${esc(f.l2)}</p><p class="bi-acc2">${esc(f.l3)}</p><p class="bi-acc2">${esc(f.l4)}</p></div><p class="bi-c tr micro">${lines(f.small)}</p><p class="bi-c bl bi-club">${esc(f.club)}</p>` },
  { id: 'court-contest', name: 'Contest', family: 'Court', photo: ['athlete', 'grey'],
    fields: { word: 'Contest', small: 'Win a season pass:\nshare your best point\nand tag the club.', rules: 'Until 31 March · rules on the website', club: 'set. padel' },
    html: (f, t, b, img) => `${media(img, 'grey')}${star(t.accent2 || t.accent)}<p class="bi-cross">${esc(f.word)}</p><p class="bi-c tl micro">${lines(f.small)}</p><p class="bi-c bl bi-club">${esc(f.club)}</p><p class="bi-c br micro">${esc(f.rules)}</p>` },
  { id: 'court-coach', name: 'New coach', family: 'Court', photo: ['athlete', 'grey'],
    fields: { head: 'New head\ncoach', who: 'Academy', name: '[Coach name]', small: 'Fifteen years on tour,\nnow on our courts.' },
    html: (f, t, b, img) => `${media(img, 'grey')}<div class="bi-fade"></div><p class="bi-cond bi-coach">${lines(f.head)}</p><p class="bi-c tr micro">${esc(f.who)}<br>${esc(f.name)}</p><p class="bi-c bl micro">${lines(f.small)}</p>` },
  { id: 'court-match', name: 'Match day', family: 'Court',
    fields: { a: 'Novak / Hruby', b: 'Silva / Ortega', date: 'Sat 14.03', time: 'Court 1 · 19:00', club: 'set. padel' },
    html: (f, t, b) => `${star(t.accent)}<p class="bi-cond bi-vs"><span>${esc(f.a)}</span><span class="bi-acc">vs</span><span>${esc(f.b)}</span></p><p class="bi-c tl micro">${esc(f.date)}</p><p class="bi-c tr micro">${esc(f.time)}</p><p class="bi-c bl bi-club">${esc(f.club)}</p>` },
  { id: 'court-result', name: 'Result', family: 'Court', photo: ['athlete', 'blue'],
    fields: { score: '6:4 7:5', line: 'Final won', who: 'Novak / Hruby', club: 'set. padel' },
    html: (f, t, b, img) => `${media(img)}<p class="bi-cond bi-score">${esc(f.score)}</p><p class="bi-c tl micro">${esc(f.line)}<br>${esc(f.who)}</p><p class="bi-c bl bi-club">${esc(f.club)}</p>` },
  { id: 'court-academy', name: 'Academy', family: 'Court', photo: ['athlete', 'grey'],
    fields: { head: 'Sharp\nacademy', list: 'Juniors 8–16\nAdults from zero\nCompetition team', when: 'Spring term from 2 March', club: 'set. padel' },
    html: (f, t, b, img) => `<div class="bi-half r">${media(img, 'grey')}</div><p class="bi-cond bi-acad">${lines(f.head)}</p><ul class="bi-roles micro2">${esc(f.list).split('\n').map((r) => `<li>${r}</li>`).join('')}</ul><p class="bi-c bl micro">${esc(f.when)}</p><p class="bi-c tl bi-club">${esc(f.club)}</p>` },
  // Commerce
  { id: 'product', name: 'Product', family: 'Commerce', photo: ['object', 'grey'],
    fields: { name: 'Lamp One', detail: 'Hand-turned oak\nwarm 2700 K light', price: '€ 340', cta: 'Shop now' },
    html: (f, t, b, img) => `<div class="bi-stage">${media(img)}</div><p class="bi-c tl bi-h3">${esc(f.name)}</p><p class="bi-c tr small">${lines(f.detail)}</p><p class="bi-c bl bi-h3">${esc(f.price)}</p><p class="bi-c br bi-pill">${esc(f.cta)} <span>↗</span></p>` },
  { id: 'sale', name: 'Sale', family: 'Commerce',
    fields: { pct: '−30 %', what: 'on the whole\nwinter collection', until: 'Until Sunday 23:59', code: 'Code WINTER' },
    html: (f, t, b) => `<p class="bi-num bi-sale">${esc(f.pct)}</p><p class="bi-numcap small">${lines(f.what)}</p><p class="bi-c bl small">${esc(f.until)}</p><p class="bi-c br small">${esc(f.code)}</p><p class="bi-c tl small">${ring(b)}</p>` },
  { id: 'launch', name: 'Launch date', family: 'Commerce', photo: ['object', 'grey'],
    fields: { head: 'Coming\n02.03', what: 'The new collection,\nonline at 10:00', link: 'studio.set/shop' },
    html: (f, t, b, img) => `${media(img, 'dim')}<p class="bi-h1 bi-launch">${lines(f.head)}</p><p class="bi-c bl small">${lines(f.what)}</p><p class="bi-c br small">${esc(f.link)}</p>` },
  { id: 'tips', name: 'Three tips', family: 'Commerce',
    fields: { head: 'Before you\nbrief a studio', t1: 'Know who the site is for', t2: 'Bring the content you have', t3: 'Name one action that matters', foot: 'studio.set/journal' },
    html: (f, t, b) => `<p class="bi-h2 bi-tipsh">${lines(f.head)}</p><ol class="bi-tips"><li>${esc(f.t1)}</li><li>${esc(f.t2)}</li><li>${esc(f.t3)}</li></ol><p class="bi-c br small">${esc(f.foot)}</p><p class="bi-c tl small">${ring(b)}</p>` },
  { id: 'announce', name: 'Announcement', family: 'Commerce',
    fields: { word: 'Open', detail: 'New studio in Prague 7\nfrom Monday', where: 'Dělnická 12', foot: 'studio.set' },
    html: (f, t, b) => `<p class="bi-wordmark bi-ann">${esc(f.word)}</p><p class="bi-b1 small">${lines(f.detail)}</p><p class="bi-b2 small">${esc(f.where)}</p><p class="bi-c tl small">${ring(b)}</p><p class="bi-c br small">${esc(f.foot)}</p>` },
  { id: 'carousel-cover', name: 'Carousel cover', family: 'Commerce', photo: ['group', 'grey'],
    fields: { head: 'How we price\na website', swipe: 'Swipe', foot: 'studio.set' },
    html: (f, t, b, img) => `<div class="bi-band low">${media(img)}</div><p class="bi-h1 bi-carh">${lines(f.head)}</p><p class="bi-c tr small">${esc(f.swipe)} →</p><p class="bi-c tl small">${ring(b)}</p>` },
];

const CAT = { 'stat-poster': 'Professional', 'year-mark': 'Minimal', 'wordmark-photo': 'Bold photo', statement: 'Minimal', hiring: 'Professional', 'new-work': 'Minimal', quote: 'Minimal', event: 'Minimal', services: 'Professional', 'book-call': 'Professional', 'big-number': 'Minimal', 'team-strip': 'Professional', product: 'Minimal', sale: 'Minimal', launch: 'Bold photo', tips: 'Professional', announce: 'Minimal', 'carousel-cover': 'Professional' };
const MOTION_CAT = { 'mo-crosshair': 'Bold photo', 'mo-glass-cross': 'Bold photo', 'mo-data-frame': 'Professional', 'mo-spec-sheet': 'Professional', 'mo-three-words': 'Bold photo', 'mo-haze': 'Gradient', 'mo-giant-word': 'Minimal', 'mo-about': 'Minimal', 'mo-bracket': 'Professional', 'mo-route': 'Sport', 'mo-vertical': 'Sport', 'mo-echo': 'Sport', 'mo-ghost-stack': 'Sport', 'mo-blur-word': 'Gradient', 'mo-duotone': 'Bold photo', 'mo-aura': 'Gradient', 'mo-orb': 'Gradient', 'mo-glow-step': 'Gradient', 'mo-ribbon': 'Gradient', 'mo-app-tile': 'Professional', 'mo-story': 'Professional', 'mo-pills': 'Gradient', 'mo-quiet-card': 'Minimal', 'mo-verse': 'Minimal', 'mo-cover': 'Sport' };
export const categories = ['Minimal', 'Gradient', 'Professional', 'Data & stats', 'Bold photo', 'Brand identity', 'Shapes', 'Swiss', 'Carousel', 'Event', 'Editorial', 'Sport'];
export const templates = [
  ...baseTemplates.map((t) => ({ ...t, cat: t.family === 'Court' ? 'Sport' : CAT[t.id] || 'Minimal' })),
  ...motionTemplates.map((t) => ({ ...t, cat: MOTION_CAT[t.id] || 'Minimal' })),
  ...moreTemplates.map((t) => ({ ...t, family: 'Motion' })),
  ...more2Templates.map((t) => ({ ...t, family: 'Motion' })),
  ...more3Templates.map((t) => ({ ...t, family: 'Motion' })),
  ...more5Templates.map((t) => ({ ...t, family: 'Motion' })),
  ...more6Templates.map((t) => ({ ...t, family: 'Motion' })),
  ...more7Templates.map((t) => ({ ...t, family: 'Motion' })),
  ...more8Templates.map((t) => ({ ...t, family: 'Motion' })),
  ...more9Templates.map((t) => ({ ...t, family: 'Motion' })),
  ...more10Templates.map((t) => ({ ...t, family: 'Motion' })),
];

// Colour palettes any template can wear. "Own" (the template's look) and "Brand" are added by render().
export const palettes = {
  mono: { label: 'Mono', bg: '#f4f3f1', ink: '#0b0b0b', accent: '#e8401c', g1: '#d9d6d0', g2: '#f4f3f1' },
  ink: { label: 'Ink', bg: '#0b0b0b', ink: '#ffffff', accent: '#ffffff', g1: '#3a3a3a', g2: '#0b0b0b' },
  signal: { label: 'Signal red', bg: '#e8401c', ink: '#ffffff', accent: '#0b0b0b', g1: '#ff7a3d', g2: '#7a1a05' },
  cobalt: { label: 'Cobalt', bg: '#0b1a4a', ink: '#ffffff', accent: '#4f86ff', g1: '#2a63ff', g2: '#050b2a' },
  violet: { label: 'Violet', bg: '#120a4a', ink: '#ffffff', accent: '#a385f5', g1: '#5b3df5', g2: '#05031a' },
  ember: { label: 'Ember', bg: '#2a0f04', ink: '#ffffff', accent: '#ff7a1a', g1: '#ff5a12', g2: '#1a0600' },
  lime: { label: 'Lime', bg: '#0b0b0b', ink: '#ffffff', accent: '#c6f432', g1: '#c6f432', g2: '#0b0b0b' },
  sky: { label: 'Sky', bg: '#c9d8f0', ink: '#0b0b0b', accent: '#1f3fe0', g1: '#ffffff', g2: '#a9c0e6' },
  wine: { label: 'Wine', bg: '#6b0508', ink: '#ffffff', accent: '#ffffff', g1: '#c2181c', g2: '#2a0002' },
  paper: { label: 'Paper', bg: '#efece4', ink: '#141414', accent: '#c4361a', g1: '#efece4', g2: '#141414' },
  frost: { label: 'Frost', bg: '#e8eef2', ink: '#16181b', accent: '#5e646b', g1: '#c9ccd0', g2: '#f6f8f9' },
  clay: { label: 'Clay', bg: '#efe8dd', ink: '#1c1916', accent: '#b5653f', g1: '#d9cbb8', g2: '#fbf8f3' },
  court: { label: 'Court', bg: '#0c0c0c', ink: '#ffffff', accent: '#8ff0b4', g1: '#1f4dff', g2: '#0c0c0c' },
  acid: { label: 'Acid and blue', bg: '#343c42', ink: '#ffffff', accent: '#e2ff04', g1: '#243ff7', g2: '#d7d8df' },
  signalblue: { label: 'Blue and orange', bg: '#eef4fd', ink: '#16191b', accent: '#ff6430', g1: '#0055ff', g2: '#16191b' },
  gallery: { label: 'Clay and gallery blue', bg: '#d9d1ca', ink: '#0b369a', accent: '#c34811', g1: '#0b369a', g2: '#c34811' },
  peach: { label: 'Peach', bg: '#ffc9bb', ink: '#141414', accent: '#ff5a1f', g1: '#ff5a1f', g2: '#141414' },
  navy: { label: 'Navy', bg: '#020a2a', ink: '#ffffff', accent: '#2f6bff', g1: '#1f5cff', g2: '#020a2a' },
  stone: { label: 'Stone', bg: '#e4e2de', ink: '#141414', accent: '#141414', g1: '#c9c6c0', g2: '#e4e2de' },
  midnight: { label: 'Midnight mint', bg: '#0d1b2a', ink: '#e0fbfc', accent: '#3ddc97', g1: '#3ddc97', g2: '#0d1b2a' },
  sunset: { label: 'Sunset', bg: '#2b0f2e', ink: '#fff1e6', accent: '#ff8a3d', g1: '#ff4f6d', g2: '#2b0f2e' },
  sand: { label: 'Sand and ink', bg: '#e8dcc8', ink: '#1b1b1b', accent: '#b4532a', g1: '#d6c3a3', g2: '#1b1b1b' },
  forest: { label: 'Forest', bg: '#14281d', ink: '#f1f5ee', accent: '#c9e265', g1: '#2f6b45', g2: '#14281d' },
  bubblegum: { label: 'Bubblegum', bg: '#ffe3ef', ink: '#2a1030', accent: '#ff3d8b', g1: '#ff8ac0', g2: '#ffe3ef' },
  ocean: { label: 'Ocean', bg: '#002b45', ink: '#ffffff', accent: '#00c2d1', g1: '#0077b6', g2: '#002b45' },
  mocha: { label: 'Mocha', bg: '#3b2a22', ink: '#f6ede4', accent: '#d9a066', g1: '#8a5a3c', g2: '#3b2a22' },
  lilac: { label: 'Lilac', bg: '#ece6ff', ink: '#1d1440', accent: '#6c4ef5', g1: '#b7a6ff', g2: '#ece6ff' },
  tangerine: { label: 'Tangerine', bg: '#fff4e6', ink: '#1a1a1a', accent: '#ff7a00', g1: '#ffb35c', g2: '#fff4e6' },
  graphite: { label: 'Graphite', bg: '#1f2326', ink: '#e9ecef', accent: '#9aa5b1', g1: '#3b4249', g2: '#1f2326' },
  cherry: { label: 'Cherry', bg: '#1a0006', ink: '#ffe9ec', accent: '#ff1f4b', g1: '#a3002a', g2: '#1a0006' },
  mint: { label: 'Mint', bg: '#e6fff5', ink: '#0b2a22', accent: '#00b386', g1: '#7fe3c4', g2: '#e6fff5' },
  royal: { label: 'Royal', bg: '#1b1464', ink: '#ffffff', accent: '#ffd23f', g1: '#3b2fc9', g2: '#1b1464' },
  olive: { label: 'Olive', bg: '#2e3320', ink: '#f2efe2', accent: '#d4c26a', g1: '#5f6b3a', g2: '#2e3320' },
  ice: { label: 'Ice', bg: '#f2f8fc', ink: '#0e2233', accent: '#2f8fd8', g1: '#bfe0f5', g2: '#f2f8fc' },
  neon: { label: 'Neon night', bg: '#07070c', ink: '#ffffff', accent: '#00f0ff', g1: '#ff00c8', g2: '#07070c' },
  electric: { label: 'Electric blue', bg: '#efeff1', ink: '#0b0b0b', accent: '#1238ff', g1: '#1238ff', g2: '#ffffff' },
  crimson: { label: 'Crimson night', bg: '#0a0000', ink: '#ffffff', accent: '#ff2a1a', g1: '#ff2a1a', g2: '#0a0000' },
  volt: { label: 'Volt', bg: '#1f4dff', ink: '#ffffff', accent: '#8ff0b4', g1: '#6f8bff', g2: '#0c0c0c' },
};

// One stylesheet for every template. Units: --u is 1 % of the shorter side of the ad.
export const css = (fontBase = './fonts/') => fontCss(fontBase) + `
.bi-ad{--u:min(1cqw,1cqh);--m:calc(var(--u)*5.2);container-type:size;position:relative;overflow:hidden;width:100%;height:100%;background:var(--bg);color:var(--ink);font-family:var(--ft,"BI Grotesk"),"Helvetica Neue",Arial,sans-serif;font-weight:400;letter-spacing:-.01em;-webkit-font-smoothing:antialiased;box-sizing:border-box}
.bi-ad *{box-sizing:border-box;margin:0;padding:0;list-style:none}
.bi-ad p{line-height:1.04}
.bi-ad .small{font-size:calc(var(--u)*2.5);font-weight:500;line-height:1.2;letter-spacing:-.005em}
.bi-ad .micro{font-size:calc(var(--u)*2.1);font-weight:500;line-height:1.25;letter-spacing:.01em;text-transform:uppercase}
.bi-ad .muted{opacity:.7}
.bi-ad .bi-c{position:absolute;z-index:5}
.bi-ad .tl{left:var(--m);top:var(--m)} .bi-ad .tr{right:var(--m);top:var(--m);text-align:right} .bi-ad .bl{left:var(--m);bottom:var(--m)} .bi-ad .br{right:var(--m);bottom:var(--m);text-align:right}
.bi-ad .bi-media{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.bi-ad .bi-media.dim{filter:brightness(.62)} .bi-ad .bi-media.grey{filter:grayscale(1) contrast(1.05)}
.bi-ad .bi-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.35))}
.bi-ad .bi-acc{color:var(--accent)} .bi-ad .bi-acc2{color:var(--accent)}
.bi-ad .bi-ring{display:inline-grid;place-items:center;width:calc(var(--u)*7);height:calc(var(--u)*7);border:calc(var(--u)*.25) solid currentColor;border-radius:50%;font-size:calc(var(--u)*2.2);font-weight:500;letter-spacing:0}
.bi-ad .bi-h1{font-size:calc(var(--u)*13);line-height:.94;letter-spacing:-.03em}
.bi-ad .bi-h2{font-size:calc(var(--u)*8);line-height:1;letter-spacing:-.025em}
.bi-ad .bi-h3{font-size:calc(var(--u)*4.6);line-height:1.08;letter-spacing:-.015em}
.bi-ad .bi-pill{display:inline-flex;gap:calc(var(--u)*1.4);align-items:center;padding:calc(var(--u)*1.6) calc(var(--u)*3);border-radius:99px;background:var(--ink);color:var(--bg);font-size:calc(var(--u)*2.6);font-weight:500}
/* stat poster: lines stepping down the poster at different indents */
.bi-ad .bi-stack{position:absolute;left:var(--m);right:var(--m);bottom:calc(var(--m)*1.4);color:#fff;font-size:calc(var(--u)*9.4);letter-spacing:-.03em;z-index:3}
.bi-ad .bi-stack p{line-height:1} .bi-ad .bi-stack .s0{margin-left:38%;font-size:.62em} .bi-ad .bi-stack .s1{margin-left:12%} .bi-ad .bi-stack .s2{margin-left:24%} .bi-ad .bi-stack .s3{margin-left:12%}
.bi-ad .bi-stack .bi-acc{color:var(--accent);margin-right:.08em}
/* year mark */
.bi-ad .bi-mark{position:absolute;inset:0;display:grid;place-items:center;color:var(--ink)} .bi-ad .bi-mark p{position:relative;font-size:calc(var(--u)*25);letter-spacing:-.03em}
.bi-ad .bi-x{position:absolute;inset:8% 6%;width:88%;height:84%;color:var(--ink)}
/* wordmark over photo */
.bi-ad .bi-wordmark{position:absolute;left:0;right:0;bottom:-.17em;z-index:3;text-align:center;font-size:calc(var(--u)*36);line-height:1;letter-spacing:-.03em;white-space:nowrap}
.bi-ad .bi-b1{position:absolute;z-index:3;left:44%;top:46%} .bi-ad .bi-b2{position:absolute;z-index:3;left:70%;top:46%}
/* statement */
.bi-ad .bi-label{position:absolute;left:33%;top:26%} .bi-ad .bi-statement{position:absolute;left:33%;right:var(--m);top:31%;font-size:calc(var(--u)*6.4);line-height:1.05;letter-spacing:-.022em;text-indent:24%}
/* hiring */
.bi-ad .bi-half{position:absolute;left:0;top:0;bottom:0;width:46%} .bi-ad .bi-half.r{left:auto;right:0}
.bi-ad .bi-hire{position:absolute;left:52%;top:16%} .bi-ad .bi-roles{position:absolute;left:52%;right:var(--m);top:44%;font-size:calc(var(--u)*3.6);line-height:1.25}
.bi-ad .bi-roles li{padding:calc(var(--u)*1.1) 0;border-top:calc(var(--u)*.15) solid currentColor}
/* new work: a contact sheet of two squares */
.bi-ad .bi-sheet{position:absolute;inset:0;display:grid;grid-template-columns:1fr 1fr} .bi-ad .bi-cell{position:relative} .bi-ad .bi-cap{display:flex;flex-direction:column;justify-content:flex-end;gap:calc(var(--u)*1.4);padding:var(--m);padding-bottom:calc(var(--m)*2.4)}
/* quote */
.bi-ad .bi-quote{position:absolute;left:var(--m);right:12%;top:32%;font-size:calc(var(--u)*6);line-height:1.08;letter-spacing:-.02em}
/* event */
.bi-ad .bi-date{position:absolute;left:var(--m);top:18%;font-size:calc(var(--u)*30);line-height:.85;letter-spacing:-.03em} .bi-ad .bi-what{position:absolute;left:44%;right:var(--m);top:58%;font-size:calc(var(--u)*4.8);line-height:1.08;letter-spacing:-.015em}
/* services list */
.bi-ad .bi-list{position:absolute;left:33%;right:var(--m);top:30%;font-size:calc(var(--u)*6.4);line-height:1.12;letter-spacing:-.02em}
/* book a call */
.bi-ad .bi-split{position:absolute;inset:0;display:grid;grid-template-columns:1fr 1fr} .bi-ad .bi-black{background:#000;color:#fff;padding:var(--m);display:flex;flex-direction:column;gap:calc(var(--u)*3);justify-content:flex-end}
.bi-ad .bi-black .small:first-child{position:absolute;top:var(--m)} .bi-ad .bi-black .bi-pill{align-self:flex-start;background:#fff;color:#000} .bi-ad .bi-photo{position:relative}
/* big number */
.bi-ad .bi-num{position:absolute;left:calc(var(--m)*.4);bottom:4%;font-size:calc(var(--u)*58);line-height:.78;letter-spacing:-.04em} .bi-ad .bi-numcap{position:absolute;left:60%;top:30%}
.bi-ad .bi-sale{font-size:calc(var(--u)*30);bottom:20%;white-space:nowrap}
/* team */
.bi-ad .bi-band{position:absolute;left:0;right:0;top:0;height:62%} .bi-ad .bi-band.low{top:auto;bottom:0;height:58%} .bi-ad .bi-teamh{position:absolute;left:33%;top:68%}
/* court: condensed capitals */
.bi-ad .bi-cond,.bi-ad .bi-cross,.bi-ad .bi-score{font-family:var(--fdx,"BI Condensed"),Impact,"Arial Narrow",sans-serif;font-weight:400;text-transform:uppercase;letter-spacing:0}
.bi-ad .bi-cond{position:absolute;left:var(--m);bottom:16%;z-index:3;font-size:calc(var(--u)*17);line-height:.86}
.bi-ad .bi-cond .bi-acc2{color:var(--accent)}
.bi-ad .bi-brush{position:absolute;left:-8%;top:8%;width:92%;height:44%;z-index:1;opacity:.95;mix-blend-mode:screen}
.bi-ad .bi-star{position:absolute;z-index:2;right:-10%;top:12%;width:78%;height:auto;rotate:-14deg}
.bi-ad .bi-cross{position:absolute;left:-3%;right:-3%;top:50%;translate:0 -50%;z-index:3;font-size:calc(var(--u)*30);line-height:.9;color:var(--accent);white-space:nowrap;text-align:center}
.bi-ad .bi-club{font-family:var(--ft,"BI Grotesk"),sans-serif;font-size:calc(var(--u)*4.6);font-weight:500;letter-spacing:-.04em}
.bi-ad .bi-fade{position:absolute;inset:0;background:linear-gradient(160deg,rgba(0,0,0,0) 30%,rgba(0,0,0,.7))}
.bi-ad .bi-coach{bottom:20%;rotate:-6deg;transform-origin:0 100%}
.bi-ad .bi-vs{display:flex;flex-direction:column;top:24%;bottom:auto;font-size:calc(var(--u)*11);white-space:nowrap} .bi-ad .bi-vs .bi-acc{font-size:.6em;margin:.1em 0}
.bi-ad .bi-score{position:absolute;left:var(--m);right:var(--m);bottom:12%;z-index:3;font-size:calc(var(--u)*24);line-height:.86;color:var(--accent)}
.bi-ad .bi-acad{top:22%;bottom:auto;color:var(--accent)} .bi-ad .bi-roles.micro2{left:var(--m);right:52%;top:60%;font-size:calc(var(--u)*2.8);text-transform:uppercase;font-weight:500}
/* product */
.bi-ad .bi-stage{position:absolute;inset:16% 18%;border-radius:calc(var(--u)*3);overflow:hidden}
/* launch, tips, announce, carousel */
.bi-ad .bi-launch{position:absolute;left:var(--m);top:var(--m);color:#fff;z-index:3}
.bi-ad .bi-tipsh{position:absolute;left:var(--m);top:18%} .bi-ad .bi-tips{position:absolute;left:33%;right:var(--m);top:52%;font-size:calc(var(--u)*4.2);line-height:1.15;counter-reset:t}
.bi-ad .bi-tips li{padding:calc(var(--u)*1.6) 0;border-top:calc(var(--u)*.15) solid currentColor}
.bi-ad .bi-ann{bottom:-.14em;font-size:calc(var(--u)*40)} .bi-ad .bi-carh{position:absolute;left:var(--m);top:22%}
/* display fonts follow the --fd variable */
.bi-ad .bi-h1,.bi-ad .bi-h2,.bi-ad .bi-h3,.bi-ad .bi-wordmark,.bi-ad .bi-stack,.bi-ad .bi-mark p,.bi-ad .bi-statement,.bi-ad .bi-quote,.bi-ad .bi-date,.bi-ad .bi-list,.bi-ad .bi-num{font-family:var(--fd,inherit)}
.bi-ad .bi-logotext{font:inherit}
.bi-ad .bi-gradov{position:absolute;inset:0;pointer-events:none}
.bi-ad .bi-logo{display:inline-block;height:calc(1em*var(--ls,1));width:auto;max-width:calc(var(--u)*40);object-fit:contain;vertical-align:middle}
.bi-ad .bi-logo-svg{aspect-ratio:692/720;color:var(--logo,currentColor)} .bi-ad .bi-logo-svg svg{display:block;width:100%;height:100%}
.bi-ad [data-n][style*="--nx"]{transform:translate(calc(var(--u)*var(--nx,0)),calc(var(--u)*var(--ny,0)))}
.bi-ad [data-n].is-picked{outline:1.5px dashed #3b82f6;outline-offset:4px}
.bi-ad .bi-dg{position:absolute;inset:0;z-index:3;pointer-events:none}
.bi-ad .bi-extra{position:absolute;height:auto;max-width:none;display:block;object-fit:cover;user-select:none;-webkit-user-drag:none}
.bi-ad .bi-extra.is-picked{outline:1.5px dashed #3b82f6;outline-offset:3px}
.bi-ad .bi-pager{position:absolute;z-index:8;display:flex;align-items:center;gap:calc(var(--u)*.7);color:var(--ink);font-family:var(--fm,"BI Mono");font-size:calc(var(--u)*2.1);line-height:1}
.bi-ad .bi-pager.pos-tl{left:var(--m);top:var(--m)} .bi-ad .bi-pager.pos-tr{right:var(--m);top:var(--m)} .bi-ad .bi-pager.pos-bl{left:var(--m);bottom:var(--m)} .bi-ad .bi-pager.pos-br{right:var(--m);bottom:var(--m)} .bi-ad .bi-pager.pos-tc{left:50%;top:var(--m);translate:-50% 0} .bi-ad .bi-pager.pos-bc{left:50%;bottom:var(--m);translate:-50% 0}
.bi-ad .pg-sq{width:calc(var(--u)*1.9);height:calc(var(--u)*1.9);background:currentColor;opacity:.35} .bi-ad .pg-sq.on{opacity:1}
.bi-ad .pg-dot{width:calc(var(--u)*1.2);height:calc(var(--u)*1.2);border-radius:50%;background:currentColor;opacity:.35} .bi-ad .pg-dot.on{opacity:1;width:calc(var(--u)*3.4);border-radius:99px}
.bi-ad .pg-bars{left:var(--m)!important;right:var(--m)!important;translate:none!important} .bi-ad .pg-bar{flex:1;height:calc(var(--u)*.45);border-radius:9px;background:currentColor;opacity:.3} .bi-ad .pg-bar.on{opacity:1}
.bi-ad .pg-numbers b{font-weight:500} .bi-ad .pg-numbers span{opacity:.55}
.bi-ad .pg-big{font-family:var(--fd,inherit);font-size:calc(var(--u)*9);font-weight:700;letter-spacing:-.04em;-webkit-text-stroke:1.5px currentColor;color:transparent}
.bi-ad .pg-line .pg-line{position:relative;display:block;width:calc(var(--u)*14);height:1.5px;background:color-mix(in srgb,currentColor 30%,transparent)} .bi-ad .pg-line .pg-line i{position:absolute;left:0;top:0;bottom:0;background:currentColor}
.bi-ad .pg-line b{font-weight:500} .bi-ad .pg-line span{opacity:.55}
/* landscape and link formats: wider than tall */
@container (min-aspect-ratio: 13/10){
  .bi-ad .bi-wordmark{font-size:calc(var(--u)*52)} .bi-ad .bi-b1{left:52%;top:26%} .bi-ad .bi-b2{left:72%;top:26%}
  .bi-ad .bi-statement{left:40%;top:30%;font-size:calc(var(--u)*7)} .bi-ad .bi-label{left:40%;top:22%}
  .bi-ad .bi-stack{left:auto;right:var(--m);width:58%}
  .bi-ad .bi-half{width:40%} .bi-ad .bi-hire,.bi-ad .bi-roles{left:46%}
  .bi-ad .bi-date{top:14%} .bi-ad .bi-what{left:56%;top:44%}
  .bi-ad .bi-list{left:46%;top:22%;columns:2;column-gap:var(--m)} .bi-ad.bi-services .bi-label{left:46%;top:12%}
  .bi-ad .bi-roles.micro2{left:var(--m);right:56%;top:58%} .bi-ad .bi-acad{font-size:calc(var(--u)*13)}
  .bi-ad .bi-num{font-size:calc(var(--u)*66)} .bi-ad .bi-numcap{left:auto;right:var(--m);top:var(--m);text-align:right;margin-top:calc(var(--u)*10)}
  .bi-ad .bi-band{left:auto;width:52%;height:100%} .bi-ad .bi-band.low{width:52%;height:100%} .bi-ad .bi-teamh{left:var(--m);top:34%} .bi-ad .bi-carh{top:34%}
  .bi-ad .bi-cond{font-size:calc(var(--u)*15)} .bi-ad .bi-brush{width:70%} .bi-ad .bi-star{width:44%;right:4%;top:-6%}
  .bi-ad .bi-stage{inset:12% 34%} .bi-ad .bi-tipsh{top:22%} .bi-ad .bi-tips{left:50%;top:22%}
  .bi-ad .bi-sale{font-size:calc(var(--u)*44)} .bi-ad .bi-quote{right:30%;top:26%}
}
/* story: tall */
@container (max-aspect-ratio: 7/10){
  .bi-ad .bi-wordmark{font-size:calc(var(--u)*34);bottom:12%} .bi-ad .bi-b1{left:var(--m);top:52%} .bi-ad .bi-b2{left:56%;top:52%}
  .bi-ad .bi-statement{left:var(--m);top:34%;font-size:calc(var(--u)*7.6)} .bi-ad .bi-label{left:var(--m);top:28%}
  .bi-ad .bi-stack{bottom:18%;font-size:calc(var(--u)*11)}
  .bi-ad .bi-half{width:100%;height:46%;bottom:auto} .bi-ad .bi-half.r{height:46%} .bi-ad .bi-hire{left:var(--m);top:50%} .bi-ad .bi-roles{left:var(--m);top:68%}
  .bi-ad .bi-sheet{grid-template-columns:1fr;grid-template-rows:1fr 1fr}
  .bi-ad .bi-split{grid-template-columns:1fr;grid-template-rows:1.1fr 1fr} .bi-ad .bi-split .bi-photo{order:-1}
  .bi-ad .bi-date{top:20%} .bi-ad .bi-what{left:var(--m);top:46%}
  .bi-ad .bi-list{left:var(--m);top:30%;font-size:calc(var(--u)*8)}
  .bi-ad .bi-num{bottom:16%} .bi-ad .bi-numcap{left:var(--m);top:24%}
  .bi-ad .bi-cond{font-size:calc(var(--u)*21);bottom:22%} .bi-ad .bi-cross{font-size:calc(var(--u)*34)} .bi-ad .bi-star{width:110%;right:-30%}
  .bi-ad .bi-acad{top:48%} .bi-ad .micro2{top:76%;right:var(--m)}
  .bi-ad .bi-stage{inset:22% 10%} .bi-ad .bi-tipsh{top:20%} .bi-ad .bi-tips{left:var(--m);top:46%}
  .bi-ad .bi-teamh{left:var(--m);top:66%} .bi-ad .bi-carh{top:20%} .bi-ad .bi-quote{top:30%;right:var(--m);font-size:calc(var(--u)*7.4)}
  .bi-ad .bi-ann{font-size:calc(var(--u)*34);bottom:20%} .bi-ad .bi-sale{font-size:calc(var(--u)*30);bottom:24%} .bi-ad .bi-vs{font-size:calc(var(--u)*10)}
}` + motionCss + moreCss + more2Css + more3Css + more5Css + more6Css + more7Css + more8Css + more9Css + more10Css;

export function getTemplate(id) { return templates.find((t) => t.id === id) || templates[0]; }

// Returns the inner markup of one ad. Put it in an element sized to the format (or any size: it scales).
//   palette: 'own' (the template's look), 'brand', a key of `palettes`, or an object {bg, ink, accent, g1, g2}
//   style:   overrides { bg, ink, accent, g1, g2, fd, ft, fm (font keys or CSS family names), ix, iy, iz, ov, nudge: {n: [x, y]} }
//   brand:   { name, short, handle, url, place, logo (image URL), colors: {bg, ink, accent, g1, g2}, fonts: {d, t, m} }
const fam = (k) => (!k ? null : fonts[k] ? `'${fonts[k].family}'` : `'${String(k).replace(/['"]/g, '')}'`);
export const srcKey = (s = '') => { let h = 5381; const step = Math.max(1, Math.floor(s.length / 4000)); for (let i = 0; i < s.length; i += step) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return h.toString(36) + '.' + s.length.toString(36); };
export function render(id, { theme, palette, style = {}, fields = {}, brand = {}, image, images = [] } = {}) {
  const tpl = getTemplate(id);
  const b = { ...brandDefaults, ...brand };
  const f = { ...tpl.fields, ...fields };
  const own = tpl.look || themeLook(themes[autoThemeKey(tpl)]);
  let pal = palette ?? theme ?? 'own';
  if (typeof pal === 'string') pal = pal === 'own' ? own : pal === 'brand' ? { ...own, ...(b.colors || {}) } : themes[pal] ? themeLook(themes[pal]) : palettes[pal] || own;
  const c = { ...own, ...pal, ...Object.fromEntries(['bg', 'ink', 'accent', 'accent2', 'g1', 'g2'].filter((k) => style[k]).map((k) => [k, style[k]])) };
  const tf = { ...(own.fonts || {}), ...((b.fonts && Object.fromEntries(Object.entries(b.fonts).filter(([, v]) => v))) || {}) };
  const fd = fam(style.fd || tf.d), ft = fam(style.ft || tf.t), fm = fam(style.fm || tf.m);
  const vars = [`--bg:${c.bg}`, `--ink:${c.ink}`, `--muted:${c.muted || c.ink}`, `--accent:${c.accent}`, `--accent2:${c.accent2 || c.accent}`, `--on-accent:${c.onAccent || c.bg}`, `--g1:${c.g1 || c.accent}`, `--g2:${c.g2 || c.bg}`,
    fd && `--fd:${fd}`, style.fd && `--fdx:${fd}`, ft && `--ft:${ft}`, fm && `--fm:${fm}`, style.ix != null && `--ix:${style.ix}%`, style.iy != null && `--iy:${style.iy}%`, style.iz && `--iz:${style.iz}`, style.ov != null && `--ov:${style.ov}`, style.ls && `--ls:${style.ls}`, style.logo && `--logo:${style.logo}`].filter(Boolean).join(';');
  const art = tpl.art ? portrait(tpl.art[0], tpl.art[1] || [c.g2 || '#111', c.g1 || '#888'], 3) : null;
  const img = image || art || (tpl.photo ? placeholder(tpl.photo[0], tpl.photo[1] === 'red' && pal.photo !== 'red' ? 'red' : tpl.photo[1], 3) : '');
  let html = tpl.look ? tpl.html(f, img, b, c, images) : tpl.html(f, { ...c, photo: c.photo || 'grey' }, b, img);
  // number every text block so the studio can move it; apply saved nudges
  let n = 0;
  const nudge = style.nudge || {};
  const el = style.el || {};
  // layers: an order from back to front, hidden layers and opacity per layer
  const lay = style.layers || {}, order = lay.order || null, hide = lay.hide || {}, lop = lay.op || {};
  const zOf = (key) => { if (!order) return null; const i = order.indexOf(key); return i < 0 || (key === 'photo' && i === 0) ? null : 10 + i; };
  html = html.replace(/<p(?=[\s>])/g, () => {
    const i = n++; const v = nudge[i], e = el[i] || {}, z = zOf('t' + i);
    const css = [v && `--nx:${v[0]};--ny:${v[1]}`, e.f && `font-family:${fam(e.f).replace(/"/g, '')}`, e.z && e.z !== 1 && `--u:calc(min(1cqw,1cqh)*${e.z})`, e.c && `color:${e.c}`, z != null && `z-index:${z}`, hide['t' + i] && 'visibility:hidden', lop['t' + i] != null && `opacity:${lop['t' + i]}`].filter(Boolean).join(';');
    return `<p data-n="${i}"${css ? ` style-n="${css}"` : ''}`;
  });
  html = html.replace(/<p data-n="(\d+)" style-n="([^"]+)"([^>]*?) style="([^"]*)"/g, '<p data-n="$1"$3 style="$4;$2"').replace(/ style-n="([^"]+)"/g, ' style="$1"');
  // the template's photo: order, visibility, opacity and adjustments on top of its own look
  const fx = style.photoFx || {}, pz = zOf('photo');
  const adj = (o) => { const a = []; if (o.br != null && o.br !== 1) a.push(`brightness(${o.br})`); if (o.ct != null && o.ct !== 1) a.push(`contrast(${o.ct})`); if (o.sat != null && o.sat !== 1) a.push(`saturate(${o.sat})`); if (o.bl) a.push(`blur(calc(var(--u)*${o.bl}))`); return a.join(' '); };
  const pAdj = adj(fx), pOp = lop.photo ?? fx.op;
  // a black-and-white template photo turns colour again as soon as the user sets a saturation above 0
  const satSet = fx.sat != null;
  if (pAdj || pz != null || hide.photo || pOp != null || satSet) {
    const base = satSet
      ? { grey: 'contrast(1.05)', dim: 'brightness(.62)', soft: 'blur(calc(var(--u)*1))', blurred: 'blur(calc(var(--u)*2.4))' }
      : { grey: 'grayscale(1) contrast(1.05)', dim: 'brightness(.62)', soft: 'blur(calc(var(--u)*1)) grayscale(1)', blurred: 'blur(calc(var(--u)*2.4))' };
    html = html.replace(/<img class="bi-media([^"]*)"/g, (m, cls) => {
      const own = cls.split(/\s+/).map((k) => base[k]).filter(Boolean).join(' ');
      const bw = satSet && /\b(grey|soft)\b/.test(cls)
      const fl = [own, pAdj].filter(Boolean).join(' ');
      const css = [(pAdj || bw) && `filter:${fl || 'none'}`, pz != null && `z-index:${pz}`, hide.photo && 'visibility:hidden', pOp != null && `opacity:${pOp}`].filter(Boolean).join(';');
      return `<img style="${css}" class="bi-media${cls}"`;
    });
  }
  // a shade the user points with an arrow: direction in degrees, strength 0..1, colour
  if (style.dg) { const d = style.dg, k = Math.max(0, Math.min(1, d.s ?? .6)); html += `<div class="bi-dg" style="background:linear-gradient(${d.a ?? 135}deg, transparent ${Math.round((1 - k) * 75)}%, ${d.c || '#000000'} 100%);opacity:${(0.35 + k * 0.65).toFixed(2)}"></div>`; }
  // pictures that differ can be framed one by one: mpos is keyed by a short hash of the picture
  const mpos = style.mpos || {};
  if (Object.keys(mpos).length) html = html.replace(/<img( style="[^"]*")? class="bi-media([^"]*)" src="([^"]*)"/g, (m, st0, cls, src) => {
    const p = mpos[srcKey(src.replace(/&amp;/g, '&'))]; if (!p) return m;
    const add = `object-position:${p[0]}% ${p[1]}%;transform-origin:${p[0]}% ${p[1]}%;scale:${p[2] || 1}`;
    return `<img style="${st0 ? st0.slice(8, -1) + ';' : ''}${add}" class="bi-media${cls}" src="${src}"`;
  });
  if (style.pager && style.pager.kind && style.pager.kind !== 'none') html += pagerHtml(style.pager);
  // extra pictures placed by the user: centre x/y and width in % of the ad
  (style.extra || []).forEach((x, i) => {
    const key = 'x:' + x.id, z = zOf(key) ?? 30 + i, a = adj(x);
    const css = [`left:${x.x ?? 50}%`, `top:${x.y ?? 50}%`, `width:${x.w ?? 40}%`, `transform:translate(-50%,-50%) rotate(${x.r || 0}deg)`, `z-index:${z}`, (lop[key] ?? x.op) != null && `opacity:${lop[key] ?? x.op}`, a && `filter:${a}`, x.rad && `border-radius:${x.rad}%`, hide[key] && 'visibility:hidden'].filter(Boolean).join(';');
    html += `<img class="bi-extra" data-x="${esc(x.id)}" src="${esc(x.src)}" alt="" decoding="async" style="${css}">`;
  });
  const gr = style.grad && gradients[style.grad];
  if (gr) { const ov = `<div class="bi-gradov" style="background:${gr.css};mix-blend-mode:${gr.blend || 'normal'};opacity:${gr.op ?? 1}"></div>`; const m = html.match(/<img class="bi-media[^>]*>(?![\s\S]*<img class="bi-media)/); html = m ? html.replace(m[0], m[0] + ov) : ov + html; }
  return `<div class="bi-ad bi-${tpl.id}" style="${vars}">${html}</div>`;
}
function themeLook(t) { return { bg: t.bg, ink: t.ink, muted: t.muted, accent: t.accent, accent2: t.accent2, onAccent: t.onAccent, photo: t.photo, g1: t.accent2 || t.accent, g2: t.bg, fonts: { d: t.display === 'condensed' ? 'condensed' : 'grotesk', t: 'grotesk', m: 'mono' } }; }
export function autoThemeKey(tpl) { return tpl.family === 'Court' ? 'court' : tpl.photo?.[1] === 'red' ? 'signal' : /statement|services|quote|tips/.test(tpl.id) ? 'mono' : 'ink'; }

// Turns an ad into a standalone SVG (fonts and pictures embedded) for export to SVG or PNG.
export async function toSVG(markup, { w, h, fontBase = './fonts/', extraCss = '' }) {
  const toData = async (url) => {
    if (url.startsWith('data:')) return url;
    const blob = await (await fetch(url)).blob();
    return await new Promise((r) => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(blob); });
  };
  const used = new Set(['BI Grotesk', 'BI Condensed', 'BI Mono', 'BI Serif', 'BI Wide']);
  for (const f of Object.values(fonts)) if (markup.includes(f.family)) used.add(f.family);
  const holder = document.createElement('div');
  holder.innerHTML = markup;
  const fams = getComputedStyleSafe(holder);
  fams.forEach((x) => used.add(x));
  let style = (css(fontBase) + extraCss).replace(/@font-face\{font-family:"([^"]+)"[^}]*\}/g, (rule, name) => (used.has(name) || extraCss.includes(rule) ? rule : ''));
  for (const m of [...style.matchAll(/url\(([^)]+)\)/g)]) if (!m[1].startsWith('"data:') && !m[1].startsWith('data:')) style = style.replace(m[1], await toData(m[1].replace(/^"|"$/g, '')));
  for (const im of holder.querySelectorAll('img')) im.setAttribute('src', await toData(im.getAttribute('src')));
  const xhtml = new XMLSerializer().serializeToString(holder.firstElementChild);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" style="width:${w}px;height:${h}px"><style>${style.replace(/</g, '\\3C ')}</style>${xhtml}</div></foreignObject></svg>`;
}
// Font families named in the ad's own style variables (display, text, labels).
function getComputedStyleSafe(holder) {
  const s = holder.firstElementChild?.getAttribute('style') || '';
  return [...s.matchAll(/--f[dtmx]:'([^']+)'/g)].map((m) => m[1]);
}

export async function toPNG(svg, { w, h, scale = 1 }) {
  const img = new Image();
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  await img.decode();
  await new Promise((r) => setTimeout(r, 60)); // fonts inside the SVG settle
  const c = document.createElement('canvas');
  c.width = w * scale; c.height = h * scale;
  c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
  return await new Promise((r) => c.toBlob(r, 'image/png'));
}
