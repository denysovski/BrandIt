// BrandIt: the big-type set. Fifty posters in the spirit of the stat poster, the event, the big number,
// the team strip, the spec sheet, the launch date, the carousel cover, route stats, vertical headlines,
// giant letters, letter windows, dot boards, numbered quotes and info strips: photos, very big words,
// more small parts around them, clean line charts with dots, soft gradients and a set of symbols of our own.
// Two font families at most: --fdv for the big words, --ftv for everything else.
import { esc, lines, img, L, logo } from './motion.js?v=36';

/* ---------- helpers ---------- */
const p = (s, style = '', cls = 'v-s') => `<p class="${cls}" style="${style}">${lines(s)}</p>`;
const big = (s, style = '', cls = '') => `<p class="mo-dw v-big ${cls}" style="${style}">${lines(s)}</p>`;
const rule = (style) => `<i class="v-rule" style="${style}"></i>`;
const list = (s = '') => String(s).split(/\n/).filter((x) => x.trim() !== '');
const mark = (b, style = '', cls = '') => `<span class="v-mark ${cls}" style="${style}">${logo(b, b.name)}</span>`;
const R = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join('');
const pill = (s, style = '', cls = '') => `<p class="v-pill ${cls}" style="${style}">${esc(s)}</p>`;
const box = (im, style = '', cls = '', grey = '') => `<div class="v-ph ${cls}" style="${style}">${img(im, grey)}</div>`;

/* ---------- symbols, 100×100, all our own ---------- */
const pt = (a, r, c = 50) => `${(c + Math.cos(a) * r).toFixed(1)} ${(c + Math.sin(a) * r).toFixed(1)}`;
const starPath = (n, r1, r2) => 'M' + Array.from({ length: n * 2 }, (_, i) => pt((Math.PI * i) / n - Math.PI / 2, i % 2 ? r2 : r1)).join('L') + 'Z';
export const SYM10 = {
  sparkle: `<path d="M50 0C53 36 64 47 100 50 64 53 53 64 50 100 47 64 36 53 0 50 36 47 47 36 50 0Z"/>`,
  star8: `<path d="${starPath(8, 50, 30)}"/>`,
  star12: `<path d="${starPath(12, 50, 38)}"/>`,
  flower6: R(6, (i) => `<circle cx="${(50 + Math.cos((i * Math.PI) / 3) * 26).toFixed(1)}" cy="${(50 + Math.sin((i * Math.PI) / 3) * 26).toFixed(1)}" r="22"/>`) + '<circle cx="50" cy="50" r="18" fill="var(--bg)"/>',
  ring: `<path fill-rule="evenodd" d="M50 2a48 48 0 1 0 0 96 48 48 0 1 0 0-96Zm0 22a26 26 0 1 1 0 52 26 26 0 1 1 0-52Z"/>`,
  globe: `<g fill="none" stroke="currentColor" stroke-width="5"><circle cx="50" cy="50" r="44"/><ellipse cx="50" cy="50" rx="20" ry="44"/><path d="M6 50h88M12 28h76M12 72h76"/></g>`,
  pin: `<path d="M50 4C31 4 17 18 17 37c0 25 33 59 33 59s33-34 33-59C83 18 69 4 50 4Zm0 46a13 13 0 1 1 0-26 13 13 0 0 1 0 26Z"/>`,
  phone: `<path d="M30 8 42 30l-9 9c5 11 14 20 25 25l9-9 22 12-6 17c-1 4-5 6-9 6C42 88 12 58 10 26c0-4 2-8 6-9Z"/>`,
  clock: `<g fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"><circle cx="50" cy="50" r="42"/><path d="M50 24v28l18 12"/></g>`,
  up: `<g fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"><path d="M10 78 38 50l16 14 34-36"/><path d="M64 26h24v24"/></g>`,
  check: `<path d="M50 2a48 48 0 1 0 0 96 48 48 0 1 0 0-96Zm22 32-28 30-16-16 6-6 10 10 22-24Z"/>`,
  arrow: `<g fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"><path d="M18 82 82 18M36 18h46v46"/></g>`,
  wave: `<g fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round">${R(3, (i) => `<path d="M6 ${30 + i * 20}c11-10 22-10 33 0s22 10 33 0 17-8 22-4"/>`)}</g>`,
  bolt: `<path d="M58 2 16 58h28l-8 40 48-60H54Z"/>`,
  eye: `<path d="M50 20C24 20 6 50 6 50s18 30 44 30 44-30 44-30-18-30-44-30Zm0 48a18 18 0 1 1 0-36 18 18 0 0 1 0 36Z"/>`,
  half: `<path d="M50 4a46 46 0 0 1 0 92Z"/><path d="M50 4a46 46 0 0 0 0 92" fill="none" stroke="currentColor" stroke-width="5"/>`,
  blob: `<path d="M52 6c20 0 40 12 42 34s-8 44-30 52-46 0-54-20S8 30 22 16 38 6 52 6Z"/>`,
  cross: `<path d="M34 2h32v32h32v32H66v32H34V66H2V34h32Z"/>`,
  tri: `<path d="M50 6 96 90H4Z"/>`,
  orbit: `<g fill="none" stroke="currentColor" stroke-width="4"><ellipse cx="50" cy="50" rx="46" ry="18"/><ellipse cx="50" cy="50" rx="46" ry="18" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="46" ry="18" transform="rotate(120 50 50)"/></g><circle cx="50" cy="50" r="9"/>`,
  quote: `<path d="M8 56c0-24 12-40 34-46l4 9c-12 5-18 13-18 23h16v38H8Zm48 0c0-24 12-40 34-46l4 9c-12 5-18 13-18 23h16v38H56Z"/>`,
  squares: R(4, (i) => `<rect x="${(i % 2) * 52}" y="${Math.floor(i / 2) * 52}" width="48" height="48" rx="${i === 3 ? 24 : 6}"/>`),
};
export const sym10 = (k, cls = '', style = '') => `<svg class="v-sym ${cls}" style="${style}" viewBox="0 0 100 100" aria-hidden="true">${SYM10[k]}</svg>`;

/* a clean line chart: one smooth line, a dot on every point, a soft fade under it, the last point marked */
let gid = 0;
export function lineChart(vals, { cls = '', style = '', labels = [], last = '', fill = true } = {}) {
  const n = vals.length, mx = Math.max(...vals), mn = Math.min(...vals), sp = mx - mn || 1;
  const P = vals.map((v, i) => [(i / (n - 1)) * 100, 92 - ((v - mn) / sp) * 80]);
  let d = `M${P[0][0]} ${P[0][1]}`;
  for (let i = 0; i < n - 1; i++) { const [x0, y0] = P[Math.max(0, i - 1)], [x1, y1] = P[i], [x2, y2] = P[i + 1], [x3, y3] = P[Math.min(n - 1, i + 2)]; d += ` C${(x1 + (x2 - x0) / 6).toFixed(2)} ${(y1 + (y2 - y0) / 6).toFixed(2)} ${(x2 - (x3 - x1) / 6).toFixed(2)} ${(y2 - (y3 - y1) / 6).toFixed(2)} ${x2} ${y2.toFixed(2)}`; }
  const id = 'vg' + (++gid);
  const area = fill ? `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--accent);stop-opacity:.42"/><stop offset="1" style="stop-color:var(--accent);stop-opacity:0"/></linearGradient></defs><path d="${d} L100 100 L0 100Z" fill="url(#${id})"/>` : '';
  const grid = R(4, (i) => `<path d="M0 ${12 + i * 26.6}H100" class="v-cg"/>`);
  return `<div class="v-chart ${cls}" style="${style}"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${grid}${area}<path d="${d}" class="v-cl"/></svg>${P.map(([x, y], i) => `<i class="v-dot${i === n - 1 ? ' last' : ''}" style="left:${x}%;top:${y}%"></i>`).join('')}${last ? `<b class="v-tip" style="left:${P[n - 1][0]}%;top:${P[n - 1][1]}%">${esc(last)}</b>` : ''}${labels.length ? `<div class="v-cx">${labels.map((l) => `<span>${esc(l)}</span>`).join('')}</div>` : ''}</div>`;
}
const bars = (vals, style = '', cls = '') => { const mx = Math.max(...vals); return `<div class="v-bars ${cls}" style="${style}">${vals.map((v, i) => `<i style="height:${(v / mx) * 100}%"${i === vals.length - 1 ? ' class="on"' : ''}></i>`).join('')}</div>`; };
const ring = (pct, style = '', cls = '') => `<svg class="v-ring ${cls}" style="${style}" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" class="bg"/><circle cx="50" cy="50" r="44" class="fg" stroke-dasharray="${(pct * 2.7646).toFixed(1)} 276.5" transform="rotate(-90 50 50)"/></svg>`;
const dotsGrid = (n, on, style = '') => `<div class="v-dg" style="${style}">${R(n, (i) => `<i${i < on ? ' class="on"' : ''}></i>`)}</div>`;
const pnum = (s) => parseFloat(String(s).replace(/[^\d.]/g, '')) || 0;

const DK = ['front', ['#111111', '#8a8a8a']], LT = ['front', ['#e8e6e2', '#3a3a3a']], OB = ['object', ['#ebe9e4', '#8a7a6a']];
const lk = (bg, ink, ac, fd = 'tight', ft = 'tight') => L(bg, ink, ac, ac, bg, fd, ft);

