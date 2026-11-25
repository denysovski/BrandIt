// BrandIt: a library of reusable ads in one studio identity.
// Every ad is plain HTML and CSS sized with container units, so one template fits every format.
// Used by the studio (studio/index.html), the Framer code component (framer/BrandItAd.tsx) and any page.
//
//   import { render, templates, formats, themes } from './lib/brandit.js';
//   el.innerHTML = render('stat-poster', { theme: 'signal', format: 'portrait', fields: { … } });

export const formats = {
  square: { label: 'Square post', w: 1080, h: 1080 },
  portrait: { label: 'Portrait post', w: 1080, h: 1350 },
  story: { label: 'Story and reel', w: 1080, h: 1920 },
  landscape: { label: 'Landscape', w: 1920, h: 1080 },
  link: { label: 'Link and LinkedIn', w: 1200, h: 627 },
};

// Themes. `ink` is text on `bg`; `accent` is one colour used in blocks, never in small text on photos.
export const themes = {
  mono: { label: 'Mono', bg: '#f4f3f1', ink: '#0b0b0b', muted: '#6e6c68', accent: '#0b0b0b', onAccent: '#ffffff', photo: 'grey', display: 'grotesk' },
  ink: { label: 'Ink', bg: '#0b0b0b', ink: '#ffffff', muted: '#9c9a95', accent: '#ffffff', onAccent: '#0b0b0b', photo: 'grey', display: 'grotesk' },
  signal: { label: 'Signal red', bg: '#e8401c', ink: '#ffffff', muted: '#ffd9cf', accent: '#0b0b0b', onAccent: '#ffffff', photo: 'red', display: 'grotesk' },
  paper: { label: 'Paper', bg: '#e9e5de', ink: '#161512', muted: '#77726a', accent: '#e8401c', onAccent: '#ffffff', photo: 'grey', display: 'grotesk' },
  court: { label: 'Court', bg: '#0c0c0c', ink: '#ffffff', muted: '#b8b8b8', accent: '#8ff0b4', accent2: '#1f4dff', onAccent: '#0c0c0c', photo: 'grey', display: 'condensed' },
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
const ring = (b) => `<span class="bi-ring">${esc(b.short)}</span>`;
const media = (src, cls = '') => `<img class="bi-media ${cls}" src="${esc(src)}" alt="">`;

// Templates. `fields` lists what the editor asks for; defaults are written as real-sounding examples for a
// fictional studio, and anything that must come from a real client is in [brackets].
export const templates = [
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

// One stylesheet for every template. Units: --u is 1 % of the shorter side of the ad.
export const css = (fontBase = './fonts/') => `
@font-face{font-family:"BI Grotesk";font-weight:400;src:url(${fontBase}host-grotesk-latin-400-normal.woff2) format("woff2")}
@font-face{font-family:"BI Grotesk";font-weight:500;src:url(${fontBase}host-grotesk-latin-500-normal.woff2) format("woff2")}
@font-face{font-family:"BI Grotesk";font-weight:400;unicode-range:U+0100-024F;src:url(${fontBase}host-grotesk-latin-ext-400-normal.woff2) format("woff2")}
@font-face{font-family:"BI Grotesk";font-weight:500;unicode-range:U+0100-024F;src:url(${fontBase}host-grotesk-latin-ext-500-normal.woff2) format("woff2")}
@font-face{font-family:"BI Condensed";src:url(${fontBase}anton-latin-400-normal.woff2) format("woff2")}
@font-face{font-family:"BI Condensed";unicode-range:U+0100-024F;src:url(${fontBase}anton-latin-ext-400-normal.woff2) format("woff2")}
.bi-ad{--u:min(1cqw,1cqh);--m:calc(var(--u)*5.2);container-type:size;position:relative;overflow:hidden;width:100%;height:100%;background:var(--bg);color:var(--ink);font-family:"BI Grotesk","Helvetica Neue",Arial,sans-serif;font-weight:400;letter-spacing:-.01em;-webkit-font-smoothing:antialiased;box-sizing:border-box}
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
.bi-ad .bi-cond,.bi-ad .bi-cross,.bi-ad .bi-score{font-family:"BI Condensed",Impact,"Arial Narrow",sans-serif;font-weight:400;text-transform:uppercase;letter-spacing:0}
.bi-ad .bi-cond{position:absolute;left:var(--m);bottom:16%;z-index:3;font-size:calc(var(--u)*17);line-height:.86}
.bi-ad .bi-cond .bi-acc2{color:var(--accent)}
.bi-ad .bi-brush{position:absolute;left:-8%;top:8%;width:92%;height:44%;z-index:1;opacity:.95;mix-blend-mode:screen}
.bi-ad .bi-star{position:absolute;z-index:2;right:-10%;top:12%;width:78%;height:auto;rotate:-14deg}
.bi-ad .bi-cross{position:absolute;left:-3%;right:-3%;top:50%;translate:0 -50%;z-index:3;font-size:calc(var(--u)*30);line-height:.9;color:var(--accent);white-space:nowrap;text-align:center}
.bi-ad .bi-club{font-family:"BI Grotesk",sans-serif;font-size:calc(var(--u)*4.6);font-weight:500;letter-spacing:-.04em}
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
}`;

export function getTemplate(id) { return templates.find((t) => t.id === id) || templates[0]; }

// Returns the inner markup of one ad. Put it in an element sized to the format (or any size: it scales).
export function render(id, { theme = 'mono', fields = {}, brand = {}, image } = {}) {
  const tpl = getTemplate(id);
  const t = typeof theme === 'string' ? themes[theme] || themes.mono : theme;
  const b = { ...brandDefaults, ...brand };
  const f = { ...tpl.fields, ...fields };
  const img = image || (tpl.photo ? placeholder(tpl.photo[0], tpl.photo[1] === 'red' && t.photo !== 'red' ? 'red' : tpl.photo[1], 3) : '');
  const vars = `--bg:${t.bg};--ink:${t.ink};--muted:${t.muted};--accent:${t.accent};--accent2:${t.accent2 || t.accent};--on-accent:${t.onAccent}`;
  return `<div class="bi-ad bi-${tpl.id}" style="${vars}">${tpl.html(f, t, b, img)}</div>`;
}

// Turns an ad into a standalone SVG (fonts and pictures embedded) for export to SVG or PNG.
export async function toSVG(markup, { w, h, fontBase = './fonts/' }) {
  const toData = async (url) => {
    if (url.startsWith('data:')) return url;
    const blob = await (await fetch(url)).blob();
    return await new Promise((r) => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(blob); });
  };
  let style = css(fontBase);
  for (const m of [...style.matchAll(/url\(([^)]+)\)/g)]) style = style.replace(m[1], await toData(m[1]));
  const holder = document.createElement('div');
  holder.innerHTML = markup;
  for (const im of holder.querySelectorAll('img')) im.setAttribute('src', await toData(im.getAttribute('src')));
  const xhtml = new XMLSerializer().serializeToString(holder.firstElementChild);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" style="width:${w}px;height:${h}px"><style>${style.replace(/</g, '\\3C ')}</style>${xhtml}</div></foreignObject></svg>`;
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
