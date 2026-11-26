// BrandIt: the fifth moodboard set — performance-agency cards, data posts (donut, curve, chrome numbers),
// blue waves and giant lowercase type, masked photos, and red social and cinematic series.
// Layout patterns only; every word, mark and shape is our own.
import { esc, lines, list, accent, img, icon, L, logo } from './motion.js?v=8';

// **bold**, *accent*, _serif italic_ (they nest: *_word_* is accent serif italic)
const mix = (s = '') => lines(s).replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/\*([^*]+)\*/g, '<em class="q-acc">$1</em>').replace(/_([^_]+)_/g, '<i class="q-it">$1</i>');
const burst = (cls = '') => { let d = ''; for (let i = 0; i < 32; i++) { const r = i % 2 ? 24 : 50, a = (i * Math.PI) / 16; d += `${i ? 'L' : 'M'}${(50 + r * Math.cos(a)).toFixed(1)} ${(50 + r * Math.sin(a)).toFixed(1)}`; } return `<svg class="q-burst ${cls}" viewBox="0 0 100 100" aria-hidden="true"><path d="${d}Z" fill="currentColor"/></svg>`; };
const ap = (cls = '') => `<i class="q-ap ${cls}" aria-hidden="true"><svg viewBox="0 0 40 24"><path d="M6 12h26M25 6l7 6-7 6"/></svg></i>`;
const brk = (s, style) => `<p class="q-brk" style="${style}">[${lines(s)}]</p>`;
// our own simple mark used when a brand has no logo
const mark = '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M18 18h50l14 14v12H34L18 28Z M82 82H32L18 68V56h48l16 16Z" fill="currentColor"/></svg>';