export const more10Templates = [
  /* ---------- stat posters ---------- */
  { id: 'v-stat-split', name: 'Stats beside a photo', cat: 'Data & stats', look: lk('#0b0b0b', '#ffffff', '#ff5a1f'), art: DK,
    fields: { label: 'Studio in numbers', a: '7', al: 'people in one room', b: '26', bl: 'awards since 2020', c: '83', cl: 'projects shipped', foot: 'Strategy, identity and web from Prague' },
    html: (f, im, b) => `${box(im, 'left:0;top:0;bottom:0;width:46%', '', 'grey')}${p(f.label, 'left:50%;top:var(--m)')}${mark(b, 'right:var(--m);top:var(--m)')}${['a', 'b', 'c'].map((k, i) => `${rule(`left:50%;top:${18 + i * 24}%`)}${big(f[k], `left:50%;top:calc(${18 + i * 24}% + var(--u)*1.2)`, 'v-sn')}${p(f[k + 'l'], `left:calc(50% + var(--u)*1);top:calc(${18 + i * 24}% + var(--u)*16)`, 'v-s dim')}`).join('')}${p(f.foot, 'left:50%;right:var(--m);bottom:var(--m)')}` },
  { id: 'v-stat-band', name: 'Photo with a stat band', cat: 'Data & stats', look: lk('#ffffff', '#0b0b0b', '#1f3fe6'), art: LT,
    fields: { head: 'A year of\nbetter work', a: '120', al: 'clients', b: '4.9', bl: 'average rating', c: '38%', cl: 'more leads', d: '12', dl: 'countries' },
    html: (f, im, b) => `${box(im, 'left:0;right:0;top:0;height:62%')}${big(f.head, 'left:var(--m);top:var(--m);color:#fff', 'v-h1')}${mark(b, 'right:var(--m);top:var(--m);color:#fff')}<div class="v-band">${['a', 'b', 'c', 'd'].map((k) => `<div><p class="mo-dw v-bn">${esc(f[k])}</p><p class="v-s dim">${esc(f[k + 'l'])}</p></div>`).join('')}</div>` },
  { id: 'v-stat-grid', name: 'Four-cell stats', cat: 'Data & stats', look: lk('#f2f1ec', '#0b0b0b', '#c6f432'), art: LT,
    fields: { a: '+64%', al: 'Organic reach', b: '2.1x', bl: 'Return on ad spend', c: '18k', cl: 'New followers', foot: 'Q3 report · north.studio' },
    html: (f, im, b) => `<div class="v-g4"><div class="v-ph">${img(im)}</div><div class="on"><p class="mo-dw v-g4n">${esc(f.a)}</p><p class="v-s">${esc(f.al)}</p>${sym10('up', '', 'right:12%;top:12%;width:16%')}</div><div><p class="mo-dw v-g4n">${esc(f.b)}</p><p class="v-s">${esc(f.bl)}</p></div><div class="dk"><p class="mo-dw v-g4n">${esc(f.c)}</p><p class="v-s">${esc(f.cl)}</p></div></div>${p(f.foot, 'left:var(--m);bottom:calc(var(--m)*.55)', 'v-xs')}${mark(b, 'right:var(--m);bottom:calc(var(--m)*.55)', 'sm')}` },
  { id: 'v-stat-ring', name: 'Ring of numbers', cat: 'Data & stats', look: lk('#0b0b0b', '#ffffff', '#c6f432'), art: DK,
    fields: { pct: '87', label: 'of clients come back\nfor a second project', a: '312', al: 'Posts made', b: '9 days', bl: 'Average turnaround', c: '4.9', cl: 'Rating' },
    html: (f, im, b) => `${ring(pnum(f.pct), 'left:50%;top:40%;width:min(68%,calc(var(--u)*68))', 'v-c')}${big(f.pct + '%', 'left:0;right:0;top:40%;translate:0 -50%;text-align:center', 'v-rn')}${p(f.label, 'left:0;right:0;top:calc(40% + var(--u)*9);text-align:center')}<div class="v-cols3">${['a', 'b', 'c'].map((k) => `<div><p class="mo-dw v-cn">${esc(f[k])}</p><p class="v-s dim">${esc(f[k + 'l'])}</p></div>`).join('')}</div>${mark(b, 'left:var(--m);top:var(--m)')}` },

  /* ---------- cities ---------- */
  { id: 'v-city-code', name: 'City code', cat: 'Event', look: lk('#e9e7e2', '#0b0b0b', '#ff5a1f'), art: LT,
    fields: { code: 'PRG', name: 'Prague, Czechia', coord: '50.0755° N\n14.4378° E', time: 'Local time 21:40', strip: 'Studio tour 2026 · Prague · Vienna · Berlin · Paris · ' },
    html: (f, im, b) => `${big(f.code, '', 'v-code')}${p(f.name, 'left:var(--m);top:calc(var(--m) + var(--u)*30)')}${p(f.coord, 'right:var(--m);top:calc(var(--m) + var(--u)*30);text-align:right', 'v-s mono')}${box(im, 'left:var(--m);right:var(--m);top:46%;bottom:calc(var(--m) + var(--u)*9)', '', 'grey')}${sym10('pin', '', 'left:calc(var(--m) + var(--u)*3);top:calc(46% + var(--u)*3);width:calc(var(--u)*7);color:var(--accent)')}<div class="v-tick" style="bottom:calc(var(--m) + var(--u)*3)"><span>${esc(f.strip.repeat(3))}</span></div>${p(f.time, 'left:var(--m);bottom:var(--m)', 'v-xs')}${mark(b, 'right:var(--m);bottom:var(--m)', 'sm')}` },
  { id: 'v-city-list', name: 'Tour cities', cat: 'Event', look: lk('#0b0b0b', '#ffffff', '#ff3d7f'), art: DK,
    fields: { label: 'Europe tour 2026', cities: 'Prague\nBerlin\nVienna\nParis\nMilan', dates: '12.03\n15.03\n19.03\n23.03\n27.03', on: '3', foot: 'Tickets at north.live' },
    html: (f, im, b) => { const c = list(f.cities).slice(0, 6), d = list(f.dates), on = Math.max(1, +f.on || 1) - 1; return `${p(f.label, 'left:var(--m);top:var(--m)')}${mark(b, 'right:var(--m);top:var(--m)')}<div class="v-cities">${c.map((x, i) => `<div class="${i === on ? 'on' : ''}"><b>${esc(x)}</b><span>${esc(d[i] || '')}</span></div>`).join('')}</div>${box(im, 'right:var(--m);bottom:calc(var(--m) + var(--u)*6);width:30%;aspect-ratio:3/4', 'v-r', 'grey')}${p(f.foot, 'left:var(--m);bottom:var(--m)')}`; } },
  { id: 'v-city-map', name: 'Map pin', cat: 'Event', look: lk('#f4f3ef', '#0b0b0b', '#1f3fe6'), art: LT,
    fields: { head: 'Find us\nin Karlín', addr: 'Pernerova 12\n186 00 Prague 8', open: 'Mon–Fri 9–18\nSat 10–14', num: '08' },
    html: (f, im, b) => `<svg class="v-map" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width=".35" opacity=".35">${R(9, (i) => `<path d="M${-10 + i * 14} 0 L${10 + i * 12} 100"/>`)}${R(8, (i) => `<path d="M0 ${6 + i * 13} L100 ${2 + i * 14}"/>`)}</g><path d="M-5 70C20 60 40 76 58 52S90 40 105 30" fill="none" stroke="var(--accent)" stroke-width="1.6" opacity=".9"/></svg>${sym10('pin', '', 'left:56%;top:34%;width:calc(var(--u)*10);color:var(--accent)')}${big(f.head, 'left:var(--m);top:var(--m)', 'v-h1')}${big(f.num, 'right:var(--m);top:var(--m);opacity:.12', 'v-ghost')}<div class="v-card" style="left:var(--m);bottom:var(--m);width:54%"><div class="v-ph" style="position:relative;aspect-ratio:16/9">${img(im)}</div>${p(f.addr, 'position:relative;margin-top:calc(var(--u)*1.6)')}${p(f.open, 'position:relative;margin-top:calc(var(--u)*1.2)', 'v-s dim')}</div>${mark(b, 'right:var(--m);bottom:var(--m)')}` },

  /* ---------- events ---------- */
  { id: 'v-event-day', name: 'Day number', cat: 'Event', look: lk('#ff5a1f', '#0b0b0b', '#ffffff'), art: DK,
    fields: { day: '24', month: 'November', title: 'Open studio\nevening', time: '18:00 – 22:00', place: 'Old print house\nPrague 7', note: 'Free entry · drinks · talks' },
    html: (f, im, b) => `${big(f.day, '', 'v-day')}<p class="mo-dw v-month">${esc(f.month)}</p>${box(im, 'right:var(--m);top:var(--m);width:34%;aspect-ratio:3/4', '', 'grey')}${big(f.title, 'left:var(--m);top:58%', 'v-h2')}${rule('top:76%')}<div class="v-cols3" style="top:calc(76% + var(--u)*1.4);bottom:auto">${[f.time, f.place, f.note].map((x) => `<div>${p(x, 'position:relative')}</div>`).join('')}</div>${mark(b, 'left:var(--m);bottom:var(--m)')}` },
  { id: 'v-event-ticket', name: 'Ticket', cat: 'Event', look: lk('#1f3fe6', '#0b0b0b', '#c6f432'), art: DK,
    fields: { title: 'Design\nmeetup', no: 'No. 0042', date: 'Thu 12.03', time: '19:00', seat: 'Free seat', place: 'Karlín Hall, Prague' },
    html: (f, im, b) => `<div class="v-ticket"><div class="v-tk-top">${box(im, 'inset:0', '', 'grey')}${big(f.title, 'left:7%;bottom:7%;color:#fff', 'v-h1')}${p(f.no, 'right:7%;top:7%;color:#fff', 'v-s mono')}</div><div class="v-tk-bot"><div class="v-tk-g">${[['Date', f.date], ['Time', f.time], ['Seat', f.seat]].map(([k, v]) => `<div><span>${k}</span><b>${esc(v)}</b></div>`).join('')}</div>${p(f.place, 'left:7%;bottom:8%')}<i class="v-barcode"></i></div></div>${mark(b, 'left:var(--m);top:var(--m);color:#fff', 'sm')}` },
  { id: 'v-event-cal', name: 'Calendar circle', cat: 'Event', look: lk('#ffffff', '#0b0b0b', '#ff3d7f'), art: LT,
    fields: { month: 'March 2026', day: '18', title: 'Spring\nlaunch party', place: 'North Studio, Prague', time: 'Doors 19:00' },
    html: (f, im, b) => { const d = Math.min(31, Math.max(1, +f.day || 18)); return `${p(f.month, 'left:var(--m);top:var(--m);font-weight:600')}${mark(b, 'right:var(--m);top:var(--m)')}<div class="v-cal">${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((x) => `<b>${x}</b>`).join('')}${R(6, () => '<span></span>')}${R(31, (i) => `<span${i + 1 === d ? ' class="on"' : ''}>${i + 1}</span>`)}</div>${big(f.title, 'left:var(--m);top:62%', 'v-h1')}${box(im, 'right:var(--m);top:62%;width:30%;aspect-ratio:1', 'v-round', 'grey')}${p(f.place, 'left:var(--m);bottom:var(--m)')}${p(f.time, 'right:var(--m);bottom:var(--m);text-align:right')}`; } },
  { id: 'v-event-count', name: 'Countdown', cat: 'Event', look: lk('#0b0b0b', '#ffffff', '#ff5a1f'), art: DK,
    fields: { num: '03', unit: 'days to go', title: 'Summer sale starts Friday', of: '10', foot: 'Up to 40% off everything' },
    html: (f, im, b) => { const n = Math.max(0, Math.min(20, +f.of || 10)), left = Math.min(n, pnum(f.num)); return `${box(im, 'inset:0', '', 'grey')}<div class="v-shade"></div>${mark(b, 'left:var(--m);top:var(--m)')}${big(f.num, '', 'v-count')}${p(f.unit, 'left:var(--m);top:calc(var(--m) + var(--u)*40)', 'v-s lg')}<div class="v-prog" style="bottom:calc(var(--m) + var(--u)*14)">${R(n, (i) => `<i${i >= n - left ? '' : ' class="on"'}></i>`)}</div>${big(f.title, 'left:var(--m);right:var(--m);bottom:calc(var(--m) + var(--u)*4)', 'v-h3')}${p(f.foot, 'left:var(--m);bottom:var(--m)', 'v-xs')}`; } },

  /* ---------- book a call ---------- */
  { id: 'v-call-slots', name: 'Free slots', cat: 'Professional', look: lk('#f2f1ec', '#0b0b0b', '#1f3fe6'), art: LT,
    fields: { head: 'Book a\n20 min call', slots: 'Mon 10:00\nMon 14:30\nTue 09:00\nTue 15:00\nWed 11:00\nWed 17:30\nThu 16:00\nFri 10:30\nFri 13:00', taken: '2', cta: 'Pick a time →', note: '6 slots left this week' },
    html: (f, im, b) => { const t = +f.taken || 0; return `${big(f.head, 'left:var(--m);top:var(--m)', 'v-h0')}${sym10('phone', '', 'right:var(--m);top:var(--m);width:calc(var(--u)*11);color:var(--accent)')}<div class="v-slots">${list(f.slots).slice(0, 9).map((x, i) => `<span class="${i < t ? 'off' : i === t ? 'on' : ''}">${esc(x)}</span>`).join('')}</div>${box(im, 'left:var(--m);bottom:var(--m);width:22%;aspect-ratio:1', 'v-round')}${p(f.note, 'left:calc(var(--m) + 26%);bottom:calc(var(--m) + var(--u)*5)')}${pill(f.cta, 'left:calc(var(--m) + 26%);bottom:var(--m)', 'ac')}${mark(b, 'right:var(--m);bottom:var(--m)', 'sm')}`; } },
  { id: 'v-call-person', name: 'Talk to a person', cat: 'Professional', look: lk('#0b0b0b', '#ffffff', '#c6f432'), art: DK,
    fields: { quote: '“Tell me what you are building. I will tell you what to post first.”', name: 'Anna North', role: 'Strategy lead', cta: 'Book a call', note: 'Free, 20 minutes, no slides' },
    html: (f, im, b) => `${box(im, 'right:0;top:0;bottom:0;width:48%', '', 'grey')}${sym10('quote', '', 'left:var(--m);top:var(--m);width:calc(var(--u)*10);color:var(--accent)')}${big(f.quote, 'left:var(--m);width:46%;top:calc(var(--m) + var(--u)*14)', 'v-h4')}${rule('right:52%;bottom:calc(var(--m) + var(--u)*16)')}${p(f.name, 'left:var(--m);bottom:calc(var(--m) + var(--u)*10.5);font-weight:600')}${p(f.role, 'left:var(--m);bottom:calc(var(--m) + var(--u)*7.6)', 'v-s dim')}${pill(f.cta + ' ↗', 'left:var(--m);bottom:var(--m)', 'ac')}${p(f.note, 'right:var(--m);bottom:var(--m);color:#fff;text-align:right', 'v-xs')}${mark(b, 'right:var(--m);top:var(--m);color:#fff', 'sm')}` },
  { id: 'v-call-steps', name: 'Three steps', cat: 'Professional', look: lk('#ffffff', '#0b0b0b', '#ff5a1f'), art: LT,
    fields: { head: 'From call\nto launch\nin 3 weeks', s1: 'Call', t1: '20 minutes about your goals', s2: 'Plan', t2: 'A clear plan with dates', s3: 'Launch', t3: 'Posts out, numbers in', cta: 'Book a call →' },
    html: (f, im, b) => `${big(f.head, 'left:var(--m);top:var(--m)', 'v-h0')}<div class="v-steps">${[['phone', f.s1, f.t1], ['clock', f.s2, f.t2], ['up', f.s3, f.t3]].map(([ic, s, t], i) => `<div>${sym10(ic, '', 'position:relative;width:calc(var(--u)*7);color:' + (i === 2 ? 'var(--accent)' : 'currentColor'))}<b>${esc(s)}</b><span>${esc(t)}</span></div>`).join('')}</div>${pill(f.cta, 'left:var(--m);bottom:var(--m)', 'dk')}${mark(b, 'right:var(--m);bottom:var(--m)')}` },

  /* ---------- big numbers ---------- */
  { id: 'v-num-outline', name: 'Outline number', cat: 'Minimal', look: lk('#0b0b0b', '#ffffff', '#ff5a1f'), art: DK,
    fields: { num: '250', head: 'brands trust\nour process', a: 'Since 2016', b: 'Across 18 countries', c: 'north.studio' },
    html: (f, im, b) => `<p class="mo-dw v-onum" data-t="${esc(f.num)}">${esc(f.num)}</p>${big(f.head, 'left:var(--m);top:56%', 'v-h1')}${rule('top:78%')}${p(f.a, 'left:var(--m);top:calc(78% + var(--u)*1.4)')}${p(f.b, 'left:38%;top:calc(78% + var(--u)*1.4)')}${p(f.c, 'right:var(--m);top:calc(78% + var(--u)*1.4);text-align:right')}${sym10('sparkle', '', 'right:var(--m);top:56%;width:calc(var(--u)*9);color:var(--accent)')}${mark(b, 'left:var(--m);bottom:var(--m)')}` },
  { id: 'v-num-photo', name: 'Photo inside a number', cat: 'Bold photo', look: lk('#f2f1ec', '#0b0b0b', '#ff5a1f'), art: DK,
    fields: { num: '10', head: 'years of\nmaking things', a: 'Anniversary\nedition', b: '2016 — 2026' },
    html: (f, im, b) => `<p class="mo-dw v-clipnum" style="background-image:url(&quot;${esc(im)}&quot;)">${esc(f.num)}</p>${big(f.head, 'left:var(--m);bottom:calc(var(--m) + var(--u)*7)', 'v-h1')}${p(f.a, 'left:var(--m);top:var(--m)')}${p(f.b, 'right:var(--m);top:var(--m);text-align:right')}${mark(b, 'right:var(--m);bottom:var(--m)')}${sym10('star8', '', 'right:var(--m);bottom:calc(var(--m) + var(--u)*7);width:calc(var(--u)*11);color:var(--accent)')}` },
  { id: 'v-num-stack', name: 'Number stack', cat: 'Data & stats', look: lk('#c6f432', '#0b0b0b', '#0b0b0b'), art: LT,
    fields: { a: '1.2M', al: 'Views this quarter', b: '84k', bl: 'Saves', c: '9.6k', cl: 'New followers', foot: 'Campaign recap · Q2' },
    html: (f, im, b) => `${p(f.foot, 'left:var(--m);top:var(--m)')}${mark(b, 'right:var(--m);top:var(--m)')}${big(f.a, 'left:var(--m);top:calc(var(--m) + var(--u)*6)', 'v-ns1')}${p(f.al, 'left:calc(var(--m) + var(--u)*.6);top:calc(var(--m) + var(--u)*31)')}${rule('top:calc(var(--m) + var(--u)*36);right:44%')}${big(f.b, 'left:var(--m);top:calc(var(--m) + var(--u)*38)', 'v-ns2')}${p(f.bl, 'left:calc(var(--m) + var(--u)*.6);top:calc(var(--m) + var(--u)*55)')}${rule('top:calc(var(--m) + var(--u)*60);right:44%')}${big(f.c, 'left:var(--m);top:calc(var(--m) + var(--u)*62)', 'v-ns3')}${p(f.cl, 'left:calc(var(--m) + var(--u)*.6);top:calc(var(--m) + var(--u)*74)')}${box(im, 'right:var(--m);bottom:var(--m);width:38%;aspect-ratio:3/4', '', 'grey')}` },
  { id: 'v-num-ring', name: 'Percent ring', cat: 'Data & stats', look: lk('#1f3fe6', '#ffffff', '#c6f432'), art: DK,
    fields: { pct: '73', head: 'of buyers check\nInstagram first', src: 'Source: our client survey, 2026, 1 200 people', foot: 'Show up where they look.' },
    html: (f, im, b) => `${ring(pnum(f.pct), 'left:50%;top:36%;width:min(74%,calc(var(--u)*60))', 'v-c thick')}${big(f.pct + '%', 'left:0;right:0;top:36%;translate:0 -50%;text-align:center', 'v-rn2')}${big(f.head, 'left:var(--m);right:var(--m);top:72%;text-align:center', 'v-h3')}${p(f.foot, 'left:0;right:0;top:calc(72% + var(--u)*11);text-align:center')}${p(f.src, 'left:var(--m);bottom:var(--m)', 'v-xs')}${mark(b, 'right:var(--m);bottom:var(--m)', 'sm')}` },

  /* ---------- team ---------- */
  { id: 'v-team-grid', name: 'Team grid', cat: 'Professional', slots: ['Person 1', 'Person 2', 'Person 3', 'Person 4', 'Person 5', 'Person 6'], look: lk('#0b0b0b', '#ffffff', '#ff5a1f'), art: DK,
    fields: { head: 'Six people,\none studio', names: 'Anna · Strategy\nOndra · Design\nMira · Motion\nLeon · Web\nSara · Copy\nTom · Producer' },
    html: (f, im, b, c, ims = []) => `${big(f.head, 'left:var(--m);top:var(--m)', 'v-h1')}${mark(b, 'right:var(--m);top:var(--m)')}<div class="v-team">${list(f.names).slice(0, 6).map((n, i) => { const [a, r] = n.split(/\s*·\s*/); return `<div><div class="v-ph">${img(ims[i] || im, 'grey')}</div><b>${esc(a)}</b><span>${esc(r || '')}</span></div>`; }).join('')}</div>` },
  { id: 'v-team-faces', name: 'Faces in a row', cat: 'Professional', slots: ['Person 1', 'Person 2', 'Person 3', 'Person 4'], look: lk('#f2f1ec', '#0b0b0b', '#1f3fe6'), art: LT,
    fields: { head: 'Meet\nthe team', sub: 'The people who will answer your email, plan your posts and ship them on time.', count: '+3', foot: 'north.studio/team' },
    html: (f, im, b, c, ims = []) => `${big(f.head, 'left:var(--m);top:var(--m)', 'v-h0')}<div class="v-faces">${R(4, (i) => `<div class="v-ph">${img(ims[i] || im, 'grey')}</div>`)}<b>${esc(f.count)}</b></div>${p(f.sub, 'left:var(--m);width:58%;bottom:calc(var(--m) + var(--u)*6)', 'v-s lg')}${p(f.foot, 'left:var(--m);bottom:var(--m)')}${sym10('squares', '', 'right:var(--m);bottom:var(--m);width:calc(var(--u)*12);color:var(--accent)')}` },
  { id: 'v-team-hire', name: 'We are hiring', cat: 'Professional', look: lk('#ff5a1f', '#0b0b0b', '#ffffff'), art: DK,
    fields: { head: 'We are\nhiring', roles: 'Senior designer\nMotion designer\nCopywriter\nProject manager', note: 'Prague or remote · full time', cta: 'jobs@north.studio' },
    html: (f, im, b) => `${big(f.head, 'left:var(--m);top:var(--m)', 'v-h00')}${box(im, 'right:var(--m);top:var(--m);width:32%;aspect-ratio:3/4', 'v-hire-ph', 'grey')}<div class="v-roles">${list(f.roles).slice(0, 5).map((r) => `<div><b>${esc(r)}</b><span>↗</span></div>`).join('')}</div>${p(f.note, 'left:var(--m);bottom:var(--m)')}${p(f.cta, 'right:var(--m);bottom:var(--m);text-align:right;font-weight:600')}` },

  /* ---------- spec sheets ---------- */
  { id: 'v-spec-callout', name: 'Product callouts', cat: 'Professional', look: lk('#e9e7e2', '#0b0b0b', '#ff5a1f'), art: OB,
    fields: { name: 'Model 02', a: 'Recycled steel body', b: '40 h battery', c: 'Soft fabric grille', d: 'USB-C, 15 min charge', price: '€ 249' },
    html: (f, im, b) => `${big(f.name, 'left:var(--m);top:var(--m)', 'v-h0')}${p(f.price, 'right:var(--m);top:var(--m);text-align:right', 'v-s lg')}${box(im, 'left:26%;right:26%;top:24%;bottom:22%', 'v-r')}${[['a', 'left:var(--m);top:30%', '6%', '24%'], ['b', 'right:var(--m);top:40%;text-align:right', '74%', '76%'], ['c', 'left:var(--m);top:62%', '6%', '24%'], ['d', 'right:var(--m);top:70%;text-align:right', '74%', '76%']].map(([k, st]) => `<div class="v-callout" style="${st}"><i></i>${p(f[k], 'position:relative')}</div>`).join('')}${mark(b, 'left:var(--m);bottom:var(--m)')}${sym10('sparkle', '', 'right:var(--m);bottom:var(--m);width:calc(var(--u)*7);color:var(--accent)')}` },
  { id: 'v-spec-table', name: 'Spec table', cat: 'Professional', look: lk('#0b0b0b', '#ffffff', '#c6f432'), art: DK,
    fields: { model: 'X1', name: 'Trail runner', rows: 'Weight — 238 g\nDrop — 6 mm\nStack — 32 mm\nUpper — recycled mesh\nOutsole — grip rubber\nFor — 5 to 50 km', foot: 'Drop 04 · online Friday' },
    html: (f, im, b) => `${big(f.model, '', 'v-model')}${p(f.name, 'left:var(--m);top:calc(var(--m) + var(--u)*30)', 'v-s lg')}${box(im, 'right:var(--m);top:var(--m);width:40%;aspect-ratio:1', 'v-r', 'grey')}<div class="v-table">${list(f.rows).slice(0, 7).map((r) => { const [k, v] = r.split(/\s+—\s+/); return `<div><span>${esc(k)}</span><b>${esc(v ?? '')}</b></div>`; }).join('')}</div>${p(f.foot, 'left:var(--m);bottom:var(--m);color:var(--accent)')}${mark(b, 'right:var(--m);bottom:var(--m)', 'sm')}` },

  /* ---------- launch dates ---------- */
  { id: 'v-launch-giant', name: 'Giant launch date', cat: 'Bold photo', look: lk('#0b0b0b', '#ffffff', '#ff5a1f'), art: DK,
    fields: { label: 'Coming', date: '02.03', sub: 'The new collection, online at 10:00', foot: 'north.shop' },
    html: (f, im, b) => `${box(im, 'inset:0', '', 'grey')}<div class="v-shade b"></div>${p(f.label, 'left:var(--m);top:var(--m)', 'v-s lg')}${mark(b, 'right:var(--m);top:var(--m)')}${big(f.date, '', 'v-ldate')}${p(f.sub, 'left:var(--m);bottom:var(--m);width:52%')}${p(f.foot, 'right:var(--m);bottom:var(--m);text-align:right')}` },
  { id: 'v-launch-line', name: 'Launch timeline', cat: 'Professional', look: lk('#f2f1ec', '#0b0b0b', '#1f3fe6'), art: LT,
    fields: { head: 'The road\nto launch', steps: 'Teaser\nWaitlist\nPreview\nLaunch', dates: '01.02\n15.02\n24.02\n02.03', now: '3', foot: 'Join the waitlist · north.app' },
    html: (f, im, b) => { const s = list(f.steps).slice(0, 5), d = list(f.dates), now = Math.max(1, +f.now || 1); return `${big(f.head, 'left:var(--m);top:var(--m)', 'v-h0')}${box(im, 'right:var(--m);top:var(--m);width:30%;aspect-ratio:1', 'v-round', 'grey')}<div class="v-tl"><i class="v-tl-l" style="--p:${((now - 1) / Math.max(1, s.length - 1)) * 100}%"></i>${s.map((x, i) => `<div class="${i < now ? 'done' : ''}${i === now - 1 ? ' now' : ''}" style="left:${(i / Math.max(1, s.length - 1)) * 100}%"><i></i><b>${esc(x)}</b><span>${esc(d[i] || '')}</span></div>`).join('')}</div>${p(f.foot, 'left:var(--m);bottom:var(--m)')}${mark(b, 'right:var(--m);bottom:var(--m)')}`; } },
  { id: 'v-launch-out', name: 'Out now badge', cat: 'Bold photo', look: lk('#c6f432', '#0b0b0b', '#0b0b0b'), art: DK,
    fields: { badge: 'Out now · out now · out now · ', head: 'Volume 4', sub: 'Twelve tracks, recorded live in one night', foot: 'Stream everywhere' },
    html: (f, im, b) => `${box(im, 'left:var(--m);right:var(--m);top:var(--m);bottom:28%', '', 'grey')}<svg class="v-badge" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="50" class="bgc"/><defs><path id="vbo" d="M50 50m-36 0a36 36 0 1 1 72 0a36 36 0 1 1-72 0"/></defs><text><textPath href="#vbo" textLength="224">${esc(String(f.badge).toUpperCase())}</textPath></text>${SYM10.sparkle.replace('<path', '<path transform="translate(32 32) scale(.36)"')}</svg>${big(f.head, 'left:var(--m);bottom:calc(var(--m) + var(--u)*7)', 'v-h0')}${p(f.sub, 'left:var(--m);bottom:var(--m)')}${p(f.foot, 'right:var(--m);bottom:var(--m);text-align:right;font-weight:600')}${mark(b, 'right:var(--m);bottom:calc(var(--m) + var(--u)*8)')}` },

  /* ---------- carousel ---------- */
  { id: 'v-car-number', name: 'Carousel: five ways', cat: 'Carousel', look: lk('#1f3fe6', '#ffffff', '#c6f432'), art: DK,
    fields: { num: '5', head: 'ways to make\nyour feed\nfeel like a brand', swipe: 'Swipe', count: '1/7' },
    html: (f, im, b) => `${big(f.num, '', 'v-cnum')}${big(f.head, 'left:var(--m);bottom:calc(var(--m) + var(--u)*9)', 'v-h1')}${p(f.swipe + ' →', 'right:var(--m);top:var(--m);text-align:right')}${mark(b, 'left:var(--m);top:var(--m)')}<div class="v-pdots" style="left:var(--m);bottom:var(--m)">${R(7, (i) => `<i${i === 0 ? ' class="on"' : ''}></i>`)}</div>${p(f.count, 'right:var(--m);bottom:var(--m)', 'v-s mono')}` },
  { id: 'v-car-photo', name: 'Carousel: photo cover', cat: 'Carousel', look: lk('#ffffff', '#0b0b0b', '#ff5a1f'), art: LT,
    fields: { tag: 'Guide', head: 'How we plan\na month of posts', count: '01 / 08', swipe: 'Swipe →' },
    html: (f, im, b) => `${box(im, 'left:0;right:0;top:0;height:58%')}${pill(f.tag, 'left:var(--m);top:var(--m)', 'wh')}${p(f.count, 'right:var(--m);top:var(--m);color:#fff', 'v-s mono')}${big(f.head, 'left:var(--m);right:var(--m);top:calc(58% + var(--u)*4)', 'v-h1')}${p(f.swipe, 'right:var(--m);bottom:var(--m);text-align:right;font-weight:600')}${mark(b, 'left:var(--m);bottom:var(--m)')}<i class="v-bar" style="bottom:calc(var(--m) + var(--u)*5);--p:12%"></i>` },
  { id: 'v-car-inside', name: 'Carousel: inside slide', cat: 'Carousel', look: lk('#f2f1ec', '#0b0b0b', '#ff5a1f'), art: LT,
    fields: { no: '02', head: 'Pick one\nfont family', body: 'Two at most. A big one for headlines and a calm one for everything else. Use them on every post, every time.', tip: 'Tip: Inter Tight does both.', count: '2/7' },
    html: (f, im, b) => `${big(f.no, 'left:var(--m);top:var(--m);color:var(--accent)', 'v-h00')}${p(f.count, 'right:var(--m);top:var(--m)', 'v-s mono')}${big(f.head, 'left:var(--m);top:34%', 'v-h1')}${p(f.body, 'left:var(--m);width:62%;top:calc(34% + var(--u)*20)', 'v-s lg')}<div class="v-tip-box">${sym10('sparkle', '', 'position:relative;width:calc(var(--u)*4);color:var(--accent)')}${p(f.tip, 'position:relative')}</div>${mark(b, 'right:var(--m);bottom:var(--m)', 'sm')}<i class="v-bar" style="bottom:var(--m);right:calc(var(--m) + var(--u)*16);--p:28%"></i>` },

  /* ---------- route stats ---------- */
  { id: 'v-route-map', name: 'Route on a grid', cat: 'Sport', look: lk('#0b0b0b', '#ffffff', '#c6f432', 'tight', 'mono'), art: DK,
    fields: { head: 'Sunday\nlong run', km: '21.1 km', time: '1:48:32', pace: '5:08 /km', elev: '+214 m', foot: 'Run club · 08:00 · Letná' },
    html: (f, im, b) => `<i class="v-gridbg"></i>${big(f.head, 'left:var(--m);top:var(--m)', 'v-h1')}${mark(b, 'right:var(--m);top:var(--m)')}<svg class="v-route" viewBox="0 0 100 70" aria-hidden="true"><path d="M8 58C14 40 22 46 28 34S40 12 52 18 60 40 70 36 84 12 92 14" fill="none" stroke="var(--accent)" stroke-width="1.6" stroke-linecap="round"/><circle cx="8" cy="58" r="2.2" fill="currentColor"/><circle cx="92" cy="14" r="3" fill="var(--accent)"/><circle cx="92" cy="14" r="6" fill="none" stroke="var(--accent)" stroke-width=".6"/></svg><div class="v-rstats">${[['Distance', f.km], ['Time', f.time], ['Pace', f.pace], ['Elevation', f.elev]].map(([k, v]) => `<div><span>${k}</span><b>${esc(v)}</b></div>`).join('')}</div>${p(f.foot, 'left:var(--m);bottom:var(--m)', 'v-xs')}` },
  { id: 'v-route-elev', name: 'Elevation profile', cat: 'Sport', look: lk('#ff5a1f', '#0b0b0b', '#0b0b0b'), art: DK,
    fields: { head: 'Up the\nhill, twice', km: '12 km', climb: '+480 m', top: 'Top 612 m', foot: 'Hill repeats · Thursday 18:30' },
    html: (f, im, b) => `${big(f.head, 'left:var(--m);top:var(--m)', 'v-h0')}${box(im, 'right:var(--m);top:var(--m);width:30%;aspect-ratio:3/4', '', 'grey')}${lineChart([2, 3, 6, 10, 14, 11, 7, 9, 13, 15, 10, 5, 3], { cls: 'v-elev', style: 'left:var(--m);right:var(--m);top:46%;height:28%', labels: ['0', '3', '6', '9', '12 km'], last: f.top })}<div class="v-cols3" style="bottom:calc(var(--m) + var(--u)*5)">${[['Distance', f.km], ['Climb', f.climb], ['Highest', f.top.replace(/^Top\s*/, '')]].map(([k, v]) => `<div><p class="v-s dim">${k}</p><p class="mo-dw v-cn">${esc(v)}</p></div>`).join('')}</div>${p(f.foot, 'left:var(--m);bottom:var(--m)', 'v-xs')}` },
  { id: 'v-route-splits', name: 'Split times', cat: 'Sport', look: lk('#f2f1ec', '#0b0b0b', '#1f3fe6', 'tight', 'mono'), art: LT,
    fields: { head: '10 km\nsplits', splits: '5:12\n5:05\n5:01\n4:58\n5:03\n4:55\n4:51\n4:49\n4:44\n4:31', total: '49:20', note: 'Negative split. Last km the fastest.' },
    html: (f, im, b) => { const s = list(f.splits).slice(0, 10), sec = s.map((x) => { const [m, ss] = x.split(':').map(Number); return (m || 0) * 60 + (ss || 0); }), mx = Math.max(...sec), mn = Math.min(...sec); return `${big(f.head, 'left:var(--m);top:var(--m)', 'v-h0')}${big(f.total, 'right:var(--m);top:var(--m);text-align:right;color:var(--accent)', 'v-h1')}<div class="v-splits">${s.map((x, i) => `<div><span>${i + 1}</span><i style="--w:${40 + ((mx - sec[i]) / Math.max(1, mx - mn)) * 60}%"${sec[i] === mn ? ' class="on"' : ''}></i><b>${esc(x)}</b></div>`).join('')}</div>${p(f.note, 'left:var(--m);bottom:var(--m)')}${mark(b, 'right:var(--m);bottom:var(--m)', 'sm')}`; } },

  /* ---------- vertical headlines ---------- */
  { id: 'v-vert-photo', name: 'Vertical word and photo', cat: 'Bold photo', look: lk('#ffffff', '#0b0b0b', '#ff5a1f'), art: LT,
    fields: { word: 'MOVEMENT', a: 'Spring\ncollection', b: 'Available\n12.03', foot: 'north.shop' },
    html: (f, im, b) => `<p class="mo-dw v-vword">${esc(f.word)}</p>${box(im, 'left:30%;right:var(--m);top:var(--m);bottom:calc(var(--m) + var(--u)*10)')}${p(f.a, 'left:30%;bottom:var(--m)')}${p(f.b, 'left:60%;bottom:var(--m)')}${p(f.foot, 'right:var(--m);bottom:var(--m);text-align:right')}${sym10('arrow', '', 'right:calc(var(--m) + var(--u)*3);top:calc(var(--m) + var(--u)*3);width:calc(var(--u)*8);color:#fff')}` },
  { id: 'v-vert-two', name: 'Two vertical words', cat: 'Bold photo', look: lk('#0b0b0b', '#ffffff', '#c6f432'), art: DK,
    fields: { a: 'NIGHT', b: 'SHIFT', mid: 'A short film about people who work while the city sleeps.', foot: 'Premiere 12.12 · Kino North' },
    html: (f, im, b) => `${box(im, 'left:22%;right:22%;top:0;bottom:0', '', 'grey')}<p class="mo-dw v-vw l">${esc(f.a)}</p><p class="mo-dw v-vw r">${esc(f.b)}</p>${p(f.mid, 'left:calc(22% + var(--u)*3);right:calc(22% + var(--u)*3);bottom:calc(var(--m) + var(--u)*6);color:#fff')}${p(f.foot, 'left:calc(22% + var(--u)*3);bottom:var(--m);color:var(--accent)', 'v-xs')}${mark(b, 'left:calc(22% + var(--u)*3);top:var(--m);color:#fff', 'sm')}` },

  /* ---------- giant letters ---------- */
  { id: 'v-giant-initial', name: 'Photo in a letter', cat: 'Bold photo', look: lk('#f2f1ec', '#0b0b0b', '#1f3fe6'), art: DK,
    fields: { letter: 'N', head: 'North\nfestival', date: '18–20 June', place: 'Riverside, Prague', lineup: 'Music · talks · food · film' },
    html: (f, im, b) => `<p class="mo-dw v-clipL" style="background-image:url(&quot;${esc(im)}&quot;)">${esc(f.letter)}</p>${big(f.head, 'right:var(--m);top:var(--m);text-align:right', 'v-h0')}${rule('top:78%')}${p(f.date, 'left:var(--m);top:calc(78% + var(--u)*1.4);font-weight:600')}${p(f.place, 'left:38%;top:calc(78% + var(--u)*1.4)')}${p(f.lineup, 'left:var(--m);bottom:var(--m)')}${sym10('orbit', '', 'right:var(--m);bottom:var(--m);width:calc(var(--u)*12);color:var(--accent)')}` },
  { id: 'v-giant-bleed', name: 'Word off the edge', cat: 'Bold photo', look: lk('#ff3d7f', '#0b0b0b', '#ffffff'), art: DK,
    fields: { word: 'BLOOM', a: 'Flower market', b: 'Every Saturday\n8:00 – 14:00', c: 'Náplavka, Prague' },
    html: (f, im, b) => `${box(im, 'left:var(--m);right:var(--m);top:var(--m);bottom:34%', '', 'grey')}${p(f.a, 'left:calc(var(--m) + var(--u)*2.4);top:calc(var(--m) + var(--u)*2.4);color:#fff', 'v-s lg')}${p(f.b, 'left:var(--m);top:calc(66% + var(--u)*2)')}${p(f.c, 'left:45%;top:calc(66% + var(--u)*2)')}${mark(b, 'right:var(--m);top:calc(66% + var(--u)*2)')}<p class="mo-dw v-bleed">${esc(f.word)}</p>` },

  /* ---------- letter and shape windows ---------- */
  { id: 'v-win-arches', name: 'Three arches', cat: 'Shapes', look: lk('#efe7da', '#1d1a16', '#b5653f'), art: LT,
    fields: { head: 'Three rooms,\none house', a: 'Garden', b: 'Studio', c: 'Kitchen', foot: 'Open house · Saturday 10–16' },
    html: (f, im, b) => `${big(f.head, 'left:var(--m);top:var(--m)', 'v-h1')}${mark(b, 'right:var(--m);top:var(--m)')}<div class="v-arches">${['a', 'b', 'c'].map((k, i) => `<div><div class="v-ph" style="--x:${i * 50}%">${img(im)}</div><b>${esc(f[k])}</b></div>`).join('')}</div>${p(f.foot, 'left:var(--m);bottom:var(--m)')}` },
  { id: 'v-win-circles', name: 'Three circles', cat: 'Shapes', look: lk('#0b0b0b', '#ffffff', '#ff5a1f'), art: DK,
    fields: { head: 'See, try,\nkeep', sub: 'A three-day pop-up for the new collection', date: '12–14.03', foot: 'Dlouhá 4, Prague' },
    html: (f, im, b) => `<div class="v-circs">${R(3, (i) => `<div class="v-ph" style="--x:${i * 50}%">${img(im, 'grey')}</div>`)}</div>${big(f.head, 'left:var(--m);top:var(--m)', 'v-h0')}${p(f.sub, 'left:var(--m);bottom:calc(var(--m) + var(--u)*5);width:50%')}${big(f.date, 'right:var(--m);bottom:calc(var(--m) + var(--u)*5);text-align:right;color:var(--accent)', 'v-h2')}${p(f.foot, 'left:var(--m);bottom:var(--m)', 'v-xs')}${mark(b, 'right:var(--m);top:var(--m)')}` },
  { id: 'v-win-stripes', name: 'Photo in stripes', cat: 'Shapes', look: lk('#ffffff', '#0b0b0b', '#1f3fe6'), art: LT,
    fields: { head: 'Slow\nfashion', sub: 'Made in small runs, sold in one shop.', foot: 'Spring 2026' },
    html: (f, im, b) => `<div class="v-stripes">${R(7, (i) => `<div class="v-ph" style="--i:${i}">${img(im)}</div>`)}</div>${big(f.head, 'left:var(--m);bottom:calc(var(--m) + var(--u)*6)', 'v-h00')}${p(f.sub, 'right:var(--m);bottom:calc(var(--m) + var(--u)*6);width:34%;text-align:right')}${p(f.foot, 'left:var(--m);bottom:var(--m)', 'v-xs')}${mark(b, 'right:var(--m);bottom:var(--m)', 'sm')}` },
  { id: 'v-win-symbol', name: 'Photo in a symbol', cat: 'Shapes', look: lk('#c6f432', '#0b0b0b', '#0b0b0b'), art: DK,
    fields: { head: 'Good things\ngrow slowly', a: 'Plant shop', b: 'Open daily 9–19', c: 'Vinohrady, Prague' },
    html: (f, im, b) => `<div class="v-msk v-c" style="top:40%;width:min(72%,calc(var(--u)*72));--mk:url(&quot;data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='${starPath(12, 50, 38)}'/></svg>`)}&quot;)">${img(im, 'grey')}</div>${big(f.head, 'left:var(--m);right:var(--m);bottom:calc(var(--m) + var(--u)*6);text-align:center', 'v-h1')}${p(f.a, 'left:var(--m);top:var(--m)')}${p(f.b, 'right:var(--m);top:var(--m);text-align:right')}${p(f.c, 'left:0;right:0;bottom:var(--m);text-align:center', 'v-xs')}` },
  { id: 'v-win-word', name: 'Photo inside a word', cat: 'Shapes', look: lk('#0b0b0b', '#ffffff', '#ff5a1f'), art: DK,
    fields: { word: 'WILD', head: 'Outdoor\ncollection', a: 'Waterproof shell\nRecycled down\nLifetime repairs', foot: 'From 189 €' },
    html: (f, im, b) => `<p class="mo-dw v-clipW" style="background-image:url(&quot;${esc(im)}&quot;)">${esc(f.word)}</p>${big(f.head, 'left:var(--m);top:var(--m)', 'v-h1')}${mark(b, 'right:var(--m);top:var(--m)')}${p(f.a, 'left:var(--m);bottom:var(--m)')}${big(f.foot, 'right:var(--m);bottom:var(--m);text-align:right;color:var(--accent)', 'v-h3')}` },

  /* ---------- dot boards ---------- */
  { id: 'v-dot-photos', name: 'Dot board with photos', cat: 'Editorial', look: lk('#ffffff', '#0b0b0b', '#ff3d7f'), art: LT,
    fields: { head: 'Moodboard\nfor spring', tags: 'Soft light\nRaw textures\nOne colour\nBig type', date: 'May 27' },
    html: (f, im, b) => `<i class="v-dotsbg"></i>${big(f.head, 'left:var(--m);bottom:var(--m)', 'v-h0')}${pill(f.date, 'right:var(--m);top:var(--m)', 'dk')}${[['8%', '10%', '26%'], ['40%', '22%', '22%'], ['68%', '8%', '24%'], ['20%', '44%', '20%'], ['58%', '42%', '30%']].map(([x, y, w], i) => `<div class="v-ph v-dph" style="left:${x};top:${y};width:${w};aspect-ratio:${i % 2 ? '3/4' : '1'}">${img(im, i % 2 ? 'grey' : '')}</div>`).join('')}${list(f.tags).slice(0, 4).map((t, i) => pill(t, `left:${[12, 44, 70, 24][i]}%;top:${[36, 46, 36, 68][i]}%`, i === 2 ? 'ac' : 'wh')).join('')}${mark(b, 'right:var(--m);bottom:var(--m)')}` },
  { id: 'v-dot-chart', name: 'Hundred dots', cat: 'Data & stats', look: lk('#0b0b0b', '#ffffff', '#ff5a1f'), art: DK,
    fields: { num: '73', head: 'out of 100 people\nsave a post\nthey want to buy from', src: 'Study of 1 200 shoppers, 2026', foot: 'Make it worth saving.' },
    html: (f, im, b) => `${dotsGrid(100, Math.min(100, pnum(f.num)), 'left:var(--m);top:var(--m);width:min(56%,calc(var(--u)*56))')}${big(f.num, 'right:var(--m);top:var(--m);text-align:right;color:var(--accent)', 'v-h00')}${big(f.head, 'left:var(--m);bottom:calc(var(--m) + var(--u)*9)', 'v-h2')}${p(f.foot, 'left:var(--m);bottom:calc(var(--m) + var(--u)*4)', 'v-s lg')}${p(f.src, 'left:var(--m);bottom:var(--m)', 'v-xs')}${mark(b, 'right:var(--m);bottom:var(--m)', 'sm')}` },

  /* ---------- quotes ---------- */
  { id: 'v-quote-mark', name: 'Big quote mark', cat: 'Editorial', look: lk('#ff5a1f', '#0b0b0b', '#ffffff'), art: DK,
    fields: { quote: 'They turned our launch into something people talked about for weeks.', name: 'Eva Holm', role: 'Founder, Lumen Coffee', rating: '★★★★★' },
    html: (f, im, b) => `${sym10('quote', '', 'left:var(--m);top:var(--m);width:calc(var(--u)*22)')}${big(f.quote, 'left:var(--m);right:var(--m);top:calc(var(--m) + var(--u)*26)', 'v-h2')}${box(im, 'left:var(--m);bottom:var(--m);width:calc(var(--u)*14);aspect-ratio:1', 'v-round', 'grey')}${p(f.name, 'left:calc(var(--m) + var(--u)*17);bottom:calc(var(--m) + var(--u)*7);font-weight:600')}${p(f.role, 'left:calc(var(--m) + var(--u)*17);bottom:calc(var(--m) + var(--u)*4)')}${p(f.rating, 'left:calc(var(--m) + var(--u)*17);bottom:var(--m);letter-spacing:.1em')}${mark(b, 'right:var(--m);bottom:var(--m)')}` },
  { id: 'v-quote-no', name: 'Numbered note', cat: 'Editorial', look: lk('#f2f1ec', '#0b0b0b', '#ff3d7f'), art: LT,
    fields: { no: 'No. 07', quote: 'Post less.\nSay more.', body: 'One clear idea per post beats five rushed ones. Your audience remembers the posts that had a point.', foot: 'Notes from the studio' },
    html: (f, im, b) => `${p(f.no, 'left:var(--m);top:var(--m)', 'v-s mono lg')}${mark(b, 'right:var(--m);top:var(--m)')}${big(f.quote, 'left:var(--m);top:22%', 'v-h00')}${rule('top:60%')}${p(f.body, 'left:var(--m);width:54%;top:calc(60% + var(--u)*2)', 'v-s lg')}${box(im, 'right:var(--m);top:calc(60% + var(--u)*2);width:30%;aspect-ratio:3/4', '', 'grey')}${p(f.foot, 'left:var(--m);bottom:var(--m)', 'v-xs')}${sym10('sparkle', '', 'right:var(--m);top:22%;width:calc(var(--u)*9);color:var(--accent)')}` },

  /* ---------- info strips ---------- */
  { id: 'v-strip-top', name: 'Info strip on a photo', cat: 'Editorial', look: lk('#0b0b0b', '#ffffff', '#c6f432'), art: DK,
    fields: { a: 'North\nStudio', b: 'Lookbook\n2026', c: 'Photo\nM. Klein', d: 'Styling\nL. Novak', e: 'Prague\nCZ', head: 'Quiet\nconfidence' },
    html: (f, im, b) => `${box(im, 'inset:0', '', 'grey')}<div class="v-shade"></div><div class="v-strip">${['a', 'b', 'c', 'd', 'e'].map((k) => `<div>${p(f[k], 'position:relative', 'v-xs')}</div>`).join('')}</div>${big(f.head, 'left:var(--m);bottom:var(--m)', 'v-h00')}${sym10('star12', '', 'right:var(--m);bottom:var(--m);width:calc(var(--u)*12);color:var(--accent)')}` },
  { id: 'v-strip-ticker', name: 'Ticker bands', cat: 'Editorial', look: lk('#ff5a1f', '#0b0b0b', '#0b0b0b'), art: DK,
    fields: { a: 'Sale · up to 40% · ', b: 'Last weekend · ', head: 'Everything\nmust go', foot: 'Only in store · Dlouhá 4' },
    html: (f, im, b) => `${box(im, 'left:var(--m);right:var(--m);top:var(--m);bottom:40%', '', 'grey')}<div class="v-tick big" style="top:46%;rotate:-4deg"><span>${esc(String(f.a).repeat(4))}</span></div><div class="v-tick big inv" style="top:56%;rotate:3deg"><span>${esc(String(f.b).repeat(5))}</span></div>${big(f.head, 'left:var(--m);bottom:calc(var(--m) + var(--u)*4)', 'v-h1')}${p(f.foot, 'left:var(--m);bottom:var(--m)', 'v-xs')}${mark(b, 'right:var(--m);bottom:var(--m)')}` },

  /* ---------- big number and photo ---------- */
  { id: 'v-bnp-half', name: 'Number over a photo', cat: 'Data & stats', look: lk('#ff5a1f', '#0b0b0b', '#ffffff'), art: LT,
    fields: { num: '+27%', head: 'more sales after\nwe redid the posts', body: 'Brands with a clear plan grow faster than ones that post at random.', tag: 'Performance' },
    html: (f, im, b) => `${big(f.num, 'left:var(--m);top:var(--m)', 'v-bnum')}${p(f.tag, 'right:var(--m);top:var(--m);text-align:right')}${big(f.head, 'left:var(--m);top:calc(var(--m) + var(--u)*25)', 'v-h3')}${p(f.body, 'right:var(--m);width:40%;top:calc(var(--m) + var(--u)*26)')}${box(im, 'left:0;right:0;bottom:0;height:46%')}${mark(b, 'left:var(--m);bottom:var(--m);color:#fff')}` },
  { id: 'v-bnp-chart', name: 'Number, photo and line', cat: 'Data & stats', look: lk('#ffffff', '#0b0b0b', '#1f3fe6'), art: LT,
    fields: { num: '3.4x', head: 'return on\nad spend', a: 'Before', av: '1.1x', b: 'After', bv: '3.4x', months: 'Jan\nFeb\nMar\nApr\nMay\nJun' },
    html: (f, im, b) => `${big(f.num, 'left:var(--m);top:var(--m);color:var(--accent)', 'v-bnum')}${big(f.head, 'left:var(--m);top:calc(var(--m) + var(--u)*24)', 'v-h3')}${box(im, 'right:var(--m);top:var(--m);width:34%;aspect-ratio:3/4', 'v-r')}${lineChart([1.1, 1.3, 1.6, 2.2, 2.8, 3.4], { style: 'left:var(--m);right:var(--m);top:54%;height:26%', labels: list(f.months), last: f.num })}<div class="v-cols3" style="bottom:var(--m)"><div><p class="v-s dim">${esc(f.a)}</p><p class="mo-dw v-cn">${esc(f.av)}</p></div><div><p class="v-s dim">${esc(f.b)}</p><p class="mo-dw v-cn" style="color:var(--accent)">${esc(f.bv)}</p></div><div>${mark(b, 'position:relative')}</div></div>` },
  { id: 'v-bnp-overlap', name: 'Number across the edge', cat: 'Bold photo', look: lk('#0b0b0b', '#ffffff', '#c6f432'), art: DK,
    fields: { num: '48h', head: 'from brief\nto first drafts', a: 'Fast is not rushed.\nWe plan, then we move.', foot: 'north.studio' },
    html: (f, im, b) => `${box(im, 'left:30%;right:0;top:0;bottom:30%', '', 'grey')}${big(f.num, '', 'v-xnum')}${big(f.head, 'left:var(--m);bottom:calc(var(--m) + var(--u)*7)', 'v-h2')}${p(f.a, 'right:var(--m);bottom:calc(var(--m) + var(--u)*7);text-align:right')}${p(f.foot, 'left:var(--m);bottom:var(--m)', 'v-xs')}${mark(b, 'right:var(--m);bottom:var(--m)', 'sm')}${sym10('bolt', '', 'left:var(--m);top:var(--m);width:calc(var(--u)*8);color:var(--accent)')}` },

  /* ---------- gradients and maximal type ---------- */
  { id: 'v-grad-word', name: 'Gradient word', cat: 'Gradient', look: L('#120a2a', '#ffffff', '#ff6a3d', '#ff6a3d', '#6b3cff', 'tight', 'tight'), art: DK,
    fields: { word: 'Grow', head: 'Strategy, content and ads for brands that plan to stay.', a: 'Book a call', foot: 'north.studio' },
    html: (f, im, b) => `<i class="v-mesh"></i>${big(f.word, '', 'v-gword')}${big(f.head, 'left:var(--m);width:62%;top:58%', 'v-h4')}${pill(f.a + ' →', 'left:var(--m);bottom:var(--m)', 'wh')}${p(f.foot, 'right:var(--m);bottom:var(--m);text-align:right')}${mark(b, 'left:var(--m);top:var(--m)')}${sym10('sparkle', '', 'right:var(--m);top:var(--m);width:calc(var(--u)*9)')}` },
  { id: 'v-grad-stats', name: 'Gradient stats', cat: 'Gradient', look: L('#0b0b0b', '#ffffff', '#ff3d7f', '#ff3d7f', '#1f3fe6', 'tight', 'tight'), art: DK,
    fields: { head: 'Results\nthat stack up', a: '+212%', al: 'Reach', b: '+64%', bl: 'Clicks', c: '-31%', cl: 'Cost per lead', foot: 'Six months with North' },
    html: (f, im, b) => `<i class="v-mesh two"></i>${big(f.head, 'left:var(--m);top:var(--m)', 'v-h0')}<div class="v-glass">${['a', 'b', 'c'].map((k) => `<div><p class="mo-dw v-cn">${esc(f[k])}</p><p class="v-s">${esc(f[k + 'l'])}</p></div>`).join('')}</div>${lineChart([3, 4, 3.6, 5, 6.2, 7.4, 9], { style: 'left:var(--m);right:var(--m);top:44%;height:22%', fill: true })}${p(f.foot, 'left:var(--m);bottom:var(--m)')}${mark(b, 'right:var(--m);bottom:var(--m)')}` },
  { id: 'v-grad-photo', name: 'Photo in a glow', cat: 'Gradient', look: L('#0b0b0b', '#ffffff', '#c6f432', '#ff6a3d', '#1f3fe6', 'tight', 'tight'), art: DK,
    fields: { head: 'Feel the\nfrequency', date: '21.06', place: 'Open air · Riverside', foot: 'Tickets from 29 €' },
    html: (f, im, b) => `<i class="v-mesh three"></i>${box(im, 'left:18%;right:18%;top:12%;bottom:30%', 'v-r v-blend', 'grey')}${big(f.head, 'left:var(--m);bottom:calc(var(--m) + var(--u)*6)', 'v-h0')}${big(f.date, 'right:var(--m);bottom:calc(var(--m) + var(--u)*6);text-align:right;color:var(--accent)', 'v-h1')}${p(f.place, 'left:var(--m);bottom:var(--m)')}${p(f.foot, 'right:var(--m);bottom:var(--m);text-align:right')}${mark(b, 'left:var(--m);top:var(--m)')}` },
  { id: 'v-max-type', name: 'Maximal type', cat: 'Minimal', look: lk('#ffffff', '#0b0b0b', '#ff5a1f'), art: LT,
    fields: { a: 'BIG', b: 'IDEAS', c: 'NEED', d: 'ROOM', foot: 'Studio manifesto, part 1' },
    html: (f, im, b) => `<div class="v-maxt"><b>${esc(f.a)}</b><b class="o">${esc(f.b)}</b><b>${esc(f.c)}</b><b class="ac">${esc(f.d)}</b></div>${box(im, 'right:var(--m);top:var(--m);width:24%;aspect-ratio:3/4', 'v-r', 'grey')}${p(f.foot, 'left:var(--m);bottom:var(--m)', 'v-xs')}${mark(b, 'right:var(--m);bottom:var(--m)', 'sm')}` },
  { id: 'v-max-price', name: 'Big price', cat: 'Professional', look: lk('#c6f432', '#0b0b0b', '#0b0b0b'), art: OB,
    fields: { label: 'Starter plan', price: '€490', per: '/month', list: '12 posts\n4 reels\nMonthly report\nOne call a week', cta: 'Start this week →' },
    html: (f, im, b) => `${p(f.label, 'left:var(--m);top:var(--m)', 'v-s lg')}${mark(b, 'right:var(--m);top:var(--m)')}${big(f.price, '', 'v-price')}${p(f.per, 'left:calc(var(--m) + var(--u)*1);top:calc(var(--m) + var(--u)*33)', 'v-s lg')}<div class="v-checks">${list(f.list).slice(0, 5).map((x) => `<div>${sym10('check', '', 'position:relative;width:calc(var(--u)*3.6)')}<span>${esc(x)}</span></div>`).join('')}</div>${box(im, 'right:var(--m);bottom:var(--m);width:34%;aspect-ratio:3/4', 'v-r', 'grey')}${pill(f.cta, 'left:var(--m);bottom:var(--m)', 'dk')}` },
];

