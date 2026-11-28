// BrandIt: Swiss sheets. Thin rules, big grotesk words, a little photo and a lot of white,
// plus textures (grain, grid paper, scan lines, halftone), glitches, a dot-matrix alphabet and a set of our own symbols.
// Every symbol and texture here is drawn from scratch. Two font families at most: --fdv and --ftv.
import { esc, lines, img, L, logo } from './motion.js?v=35';

/* ---------- small helpers ---------- */
const p = (s, style = '', cls = 'u-s') => `<p class="${cls}" style="${style}">${lines(s)}</p>`;
const rule = (style) => `<i class="u-rule" style="${style}"></i>`;
const list = (s = '') => String(s).split(/\n/).filter((x) => x.trim() !== '');
const mark = (b, style = '', cls = '') => `<span class="u-mark ${cls}" style="${style}">${logo(b, b.name)}</span>`;
const tex = (k, style = '') => `<i class="u-tex u-${k}" style="${style}"></i>`;

/* ---------- our own symbols, 100×100, solid unless noted ---------- */
const R = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join('');
const spiral = (() => { let d = 'M50 50'; for (let a = 0; a < Math.PI * 7.2; a += .25) { const r = 2 + a * 2.0; d += `L${(50 + Math.cos(a) * r).toFixed(1)} ${(50 + Math.sin(a) * r * .96).toFixed(1)}`; } return d; })();
const wobble = (() => { let d = ''; for (let a = 0; a <= Math.PI * 2.08; a += .2) { const r = 40 + Math.sin(a * 3) * 2.2 + Math.cos(a * 5) * 1.4; d += (d ? 'L' : 'M') + `${(50 + Math.cos(a) * r).toFixed(1)} ${(50 + Math.sin(a) * r).toFixed(1)}`; } return d; })();
const SYM = {
  burst: R(12, (i) => `<rect x="46" y="3" width="8" height="32" rx="4" transform="rotate(${i * 30} 50 50)"/>`),
  aster: R(3, (i) => `<rect x="42" y="4" width="16" height="92" rx="8" transform="rotate(${i * 60} 50 50)"/>`),
  node: `<g stroke="currentColor" stroke-width="3.2" fill="none"><path d="M50 50 18 22M50 50 84 18M50 50 82 82M50 50 22 78M18 22 50 8 84 18M22 78 50 92"/></g><circle cx="50" cy="50" r="12"/><circle cx="18" cy="22" r="8"/><circle cx="84" cy="18" r="7"/><circle cx="82" cy="82" r="9"/><circle cx="22" cy="78" r="6"/><circle cx="50" cy="8" r="4.5"/><circle cx="50" cy="92" r="4.5"/>`,
  flower: `<circle cx="50" cy="27" r="23"/><circle cx="73" cy="50" r="23"/><circle cx="50" cy="73" r="23"/><circle cx="27" cy="50" r="23"/>`,
  target: `<g fill="none" stroke="currentColor" stroke-width="6"><circle cx="50" cy="50" r="44"/><circle cx="50" cy="50" r="28"/></g><circle cx="50" cy="50" r="11"/>`,
  quarters: `<path d="M4 48A44 44 0 0 1 48 4V48Z M52 4A44 44 0 0 1 96 48H52Z M4 52H48V96A44 44 0 0 1 4 52Z M52 52H96A44 44 0 0 1 52 96Z"/>`,
  star: `<path d="M50 2C54 34 66 46 98 50 66 54 54 66 50 98 46 66 34 54 2 50 34 46 46 34 50 2Z"/>`,
  dots: R(9, (i) => `<circle cx="${18 + (i % 3) * 32}" cy="${18 + Math.floor(i / 3) * 32}" r="12"/>`),
  plus: `<path d="M38 4h24v34h34v24H62v34H38V62H4V38h34Z" stroke-linejoin="round"/>`,
  half: `<path d="M4 50a46 46 0 0 1 92 0Z"/><circle cx="50" cy="74" r="22"/>`,
  arcs: R(4, (i) => { const r = 24 + i * 22; return `<path d="M6 ${94 - r}A${r} ${r} 0 0 1 ${6 + r} 94" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>`; }) + '<circle cx="8" cy="92" r="7"/>',
  spiral: `<path d="${spiral}" fill="none" stroke="currentColor" stroke-width="4.2" stroke-linecap="round"/>`,
  circle: `<path d="${wobble}" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>`,
  rays: R(18, (i) => { const a = i * 20 * Math.PI / 180, r1 = 12 + (i % 3) * 4, r2 = 34 + ((i * 7) % 5) * 3; return `<path d="M${(50 + Math.cos(a) * r1).toFixed(1)} ${(50 + Math.sin(a) * r1).toFixed(1)}L${(50 + Math.cos(a) * r2).toFixed(1)} ${(50 + Math.sin(a) * r2).toFixed(1)}" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>`; }) + '<circle cx="50" cy="50" r="2.5"/>',
};
const sym = (k, cls = '', style = '') => `<svg class="u-sym ${cls}" style="${style}" viewBox="0 0 100 100" aria-hidden="true">${SYM[k]}</svg>`;

/* ---------- a 5×5 dot-matrix alphabet ---------- */
const DM = {"A":"0111010001111111000110001","B":"1111010001111101000111110","C":"0111110000100001000001111","D":"1111010001100011000111110","E":"1111110000111101000011111","F":"1111110000111101000010000","G":"0111110000100111000101111","H":"1000110001111111000110001","I":"1111100100001000010011111","J":"0011100010000101001001100","K":"1000110010111001001010001","L":"1000010000100001000011111","M":"1000111011101011000110001","N":"1000111001101011001110001","O":"0111010001100011000101110","P":"1111010001111101000010000","Q":"0111010001101011001001101","R":"1111010001111101001010001","S":"0111110000011100000111110","T":"1111100100001000010000100","U":"1000110001100011000101110","V":"1000110001100010101000100","W":"1000110001101011101110001","X":"1000101010001000101010001","Y":"1000101010001000010000100","Z":"1111100010001000100011111","0":"0111010011101011100101110","1":"0010001100001000010001110","2":"1111000001011101000011111","3":"1111000001011100000111110","4":"1001010010111110001000010","5":"1111110000111100000111110","6":"0111010000111101000101110","7":"1111100001000100010000100","8":"0111010001011101000101110","9":"0111010001011110000101110",".":"0000000000000000000000100","&":"0110010010011011001001101"};
const dm = (word, cls = '', style = '') => {
  const ch = [...String(word).toUpperCase().slice(0, 10)];
  const w = Math.max(1, ch.length * 6 - 1);
  const dots = ch.map((c, i) => { const g = DM[c]; return g ? [...g].map((v, k) => v === '1' ? `<circle cx="${i * 6 + (k % 5) + .5}" cy="${Math.floor(k / 5) + .5}" r=".47"/>` : '').join('') : ''; }).join('');
  return `<svg class="u-dm ${cls}" style="${style}" viewBox="0 0 ${w} 5" aria-hidden="true">${dots}</svg>`;
};

