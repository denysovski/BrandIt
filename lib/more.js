// BrandIt: the second moodboard set — app promos, professional data posts, editorial shop posts, Swiss minimal,
// bold photo headlines and acid sport. Layout patterns only; every word, mark and drawing is our own.
import { esc, lines, list, accent, img, icon, L, dots, logo } from './motion.js?v=12';

const phone = (inner) => `<div class="x-phone"><div class="x-screen">${inner}</div></div>`;
const uiRows = (n = 6) => `<div class="x-ui"><i class="t"></i>${Array.from({ length: n }, () => '<i></i>').join('')}</div>`;
const barcode = '<i class="x-barcode" aria-hidden="true"></i>';
const asterisk = '<svg class="x-ast" viewBox="0 0 100 100" aria-hidden="true"><g stroke="currentColor" stroke-width="11" stroke-linecap="square"><path d="M50 6v88M12 28l76 44M88 28 12 72"/></g></svg>';
const burst = '<svg class="x-burst" viewBox="0 0 200 200" aria-hidden="true"><path d="M100 0 120 70 190 30 140 95 200 120 128 128 150 200 100 145 50 200 72 128 0 120 60 95 10 30 80 70Z" fill="var(--accent)"/></svg>';
const arrowCircle = (cls = '') => `<b class="x-arc ${cls}">${icon.arrow}</b>`;
const markBlock = (b) => (b.logo ? logo(b, '', 'x-lg') : `<span class="x-markb"><i></i>${esc(b.name)}</span>`);
const ficons = {
  home: '<svg viewBox="0 0 24 24"><path d="M4 11 12 4l8 7v9h-5v-6H9v6H4Z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4Zm4 3h4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  bolt: '<svg viewBox="0 0 24 24"><path d="M13 3 5 14h6l-1 7 8-11h-6Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6Z M9 12l2 2 4-4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
};