export const more5Templates = [
  // ---------- performance agency cards ----------
  { id: 'q-question', name: 'Question card', cat: 'Data & stats', look: L('#e9e9ec', '#0b0b0b', '#1f3fe6', '#1f3fe6', '#ffffff', 'tight', 'tight'),
    fields: { head: 'Every choice counts.\nIs yours backed by\n*_data?_*', num: '04', pill: 'Good calls _scale._', foot: 'Data-backed\ngrowth wins.' },
    html: (f) => `<div class="q-card w"><p class="q-qh">${mix(f.head)}</p><p class="mo-dw q-num">${esc(f.num)}</p></div><p class="q-pill w" style="left:var(--m);top:69%">${mix(f.pill)}</p><p class="q-serif" style="left:var(--m);bottom:var(--m)">${lines(f.foot)}</p>${ap('br')}` },
  { id: 'q-portrait-pill', name: 'Name pill', cat: 'Professional', look: L('#e9e9ec', '#0b0b0b', '#1f3fe6', '#1f3fe6', '#ffffff', 'tight', 'tight'), art: ['front', ['#3a3a3a', '#d9d9d9']],
    fields: { role: 'Lead strategist', name: 'Ada Novak' },
    html: (f, im) => `${img(im, 'grey')}<div class="mo-shade low"></div><i class="q-frame"></i><p class="q-badge"><b>↗</b>${esc(f.role)}</p><p class="mo-dw q-namepill">${esc(f.name)}</p>` },
  { id: 'q-donut', name: 'Donut stat', cat: 'Data & stats', look: L('#eceef1', '#0b0b0b', '#1f3fe6', '#1f3fe6', '#d9dbe0', 'tight', 'tight'),
    fields: { top: 'Teams using data to read\ntheir customers _better_', num: '45%', side: 'Better\nreturns', sub: '**Higher** _efficiency._\nWork smarter. *_Scale faster._*', a: '45', b: '20' },
    html: (f) => { const a = Math.max(0, Math.min(100, +f.a || 0)), b = Math.max(0, Math.min(100 - a, +f.b || 0));
      return `<p class="q-small c q-blue" style="top:7%">${mix(f.top)}</p>${brk(f.side, 'left:var(--m);top:27%')}<p class="mo-dw q-pct">${esc(f.num)}</p>${ap('q-pctap')}<p class="q-small c" style="top:41%">${mix(f.sub)}</p><i class="q-donut" style="--a:${a}%;--b:${a + b}%"></i>`; } },
  { id: 'q-mixed', name: 'Mixed type statement', cat: 'Minimal', look: L('#050505', '#ffffff', '#2a52ff', '#2a52ff', '#050505', 'tight', 'tight'),
    fields: { text: 'Every serious\n_business_ needs **ads**\nthat compound.\nWe don’t chase\n*clicks.*\nWe build returns,\n**efficiency**, and', ring: 'scale.', foot: 'Performance grows after the first sale.' },
    html: (f) => `${ap('top')}<p class="q-mix">${mix(f.text)}<br><span class="q-ring">${esc(f.ring)}</span></p><p class="q-serif c" style="bottom:var(--m)">${esc(f.foot)}</p>` },
  { id: 'q-blue-claim', name: 'Blue claim', cat: 'Minimal', look: L('#1238ff', '#ffffff', '#ffffff', '#1238ff', '#0b0b0b', 'tight', 'tight'),
    fields: { head: 'Growth isn’t _luck._\nIt’s problem-solving.', cta: '↗ Join us', foot: 'Built to optimise, not to guess.' },
    html: (f) => `<p class="q-claim">${mix(f.head)}</p><p class="q-pill w" style="left:var(--m);top:62%">${esc(f.cta)}</p>${burst('bl')}<p class="q-small" style="left:calc(var(--m) + var(--u)*10);bottom:calc(var(--m) + var(--u)*2)">${esc(f.foot)}</p>` },
  { id: 'q-inner-card', name: 'Card in a card', cat: 'Professional', look: L('#1238ff', '#ffffff', '#1238ff', '#1238ff', '#eef0f4', 'tight', 'tight'),
    fields: { label: 'Better\nreturns', a: 'Reach isn’t **random.**', b: '_Warm_ the\nmarket before\nyou **publish.**', cta: 'About us' },
    html: (f) => `${brk(f.label, 'left:var(--m);top:var(--m)')}${ap('tr light')}<div class="q-card in"><p class="q-cs">${mix(f.a)}</p><p class="q-cardh">${mix(f.b)}</p><p class="q-capsule">${esc(f.cta)}<b>↖</b></p></div>${burst('bl light')}${brk(f.label, 'right:var(--m);bottom:var(--m);text-align:right')}` },
  { id: 'q-percent-star', name: 'Percent and star', cat: 'Data & stats', look: L('#efeff1', '#0b0b0b', '#1238ff', '#1238ff', '#efeff1', 'tight', 'tight'),
    fields: { label: 'Better\nreturns', head: 'Move fast.\nValidate faster.\n_Growth is a system._', num: '89%', note: 'Paid ads reward\nsystems —\nnot hacks.' },
    html: (f) => `${ap('tl blue')}${brk(f.label, 'right:var(--m);top:var(--m);text-align:right')}<p class="q-h2" style="left:var(--m);top:22%">${mix(f.head)}</p><p class="mo-dw q-bignum">${esc(f.num)}</p>${burst('acc st')}<p class="q-small" style="right:var(--m);bottom:var(--m);font-weight:400">${lines(f.note)}</p>` },
  { id: 'q-dark-metric', name: 'Dark metric', cat: 'Data & stats', look: L('#000000', '#ffffff', '#1238ff', '#1238ff', '#000000', 'tight', 'tight'),
    fields: { label: 'Better\nreturns', num: '4.2×', it: '_Average blended_\n_return_', note: 'Paid social, data-led execution\nControlled scale' },
    html: (f) => `${burst('tl light')}${brk(f.label, 'left:calc(var(--m) + var(--u)*11);top:calc(var(--m) + var(--u)*1)')}<p class="mo-dw q-crop">${esc(f.num)}</p>${ap('ml')}<p class="q-itbig">${mix(f.it)}</p><p class="q-small" style="left:var(--m);bottom:var(--m);font-weight:400">${lines(f.note)}</p>` },
  // ---------- data on dark ----------
  { id: 'q-chrome-stat', name: 'Chrome number', cat: 'Data & stats', look: L('#05070d', '#ffffff', '#2a62ff', '#2a62ff', '#05070d', 'grotesk', 'grotesk'),
    fields: { pill: 'Join the new money', head: 'The world is already switching', num: '80%', sub: 'of young people already use digital\nwallets — the rest will follow', handle: '@north.pay' },
    html: (f, im, b) => `<div class="q-navy"></div><div class="mo-grain"></div><p class="mo-dw" style="left:var(--m);top:var(--m);font-size:calc(var(--u)*4.4)">${logo(b, b.name)}</p><p class="q-gpill"><i></i>${esc(f.pill)}</p><p class="q-grad q-ch">${esc(f.head)}</p><p class="mo-dw q-cnum"><span class="q-grad">${esc(f.num)}</span><svg class="q-up" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M8 6h10v10"/></svg></p><p class="q-grad q-csub">${lines(f.sub)}</p><p class="q-glass">${icon.send}${esc(f.handle)}</p>` },
  { id: 'q-curve', name: 'Growth curve', cat: 'Data & stats', look: L('#060716', '#ffffff', '#6a86ff', '#3b5bff', '#060716', 'grotesk', 'grotesk'),
    fields: { label: 'Customer success', head: 'Where our clients\nare focusing now', points: '51 Data and tech\n56 Better records\n57 Faster support\n64 Room to grow', source: 'Source: North client survey 2026' },
    html: (f, im, b) => {
      const pts = list(f.points).slice(0, 5).map((l) => { const m = l.match(/^\s*(\d+(?:[.,]\d+)?)\s*(.*)$/) || [0, '0', l]; return { v: parseFloat(String(m[1]).replace(',', '.')), t: m[2] }; });
      if (!pts.length) pts.push({ v: 50, t: '' });
      const xs = pts.map((_, i) => (pts.length === 1 ? 50 : 13 + (i * 72) / (pts.length - 1)));
      const vmin = Math.min(...pts.map((p) => p.v)) - 10, vmax = Math.max(...pts.map((p) => p.v)) + 4;
      const ys = pts.map((p) => 88 - ((p.v - vmin) / (vmax - vmin || 1)) * 70);
      const seq = [[0, Math.min(100, ys[0] + 18)], ...xs.map((x, i) => [x, ys[i]]), [100, Math.max(0, ys[ys.length - 1] - 8)]];
      let d = `M${seq[0][0]} ${seq[0][1]}`; for (let i = 1; i < seq.length; i++) { const [x0, y0] = seq[i - 1], [x1, y1] = seq[i], dx = (x1 - x0) / 2; d += ` C${x0 + dx} ${y0} ${x1 - dx} ${y1} ${x1} ${y1}`; }
      const top = 40, h = 42, Y = (y) => `${top + (y * h) / 100}%`;
      return `<div class="q-purple"></div><p class="q-lab">${esc(f.label)}</p><p class="mo-dw q-ch2">${lines(f.head)}</p>
      <svg class="q-curve" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="qcg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="var(--g1)" stop-opacity=".55"/><stop offset="1" stop-color="var(--g1)" stop-opacity="0"/></linearGradient><pattern id="qcp" width="1.2" height="100" patternUnits="userSpaceOnUse"><rect width=".25" height="100" fill="var(--g1)" opacity=".35"/></pattern></defs><path d="${d} L100 100 L0 100Z" fill="url(#qcg)"/><path d="${d} L100 100 L0 100Z" fill="url(#qcp)"/><path d="${d}" fill="none" stroke="var(--accent)" stroke-width="2.2" vector-effect="non-scaling-stroke"/></svg>
      ${pts.map((p, i) => `<i class="q-dot" style="left:${xs[i]}%;top:${Y(ys[i])}"></i><p class="q-pt${xs[i] > 70 ? ' r' : ''}" style="left:${xs[i]}%;top:${Y(ys[i])}"><b>${esc(String(p.v))}%</b>${esc(p.t)}</p>`).join('')}
      <i class="q-hr"></i><p class="q-src">${esc(f.source)}</p><p class="mo-dw" style="right:var(--m);bottom:var(--m);font-size:calc(var(--u)*4.4)">${logo(b, b.name)}</p>`;
    } },
  { id: 'q-wave', name: 'Blue wave', cat: 'Minimal', look: L('#000000', '#ffffff', '#1f45ff', '#1f45ff', '#000000', 'grotesk', 'grotesk'),
    fields: { head: 'Growth\nisn’t luck.', sub: 'It’s strategy, so let’s build yours.', contact: 'north.studio\nhello@north.studio\n+420 777 000 111' },
    html: (f) => `<p class="mo-dw q-wh">${lines(f.head)}</p><p class="q-ws">${esc(f.sub)}</p><svg class="q-wave" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 60 C0 40 10 28 32 28 L62 28 C46 28 34 42 34 60Z M100 0 C100 16 86 28 62 28 L100 28Z" fill="var(--accent)"/></svg><p class="q-wc">${lines(f.contact)}</p>` },
  { id: 'q-lowercase', name: 'Giant lowercase', cat: 'Minimal', look: L('#f1f0ec', '#1f45ff', '#1f45ff', '#1f45ff', '#f1f0ec', 'grotesk', 'grotesk'),
    fields: { text: 'what\nis\ngoing\non?' },
    html: (f) => `<p class="mo-dw q-lower">${lines(f.text)}</p>` },
  // ---------- masked photos ----------
  { id: 'q-asterisk', name: 'Asterisk photo', cat: 'Editorial', look: L('#dfe3ee', '#0b0b0b', '#2c4bd1', '#2c4bd1', '#dfe3ee', 'grotesk', 'grotesk'), art: ['front', ['#2a2a2a', '#cfcfcf']],
    fields: { cap: 'Think bigger.' },
    html: (f, im) => `<i class="q-thin"></i><div class="q-astmask">${img(im, 'grey')}</div><p class="q-small c" style="bottom:calc(var(--m)*.9)">${esc(f.cap)}</p>` },
  { id: 'q-scribble', name: 'Hand-drawn loop', cat: 'Bold photo', look: L('#d8d8d8', '#ffffff', '#2a3cff', '#2a3cff', '#111111', 'grotesk', 'grotesk'), art: ['front', ['#3a3a3a', '#e0e0e0']],
    fields: { tag: 'N — 01' },
    html: (f, im) => `${img(im, 'grey')}<svg class="q-scrib" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true"><path d="M8 62 C18 18 62 8 72 40 S42 84 62 56 S112 8 122 44 S92 82 116 60 S172 18 182 44 S162 76 194 50" fill="none" stroke="var(--accent)" stroke-width="5" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg><p class="q-small" style="left:45%;top:46%">${esc(f.tag)}</p>` },
  { id: 'q-blue-notice', name: 'Blue notice', cat: 'Professional', look: L('#2c46b8', '#ffffff', '#ffffff', '#2c46b8', '#0b0b0b', 'condensed', 'tight'), art: ['front', ['#2a2a2a', '#d6d6d6']],
    fields: { head: 'We are hungry\nfor results!' },
    html: (f, im) => `<p class="mo-dw q-bnh">${lines(f.head)}</p><div class="q-bnimg">${img(im, 'grey')}</div><div class="q-glyphs"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>` },
  { id: 'q-cut-word', name: 'Word off the edge', cat: 'Bold photo', look: L('#cfcfcf', '#ffffff', '#ffffff', '#cfcfcf', '#111111', 'grotesk', 'grotesk'), art: ['up', ['#3a3a3a', '#e6e6e6']],
    fields: { word: 'Think' },
    html: (f, im) => `${img(im, 'grey')}<p class="mo-dw q-cutw">${esc(f.word)}</p>` },
  // ---------- red social series ----------
  { id: 'q-red-disc', name: 'Red disc', cat: 'Bold photo', look: L('#0a0a0a', '#ffffff', '#e3121b', '#e3121b', '#0a0a0a', 'tight', 'tight'), art: ['front', ['#1a1a1a', '#9a9a9a']],
    fields: { tl: 'north studio', tr: 'social agency', text: 'We make bold\ncampaigns that\nget noticed\nand drive\nresults.' },
    html: (f, im) => `<i class="q-disc"></i>${img(im, 'grey q-mul')}<p class="q-small" style="left:var(--m);top:var(--m)">${esc(f.tl)}</p><p class="q-small" style="right:var(--m);top:var(--m)">${esc(f.tr)}</p><p class="mo-dw q-disct">${lines(f.text)}</p>` },
  { id: 'q-red-words', name: 'Red words', cat: 'Editorial', look: L('#0a0a0a', '#ffffff', '#e3121b', '#e3121b', '#0a0a0a', 'tight', 'tight'),
    fields: { head: 'What our\nclients\nsay', body: 'They came for reach and stayed for results. Ready to be the next story? Talk to us today.' },
    html: (f, im, b) => `<p class="mo-dw q-redh">${lines(f.head)}</p><i class="q-vbar"></i><p class="q-small" style="left:var(--m);right:45%;bottom:var(--m);font-weight:400;font-size:calc(var(--u)*1.9)">${esc(f.body)}</p><p class="mo-dw" style="right:var(--m);bottom:var(--m);font-size:calc(var(--u)*2.6)">${logo(b, b.name)}</p>` },
  { id: 'q-red-block', name: 'Red block', cat: 'Bold photo', look: L('#e3121b', '#ffffff', '#0a0a0a', '#e3121b', '#0a0a0a', 'tight', 'tight'),
    fields: { head: 'Start\ngrowing\n_with_\nnorth', l: 'We make scroll-stopping content that gets your brand the attention it deserves.', r: 'Follow us for tips, trends and real results.' },
    html: (f) => `<p class="mo-dw q-redb">${mix(f.head)}</p><i class="q-dotblk"></i><p class="q-small" style="left:var(--m);right:55%;bottom:var(--m);font-weight:400;font-size:calc(var(--u)*1.8)">${esc(f.l)}</p><p class="q-small" style="left:55%;right:var(--m);bottom:var(--m);font-weight:400;font-size:calc(var(--u)*1.8)">${esc(f.r)}</p>` },
  { id: 'q-trends', name: 'Top trends', cat: 'Editorial', look: L('#ffffff', '#0a0a0a', '#e3121b', '#e3121b', '#ffffff', 'tight', 'tight'), art: ['object', ['#cfcfcf', '#ffffff']],
    fields: { head: '*Top 5* social\nmedia trends' },
    html: (f, im) => `<div class="q-topimg">${img(im, 'grey')}</div><p class="mo-dw q-trh">${accent(f.head)}</p>` },
  // ---------- red cinematic ----------
  { id: 'q-cinema', name: 'Cinematic red', cat: 'Bold photo', look: L('#1a0000', '#ffffff', '#ff2a1a', '#ff2a1a', '#1a0000', 'wide', 'tight'), art: ['profile', ['#3a0000', '#ff3a2a']],
    fields: { url: 'north.studio', head: 'Your **brand.**\nImpossible to **ignore.**', sub: 'We turn attention into growth.', cta: 'Let’s build your presence →' },
    html: (f, im, b) => `${img(im, 'grey')}<div class="q-redtone"></div>${img(im, 'grey q-streakr')}<div class="mo-grain"></div><p class="mo-dw" style="left:var(--m);top:var(--m);font-size:calc(var(--u)*4.4)">${logo(b, b.short)}</p><p class="q-small" style="right:var(--m);top:var(--m)">${esc(f.url)}</p><p class="q-cinh">${mix(f.head)}</p><p class="q-small" style="left:var(--m);top:76%">${esc(f.sub)}</p><p class="q-ghostbtn">${esc(f.cta)}</p>` },
  { id: 'q-services', name: 'What we do', cat: 'Professional', look: L('#0a0000', '#ffffff', '#ff2a1a', '#ff2a1a', '#0a0000', 'wide', 'tight'),
    fields: { a: 'What we', b: 'Do', items: 'Digital marketing — We grow your presence\nCreative design — We bring ideas to life\nBranding — We build your identity\nAutomation — We save your team hours\nWeb development — We build what lasts', foot: 'Let’s build what’s next →' },
    html: (f) => `<div class="q-redglow"></div><p class="mo-dw q-wwa">${esc(f.a)}</p><p class="mo-dw q-wwb">${esc(f.b)}</p><ul class="q-svc">${list(f.items).slice(0, 6).map((l) => { const [t, s = ''] = l.split(/\s+[—–-]\s+/); return `<li><span class="ar">↗</span><b>${esc(t)}</b><small>${esc(s)}</small></li>`; }).join('')}</ul><p class="q-small c" style="bottom:var(--m);font-weight:400">${esc(f.foot)}</p>` },
  { id: 'q-centre-mark', name: 'Centre mark', cat: 'Gradient', look: L('#140000', '#ffffff', '#ff2a1a', '#ff2a1a', '#140000', 'wide', 'tight'),
    fields: { name: 'NORTH', tag: 'Strategy meets creativity' },
    html: (f, im, b) => `<div class="q-redglow c"></div><i class="q-ribbon2"></i><div class="q-markbig">${b.logo ? logo(b, '') : mark}</div><p class="mo-dw q-markname">${esc(f.name)}</p><p class="q-small c" style="bottom:var(--m);font-weight:400;text-transform:uppercase;letter-spacing:.06em">${esc(f.tag)}</p>` },
];