/* a hand-drawn line that runs across the sheet */
const scribble = (style = '') => `<svg class="u-scrib" style="${style}" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M1 70C14 60 22 42 30 20 33 44 35 60 42 58 46 40 52 28 55 12 56 40 58 74 63 86 66 62 74 48 99 38" fill="none" stroke="currentColor" stroke-width=".35" vector-effect="non-scaling-stroke"/></svg>`;
const rings = (style = '') => `<svg class="u-rings" style="${style}" viewBox="0 0 100 26" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.2">${R(4, (i) => `<circle cx="${13 + i * 24.6}" cy="13" r="11.6"/>`)}</g></svg>`;
const slices = (im, n = 7) => `<div class="u-slices">${R(n, (i) => { const top = (i * 100) / n, h = 100 / n, sh = [0, 3, -5, 0, 7, -2, 0, 4, -6][i % 9]; return `<div class="u-sl${i % 3 === 1 ? ' tint' : ''}" style="top:${top}%;height:${h}%;translate:${sh}% 0"><div class="u-sl-in" style="top:${-i * 100}%;height:${n * 100}%">${img(im, 'grey')}</div></div>`; })}</div>`;

const G = ['front', ['#d9d9d6', '#2a2a2a']], K = ['front', ['#111111', '#8a8a8a']];