export const moreTemplates = [
  // Tech & app
  { id: 'x-app-promo', name: 'App promo', cat: 'Tech & app', look: L('#efedff', '#0b0b14', '#5b3df5', '#5b3df5', '#1c0f6b', 'tight', 'tight'),
    fields: { head: 'Plan\nyour\nproject', side: 'set a budget and\nstart getting offers', cta: 'Get the app', note: 'and start today' },
    html: (f, im, b) => `<div class="x-purple"></div><p class="x-topbar"><span></span>${markBlock(b)}</p><p class="mo-dw x-apph">${lines(f.head)}</p><p class="mo-small x-side">${lines(f.side)}</p><p class="x-cta" style="left:42%;top:32%">${esc(f.cta)}</p><p class="mo-micro" style="left:42%;top:38.5%;text-transform:none">${esc(f.note)}</p>
      <div class="x-ph-wrap">${phone(uiRows(6))}</div><i class="x-float a">${ficons.shield}</i><i class="x-float b">${ficons.bell}</i>` },
  { id: 'x-claim', name: 'Centred claim', cat: 'Tech & app', look: L('#120a4a', '#ffffff', '#7d6bff', '#5b3df5', '#05031a', 'tight', 'tight'),
    fields: { chip: 'results', head: 'Clients trust\nwork that ships.', sub: 'Move your team to one tool and\nkeep every case in one place.' },
    html: (f) => `<div class="x-night"></div><i class="x-slab"></i><p class="x-chip">${esc(f.chip)}</p><p class="mo-dw x-claimh">${lines(f.head)}</p><p class="mo-small x-claims">${lines(f.sub)}</p>` },
  { id: 'x-profile-card', name: 'Profile card', cat: 'Tech & app', look: L('#04070f', '#0b0b0b', '#2a63ff', '#2a63ff', '#04070f', 'tight', 'tight'),
    fields: { word: 'north', tag: 'Tools for teams that\nship on Fridays', name: 'North', handle: '@north.dev', bio: 'Open tools for planning, review and release. Built in public.', f1: '188', f2: '968', link: 'north.dev', follow: 'Follow' },
    html: (f) => `<div class="x-edge"></div><div class="x-pcard"><div class="hd"><p class="w">${esc(f.word)}</p><p class="t">${lines(f.tag)}</p><span class="fl">${esc(f.follow)}</span></div><i class="av"><b></b><b></b><b></b></i>
      <div class="bd"><p class="n">${esc(f.name)} <i class="ok">✓</i></p><p class="h">${esc(f.handle)}</p><p class="bio">${esc(f.bio)}</p><p class="cnt"><b>${esc(f.f1)}</b> Following&nbsp;&nbsp;&nbsp;<b>${esc(f.f2)}</b> Followers</p><p class="ln">↗ ${esc(f.link)}</p></div></div>` },
  { id: 'x-wordmark-phone', name: 'Wordmark and phone', cat: 'Tech & app', look: L('#000000', '#ffffff', '#1f6bff', '#1f6bff', '#000000', 'unbounded', 'tight'),
    fields: { word: 'nrth', accentAt: '3', app: 'North', time: '9:41' },
    html: (f) => { const i = Math.max(1, parseInt(f.accentAt, 10) || 1) - 1; const w = [...String(f.word)]; return `<div class="x-glow-br"></div><p class="mo-dw x-wm">${w.map((c, k) => (k === i ? `<span class="mo-acc">${esc(c)}</span>` : esc(c))).join('')}</p>
      <div class="x-corner"><p class="tm">${esc(f.time)}</p><p class="st"><i></i><i></i><i></i></p><div class="ic"><b>${esc(w[i] || '')}</b><span>${esc(f.app)}</span></div></div>`; } },
  // Professional
  { id: 'x-blue-statement', name: 'Blue statement', cat: 'Professional', look: L('#1f3fe0', '#ffffff', '#ffffff', '#3a5cff', '#0f22a8', 'space', 'space'),
    fields: { head: 'Smart tools\nfor a better\nweek', words: 'Plan.\nConnect.\nDeliver.' },
    html: (f, im, b) => `<p class="x-logo">${markBlock(b)}</p><p class="mo-dw x-bsh">${lines(f.head)}</p><p class="mo-micro x-bsw">${lines(f.words)}</p><i class="x-ring"></i>` },
  { id: 'x-glass-caption', name: 'Glass caption', cat: 'Professional', look: L('#e6e7ea', '#ffffff', '#1f3fe0', '#1f3fe0', '#e6e7ea', 'space', 'space'), art: ['profile', ['#cfd2d8', '#ffffff']],
    fields: { text: 'Technology that\nunderstands you.' },
    html: (f, im, b) => `<i class="x-band"></i>${img(im, 'grey x-cut')}<div class="x-gcap">${b.logo ? logo(b, '', 'x-mkimg') : '<i class="x-mk"></i>'}<p>${lines(f.text)}</p></div>` },
  { id: 'x-features', name: 'Feature row', cat: 'Minimal', look: L('#eeeff1', '#0b0b0b', '#1f3fe0', '#1f3fe0', '#ffffff', 'space', 'space'),
    fields: { head: 'Seamless\nconnection,\nsmarter\nliving.', f1: 'Smart\nhome', f2: 'Real-time\nalerts', f3: 'Energy\nefficient', f4: 'Secure and\nreliable' },
    html: (f, im, b) => `${b.logo ? `<p class="mo-dw" style="left:var(--m);top:var(--m);font-size:calc(var(--u)*6)">${logo(b)}</p>` : '<i class="x-mk solo"></i>'}<i class="x-glass-corner"></i><p class="mo-dw x-feath">${lines(f.head)}</p><div class="x-feats">${[['home', f.f1], ['bell', f.f2], ['bolt', f.f3], ['shield', f.f4]].map(([k, t]) => `<p><i>${ficons[k]}</i>${lines(t)}</p>`).join('')}</div>` },
  { id: 'x-bar-chart', name: 'Bar chart', cat: 'Professional', look: L('#1f3fe0', '#ffffff', '#ffffff', '#6f8bff', '#1f3fe0', 'space', 'space'),
    fields: { title: 'Energy use', period: 'This month ⌄', value: '320', unit: 'kWh', delta: '+12 % vs last month', bars: '40 22 55 30 52 36 70 22 50 66', labels: 'Week 1\nWeek 2\nWeek 3\nWeek 4' },
    html: (f) => `<p class="mo-small" style="left:var(--m);top:var(--m)">${esc(f.title)}</p><p class="mo-small" style="right:var(--m);top:var(--m)">${esc(f.period)}</p><p class="mo-dw x-val">${esc(f.value)} <span>${esc(f.unit)}</span></p><p class="mo-micro" style="left:var(--m);top:42%;text-transform:none">${esc(f.delta)}</p>
      <div class="x-bars">${String(f.bars).split(/\s+/).filter(Boolean).slice(0, 14).map((v) => `<i style="height:${Math.min(100, +v || 0)}%"></i>`).join('')}</div><div class="x-wk">${list(f.labels).map((l) => `<span>${esc(l)}</span>`).join('')}</div>` },
  { id: 'x-big-stat', name: 'Big stat', cat: 'Professional', look: L('#a385f5', '#0b0b0b', '#0b0b0b', '#a385f5', '#0b0b0b', 'tight', 'tight'),
    fields: { num: '1M', cap: 'App installs delivered\nfor our clients' },
    html: (f) => `<p class="mo-dw x-huge">${esc(f.num)}</p>${arrowCircle('bl')}<p class="mo-micro" style="right:var(--m);bottom:var(--m);text-align:right;text-transform:none">${lines(f.cap)}</p>` },
  { id: 'x-type-stack', name: 'Type stack', cat: 'Editorial', look: L('#ffffff', '#0b0b0b', '#a385f5', '#a385f5', '#ffffff', 'tight', 'tight'),
    fields: { label: 'Growth studio\nfor mobile apps', head: 'We know\n*mobile*\nmarke-\nting' },
    html: (f) => `<p class="mo-micro" style="left:var(--m);top:var(--m);text-transform:none">${lines(f.label)}</p><p class="mo-dw x-tstack">${accent(f.head)}</p>${arrowCircle('br dark')}` },
  { id: 'x-kpi', name: 'KPI cards', cat: 'Professional', look: L('#0b0b0b', '#ffffff', '#a385f5', '#a385f5', '#d8d6dc', 'tight', 'tight'),
    fields: { head: 'A growth\nstory', sub: 'From idea to launch:\nwhere the numbers went', k1: 'Open rate\ngrowth', v1: '8%', k2: 'Email\ndelivery', v2: '70%' },
    html: (f) => `<p class="mo-dw x-kpih">${lines(f.head)}</p><b class="x-plus">+</b><p class="mo-micro" style="left:54%;top:36%;text-transform:none">${lines(f.sub)}</p><div class="x-kpis"><div><p>${lines(f.k1)}</p><b>${esc(f.v1)}</b></div><div class="g"><p>${lines(f.k2)}</p><b>${esc(f.v2)}</b></div></div>` },
  { id: 'x-growth', name: 'Growth line', cat: 'Professional', look: L('#ffffff', '#0b0b0b', '#a385f5', '#a385f5', '#ffffff', 'tight', 'tight'),
    fields: { head: 'Your growth\npartner', label: 'Active users', value: '23.45%' },
    html: (f) => `<p class="mo-dw x-grh">${lines(f.head)}</p><p class="mo-small" style="left:var(--m);top:30%">${esc(f.label)}</p><svg class="x-area" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true"><path d="M0 170 L30 150 L55 160 L80 120 L110 135 L140 100 L170 115 L200 80 L230 95 L250 60 L280 75 L310 50 L340 62 L370 30 L400 18 L400 200 L0 200Z" fill="color-mix(in srgb,var(--accent) 35%,transparent)"/><path d="M0 170 L30 150 L55 160 L80 120 L110 135 L140 100 L170 115 L200 80 L230 95 L250 60 L280 75 L310 50 L340 62 L370 30 L400 18" fill="none" stroke="var(--accent)" stroke-width="2.4" vector-effect="non-scaling-stroke"/><path d="M250 0 V200" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke"/></svg><p class="x-bub">${esc(f.value)}</p>` },
  { id: 'x-price', name: 'Price tag', cat: 'Professional', look: L('#cfcfcf', '#0b0b0b', '#a385f5', '#a385f5', '#0b0b0b', 'tight', 'tight'),
    fields: { value: '$72 000', head: 'The marketing\nautomation\nplatform', note: 'saved per\nyear' },
    html: (f) => `<p class="x-ptag">${esc(f.value)}</p><b class="x-plus c">+</b><p class="mo-dw x-pth">${lines(f.head)}</p><p class="mo-micro" style="right:var(--m);bottom:var(--m);text-align:right;text-transform:none">${lines(f.note)}</p>` },
  { id: 'x-lime-statement', name: 'Lime statement', cat: 'Professional', look: L('#0b0b0b', '#ffffff', '#c6f432', '#c6f432', '#0b0b0b', 'tight', 'tight'),
    fields: { label: 'Strategy · Marketing · Results', a: 'Posting more\nis not the plan.', b: 'Having a\nstrategy is.' },
    html: (f, im, b) => `<p class="mo-micro" style="left:var(--m);top:var(--m)">${esc(f.label)}</p><i class="mo-rule" style="top:calc(var(--m) + var(--u)*4)"></i><p class="mo-dw x-limeh">${lines(f.a)}<br><span class="mo-acc">${lines(f.b)}</span></p><p class="mo-dw" style="left:var(--m);bottom:var(--m);font-size:calc(var(--u)*5)">${logo(b, b.name)}</p><p class="x-arrow">→</p>` },
  { id: 'x-method', name: 'Numbered method', cat: 'Professional', look: L('#141414', '#ffffff', '#c6f432', '#c6f432', '#141414', 'tight', 'tight'), art: ['object', ['#141414', '#5a5a5a']],
    fields: { label: 'Our method', items: 'Understand the business\nDesign the strategy\nShip with focus\nMeasure and improve' },
    html: (f, im, b) => `${img(im, 'dim')}<div class="mo-shade low"></div><p class="mo-micro" style="left:var(--m);top:var(--m)">${esc(f.label)}</p><i class="mo-rule" style="top:calc(var(--m) + var(--u)*4)"></i><ol class="x-steps">${list(f.items).map((t, i) => `<li><span class="mo-acc">${String(i + 1).padStart(2, '0')}.</span>${esc(t)}</li>`).join('')}</ol><p class="mo-dw" style="left:var(--m);bottom:var(--m);font-size:calc(var(--u)*5)">${logo(b, b.name)}</p>` },
  // Gradient
  { id: 'x-badge', name: 'Event badge', cat: 'Gradient', look: L('#050b2e', '#ffffff', '#3a4cff', '#3a4cff', '#050b2e', 'wide', 'wide'),
    fields: { name: 'Ada', label: 'Position', role: 'Event\ndirector', foot: 'Core   Production   Team' },
    html: (f) => `<i class="x-strap"></i><i class="x-clip"></i><div class="x-badgec"><i class="hole"></i><div class="mo-grain"></div><p class="mo-dw nm">${esc(f.name)}</p><i class="ln a"></i><p class="lb">${esc(f.label)}</p><p class="mo-dw rl">${lines(f.role)}</p><i class="ln b"></i><p class="ft">${esc(f.foot)}</p></div>` },
  // Bold photo
  { id: 'x-photo-headline', name: 'Photo headline', cat: 'Bold photo', look: L('#121212', '#ffffff', '#ffffff', '#000000', '#121212', 'tight', 'tight'), art: ['front', ['#2a2420', '#a08a74']],
    fields: { label: 'Social & growth', head: 'We plan content\nfor brands that\n*get noticed.*', sub: 'Without posting every day', c1: 'Topic\nContent plans', c2: 'Brought to you\nby North', c3: 'Make sure to\nsave this post' },
    html: (f, im) => `${img(im)}<div class="mo-shade"></div><p class="mo-micro" style="left:0;right:0;top:var(--m);text-align:center">${esc(f.label)}</p><p class="mo-dw x-phh">${lines(f.head).replace(/\*([^*]+)\*/g, '<em>$1</em>')}</p><p class="mo-small x-phs">${esc(f.sub)}</p>
      <div class="x-cols3"><p>${lines(f.c1)}</p><p>${lines(f.c2)}</p><p>${lines(f.c3)}</p></div>` },
  { id: 'x-acid', name: 'Acid sport', cat: 'Sport', look: L('#0b0b0b', '#0b0b0b', '#d9ff1f', '#d9ff1f', '#2b5fd9', 'tight', 'tight'), art: ['up', ['#2b5fd9', '#cfe0ff']],
    fields: { head: 'Keep\nyour pace', mark: 'Tempo' },
    html: (f, im, b) => `<div class="x-acid-photo">${img(im)}</div>${burst}<p class="x-acid-box"><span>${lines(f.head)}</span></p><p class="mo-dw x-acid-mark">${logo(b, f.mark)}</p>` },
  // Editorial
  { id: 'x-zine', name: 'Zine', cat: 'Editorial', look: L('#c24a12', '#ffffff', '#ffffff', '#ff6a1a', '#3a0d02', 'condensed', 'grotesk', 'jet'), art: ['profile', ['#7a2a08', '#ff8a3a']],
    fields: { head: 'how does\nit work?', side: 'How we\nbuild\nyour\nidentity', foot: 'Personal brand studio' },
    html: (f, im) => `${img(im)}<div class="x-warm"></div><p class="x-type">${lines(f.head)}</p><p class="mo-dw x-zside">${lines(f.side)}</p>${barcode}<p class="mo-micro" style="right:var(--m);bottom:var(--m)">${esc(f.foot)}</p>` },
  { id: 'x-double-brackets', name: 'Double brackets', cat: 'Editorial', look: L('#e9e7e3', '#0b0b0b', '#c4361a', '#e9e7e3', '#0b0b0b', 'condensed', 'grotesk', 'jet'), art: ['front', ['#bdbab4', '#f4f2ee']],
    fields: { a: '((mistakes))', b: 'in', c: 'personal', d: 'branding' },
    html: (f, im) => `${img(im, 'grey')}<div class="x-paper"></div><div class="x-just"><p><span>${esc(f.a)}</span><span>${esc(f.b)}</span></p><p class="mo-dw"><span>${esc(f.c)}</span><span>${esc(f.d)}</span></p></div>${barcode.replace('x-barcode', 'x-barcode r')}` },
  { id: 'x-shop-drop', name: 'Shop drop', cat: 'Editorial', look: L('#efece4', '#141414', '#7a0a0a', '#7a0a0a', '#efece4', 'tight', 'grotesk', 'jet'), art: ['object', ['#d8d4ca', '#ffffff']],
    fields: { url: 'north.shop', head: 'Soon\nin stock', body: 'A heavier leather, a softer lining and a sole that lasts. Ten pairs per size, no restock.' },
    html: (f, im) => `<div class="x-block">${img(im, 'grey')}</div><p class="mo-mono" style="right:var(--m);top:var(--m);font-weight:500">${esc(f.url).toUpperCase()}</p><p class="mo-dw x-soon">${lines(f.head)}</p><p class="mo-mono x-mpara">${esc(f.body)}</p>` },
  { id: 'x-red-wall', name: 'Red wall', cat: 'Editorial', look: L('#6b0508', '#ffffff', '#ffffff', '#6b0508', '#2a0002', 'tight', 'grotesk', 'jet'),
    fields: { head: 'Monochrome moves\nagainst the noise.\nThis is north\nand this is calm.', body: 'Cut in small runs, made to be worn for years. Nothing loud, nothing extra.', url: 'north.shop' },
    html: (f) => `<p class="mo-dw x-wall">${lines(f.head)}</p><p class="mo-mono x-wallp">${esc(f.body)}</p><p class="mo-mono" style="left:var(--m);bottom:var(--m)">${esc(f.url).toUpperCase()}</p><p class="mo-mono" style="right:var(--m);bottom:var(--m)">${esc(f.url).toUpperCase()}</p>` },
  { id: 'x-sale-band', name: 'Sale band', cat: 'Editorial', look: L('#efece4', '#141414', '#141414', '#efece4', '#141414', 'tight', 'tight'), art: ['profile', ['#1a1a1a', '#e4e0d8']],
    fields: { big: '50% off\nnow', r1: 'Sale', r2: 'Ending\n27.05' },
    html: (f, im) => `<div class="x-top78">${img(im, 'grey x-hard')}</div><p class="mo-dw x-saleb">${lines(f.big)}</p><p class="mo-dw x-saler">${esc(f.r1)}<br><br>${lines(f.r2)}</p>` },
  // Minimal
  { id: 'x-swiss', name: 'Swiss headline', cat: 'Minimal', look: L('#f2f1ee', '#141414', '#e8401c', '#e8401c', '#f2f1ee', 'tight', 'tight', 'jet'),
    fields: { tl: 'North studio', tr: 'Swiss style\ntemplates', lead: 'You get views but no\nsign-ups. Here is why:', bullets: 'No clear call to action\nTalking to the wrong stage\nNo follow-up', head: 'Your content\nfunnel is\nleaking.', link: 'Find out more →' },
    html: (f) => `<p class="mo-micro" style="left:var(--m);top:var(--m)">${esc(f.tl)}</p><p class="mo-mono" style="right:var(--m);top:var(--m);text-align:right;font-size:calc(var(--u)*1.5);text-transform:uppercase">${lines(f.tr)}</p>
      <p class="mo-small x-lead">${lines(f.lead)}</p><ul class="x-bul">${list(f.bullets).map((t) => `<li>${esc(t)}</li>`).join('')}</ul><p class="mo-dw x-swh">${lines(f.head)}</p><p class="mo-small" style="right:var(--m);bottom:var(--m)">${esc(f.link)}</p>` },
  { id: 'x-percent', name: 'Swiss percent', cat: 'Minimal', look: L('#f2f1ee', '#141414', '#ef3b24', '#ef3b24', '#f2f1ee', 'tight', 'tight'),
    fields: { head: 'Why do most\nposts fail? →', sub: 'And no, it is not the algorithm.', num: '91%', cap: 'of posts get no\nmeaningful reply.' },
    html: (f) => `<p class="mo-dw x-pq">${lines(f.head)}</p><p class="x-serif">${esc(f.sub)}</p><p class="mo-dw x-pnum">${esc(f.num)}</p><p class="mo-micro x-pcap">${lines(f.cap)}</p>` },
  { id: 'x-asterisk', name: 'Asterisk', cat: 'Minimal', look: L('#ffffff', '#141414', '#ef3b24', '#ef3b24', '#ffffff', 'tight', 'serif'),
    fields: { head: 'Build trust\nwith', italic: 'templates', c1: 'Show clients how\nyou work.', c2: 'Share checklists and\nframeworks. They show\nyour process.' },
    html: (f) => `<i class="x-astw">${asterisk}</i><p class="mo-dw x-asth">${lines(f.head)}<br><em>${esc(f.italic)}</em></p><p class="mo-micro" style="left:var(--m);bottom:var(--m);text-transform:none">${lines(f.c1)}</p><p class="mo-micro" style="left:52%;bottom:var(--m);text-transform:none">${lines(f.c2)}</p>` },
  { id: 'x-soft-story', name: 'Soft story', cat: 'Minimal', look: L('#e9e9e9', '#ffffff', '#ffffff', '#ffffff', '#111111', 'tight', 'tight'), art: ['front', ['#3a3a3a', '#e6e6e6']],
    fields: { head: 'What makes\nit *different?*', body: 'Fewer sessions, the same care and a plan that fits your week. We explain every step first.', side: 'north studio' },
    html: (f, im) => `${img(im, 'grey')}<div class="x-haze2"></div><p class="mo-dw x-softh">${lines(f.head).replace(/\*([^*]+)\*/g, '<em>$1</em>')}</p><p class="mo-micro x-softb">${esc(f.body)}</p><p class="x-arr">⟶</p><p class="mo-micro x-vside">${esc(f.side)}</p>` },
];

