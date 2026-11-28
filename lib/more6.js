// BrandIt: the sixth set: brand identity launches (chrome blue, stacked wordmarks, grid paper, serif cards),
// educational carousels (header bar, accent word, pills, a sun character, a circled phrase),
// technical posters (mirrored spec sheet, HUD lines, a glowing frame, mist and grid) and quiet editorial frames.
// Layout patterns only; every word, mark and shape here is our own, and the brand's own logo replaces any mark.
// Each template uses at most two font families: the display font (--fdv) and the text font (--ftv).
import { esc, lines, list, img, L, logo } from './motion.js?v=34';

// *word* = accent colour, _word_ = italic
const mix = (s = '') => lines(s).replace(/\*([^*]+)\*/g, '<em class="r-acc">$1</em>').replace(/_([^_]+)_/g, '<i>$1</i>');
const handle = (b, f) => esc(f || (b.handle ? b.handle : '@' + String(b.name || 'studio').toLowerCase().replace(/[^a-z0-9]+/g, '')));
// a simple sun with eyes, drawn from scratch
const sun = () => { let d = ''; for (let i = 0; i < 24; i++) { const r = i % 2 ? 36 : 50, a = (i * Math.PI) / 12 + .13; d += `${i ? 'L' : 'M'}${(50 + r * Math.cos(a)).toFixed(1)} ${(50 + r * Math.sin(a)).toFixed(1)}`; } return `<svg class="r-sun" viewBox="0 0 100 100" aria-hidden="true"><path d="${d}Z" fill="var(--accent)"/><ellipse cx="40" cy="52" rx="7" ry="5" fill="#fff"/><ellipse cx="60" cy="52" rx="7" ry="5" fill="#fff"/><circle cx="42" cy="53" r="3.2" fill="#111"/><circle cx="62" cy="53" r="3.2" fill="#111"/><path d="M33 43 47 46M53 46 67 43" stroke="#111" stroke-width="2.6" stroke-linecap="round"/></svg>`; };
const ring = (t) => `<span class="r-ring">${esc(t)}<svg viewBox="0 0 120 40" preserveAspectRatio="none" aria-hidden="true"><path d="M8 22C10 8 64 4 104 9c14 2 14 18-4 24C70 41 20 39 9 28 4 22 12 13 30 10"/></svg></span>`;
const brandMark = (b, f, cls = '') => `<span class="r-mark ${cls}">${logo(b, f)}</span>`;