export const more9Templates = [
  /* ---------- from the reference sheets ---------- */
  { id: 'u-pass', name: 'Studio pass', cat: 'Swiss', look: L('#0e0e0e', '#ffffff', '#ffffff', '#0e0e0e', '#0e0e0e', 'tight', 'tight'), art: K,
    fields: { head: 'NORTH.S', left: 'Creative\nGames', right: 'Studio\nPass', a: 'Makers are\nthe new athletes', b: 'Studio pass\nNo. 00003', c: 'North Studio\n@north.studio', foot: '2026 Creative\nDivision' },
    html: (f, im) => `${img(im, 'grey')}<div class="u-dim" style="opacity:.42"></div>${rings('left:var(--m);right:var(--m);top:var(--m)')}${rule('top:45%')}<p class="mo-dw u-h u-pass-h" style="left:var(--m);top:46.5%">${esc(f.head)}</p>${rule('top:55.5%')}<p class="mo-dw u-h u-pass-2" style="left:var(--m);top:57%">${lines(f.left)}</p><p class="mo-dw u-h u-pass-2" style="left:52%;top:57%">${lines(f.right)}</p>${p(f.a, 'left:var(--m);top:76.5%')}${p(f.b, 'left:52%;top:76.5%')}${p(f.c, 'left:76%;top:76.5%')}${rule('top:84%')}${p(f.foot, 'right:var(--m);bottom:var(--m);text-align:right', 'u-xs')}` },

  { id: 'u-index', name: 'Exhibition index', cat: 'Swiss', look: L('#ffffff', '#111111', '#111111', '#ffffff', '#ffffff', 'tight', 'tight'),
    fields: { top: 'Drawing the line between\nart, design and advertising', items: 'Antibodies\nCabin fever\n14,000 & counting\nCAC-2026\nExperimental\nTop chopped down\nMatter\nNeon', meta: 'North S        2026\nLos Angeles\nTemporary exhibition\nMuseum of the city', side: 'Los Angeles' },
    html: (f) => `${p(f.top, 'left:30%;right:var(--m);top:var(--m);text-align:center;font-weight:600')}<div class="u-idx">${list(f.items).slice(0, 8).map((x, i) => `<div class="u-idx-r${i % 2 ? '' : ' dim'}"><span>${lines(f.meta)}</span><b>${esc(x)}</b></div>`).join('')}</div>${p(f.side, 'right:var(--m);top:54%', 'u-xs')}${scribble('left:12%;right:6%;top:30%;bottom:22%')}` },

  { id: 'u-binder', name: 'Binder spine', cat: 'Swiss', look: L('#0a0a0a', '#ffffff', '#ffffff', '#0a0a0a', '#0a0a0a', 'tight', 'tight'),
    fields: { name: 'North S', top: 'North Studio\n2026', code: 'V.E.A', note: 'Visual exploration, exhibit A\nNorth Studio\nVisual identity' },
    html: (f) => `<div class="u-rot"><div class="u-box u-b-low"><i class="d tl"></i><i class="d tr"></i><i class="d bl"></i><i class="d br"></i><p class="u-s" style="position:relative;font-size:calc(var(--u)*3)">${esc(f.code)}</p>${p(f.note, 'position:relative', 'u-xs')}</div><div class="u-box u-b-name"><i class="d tl"></i><i class="d tr"></i><i class="d bl"></i><i class="d br"></i><p class="mo-dw u-h">${esc(f.name)}</p></div><div class="u-box u-b-top"><i class="d tl"></i><i class="d tr"></i><i class="d bl"></i><i class="d br"></i>${p(f.top, 'position:relative;text-align:right')}</div></div>${R(4, (i) => `<i class="u-hole" style="top:${18 + i * 21}%"></i>`)}` },

  { id: 'u-burst', name: 'Burst on grey', cat: 'Swiss', look: L('#8a8a8a', '#ffffff', '#ffffff', '#8a8a8a', '#8a8a8a', 'tight', 'tight'), art: K,
    fields: { mark: 'NRT', small: 'North\nRadio\nTapes', c1: '001', c2: '16_06_2026\n16_07_2026', c3: 'Late night\nrecords only', c4: 'Designed by\n@north.studio', c5: 'Est. 2022\nBarcelona' },
    html: (f, im) => `${img(im, 'grey')}${tex('grain', 'opacity:.5')}<p class="mo-dw u-h u-burst-m" style="left:var(--m);top:var(--m)">${esc(f.mark)}</p>${p(f.small, 'left:calc(var(--m) + var(--u)*25);top:calc(var(--m) + var(--u)*1)', 'u-xs')}${sym('burst', 'u-c', 'width:calc(var(--u)*38);top:52%')}<div class="u-cols" style="bottom:var(--m)">${[f.c1, f.c2, f.c3, f.c4, f.c5].map((x) => p(x, 'position:relative', 'u-xs')).join('')}</div>` },

  { id: 'u-cards', name: 'Two cards', cat: 'Swiss', look: L('#000000', '#111111', '#111111', '#000000', '#ffffff', 'tight', 'tight'),
    fields: { big: 'NRTH', a: 'NO', b: 'R', c: 'TH', addr: 'Prague, CZ\nBuilding 12, Office 4\nKarlín, Praha 8', who: 'Anna North\nFounding partner\nanna@north.studio', tel: '(Tel)\n+420 123 456 789', web: '(Web)  (@)\nnorth.studio\n@north.studio' },
    html: (f) => `<div class="u-card u-card-a"><p class="mo-dw u-h">${esc(f.big)}</p></div><div class="u-card u-card-b"><p class="mo-dw u-h u-split"><span>${esc(f.a)}</span><span>${esc(f.b)}</span><span>${esc(f.c)}</span></p><div class="u-cg">${p(f.addr, 'position:relative')}${p(f.who, 'position:relative')}${p(f.tel, 'position:relative')}${p(f.web, 'position:relative')}</div></div>` },

  { id: 'u-portfolio', name: 'Portfolio sheet', cat: 'Swiss', look: L('#dcdcdc', '#111111', '#111111', '#dcdcdc', '#ffffff', 'tight', 'tight'),
    fields: { a: 'NO', b: 'R', c: 'TH', word: 'PORTFOLIO', year: '2026', info: 'Prague, CZ\n+420 123 456 789\n(Tel)', who: 'Anna North\nFounding partner\nanna@north.studio', f1: 'Portfolio\n2016', f2: 'North Design Studio\n2026' },
    html: (f) => `${rule('top:var(--m)')}<p class="mo-dw u-h u-split u-pf-r" style="top:calc(var(--m) + var(--u)*1.2)"><span>${esc(f.a)}</span><span>${esc(f.b)}</span><span>${esc(f.c)}</span></p>${rule('top:calc(var(--m) + var(--u)*9.6)')}<p class="mo-dw u-h u-split u-pf-r" style="top:calc(var(--m) + var(--u)*10.8)"><span>${esc(f.word)}</span><span>${esc(f.year)}</span></p>${rule('top:calc(var(--m) + var(--u)*19.4)')}${p(f.info, 'left:var(--m);top:calc(var(--m) + var(--u)*20.6)', 'u-xs')}${rule('top:calc(var(--m) + var(--u)*27.5)')}${p(f.who, 'left:var(--m);bottom:var(--m)', 'u-xs')}${rule('left:52%;bottom:calc(var(--m) + var(--u)*7)')}${p(f.f1, 'left:52%;bottom:var(--m)', 'u-xs')}${p(f.f2, 'left:76%;bottom:var(--m)', 'u-xs')}` },

  { id: 'u-letter', name: 'Letter card on a photo', cat: 'Swiss', look: L('#ffffff', '#111111', '#111111', '#ffffff', '#ffffff', 'tight', 'tight'), art: ['front', ['#e8e6e2', '#e8572a']],
    fields: { letter: 'S', date: '17 | 09', studio: 'North Studio', a: 'Surface', b: '© Explorations\n2026', body: 'A visual journey through the lens of my own perspective. A work in progress from North Studio.', places: 'Prague\nVienna\nLjubljana' },
    html: (f, im) => `${img(im)}<div class="u-lc"><p class="mo-dw u-lc-l">${esc(f.letter)}</p>${rule('top:10%;left:6%;right:6%')}${p(f.date, 'left:6%;top:11.5%')}${p(f.studio, 'left:52%;top:11.5%')}${rule('top:36%;left:6%;right:6%')}<p class="mo-dw u-h u-lc-h" style="left:6%;top:37.5%">${esc(f.a)}</p><p class="mo-dw u-h u-lc-h" style="left:52%;top:37.5%">${lines(f.b)}</p>${rule('top:84%;left:6%;right:6%')}${p(f.body, 'left:6%;top:85.5%;width:44%')}${p(f.places, 'left:52%;top:85.5%')}</div>` },

  { id: 'u-three', name: 'Three quiet columns', cat: 'Swiss', look: L('#ffffff', '#111111', '#111111', '#ffffff', '#ffffff', 'tight', 'tight'),
    fields: { a: 'NORTH. S', b: 'Art curation\nprojects', c: 'Studio\nNorth' },
    html: (f) => `<div class="u-three"><p class="mo-dw u-h u-th-a"><sup>a</sup>${esc(f.a)}<sup>©</sup></p><p class="u-s u-th-b"><sup>b</sup>${lines(f.b)}</p><p class="u-s u-th-b"><sup>c</sup>${lines(f.c)}</p></div>` },

  { id: 'u-services', name: 'Services poster', cat: 'Swiss', look: L('#dfe1e2', '#ffffff', '#ffffff', '#dfe1e2', '#dfe1e2', 'tight', 'tight'), art: ['object', ['#dfe1e2', '#8a3a3a']],
    fields: { head: 'North Digital', pill: 'Services', foot: 'CZ,\nPrague\n2026' },
    html: (f, im, b) => `${img(im)}${mark(b, 'left:50%;top:var(--m);translate:-50% 0', 'sm')}<p class="mo-dw u-h u-sv-h">${esc(f.head)}</p><p class="u-pill" style="left:50%;top:calc(var(--m) + var(--u)*22);translate:-50% 0">${esc(f.pill)}</p><p class="mo-dw u-h u-sv-f">${lines(f.foot)}</p>` },

  { id: 'u-workshop', name: 'Workshop list', cat: 'Swiss', slots: ['Left photo', 'Right photo'], look: L('#ffffff', '#111111', '#111111', '#ffffff', '#ebebeb', 'tight', 'tight'), art: ['object', ['#ebebeb', '#9a9a9a']],
    fields: { head: 'North Digital\nPrague Workshop', date: '24, Nov', list: 'Paid ads.\nLead generation\nS.E.O\nWeb dev.', a: 'Special guest\nworkshop', b: 'Karlín Hall\n24th Nov.', pill: 'Save your spot' },
    html: (f, im, b, c, ims = []) => `${mark(b, 'left:50%;top:calc(var(--m)*.6);translate:-50% 0', 'sm')}<p class="mo-dw u-h u-ws-h">${lines(f.head)}</p><p class="u-pill grey" style="left:50%;top:calc(var(--m) + var(--u)*19.4);translate:-50% 0">${esc(f.date)}</p><p class="u-ws-l">${lines(f.list)}</p><div class="u-ws-ph" style="left:0">${img(ims[0] || im)}</div><div class="u-ws-ph" style="left:50%">${img(ims[1] || im)}</div><p class="mo-dw u-h u-ws-c" style="left:var(--m)">${lines(f.a)}</p><p class="mo-dw u-h u-ws-c" style="left:calc(50% + var(--u)*2)">${lines(f.b)}</p><p class="u-pill grey" style="left:50%;bottom:calc(var(--m)*.5);translate:-50% 0">${esc(f.pill)}</p>` },

  { id: 'u-tracks', name: 'Track list', cat: 'Swiss', look: L('#ffffff', '#111111', '#111111', '#ffffff', '#ffffff', 'tight', 'tight'),
    fields: { list: '01: Low light era\n02: Back to it\n03: Sharp edges\n04: Blue\n05: If they see me\n06: Rum and rain\n07: Learning you\n08: Late again\n09: Silver\n10: The hundred' },
    html: (f) => `<p class="mo-dw u-tr">${lines(f.list)}</p>` },

  { id: 'u-square', name: 'Square over a photo', cat: 'Swiss', look: L('#ffffff', '#111111', '#111111', '#ffffff', '#ffffff', 'tight', 'tight'), art: ['front', ['#eeeeee', '#5a3a2a']],
    fields: { name: 'Lia Moreno', word: 'Blue' },
    html: (f, im) => `${img(im)}<div class="u-sq"></div><p class="mo-dw u-h u-sq-t" style="left:calc(21% + var(--u)*1.5)">${esc(f.name)}</p><p class="mo-dw u-h u-sq-t" style="right:calc(21% + var(--u)*1.5);text-align:right">${esc(f.word)}</p>` },

  { id: 'u-sketch', name: 'Sketch cards', cat: 'Swiss', look: L('#ffffff', '#111111', '#111111', '#ffffff', '#f8f8f8', 'tight', 'tight'),
    fields: { studio: 'North Design Studio', tag: 'Turning ideas into clear,\nmeaningful identities.', who: 'Anna North\nDirector & founder', web: 'w:', url: 'www.north.studio' },
    html: (f) => `<div class="u-sk u-sk-a">${p(f.studio, 'left:0;right:0;top:9%;text-align:center;font-size:calc(var(--u)*2.6)')}<div class="u-sk-ic">${sym('circle')}${sym('rays')}${sym('spiral')}</div></div><div class="u-sk u-sk-b">${p(f.tag, 'left:7%;top:calc(var(--u)*2.2);font-size:calc(var(--u)*2.6)')}${p(f.who, 'left:34%;top:calc(var(--u)*8.4);font-size:calc(var(--u)*2.6)')}${p(f.web, 'left:7%;top:calc(var(--u)*14.4);font-size:calc(var(--u)*2.6)')}${p(f.url, 'left:34%;top:calc(var(--u)*14.4);font-size:calc(var(--u)*2.6)')}</div>` },

  { id: 'u-giant-cols', name: 'Giant letters in columns', cat: 'Swiss', look: L('#ffffff', '#111111', '#111111', '#ffffff', '#ffffff', 'tight', 'tight'),
    fields: { a: 'N', b: 'R', c: 'S', c1: 'North Studio.\nCZ.', c2: 'Project proposal.\n2026.\n\nOld Town\nArchitects.', c3: '', t1: 'T: +420 123 456 789\nA: Karlínská 12,\nPrague, Czechia', t2: 'T: +44 20 7620 4800\nA: 22 Little Street,\nLondon, UK', f2: 'North Studio', f3: '2026' },
    html: (f) => `${['a', 'b', 'c'].map((k, i) => `<p class="mo-dw u-gc" style="left:calc(${i} * 33.333% + var(--u)*2)">${esc(f[k])}</p>`).join('')}<i class="u-vr" style="left:33.333%"></i><i class="u-vr" style="left:66.666%"></i>${p(f.c1, 'left:calc(var(--u)*2.4);top:46%')}${p(f.c2, 'left:calc(33.333% + var(--u)*2.4);top:46%')}${p(f.t1, 'left:calc(var(--u)*2.4);top:66%')}${p(f.t2, 'left:calc(33.333% + var(--u)*2.4);top:66%')}${p(f.f2, 'left:calc(33.333% + var(--u)*2.4);bottom:calc(var(--u)*2)')}${p(f.f3, 'left:calc(66.666% + var(--u)*2.4);bottom:calc(var(--u)*2)')}` },

  { id: 'u-dot-cols', name: 'Dots and columns', cat: 'Swiss', look: L('#ffffff', '#111111', '#111111', '#ffffff', '#ffffff', 'tight', 'tight'),
    fields: { word: 'NRS', dots: 'NRS', c1: 'North Studio.\nCZ.', c2: 'Project proposal.\n2026.', body: 'You have the design talent; we have the ways to help you reach the right clients. Good stories already exist in your projects, people and recognition. Our job is to bring them out, clearly and online.', year: '2026' },
    html: (f) => `<p class="mo-dw u-dc-w">${esc(f.word)}</p>${dm(f.dots, '', 'left:58%;top:calc(var(--m) + var(--u)*2);width:calc(42% - var(--m))')}<i class="u-vr" style="left:18%;top:0;bottom:0"></i><i class="u-vr" style="left:36%;top:0;bottom:0"></i><i class="u-vr" style="left:54%;top:0;bottom:0"></i>${p(f.c1, 'left:var(--m);top:40%;width:12%', 'u-xs')}${p(f.c2, 'left:calc(18% + var(--u)*1.5);top:40%;width:15%', 'u-xs')}${p(f.body, 'left:calc(54% + var(--u)*2);right:var(--m);top:40%', 'u-xs')}${p(f.year, 'left:calc(54% + var(--u)*2);top:62%', 'u-xs')}` },

  { id: 'u-house', name: 'House and caption', cat: 'Swiss', look: L('#ffffff', '#111111', '#111111', '#ffffff', '#ffffff', 'tight', 'tight'), art: ['up', ['#2a3a2e', '#c8d2c8']],
    fields: { name: 'Tiny House Studio', grey: 'NORA', year: '2026', city: 'Brno, CZ', body: 'We help architecture studios show their work, thinking and awards online. Our clients work across houses, hotels, reuse, civic and cultural projects.', a: 'Est. 2022', b: 'CZ' },
    html: (f, im) => `<div class="u-hs-ph">${img(im)}</div><p class="mo-dw u-h u-hs-n" style="left:var(--m)">${esc(f.name)}</p><p class="mo-dw u-h u-hs-n" style="left:62%;opacity:.22">${esc(f.grey)}</p>${p(f.year, 'left:var(--m);top:calc(70% + var(--u)*6.2)')}${p(f.city, 'left:62%;top:calc(70% + var(--u)*6.2)')}${p(f.body, 'left:var(--m);right:var(--m);bottom:calc(var(--m) + var(--u)*4)')}${p(f.a, 'left:var(--m);bottom:var(--m)')}${p(f.b, 'left:22%;bottom:var(--m)')}` },

  /* ---------- new combinations: textures, glitches, symbols ---------- */
  { id: 'u-grain-word', name: 'Grain and one word', cat: 'Swiss', look: L('#ff5a1f', '#111111', '#111111', '#ff5a1f', '#ff5a1f', 'condensed', 'tight'),
    fields: { word: 'LOUD', a: 'Vol. 04', b: 'Friday\n21:00', c: 'Basement club\nKarlín, Prague' },
    html: (f) => `${tex('grain', 'opacity:.55')}<p class="mo-dw u-gw">${esc(f.word)}</p>${p(f.a, 'left:var(--m);top:var(--m)')}${sym('node', '', 'right:var(--m);top:var(--m);width:calc(var(--u)*13)')}${p(f.b, 'left:var(--m);bottom:var(--m)')}${p(f.c, 'right:var(--m);bottom:var(--m);text-align:right')}` },

  { id: 'u-glitch', name: 'Signal glitch', cat: 'Swiss', look: L('#050505', '#ffffff', '#c9f04b', '#050505', '#050505', 'tight', 'mono'),
    fields: { word: 'SIGNAL\nLOST', a: 'CH 04 / 21:00', b: 'Live set, no replay', c: 'north.fm' },
    html: (f) => `${tex('scan')}<p class="mo-dw u-gl" data-t="${esc(f.word)}">${esc(f.word)}</p>${p(f.a, 'left:var(--m);top:var(--m);font-family:var(--ftv)')}<p class="u-s u-rec" style="right:var(--m);top:var(--m)"><i></i>REC</p>${p(f.b, 'left:var(--m);bottom:var(--m)')}${p(f.c, 'right:var(--m);bottom:var(--m);color:var(--accent)')}` },

  { id: 'u-halftone', name: 'Halftone fade', cat: 'Swiss', look: L('#ffffff', '#111111', '#111111', '#ffffff', '#ffffff', 'tight', 'tight'), art: G,
    fields: { head: 'Noise\nis a signal', a: 'Issue 07', b: 'Printed matter\nfor quiet people' },
    html: (f, im) => `${img(im, 'grey')}${tex('half')}<p class="mo-dw u-h u-ht-h">${lines(f.head)}</p>${p(f.a, 'left:var(--m);top:var(--m);color:#fff')}${p(f.b, 'right:var(--m);bottom:var(--m);text-align:right')}` },

  { id: 'u-nodes', name: 'Node map', cat: 'Swiss', look: L('#f2f1ec', '#111111', '#1f3fe6', '#f2f1ec', '#f2f1ec', 'tight', 'mono'),
    fields: { head: 'Everything\nconnects', a: 'Systems talk / 03', b: 'Thursday 18:00\nOpen to all', c: 'north.studio/talks' },
    html: (f) => `${tex('grid')}<p class="mo-dw u-h u-nd-h">${lines(f.head)}</p>${sym('node', 'u-c', 'width:calc(var(--u)*56);top:58%;color:var(--accent)')}${p(f.a, 'left:var(--m);top:var(--m);font-family:var(--ftv)')}${p(f.b, 'left:var(--m);bottom:var(--m)')}${p(f.c, 'right:var(--m);bottom:var(--m);text-align:right;font-family:var(--ftv)')}` },

  { id: 'u-symbols', name: 'Symbol grid', cat: 'Swiss', look: L('#ffffff', '#111111', '#e8401c', '#ffffff', '#ffffff', 'tight', 'tight'),
    fields: { head: 'Nine ways\nto say it', a: 'Icon set, free', b: 'north.studio' },
    html: (f) => `<div class="u-sg">${['burst', 'node', 'aster', 'flower', 'target', 'quarters', 'star', 'dots', 'half'].map((k, i) => `<span${i === 4 ? ' class="on"' : ''}>${sym(k)}</span>`).join('')}</div><p class="mo-dw u-h u-sg-h">${lines(f.head)}</p>${p(f.a, 'right:var(--m);bottom:calc(var(--m) + var(--u)*3.2);text-align:right')}${p(f.b, 'right:var(--m);bottom:var(--m);text-align:right;color:var(--accent)')}` },

  { id: 'u-slices', name: 'Sliced photo', cat: 'Swiss', look: L('#0a0a0a', '#ffffff', '#ff2a4a', '#0a0a0a', '#0a0a0a', 'tight', 'tight'), art: K,
    fields: { word: 'Out of sync', a: 'New single', b: 'Out now everywhere' },
    html: (f, im) => `${slices(im)}<p class="mo-dw u-h u-slw">${esc(f.word)}</p>${p(f.a, 'left:var(--m);top:var(--m)')}${p(f.b, 'right:var(--m);top:var(--m);text-align:right')}` },

  { id: 'u-outline', name: 'Outline giant', cat: 'Swiss', look: L('#111111', '#ffffff', '#ffffff', '#111111', '#111111', 'black', 'tight'), art: K,
    fields: { word: 'MOVE', a: 'Spring drop', b: 'Run club · every Sunday 08:00' },
    html: (f, im) => `${img(im, 'grey')}<div class="u-dim" style="opacity:.25"></div><p class="mo-dw u-ol">${esc(f.word)}</p>${p(f.a, 'left:var(--m);top:var(--m)')}${p(f.b, 'left:var(--m);bottom:var(--m)')}${sym('star', '', 'right:var(--m);bottom:var(--m);width:calc(var(--u)*9)')}` },

  { id: 'u-scan', name: 'Scan lines', cat: 'Swiss', look: L('#0a0a0a', '#ffffff', '#ff5a1f', '#0a0a0a', '#0a0a0a', 'tight', 'mono'), art: K,
    fields: { head: 'Night\nfootage', a: '00:21:07:14', b: 'CAM 2', c: 'Short film, 9 min\nPremiere 12.12.' },
    html: (f, im) => `${img(im, 'grey')}${tex('scan', 'opacity:.9')}<p class="mo-dw u-h u-sc-h">${lines(f.head)}</p><p class="u-s u-rec" style="left:var(--m);top:var(--m);font-family:var(--ftv)"><i></i>${esc(f.a)}</p>${p(f.b, 'right:var(--m);top:var(--m);font-family:var(--ftv)')}${p(f.c, 'right:var(--m);bottom:var(--m);text-align:right')}` },

  { id: 'u-dot-word', name: 'Dot matrix word', cat: 'Swiss', look: L('#0b0b0b', '#ffffff', '#c9f04b', '#0b0b0b', '#0b0b0b', 'tight', 'tight'),
    fields: { dots: 'OPEN', a: 'Studio open day', b: 'Saturday 10–18\nKarlínská 12, Prague', c: 'Free entry' },
    html: (f) => `${dm(f.dots, 'u-c', 'width:calc(100% - var(--m)*2);top:46%;color:var(--accent)')}${p(f.a, 'left:var(--m);top:var(--m)')}${p(f.b, 'left:var(--m);bottom:var(--m)')}${p(f.c, 'right:var(--m);bottom:var(--m);color:var(--accent)')}` },

  { id: 'u-stamp', name: 'Round stamp', cat: 'Swiss', look: L('#efe9df', '#111111', '#e8401c', '#efe9df', '#efe9df', 'tight', 'tight'),
    fields: { ring: 'Made slowly · made well · made in Prague · ', head: 'Small batch\nceramics', a: 'Market stall 14', b: 'Every first Sunday' },
    html: (f) => `${tex('grain', 'opacity:.4')}<svg class="u-stampring u-c" viewBox="0 0 100 100" style="top:40%;width:calc(var(--u)*52)" aria-hidden="true"><defs><path id="u-ring" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0"/></defs><text><textPath href="#u-ring" textLength="236">${esc(String(f.ring).toUpperCase())}</textPath></text></svg>${sym('burst', 'u-c', 'top:40%;width:calc(var(--u)*20);color:var(--accent)')}<p class="mo-dw u-h u-st-h">${lines(f.head)}</p>${p(f.a, 'left:var(--m);top:var(--m)')}${p(f.b, 'right:var(--m);top:var(--m);text-align:right')}` },

  { id: 'u-split-word', name: 'Half solid word', cat: 'Swiss', look: L('#ffffff', '#111111', '#111111', '#ffffff', '#ffffff', 'tight', 'tight'),
    fields: { word: 'Studio', a: 'Half done is\nhalf the fun', b: 'Process notes, vol. 2', c: 'north.studio' },
    html: (f) => `${rule('top:30%')}<p class="mo-dw u-sw" data-t="${esc(f.word)}">${esc(f.word)}</p>${rule('top:62%')}${p(f.a, 'left:var(--m);top:var(--m)')}${sym('quarters', '', 'right:var(--m);top:var(--m);width:calc(var(--u)*10)')}${p(f.b, 'left:var(--m);bottom:var(--m)')}${p(f.c, 'right:var(--m);bottom:var(--m)')}` },

  { id: 'u-spec', name: 'Spec sheet', cat: 'Swiss', look: L('#f4f4f2', '#111111', '#1f3fe6', '#f4f4f2', '#f4f4f2', 'tight', 'mono'),
    fields: { head: 'Model 01', rows: 'Weight — 1.2 kg\nSize — 42 × 30 cm\nMaterial — recycled steel\nFinish — powder coat\nMade in — Czechia\nPrice — 240 €', foot: 'Spec sheet / north objects' },
    html: (f) => `${tex('grid')}<p class="mo-dw u-h u-spec-h">${esc(f.head)}</p>${sym('aster', '', 'right:var(--m);top:var(--m);width:calc(var(--u)*16);color:var(--accent)')}<div class="u-rows">${list(f.rows).slice(0, 7).map((r) => { const [k, v] = r.split(/\s+—\s+/); return `<div><span>${esc(k)}</span><b>${esc(v ?? '')}</b></div>`; }).join('')}</div>${p(f.foot, 'left:var(--m);bottom:var(--m);font-family:var(--ftv)')}` },

  { id: 'u-paper', name: 'Paper quote', cat: 'Swiss', look: L('#efe8da', '#1b1a17', '#d9381e', '#efe8da', '#efe8da', 'tight', 'tight'),
    fields: { quote: '“Make fewer things, and make them matter.”', who: 'From the studio wall', foot: 'North Studio · notes' },
    html: (f) => `${tex('grain', 'opacity:.6')}${sym('aster', '', 'left:var(--m);top:var(--m);width:calc(var(--u)*11);color:var(--accent)')}<p class="mo-dw u-h u-pq">${esc(f.quote)}</p>${p(f.who, 'left:var(--m);bottom:calc(var(--m) + var(--u)*3.2)')}${p(f.foot, 'left:var(--m);bottom:var(--m);opacity:.6')}` },

  { id: 'u-blur', name: 'Motion word', cat: 'Swiss', look: L('#1f3fe6', '#ffffff', '#ffffff', '#1f3fe6', '#1f3fe6', 'tight', 'tight'), art: ['front', ['#0a1a5a', '#c9d4f0']],
    fields: { word: 'Faster', a: 'Track night', b: '5 km · 10 km\nWednesdays 19:00' },
    html: (f, im) => `<div class="u-bl-ph">${img(im, 'grey')}</div><p class="mo-dw u-blw">${esc(f.word)}</p>${p(f.a, 'left:var(--m);top:var(--m)')}${p(f.b, 'left:var(--m);bottom:var(--m)')}${sym('arcs', '', 'right:var(--m);bottom:var(--m);width:calc(var(--u)*14)')}` },

  { id: 'u-dot-photo', name: 'Dots over a photo', cat: 'Swiss', look: L('#111111', '#ffffff', '#ffffff', '#111111', '#111111', 'tight', 'tight'), art: K,
    fields: { dots: 'NOW', a: 'Exhibition', b: '12.03 — 30.04', c: 'North gallery, Prague' },
    html: (f, im) => `${img(im, 'grey')}<div class="u-dim" style="opacity:.3"></div>${dm(f.dots, '', 'left:var(--m);top:var(--m);width:58%')}${p(f.a, 'right:var(--m);top:var(--m);text-align:right')}${p(f.b, 'left:var(--m);bottom:calc(var(--m) + var(--u)*3.2)')}${p(f.c, 'left:var(--m);bottom:var(--m)')}` },

  { id: 'u-sketch-photo', name: 'Doodles on a photo', cat: 'Swiss', look: L('#f4f4f2', '#111111', '#111111', '#f4f4f2', '#f4f4f2', 'tight', 'tight'), art: G,
    fields: { head: 'Draw\nfirst', a: 'Sketchbook club', b: 'Tuesdays, 18:00\nbring a pencil' },
    html: (f, im) => `<div class="u-sp-ph">${img(im, 'grey')}</div>${sym('circle', '', 'left:54%;top:12%;width:calc(var(--u)*30);color:#fff')}${sym('spiral', '', 'left:16%;top:40%;width:calc(var(--u)*16);color:#fff')}<p class="mo-dw u-h u-spp-h">${lines(f.head)}</p>${p(f.a, 'left:var(--m);top:var(--m)')}${p(f.b, 'right:var(--m);bottom:var(--m);text-align:right')}` },
];