export const more10Css = `
.bi-ad .v-s{position:absolute;z-index:5;margin:0;font-family:var(--ftv);font-size:calc(var(--u)*1.9);line-height:1.22;font-weight:500}
.bi-ad .v-s.lg{font-size:calc(var(--u)*2.5);line-height:1.2} .bi-ad .v-s.dim{opacity:.6} .bi-ad .v-s.mono{font-variant-numeric:tabular-nums;letter-spacing:.02em}
.bi-ad .v-xs{position:absolute;z-index:5;margin:0;font-family:var(--ftv);font-size:calc(var(--u)*1.45);line-height:1.25;font-weight:500}
.bi-ad .v-big{font-weight:500;letter-spacing:-.045em;line-height:.9;margin:0}
.bi-ad .v-h00{font-size:calc(var(--u)*15);line-height:.84} .bi-ad .v-h0{font-size:calc(var(--u)*11)} .bi-ad .v-h1{font-size:calc(var(--u)*8.6)} .bi-ad .v-h2{font-size:calc(var(--u)*6.8);line-height:.96} .bi-ad .v-h3{font-size:calc(var(--u)*5.6);line-height:.98} .bi-ad .v-h4{font-size:calc(var(--u)*4.6);line-height:1.02;letter-spacing:-.03em}
.bi-ad .v-rule{position:absolute;z-index:4;left:var(--m);right:var(--m);height:0;border-top:1px solid currentColor;opacity:.35}
.bi-ad .v-mark{position:absolute;z-index:6;font-family:var(--fdv);font-weight:700;font-size:calc(var(--u)*2.8);letter-spacing:-.02em} .bi-ad .v-mark .bi-logo{height:calc(var(--u)*4*var(--ls,1))} .bi-ad .v-mark.sm{font-size:calc(var(--u)*2.2)}
.bi-ad .v-ph{position:absolute;z-index:2;overflow:hidden;background:var(--g2)} .bi-ad .v-ph.v-r{border-radius:calc(var(--u)*2)} .bi-ad .v-ph.v-round{border-radius:50%}
.bi-ad .v-sym{position:absolute;z-index:5;height:auto;aspect-ratio:1;fill:currentColor;overflow:visible}
.bi-ad .v-c{left:50%;translate:-50% -50%}
.bi-ad .v-pill{position:absolute;z-index:6;margin:0;padding:calc(var(--u)*1) calc(var(--u)*2.4);border-radius:99px;font-family:var(--ftv);font-size:calc(var(--u)*1.9);font-weight:600;white-space:nowrap;background:var(--ink);color:var(--bg)}
.bi-ad .v-pill.ac{background:var(--accent);color:#0b0b0b} .bi-ad .v-pill.wh{background:#fff;color:#0b0b0b} .bi-ad .v-pill.dk{background:#0b0b0b;color:#fff}
.bi-ad .v-shade{position:absolute;inset:0;z-index:3;background:linear-gradient(180deg,rgba(0,0,0,.45),transparent 35%,transparent 55%,rgba(0,0,0,.7))} .bi-ad .v-shade.b{background:linear-gradient(180deg,rgba(0,0,0,.35),transparent 40%,rgba(0,0,0,.75))}
/* charts */
.bi-ad .v-chart{position:absolute;z-index:4}
.bi-ad .v-chart svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.bi-ad .v-cl{fill:none;stroke:var(--accent);stroke-width:2.2;vector-effect:non-scaling-stroke;stroke-linecap:round;stroke-linejoin:round}
.bi-ad .v-cg{stroke:currentColor;stroke-width:1;opacity:.12;vector-effect:non-scaling-stroke;stroke-dasharray:3 4}
.bi-ad .v-dot{position:absolute;width:calc(var(--u)*1.5);aspect-ratio:1;border-radius:50%;background:var(--bg);border:calc(var(--u)*.42) solid var(--accent);translate:-50% -50%;box-sizing:border-box}
.bi-ad .v-dot.last{width:calc(var(--u)*2.6);background:var(--accent);box-shadow:0 0 0 calc(var(--u)*1) color-mix(in srgb,var(--accent) 25%,transparent)}
.bi-ad .v-tip{position:absolute;translate:-100% calc(-100% - var(--u)*2.4);padding:calc(var(--u)*.6) calc(var(--u)*1.4);border-radius:99px;background:var(--accent);color:#0b0b0b;font-family:var(--ftv);font-size:calc(var(--u)*1.7);font-weight:600;white-space:nowrap}
.bi-ad .v-cx{position:absolute;left:0;right:0;top:calc(100% + var(--u)*1.2);display:flex;justify-content:space-between;font-family:var(--ftv);font-size:calc(var(--u)*1.4);opacity:.6}
.bi-ad .v-ring{position:absolute;z-index:3;height:auto;aspect-ratio:1} .bi-ad .v-ring circle{fill:none;stroke-width:3} .bi-ad .v-ring .bg{stroke:currentColor;opacity:.15} .bi-ad .v-ring .fg{stroke:var(--accent);stroke-linecap:round} .bi-ad .v-ring.thick circle{stroke-width:7}
.bi-ad .v-rn{font-size:calc(var(--u)*15);z-index:5} .bi-ad .v-rn2{font-size:calc(var(--u)*17);z-index:5}
.bi-ad .v-bars{position:absolute;z-index:4;display:flex;align-items:flex-end;gap:calc(var(--u)*.8)} .bi-ad .v-bars i{flex:1;background:currentColor;opacity:.25;border-radius:calc(var(--u)*.6) calc(var(--u)*.6) 0 0} .bi-ad .v-bars i.on{background:var(--accent);opacity:1}
/* stat posters */
.bi-ad .v-sn{font-size:calc(var(--u)*15)}
.bi-ad .v-band{position:absolute;z-index:4;left:0;right:0;bottom:0;height:38%;display:grid;grid-template-columns:repeat(4,1fr);padding:calc(var(--u)*4) var(--m);gap:calc(var(--u)*2);box-sizing:border-box;align-items:end}
.bi-ad .v-band div{border-top:1px solid color-mix(in srgb,var(--ink) 30%,transparent);padding-top:calc(var(--u)*1.4);display:grid;gap:calc(var(--u)*.8)} .bi-ad .v-band p{position:relative}
.bi-ad .v-bn{position:relative;font-size:calc(var(--u)*7.4);letter-spacing:-.04em;line-height:.9;font-weight:500}
.bi-ad .v-g4{position:absolute;inset:var(--m) var(--m) calc(var(--m)*1.6);display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:calc(var(--u)*1.4);z-index:3}
.bi-ad .v-g4>div{position:relative;border-radius:calc(var(--u)*2.4);background:#fff;padding:calc(var(--u)*3);display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden}
.bi-ad .v-g4 .v-ph{position:relative;padding:0} .bi-ad .v-g4 .on{background:var(--accent)} .bi-ad .v-g4 .dk{background:#0b0b0b;color:#fff}
.bi-ad .v-g4 p{position:relative} .bi-ad .v-g4n{font-size:calc(var(--u)*10);letter-spacing:-.05em;line-height:.9;font-weight:500;margin-bottom:calc(var(--u)*1)}
.bi-ad .v-cols3{position:absolute;z-index:5;left:var(--m);right:var(--m);bottom:calc(var(--m) + var(--u)*5);display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--u)*2)}
.bi-ad .v-cols3 p{position:relative} .bi-ad .v-cn{font-size:calc(var(--u)*5.4);letter-spacing:-.04em;font-weight:500;line-height:1;margin-top:calc(var(--u)*.6)}
/* city */
.bi-ad .v-code{left:calc(var(--m)*.6);top:calc(var(--m)*.4);font-size:calc(var(--u)*30);line-height:.8;letter-spacing:-.06em}
.bi-ad .v-tick{position:absolute;z-index:6;left:-10%;right:-10%;overflow:hidden;white-space:nowrap;font-family:var(--ftv);font-size:calc(var(--u)*1.8);font-weight:600;text-transform:uppercase;letter-spacing:.06em;padding:calc(var(--u)*.8) 0;border-top:1px solid currentColor;border-bottom:1px solid currentColor}
.bi-ad .v-tick.big{font-family:var(--fdv);font-size:calc(var(--u)*6);letter-spacing:-.03em;text-transform:none;background:var(--ink);color:var(--bg);border:0;padding:calc(var(--u)*1.2) 0} .bi-ad .v-tick.inv{background:var(--bg);color:var(--ink)}
.bi-ad .v-cities{position:absolute;z-index:4;left:var(--m);right:var(--m);top:calc(var(--m) + var(--u)*8);display:grid}
.bi-ad .v-cities div{display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px solid color-mix(in srgb,var(--ink) 22%,transparent);padding:calc(var(--u)*.6) 0}
.bi-ad .v-cities b{font-family:var(--fdv);font-size:calc(var(--u)*9.4);font-weight:500;letter-spacing:-.05em;line-height:.95;opacity:.3} .bi-ad .v-cities span{font-family:var(--ftv);font-size:calc(var(--u)*2);opacity:.6}
.bi-ad .v-cities .on b,.bi-ad .v-cities .on span{opacity:1;color:var(--accent)}
.bi-ad .v-map{position:absolute;inset:0;width:100%;height:100%;z-index:1}
.bi-ad .v-ghost{font-size:calc(var(--u)*24)}
.bi-ad .v-card{position:absolute;z-index:5;background:var(--bg);padding:calc(var(--u)*1.6);border-radius:calc(var(--u)*2);box-shadow:0 calc(var(--u)*1) calc(var(--u)*4) rgba(0,0,0,.12)} .bi-ad .v-card .v-ph{border-radius:calc(var(--u)*1.2)}
/* events */
.bi-ad .v-day{left:calc(var(--m)*.6);top:calc(var(--m)*.2);font-size:calc(var(--u)*42);line-height:.82;letter-spacing:-.07em}
.bi-ad .v-month{left:var(--m);top:calc(var(--m) + var(--u)*33);font-size:calc(var(--u)*5);font-weight:500;letter-spacing:-.03em}
.bi-ad .v-ticket{position:absolute;inset:calc(var(--m)*1.4) calc(var(--m)*1.4);z-index:3;display:grid;grid-template-rows:62% 38%;filter:drop-shadow(0 calc(var(--u)*1.4) calc(var(--u)*3) rgba(0,0,0,.25))}
.bi-ad .v-tk-top{position:relative;border-radius:calc(var(--u)*2.4) calc(var(--u)*2.4) 0 0;overflow:hidden;color:#fff} .bi-ad .v-tk-top::after{content:"";position:absolute;inset:0;z-index:3;background:linear-gradient(transparent 35%,rgba(0,0,0,.75))}
.bi-ad .v-tk-top .v-big,.bi-ad .v-tk-top .v-s{z-index:4}
.bi-ad .v-tk-bot{position:relative;background:var(--accent);border-radius:0 0 calc(var(--u)*2.4) calc(var(--u)*2.4);border-top:calc(var(--u)*.4) dashed rgba(0,0,0,.35);-webkit-mask:radial-gradient(circle calc(var(--u)*2.2) at 0 0,transparent 98%,#000) top left/51% 100% no-repeat,radial-gradient(circle calc(var(--u)*2.2) at 100% 0,transparent 98%,#000) top right/51% 100% no-repeat;mask:radial-gradient(circle calc(var(--u)*2.2) at 0 0,transparent 98%,#000) top left/51% 100% no-repeat,radial-gradient(circle calc(var(--u)*2.2) at 100% 0,transparent 98%,#000) top right/51% 100% no-repeat}
.bi-ad .v-tk-g{position:absolute;left:7%;right:7%;top:12%;display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--u)*1.4)} .bi-ad .v-tk-g div{display:grid;gap:calc(var(--u)*.4)} .bi-ad .v-tk-g span{font-family:var(--ftv);font-size:calc(var(--u)*1.4);opacity:.6} .bi-ad .v-tk-g b{font-family:var(--fdv);font-size:calc(var(--u)*3.6);font-weight:500;letter-spacing:-.03em}
.bi-ad .v-barcode{position:absolute;right:7%;bottom:8%;width:30%;height:22%;background:repeating-linear-gradient(90deg,currentColor 0 2px,transparent 2px 4px,currentColor 4px 5px,transparent 5px 8px,currentColor 8px 11px,transparent 11px 12px)}
.bi-ad .v-cal{position:absolute;z-index:4;left:var(--m);right:var(--m);top:calc(var(--m) + var(--u)*6);display:grid;grid-template-columns:repeat(7,1fr);gap:calc(var(--u)*.6);font-family:var(--ftv);font-size:calc(var(--u)*2.2);text-align:center}
.bi-ad .v-cal b{font-weight:600;opacity:.5;padding-bottom:calc(var(--u)*.8)} .bi-ad .v-cal span{display:grid;place-items:center;aspect-ratio:1.5;border-radius:99px} .bi-ad .v-cal span.on{background:var(--accent);color:#fff;font-weight:700}
.bi-ad .v-count{left:calc(var(--m)*.5);top:calc(var(--m) + var(--u)*3);font-size:calc(var(--u)*40);letter-spacing:-.07em;line-height:.8;z-index:5;color:#fff} .bi-ad .v-count+.v-s{color:#fff}
.bi-ad .v-prog{position:absolute;z-index:5;left:var(--m);right:var(--m);display:flex;gap:calc(var(--u)*.8)} .bi-ad .v-prog i{flex:1;height:calc(var(--u)*1);border-radius:99px;background:rgba(255,255,255,.25)} .bi-ad .v-prog i.on{background:var(--accent)}
/* calls */
.bi-ad .v-slots{position:absolute;z-index:4;left:var(--m);right:var(--m);top:calc(var(--m) + var(--u)*27);display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--u)*1.2)}
.bi-ad .v-slots span{display:grid;place-items:center;height:calc(var(--u)*11);border-radius:calc(var(--u)*2);border:1px solid color-mix(in srgb,var(--ink) 30%,transparent);font-family:var(--ftv);font-size:calc(var(--u)*2.9);font-weight:500}
.bi-ad .v-slots .off{opacity:.35;text-decoration:line-through} .bi-ad .v-slots .on{background:var(--accent);border-color:var(--accent);color:#fff}
.bi-ad .v-steps{position:absolute;z-index:4;left:var(--m);right:var(--m);top:46%;display:grid;gap:calc(var(--u)*1.6)}
.bi-ad .v-steps div{display:grid;grid-template-columns:calc(var(--u)*9) 1fr;grid-template-rows:auto auto;column-gap:calc(var(--u)*2);align-items:center;border-top:1px solid color-mix(in srgb,var(--ink) 20%,transparent);padding-top:calc(var(--u)*1.6)}
.bi-ad .v-steps .v-sym{grid-row:span 2} .bi-ad .v-steps b{font-family:var(--fdv);font-size:calc(var(--u)*5);font-weight:500;letter-spacing:-.03em;line-height:1} .bi-ad .v-steps span{font-family:var(--ftv);font-size:calc(var(--u)*2);opacity:.6}
/* big numbers */
.bi-ad .v-onum{left:calc(var(--m)*.4);top:calc(var(--m)*.2);font-size:calc(var(--u)*40);letter-spacing:-.06em;line-height:.85;color:transparent;-webkit-text-stroke:calc(var(--u)*.3) var(--ink);white-space:nowrap}
.bi-ad .v-onum::after{content:attr(data-t);position:absolute;inset:0;color:var(--accent);-webkit-text-stroke:0;clip-path:inset(62% 0 0 0)}
.bi-ad .v-clipnum,.bi-ad .v-clipL,.bi-ad .v-clipW{background-size:cover;background-position:center;-webkit-background-clip:text;background-clip:text;color:transparent;filter:grayscale(1) contrast(1.1);white-space:nowrap;letter-spacing:-.07em;line-height:.8}
.bi-ad .v-clipnum{left:calc(var(--m)*.3);right:0;top:calc(var(--m)*1.6);font-size:calc(var(--u)*62);font-weight:800}
.bi-ad .v-clipL{left:calc(var(--m)*.2);top:-2%;font-size:calc(var(--u)*92);font-weight:800}
.bi-ad .v-clipW{left:0;right:0;top:50%;translate:0 -50%;text-align:center;font-size:calc(var(--u)*34);font-weight:900}
.bi-ad .v-ns1{font-size:calc(var(--u)*26);letter-spacing:-.06em} .bi-ad .v-ns2{font-size:calc(var(--u)*17);letter-spacing:-.06em} .bi-ad .v-ns3{font-size:calc(var(--u)*11)}
/* team */
.bi-ad .v-team{position:absolute;z-index:4;left:var(--m);right:var(--m);top:calc(var(--m) + var(--u)*22);bottom:var(--m);display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:1fr 1fr;gap:calc(var(--u)*2) calc(var(--u)*1.6)}
.bi-ad .v-team div{display:grid;grid-template-rows:1fr auto auto;min-height:0} .bi-ad .v-team .v-ph{position:relative;border-radius:calc(var(--u)*1.4);min-height:0}
.bi-ad .v-team b{font-family:var(--fdv);font-size:calc(var(--u)*2.6);font-weight:500;margin-top:calc(var(--u)*1)} .bi-ad .v-team span{font-family:var(--ftv);font-size:calc(var(--u)*1.7);opacity:.6}
.bi-ad .v-faces{position:absolute;z-index:4;left:var(--m);top:44%;display:flex;align-items:center}
.bi-ad .v-faces .v-ph{position:relative;width:calc(var(--u)*17);aspect-ratio:1;border-radius:50%;margin-right:calc(var(--u)*-4);border:calc(var(--u)*.6) solid var(--bg)}
.bi-ad .v-faces b{display:grid;place-items:center;width:calc(var(--u)*17);aspect-ratio:1;border-radius:50%;background:var(--accent);color:#fff;font-family:var(--fdv);font-size:calc(var(--u)*5);font-weight:500;border:calc(var(--u)*.6) solid var(--bg)}
.bi-ad .v-roles{position:absolute;z-index:4;left:var(--m);right:var(--m);top:48%;display:grid}
.bi-ad .v-roles div{display:flex;justify-content:space-between;align-items:center;border-top:1px solid currentColor;padding:calc(var(--u)*1.2) 0} .bi-ad .v-roles b{font-family:var(--fdv);font-size:calc(var(--u)*4.4);font-weight:500;letter-spacing:-.03em} .bi-ad .v-roles span{font-size:calc(var(--u)*3.6)}
/* spec */
.bi-ad .v-callout{position:absolute;z-index:5;width:26%} .bi-ad .v-callout i{display:block;height:0;border-top:1px solid currentColor;margin-bottom:calc(var(--u)*1);position:relative} .bi-ad .v-callout i::after{content:"";position:absolute;top:calc(var(--u)*-.8);width:calc(var(--u)*1.6);aspect-ratio:1;border-radius:50%;background:var(--accent)}
.bi-ad .v-callout[style*="left:var"] i::after{right:-2%} .bi-ad .v-callout[style*="right:var"] i::after{left:-2%}
.bi-ad .v-model{left:calc(var(--m)*.5);top:calc(var(--m)*.2);font-size:calc(var(--u)*30);letter-spacing:-.07em;line-height:.85}
.bi-ad .v-table{position:absolute;z-index:4;left:var(--m);right:var(--m);top:52%;font-family:var(--ftv);font-size:calc(var(--u)*2.2)}
.bi-ad .v-table div{display:flex;justify-content:space-between;padding:calc(var(--u)*1.1) 0;border-top:1px solid color-mix(in srgb,var(--ink) 25%,transparent)} .bi-ad .v-table span{opacity:.6} .bi-ad .v-table b{font-weight:500}
/* launch */
.bi-ad .v-ldate{left:0;right:0;top:50%;translate:0 -50%;text-align:center;font-size:calc(var(--u)*30);letter-spacing:-.07em;line-height:.8;z-index:5;color:#fff}
.bi-ad .v-ldate~.v-s{color:#fff} .bi-ad .v-shade~.v-s,.bi-ad .v-shade~.v-mark,.bi-ad .v-shade~.v-big{color:#fff}
.bi-ad .v-tl{position:absolute;z-index:4;left:calc(var(--m) + var(--u)*2);right:calc(var(--m) + var(--u)*6);top:62%;height:calc(var(--u)*12)}
.bi-ad .v-tl::before,.bi-ad .v-tl-l{content:"";position:absolute;left:0;right:0;top:calc(var(--u)*1);height:calc(var(--u)*.5);border-radius:99px;background:color-mix(in srgb,var(--ink) 18%,transparent)} .bi-ad .v-tl-l{right:auto;width:var(--p);background:var(--accent)}
.bi-ad .v-tl div{position:absolute;top:0;translate:-50% 0;display:grid;justify-items:center;text-align:center;gap:calc(var(--u)*.6)} .bi-ad .v-tl div i{width:calc(var(--u)*2.4);aspect-ratio:1;border-radius:50%;background:var(--bg);border:calc(var(--u)*.5) solid color-mix(in srgb,var(--ink) 25%,transparent);box-sizing:border-box}
.bi-ad .v-tl .done i{background:var(--accent);border-color:var(--accent)} .bi-ad .v-tl .now i{box-shadow:0 0 0 calc(var(--u)*1.2) color-mix(in srgb,var(--accent) 25%,transparent)}
.bi-ad .v-tl b{font-family:var(--fdv);font-size:calc(var(--u)*2.8);font-weight:500;white-space:nowrap} .bi-ad .v-tl span{font-family:var(--ftv);font-size:calc(var(--u)*1.7);opacity:.6}
.bi-ad .v-badge{position:absolute;z-index:6;right:calc(var(--m) + var(--u)*3);top:calc(var(--m) + var(--u)*3);width:calc(var(--u)*26);height:auto;fill:#0b0b0b;font-family:var(--ftv);font-size:8.4px;font-weight:700;letter-spacing:.04em} .bi-ad .v-badge .bgc{fill:var(--bg)}
/* carousel */
.bi-ad .v-cnum{left:calc(var(--m)*.4);top:calc(var(--m)*1.6);font-size:calc(var(--u)*62);line-height:.78;letter-spacing:-.06em;color:var(--accent)}
.bi-ad .v-pdots{position:absolute;z-index:5;display:flex;gap:calc(var(--u)*.8)} .bi-ad .v-pdots i{width:calc(var(--u)*1.2);aspect-ratio:1;border-radius:50%;background:currentColor;opacity:.3} .bi-ad .v-pdots i.on{opacity:1;width:calc(var(--u)*4);border-radius:99px;aspect-ratio:auto;height:calc(var(--u)*1.2)}
.bi-ad .v-bar{position:absolute;z-index:5;left:var(--m);right:calc(var(--m) + var(--u)*22);height:calc(var(--u)*.6);border-radius:99px;background:color-mix(in srgb,var(--ink) 15%,transparent);background-image:linear-gradient(var(--accent),var(--accent));background-size:var(--p) 100%;background-repeat:no-repeat}
.bi-ad .v-tip-box{position:absolute;z-index:5;left:var(--m);right:var(--m);bottom:calc(var(--m) + var(--u)*5);display:flex;gap:calc(var(--u)*1.6);align-items:center;padding:calc(var(--u)*2);border-radius:calc(var(--u)*1.8);background:color-mix(in srgb,var(--ink) 6%,transparent)}
/* route */
.bi-ad .v-gridbg{position:absolute;inset:0;z-index:1;background:repeating-linear-gradient(90deg,currentColor 0 1px,transparent 1px calc(var(--u)*6)),repeating-linear-gradient(0deg,currentColor 0 1px,transparent 1px calc(var(--u)*6));opacity:.07}
.bi-ad .v-route{position:absolute;z-index:4;left:var(--m);right:var(--m);top:28%;width:calc(100% - var(--m)*2);height:auto}
.bi-ad .v-rstats{position:absolute;z-index:5;left:var(--m);right:var(--m);bottom:calc(var(--m) + var(--u)*5);display:grid;grid-template-columns:1fr 1fr;gap:calc(var(--u)*2.4) calc(var(--u)*2)}
.bi-ad .v-rstats div{display:grid;border-top:1px solid color-mix(in srgb,var(--ink) 30%,transparent);padding-top:calc(var(--u)*1)} .bi-ad .v-rstats span{font-family:var(--ftv);font-size:calc(var(--u)*1.6);opacity:.6} .bi-ad .v-rstats b{font-family:var(--fdv);font-size:calc(var(--u)*6.4);font-weight:500;letter-spacing:-.04em}
.bi-ad .v-elev .v-cl{stroke:var(--ink)} .bi-ad .v-elev .v-dot{border-color:var(--ink)} .bi-ad .v-elev .v-dot.last,.bi-ad .v-elev .v-tip{background:var(--ink);color:var(--bg)}
.bi-ad .v-elev stop{stop-color:var(--ink)!important}
.bi-ad .v-splits{position:absolute;z-index:4;left:var(--m);right:var(--m);top:28%;bottom:calc(var(--m) + var(--u)*6);display:grid;font-family:var(--ftv);font-size:calc(var(--u)*1.9)}
.bi-ad .v-splits div{display:grid;grid-template-columns:calc(var(--u)*4) 1fr calc(var(--u)*8);align-items:center;gap:calc(var(--u)*1.4)} .bi-ad .v-splits span{opacity:.5} .bi-ad .v-splits b{font-weight:500;text-align:right}
.bi-ad .v-splits i{height:62%;width:var(--w);border-radius:99px;background:color-mix(in srgb,var(--ink) 18%,transparent)} .bi-ad .v-splits i.on{background:var(--accent)}
/* vertical */
.bi-ad .v-vword{left:var(--m);top:50%;width:0;height:0;font-size:calc(var(--u)*22);line-height:.8;letter-spacing:-.06em;writing-mode:vertical-rl;rotate:180deg;translate:calc(var(--u)*-1) -50%;white-space:nowrap;height:calc(100% - var(--m)*2);text-align:center}
.bi-ad .v-vw{top:0;bottom:0;font-size:calc(var(--u)*19);letter-spacing:-.05em;line-height:.8;writing-mode:vertical-rl;text-align:center;white-space:nowrap}
.bi-ad .v-vw.l{left:calc(var(--u)*.6);rotate:180deg} .bi-ad .v-vw.r{right:calc(var(--u)*.6)}
/* giant */
.bi-ad .v-bleed{left:-2%;right:-2%;bottom:-7%;text-align:center;font-size:calc(var(--u)*33);letter-spacing:-.07em;line-height:.8;font-weight:800;white-space:nowrap}
/* windows */
.bi-ad .v-arches{position:absolute;z-index:3;left:var(--m);right:var(--m);top:30%;bottom:calc(var(--m) + var(--u)*5);display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--u)*2)}
.bi-ad .v-arches div{display:grid;grid-template-rows:1fr auto;min-height:0} .bi-ad .v-arches .v-ph{position:relative;border-radius:999px 999px 0 0;min-height:0} .bi-ad .v-arches .v-ph .bi-media{width:300%;left:calc(var(--x) * -2);object-fit:cover}
.bi-ad .v-arches b{font-family:var(--fdv);font-size:calc(var(--u)*3);font-weight:500;margin-top:calc(var(--u)*1)}
.bi-ad .v-circs{position:absolute;z-index:3;left:var(--m);right:var(--m);top:40%;display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--u)*1)} .bi-ad .v-circs .v-ph{position:relative;aspect-ratio:1;border-radius:50%} .bi-ad .v-circs .v-ph .bi-media{width:300%;left:calc(var(--x) * -2)}
.bi-ad .v-stripes{position:absolute;inset:0 0 28% 0;z-index:2;display:grid;grid-template-columns:repeat(7,1fr);gap:calc(var(--u)*1.2);padding:0 var(--m)} .bi-ad .v-stripes .v-ph{position:relative;translate:0 calc((var(--i) - 3) * (var(--i) - 3) * var(--u) * -.9)} .bi-ad .v-stripes .v-ph .bi-media{width:700%;left:calc(var(--i) * -100%)}
.bi-ad .v-msk{position:absolute;z-index:3;aspect-ratio:1;-webkit-mask:var(--mk) center/contain no-repeat;mask:var(--mk) center/contain no-repeat}
/* dot boards */
.bi-ad .v-dotsbg{position:absolute;inset:0;z-index:1;background:radial-gradient(circle,currentColor 0 calc(var(--u)*.22),transparent calc(var(--u)*.26)) 0 0/calc(var(--u)*6) calc(var(--u)*6);opacity:.35}
.bi-ad .v-dph{border-radius:calc(var(--u)*1)}
.bi-ad .v-dg{position:absolute;z-index:4;display:grid;grid-template-columns:repeat(10,1fr);gap:calc(var(--u)*1)} .bi-ad .v-dg i{aspect-ratio:1;border-radius:50%;background:currentColor;opacity:.18} .bi-ad .v-dg i.on{background:var(--accent);opacity:1}
/* strips */
.bi-ad .v-strip{position:absolute;z-index:5;left:var(--m);right:var(--m);top:var(--m);display:grid;grid-template-columns:repeat(5,1fr);border-top:1px solid currentColor;border-bottom:1px solid currentColor;color:#fff}
.bi-ad .v-strip div{padding:calc(var(--u)*1.2) calc(var(--u)*1);border-right:1px solid rgba(255,255,255,.4)} .bi-ad .v-strip div:last-child{border-right:0} .bi-ad .v-strip p{position:relative}
/* number and photo */
.bi-ad .v-bnum{font-size:calc(var(--u)*24);letter-spacing:-.07em;line-height:.82}
.bi-ad .v-xnum{left:calc(var(--m)*.4);top:calc(30% - var(--u)*20);font-size:calc(var(--u)*34);letter-spacing:-.07em;line-height:.8;z-index:5;color:var(--accent);text-shadow:0 calc(var(--u)*.6) calc(var(--u)*3) rgba(0,0,0,.35)}
/* gradients */
.bi-ad .v-mesh{position:absolute;inset:0;z-index:1;background:radial-gradient(60% 50% at 20% 20%,var(--g1),transparent 70%),radial-gradient(55% 55% at 85% 35%,var(--g2),transparent 70%),radial-gradient(70% 60% at 50% 100%,color-mix(in srgb,var(--g1) 70%,var(--g2)),transparent 70%),var(--bg);filter:saturate(1.15)}
.bi-ad .v-mesh.two{background:radial-gradient(55% 45% at 90% 10%,var(--g1),transparent 70%),radial-gradient(60% 50% at 10% 90%,var(--g2),transparent 70%),var(--bg)}
.bi-ad .v-mesh.three{background:radial-gradient(50% 40% at 50% 45%,var(--g1),transparent 72%),radial-gradient(60% 50% at 20% 90%,var(--g2),transparent 70%),radial-gradient(40% 40% at 90% 10%,var(--accent),transparent 70%),var(--bg)}
.bi-ad .v-gword{left:calc(var(--m)*.5);top:calc(var(--m)*2.4);font-size:calc(var(--u)*40);letter-spacing:-.07em;line-height:.8;background:linear-gradient(180deg,#fff 30%,rgba(255,255,255,.2));-webkit-background-clip:text;background-clip:text;color:transparent}
.bi-ad .v-glass{position:absolute;z-index:4;left:var(--m);right:var(--m);bottom:calc(var(--m) + var(--u)*6);display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--u)*1.2)}
.bi-ad .v-glass div{padding:calc(var(--u)*2);border-radius:calc(var(--u)*2);background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)} .bi-ad .v-glass p{position:relative}
.bi-ad .v-blend .bi-media{mix-blend-mode:luminosity}
.bi-ad .v-maxt{position:absolute;z-index:3;left:calc(var(--m)*.6);right:var(--m);top:calc(var(--m)*.6);display:grid;font-family:var(--fdv);line-height:.82;letter-spacing:-.065em}
.bi-ad .v-maxt b{font-size:calc(var(--u)*24);font-weight:800} .bi-ad .v-maxt .o{color:transparent;-webkit-text-stroke:calc(var(--u)*.3) var(--ink)} .bi-ad .v-maxt .ac{color:var(--accent)}
.bi-ad .v-price{left:calc(var(--m)*.6);top:calc(var(--m) + var(--u)*3);font-size:calc(var(--u)*30);letter-spacing:-.07em;line-height:.85}
.bi-ad .v-checks{position:absolute;z-index:4;left:var(--m);top:52%;display:grid;gap:calc(var(--u)*1.4)} .bi-ad .v-checks div{display:flex;align-items:center;gap:calc(var(--u)*1.4);font-family:var(--ftv);font-size:calc(var(--u)*2.6);font-weight:500}

/* upgraded data posters: big stat, type stack, KPI cards, growth line, price tag, lime statement */
.bi-ad .x2-3 b,.bi-ad .x2-pair b,.bi-ad .x2-pillars b,.bi-ad .x2-kpi b{position:relative;margin:0}
.bi-ad .x2-s{position:absolute;z-index:5;margin:0;font-family:var(--ftv);font-size:calc(var(--u)*1.9);line-height:1.22;font-weight:500} .bi-ad .x2-s.lg{font-size:calc(var(--u)*2.6)}
.bi-ad .x2-huge{left:calc(var(--m)*.4);top:calc(var(--m) + var(--u)*2);font-size:calc(var(--u)*40);font-weight:500;letter-spacing:-.075em;line-height:.82}
.bi-ad .x2-dark .v-cl{stroke:#0b0b0b} .bi-ad .x2-dark .v-dot{border-color:#0b0b0b;background:var(--bg)} .bi-ad .x2-dark .v-dot.last{background:#0b0b0b;box-shadow:0 0 0 calc(var(--u)*1) rgba(0,0,0,.15)} .bi-ad .x2-dark stop{stop-color:#0b0b0b!important;stop-opacity:.18}
.bi-ad .x2-3{position:absolute;z-index:5;left:var(--m);right:var(--m);bottom:calc(var(--m) + var(--u)*8);display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--u)*2)}
.bi-ad .x2-3.top{top:calc(var(--m) + var(--u)*21);bottom:auto}
.bi-ad .x2-3 div{display:grid;gap:calc(var(--u)*.6);border-top:1px solid currentColor;padding-top:calc(var(--u)*1.2)} .bi-ad .x2-3 b{font-size:calc(var(--u)*6.4);font-weight:500;letter-spacing:-.045em;line-height:1} .bi-ad .x2-3 span{font-family:var(--ftv);font-size:calc(var(--u)*1.8);opacity:.7}
.bi-ad .x2-stack{right:var(--m);top:calc(var(--m) + var(--u)*7);text-align:right;font-size:calc(var(--u)*17);font-weight:600;letter-spacing:-.06em;line-height:.84;text-transform:uppercase} .bi-ad .x2-stack .mo-acc{font-style:italic}
.bi-ad .x2-list{position:absolute;z-index:5;left:var(--m);top:calc(var(--m) + var(--u)*27);display:grid;gap:calc(var(--u)*.8);font-family:var(--ftv);font-size:calc(var(--u)*2);font-weight:500} .bi-ad .x2-list span::before{content:"— ";opacity:.4}
.bi-ad .x2-pair{position:absolute;z-index:5;left:var(--m);bottom:calc(var(--m) + var(--u)*9);display:flex;gap:calc(var(--u)*6)} .bi-ad .x2-pair div{display:grid} .bi-ad .x2-pair b{font-size:calc(var(--u)*8);font-weight:500;letter-spacing:-.05em;line-height:1} .bi-ad .x2-pair span{font-family:var(--ftv);font-size:calc(var(--u)*1.8);opacity:.6}
.bi-ad .x2-pill{position:absolute;z-index:6;margin:0;padding:calc(var(--u)*1.1) calc(var(--u)*2.6);border-radius:99px;background:var(--ink);color:var(--bg);font-family:var(--ftv);font-size:calc(var(--u)*2);font-weight:600;white-space:nowrap}
.bi-ad .x2-h{left:var(--m);top:var(--m);font-size:calc(var(--u)*10);font-weight:500;text-transform:uppercase;letter-spacing:-.05em;line-height:.86}
.bi-ad .x2-kpi{position:absolute;z-index:4;left:var(--m);right:var(--m);top:34%;bottom:calc(var(--m) + var(--u)*5);display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1.15fr;gap:calc(var(--u)*1.4)}
.bi-ad .x2-kpi>div{position:relative;border-radius:calc(var(--u)*2.4);padding:calc(var(--u)*2.4);display:flex;flex-direction:column;justify-content:space-between;color:#0b0b0b;font-family:var(--ftv);font-size:calc(var(--u)*1.8);overflow:hidden}
.bi-ad .x2-kpi .a{background:var(--accent)} .bi-ad .x2-kpi .g{background:var(--g2)} .bi-ad .x2-kpi .w{grid-column:span 2;background:#fff;--bg:#fff}
.bi-ad .x2-kpi p{position:relative;margin:0} .bi-ad .x2-kpi b{font-size:calc(var(--u)*9);font-weight:500;letter-spacing:-.055em;line-height:.9}
.bi-ad .x2-kpi .w b{position:absolute!important;right:calc(var(--u)*2.4);top:calc(var(--u)*1.8);font-size:calc(var(--u)*6)}
.bi-ad .x2-mini{position:absolute;left:calc(var(--u)*2.4);right:calc(var(--u)*2.4);top:45%;height:calc(var(--u)*1);border-radius:99px;background:rgba(0,0,0,.12);background-image:linear-gradient(#0b0b0b,#0b0b0b);background-size:var(--p) 100%;background-repeat:no-repeat}
.bi-ad .x2-h.dark{color:var(--ink)}
.bi-ad .x2-ptag{position:absolute;z-index:5;left:var(--m);right:var(--m);top:var(--m);margin:0;padding:calc(var(--u)*1) calc(var(--u)*3);border-radius:calc(var(--u)*2.2);background:#0b0b0b;color:#fff;font-family:var(--fdv);font-size:calc(var(--u)*11.5);font-weight:500;letter-spacing:-.05em;line-height:1.05}
.bi-ad .x2-pth{left:var(--m);top:calc(var(--m) + var(--u)*24);font-size:calc(var(--u)*7.4);font-weight:500;text-transform:uppercase;letter-spacing:-.04em;line-height:.9}
.bi-ad .x2-checks{position:absolute;z-index:5;left:var(--m);right:var(--m);top:calc(var(--m) + var(--u)*50);display:grid;gap:calc(var(--u)*1.2)} .bi-ad .x2-checks div{display:flex;align-items:center;gap:calc(var(--u)*1.4);font-family:var(--ftv);font-size:calc(var(--u)*2.3);font-weight:500}
.bi-ad .x2-cmp{position:absolute;z-index:5;left:var(--m);right:var(--m);bottom:calc(var(--m) + var(--u)*8);display:grid;gap:calc(var(--u)*1)}
.bi-ad .x2-cmp div{display:grid;grid-template-columns:calc(var(--u)*10) 1fr calc(var(--u)*8);align-items:center;gap:calc(var(--u)*1.2);font-family:var(--ftv);font-size:calc(var(--u)*1.9)}
.bi-ad .x2-cmp i{height:calc(var(--u)*2.4);border-radius:99px;background:rgba(0,0,0,.25)} .bi-ad .x2-cmp .on i{background:var(--accent)} .bi-ad .x2-cmp b{font-weight:600;text-align:right}
.bi-ad .x2-lime{left:var(--m);right:var(--m);top:14%;font-size:calc(var(--u)*12.4);font-weight:500;letter-spacing:-.05em;line-height:.95}
.bi-ad .x2-pillars{position:absolute;z-index:5;left:var(--m);right:var(--m);bottom:calc(var(--m) + var(--u)*9);display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--u)*2)}
.bi-ad .x2-pillars div{display:grid;gap:calc(var(--u)*1);border-top:calc(var(--u)*.4) solid var(--accent);padding-top:calc(var(--u)*1.4)} .bi-ad .x2-pillars b{font-size:calc(var(--u)*3.4);font-weight:500;letter-spacing:-.03em} .bi-ad .x2-pillars span{font-family:var(--ftv);font-size:calc(var(--u)*1.7);line-height:1.3;opacity:.7}
@container (min-aspect-ratio: 13/10){
  .bi-ad .x2-kpi{left:46%;top:var(--m)} .bi-ad .x2-checks{left:52%;top:calc(var(--m) + var(--u)*22)} .bi-ad .x2-cmp{left:52%} .bi-ad .x2-list{display:none} .bi-ad .x2-stack{font-size:calc(var(--u)*15)}
  .bi-ad .x2-3.top{right:48%} .bi-ad .x2-lime{right:40%} .bi-ad .x2-pillars{left:62%;grid-template-columns:1fr;bottom:auto;top:var(--m)}
}
@container (max-aspect-ratio: 7/10){ .bi-ad .x2-checks{top:calc(var(--m) + var(--u)*56)} }
@container (min-aspect-ratio: 13/10){
  .bi-ad .v-h00{font-size:calc(var(--u)*13)} .bi-ad .v-band{height:44%;left:44%} .bi-ad .v-g4{grid-template-columns:repeat(4,1fr);grid-template-rows:1fr}
  .bi-ad .v-cities{right:40%} .bi-ad .v-day{font-size:calc(var(--u)*36)} .bi-ad .v-ticket{left:24%;right:24%}
  .bi-ad .v-cal{left:46%;top:var(--m);font-size:calc(var(--u)*1.8)} .bi-ad .v-slots{right:46%} .bi-ad .v-steps{left:50%;top:var(--m)} .bi-ad .v-team{left:42%;top:var(--m)}
  .bi-ad .v-roles{left:34%;right:calc(var(--m) + 26%);top:30%} .bi-ad .v-hire-ph{width:22%!important}
  .bi-ad .v-route{width:54%;left:auto;right:var(--m);top:10%} .bi-ad .v-rstats{right:50%!important;grid-template-columns:1fr 1fr!important}
  .bi-ad .v-dph{width:auto!important;height:30%} .bi-ad .v-table{left:50%;top:22%} .bi-ad .v-tl{top:56%} .bi-ad .v-splits{left:46%;top:var(--m)}
  .bi-ad .v-arches{left:40%;top:var(--m)} .bi-ad .v-circs{left:40%;top:16%} .bi-ad .v-checks{left:46%;top:24%} .bi-ad .v-glass{left:50%} .bi-ad .v-strip{grid-template-columns:repeat(5,auto);gap:calc(var(--u)*2)}
  .bi-ad .v-dg{width:min(30%,calc(var(--u)*56))!important}
}
@container (max-aspect-ratio: 7/10){
  .bi-ad .v-band{height:30%;grid-template-columns:1fr 1fr} .bi-ad .v-cities{top:calc(var(--m) + var(--u)*14)} .bi-ad .v-team{grid-template-columns:repeat(2,1fr);grid-template-rows:repeat(3,1fr)}
  .bi-ad .v-steps{top:40%} .bi-ad .v-slots{top:calc(var(--m) + var(--u)*32)} .bi-ad .v-table{top:46%}
}`;