export const more6Templates = [
  // ---------- brand identity launch ----------
  { id: 'r-stack-word', name: 'Stacked wordmark', cat: 'Brand identity', look: L('#c9d4e4', '#ffffff', '#9fb6dd', '#9fb6dd', '#2a3550', 'wide', 'grotesk'), art: ['front', ['#2a3550', '#e8d9cf']],
    fields: { word: 'The Glow\nWorks', top: 'Beauty, done boldly', foot: 'Opening 14.03' },
    html: (f, im, b) => `${img(im)}<div class="r-veil"></div><p class="r-tiny" style="left:var(--m);top:var(--m)">${esc(f.top)}</p><p class="r-tiny" style="right:var(--m);top:var(--m);text-align:right">${esc(f.foot)}</p><p class="mo-dw r-stack">${lines(f.word)}</p>` },
  { id: 'r-chrome-field', name: 'Chrome field', cat: 'Brand identity', look: L('#8fa6c9', '#ffffff', '#e9f0fb', '#e9f0fb', '#33476d', 'wide', 'grotesk'),
    fields: { word: 'Glow Works', top: 'Studio for lashes and brows', foot: 'Book online · glowworks.studio' },
    html: (f, im, b) => `<div class="r-chrome"></div><div class="mo-grain"></div><p class="r-tiny c" style="top:var(--m)">${esc(f.top)}</p>${brandMark(b, f.word, 'mid')}<p class="r-tiny c" style="bottom:var(--m)">${esc(f.foot)}</p>` },
  { id: 'r-grid-mark', name: 'Grid paper mark', cat: 'Brand identity', look: L('#f6f6f4', '#0b0b0b', '#2d4f9e', '#d9d9d6', '#f6f6f4', 'wide', 'grotesk'),
    fields: { word: 'GLW', a: 'Identity', b: 'Sheet 04', c: 'Clear space = 1 G', d: '2026' },
    html: (f, im, b) => `<div class="r-paper"></div><p class="r-tiny" style="left:var(--m);top:var(--m)">${esc(f.a)}</p><p class="r-tiny" style="right:var(--m);top:var(--m);text-align:right">${esc(f.b)}</p>${brandMark(b, f.word, 'grid')}<p class="r-tiny" style="left:var(--m);bottom:var(--m)">${esc(f.c)}</p><p class="r-tiny" style="right:var(--m);bottom:var(--m);text-align:right">${esc(f.d)}</p>` },
  { id: 'r-serif-card', name: 'Card on a face', cat: 'Brand identity', look: L('#c9d4e4', '#14223f', '#3c5a99', '#dfe8f6', '#9fb6dd', 'serif', 'grotesk'), art: ['front', ['#3a2f2a', '#e8d2c2']],
    fields: { head: 'Shaped\nby _craft_', body: 'Every set is mapped to the eye before the first lash goes on. Slow work, sharp results.', foot: 'Lash and brow studio' },
    html: (f, im, b) => `${img(im)}<div class="r-card"><p class="r-cardh">${mix(f.head)}</p><p class="r-cardb">${esc(f.body)}</p><p class="r-cardf">${brandMark(b, '', 'sm')}${esc(f.foot)}</p></div>` },
  { id: 'r-split-dark', name: 'Photo over black', cat: 'Brand identity', look: L('#0b0b0b', '#ffffff', '#9fb6dd', '#9fb6dd', '#0b0b0b', 'wide', 'grotesk'), art: ['front', ['#2b2420', '#e7cdbd']],
    fields: { word: 'Glow\nWorks', body: 'We started this studio for people who want lashes that look like a choice, not a trend. Every set is made by hand, in one room, by people who care about the detail.', tag: 'Care and\nmethod' },
    html: (f, im, b) => `<div class="r-top">${img(im)}</div><p class="mo-dw r-sword">${lines(f.word)}</p><p class="r-para">${esc(f.body)}</p><p class="r-tag">${lines(f.tag)}</p>` },
  { id: 'r-mark-portrait', name: 'Mark on a portrait', cat: 'Brand identity', look: L('#1b1b1b', '#ffffff', '#ffffff', '#1b1b1b', '#1b1b1b', 'wide', 'grotesk'), art: ['front', ['#1b1b1b', '#e0c8b8']],
    fields: { word: 'GLW', head: 'Made to\nbe seen', foot: 'Lashes · Brows · Skin' },
    html: (f, im, b) => `${img(im)}<div class="mo-shade low"></div>${brandMark(b, f.word, 'top')}<p class="mo-dw r-mph">${lines(f.head)}</p><p class="r-tiny c" style="bottom:var(--m)">${esc(f.foot)}</p>` },
  { id: 'r-chrome-word', name: 'Chrome wordmark', cat: 'Brand identity', look: L('#0d1424', '#ffffff', '#b8cdf0', '#4a6aa8', '#0d1424', 'wide', 'grotesk'),
    fields: { word: 'Glow\nWorks', top: 'New season', foot: 'Bold, clean and a little loud.' },
    html: (f) => `<div class="r-night"></div><div class="mo-grain"></div><p class="r-tiny" style="left:var(--m);top:var(--m)">${esc(f.top)}</p><p class="mo-dw r-metal">${lines(f.word)}</p><p class="r-tiny" style="left:var(--m);bottom:var(--m);text-transform:none;letter-spacing:0">${esc(f.foot)}</p>` },
  { id: 'r-slices', name: 'Sliced portrait', cat: 'Brand identity', look: L('#f2f2f0', '#e01b1b', '#e01b1b', '#e01b1b', '#f2f2f0', 'pixel', 'grotesk'), art: ['front', ['#2a2a2a', '#e6d4c8']],
    fields: { word: 'Studio Mara', a: 'Spring\ncampaign', b: 'Look 06\nof 12' },
    html: (f, im) => `<div class="r-sl s1">${img(im)}</div><div class="r-sl s2">${img(im)}</div><div class="r-sl s3">${img(im)}</div><p class="mo-dw r-pix">${esc(f.word)}</p><p class="r-tiny r-red" style="left:var(--m);top:var(--m)">${lines(f.a)}</p><p class="r-tiny r-red" style="right:var(--m);bottom:var(--m);text-align:right">${lines(f.b)}</p>` },

  // ---------- educational carousel ----------
  { id: 'r-tips-cover', name: 'Tips cover', cat: 'Carousel', look: L('#ffffff', '#0b0b0b', '#ff4d12', '#ff4d12', '#fff1ea', 'grotesk', 'grotesk'), art: ['object', ['#ffe3d6', '#2a2a2a']],
    fields: { brand: 'northteam', handle: '', head: '*4 tips* how to\nmake your app\nfeel premium', foot: 'without a full\nredesign' },
    html: (f, im, b) => `<div class="r-head"><span class="r-brand">${logo(b, f.brand)}<i></i></span><span class="r-handle">${handle(b, f.handle)}</span></div><p class="mo-dw r-h1">${mix(f.head)}</p><div class="r-cut">${img(im)}</div><p class="r-foot r-acc">${lines(f.foot)}</p>` },
  { id: 'r-pill-cloud', name: 'Style pills', cat: 'Carousel', look: L('#121212', '#ffffff', '#ff4d12', '#ff4d12', '#121212', 'grotesk', 'grotesk'),
    fields: { brand: 'northteam', handle: '', head: '6 design styles\nthat could fit\nyour product', pills: 'Minimal\nBrutal\nHand-drawn\nSoft\nEditorial\nRetro', ghost: 'Aa' },
    html: (f, im, b) => `<p class="mo-dw r-ghost">${esc(f.ghost)}</p><div class="r-head"><span class="r-brand">${logo(b, f.brand)}<i></i></span><span class="r-handle">${handle(b, f.handle)}</span></div><p class="mo-dw r-h1">${mix(f.head)}</p>${list(f.pills).slice(0, 6).map((p, i) => `<p class="r-pill p${i}">${esc(p)}</p>`).join('')}` },
  { id: 'r-sun-face', name: 'Sun character', cat: 'Carousel', look: L('#ffffff', '#0b0b0b', '#ff4d12', '#ff4d12', '#ffffff', 'grotesk', 'grotesk'),
    fields: { brand: 'northteam', handle: '', head: 'Things that drive\nme crazy in *bad UX*', foot: 'from a designer with', ring: '12+ years', tail: 'of practice' },
    html: (f, im, b) => `<div class="r-head"><span class="r-brand">${logo(b, f.brand)}<i></i></span><span class="r-handle">${handle(b, f.handle)}</span></div><p class="mo-dw r-h1 sm">${mix(f.head)}</p>${sun()}<p class="r-foot">${esc(f.foot)}<br>${ring(f.ring)} ${esc(f.tail)}</p>` },
  { id: 'r-tip', name: 'Tip slide', cat: 'Carousel', look: L('#fff4ee', '#0b0b0b', '#ff4d12', '#ff4d12', '#ffffff', 'grotesk', 'grotesk'),
    fields: { brand: 'northteam', handle: '', label: 'Tip', head: 'Use *fewer colours*\nthan you think', body: 'Pick one accent and give it one job: the button. When everything is loud, nothing is.', swipe: 'Swipe' },
    html: (f, im, b) => `<div class="r-head"><span class="r-brand">${logo(b, f.brand)}<i></i></span><span class="r-handle">${handle(b, f.handle)}</span></div><p class="r-pill solo">${esc(f.label)}</p><p class="mo-dw r-h2">${mix(f.head)}</p><p class="r-body">${esc(f.body)}</p><p class="r-swipe">${esc(f.swipe)}<svg viewBox="0 0 40 24" aria-hidden="true"><path d="M4 12h30M27 5l7 7-7 7"/></svg></p>` },
  { id: 'r-save-end', name: 'Save this slide', cat: 'Carousel', look: L('#ff4d12', '#ffffff', '#0b0b0b', '#ff4d12', '#ffffff', 'grotesk', 'grotesk'),
    fields: { brand: 'northteam', handle: '', head: 'Save this\nfor your next\nlaunch', cta: 'Got a project? Send a message' },
    html: (f, im, b) => `<div class="r-head w"><span class="r-brand">${logo(b, f.brand)}<i></i></span><span class="r-handle">${handle(b, f.handle)}</span></div><p class="mo-dw r-h1 w">${mix(f.head)}</p><div class="r-icons"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-9.6A4 4 0 0 1 12 8a4 4 0 0 1 7 2.4C19 15.6 12 20 12 20Z"/></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 3 3 10.5l7 2.5 2.5 7L21 3Z"/></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4Z"/></svg></div><p class="r-cta">${esc(f.cta)}</p>` },

  // ---------- technical posters ----------
  { id: 'r-mirror-spec', name: 'Mirrored spec sheet', cat: 'Tech & app', look: L('#ecebe8', '#111111', '#e0322b', '#e0322b', '#ecebe8', 'wide', 'grotesk'), art: ['object', ['#ecebe8', '#222222']],
    fields: { top: 'Light frame\nwind tested\nspec sheet', name: 'Trail 09', a: 'Weight 212 g\nDrop 6 mm', b: 'Grip: wet rock\nFit: narrow', code: 'TR-09 / 26' },
    html: (f, im, b) => `<p class="mo-dw r-mirror">${lines(f.top)}</p><i class="r-vline"></i><div class="r-scope">${img(im, 'contain')}<i class="r-cross"></i></div><p class="r-tiny" style="left:var(--m);top:44%">${lines(f.a)}</p><p class="r-tiny" style="right:var(--m);top:44%;text-align:right">${lines(f.b)}</p><p class="mo-dw r-specname">${esc(f.name)}</p><p class="r-tiny" style="left:var(--m);bottom:var(--m)">${esc(f.code)}</p>${brandMark(b, '', 'corner')}` },
  { id: 'r-hud', name: 'HUD over a photo', cat: 'Tech & app', look: L('#050505', '#ffffff', '#ffffff', '#050505', '#050505', 'grotesk', 'grotesk'), art: ['front', ['#050505', '#9a9a9a']],
    fields: { mark: 'Origin', head: 'Proof is the\nnew design', a: 'Certified', b: 'Owned · Verified · Traced', foot: 'Start with your first piece' },
    html: (f, im, b) => `${img(im, 'grey')}<div class="mo-shade low"></div><svg class="r-hudsvg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M8 78 62 30M62 30h22M62 30v-8"/><circle cx="62" cy="30" r="2.4"/><path d="M20 22l3 5h-6Z"/><path d="M78 70h8v8"/></svg><p class="mo-dw" style="left:var(--m);top:var(--m);font-size:calc(var(--u)*4)">${logo(b, f.mark)}</p><p class="r-tiny" style="left:63%;top:21%">${esc(f.a)}</p><p class="mo-dw r-hudh">${lines(f.head)}</p><p class="r-tiny" style="left:var(--m);bottom:var(--m)">${esc(f.b)}</p><p class="r-tiny" style="right:var(--m);bottom:var(--m);text-align:right">${esc(f.foot)}</p>` },
  { id: 'r-glow-frame', name: 'Glowing frame', cat: 'Tech & app', look: L('#050505', '#ffffff', '#ff3db8', '#ff3db8', '#050505', 'grotesk', 'grotesk'),
    fields: { num: '07', pill: 'Zero', a: 'Clarity at\nminus twenty', b: 'Lens system\nfor cold light', foot: 'Winter performance' },
    html: (f) => `<div class="r-frame"><p class="mo-dw r-fnum">${esc(f.num)}<sup>°</sup></p><span class="r-fpill">${esc(f.pill)}</span></div><p class="r-tiny" style="left:var(--m);top:50%;translate:0 -50%">${lines(f.a)}</p><p class="r-tiny" style="right:var(--m);top:50%;translate:0 -50%;text-align:right">${lines(f.b)}</p><p class="r-tiny c" style="bottom:var(--m)">${esc(f.foot)}</p>` },
  { id: 'r-mist', name: 'Product in mist', cat: 'Tech & app', look: L('#0a0a0a', '#ffffff', '#ffffff', '#0a0a0a', '#0a0a0a', 'wide', 'grotesk'), art: ['object', ['#0a0a0a', '#cfcfcf']],
    fields: { name: 'Halde', a: 'Brushed steel\n50 ml', b: 'Body cream\nno. 2', foot: 'Cold to the touch, soft on the skin.' },
    html: (f, im, b) => `<div class="r-gridl"></div>${img(im, 'grey')}<div class="r-mistl"></div><p class="r-tiny" style="left:var(--m);top:var(--m)">${lines(f.a)}</p><p class="r-tiny" style="right:var(--m);top:var(--m);text-align:right">${lines(f.b)}</p><p class="mo-dw r-mistn">${esc(f.name)}</p><p class="r-tiny c" style="bottom:var(--m);text-transform:none;letter-spacing:0">${esc(f.foot)}</p>` },

  // ---------- quiet editorial ----------
  { id: 'r-object-note', name: 'Object with a note', cat: 'Editorial', look: L('#ffffff', '#111111', '#111111', '#ffffff', '#f1f1f1', 'grotesk', 'grotesk'), art: ['object', ['#ffffff', '#7a7a7a']],
    fields: { mark: 'ecora', note: 'There are objects we use every day and others that become part of the day. Little by little we will show what is behind them, why they exist and how they were made.', site: 'ecora.store', cap: '24/7 · Everyday object' },
    html: (f, im, b) => `<p class="mo-dw" style="left:var(--m);top:var(--m);font-size:calc(var(--u)*4.4);font-weight:600;letter-spacing:.02em">${logo(b, f.mark)}</p><p class="r-note">${esc(f.note)}</p><p class="r-tiny" style="right:var(--m);top:calc(var(--m) + var(--u)*9);text-transform:none;letter-spacing:0">${esc(f.site)}</p><div class="r-obj">${img(im, 'contain')}</div><p class="r-tiny c" style="bottom:var(--m);text-transform:none;letter-spacing:0">${esc(f.cap)}</p>` },
  { id: 'r-horizon', name: 'Mark in the sky', cat: 'Editorial', look: L('#9fb2c3', '#ffffff', '#ffffff', '#9fb2c3', '#ffffff', 'wide', 'grotesk'), art: ['up', ['#9fb2c3', '#e9eef2']],
    fields: { word: 'Calma Houses', a: 'Prototype 07', b: 'Coastal living' },
    html: (f, im, b) => `${img(im)}<p class="mo-dw r-sky">${esc(f.word)}</p><p class="r-tiny" style="left:var(--m);bottom:var(--m)">${esc(f.a)}</p><p class="r-tiny" style="right:var(--m);bottom:var(--m);text-align:right">${esc(f.b)}</p>` },
  { id: 'r-panorama', name: 'Panorama strip', cat: 'Editorial', look: L('#e7e7e5', '#111111', '#111111', '#e7e7e5', '#ffffff', 'grotesk', 'grotesk'), art: ['front', ['#cfd3d0', '#3a3a3a']],
    fields: { a: 'Texture', b: 'Movement', c: 'Space', left: 'A study in\nwhite and light', right: 'Series 03\nOn view now' },
    html: (f, im) => `<div class="r-band">${img(im)}</div><p class="r-tiny r-l3" style="left:var(--m)">${esc(f.a)}</p><p class="r-tiny r-l3" style="left:50%;translate:-50% 0">${esc(f.b)}</p><p class="r-tiny r-l3" style="right:var(--m)">${esc(f.c)}</p><p class="r-tiny" style="left:var(--m);bottom:var(--m)">${lines(f.left)}</p><p class="r-tiny" style="right:var(--m);bottom:var(--m);text-align:right">${lines(f.right)}</p>` },
  { id: 'r-terrain', name: 'Body as terrain', cat: 'Editorial', look: L('#0c0d0c', '#e9e6df', '#e9e6df', '#0c0d0c', '#0c0d0c', 'wide', 'grotesk'), art: ['front', ['#0c0d0c', '#6b6a64']],
    fields: { word: 'Asemic', a: '46.5° N\n11.3° E', b: 'Technical\napparel', c: 'The body as terrain' },
    html: (f, im) => `${img(im, 'grey')}<div class="mo-shade"></div><i class="r-dotmark"></i><p class="r-tiny c" style="top:calc(50% + var(--u)*5)">${esc(f.c)}</p><p class="r-tiny" style="left:var(--m);top:var(--m)">${lines(f.a)}</p><p class="r-tiny" style="right:var(--m);top:var(--m);text-align:right">${lines(f.b)}</p><p class="mo-dw r-terr">${esc(f.word)}</p>` },
];