export const moreCss = `
.bi-ad .x-purple{position:absolute;inset:0;background:radial-gradient(70% 60% at 80% 100%,var(--g1),transparent 70%),linear-gradient(180deg,var(--bg) 0,var(--bg) 40%,color-mix(in srgb,var(--g1) 60%,var(--bg)) 100%)}
.bi-ad .x-topbar{position:absolute;left:var(--m);right:var(--m);top:calc(var(--u)*2.4);height:calc(var(--u)*5);border-radius:99px;background:#fff;display:flex;justify-content:flex-end;align-items:center;padding:0 calc(var(--u)*1.2);z-index:4;color:#0b0b14}
.bi-ad .x-markb{display:inline-flex;align-items:center;gap:calc(var(--u)*.8);font-family:var(--fdv);font-weight:700;font-size:calc(var(--u)*2.2);padding:calc(var(--u)*.6) calc(var(--u)*1.4);border-radius:99px;background:rgba(0,0,0,.06)}
.bi-ad .x-markb i{width:calc(var(--u)*2.2);height:calc(var(--u)*2.2);border-radius:28%;background:var(--accent);clip-path:polygon(0 0,100% 0,100% 55%,55% 55%,55% 100%,0 100%)}
.bi-ad .x-apph{left:var(--m);top:14%;font-size:calc(var(--u)*10.6);font-weight:400;letter-spacing:-.045em;line-height:.9}
.bi-ad .x-side{left:42%;top:15%;font-weight:500}
.bi-ad .x-cta{position:absolute;z-index:4;padding:calc(var(--u)*1.3) calc(var(--u)*3.4);border-radius:99px;background:var(--accent);color:#fff;font-size:calc(var(--u)*2.1);font-weight:500;box-shadow:0 calc(var(--u)*1) calc(var(--u)*3) color-mix(in srgb,var(--accent) 50%,transparent)}
.bi-ad .x-ph-wrap{position:absolute;left:30%;right:14%;top:44%;bottom:-12%;rotate:-6deg;z-index:3}
.bi-ad .x-phone{position:absolute;inset:0;border-radius:calc(var(--u)*7);background:linear-gradient(145deg,#d9dbe2,#7c7f88 40%,#2b2d33);padding:calc(var(--u)*1.2);box-shadow:0 calc(var(--u)*4) calc(var(--u)*8) rgba(10,5,40,.45)}
.bi-ad .x-screen{width:100%;height:100%;border-radius:calc(var(--u)*6);background:#fff;overflow:hidden;position:relative}
.bi-ad .x-ui{position:absolute;inset:12% 10%;display:grid;gap:calc(var(--u)*1.6);align-content:start}
.bi-ad .x-ui i{height:calc(var(--u)*4);border-radius:calc(var(--u)*1);background:#f0f0f5;box-shadow:inset 0 0 0 1px #e4e4ec}
.bi-ad .x-ui i.t{height:calc(var(--u)*2);width:60%;background:#0b0b14;opacity:.8;box-shadow:none}
.bi-ad .x-float{position:absolute;z-index:4;display:grid;place-items:center;width:calc(var(--u)*9);height:calc(var(--u)*9);border-radius:calc(var(--u)*2);color:#fff;background:linear-gradient(140deg,color-mix(in srgb,var(--accent) 70%,#fff),var(--accent));box-shadow:0 calc(var(--u)*1) calc(var(--u)*4) color-mix(in srgb,var(--accent) 50%,transparent)}
.bi-ad .x-float svg{width:45%;height:45%} .bi-ad .x-float.a{left:16%;top:66%;background:rgba(255,255,255,.75);color:var(--accent)} .bi-ad .x-float.b{right:6%;top:52%}
.bi-ad .x-night{position:absolute;inset:0;background:radial-gradient(60% 45% at 50% 85%,color-mix(in srgb,var(--g1) 80%,transparent),transparent 70%),linear-gradient(180deg,var(--g2),var(--bg))}
.bi-ad .x-slab{position:absolute;left:22%;right:22%;top:52%;height:34%;z-index:2;background:linear-gradient(160deg,color-mix(in srgb,var(--g1) 70%,#fff) 0,var(--g1) 30%,var(--g2) 100%);clip-path:polygon(0 30%,46% 30%,30% 100%,58% 100%,70% 55%,100% 55%,100% 0,0 0);opacity:.9;box-shadow:0 0 0 1px rgba(255,255,255,.2)}
.bi-ad .x-chip{position:absolute;left:50%;top:15%;translate:-50% 0;z-index:4;padding:calc(var(--u)*.6) calc(var(--u)*2.2);border-radius:99px;background:color-mix(in srgb,var(--accent) 60%,transparent);font-size:calc(var(--u)*1.8)}
.bi-ad .x-claimh{left:var(--m);right:var(--m);top:22%;text-align:center;font-size:calc(var(--u)*7.6);font-weight:400;letter-spacing:-.04em;line-height:1}
.bi-ad .x-claims{left:var(--m);right:var(--m);top:40%;text-align:center;font-weight:400;font-size:calc(var(--u)*2.8);opacity:.85}
.bi-ad .x-edge{position:absolute;inset:0;background:radial-gradient(75% 65% at 50% 50%,var(--bg) 40%,transparent 80%),linear-gradient(135deg,var(--g1),color-mix(in srgb,var(--g1) 40%,var(--bg)))}
.bi-ad .x-pcard{position:absolute;left:17%;right:17%;top:14%;bottom:14%;z-index:3;border-radius:calc(var(--u)*4.4);background:#fff;overflow:hidden;color:#0b0b0b}
.bi-ad .x-pcard .hd{position:relative;height:42%;background:radial-gradient(70% 70% at 50% 50%,#05070c 30%,var(--g1) 95%);color:#fff}
.bi-ad .x-pcard .w{position:absolute;left:20%;top:30%;font-family:var(--fdv);font-size:calc(var(--u)*7);font-weight:400;letter-spacing:-.04em}
.bi-ad .x-pcard .t{position:absolute;left:56%;top:33%;font-size:calc(var(--u)*1.4);line-height:1.3;opacity:.8}
.bi-ad .x-pcard .fl{position:absolute;right:6%;bottom:8%;padding:calc(var(--u)*1.2) calc(var(--u)*3.2);border-radius:99px;background:#fff;color:#0b0b0b;font-weight:500;font-size:calc(var(--u)*2.4)}
.bi-ad .x-pcard .av{position:absolute;left:6%;top:30%;width:calc(var(--u)*17);aspect-ratio:1;border-radius:calc(var(--u)*2.6);background:radial-gradient(circle at 50% 50%,#000 30%,var(--g1));display:flex;align-items:center;justify-content:center;gap:4%}
.bi-ad .x-pcard .av b{width:16%;height:30%;background:#fff;transform:skewY(-30deg);border-radius:2px}
.bi-ad .x-pcard .bd{position:absolute;left:6%;right:6%;top:60%;font-size:calc(var(--u)*2.2);line-height:1.4}
.bi-ad .x-pcard .n{font-family:var(--fdv);font-size:calc(var(--u)*4.4);font-weight:700;letter-spacing:-.02em;line-height:1.1}
.bi-ad .x-pcard .ok{display:inline-grid;place-items:center;width:1em;height:1em;border-radius:50%;background:var(--accent);color:#fff;font-size:.55em;font-style:normal;vertical-align:middle}
.bi-ad .x-pcard .h{color:#777} .bi-ad .x-pcard .bio{margin:calc(var(--u)*2) 0} .bi-ad .x-pcard .cnt b{font-weight:600} .bi-ad .x-pcard .ln{color:var(--accent);margin-top:calc(var(--u)*1.4)}
.bi-ad .x-glow-br{position:absolute;inset:0;background:radial-gradient(60% 45% at 100% 100%,var(--g1),transparent 70%)}
.bi-ad .x-wm{left:0;right:0;top:20%;text-align:center;font-size:calc(var(--u)*26);font-weight:600;letter-spacing:-.05em;line-height:1}
.bi-ad .x-wm .mo-acc{display:inline-block;translate:0 .14em}
.bi-ad .x-corner{position:absolute;left:12%;right:-10%;top:58%;bottom:-20%;z-index:3;border-radius:calc(var(--u)*12) calc(var(--u)*12) 0 0;background:#000;box-shadow:inset 0 0 0 calc(var(--u)*1.2) #1b2a4a,inset 0 0 0 calc(var(--u)*1.6) #3a4f7a;rotate:-4deg;padding:calc(var(--u)*6) calc(var(--u)*8)}
.bi-ad .x-corner .tm{position:absolute;left:12%;top:12%;font-size:calc(var(--u)*3);font-weight:600}
.bi-ad .x-corner .st{position:absolute;right:22%;top:13%;display:flex;gap:calc(var(--u)*.6)} .bi-ad .x-corner .st i{width:calc(var(--u)*2.4);height:calc(var(--u)*1.4);border-radius:3px;background:#fff}
.bi-ad .x-corner .ic{position:absolute;left:12%;top:30%;display:grid;justify-items:center;gap:calc(var(--u)*1);font-size:calc(var(--u)*1.8)}
.bi-ad .x-corner .ic b{display:grid;place-items:center;width:calc(var(--u)*10);height:calc(var(--u)*10);border-radius:24%;background:#111;box-shadow:inset 0 0 0 1px #444;color:var(--accent);font-family:var(--fdv);font-size:calc(var(--u)*6)}
.bi-ad .x-logo{position:absolute;left:var(--m);top:var(--m);z-index:4;color:var(--ink)} .bi-ad .x-logo .x-markb{background:none;padding:0;font-size:calc(var(--u)*3.4)} .bi-ad .x-logo .x-markb i{width:calc(var(--u)*3.6);height:calc(var(--u)*3.6);background:#fff}
.bi-ad .x-bsh{left:var(--m);top:26%;font-size:calc(var(--u)*7.4);font-weight:500;letter-spacing:-.03em;line-height:1}
.bi-ad .x-bsw{left:var(--m);bottom:var(--m)}
.bi-ad .x-ring{position:absolute;right:-18%;top:18%;width:58%;height:68%;border-radius:28%;border:calc(var(--u)*7) solid transparent;background:linear-gradient(var(--bg),var(--bg)) padding-box,linear-gradient(160deg,color-mix(in srgb,var(--g1) 50%,#fff),var(--g2) 60%,var(--g1)) border-box;box-shadow:calc(var(--u)*-2) calc(var(--u)*2) calc(var(--u)*5) rgba(0,0,0,.25);rotate:-8deg}
.bi-ad .x-band{position:absolute;right:0;top:18%;width:22%;height:56%;background:var(--accent);border-radius:calc(var(--u)*12) 0 0 0}
.bi-ad .x-band::after{content:"";position:absolute;right:100%;top:0;width:calc(var(--u)*12);height:calc(var(--u)*10);background:var(--accent);clip-path:polygon(100% 0,100% 100%,0 100%,0 100%)}
.bi-ad .bi-media.x-cut{z-index:1}
.bi-ad .x-gcap{position:absolute;right:4%;bottom:12%;width:58%;z-index:4;display:flex;gap:calc(var(--u)*2.4);align-items:center;padding:calc(var(--u)*2.4);border-radius:calc(var(--u)*2);background:linear-gradient(120deg,color-mix(in srgb,var(--accent) 70%,transparent),rgba(255,255,255,.35));-webkit-backdrop-filter:blur(calc(var(--u)*1.5));backdrop-filter:blur(calc(var(--u)*1.5));box-shadow:inset 0 0 0 1px rgba(255,255,255,.4)}
.bi-ad .x-mkimg{height:calc(var(--u)*9*var(--ls,1))!important}
.bi-ad .x-gcap p{font-size:calc(var(--u)*2.8);line-height:1.2}
.bi-ad .x-mk{position:relative;display:block;width:calc(var(--u)*9);height:calc(var(--u)*9);flex:none;background:#fff;border-radius:22%;clip-path:polygon(0 0,62% 0,100% 30%,100% 100%,0 100%,0 66%,46% 66%,46% 34%,0 34%)}
.bi-ad .x-mk.solo{position:absolute;left:var(--m);top:var(--m);width:calc(var(--u)*6);height:calc(var(--u)*6);background:var(--accent);z-index:4}
.bi-ad .x-glass-corner{position:absolute;right:-12%;top:-10%;width:46%;height:38%;border-radius:calc(var(--u)*6);background:linear-gradient(135deg,rgba(255,255,255,.9),rgba(255,255,255,.2));box-shadow:inset 0 0 0 calc(var(--u)*3) rgba(255,255,255,.6),0 calc(var(--u)*2) calc(var(--u)*5) rgba(0,0,0,.06);rotate:-12deg}
.bi-ad .x-feath{left:var(--m);top:26%;font-size:calc(var(--u)*7);font-weight:500;letter-spacing:-.03em;line-height:1}
.bi-ad .x-feats{position:absolute;left:var(--m);right:var(--m);bottom:calc(var(--m)*1.4);display:grid;grid-template-columns:repeat(4,1fr);gap:calc(var(--u)*2);z-index:4;font-size:calc(var(--u)*1.9);line-height:1.25}
.bi-ad .x-feats i{display:grid;place-items:center;width:calc(var(--u)*7);height:calc(var(--u)*7);border-radius:calc(var(--u)*1.6);background:#fff;color:var(--accent);margin-bottom:calc(var(--u)*1.4)} .bi-ad .x-feats svg{width:55%;height:55%}
.bi-ad .x-val{left:var(--m);top:30%;font-size:calc(var(--u)*8);font-weight:400}
.bi-ad .x-val span{font-size:.3em;opacity:.8}
.bi-ad .x-bars{position:absolute;left:42%;right:var(--m);top:28%;bottom:18%;display:flex;align-items:flex-end;gap:calc(var(--u)*1.2);z-index:4}
.bi-ad .x-bars i{flex:1;border-radius:calc(var(--u)*1.2);background:linear-gradient(180deg,rgba(255,255,255,.95),rgba(255,255,255,.15))}
.bi-ad .x-wk{position:absolute;left:42%;right:var(--m);bottom:var(--m);display:flex;justify-content:space-between;font-size:calc(var(--u)*1.7);z-index:4;opacity:.85}
.bi-ad .x-huge{left:calc(var(--m)*.5);top:calc(var(--m)*.4);font-size:calc(var(--u)*48);font-weight:500;letter-spacing:-.07em;line-height:.8}
.bi-ad .x-arc{position:absolute;z-index:4;display:grid;place-items:center;width:calc(var(--u)*5);height:calc(var(--u)*5);border-radius:50%;background:#0b0b0b;color:#fff} .bi-ad .x-arc svg{width:50%;height:50%}
.bi-ad .x-arc.bl{left:var(--m);bottom:var(--m)} .bi-ad .x-arc.br{right:var(--m);bottom:var(--m)}
.bi-ad .x-tstack{right:var(--m);top:12%;text-align:right;font-size:calc(var(--u)*13);font-weight:500;letter-spacing:-.05em;line-height:.86;text-transform:uppercase}
.bi-ad .x-tstack .mo-acc{font-style:italic}
.bi-ad .x-kpih{left:var(--m);top:var(--m);font-size:calc(var(--u)*6.6);font-weight:400;text-transform:uppercase;letter-spacing:-.03em}
.bi-ad .x-plus{position:absolute;left:var(--m);top:38%;z-index:4;display:grid;place-items:center;width:calc(var(--u)*5);height:calc(var(--u)*5);border-radius:50%;background:var(--accent);color:#0b0b0b;font-size:calc(var(--u)*3.6);font-weight:400}
.bi-ad .x-plus.c{left:50%;top:38%;translate:-50% 0}
.bi-ad .x-kpis{position:absolute;left:var(--m);right:var(--m);top:48%;bottom:var(--m);display:grid;grid-template-columns:1fr 1fr;gap:calc(var(--u)*1.6);z-index:4}
.bi-ad .x-kpis div{border-radius:calc(var(--u)*2.4);background:var(--accent);color:#0b0b0b;padding:calc(var(--u)*2.4);display:flex;flex-direction:column;justify-content:space-between;font-size:calc(var(--u)*1.9)}
.bi-ad .x-kpis .g{background:var(--g2)} .bi-ad .x-kpis b{font-family:var(--fdv);font-size:calc(var(--u)*10);font-weight:400;letter-spacing:-.05em;line-height:.9}
.bi-ad .x-grh{left:var(--m);top:var(--m);font-size:calc(var(--u)*6.6);font-weight:400;text-transform:uppercase;letter-spacing:-.03em}
.bi-ad .x-area{position:absolute;left:var(--m);right:var(--m);top:36%;bottom:var(--m);width:calc(100% - var(--m)*2);height:auto;z-index:3}
.bi-ad .x-bub{position:absolute;left:58%;top:31%;z-index:4;padding:calc(var(--u)*.8) calc(var(--u)*2);border-radius:99px;background:var(--accent);color:#fff;font-size:calc(var(--u)*2.2);font-weight:500}
.bi-ad .x-ptag{position:absolute;left:var(--m);right:var(--m);top:var(--m);z-index:4;padding:calc(var(--u)*1.6) calc(var(--u)*3);border-radius:calc(var(--u)*3);background:#0b0b0b;color:#fff;font-family:var(--fdv);font-size:calc(var(--u)*11);letter-spacing:-.05em;line-height:1}
.bi-ad .x-pth{left:var(--m);right:30%;bottom:var(--m);font-size:calc(var(--u)*6.4);font-weight:400;text-transform:uppercase;letter-spacing:-.03em;line-height:.95}
.bi-ad .x-limeh{left:var(--m);right:var(--m);top:18%;font-size:calc(var(--u)*7.6);font-weight:500;letter-spacing:-.035em;line-height:1.02}
.bi-ad .x-arrow{position:absolute;right:var(--m);bottom:var(--m);z-index:4;font-size:calc(var(--u)*5);line-height:1}
.bi-ad .x-steps{position:absolute;left:var(--m);right:var(--m);top:26%;z-index:4;display:grid;gap:calc(var(--u)*3.4);font-size:calc(var(--u)*4.4);line-height:1.1;letter-spacing:-.02em}
.bi-ad .x-steps li{display:grid;grid-template-columns:calc(var(--u)*9) 1fr}
.bi-ad .x-strap{position:absolute;left:44%;width:12%;top:-2%;height:20%;z-index:2;background:repeating-linear-gradient(90deg,var(--g1) 0 2px,color-mix(in srgb,var(--g1) 80%,#000) 2px 4px);box-shadow:inset 0 0 calc(var(--u)*2) rgba(0,0,0,.35)}
.bi-ad .x-clip{position:absolute;left:46.5%;width:7%;top:16%;height:7%;z-index:3;border-radius:40% 40% 20% 20%;border:calc(var(--u)*.8) solid #c9ccd3;border-bottom-width:calc(var(--u)*1.6)}
.bi-ad .x-badgec{position:absolute;left:22%;right:22%;top:22%;bottom:12%;z-index:3;border-radius:calc(var(--u)*3);overflow:hidden;background:radial-gradient(90% 60% at 80% 10%,#dfe4ff,color-mix(in srgb,var(--g1) 70%,#fff) 30%,var(--g1) 60%,var(--bg) 100%);box-shadow:0 calc(var(--u)*3) calc(var(--u)*6) rgba(0,0,0,.5)}
.bi-ad .x-badgec .hole{position:absolute;left:50%;top:4%;translate:-50% 0;width:calc(var(--u)*5);height:calc(var(--u)*2.4);border-radius:99px;background:var(--bg)}
.bi-ad .x-badgec .nm{left:9%;top:48%;font-size:calc(var(--u)*8);font-weight:800;text-transform:uppercase;letter-spacing:-.01em}
.bi-ad .x-badgec .ln{position:absolute;left:9%;right:9%;height:1px;background:currentColor;opacity:.6} .bi-ad .x-badgec .ln.a{top:63%} .bi-ad .x-badgec .ln.b{top:83%}
.bi-ad .x-badgec .lb{position:absolute;left:9%;top:68%;font-size:calc(var(--u)*1.9);text-transform:uppercase;letter-spacing:.04em}
.bi-ad .x-badgec .rl{right:9%;top:68%;text-align:right;font-size:calc(var(--u)*3.2);font-weight:800;text-transform:uppercase;line-height:1}
.bi-ad .x-badgec .ft{position:absolute;left:9%;right:9%;top:87%;font-size:calc(var(--u)*1.9);text-transform:uppercase;letter-spacing:.06em;white-space:pre;display:flex;justify-content:space-between}
.bi-ad .x-phh{left:var(--m);right:var(--m);top:24%;text-align:center;font-size:calc(var(--u)*8.4);font-weight:800;letter-spacing:-.045em;line-height:.9;text-transform:uppercase}
.bi-ad .x-phh em{font-family:"BI Serif",serif;font-weight:400;font-style:italic;text-transform:none;letter-spacing:-.03em}
.bi-ad .x-phs{left:0;right:0;top:56%;text-align:center}
.bi-ad .x-cols3{position:absolute;left:var(--m);right:var(--m);bottom:var(--m);display:grid;grid-template-columns:1fr 1fr 1fr;z-index:4;font-size:calc(var(--u)*1.6);line-height:1.3;text-align:center}
.bi-ad .x-cols3 p:first-child{text-align:left} .bi-ad .x-cols3 p:last-child{text-align:right}
.bi-ad .x-acid-photo{position:absolute;left:8%;right:6%;top:8%;bottom:24%;rotate:-4deg;overflow:hidden;z-index:1;outline:calc(var(--u)*2.4) solid var(--accent)}
.bi-ad .x-burst{position:absolute;right:-12%;top:-10%;width:52%;z-index:2;rotate:12deg}
.bi-ad .x-acid-box{position:absolute;left:var(--m);right:12%;bottom:8%;z-index:4;padding:calc(var(--u)*2.4) calc(var(--u)*3);background:var(--accent);color:var(--ink);rotate:3deg;font-family:var(--fdv);font-size:calc(var(--u)*8);font-weight:500;line-height:.95;letter-spacing:-.04em}
.bi-ad .x-acid-mark{right:var(--m);top:var(--m);color:#0b0b0b;font-size:calc(var(--u)*5);font-weight:800;font-style:italic;letter-spacing:-.04em}
.bi-ad .x-warm{position:absolute;inset:0;background:color-mix(in srgb,var(--g1) calc(var(--ov,.6)*70%),transparent);mix-blend-mode:multiply}
.bi-ad .x-type{position:absolute;left:var(--m);right:var(--m);top:var(--m);z-index:4;font-family:var(--fmv);font-size:calc(var(--u)*9);line-height:.95;letter-spacing:-.05em}
.bi-ad .x-type br+*,.bi-ad .x-type{text-indent:0}
.bi-ad .x-zside{left:52%;top:46%;font-size:calc(var(--u)*6);font-weight:400;text-transform:uppercase;line-height:.9;text-decoration:underline;text-decoration-thickness:calc(var(--u)*.3);text-underline-offset:calc(var(--u)*.6)}
.bi-ad .x-barcode{position:absolute;left:var(--m);bottom:var(--m);z-index:4;width:calc(var(--u)*16);height:calc(var(--u)*4);background:repeating-linear-gradient(90deg,currentColor 0 2px,transparent 2px 4px,currentColor 4px 5px,transparent 5px 8px,currentColor 8px 11px,transparent 11px 12px)}
.bi-ad .x-barcode.r{left:auto;right:var(--m)}
.bi-ad .x-paper{position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,color-mix(in srgb,var(--bg) 80%,transparent) 75%)}
.bi-ad .x-just{position:absolute;left:var(--m);right:var(--m);bottom:16%;z-index:4;display:grid;gap:calc(var(--u)*.6)}
.bi-ad .x-just p{display:flex;justify-content:space-between;align-items:baseline;font-family:var(--fmv);font-size:calc(var(--u)*5.4);letter-spacing:-.03em}
.bi-ad .x-just p.mo-dw{position:static;font-family:var(--fdv);font-size:calc(var(--u)*9);text-transform:uppercase;font-weight:400}
.bi-ad .x-block{position:absolute;left:0;top:6%;width:52%;height:46%;overflow:hidden}
.bi-ad .x-soon{right:var(--m);top:44%;text-align:right;font-size:calc(var(--u)*7);font-weight:700;text-transform:uppercase;letter-spacing:-.03em}
.bi-ad .x-mpara{left:var(--m);right:var(--m);bottom:var(--m);font-size:calc(var(--u)*1.8);line-height:1.35;text-align:justify}
.bi-ad .x-wall{left:calc(var(--m)*-.3);right:var(--m);top:var(--m);font-size:calc(var(--u)*7.2);font-weight:700;text-transform:uppercase;letter-spacing:-.04em;line-height:.92;white-space:nowrap}
.bi-ad .x-wallp{left:44%;right:var(--m);top:52%;font-size:calc(var(--u)*1.9);line-height:1.35;text-align:justify}
.bi-ad .x-top78{position:absolute;left:0;right:0;top:0;height:76%;overflow:hidden}
.bi-ad .bi-media.x-hard{filter:grayscale(1) contrast(1.35)}
.bi-ad .x-saleb{left:var(--m);bottom:var(--m);font-size:calc(var(--u)*6.4);font-weight:700;text-transform:uppercase;letter-spacing:-.03em}
.bi-ad .x-saler{right:var(--m);bottom:var(--m);text-align:right;font-size:calc(var(--u)*3);font-weight:700;text-transform:uppercase;line-height:1}
.bi-ad .x-lead{right:var(--m);left:52%;top:14%;font-weight:400;font-size:calc(var(--u)*2.8);line-height:1.1;letter-spacing:-.02em}
.bi-ad .x-bul{position:absolute;left:52%;right:var(--m);top:24%;z-index:4;font-family:var(--fmv);font-size:calc(var(--u)*1.45);line-height:1.5;text-transform:uppercase}
.bi-ad .x-bul li::before{content:"• "}
.bi-ad .x-swh{left:var(--m);right:var(--m);top:48%;font-size:calc(var(--u)*10);font-weight:400;letter-spacing:-.055em;line-height:.92}
.bi-ad .x-pq{left:var(--m);right:var(--m);top:22%;font-size:calc(var(--u)*7.6);font-weight:400;letter-spacing:-.045em;line-height:.95}
.bi-ad .x-serif{position:absolute;left:var(--m);top:44%;z-index:4;font-family:"BI Serif",serif;font-style:italic;font-size:calc(var(--u)*3)}
.bi-ad .x-pnum{left:calc(var(--m)*.6);bottom:var(--m);font-size:calc(var(--u)*24);font-weight:400;color:var(--accent);letter-spacing:-.06em;line-height:.8}
.bi-ad .x-pcap{right:var(--m);bottom:calc(var(--m)*1.2);text-transform:none}
.bi-ad .x-astw{position:absolute;left:50%;top:14%;translate:-50% 0;width:calc(var(--u)*13);color:var(--accent);z-index:4} .bi-ad .x-ast{width:100%;height:auto;display:block}
.bi-ad .x-asth{left:var(--m);right:var(--m);top:38%;text-align:center;font-size:calc(var(--u)*8);font-weight:500;letter-spacing:-.045em;line-height:.95;text-transform:uppercase}
.bi-ad .x-asth em{font-family:var(--ftv);font-style:italic;font-weight:400;text-transform:none;letter-spacing:-.02em}
.bi-ad .x-haze2{position:absolute;inset:0;background:radial-gradient(80% 50% at 30% 45%,rgba(255,255,255,calc(var(--ov,.6)*.55)),transparent 70%),linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,calc(var(--ov,.6)*.5)))}
.bi-ad .x-softh{left:var(--m);top:42%;font-size:calc(var(--u)*7.6);font-weight:400;letter-spacing:-.045em;line-height:.95}
.bi-ad .x-softh em{font-style:italic;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:.15em}
.bi-ad .x-softb{left:var(--m);right:40%;top:62%;text-transform:none;font-weight:400;line-height:1.35}
.bi-ad .x-arr{position:absolute;left:var(--m);top:74%;z-index:4;font-size:calc(var(--u)*4)}
.bi-ad .x-vside{right:var(--m);top:var(--m);writing-mode:vertical-rl;text-transform:none;opacity:.8}
@container (min-aspect-ratio: 13/10){
  .bi-ad .x-ph-wrap{left:56%;right:6%;top:20%} .bi-ad .x-pcard{left:30%;right:30%;top:8%;bottom:8%} .bi-ad .x-badgec{left:36%;right:36%}
  .bi-ad .x-kpis{left:46%;top:var(--m)} .bi-ad .x-bars{left:50%} .bi-ad .x-corner{left:40%} .bi-ad .x-wm{top:6%}
  .bi-ad .x-block{width:38%;height:80%} .bi-ad .x-acid-photo{right:30%} .bi-ad .x-steps{left:50%;top:18%}
}
@container (max-aspect-ratio: 7/10){
  .bi-ad .x-pcard{left:8%;right:8%;top:20%;bottom:20%} .bi-ad .x-badgec{left:14%;right:14%;top:24%;bottom:18%}
  .bi-ad .x-ph-wrap{left:16%;right:10%;top:46%} .bi-ad .x-kpis{top:56%;bottom:24%}
}`;
