// BrandIt: the fourth moodboard set — peach strategy posts, navy finance posts, colour-card posts and
// grey editorial layouts. Layout patterns only; every word and shape is our own.
import { esc, lines, list, accent, img, icon, L, logo } from './motion.js?v=7';

const ribbon = '<i class="z-rib a"></i><i class="z-rib b"></i>';
const metaRow = (a, b, c) => `<div class="z-meta"><p>${lines(a)}</p><p>${lines(b)}</p><p>${lines(c)}</p></div>`;
const ul = (s) => esc(s).replace(/_([^_]+)_/g, '<span class="z-ul">$1</span>');

export const more3Templates = [
  // peach and orange strategy
  { id: 'z-peach-stat', name: 'Big number and photo', cat: 'Professional', look: L('#ff5a1f', '#141414', '#ff5a1f', '#ff5a1f', '#ffc9bb', 'tight', 'tight'), art: ['front', ['#4a2a1a', '#e8b49a']],
    fields: { num: '+27%', text: 'Teams with a clear plan grow\n27% faster than unfocused ones.\nDirection multiplies effort.', label: 'Performance' },
    html: (f, im) => `<div class="z-half">${img(im)}${ribbon}</div><p class="mo-dw z-num">${esc(f.num)}</p><p class="mo-micro z-numt">${lines(f.text)}</p><p class="mo-micro" style="right:var(--m);top:47%;text-transform:none">${esc(f.label)}</p>` },
  { id: 'z-ribbon-headline', name: 'Ribbon headline', cat: 'Gradient', look: L('#ffc9bb', '#141414', '#ff5a1f', '#ff5a1f', '#ffc9bb', 'tight', 'tight'),
    fields: { head: 'Clarity\npays off', text: 'Growth from €900K to €1.8M\nexposes a weak strategy.\nA strong one scales impact.', label: 'Positioning' },
    html: (f, im, b) => `<i class="z-sweep"></i><i class="z-sweep two"></i><p class="mo-dw z-ph">${lines(f.head)}</p><i class="z-rule" style="top:39%"></i><p class="mo-micro z-pt">${lines(f.text)}</p><p class="mo-micro" style="left:var(--m);bottom:var(--m);text-transform:none">${esc(f.label)}</p><p class="mo-dw z-brand">${logo(b, b.name)}</p>` },
  { id: 'z-orange-statement', name: 'Orange statement', cat: 'Professional', look: L('#ff5a1f', '#141414', '#141414', '#ff5a1f', '#141414', 'tight', 'tight'),
    fields: { label: 'Strategy', head: 'Focus\ndefines\ndirection', text: 'When everything matters,\nnothing truly does.\nStrategy sets priority.' },
    html: (f, im, b) => `<p class="mo-micro" style="left:var(--m);top:var(--m);text-transform:none">${esc(f.label)}</p><p class="mo-dw z-tr">${logo(b, b.name)}</p><p class="mo-dw z-oh">${lines(f.head)}</p><i class="z-rule" style="top:84%;right:50%"></i><p class="mo-micro z-ot">${lines(f.text)}</p>` },
  { id: 'z-photo-ribbon', name: 'Photo with ribbon', cat: 'Bold photo', look: L('#2a1a12', '#ffffff', '#ff5a1f', '#ff5a1f', '#2a1a12', 'tight', 'tight'), art: ['profile', ['#5a3a2a', '#f2c2a2']],
    fields: { url: 'north.studio' },
    html: (f, im, b) => `${img(im)}${ribbon}<p class="mo-dw" style="left:var(--m);top:var(--m);font-size:calc(var(--u)*4)">${logo(b, b.short)}</p><p class="mo-micro" style="right:var(--m);top:var(--m);text-transform:none">${esc(f.url)}</p>` },
  { id: 'z-split-underline', name: 'Photo and underline', cat: 'Professional', look: L('#ffc9bb', '#141414', '#ff5a1f', '#ff5a1f', '#ffc9bb', 'tight', 'tight'), art: ['profile', ['#5a4a42', '#efe2d8']],
    fields: { head: 'Strategy\nis a _choice_', label: 'Strategy' },
    html: (f, im, b) => `<div class="z-top">${img(im)}${ribbon}</div><p class="mo-dw z-sm">${logo(b, b.short)}</p><p class="mo-dw z-suh">${ul(f.head).split('\n').join('<br>')}</p><p class="mo-micro" style="left:var(--m);bottom:var(--m);text-transform:none">${esc(f.label)}</p>` },
  { id: 'z-bars', name: 'Two bars', cat: 'Professional', look: L('#ffc9bb', '#141414', '#ff5a1f', '#ff5a1f', '#141414', 'tight', 'tight'),
    fields: { head: 'Structure', text: 'Growth from €900K to €1.8M\nexposes a weak strategy.\nA strong one scales impact.', a: '€900K', b: '€1.8M' },
    html: (f) => `<p class="mo-dw z-bh">${esc(f.head)}</p><i class="z-rule" style="top:15%;right:50%"></i><p class="mo-micro z-bt">${lines(f.text)}</p><div class="z-bar a"><p>${esc(f.a)}</p></div><div class="z-bar b"><p>${esc(f.b)}</p></div>` },
  // navy finance
  { id: 'z-navy-photo', name: 'Navy photo text', cat: 'Professional', look: L('#05123a', '#ffffff', '#2f6bff', '#0a2a8a', '#05123a', 'grotesk', 'grotesk'), art: ['front', ['#1a2a4a', '#8aa4c8']],
    fields: { label: 'Execution platform', head: 'Precision. Connectivity.\nPerformance.', text: 'One platform for trading across classic and digital markets, with fast access to every venue from a single place.' },
    html: (f, im) => `${img(im)}<div class="z-navyfade"></div><p class="mo-micro z-nl">${esc(f.label)}</p><p class="mo-dw z-nh">${lines(f.head)}</p><p class="mo-small z-nt">${esc(f.text)}</p>` },
  { id: 'z-shape-grid', name: 'Shape grid', cat: 'Gradient', look: L('#020a2a', '#ffffff', '#1f5cff', '#1f5cff', '#020a2a', 'grotesk', 'grotesk'),
    fields: { word: '' },
    html: (f) => `<div class="z-shapes">${Array.from({ length: 9 }, (_, i) => `<i class="${i === 4 ? 'sq' : ''}"></i>`).join('')}</div>${f.word ? `<p class="mo-dw z-shw">${esc(f.word)}</p>` : ''}` },
  { id: 'z-peaks', name: 'Gradient peaks', cat: 'Gradient', look: L('#020a2a', '#ffffff', '#1f5cff', '#1f5cff', '#020a2a', 'grotesk', 'grotesk'),
    fields: { word: '' },
    html: (f) => `<svg class="z-peak" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="zp1" x1="0" x2="1" y1="1" y2="0"><stop offset="0" stop-color="var(--g2)"/><stop offset="1" stop-color="var(--g1)"/></linearGradient></defs><path d="M0 60 L30 40 L55 46 L72 30 L100 8 L100 125 L0 125Z" fill="url(#zp1)" opacity=".55"/><path d="M0 82 L25 66 L44 70 L60 56 L80 62 L100 40 L100 125 L0 125Z" fill="url(#zp1)" opacity=".75"/><path d="M0 104 L30 90 L50 96 L75 82 L100 86 L100 125 L0 125Z" fill="url(#zp1)"/></svg>${f.word ? `<p class="mo-dw z-shw">${esc(f.word)}</p>` : ''}` },
  // colour cards (the post IS the palette)
  { id: 'z-colour-cards', name: 'Colour cards', cat: 'Editorial', look: L('#8a8580', '#ffffff', '#ffffff', '#8a8580', '#2a2622', 'tight', 'tight'), art: ['object', ['#6a625a', '#d9cfc4']],
    fields: { c1: 'Burnt clay #C34811', c2: 'Gallery blue #0B369A', c3: 'Stone linen #D9D1CA', foot: '25.04', tag: 'design notes' },
    html: (f, im, b) => { const card = (s, i) => { const m = String(s).match(/^(.*?)\s*(#[0-9a-fA-F]{6})\s*$/) || [0, s, '#888888']; const hex = m[2]; const dark = parseInt(hex.slice(1, 3), 16) * .3 + parseInt(hex.slice(3, 5), 16) * .59 + parseInt(hex.slice(5, 7), 16) * .11 < 150; return `<div class="z-card" style="top:${17 + i * 22}%;background:${hex};color:${dark ? '#f2eee9' : '#0b369a'}"><p>${esc(m[1])}</p><span>${esc(hex.toUpperCase())}</span></div>`; };
      return `${img(im)}<p class="mo-dw" style="right:var(--m);top:var(--m);font-size:calc(var(--u)*3)">${logo(b, b.name)}</p>${[f.c1, f.c2, f.c3].map(card).join('')}<p class="mo-small" style="left:var(--m);bottom:var(--m)">${esc(f.foot)}</p><p class="mo-small" style="right:var(--m);bottom:var(--m)">${esc(f.tag)}</p>`; } },
  // warm minimal and editorial
  { id: 'z-brackets', name: 'Bracket labels', cat: 'Minimal', look: L('#7a3a22', '#ffffff', '#ffffff', '#7a3a22', '#2a120a', 'grotesk', 'grotesk'), art: ['front', ['#5a2a1a', '#c8754a']],
    fields: { top: '[ who are we ]', est: 'Estd 2026', word: 'EDGE', sub: 'Marketing agency' },
    html: (f, im) => `${img(im)}<div class="mo-shade light"></div><p class="mo-micro z-c" style="top:14%">${esc(f.top)}</p><p class="mo-micro z-c" style="top:38%">${esc(f.est)}</p><p class="mo-dw z-cw">${esc(f.word)}<sup>®</sup></p><p class="mo-micro z-c" style="top:56%">${esc(f.sub)}</p>` },
  { id: 'z-serif-centre', name: 'Serif centre', cat: 'Editorial', look: L('#1a1614', '#ff6a2a', '#ff6a2a', '#1a1614', '#000000', 'serif', 'serif'), art: ['object', ['#2a2420', '#8a7a6a']],
    fields: { head: 'Post with\nmore\n*intention*' },
    html: (f, im) => `${img(im, 'dim')}<p class="mo-dw z-serif">${lines(f.head).replace(/\*([^*]+)\*/g, '<em>$1</em>')}</p>` },
  { id: 'z-pills-lower', name: 'Lowercase and pills', cat: 'Minimal', look: L('#6a6a6a', '#ffffff', '#ffffff', '#6a6a6a', '#1a1a1a', 'space', 'space'), art: ['object', ['#3a3a3a', '#cfcfcf']],
    fields: { p1: 'studio', p2: 'beauty', a: 'how to choose', b: 'the right', c: 'service' },
    html: (f, im) => `${img(im, 'grey')}<div class="mo-grain"></div><p class="z-pill" style="left:var(--m)">${esc(f.p1)}</p><p class="z-pill on" style="left:calc(var(--m) + var(--u)*13)">${esc(f.p2)}</p><div class="z-low"><p><span>${esc(f.a)}</span><span>${esc(f.b)}</span></p><p>${esc(f.c)} <i></i></p></div>` },
  { id: 'z-deep-white', name: 'White panel', cat: 'Professional', look: L('#f2f2f0', '#141414', '#141414', '#f2f2f0', '#141414', 'tight', 'tight'), art: ['object', ['#5a6a7a', '#e6ddd2']],
    fields: { m1: 'north.studio', m2: 'Innovation\nFreedom', m3: 'Transparency\nIntegration', a: 'Sustainable investment', b: 'Trends for 2026' },
    html: (f, im, b) => `${metaRow(f.m1, f.m2, f.m3)}<div class="z-band">${img(im)}</div><p class="mo-dw z-ghost">${logo(b, b.name)}</p><p class="mo-dw z-dwh">${esc(f.a)}<br><b>${esc(f.b)}</b></p>` },
  { id: 'z-portrait-card', name: 'Portrait card', cat: 'Professional', look: L('#f2f2f0', '#141414', '#141414', '#f2f2f0', '#141414', 'tight', 'tight'), art: ['front', ['#2a2a2a', '#bdbdbd']],
    fields: { name: 'Ada Novak | Project manager', head: 'From project\nmanagement\nto real results' },
    html: (f, im, b) => `<div class="z-pbox">${img(im, 'grey')}</div><p class="mo-micro z-pn"><b>${logo(b, b.name)}</b><br>${esc(f.name)}</p><p class="mo-dw z-pch">${lines(f.head)}</p>` },
  { id: 'z-cta-black', name: 'Black with button', cat: 'Tech & app', look: L('#000000', '#ffffff', '#ffffff', '#000000', '#7a7a7a', 'tight', 'tight'),
    fields: { head: 'Agility and\n*aerodynamics* are\nessential.', text: 'Speed and control decide every finish. Built for the people who move first.', cta: 'Explore more' },
    html: (f, im, b) => `<p class="mo-dw z-cth">${lines(f.head).replace(/\*([^*]+)\*/g, '<span class="z-grey">$1</span>')}</p><p class="mo-micro z-ctt">${esc(f.text)}</p><p class="z-ctab"><span>${esc(f.cta)}</span><b>→</b></p><p class="mo-dw z-ctl">${logo(b, b.name)}</p>` },
  { id: 'z-date-card', name: 'Date card', cat: 'Editorial', look: L('#1e1e1e', '#e9e6e1', '#e9e6e1', '#1e1e1e', '#000000', 'tight', 'tight'), art: ['front', ['#3a2e28', '#c49a84']],
    fields: { date: '09/12/2026', title: 'Golden\nhour', foot: 'An evening of\nquiet music', place: 'Prague' },
    html: (f, im) => `<div class="z-dbox">${img(im)}</div><p class="mo-dw z-dd">${esc(f.date)}</p><p class="mo-dw z-dt">${lines(f.title)}</p><p class="mo-micro" style="left:var(--m);bottom:var(--m);text-transform:none">${lines(f.foot)}</p><p class="mo-dw" style="right:var(--m);bottom:var(--m);font-size:calc(var(--u)*3.6);font-weight:400">${esc(f.place)}</p>` },
  { id: 'z-year', name: 'Year ©', cat: 'Editorial', look: L('#e4e2de', '#141414', '#141414', '#e4e2de', '#141414', 'tight', 'serif'),
    fields: { top: '12   December   01   Winter 2027', mid: 'Weekly   Design\nNov-15\nCrafted by Ada', year: '2026©', word: 'SELECTIONS', italic: 'selections' },
    html: (f) => `<div class="mo-grain"></div><p class="mo-micro z-row">${esc(f.top).split(/\s{2,}/).map((x) => `<span>${esc(x)}</span>`).join('')}</p><p class="mo-micro z-c" style="top:22%">${lines(f.mid)}</p><p class="mo-dw z-yr">${esc(f.year)}</p><p class="mo-dw z-sel">${esc(f.word)}</p><p class="z-selit">${esc(f.italic)}</p>` },
  { id: 'z-vertical-address', name: 'Vertical address', cat: 'Editorial', look: L('#e4e2de', '#141414', '#141414', '#e4e2de', '#141414', 'tight', 'tight'), art: ['profile', ['#5a5a5a', '#e6e6e6']],
    fields: { vert: 'PRAGUE.11000', num: '01\n11000\nCZ', page: '16', text: 'Short notes on light, space and the people who make them.' },
    html: (f, im) => `<p class="mo-micro z-vtxt">${esc(f.text)}</p><p class="mo-dw z-pg">${esc(f.page)}</p><p class="mo-dw z-vert">${esc(f.vert)}</p><p class="mo-dw z-addr">${lines(f.num)}</p><div class="z-vbox">${img(im, 'grey')}</div>` },
  { id: 'z-oval', name: 'Oval photo', cat: 'Editorial', look: L('#e4e2de', '#141414', '#141414', '#e4e2de', '#141414', 'tight', 'tight'), art: ['front', ['#7a5a4a', '#ead2c2']],
    fields: { head: 'DETAILS.', text: 'Every photo and video in this work belongs to its authors and is shown for reference only.', thanks: 'Thank you for\nvisiting my work and\ndon’t forget to say hi' },
    html: (f, im) => `<div class="mo-grain"></div><p class="mo-dw z-det">${esc(f.head)}</p><p class="z-arrowdn">↘</p><p class="mo-micro z-dett">${esc(f.text)}</p><div class="z-ovalb">${img(im)}</div><p class="mo-dw z-thx">${lines(f.thanks)}</p>` },
];

export const more3Css = `
.bi-ad .z-half{position:absolute;left:0;right:0;bottom:0;height:46%;overflow:hidden}
.bi-ad .z-rib{position:absolute;z-index:2;border-radius:50%;pointer-events:none;mix-blend-mode:screen}
.bi-ad .z-rib.a{left:-30%;top:-20%;width:90%;height:160%;border:calc(var(--u)*7) solid color-mix(in srgb,var(--g1) 70%,transparent);border-color:transparent color-mix(in srgb,var(--g1) 70%,transparent) transparent transparent;rotate:20deg;filter:blur(calc(var(--u)*.4))}
.bi-ad .z-rib.b{right:-40%;top:10%;width:90%;height:120%;border:calc(var(--u)*5) solid transparent;border-left-color:color-mix(in srgb,var(--g1) 55%,transparent);rotate:-25deg;filter:blur(calc(var(--u)*.6))}
.bi-ad .z-num{left:calc(var(--m)*.6);top:4%;font-size:calc(var(--u)*24);font-weight:400;letter-spacing:-.06em;line-height:.9}
.bi-ad .z-numt{left:var(--m);top:44%;text-transform:none;font-weight:400}
.bi-ad .z-sweep{position:absolute;right:-30%;top:-10%;width:90%;height:130%;border-radius:50%;background:radial-gradient(closest-side,transparent 70%,color-mix(in srgb,var(--g1) 45%,transparent) 86%,transparent 100%);rotate:-20deg;filter:blur(calc(var(--u)*.8))}
.bi-ad .z-sweep.two{right:-55%;top:20%;opacity:.7;rotate:-35deg}
.bi-ad .z-ph{left:var(--m);top:var(--m);font-size:calc(var(--u)*10);font-weight:500;letter-spacing:-.05em;line-height:.92}
.bi-ad .z-rule{position:absolute;left:var(--m);right:42%;height:1px;background:currentColor;opacity:.6;z-index:4}
.bi-ad .z-pt{left:var(--m);top:41%;text-transform:none;font-weight:400}
.bi-ad .z-brand{right:var(--m);bottom:var(--m);font-size:calc(var(--u)*3);font-weight:800;text-transform:uppercase}
.bi-ad .z-tr{right:var(--m);top:var(--m);font-size:calc(var(--u)*3);font-weight:800;text-transform:uppercase}
.bi-ad .z-oh{left:var(--m);bottom:22%;font-size:calc(var(--u)*10);font-weight:500;letter-spacing:-.05em;line-height:.92}
.bi-ad .z-ot{left:var(--m);top:86%;text-transform:none;font-weight:400}
.bi-ad .z-top{position:absolute;left:0;right:0;top:0;height:68%;overflow:hidden}
.bi-ad .z-sm{left:var(--m);top:73%;font-size:calc(var(--u)*3.4)}
.bi-ad .z-suh{left:44%;right:var(--m);top:72%;font-size:calc(var(--u)*6.4);font-weight:400;letter-spacing:-.04em;line-height:1}
.bi-ad .z-ul{text-decoration:underline;text-decoration-color:var(--accent);text-decoration-thickness:calc(var(--u)*.5);text-underline-offset:.12em}
.bi-ad .z-bh{left:var(--m);top:var(--m);font-size:calc(var(--u)*6.4);font-weight:500;letter-spacing:-.04em}
.bi-ad .z-bt{left:var(--m);top:17%;text-transform:none;font-weight:400}
.bi-ad .z-bar{position:absolute;z-index:3;bottom:6%;width:42%;padding:calc(var(--u)*2.4)}
.bi-ad .z-bar.a{left:var(--m);height:30%;background:var(--g2);color:#fff} .bi-ad .z-bar.b{right:var(--m);height:68%;background:var(--accent);color:#fff}
.bi-ad .z-bar p{font-family:var(--fdv);font-size:calc(var(--u)*6);letter-spacing:-.04em}
.bi-ad .z-navyfade{position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,color-mix(in srgb,var(--bg) calc(var(--ov,.6)*130%),transparent))}
.bi-ad .z-nl{left:var(--m);top:64%;letter-spacing:.06em}
.bi-ad .z-nh{left:var(--m);right:var(--m);top:68%;font-size:calc(var(--u)*5.6);font-weight:500;letter-spacing:-.02em;line-height:1.02}
.bi-ad .z-nt{left:var(--m);right:12%;top:82%;font-weight:400;font-size:calc(var(--u)*2.3)}
.bi-ad .z-shapes{position:absolute;inset:-8%;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);gap:4%;place-items:center}
.bi-ad .z-shapes i{width:100%;aspect-ratio:1;border-radius:50%;background:linear-gradient(135deg,var(--g1),var(--g2) 85%)}
.bi-ad .z-shapes i.sq{border-radius:0;width:90%;background:linear-gradient(180deg,var(--g1),var(--g2))}
.bi-ad .z-shw{left:0;right:0;bottom:var(--m);text-align:center;font-size:calc(var(--u)*5)}
.bi-ad .z-peak{position:absolute;inset:0;width:100%;height:100%;background:radial-gradient(80% 60% at 100% 0,color-mix(in srgb,var(--g1) 45%,transparent),transparent)}
.bi-ad .z-card{position:absolute;left:17%;right:17%;height:20%;z-index:4;border-radius:calc(var(--u)*1.2);display:flex;align-items:flex-end;justify-content:space-between;padding:calc(var(--u)*3)}
.bi-ad .z-card p{font-family:var(--fdv);font-size:calc(var(--u)*4.4);text-transform:uppercase;letter-spacing:-.03em;font-weight:500}
.bi-ad .z-card span{font-size:calc(var(--u)*2.4);font-weight:500}
.bi-ad .z-c{left:0;right:0;text-align:center;font-weight:400}
.bi-ad .z-cw{left:0;right:0;top:42%;text-align:center;font-size:calc(var(--u)*12);font-weight:400;letter-spacing:-.02em}
.bi-ad .z-cw sup{font-size:.35em;vertical-align:top}
.bi-ad .z-serif{left:var(--m);right:var(--m);top:50%;translate:0 -50%;text-align:center;font-size:calc(var(--u)*7.4);font-weight:400;text-transform:uppercase;line-height:.88;letter-spacing:-.02em;color:var(--ink)}
.bi-ad .z-serif em{font-style:normal;font-weight:400;letter-spacing:.04em;font-size:.95em;opacity:.95;font-family:"BI Serif",serif;text-transform:none;font-style:italic}
.bi-ad .z-pill{position:absolute;top:var(--m);z-index:4;padding:calc(var(--u)*.6) calc(var(--u)*1.8);border-radius:99px;box-shadow:inset 0 0 0 1px currentColor;font-size:calc(var(--u)*1.8)}
.bi-ad .z-pill.on{background:rgba(255,255,255,.85);color:#3a3a3a;box-shadow:none}
.bi-ad .z-low{position:absolute;left:var(--m);right:var(--m);bottom:calc(var(--m)*1.6);z-index:4;font-family:var(--fdv);font-size:calc(var(--u)*4.4);letter-spacing:-.02em;line-height:1.1}
.bi-ad .z-low p{display:flex;justify-content:space-between} .bi-ad .z-low p:last-child{justify-content:flex-start;gap:.4em;align-items:center}
.bi-ad .z-low i{display:inline-block;width:.25em;height:.25em;border-radius:50%;background:currentColor}
.bi-ad .z-meta{position:absolute;left:var(--m);right:var(--m);top:var(--m);display:grid;grid-template-columns:1.4fr 1fr 1fr;z-index:4;font-size:calc(var(--u)*1.5);line-height:1.3}
.bi-ad .z-band{position:absolute;left:0;right:0;top:20%;height:34%;overflow:hidden}
.bi-ad .z-ghost{left:var(--m);top:58%;font-size:calc(var(--u)*7);font-weight:500;opacity:.08;letter-spacing:-.03em}
.bi-ad .z-dwh{left:var(--m);right:var(--m);bottom:calc(var(--m)*1.2);font-size:calc(var(--u)*6);font-weight:400;letter-spacing:-.035em;line-height:1.05} .bi-ad .z-dwh b{font-weight:700}
.bi-ad .z-pbox{position:absolute;left:var(--m);top:10%;bottom:10%;width:40%;overflow:hidden}
.bi-ad .z-pn{left:52%;top:10%;text-transform:none;font-weight:400} .bi-ad .z-pn b{font-weight:700}
.bi-ad .z-pch{left:52%;right:var(--m);bottom:10%;font-size:calc(var(--u)*5.4);font-weight:400;letter-spacing:-.03em;line-height:1.02}
.bi-ad .z-cth{left:var(--m);right:var(--m);top:12%;font-size:calc(var(--u)*7);font-weight:400;letter-spacing:-.04em;line-height:1.02}
.bi-ad .z-grey{color:color-mix(in srgb,var(--ink) 50%,var(--bg))}
.bi-ad .z-ctt{left:var(--m);right:30%;top:44%;text-transform:none;font-weight:400;opacity:.7}
.bi-ad .z-ctab{position:absolute;left:var(--m);top:58%;z-index:4;display:flex;align-items:center;gap:calc(var(--u)*3);padding:calc(var(--u)*.8) calc(var(--u)*.8) calc(var(--u)*.8) calc(var(--u)*3);border-radius:99px;background:#fff;color:#000;font-size:calc(var(--u)*2.4)}
.bi-ad .z-ctab b{display:grid;place-items:center;width:calc(var(--u)*6);height:calc(var(--u)*6);border-radius:50%;background:#000;color:#fff;font-weight:400}
.bi-ad .z-ctl{left:0;right:0;bottom:var(--m);text-align:center;font-size:calc(var(--u)*5)}
.bi-ad .z-dbox{position:absolute;left:var(--m);right:var(--m);top:var(--m);height:46%;overflow:hidden}
.bi-ad .z-dd{left:var(--m);top:58%;font-size:calc(var(--u)*6);font-weight:300;letter-spacing:-.03em}
.bi-ad .z-dt{left:var(--m);top:67%;font-size:calc(var(--u)*4.6);font-weight:300;line-height:1}
.bi-ad .z-row{left:var(--m);right:var(--m);top:var(--m);display:flex;justify-content:space-between;text-transform:none;font-weight:400}
.bi-ad .z-yr{left:0;right:0;top:36%;text-align:center;font-size:calc(var(--u)*10);font-weight:400;letter-spacing:-.04em}
.bi-ad .z-sel{left:0;right:0;bottom:6%;text-align:center;font-size:calc(var(--u)*11);font-weight:800;letter-spacing:-.06em;white-space:nowrap}
.bi-ad .z-selit{position:absolute;left:0;right:0;bottom:5%;z-index:5;text-align:center;font-family:"BI Serif",serif;font-style:italic;font-size:calc(var(--u)*11);line-height:1;color:var(--bg);-webkit-text-stroke:1px var(--ink);letter-spacing:-.02em}
.bi-ad .z-vtxt{left:var(--m);right:40%;top:var(--m);font-size:calc(var(--u)*1.5);line-height:1.35}
.bi-ad .z-pg{right:var(--m);top:var(--m);font-size:calc(var(--u)*6);font-weight:500}
.bi-ad .z-vert{left:var(--m);bottom:var(--m);writing-mode:vertical-rl;rotate:180deg;font-size:calc(var(--u)*10);font-weight:500;letter-spacing:-.04em;line-height:.9}
.bi-ad .z-addr{left:46%;top:24%;font-size:calc(var(--u)*6);font-weight:500;letter-spacing:-.04em;line-height:.95}
.bi-ad .z-vbox{position:absolute;left:46%;right:var(--m);top:50%;bottom:var(--m);overflow:hidden}
.bi-ad .z-det{left:var(--m);top:var(--m);font-size:calc(var(--u)*11);font-weight:500;letter-spacing:-.05em}
.bi-ad .z-arrowdn{position:absolute;left:var(--m);top:22%;z-index:4;font-size:calc(var(--u)*7);line-height:1}
.bi-ad .z-dett{left:50%;right:var(--m);top:24%;font-size:calc(var(--u)*1.4);line-height:1.35}
.bi-ad .z-ovalb{position:absolute;left:44%;top:40%;width:26%;height:26%;border-radius:50%;overflow:hidden}
.bi-ad .z-thx{left:50%;right:var(--m);top:70%;font-size:calc(var(--u)*3);font-weight:500;text-transform:uppercase;letter-spacing:-.02em;line-height:.98}
@container (min-aspect-ratio: 13/10){ .bi-ad .z-half{left:50%;top:0;height:auto} .bi-ad .z-numt,.bi-ad .z-pt{top:60%} .bi-ad .z-top{right:46%;height:100%} .bi-ad .z-suh,.bi-ad .z-sm{left:58%;top:40%} .bi-ad .z-card{left:30%;right:30%} .bi-ad .z-dbox{right:52%;height:auto;bottom:var(--m)} .bi-ad .z-dd,.bi-ad .z-dt{left:54%} }
@container (max-aspect-ratio: 7/10){ .bi-ad .z-card{left:10%;right:10%;height:16%} .bi-ad .z-pbox{width:auto;right:var(--m);bottom:46%} .bi-ad .z-pn{left:var(--m);top:58%} .bi-ad .z-pch{left:var(--m)} }`;