export const more6Css = `
.bi-ad .r-acc{color:var(--accent);font-style:normal}
.bi-ad .r-tiny{position:absolute;z-index:5;font-family:var(--ftv);font-size:calc(var(--u)*1.8);line-height:1.3;font-weight:500;text-transform:uppercase;letter-spacing:.06em}
.bi-ad .r-tiny.c{left:0;right:0;text-align:center}
.bi-ad .r-red{color:var(--accent)}
.bi-ad .r-veil{position:absolute;inset:0;z-index:2;background:linear-gradient(180deg,rgba(0,0,0,.25),transparent 30%,transparent 60%,rgba(0,0,0,.3))}
.bi-ad .r-stack{left:var(--m);right:var(--m);top:50%;translate:0 -50%;text-align:center;font-size:calc(var(--u)*10.2);line-height:.86;text-transform:uppercase;letter-spacing:-.01em;font-weight:800;text-shadow:0 0 calc(var(--u)*6) rgba(0,0,0,.25)}
.bi-ad .r-chrome{position:absolute;inset:0;background:radial-gradient(60% 45% at 30% 25%,#ffffff 0,transparent 60%),radial-gradient(50% 40% at 75% 80%,color-mix(in srgb,var(--accent) 90%,#fff) 0,transparent 70%),linear-gradient(160deg,var(--bg),var(--g2) 55%,var(--bg))}
.bi-ad .r-mark{position:absolute;z-index:5;display:grid;place-items:center;font-family:var(--fdv);font-weight:800;text-transform:uppercase;letter-spacing:.01em;line-height:.9;text-align:center}
.bi-ad .r-mark .bi-logo{height:calc(var(--u)*14*var(--ls,1));width:auto;max-width:100%;object-fit:contain}
.bi-ad .r-mark.mid{left:var(--m);right:var(--m);top:50%;translate:0 -50%;font-size:calc(var(--u)*10)}
.bi-ad .r-mark.grid{left:var(--m);right:var(--m);top:50%;translate:0 -50%;font-size:calc(var(--u)*16)}
.bi-ad .r-mark.top{left:0;right:0;top:var(--m);font-size:calc(var(--u)*6)} .bi-ad .r-mark.top .bi-logo{height:calc(var(--u)*7*var(--ls,1))}
.bi-ad .r-mark.sm{position:static;display:inline-grid;font-size:calc(var(--u)*2.4);margin-right:calc(var(--u)*1.4)} .bi-ad .r-mark.sm .bi-logo{height:calc(var(--u)*3.2*var(--ls,1))}
.bi-ad .r-mark.corner{left:auto;right:var(--m);top:var(--m);font-size:calc(var(--u)*3)} .bi-ad .r-mark.corner .bi-logo{height:calc(var(--u)*4.4*var(--ls,1))}
.bi-ad .r-mark .bi-logotext:empty{display:none}
.bi-ad .r-paper{position:absolute;inset:0;background:linear-gradient(var(--g1) 1px,transparent 1px) 0 0/calc(100%/8) calc(100%/10),linear-gradient(90deg,var(--g1) 1px,transparent 1px) 0 0/calc(100%/8) calc(100%/10);opacity:.9}
.bi-ad .r-card{position:absolute;z-index:5;left:50%;top:50%;translate:-50% -50%;width:min(58%,calc(var(--u)*58));padding:calc(var(--u)*4.4);background:color-mix(in srgb,var(--g1) 92%,transparent);color:var(--ink);box-shadow:0 calc(var(--u)*3) calc(var(--u)*8) rgba(0,0,0,.25)}
.bi-ad .r-card p{position:static}
.bi-ad .r-cardh{font-family:var(--fdv);font-size:calc(var(--u)*7.4);line-height:.95;letter-spacing:-.01em;color:var(--accent)} .bi-ad .r-cardh i{font-style:italic}
.bi-ad .r-cardb{margin-top:calc(var(--u)*3);font-size:calc(var(--u)*2.1);line-height:1.4;max-width:34ch}
.bi-ad .r-cardf{margin-top:calc(var(--u)*4);display:flex;align-items:center;font-size:calc(var(--u)*1.7);text-transform:uppercase;letter-spacing:.06em;font-weight:500}
.bi-ad .r-top{position:absolute;left:0;right:0;top:0;height:58%;overflow:hidden}
.bi-ad .r-sword{left:var(--m);top:calc(58% + var(--u)*4);font-size:calc(var(--u)*9.4);line-height:.86;text-transform:uppercase;font-weight:800}
.bi-ad .r-para{position:absolute;z-index:5;left:var(--m);width:44%;bottom:var(--m);font-size:calc(var(--u)*1.75);line-height:1.4;text-transform:uppercase;letter-spacing:.02em;font-weight:500}
.bi-ad .r-tag{position:absolute;z-index:5;right:var(--m);bottom:var(--m);text-align:right;font-family:var(--fdv);font-size:calc(var(--u)*4);line-height:1;text-transform:uppercase;font-weight:700}
.bi-ad .r-mph{left:0;right:0;bottom:calc(var(--m) + var(--u)*6);text-align:center;font-size:calc(var(--u)*9.6);line-height:.86;text-transform:uppercase;font-weight:800}
.bi-ad .r-night{position:absolute;inset:0;background:radial-gradient(70% 50% at 50% 50%,color-mix(in srgb,var(--g1) 70%,transparent),transparent 70%),var(--bg)}
.bi-ad .r-metal{left:var(--m);right:var(--m);top:50%;translate:0 -50%;text-align:center;font-size:calc(var(--u)*14);line-height:.84;text-transform:uppercase;font-weight:800;background:linear-gradient(180deg,#ffffff 0%,var(--accent) 38%,#5f78a8 50%,#ffffff 64%,var(--accent) 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.bi-ad .r-sl{position:absolute;left:0;right:0;overflow:hidden}
.bi-ad .r-sl .bi-media{position:absolute;left:0;width:100%;height:calc(100%*var(--k));top:var(--o)}
.bi-ad .r-sl.s1{top:0;height:34%;--k:2.94;--o:0%} .bi-ad .r-sl.s1 .bi-media{translate:-4% 0}
.bi-ad .r-sl.s2{top:34%;height:32%;--k:3.125;--o:-106%} .bi-ad .r-sl.s2 .bi-media{translate:4% 0}
.bi-ad .r-sl.s3{top:66%;height:34%;--k:2.94;--o:-194%}
.bi-ad .r-pix{left:-2%;right:-2%;top:50%;translate:0 -50%;text-align:center;font-size:calc(var(--u)*8.2);font-weight:400;line-height:1;color:var(--accent);mix-blend-mode:multiply;letter-spacing:0}
.bi-ad .r-head{position:absolute;z-index:5;left:var(--m);right:var(--m);top:var(--m);display:flex;justify-content:space-between;align-items:center;font-size:calc(var(--u)*2.4);font-weight:600}
.bi-ad .r-brand{display:flex;align-items:center;gap:calc(var(--u)*.6)} .bi-ad .r-brand i{width:calc(var(--u)*1.3);height:calc(var(--u)*1.3);border-radius:50%;background:var(--accent)}
.bi-ad .r-brand .bi-logo{height:calc(var(--u)*3.4*var(--ls,1));width:auto}
.bi-ad .r-handle{display:flex;align-items:center;gap:calc(var(--u)*.8);font-weight:500} .bi-ad .r-handle::before{content:"";width:calc(var(--u)*2.6);height:calc(var(--u)*2.6);border-radius:calc(var(--u)*.7);border:calc(var(--u)*.35) solid currentColor;box-sizing:border-box}
.bi-ad .r-head.w{color:#fff}
.bi-ad .r-h1{left:var(--m);right:var(--m);top:calc(var(--m) + var(--u)*10);font-family:var(--fdv);font-size:calc(var(--u)*8.6);line-height:1;font-weight:600;letter-spacing:-.035em}
.bi-ad .r-h1.sm{font-size:calc(var(--u)*7.6)} .bi-ad .r-h1.w{color:#fff}
.bi-ad .r-cut{position:absolute;right:0;bottom:0;width:58%;height:48%;border-top-left-radius:calc(var(--u)*30);overflow:hidden;background:var(--g2)}
.bi-ad .r-foot{position:absolute;z-index:5;left:var(--m);bottom:var(--m);font-size:calc(var(--u)*4);line-height:1.1;font-weight:500;letter-spacing:-.02em}
.bi-ad .r-ring{position:relative;display:inline-block;padding:0 .2em;color:var(--accent)} .bi-ad .r-ring svg{position:absolute;inset:-35% -12%;width:124%;height:170%;fill:none;stroke:var(--accent);stroke-width:2.4;stroke-linecap:round}
.bi-ad .r-ghost{right:-4%;bottom:-12%;font-size:calc(var(--u)*62);line-height:.8;color:var(--ink);opacity:.06;font-weight:700;letter-spacing:-.05em}
.bi-ad .r-pill{position:absolute;z-index:5;padding:calc(var(--u)*1.4) calc(var(--u)*3.2);border-radius:99px;background:var(--accent);color:#fff;font-size:calc(var(--u)*3.2);font-weight:500;white-space:nowrap}
.bi-ad .r-pill.p0{left:54%;top:56%} .bi-ad .r-pill.p1{left:var(--m);top:68%} .bi-ad .r-pill.p2{left:52%;top:80%} .bi-ad .r-pill.p3{left:28%;top:62%;rotate:-6deg} .bi-ad .r-pill.p4{left:14%;top:84%;rotate:5deg} .bi-ad .r-pill.p5{left:66%;top:70%;rotate:-4deg}
.bi-ad .r-pill.solo{left:var(--m);top:calc(var(--m) + var(--u)*10);font-size:calc(var(--u)*2.2)}
.bi-ad .r-sun{position:absolute;z-index:4;width:calc(var(--u)*48);right:-6%;top:40%}
.bi-ad .r-h2{left:var(--m);right:var(--m);top:calc(var(--m) + var(--u)*18);font-size:calc(var(--u)*7.2);line-height:1;font-weight:600;letter-spacing:-.035em}
.bi-ad .r-body{position:absolute;z-index:5;left:var(--m);right:22%;top:48%;font-size:calc(var(--u)*3.4);line-height:1.35;opacity:.75}
.bi-ad .r-swipe{position:absolute;z-index:5;right:var(--m);bottom:var(--m);display:flex;align-items:center;gap:calc(var(--u)*1.2);font-size:calc(var(--u)*2.4);font-weight:600;color:var(--accent)} .bi-ad .r-swipe svg{width:calc(var(--u)*5);fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.bi-ad .r-icons{position:absolute;z-index:5;left:var(--m);bottom:calc(var(--m) + var(--u)*10);display:flex;gap:calc(var(--u)*3);color:#fff} .bi-ad .r-icons svg{width:calc(var(--u)*7);fill:none;stroke:currentColor;stroke-width:1.6;stroke-linejoin:round}
.bi-ad .r-cta{position:absolute;z-index:5;left:var(--m);bottom:var(--m);padding:calc(var(--u)*1.6) calc(var(--u)*3.4);border-radius:99px;background:var(--accent);color:#fff;font-size:calc(var(--u)*2.6);font-weight:600}
.bi-ad .r-mirror{left:var(--m);right:var(--m);top:var(--m);text-align:center;font-size:calc(var(--u)*6.6);line-height:.92;text-transform:uppercase;font-weight:800;transform:scaleX(-1);opacity:.85}
.bi-ad .r-vline{position:absolute;z-index:3;left:50%;top:0;bottom:0;width:calc(var(--u)*.4);background:var(--accent);translate:-50% 0}
.bi-ad .r-scope{position:absolute;z-index:4;left:50%;top:52%;translate:-50% -50%;width:calc(var(--u)*56);aspect-ratio:1;border-radius:50%;border:1px solid color-mix(in srgb,var(--ink) 40%,transparent);overflow:hidden}
.bi-ad .r-scope .bi-media{mix-blend-mode:multiply}
.bi-ad .r-cross{position:absolute;inset:0;background:linear-gradient(color-mix(in srgb,var(--ink) 35%,transparent),color-mix(in srgb,var(--ink) 35%,transparent)) center/100% 1px no-repeat,linear-gradient(90deg,color-mix(in srgb,var(--ink) 35%,transparent),color-mix(in srgb,var(--ink) 35%,transparent)) center/1px 100% no-repeat}
.bi-ad .r-specname{left:0;right:0;bottom:calc(var(--m) + var(--u)*4);text-align:center;font-size:calc(var(--u)*11);text-transform:uppercase;font-weight:800;line-height:.9}
.bi-ad .r-hudsvg{position:absolute;inset:0;z-index:3;width:100%;height:100%;fill:none;stroke:var(--accent);stroke-width:.25;vector-effect:non-scaling-stroke} .bi-ad .r-hudsvg *{vector-effect:non-scaling-stroke;stroke-width:1.2}
.bi-ad .r-hudh{left:var(--m);bottom:calc(var(--m) + var(--u)*8);font-size:calc(var(--u)*8);line-height:.95;font-weight:500;letter-spacing:-.03em}
.bi-ad .r-frame{position:absolute;z-index:4;left:50%;top:48%;translate:-50% -50%;width:calc(var(--u)*34);aspect-ratio:1;border-radius:calc(var(--u)*6);border:calc(var(--u)*.45) solid var(--accent);box-shadow:0 0 calc(var(--u)*4) color-mix(in srgb,var(--accent) 60%,transparent),inset 0 0 calc(var(--u)*4) color-mix(in srgb,var(--accent) 40%,transparent);display:grid;place-items:center}
.bi-ad .r-fnum{position:static;font-size:calc(var(--u)*14);font-weight:300;letter-spacing:.04em} .bi-ad .r-fnum sup{font-size:.35em;vertical-align:top}
.bi-ad .r-fpill{position:absolute;right:calc(var(--u)*-4);top:calc(var(--u)*-2.4);padding:calc(var(--u)*.8) calc(var(--u)*2);border-radius:99px;background:var(--accent);color:#fff;font-size:calc(var(--u)*1.8);font-weight:500}
.bi-ad .r-gridl{position:absolute;inset:0;z-index:3;background:linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px) 0 0/25% 100%,linear-gradient(rgba(255,255,255,.12) 1px,transparent 1px) 0 0/100% 25%;pointer-events:none}
.bi-ad .r-mistl{position:absolute;left:0;right:0;bottom:0;height:45%;z-index:2;background:linear-gradient(transparent,color-mix(in srgb,var(--bg) 85%,transparent))}
.bi-ad .r-mistn{left:var(--m);right:var(--m);bottom:calc(var(--m) + var(--u)*6);text-align:center;font-size:calc(var(--u)*12);text-transform:uppercase;font-weight:800;letter-spacing:.06em}
.bi-ad .r-note{position:absolute;z-index:5;left:var(--m);top:calc(var(--m) + var(--u)*7);width:46%;font-size:calc(var(--u)*1.45);line-height:1.35;text-align:justify;text-transform:uppercase;letter-spacing:.02em}
.bi-ad .r-obj{position:absolute;left:14%;right:14%;top:26%;bottom:16%} .bi-ad .r-obj .bi-media{mix-blend-mode:multiply}
.bi-ad .bi-media.contain{object-fit:contain}
.bi-ad .r-sky{left:0;right:0;top:24%;text-align:center;font-size:calc(var(--u)*3.4);text-transform:uppercase;font-weight:600;letter-spacing:.42em;text-shadow:0 0 calc(var(--u)*3) rgba(0,0,0,.25)}
.bi-ad .r-band{position:absolute;left:0;right:0;top:30%;height:36%;overflow:hidden}
.bi-ad .r-l3{top:calc(30% - var(--u)*4)}
.bi-ad .r-dotmark{position:absolute;z-index:4;left:50%;top:50%;width:calc(var(--u)*4);aspect-ratio:1;border-radius:50%;border:1px solid var(--ink);translate:-50% -50%} .bi-ad .r-dotmark::after{content:"";position:absolute;inset:35%;border-radius:50%;background:var(--ink)}
.bi-ad .r-terr{left:0;right:0;bottom:var(--m);text-align:center;font-size:calc(var(--u)*12.5);text-transform:uppercase;font-weight:800;letter-spacing:.14em;line-height:.9}
@container (min-aspect-ratio: 13/10){
  .bi-ad .r-stack{font-size:calc(var(--u)*12)} .bi-ad .r-top{height:100%;right:46%} .bi-ad .r-sword{left:58%;top:var(--m)} .bi-ad .r-para{left:58%;width:36%} .bi-ad .r-tag{left:58%;right:auto;text-align:left;bottom:auto;top:52%}
  .bi-ad .r-h1{right:44%} .bi-ad .r-cut{width:40%;height:78%} .bi-ad .r-pill.p0{left:62%;top:30%} .bi-ad .r-pill.p2{left:70%;top:60%} .bi-ad .r-pill.p3{left:44%;top:72%} .bi-ad .r-pill.p5{left:78%;top:44%}
  .bi-ad .r-sun{width:calc(var(--u)*56);right:4%;top:20%} .bi-ad .r-h2{right:40%} .bi-ad .r-body{right:44%;top:62%}
  .bi-ad .r-scope{width:calc(var(--u)*62)} .bi-ad .r-mirror{right:56%;text-align:left} .bi-ad .r-specname{left:58%;text-align:left}
  .bi-ad .r-note{width:30%} .bi-ad .r-obj{left:36%;right:16%;top:14%} .bi-ad .r-band{top:26%;height:48%} .bi-ad .r-l3{top:calc(26% - var(--u)*4)}
  .bi-ad .r-card{width:calc(var(--u)*62);left:auto;right:8%;translate:0 -50%}
}
@container (max-aspect-ratio: 7/10){
  .bi-ad .r-stack{font-size:calc(var(--u)*9.4)} .bi-ad .r-top{height:62%} .bi-ad .r-sword{top:calc(62% + var(--u)*5)} .bi-ad .r-para{bottom:calc(var(--m) + var(--u)*4)}
  .bi-ad .r-h1{top:calc(var(--m) + var(--u)*14)} .bi-ad .r-cut{height:42%;width:70%} .bi-ad .r-sun{top:48%;width:calc(var(--u)*60)}
  .bi-ad .r-card{width:72%} .bi-ad .r-band{top:30%;height:40%} .bi-ad .r-l3{top:calc(30% - var(--u)*4)} .bi-ad .r-obj{top:24%;bottom:20%}
  .bi-ad .r-body{right:var(--m)} .bi-ad .r-pill.p0{top:52%} .bi-ad .r-pill.p2{top:76%}
}`;