const AST = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cg fill='%23000'%3E%3Crect x='39' y='0' width='22' height='100'/%3E%3Crect x='39' y='0' width='22' height='100' transform='rotate(60 50 50)'/%3E%3Crect x='39' y='0' width='22' height='100' transform='rotate(120 50 50)'/%3E%3C/g%3E%3C/svg%3E\")";

export const more5Css = `
.bi-ad .q-acc{color:var(--accent);font-style:normal}
.bi-ad .q-it{font-family:"BI Serif",serif;font-style:italic;font-weight:400;letter-spacing:-.01em}
.bi-ad .q-blue{color:var(--accent)}
.bi-ad .q-small{position:absolute;z-index:4;font-size:calc(var(--u)*2.2);line-height:1.3;font-weight:500}
.bi-ad .q-small.c{left:var(--m);right:var(--m);text-align:center}
.bi-ad .q-serif{position:absolute;z-index:4;font-family:"BI Serif",serif;font-size:calc(var(--u)*2.8);line-height:1.15}
.bi-ad .q-serif.c{left:var(--m);right:var(--m);text-align:center}
.bi-ad .q-brk{position:absolute;z-index:4;font-size:calc(var(--u)*1.5);line-height:1.2;opacity:.85}
.bi-ad .q-ap{position:absolute;z-index:4;display:grid;place-items:center;width:calc(var(--u)*8);height:calc(var(--u)*4.6);border:1.5px solid currentColor;border-radius:99px}
.bi-ad .q-ap svg{width:62%;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.bi-ad .q-ap.br{right:var(--m);bottom:var(--m)} .bi-ad .q-ap.tl{left:var(--m);top:var(--m)} .bi-ad .q-ap.tr{right:var(--m);top:var(--m)}
.bi-ad .q-ap.top{left:50%;top:var(--m);translate:-50% 0} .bi-ad .q-ap.ml{left:var(--m);top:73%} .bi-ad .q-ap.blue{color:var(--accent)} .bi-ad .q-ap.light{color:#fff}
.bi-ad .q-burst{position:absolute;z-index:4;width:calc(var(--u)*7);height:auto}
.bi-ad .q-burst.bl{left:var(--m);bottom:var(--m)} .bi-ad .q-burst.tl{left:var(--m);top:var(--m)} .bi-ad .q-burst.light{color:#fff} .bi-ad .q-burst.acc{color:var(--accent)}
.bi-ad .q-burst.st{right:var(--m);bottom:23%;width:calc(var(--u)*9)}
.bi-ad .q-pill{position:absolute;z-index:4;padding:calc(var(--u)*1.2) calc(var(--u)*2.6);border-radius:99px;font-size:calc(var(--u)*2.2);font-weight:500;white-space:nowrap}
.bi-ad .q-pill.w{background:#fff;color:#0b0b0b;box-shadow:0 calc(var(--u)*.6) calc(var(--u)*2) rgba(0,0,0,.08)}
/* question card */
.bi-ad .q-card{position:absolute;z-index:3;border-radius:calc(var(--u)*6);background:var(--g2);color:var(--ink)}
.bi-ad .q-card.w{left:var(--m);right:var(--m);top:var(--m);height:56%}
.bi-ad .q-card p{position:absolute}
.bi-ad .q-qh{left:7%;right:7%;top:9%;font-size:calc(var(--u)*5.2);line-height:1.12;letter-spacing:-.02em}
.bi-ad .q-card .q-num{right:7%;bottom:7%;font-size:calc(var(--u)*13);font-weight:800;letter-spacing:-.03em}
/* name pill */
.bi-ad .q-frame{position:absolute;inset:4%;z-index:3;border:1.5px solid rgba(255,255,255,.75);border-radius:calc(var(--u)*3)}
.bi-ad .q-badge{position:absolute;z-index:4;left:50%;translate:-50% 0;bottom:21%;display:flex;align-items:center;gap:calc(var(--u)*1);padding:calc(var(--u)*.6) calc(var(--u)*1.8) calc(var(--u)*.6) calc(var(--u)*.6);border-radius:99px;background:#fff;color:#0b0b0b;font-size:calc(var(--u)*1.8);font-weight:600;text-transform:uppercase;white-space:nowrap}
.bi-ad .q-badge b{display:grid;place-items:center;width:calc(var(--u)*3.4);height:calc(var(--u)*3.4);border-radius:50%;background:var(--accent);color:#fff}
.bi-ad .q-namepill{left:10%;right:10%;bottom:8%;padding:calc(var(--u)*2) 0;border-radius:99px;background:#fff;color:#0b0b0b;text-align:center;font-size:calc(var(--u)*6);font-weight:600;text-transform:uppercase;line-height:1}
/* donut */
.bi-ad .q-pct{left:0;right:0;top:23%;text-align:center;color:var(--accent);font-size:calc(var(--u)*17);font-weight:700;letter-spacing:-.04em;line-height:1}
.bi-ad .q-pctap{right:var(--m);top:28%;color:var(--accent)} .bi-ad .q-pctap svg{rotate:180deg}
.bi-ad .q-donut{position:absolute;z-index:3;left:50%;bottom:8%;translate:-50% 0;width:min(42cqw,34cqh);aspect-ratio:1;border-radius:50%;background:conic-gradient(var(--g2) 0 calc(100% - var(--b)),var(--ink) 0 calc(100% - var(--a)),var(--accent) 0);-webkit-mask:radial-gradient(circle,transparent 41%,#000 42%);mask:radial-gradient(circle,transparent 41%,#000 42%)}
/* mixed statement */
.bi-ad .q-mix{position:absolute;z-index:4;left:var(--m);right:var(--m);top:17%;text-align:center;font-size:calc(var(--u)*5.2);line-height:1.17;letter-spacing:-.02em}
.bi-ad .q-mix b,.bi-ad .q-claim b,.bi-ad .q-cardh b,.bi-ad .q-cs b,.bi-ad .q-small b{font-weight:700}
.bi-ad .q-ring{display:inline-block;padding:0 .55em;margin-top:.12em;border:1.5px solid var(--accent);border-radius:50%;font-family:"BI Serif",serif;font-style:italic}
/* blue claim and card in a card */
.bi-ad .q-claim{position:absolute;z-index:4;left:var(--m);right:var(--m);top:var(--m);font-size:calc(var(--u)*6.6);line-height:1.08;letter-spacing:-.025em;font-weight:500}
.bi-ad .q-card.in{left:var(--m);right:var(--m);top:14%;bottom:17%;border-radius:calc(var(--u)*3);color:#0b0b0b}
.bi-ad .q-cs{left:8%;top:12%;font-size:calc(var(--u)*2.8)}
.bi-ad .q-cardh{left:8%;right:8%;top:28%;font-size:calc(var(--u)*7);line-height:1.08;letter-spacing:-.025em}
.bi-ad .q-capsule{left:8%;right:8%;bottom:9%;display:flex;justify-content:space-between;align-items:center;padding:calc(var(--u)*1.2) calc(var(--u)*1.2) calc(var(--u)*1.2) calc(var(--u)*3);border:1.5px solid currentColor;border-radius:99px;font-size:calc(var(--u)*1.8);font-weight:600;text-transform:uppercase}
.bi-ad .q-capsule b{display:grid;place-items:center;width:calc(var(--u)*4.4);height:calc(var(--u)*4.4);border-radius:50%;background:var(--accent);color:#fff}
/* percent and dark metric */
.bi-ad .q-h2{position:absolute;z-index:4;font-size:calc(var(--u)*5.6);line-height:1.1;letter-spacing:-.02em;font-weight:500}
.bi-ad .q-bignum{left:calc(var(--m)*.8);bottom:calc(var(--m)*.6);font-size:calc(var(--u)*20);font-weight:700;letter-spacing:-.05em;line-height:.9}
.bi-ad .q-crop{left:var(--m);top:22%;font-size:calc(var(--u)*30);font-weight:700;letter-spacing:-.04em;white-space:nowrap;line-height:.85}
.bi-ad .q-itbig{position:absolute;z-index:4;left:calc(var(--m) + var(--u)*11);top:70%;font-size:calc(var(--u)*5.4);line-height:1.05}
/* chrome number */
.bi-ad .q-navy{position:absolute;inset:0;background:radial-gradient(90% 55% at 0 110%,color-mix(in srgb,var(--g1) 80%,#fff 20%),transparent 62%),radial-gradient(80% 50% at 100% 110%,var(--g1),transparent 65%),linear-gradient(180deg,var(--bg) 40%,color-mix(in srgb,var(--g1) 35%,var(--bg)))}
.bi-ad .q-gpill{position:absolute;z-index:4;right:var(--m);top:var(--m);display:flex;align-items:center;gap:calc(var(--u)*1);padding:calc(var(--u)*1.2) calc(var(--u)*2.4);border-radius:99px;background:rgba(255,255,255,.14);font-size:calc(var(--u)*2.1);text-transform:uppercase;white-space:nowrap}
.bi-ad .q-gpill i{width:calc(var(--u)*2.2);height:calc(var(--u)*2.2);border-radius:50%;background:radial-gradient(circle at 35% 35%,#bfe0ff,var(--accent))}
.bi-ad .q-grad{background:linear-gradient(100deg,color-mix(in srgb,var(--ink) 50%,transparent),var(--ink) 55%);-webkit-background-clip:text;background-clip:text;color:transparent}
.bi-ad .q-ch{position:absolute;z-index:4;left:var(--m);right:var(--m);top:23%;font-size:calc(var(--u)*4.4);font-weight:500}
.bi-ad .q-cnum{left:var(--m);top:30%;font-size:calc(var(--u)*20);font-weight:500;letter-spacing:-.03em;line-height:1}
.bi-ad .q-up{display:inline-block;width:.4em;height:.4em;vertical-align:top;margin-left:.05em;fill:none;stroke:var(--accent);stroke-width:2.6}
.bi-ad .q-csub{position:absolute;z-index:4;left:var(--m);right:28%;top:54%;font-size:calc(var(--u)*3.4);line-height:1.2}
.bi-ad .q-glass{position:absolute;z-index:4;left:var(--m);bottom:var(--m);display:flex;align-items:center;gap:calc(var(--u)*2);padding:calc(var(--u)*2) calc(var(--u)*4);border-radius:99px;background:rgba(255,255,255,.08);box-shadow:inset 0 0 0 1px rgba(255,255,255,.45);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);font-size:calc(var(--u)*3.4)}
.bi-ad .q-glass svg{width:calc(var(--u)*4);height:calc(var(--u)*4)}
/* growth curve */
.bi-ad .q-purple{position:absolute;inset:0;background:radial-gradient(60% 40% at 100% 0,color-mix(in srgb,var(--g1) 55%,transparent),transparent 70%),var(--bg)}
.bi-ad .q-lab{position:absolute;z-index:4;left:var(--m);right:var(--m);top:var(--m);display:flex;align-items:center;gap:calc(var(--u)*2);color:var(--accent);font-size:calc(var(--u)*2.4);font-weight:500}
.bi-ad .q-lab::after{content:"";flex:1;height:1px;background:color-mix(in srgb,var(--ink) 25%,transparent)}
.bi-ad .q-ch2{left:var(--m);right:var(--m);top:calc(var(--m) + var(--u)*5);font-size:calc(var(--u)*7.4);font-weight:600;letter-spacing:-.03em;line-height:1.02}
.bi-ad .q-curve{position:absolute;left:0;right:0;top:40%;width:100%;height:42%;z-index:2}
.bi-ad .q-dot{position:absolute;z-index:5;width:calc(var(--u)*2.6);height:calc(var(--u)*2.6);margin:calc(var(--u)*-1.3) 0 0 calc(var(--u)*-1.3);border-radius:50%;background:#fff;box-shadow:0 0 0 calc(var(--u)*.7) var(--g1),0 0 calc(var(--u)*3) var(--g1)}
.bi-ad .q-pt{position:absolute;z-index:4;translate:calc(var(--u)*-1.2) -100%;padding-bottom:calc(var(--u)*7);max-width:calc(var(--u)*22);font-size:calc(var(--u)*2.1);line-height:1.2}
.bi-ad .q-pt.r{translate:calc(-100% + var(--u)*1.2) -100%;text-align:right}
.bi-ad .q-pt::after{content:"";position:absolute;left:calc(var(--u)*1.2);bottom:calc(var(--u)*1.6);height:calc(var(--u)*4.6);border-left:1.5px dotted color-mix(in srgb,var(--ink) 60%,transparent)}
.bi-ad .q-pt.r::after{left:auto;right:calc(var(--u)*1.2)}
.bi-ad .q-pt b{display:block;font-family:var(--fdv);font-size:calc(var(--u)*5.4);color:var(--accent);font-weight:600;letter-spacing:-.02em}
.bi-ad .q-hr{position:absolute;z-index:3;left:var(--m);right:var(--m);bottom:calc(var(--m) + var(--u)*8);height:1px;background:color-mix(in srgb,var(--ink) 18%,transparent)}
.bi-ad .q-src{position:absolute;z-index:4;left:var(--m);bottom:var(--m);max-width:44%;padding-left:calc(var(--u)*1.6);border-left:2px solid var(--accent);font-size:calc(var(--u)*1.9);line-height:1.3}
/* blue wave and giant lowercase */
.bi-ad .q-wh{left:9%;top:26%;font-size:calc(var(--u)*14);font-weight:400;line-height:.98;letter-spacing:-.02em}
.bi-ad .q-ws{position:absolute;z-index:4;left:9%;top:56%;font-size:calc(var(--u)*3.2)}
.bi-ad .q-wave{position:absolute;left:0;right:0;bottom:0;width:100%;height:42%;z-index:1}
.bi-ad .q-wc{position:absolute;z-index:4;left:9%;bottom:7%;font-size:calc(var(--u)*2.6);line-height:1.4}
.bi-ad .q-lower{left:var(--m);top:calc(var(--m)*.6);font-size:calc(var(--u)*19);font-weight:500;letter-spacing:-.045em;line-height:.88;color:var(--accent)}
/* masked photos */
.bi-ad .q-thin{position:absolute;inset:2.5%;z-index:3;border:1px solid color-mix(in srgb,var(--ink) 30%,transparent)}
.bi-ad .q-astmask{position:absolute;left:10%;right:10%;top:9%;bottom:13%;z-index:2;-webkit-mask:${AST} center/contain no-repeat;mask:${AST} center/contain no-repeat}
.bi-ad .q-scrib{position:absolute;left:4%;right:4%;top:28%;width:92%;height:30%;z-index:3}
.bi-ad .q-bnh{left:var(--m);right:var(--m);top:var(--m);font-size:calc(var(--u)*7);font-weight:400;text-transform:uppercase;line-height:.95}
.bi-ad .q-bnimg{position:absolute;left:35%;right:35%;top:32%;height:30%;overflow:hidden;z-index:2}
.bi-ad .q-glyphs{position:absolute;z-index:4;left:var(--m);right:var(--m);bottom:var(--m);display:flex;justify-content:space-between}
.bi-ad .q-glyphs i{width:calc(var(--u)*9);aspect-ratio:1;background:currentColor;-webkit-mask:${AST} center/contain no-repeat;mask:${AST} center/contain no-repeat}
.bi-ad .q-glyphs i:nth-child(2n){rotate:30deg;scale:.8 1.15} .bi-ad .q-glyphs i:nth-child(3n){rotate:-20deg;scale:1 .7}
.bi-ad .q-cutw{left:-5%;top:55%;font-size:calc(var(--u)*24);font-weight:600;letter-spacing:-.05em;line-height:1;white-space:nowrap}
/* red social */
.bi-ad .q-disc{position:absolute;z-index:1;left:12%;top:9%;width:min(66cqw,66cqh);aspect-ratio:1;border-radius:50%;background:var(--accent);box-shadow:0 0 calc(var(--u)*8) color-mix(in srgb,var(--accent) 50%,transparent)}
.bi-ad .bi-media.q-mul{z-index:2;mix-blend-mode:multiply}
.bi-ad .q-disct{left:56%;right:var(--m);top:26%;font-size:calc(var(--u)*3.4);font-weight:600;text-transform:uppercase;line-height:1.05}
.bi-ad .q-redh{left:var(--m);top:var(--m);color:var(--accent);font-size:calc(var(--u)*13);font-weight:700;text-transform:uppercase;line-height:.88;letter-spacing:-.02em}
.bi-ad .q-vbar{position:absolute;z-index:4;right:var(--m);top:var(--m);width:calc(var(--u)*3.2);height:calc(var(--u)*10);background:repeating-linear-gradient(180deg,currentColor 0 2px,transparent 2px 4px,currentColor 4px 5px,transparent 5px 8px)}
.bi-ad .q-redb{left:var(--m);right:var(--m);top:var(--m);font-size:calc(var(--u)*12);font-weight:700;text-transform:uppercase;line-height:.9;letter-spacing:-.02em}
.bi-ad .q-redb .q-it{font-family:inherit;font-style:normal;font-size:.6em}
.bi-ad .q-dotblk{position:absolute;z-index:4;right:14%;top:8%;width:calc(var(--u)*6);aspect-ratio:1;border-radius:50%;background:var(--accent)}
.bi-ad .q-topimg{position:absolute;left:0;right:0;top:0;height:70%;overflow:hidden}
.bi-ad .q-trh{left:var(--m);right:var(--m);bottom:var(--m);font-size:calc(var(--u)*7);font-weight:700;text-transform:uppercase;line-height:.95;letter-spacing:-.02em}
/* red cinematic */
.bi-ad .q-redtone{position:absolute;inset:0;background:radial-gradient(70% 60% at 60% 40%,var(--g1),color-mix(in srgb,var(--g1) 40%,var(--bg)) 55%,var(--bg));mix-blend-mode:multiply}
.bi-ad .bi-media.q-streakr{filter:grayscale(1) blur(calc(var(--u)*1.2));opacity:.35;mix-blend-mode:screen;translate:-6% 0;scale:calc(var(--iz,1)*1.15) var(--iz,1)}
.bi-ad .q-cinh{position:absolute;z-index:4;left:var(--m);right:var(--m);top:60%;font-family:var(--fdv);font-weight:300;font-size:calc(var(--u)*5.6);text-transform:uppercase;line-height:1}
.bi-ad .q-cinh b{font-weight:800}
.bi-ad .q-ghostbtn{position:absolute;z-index:4;left:var(--m);top:84%;padding:calc(var(--u)*.8) calc(var(--u)*2);border:1px solid rgba(255,255,255,.7);border-radius:calc(var(--u)*.8);font-size:calc(var(--u)*1.8)}
.bi-ad .q-redglow{position:absolute;inset:0;background:radial-gradient(70% 45% at 50% 40%,color-mix(in srgb,var(--g1) 50%,transparent),transparent 70%),var(--bg)}
.bi-ad .q-redglow.c{background:radial-gradient(60% 50% at 50% 45%,color-mix(in srgb,var(--g1) 75%,transparent),transparent 72%),radial-gradient(90% 70% at 50% 110%,color-mix(in srgb,var(--g1) 50%,transparent),transparent),var(--bg)}
.bi-ad .q-wwa{left:0;right:0;top:9%;text-align:center;font-size:calc(var(--u)*4.4);font-weight:300;text-transform:uppercase}
.bi-ad .q-wwb{left:0;right:0;top:14%;text-align:center;font-size:calc(var(--u)*17);font-weight:800;text-transform:uppercase;line-height:.9}
.bi-ad .q-svc{position:absolute;z-index:4;left:18%;right:var(--m);top:40%;display:grid;gap:calc(var(--u)*2.4);list-style:none;margin:0;padding:0}
.bi-ad .q-svc li{display:grid;grid-template-columns:calc(var(--u)*6) 1fr;align-items:center}
.bi-ad .q-svc .ar{grid-row:span 2;font-size:calc(var(--u)*5);font-weight:300;line-height:1}
.bi-ad .q-svc b{font-family:var(--fdv);font-size:calc(var(--u)*3.4);font-weight:700;text-transform:uppercase;line-height:1}
.bi-ad .q-svc small{font-size:calc(var(--u)*1.6);opacity:.7}
.bi-ad .q-ribbon2{position:absolute;left:-10%;right:-10%;top:30%;height:22%;rotate:-18deg;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--g1) 60%,transparent),transparent);filter:blur(calc(var(--u)*3))}
.bi-ad .q-markbig{position:absolute;z-index:4;left:50%;top:28%;translate:-50% 0;width:calc(var(--u)*26);color:#fff;display:grid;place-items:center}
.bi-ad .q-markbig svg{width:100%;height:auto} .bi-ad .q-markbig .bi-logo{height:calc(var(--u)*20*var(--ls,1));max-width:100%}
.bi-ad .q-markname{left:0;right:0;top:60%;text-align:center;font-size:calc(var(--u)*8);font-weight:700;letter-spacing:.02em}
@container (min-aspect-ratio: 13/10){
  .bi-ad .q-card.w{right:42%;height:auto;bottom:var(--m)} .bi-ad .q-pill.w{left:62%!important;top:40%!important}
  .bi-ad .q-donut{left:auto;right:var(--m);translate:none;bottom:var(--m)} .bi-ad .q-pct{right:40%}
  .bi-ad .q-card.in{left:22%;right:22%} .bi-ad .q-svc{left:52%;top:20%} .bi-ad .q-wwa,.bi-ad .q-wwb{right:50%;top:30%} .bi-ad .q-wwb{top:36%}
  .bi-ad .q-topimg{height:100%;right:46%} .bi-ad .q-trh{left:58%} .bi-ad .q-bnimg{top:22%;height:56%;left:40%;right:40%}
  .bi-ad .q-astmask{left:28%;right:28%} .bi-ad .q-disct{left:62%} .bi-ad .q-csub{right:45%}
}
@container (max-aspect-ratio: 7/10){
  .bi-ad .q-card.w{height:48%} .bi-ad .q-crop{font-size:calc(var(--u)*24)} .bi-ad .q-donut{bottom:12%}
  .bi-ad .q-card.in{top:18%;bottom:20%} .bi-ad .q-svc{left:12%} .bi-ad .q-disct{left:var(--m);top:70%}
}`;