const GRAIN = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .9 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export const more9Css = `
.bi-ad .u-s{position:absolute;z-index:5;margin:0;font-family:var(--ftv);font-size:calc(var(--u)*1.9);line-height:1.18;font-weight:500;letter-spacing:-.01em}
.bi-ad .u-xs{position:absolute;z-index:5;margin:0;font-family:var(--ftv);font-size:calc(var(--u)*1.45);line-height:1.2;font-weight:500}
.bi-ad .u-h{font-weight:500;letter-spacing:-.04em;line-height:.94;margin:0}
.bi-ad .u-rule{position:absolute;z-index:4;left:var(--m);right:var(--m);height:0;border-top:1px solid currentColor;opacity:.55}
.bi-ad .u-vr{position:absolute;z-index:4;top:0;bottom:0;width:0;border-left:1px solid currentColor;opacity:.45}
.bi-ad .u-dim{position:absolute;inset:0;z-index:1;background:#000}
.bi-ad .u-tex{position:absolute;inset:0;z-index:2;pointer-events:none}
.bi-ad .u-grain{background:url("${GRAIN}") 0 0/calc(var(--u)*34) calc(var(--u)*34);mix-blend-mode:multiply}
.bi-ad .u-grid{background:repeating-linear-gradient(90deg,currentColor 0 1px,transparent 1px calc(var(--u)*5)),repeating-linear-gradient(0deg,currentColor 0 1px,transparent 1px calc(var(--u)*5));opacity:.08}
.bi-ad .u-scan{background:repeating-linear-gradient(0deg,rgba(0,0,0,.5) 0 1px,transparent 1px 3px),radial-gradient(ellipse at center,transparent 55%,rgba(0,0,0,.55));z-index:3}
.bi-ad .u-half{background:radial-gradient(circle,var(--bg) 0 38%,transparent 41%) 0 0/calc(var(--u)*1.7) calc(var(--u)*1.7);-webkit-mask:linear-gradient(transparent 30%,#000 78%);mask:linear-gradient(transparent 30%,#000 78%);z-index:2}
.bi-ad .u-sym{position:absolute;z-index:4;height:auto;aspect-ratio:1;fill:currentColor;overflow:visible}
.bi-ad .u-c{left:50%;translate:-50% -50%}
.bi-ad .u-dm{position:absolute;z-index:4;height:auto;fill:currentColor}
.bi-ad .u-scrib{position:absolute;z-index:6;pointer-events:none;width:auto;height:auto;color:var(--ink)}
.bi-ad .u-rings{position:absolute;z-index:4;width:calc(100% - var(--m)*2);height:auto;color:#fff}
.bi-ad .u-mark{position:absolute;z-index:5;font-family:var(--fdv);font-weight:600;font-size:calc(var(--u)*2.6);letter-spacing:.08em} .bi-ad .u-mark .bi-logo{height:calc(var(--u)*3.6*var(--ls,1))}
.bi-ad .u-pill{position:absolute;z-index:5;margin:0;padding:calc(var(--u)*.5) calc(var(--u)*2.2);border-radius:99px;background:#fff;color:#111;font-family:var(--ftv);font-size:calc(var(--u)*1.7);white-space:nowrap}
.bi-ad .u-pill.grey{background:color-mix(in srgb,var(--ink) 10%,var(--bg));color:var(--ink);font-size:calc(var(--u)*1.4)}
.bi-ad .u-split{display:flex;justify-content:space-between;left:var(--m);right:var(--m)}
/* pass */
.bi-ad .u-pass-h{font-size:calc(var(--u)*8.4)} .bi-ad .u-pass-2{font-size:calc(var(--u)*8.4);font-weight:400}
/* index */
.bi-ad .u-idx{position:absolute;z-index:3;left:var(--m);right:var(--m);top:calc(var(--m) + var(--u)*6);bottom:var(--m);display:flex;flex-direction:column}
.bi-ad .u-idx-r{flex:1;display:grid;grid-template-columns:24% 1fr;gap:4%;border-top:1px solid color-mix(in srgb,var(--ink) 35%,transparent);padding-top:calc(var(--u)*.8);min-height:0;overflow:hidden}
.bi-ad .u-idx-r span{font-family:var(--ftv);font-size:calc(var(--u)*1.05);line-height:1.25;font-weight:500;white-space:pre}
.bi-ad .u-idx-r b{font-family:var(--fdv);font-size:calc(var(--u)*6.6);font-weight:500;letter-spacing:-.04em;line-height:1;white-space:nowrap}
.bi-ad .u-idx-r.dim{opacity:.13}
/* binder */
.bi-ad .u-rot{position:absolute;left:50%;top:50%;width:100cqh;height:100cqw;translate:-50% -50%;rotate:-90deg;z-index:3;display:flex;--u:min(1cqw,1cqh);align-items:center;justify-content:space-between;padding:0 calc(var(--u)*4);box-sizing:border-box}
.bi-ad .u-box{position:relative;padding:calc(var(--u)*3.4) calc(var(--u)*2.4)}
.bi-ad .u-box .d{position:absolute;width:calc(var(--u)*1.4);aspect-ratio:1;border-radius:50%;background:currentColor}
.bi-ad .u-box .tl{left:0;top:0}.bi-ad .u-box .tr{right:0;top:0}.bi-ad .u-box .bl{left:0;bottom:0}.bi-ad .u-box .br{right:0;bottom:0}
.bi-ad .u-b-name .u-h{position:relative;font-size:min(calc(var(--u)*17),11cqh);white-space:nowrap}
.bi-ad .u-b-low .u-xs,.bi-ad .u-b-top .u-s{font-size:calc(var(--u)*1.8)} .bi-ad .u-rot .u-s,.bi-ad .u-rot .u-xs{white-space:nowrap} .bi-ad .u-b-low{display:flex;gap:calc(var(--u)*3);align-items:flex-start}
.bi-ad .u-hole{position:absolute;z-index:4;left:calc(var(--u)*-2);width:calc(var(--u)*7);height:calc(var(--u)*2);border-radius:99px;background:color-mix(in srgb,var(--ink) 70%,transparent)}
/* burst */
.bi-ad .u-burst-m{font-size:calc(var(--u)*11);font-weight:300;letter-spacing:-.06em}
.bi-ad .u-cols{position:absolute;z-index:5;left:var(--m);right:var(--m);display:grid;grid-template-columns:repeat(5,1fr);gap:calc(var(--u)*1.5);align-items:end}
/* cards */
.bi-ad .u-card{position:absolute;z-index:3;left:20%;right:20%;height:31%;background:#fff;color:#111}
.bi-ad .u-card-a{top:13%} .bi-ad .u-card-b{top:54%}
.bi-ad .u-card-a .u-h{position:absolute;left:5%;top:4%;font-size:calc(var(--u)*16);font-weight:400;letter-spacing:-.03em}
.bi-ad .u-card-b .u-split{position:absolute;left:5%;right:5%;top:38%;font-size:calc(var(--u)*5.6);font-weight:400}
.bi-ad .u-cg{position:absolute;left:5%;right:5%;top:56%;display:grid;grid-template-columns:1fr 1fr;gap:calc(var(--u)*1.4) calc(var(--u)*2)}
.bi-ad .u-cg .u-s{font-size:calc(var(--u)*1.55);line-height:1.12;font-weight:400}
/* portfolio */
.bi-ad .u-pf-r{font-size:calc(var(--u)*7.6);font-weight:400;letter-spacing:-.03em}
/* letter card */
.bi-ad .u-lc{position:absolute;z-index:3;left:11%;right:11%;top:11%;bottom:11%;background:#fff;color:#111;overflow:hidden}
.bi-ad .u-lc .u-rule{opacity:.4}
.bi-ad .u-lc-l{left:-4%;right:-4%;top:-8%;text-align:center;font-size:calc(var(--u)*108);line-height:.9;font-weight:600;color:#dcdcdc;z-index:0;letter-spacing:-.06em}
.bi-ad .u-lc-h{font-size:calc(var(--u)*4.6);font-weight:600}
/* three */
.bi-ad .u-three{position:absolute;z-index:4;left:var(--m);right:var(--m);top:50%;translate:0 -50%;display:grid;grid-template-columns:1.3fr 1fr 1fr;align-items:start;gap:calc(var(--u)*2)}
.bi-ad .u-three p{position:relative;margin:0} .bi-ad .u-th-a{font-size:calc(var(--u)*6.4);font-weight:500} .bi-ad .u-th-b{font-size:calc(var(--u)*3.1);line-height:1.05;font-weight:500}
.bi-ad .u-three sup{font-size:calc(var(--u)*1);font-weight:500;vertical-align:top;margin-right:calc(var(--u)*.8);letter-spacing:0;position:relative;top:-.2em}
/* services */
.bi-ad .u-sv-h{left:0;right:0;top:calc(var(--m) + var(--u)*8);text-align:center;font-size:calc(var(--u)*9.4)}
.bi-ad .u-sv-f{left:0;right:0;bottom:var(--m);text-align:center;font-size:calc(var(--u)*5.4);font-weight:500;line-height:.92}
/* workshop */
.bi-ad .u-ws-h{left:0;right:0;top:calc(var(--m) + var(--u)*3);text-align:center;font-size:calc(var(--u)*7.4)}
.bi-ad .u-ws-l{position:absolute;z-index:4;left:0;right:0;top:calc(var(--m) + var(--u)*24.5);margin:0;text-align:center;font-family:var(--ftv);font-size:calc(var(--u)*6.6);font-weight:300;line-height:1;letter-spacing:-.03em}
.bi-ad .u-ws-ph{position:absolute;top:63%;width:50%;height:21%;overflow:hidden;background:var(--g2)}
.bi-ad .u-ws-c{top:84.6%;font-size:calc(var(--u)*3.4);font-weight:500;line-height:.95}
/* tracks */
.bi-ad .u-tr{left:0;right:0;top:50%;translate:0 -50%;text-align:center;font-size:calc(var(--u)*4.9);font-weight:500;line-height:1.02;color:color-mix(in srgb,var(--ink) 20%,var(--bg))}
/* square */
.bi-ad .u-sq{position:absolute;z-index:3;left:21%;right:21%;top:50%;aspect-ratio:1;translate:0 -50%;background:#fff}
.bi-ad .u-sq-t{top:50%;translate:0 -50%;font-size:calc(var(--u)*4.6);color:#111;z-index:4}
/* sketch */
.bi-ad .u-sk{position:absolute;z-index:3;left:22%;right:22%;background:var(--g2);box-shadow:0 calc(var(--u)*.3) calc(var(--u)*1.4) rgba(0,0,0,.08)}
.bi-ad .u-sk-a{top:24%;height:25%} .bi-ad .u-sk-b{top:50.5%;height:25%}
.bi-ad .u-sk .u-s{font-weight:500;line-height:1.08}
.bi-ad .u-sk-ic{position:absolute;left:4%;right:4%;top:46%;display:flex;justify-content:space-between}
.bi-ad .u-sk-ic .u-sym{position:relative;width:28%;color:#2a2a2a}
/* giant columns */
.bi-ad .u-gc{top:-2%;font-size:calc(var(--u)*44);font-weight:300;line-height:.9;letter-spacing:-.05em}
.bi-ad .u-dc-w{left:calc(var(--u)*1);top:var(--m);font-size:calc(var(--u)*20);font-weight:300;letter-spacing:-.05em;line-height:.8;width:52%;white-space:nowrap;overflow:hidden}
/* house */
.bi-ad .u-hs-ph{position:absolute;left:0;right:0;top:0;height:70%;overflow:hidden}
.bi-ad .u-hs-n{top:calc(70% + var(--u)*1.4);font-size:calc(var(--u)*4.4);font-weight:400}
/* grain word */
.bi-ad .u-gw{left:0;right:0;top:50%;translate:0 -50%;text-align:center;font-size:calc(var(--u)*44);line-height:.8;letter-spacing:-.04em;white-space:nowrap}
/* glitch */
.bi-ad .u-gl{left:var(--m);right:var(--m);top:50%;translate:0 -50%;font-size:calc(var(--u)*15);line-height:.86;letter-spacing:-.05em;white-space:pre-line;font-weight:700}
.bi-ad .u-gl::before,.bi-ad .u-gl::after{content:attr(data-t);position:absolute;inset:0;white-space:pre-line;mix-blend-mode:screen}
.bi-ad .u-gl::before{color:#ff2a4a;translate:calc(var(--u)*-.9) 0;clip-path:inset(8% 0 58% 0)}
.bi-ad .u-gl::after{color:#22e6ff;translate:calc(var(--u)*1.2) calc(var(--u)*.2);clip-path:inset(56% 0 10% 0)}
.bi-ad .u-rec{display:flex;align-items:center;gap:calc(var(--u)*1)} .bi-ad .u-rec i{width:calc(var(--u)*1.4);aspect-ratio:1;border-radius:50%;background:#ff2a2a}
/* halftone */
.bi-ad .u-ht-h{left:var(--m);bottom:calc(var(--m) + var(--u)*6);font-size:calc(var(--u)*11);z-index:5}
/* nodes */
.bi-ad .u-nd-h{left:var(--m);top:calc(var(--m) + var(--u)*5);font-size:calc(var(--u)*9)}
/* symbols */
.bi-ad .u-sg{position:absolute;z-index:4;left:var(--m);right:var(--m);top:var(--m);aspect-ratio:1;display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid currentColor;border-left:1px solid currentColor}
.bi-ad .u-sg span{display:grid;place-items:center;border-right:1px solid currentColor;border-bottom:1px solid currentColor}
.bi-ad .u-sg .u-sym{position:relative;width:52%} .bi-ad .u-sg .on{background:var(--accent);color:var(--bg)}
.bi-ad .u-sg-h{left:var(--m);bottom:var(--m);font-size:calc(var(--u)*7.4)}
/* slices */
.bi-ad .u-slices{position:absolute;inset:0;z-index:1;overflow:hidden}
.bi-ad .u-sl{position:absolute;left:-8%;right:-8%;overflow:hidden}
.bi-ad .u-sl-in{position:absolute;left:0;right:0}
.bi-ad .u-sl.tint::after{content:"";position:absolute;inset:0;background:var(--accent);mix-blend-mode:multiply}
.bi-ad .u-slw{left:var(--m);right:var(--m);bottom:var(--m);font-size:calc(var(--u)*12);z-index:5}
/* outline */
.bi-ad .u-ol{left:-2%;right:-2%;top:50%;translate:0 -50%;text-align:center;font-size:calc(var(--u)*29);line-height:.8;color:transparent;-webkit-text-stroke:calc(var(--u)*.35) var(--ink);white-space:nowrap;letter-spacing:-.03em}
/* scan */
.bi-ad .u-sc-h{left:var(--m);bottom:calc(var(--m) + var(--u)*7);font-size:calc(var(--u)*12);z-index:5}
/* stamp */
.bi-ad .u-stampring{position:absolute;z-index:4;height:auto;aspect-ratio:1;fill:currentColor;font-family:var(--ftv);font-size:7.2px;font-weight:600;letter-spacing:.06em}
.bi-ad .u-st-h{left:0;right:0;bottom:calc(var(--m) + var(--u)*3);text-align:center;font-size:calc(var(--u)*8.4)}
/* split word */
.bi-ad .u-sw{left:var(--m);right:var(--m);top:46%;translate:0 -50%;font-size:calc(var(--u)*24);line-height:.8;letter-spacing:-.05em;white-space:nowrap;color:transparent;-webkit-text-stroke:calc(var(--u)*.25) var(--ink)}
.bi-ad .u-sw::after{content:attr(data-t);position:absolute;inset:0;color:var(--ink);-webkit-text-stroke:0;clip-path:inset(0 0 50% 0)}
/* spec */
.bi-ad .u-spec-h{left:var(--m);top:var(--m);font-size:calc(var(--u)*11)}
.bi-ad .u-rows{position:absolute;z-index:4;left:var(--m);right:var(--m);top:38%;font-family:var(--ftv);font-size:calc(var(--u)*2)}
.bi-ad .u-rows div{display:flex;justify-content:space-between;padding:calc(var(--u)*1.2) 0;border-top:1px solid color-mix(in srgb,var(--ink) 40%,transparent)}
.bi-ad .u-rows b{font-weight:500}
/* paper */
.bi-ad .u-pq{left:var(--m);right:var(--m);top:26%;font-size:calc(var(--u)*8.6);line-height:1}
/* motion word */
.bi-ad .u-bl-ph{position:absolute;right:var(--m);top:var(--m);width:40%;aspect-ratio:3/4;overflow:hidden}
.bi-ad .u-blw{left:var(--m);top:56%;font-size:calc(var(--u)*20);letter-spacing:-.05em;white-space:nowrap;text-shadow:calc(var(--u)*-2) 0 calc(var(--u)*.8) rgba(255,255,255,.45),calc(var(--u)*-5) 0 calc(var(--u)*1.6) rgba(255,255,255,.25),calc(var(--u)*-9) 0 calc(var(--u)*2.6) rgba(255,255,255,.12)}
/* doodles */
.bi-ad .u-sp-ph{position:absolute;left:var(--m);right:var(--m);top:calc(var(--m) + var(--u)*5);bottom:calc(var(--m) + var(--u)*24);overflow:hidden}
.bi-ad .u-spp-h{left:var(--m);bottom:var(--m);font-size:calc(var(--u)*11)}
@container (min-aspect-ratio: 13/10){
  .bi-ad .u-pass-h,.bi-ad .u-pass-2{font-size:calc(var(--u)*7.4)} .bi-ad .u-rings{width:56%}
  .bi-ad .u-idx-r{grid-template-columns:18% 1fr} .bi-ad .u-idx-r b{font-size:calc(var(--u)*5)}
  .bi-ad .u-card{left:6%;right:auto;width:42%;top:16%!important;height:68%} .bi-ad .u-card-b{left:52%}
  .bi-ad .u-lc{left:22%;right:22%;top:6%;bottom:6%} .bi-ad .u-lc-l{font-size:calc(var(--u)*100)}
  .bi-ad .u-sq{left:50%;right:auto;height:76%;translate:-50% -50%} .bi-ad .u-sq-t[style*="left"]{left:calc(50% - 38cqh + var(--u)*1.5)!important} .bi-ad .u-sq-t[style*="right"]{right:calc(50% - 38cqh + var(--u)*1.5)!important}
  .bi-ad .u-sk{left:30%;right:30%}
  .bi-ad .u-ws-l{font-size:calc(var(--u)*5)} .bi-ad .u-ws-ph{height:18%;top:64%}
  .bi-ad .u-sg{width:42%;right:auto} .bi-ad .u-sg-h{left:52%;bottom:auto;top:var(--m)}
  .bi-ad .u-tr{font-size:calc(var(--u)*4)} .bi-ad .u-hs-ph{height:auto;bottom:0;width:56%;left:auto} .bi-ad .u-hs-n[style*="62%"]{left:var(--m)!important;top:calc(var(--m) + var(--u)*6)} .bi-ad .u-hs-n{top:var(--m)}
  .bi-ad .u-cols{grid-template-columns:repeat(5,auto);justify-content:space-between}
  .bi-ad .u-sp-ph{left:40%} .bi-ad .u-bl-ph{width:30%;aspect-ratio:auto;bottom:var(--m)}
  .bi-ad .u-rows{left:46%;top:var(--m)}
  .bi-ad .u-rot{width:100cqw;height:100cqh;rotate:0deg} .bi-ad .u-hole{display:none}
  .bi-ad .u-half{-webkit-mask:linear-gradient(transparent 10%,#000 55%);mask:linear-gradient(transparent 10%,#000 55%)}
}
@container (max-aspect-ratio: 7/10){
  .bi-ad .u-card{left:var(--m);right:var(--m);height:26%} .bi-ad .u-card-a{top:18%} .bi-ad .u-card-b{top:50%}
  .bi-ad .u-sk{left:var(--m);right:var(--m)} .bi-ad .u-sk-a{top:28%;height:20%} .bi-ad .u-sk-b{top:49.5%;height:20%}
  .bi-ad .u-sq{left:var(--m);right:var(--m)} .bi-ad .u-sq-t[style*="left"]{left:calc(var(--m) + var(--u)*3)!important} .bi-ad .u-sq-t[style*="right"]{right:calc(var(--m) + var(--u)*3)!important}
  .bi-ad .u-three{grid-template-columns:1fr;gap:calc(var(--u)*5)}
  .bi-ad .u-gc{font-size:calc(var(--u)*40)}
}`;
