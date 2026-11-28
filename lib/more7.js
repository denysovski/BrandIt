// BrandIt: the seventh set, from the user's own Figma templates made for past clients:
// grey editorial print layouts, condensed-serif posters, giant typographic sheets, orange and blue gradient brands,
// tech partner cards, event posters, accent-bar ads, macro product sheets, sport motion type, run club stories,
// neon beauty posts and carousel covers. Text is placeholder copy; the brand's logo replaces any mark.
// Each template uses at most two font families: the display font (--fdv) and the text font (--ftv).
import { esc, lines, list, img, L, logo } from './motion.js?v=36';

const mix = (s = '') => lines(s).replace(/\*([^*]+)\*/g, '<em class="s-acc">$1</em>').replace(/_([^_]+)_/g, '<i class="s-it">$1</i>');
const t = (s, style, cls = '') => `<p class="s-t ${cls}" style="${style}">${lines(s)}</p>`;
const mk = (b, f, cls = '') => (b.logo || f ? `<span class="s-mk ${cls}">${b.logo ? logo(b, f) : `<span class="bi-logotext">${esc(f)}</span>`}</span>` : '');
const arrow = (cls = '') => `<svg class="s-arr ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M8 18h10V8"/></svg>`;
// our own ring mark: six dots joined by short bridges
const ringMark = () => { let s = ''; for (let i = 0; i < 6; i++) { const a = (i * Math.PI) / 3 - Math.PI / 2, x = 50 + 32 * Math.cos(a), y = 50 + 32 * Math.sin(a); s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="11"/>`; } return `<svg viewBox="0 0 100 100" aria-hidden="true"><g fill="currentColor">${s}</g><circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" stroke-width="6" stroke-dasharray="6 27.5" stroke-dashoffset="-14"/></svg>`; };
const spinner = () => { let s = ''; for (let i = 0; i < 10; i++) { const a = (i * Math.PI) / 5; s += `<rect x="47" y="8" width="6" height="18" rx="3" transform="rotate(${i * 36} 50 50)" opacity="${(0.35 + (i / 10) * 0.65).toFixed(2)}"/>`; } return `<svg class="s-spin" viewBox="0 0 100 100" aria-hidden="true"><g fill="currentColor">${s}</g></svg>`; };
const blobs = () => { let s = ''; for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) { const x = 8 + c * 17 + (r % 2) * 8, y = 6 + r * 15; const tall = (r * 7 + c * 3) % 3 === 0; s += tall ? `<path d="M${x} ${y}a4 4 0 1 1 0 8a3 3 0 0 0 0 4a4 4 0 1 1 0 8a4 4 0 1 1 0-8a3 3 0 0 0 0-4a4 4 0 1 1 0-8Z" transform="translate(-4 0)"/>` : `<circle cx="${x}" cy="${y + 6}" r="4.2"/>`; } return `<svg class="s-blobs" viewBox="0 0 110 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g fill="var(--accent)">${s}</g></svg>`; };
const digits = (s, cls = '') => `<p class="s-digits ${cls}">${String(s).split('').map((ch) => (ch === '-' ? '<b class="dash">–</b>' : `<b>${esc(ch)}</b>`)).join('')}</p>`;

export const more7Templates = [
  // ---------- grey editorial print ----------
  { id: 's-inspired', name: 'Studio sheet', cat: 'Editorial', look: L('#e4e3e0', '#111111', '#111111', '#e4e3e0', '#cfcecb', 'grotesk', 'grotesk'), art: ['front', ['#cfcecb', '#3a3a3a']],
    fields: { head: 'Inspired\nstudio', body: 'A space for people who make things. Open desks, a print room and a long table for lunch. Come for a day, stay for a season.', side: 'The community space', num: '88', foot: 'Open studio day' },
    html: (f, im) => `<p class="mo-dw s-ins-h">${lines(f.head)}</p><p class="s-p" style="right:var(--m);top:calc(var(--m) + var(--u)*13);width:40%;text-align:center">${esc(f.body)}</p><p class="s-badge" style="right:calc(var(--m) + 18%);top:calc(var(--m) + var(--u)*27)">${esc(f.num)}</p><p class="s-t s-vert" style="left:var(--m);top:22%">${esc(f.side)}</p><div class="s-box" style="right:var(--m);bottom:calc(var(--m) + var(--u)*6);width:30%;height:24%">${img(im, 'grey')}</div>${t(f.foot, 'left:var(--m);bottom:var(--m)')}` },
  { id: 's-impact', name: 'Persistence photo', cat: 'Editorial', look: L('#111111', '#ffffff', '#ffffff', '#111111', '#111111', 'grotesk', 'grotesk'), art: ['front', ['#111111', '#9a9a9a']],
    fields: { head: 'The impact of\npersistence.', site: 'north.studio', day: '22', month: 'February', quote: '“Keep going, even when it is slow. Slow is still forward.”' },
    html: (f, im) => `${img(im, 'grey')}<div class="mo-shade"></div><p class="mo-dw s-imp-h">${lines(f.head)}</p>${t(f.site, 'left:var(--m);top:calc(var(--m) + var(--u)*14);text-transform:none;opacity:.7')}<p class="s-dots">•••</p><p class="mo-dw s-day">${esc(f.day)}<small>${esc(f.month)}</small></p><p class="s-p s-quote">${esc(f.quote)}</p>` },
  { id: 's-free-fonts', name: 'Four portraits', cat: 'Editorial', slots: ['Photo 1', 'Photo 2', 'Photo 3', 'Photo 4'], look: L('#e4e3e0', '#111111', '#111111', '#e4e3e0', '#cfcecb', 'grotesk', 'grotesk'), art: ['front', ['#cfcecb', '#3a3a3a']],
    fields: { a: 'Free(', b: ')fonts', body: 'Twelve typefaces we drew for our own work, now free for yours. Download the set and use them anywhere.', name: 'Mak', foot: '@north.type', date: '09-2026' },
    html: (f, im, b, c, ims = []) => `<p class="mo-dw s-ff"><span>${esc(f.a)}</span><span>${esc(f.b)}</span></p><p class="s-p s-ffb" style="left:46%;top:calc(var(--m) + var(--u)*6);width:30%">${esc(f.body)}</p><p class="mo-dw" style="left:0;right:0;top:44%;text-align:center;font-size:calc(var(--u)*3);font-weight:500">${esc(f.name)}</p>${t(f.foot, 'left:var(--m);bottom:calc(var(--m) + 28%)')}${t(f.date, 'right:var(--m);bottom:calc(var(--m) + 28%)')}<div class="s-row4">${[0, 1, 2, 3].map((i) => `<div>${img(ims[i] || im, 'grey')}</div>`).join('')}</div>` },
  { id: 's-date-card', name: 'Date on charcoal', cat: 'Editorial', look: L('#232323', '#f2f2f2', '#f2f2f2', '#232323', '#232323', 'grotesk', 'grotesk'), art: ['front', ['#232323', '#c9b8a8']],
    fields: { date: '09/12/2026', title: 'Golden\nhours', note: 'Concert for the\n12th anniversary', sign: 'La Lueur' },
    html: (f, im) => `<div class="s-box" style="left:var(--m);top:var(--m);width:58%;height:42%">${img(im)}</div><p class="mo-dw s-dc-d">${esc(f.date)}</p><p class="mo-dw s-dc-t">${lines(f.title)}</p>${t(f.note, 'left:var(--m);bottom:var(--m);text-transform:none;letter-spacing:0;opacity:.75')}<p class="mo-dw" style="right:var(--m);bottom:var(--m);font-size:calc(var(--u)*3.4);font-weight:400">${esc(f.sign)}</p>` },
  { id: 's-selection', name: 'Year and selection', cat: 'Editorial', look: L('#e9e8e5', '#111111', '#111111', '#e9e8e5', '#e9e8e5', 'grotesk', 'serif'),
    fields: { top: '12\nDecember\n01\nWinter 2027', credit: 'Weekly · Design\nNov 15 2028\nCrafted by North', year: '2024©', city: 'Atlanta · GA', issn: 'ISSN 9876-0520', word: 'Selections', it: 'selection' },
    html: (f) => `<div class="s-toprow">${list(f.top).slice(0, 4).map((x) => `<span>${esc(x)}</span>`).join('')}</div>${t(f.credit, 'left:0;right:0;top:24%;text-align:center')}<p class="mo-dw s-year">${esc(f.year)}</p>${t(f.city, 'left:0;right:0;top:58%;text-align:center')}${t(f.issn, 'left:0;right:0;bottom:calc(var(--m) + var(--u)*16);text-align:center')}<p class="mo-dw s-sel">${esc(f.word)}</p><p class="s-selit">${esc(f.it)}</p>` },
  { id: 's-dont-waste', name: 'Photo over a grey band', cat: 'Editorial', look: L('#e4e3e0', '#111111', '#111111', '#e4e3e0', '#e4e3e0', 'grotesk', 'grotesk'), art: ['front', ['#d9d9d6', '#2a2a2a']],
    fields: { label: 'Mentally\nstrong people', page: 'Page 26', head: 'Don’t waste\nenergy on things\nyou can’t control', a: 'Strong people focus on what they can change: their effort, their attitude and their next step.', b: 'They let the rest go, because worrying about it does not move anything forward.', cta: 'Click on the photo\nto read the full piece' },
    html: (f, im) => `<div class="s-dw-ph">${img(im, 'grey')}</div>${t(f.label, 'left:var(--m);top:var(--m);color:#fff')}${t(f.page, 'right:var(--m);top:var(--m);color:#fff')}<p class="mo-dw s-dw-h">${lines(f.head)}</p><p class="s-p" style="left:var(--m);bottom:calc(var(--m) + var(--u)*5);width:28%">${esc(f.a)}</p><p class="s-p" style="left:38%;bottom:calc(var(--m) + var(--u)*5);width:28%">${esc(f.b)}</p>${t(f.cta, 'right:var(--m);bottom:var(--m);text-align:right')}` },
  { id: 's-details', name: 'Details note', cat: 'Editorial', look: L('#e4e3e0', '#111111', '#111111', '#e4e3e0', '#cfcecb', 'grotesk', 'grotesk'), art: ['front', ['#cfcecb', '#7a5b4a']],
    fields: { head: 'Details.', body: 'Little things decide how a piece feels. The paper, the spacing, the way a line breaks. We look after all of them.', thanks: 'Thank you for\nvisiting my work\nand don’t forget\nto show some\nlove and support', foot: 'north.studio · 2026' },
    html: (f, im) => `<p class="mo-dw s-det-h">${esc(f.head)}</p>${arrow('s-det-a')}<p class="s-p s-detb" style="left:40%;top:34%;width:30%">${esc(f.body)}</p><div class="s-oval">${img(im)}</div><p class="mo-dw s-det-t">${lines(f.thanks)}</p>${t(f.foot, 'left:var(--m);bottom:var(--m)')}` },
  { id: 's-lounge', name: 'Lounge title', cat: 'Bold photo', look: L('#111111', '#ffffff', '#ffffff', '#111111', '#111111', 'wide', 'grotesk'), art: ['front', ['#111111', '#a59a92']],
    fields: { a: 'Fluid design\nfull service', b: 'Brand · 2026\nCreative direction', head: 'She’s beauty', sub: 'Lounge', body: 'Soft beauty, slow mornings and a room that feels like yours. Book an hour, leave with a little more light.' },
    html: (f, im) => `${img(im, 'grey')}<div class="mo-shade"></div>${t(f.a, 'left:var(--m);top:var(--m)')}${t(f.b, 'right:var(--m);top:var(--m);text-align:right')}<p class="mo-dw s-lg-h">${esc(f.head)}</p><p class="s-t" style="left:0;right:0;top:calc(50% + var(--u)*5);text-align:center;letter-spacing:.4em">${esc(f.sub)}</p><p class="s-p" style="left:var(--m);right:var(--m);bottom:var(--m);text-transform:uppercase;font-size:calc(var(--u)*1.6);columns:2;column-gap:calc(var(--u)*4)">${esc(f.body)}</p>` },
  { id: 's-vertical-city', name: 'Vertical city', cat: 'Editorial', look: L('#e4e3e0', '#111111', '#111111', '#e4e3e0', '#cfcecb', 'grotesk', 'grotesk'), art: ['front', ['#cfcecb', '#6a5a50']],
    fields: { city: 'Prague.11000', code: '01\n11000\nCentre', num: '16', body: 'An apartment on the river, rebuilt for light and quiet. Four rooms, one long view.' },
    html: (f, im) => `<p class="mo-dw s-vc">${esc(f.city)}</p><p class="mo-dw s-vc-code">${lines(f.code)}</p><p class="mo-dw" style="right:var(--m);top:var(--m);font-size:calc(var(--u)*5);font-weight:500">${esc(f.num)}</p><p class="s-p" style="left:34%;top:42%;width:30%">${esc(f.body)}</p><div class="s-box" style="right:0;bottom:0;width:46%;height:34%">${img(im, 'grey')}</div>` },
  // ---------- condensed and serif ----------
  { id: 's-reset', name: 'Blurred statement', cat: 'Bold photo', look: L('#8d8d8d', '#ffffff', '#ffffff', '#8d8d8d', '#8d8d8d', 'condensed', 'serif'), art: ['front', ['#8d8d8d', '#d8d8d8']],
    fields: { labels: 'Growth\nmindset\nNeural\nfocus\nEnergy\nrush\nAwareness\nboost\nFlow\nrelease', head: 'Reset your mental\nequilibrium', sub: 'Shape your story', a: '29', b: 'instagram.com/north', c: '31' },
    html: (f, im) => { const l = list(f.labels); const pairs = []; for (let i = 0; i < l.length; i += 2) pairs.push(l.slice(i, i + 2).join('<br>')); return `${img(im, 'soft')}<div class="s-labels">${pairs.slice(0, 5).map((p) => `<span>${p}</span>`).join('')}</div><p class="mo-dw s-rs-h">${lines(f.head)}</p><p class="s-t s-rs-s">${esc(f.sub)} <b>●</b></p>${t(f.a, 'left:var(--m);bottom:var(--m)')}${t(f.b, 'left:0;right:0;bottom:var(--m);text-align:center;text-transform:none')}${t(f.c, 'right:var(--m);bottom:var(--m)')}`; } },
  { id: 's-portfolio', name: 'Portfolio edition', cat: 'Editorial', look: L('#ebebe9', '#111111', '#111111', '#ebebe9', '#ebebe9', 'condensed', 'serif'), art: ['front', ['#cfcecb', '#4a3a30']],
    fields: { head: 'Portfolio edition', a: 'north\nstudio', b: 'Graphic and\nbrand designer', items: 'Exclusive web edition\nCurated work for\nevery mood\nDesigned for gifting\nor personal use\nOn trend and\nseasonal updates', handle: '@north.studio' },
    html: (f, im) => `<p class="mo-dw s-pf-h">${esc(f.head)}</p><p class="s-sf" style="left:var(--m);top:calc(var(--m) + var(--u)*14)">${lines(f.a)}</p><p class="s-sf" style="right:var(--m);top:calc(var(--m) + var(--u)*14);text-align:right">${lines(f.b)}</p><div class="s-list">${list(f.items).reduce((a, x, i) => (i % 2 ? (a[a.length - 1] += '<br>' + esc(x)) : a.push(esc(x)), a), []).slice(0, 4).map((x) => `<p>${x}</p>`).join('')}</div><div class="s-box" style="right:var(--m);bottom:calc(var(--m) + var(--u)*5);width:30%;height:28%">${img(im, 'grey')}</div><p class="s-sf" style="right:var(--m);bottom:var(--m)">${esc(f.handle)}</p>` },
  { id: 's-communicates', name: 'Staggered with a photo pill', cat: 'Editorial', look: L('#d9d9d6', '#111111', '#111111', '#d9d9d6', '#d9d9d6', 'condensed', 'serif'), art: ['front', ['#d9d9d6', '#3a3a3a']],
    fields: { row: 'Digital studio\n©2026\nVisual identity\nCobalt blue', a: 'Your / style communicates', b: 'Before', c: 'you truly', d: 'Clearly express it.', q: 'What is he trying to\nconvey?' },
    html: (f, im) => { const r = list(f.row).slice(0, 4).map((x) => `<span>${esc(x)}</span>`).join(''); return `<div class="s-row s-top">${r}</div><div class="s-row s-bot">${r}</div><i class="s-rule" style="left:var(--m);top:41.5%;width:10%"></i><p class="mo-dw s-cm a">${esc(f.a)}</p><p class="mo-dw s-cm b">${esc(f.b)}</p><span class="s-ppill">${img(im, 'grey')}</span><p class="mo-dw s-cm c">${esc(f.c)}</p><p class="mo-dw s-cm d">${esc(f.d)}</p><p class="s-sf s-cmq">${lines(f.q)}</p>`; } },
  { id: 's-feed-card', name: 'Card on a portrait', cat: 'Bold photo', look: L('#9a9a9a', '#111111', '#111111', '#ffffff', '#9a9a9a', 'condensed', 'serif'), art: ['front', ['#7a7a7a', '#e0e0e0']],
    fields: { top: 'Little steps', head: 'Watch your feed\ncome to life beautifully.', body: 'It is only when it carries\nhis signature that it becomes\nmemorable.', foot: 'Lasting beauty.' },
    html: (f, im) => `${img(im, 'grey')}<div class="s-wcard"><p class="s-sf">${esc(f.top)}</p><p class="mo-dw">${lines(f.head)}</p><p class="s-sf b">${lines(f.body)}</p><p class="s-sf">${esc(f.foot)}</p></div>` },
  { id: 's-delay', name: 'Issue cover', cat: 'Editorial', look: L('#6a4a3c', '#f3ece6', '#f3ece6', '#6a4a3c', '#6a4a3c', 'grotesk', 'grotesk'), art: ['front', ['#6a4a3c', '#d7a58a']],
    fields: { head: 'Delay(,)', a: '2026.12', name: 'Sandstone\nNorth', b: 'Feb. issue', body: 'Notes on slow summers, warm stone and the colour of skin in late light. Twelve pages of photographs and one long interview.' },
    html: (f, im) => `${img(im)}<div class="mo-shade low"></div><div class="s-topshade"></div><p class="mo-dw s-dl-h">${esc(f.head)}</p>${t(f.a, 'left:var(--m);bottom:calc(var(--m) + var(--u)*12)')}<p class="mo-dw s-dl-n">${lines(f.name)}</p>${t(f.b, 'right:var(--m);bottom:calc(var(--m) + var(--u)*12);text-align:right')}<p class="s-p" style="left:var(--m);right:var(--m);bottom:var(--m);text-transform:uppercase;font-size:calc(var(--u)*1.55)">${esc(f.body)}</p>` },
  { id: 's-powerful', name: 'Two photos, two words', cat: 'Editorial', slots: ['Upper photo', 'Lower photo'], look: L('#e4e3e0', '#111111', '#111111', '#e4e3e0', '#cfcecb', 'wide', 'grotesk'), art: ['front', ['#cfcecb', '#3a3a3a']],
    fields: { a: '(Inspired by topics)', b: 'August 2026', one: '(01)', head: 'Powerful', two: '(02)', foot: 'Statement', c: 'North studio · Prague' },
    html: (f, im, b, c, ims = []) => `<i class="s-hr" style="top:calc(var(--m) + var(--u)*3)"></i>${t(f.a, 'left:var(--m);top:var(--m)')}${t(f.b, 'right:var(--m);top:var(--m)')}${t(f.one, 'left:0;right:0;top:12%;text-align:center')}<p class="mo-dw s-pw" style="top:15%">${esc(f.head)}</p><div class="s-box" style="left:32%;right:32%;top:25%;height:24%">${img(ims[0] || im, 'grey')}</div><div class="s-box" style="left:32%;right:32%;top:51%;height:24%">${img(ims[1] || im, 'grey')}</div><p class="mo-dw s-pw" style="top:78%">${esc(f.foot)}</p>${t(f.two, 'left:0;right:0;top:85%;text-align:center')}${t(f.c, 'left:0;right:0;bottom:var(--m);text-align:center')}` },
  { id: 's-create-step', name: 'Step into the team', cat: 'Professional', look: L('#141414', '#ffffff', '#ffffff', '#141414', '#141414', 'grotesk', 'grotesk'), art: ['front', ['#e9e9e9', '#2a2a2a']],
    fields: { a: 'North™\nPrague', head: 'Create', mid: 'step (', mid2: ') into team', site: 'north.pro', side: 'north.studio\nhello@north.studio', note: 'If alternate timelines exist,\nI hope I’m happy in one of them.', foot: 'The\nstudio & ideas', page: '05/24' },
    html: (f, im, b) => `<div class="s-half">${img(im, 'grey')}</div>${t(f.a, 'left:var(--m);top:calc(50% + var(--u)*3)')}<p class="mo-dw s-cs">${esc(f.head)}<br>${esc(f.mid)}<span class="s-cpill">${img(im, 'grey')}</span>${esc(f.mid2)}<br>${esc(f.site)}</p><p class="s-t s-vert r" style="right:var(--m);top:calc(50% + var(--u)*3)">${lines(f.side)}</p>${t(f.note, 'left:0;right:0;bottom:calc(var(--m) + var(--u)*8);text-align:center', 's-csn')}${t(f.foot, 'left:var(--m);bottom:var(--m)')}${t(f.page, 'right:var(--m);bottom:var(--m)')}` },
  // ---------- giant type sheets ----------
  { id: 's-boundaries', name: 'Typographic sheet', cat: 'Minimal', look: L('#efefed', '#111111', '#111111', '#efefed', '#efefed', 'grotesk', 'grotesk'),
    fields: { a: 'Boundaries\nbetween\nfashion\n& art', b: 'Have\nbecome\nblurred', c: '18–24*', d: 'North\nChroma\n& Lab 02' },
    html: (f) => `<p class="mo-dw s-bd a">${lines(f.a)}</p><p class="mo-dw s-bd b">${lines(f.b)}</p><p class="mo-dw s-bd c">${esc(f.c)}</p><p class="mo-dw s-bd d">${lines(f.d)}</p>` },
  { id: 's-justified', name: 'Justified manifesto', cat: 'Minimal', look: L('#9d9fa2', '#f4f4f4', '#f4f4f4', '#9d9fa2', '#9d9fa2', 'grotesk', 'grotesk'),
    fields: { text: 'The dawn of fusion fashion marks a departure from conventional norms, embracing a captivating blend of cultural influences, modern aesthetics and individual expression.', num: '*72' },
    html: (f) => `<p class="mo-dw s-just">${esc(f.text)}</p><p class="mo-dw s-just-n">${esc(f.num)}</p>` },
  // ---------- brand marks and gradient brands ----------
  { id: 's-ring-mark', name: 'Ring mark wordmark', cat: 'Brand identity', look: L('#0b0b0b', '#f2f2f2', '#f2f2f2', '#0b0b0b', '#0b0b0b', 'grotesk', 'grotesk'),
    fields: { a: 'Designer ●● since 2016', b: 'Logotype & brand identity', word: 'North Brands' },
    html: (f, im, b) => `<span class="s-ring">${b.logo ? logo(b, '') : ringMark()}</span>${t(f.a, 'left:var(--m);top:52%')}${t(f.b, 'left:52%;top:52%')}<p class="mo-dw s-rw">${esc(f.word)}<sup>®</sup></p>` },
  { id: 's-orange-glow', name: 'Orange glow', cat: 'Gradient', look: L('#ff3d12', '#ffffff', '#ffb38a', '#ff6a1a', '#d81b0c', 'grotesk', 'grotesk'),
    fields: { a: 'north.studio', b: 'How it works', head: 'Your products.\nEvery angle.\nEvery mood.' },
    html: (f, im, b) => `<div class="s-glow"></div><div class="mo-grain"></div>${t(f.a, 'left:var(--m);top:var(--m);text-transform:none')}${t(f.b, 'right:var(--m);top:var(--m);text-transform:none')}<span class="s-spinwrap">${b.logo ? logo(b, '') : spinner()}</span><p class="mo-dw s-og-h">${lines(f.head)}</p>` },
  { id: 's-roi', name: 'Score with bars', cat: 'Data & stats', look: L('#ff3d12', '#ffffff', '#ffd2b8', '#ff6a1a', '#d81b0c', 'grotesk', 'grotesk'),
    fields: { a: 'Your ROI score', b: 'Last 28 days', num: '+245.4%', foot: 'Compared with\nthe 28 days before' },
    html: (f, im, b) => `<div class="s-glow"></div><div class="mo-grain"></div><p class="mo-dw" style="left:var(--m);top:var(--m);font-size:calc(var(--u)*3.4);font-weight:500">${esc(f.a)}</p><p class="mo-dw" style="right:var(--m);top:var(--m);font-size:calc(var(--u)*3.4);font-weight:500">${esc(f.b)}</p><div class="s-bars">${Array.from({ length: 34 }, (_, i) => `<i style="--h:${(30 + 60 * Math.abs(Math.sin(i * 0.7))).toFixed(0)}%"></i>`).join('')}</div><p class="mo-dw s-roi-n">${esc(f.num)}</p><span class="s-spinwrap sm">${b.logo ? logo(b, '') : spinner()}</span>${t(f.foot, 'left:0;right:0;bottom:var(--m);text-align:center;text-transform:none;letter-spacing:0')}` },
  { id: 's-scale', name: 'Block mark and photo', cat: 'Brand identity', look: L('#ffffff', '#111111', '#111111', '#ffffff', '#ffffff', 'grotesk', 'grotesk'), art: ['front', ['#e9e6e2', '#5a4334']],
    fields: { head: 'Visual scale\nunlocked.', a: 'north.studio', b: 'Visual studio' },
    html: (f, im, b) => `<span class="s-block">${b.logo ? logo(b, '') : '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M0 0h62v24H24v14h30v24H24v38H0Z" fill="currentColor"/></svg>'}</span><i class="s-reg">®</i><div class="s-box" style="left:46%;right:var(--m);top:var(--m);height:52%">${img(im)}</div><p class="mo-dw s-sc-h">${lines(f.head)}</p>${t(f.a, 'left:var(--m);bottom:var(--m);text-transform:none')}${t(f.b, 'right:var(--m);bottom:var(--m);text-transform:none')}` },
  { id: 's-speed', name: 'Tech partner, speed lines', cat: 'Professional', look: L('#050505', '#ffffff', '#ff5a1f', '#ffffff', '#050505', 'grotesk', 'grotesk'),
    fields: { mark: 'North', site: 'north.com', head: 'Your go-\nto tech\npartner' },
    html: (f, im, b) => `<div class="s-lines"></div>${mk(b, f.mark, 'acc')}${t(f.site, 'right:var(--m);top:22%;text-transform:uppercase')}<p class="mo-dw s-sp-h">${lines(f.head)}</p>` },
  { id: 's-white-claim', name: 'Claim with a coloured end', cat: 'Professional', look: L('#ffffff', '#111111', '#ff5a1f', '#ffffff', '#ffffff', 'grotesk', 'grotesk'),
    fields: { head: 'Your\nbusiness\ndeserves\nmore than\n*just code*', site: 'north.com', mark: 'North' },
    html: (f, im, b) => `<p class="mo-dw s-wc-h">${mix(f.head)}</p>${t(f.site, 'right:var(--m);top:66%')}<p class="mo-dw s-wc-m">${mk(b, '', 'inl')}<span>${esc(f.mark)}<sup>©</sup></span></p>` },
  { id: 's-blur-name', name: 'Blurred portrait, big name', cat: 'Bold photo', look: L('#0d6f7a', '#ffffff', '#ffffff', '#0d6f7a', '#0d6f7a', 'grotesk', 'grotesk'), art: ['front', ['#0d6f7a', '#111111']],
    fields: { head: 'Growth\nwithout\nlimits', a: 'Your go-to\ntech partner', b: '2026', word: 'North' },
    html: (f, im, b) => `${img(im, 'blurred')}<div class="s-teal"></div><p class="mo-dw s-bn-h">${lines(f.head)}</p>${mk(b, '', 'tr')}${t(f.a, 'left:var(--m);top:54%')}${t(f.b, 'right:var(--m);top:54%')}<p class="mo-dw s-bn-w">${esc(f.word)}<sup>©</sup></p>` },
  // ---------- events ----------
  { id: 's-event-here', name: 'Event, giant headline', cat: 'Event', look: L('#ffffff', '#111111', '#e3262f', '#ffffff', '#ffffff', 'grotesk', 'grotesk'),
    fields: { head: 'Your\nevent\nhere.', date: '18-20', cols: 'Doors open at seven\nTalks, music and food\nFree for members', addr: '12 River Street\nPrague\nCzechia', site: 'north.events' },
    html: (f) => `<p class="mo-dw s-ev-h">${lines(f.head)}</p>${digits(f.date)}<div class="s-vcols">${list(f.cols).slice(0, 3).map((x) => `<p>${esc(x)}</p>`).join('')}</div>${t(f.addr, 'left:var(--m);bottom:var(--m);text-transform:none;letter-spacing:0')}${t(f.site, 'left:40%;bottom:var(--m);text-transform:none;letter-spacing:0')}` },
  { id: 's-event-dark', name: 'Event, dark with dates', cat: 'Event', look: L('#111111', '#ffffff', '#e3262f', '#111111', '#111111', 'grotesk', 'grotesk'),
    fields: { addr: '12 River Street\nPrague\nCzechia', site: 'north.events', date: '18-20', head: 'Your\nevent.', body: 'Two evenings of talks and music in the old printing hall. Bring a friend, stay for the late set.', a: 'Talks from 18:00\nopen to everyone', b: 'Music from 21:00\nlate bar' },
    html: (f) => `${t(f.addr, 'left:var(--m);top:var(--m);text-transform:none;letter-spacing:0')}${t(f.site, 'left:38%;top:var(--m);text-transform:none;letter-spacing:0')}${digits(f.date, 'col')}<span class="s-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/></svg></span><p class="mo-dw s-ed-h">${lines(f.head)}</p><p class="s-p" style="left:var(--m);right:30%;bottom:calc(var(--m) + var(--u)*9);font-size:calc(var(--u)*2.4)">${esc(f.body)}</p>${t(f.a, 'left:var(--m);bottom:var(--m);text-transform:none;letter-spacing:0;opacity:.7')}${t(f.b, 'left:40%;bottom:var(--m);text-transform:none;letter-spacing:0;opacity:.7')}` },
  { id: 's-event-22', name: 'Event, giant number', cat: 'Event', look: L('#ffffff', '#111111', '#e3262f', '#ffffff', '#ffffff', 'grotesk', 'grotesk'),
    fields: { site: 'north.events', who: 'hosted by north', addr: '12 River Street\nPrague\nCzechia', head: 'Your\nevent.', items: 'Talks from six\nOpen to everyone\nMusic from nine\nLate bar until two\nFood all evening\nBring a friend', num: '22' },
    html: (f) => { const it = list(f.items); const pairs = []; for (let i = 0; i < it.length; i += 2) pairs.push(it.slice(i, i + 2)); return `${t(f.site, 'left:34%;top:var(--m);text-transform:none;letter-spacing:0')}${t(f.who, 'right:var(--m);top:var(--m);text-transform:none;letter-spacing:0')}<i class="s-reddot"></i><p class="s-t s-vert" style="left:calc(var(--m) + var(--u)*1);top:30%;text-transform:none;letter-spacing:0">${lines(f.addr)}</p><p class="mo-dw s-e22-h">${lines(f.head)}</p><div class="s-e22-l">${pairs.slice(0, 3).map((p) => `<p><b>${esc(p[0])}</b><br>${esc(p[1] || '')}</p>`).join('')}</div><p class="mo-dw s-e22-n">${esc(f.num)}</p>`; } },
  // ---------- accent bar and orange ----------
  { id: 's-accent-bar', name: 'Photo with an accent bar', cat: 'Professional', look: L('#0b0b0b', '#ffffff', '#ff5a1f', '#0b0b0b', '#0b0b0b', 'grotesk', 'grotesk'), art: ['object', ['#ff5a1f', '#ffb08a']],
    fields: { head: 'Content that sells.\nVideo that wins.', contact: '+420 777 123 456\nnorth.studio\nhello@north.studio', mark: 'N' },
    html: (f, im, b) => `<div class="s-top55">${img(im)}</div><p class="mo-dw s-ab-h">${lines(f.head)}</p>${t(f.contact, 'left:var(--m);bottom:var(--m);text-transform:none;letter-spacing:0;line-height:1.5')}${mk(b, f.mark, 'br')}` },
  { id: 's-orange-top', name: 'Orange block over a photo', cat: 'Professional', look: L('#0b0b0b', '#ffffff', '#ff5a1f', '#ff5a1f', '#0b0b0b', 'grotesk', 'grotesk'), art: ['front', ['#2a0a02', '#ff6a2a']],
    fields: { head: 'Cinematic.\nPowerful.\nUnforgettable.', contact: '+420 777 123 456\nnorth.studio\nhello@north.studio', mark: 'N' },
    html: (f, im, b) => `<div class="s-ob">${img(im)}</div><div class="s-otop"></div><p class="mo-dw s-ot-h">${lines(f.head)}</p>${t(f.contact, 'left:var(--m);top:32%;text-transform:none;letter-spacing:0;line-height:1.5')}${mk(b, f.mark, 'ot')}` },
  { id: 's-grid-glow', name: 'Glow grid portrait', cat: 'Bold photo', look: L('#ff5a1f', '#ffffff', '#ff5a1f', '#ff5a1f', '#0b0b0b', 'wide', 'grotesk'), art: ['front', ['#0b0b0b', '#ff8a4a']],
    fields: { word: 'North Factory' },
    html: (f, im) => `<div class="s-ggrid"></div><div class="s-gph">${img(im)}</div><div class="s-gfade"></div><p class="mo-dw s-gw">${esc(f.word)}</p>` },
  // ---------- macro product and lab ----------
  { id: 's-macro', name: 'Macro product sheet', cat: 'Professional', look: L('#ffffff', '#111111', '#2f6bff', '#ffffff', '#ffffff', 'grotesk', 'grotesk'), art: ['object', ['#ffffff', '#2f6bff']],
    fields: { label: 'Molecular integrity', body: 'Engineered for rigorous stress testing, our lab verifies compound stability to ensure zero variance in structural results.', code: 'Precision built · Testing lab', mark: 'North' },
    html: (f, im, b) => `<div class="s-top80">${img(im)}</div><p class="s-dotlab">${esc(f.label)}</p><p class="s-p s-mb" style="left:var(--m);width:52%;bottom:calc(var(--m) + var(--u)*5);font-size:calc(var(--u)*2.2)">${esc(f.body)}</p>${t(f.code, 'left:var(--m);bottom:var(--m);opacity:.6', 's-mc')}${mk(b, f.mark, 'br')}` },
  { id: 's-structural', name: 'Structural proof', cat: 'Professional', look: L('#0b0b0b', '#ffffff', '#2f6bff', '#0b0b0b', '#0b0b0b', 'grotesk', 'grotesk'),
    fields: { head: 'Structural\nproof', meta: 'Series 04\nVerified\nRev. 2', a: 'The verification framework covers every step, from raw compound to finished part, so results can be repeated by anyone.', b: 'Our data network keeps each test traceable, with records that hold up to outside review for years.', mark: 'North' },
    html: (f, im, b) => `<p class="mo-dw s-st-h">${lines(f.head)}</p>${t(f.meta, 'left:var(--m);top:40%;opacity:.6')}<p class="s-p" style="left:36%;top:40%;width:28%">${esc(f.a)}</p><p class="s-p" style="left:68%;top:40%;width:26%">${esc(f.b)}</p><p class="mo-dw" style="left:var(--m);bottom:var(--m);font-size:calc(var(--u)*4.4);font-weight:500">${mk(b, '', 'inl')}${esc(f.mark)}</p>` },
  { id: 's-blob-pattern', name: 'Bond pattern', cat: 'Professional', look: L('#0b0b0b', '#ffffff', '#3f8bff', '#0b0b0b', '#0b0b0b', 'grotesk', 'grotesk'),
    fields: { head: 'Analysing\nstrong bonds' },
    html: (f) => `${blobs()}<div class="s-bfade"></div><p class="mo-dw s-bp-h">${lines(f.head)}</p>` },
  // ---------- blue athletic ----------
  { id: 's-blue-fade', name: 'Blue fade headline', cat: 'Sport', look: L('#0a3d8f', '#ffffff', '#ffffff', '#1360d6', '#bfe0ff', 'grotesk', 'grotesk'), art: ['front', ['#0a1a3a', '#7aa8e8']],
    fields: { site: 'north.com', head: 'Built for\ndisciplined\nathletes' },
    html: (f, im) => `${img(im)}${t(f.site, 'left:var(--m);top:var(--m);text-transform:none;border:1px solid currentColor;border-radius:99px;padding:calc(var(--u)*.6) calc(var(--u)*1.6)')}<div class="s-bfph"></div><p class="mo-dw s-bf-h">${lines(f.head)}</p>` },
  { id: 's-big-k', name: 'Big K figure', cat: 'Data & stats', look: L('#0a3d8f', '#ffffff', '#ffffff', '#1360d6', '#d8ecff', 'grotesk', 'grotesk'),
    fields: { num: '30K', a: 'Athletes\ntrust us', b: 'North for\ntheir training', foot: 'north.com' },
    html: (f, im, b) => `<div class="s-bgrad"></div><p class="mo-dw s-k">${esc(f.num)}</p>${t(f.a, 'left:var(--m);top:44%;text-transform:none;letter-spacing:0;font-size:calc(var(--u)*2.6)')}${t(f.b, 'left:60%;top:44%;text-transform:none;letter-spacing:0;font-size:calc(var(--u)*2.6)')}${mk(b, '', 'bl')}${t(f.foot, 'right:var(--m);bottom:var(--m);text-transform:none;opacity:.7')}` },
  { id: 's-orb', name: 'Blue orb mark', cat: 'Gradient', look: L('#f3f1ec', '#ffffff', '#ffffff', '#1360d6', '#0a3d8f', 'wide', 'grotesk'),
    fields: { word: 'North', a: 'Premium sports\naccessories brand', side: 'north.com' },
    html: (f, im, b) => `<div class="s-orb"></div><p class="mo-dw s-orb-w">${mk(b, '', 'inl')}${esc(f.word)}<sup>®</sup></p>${t(f.a, 'left:0;right:0;top:calc(50% + var(--u)*5);text-align:center;text-transform:none;letter-spacing:0')}<p class="s-t s-vert r" style="right:var(--m);top:var(--m);color:var(--g2)">${esc(f.side)}</p>` },
  { id: 's-callouts', name: 'Product callouts', cat: 'Sport', look: L('#0b0b0b', '#ffffff', '#ffffff', '#0b0b0b', '#0b0b0b', 'grotesk', 'grotesk'), art: ['object', ['#0b0b0b', '#d9d9d9']],
    fields: { a: 'High speed cable', b: 'Minimal design', c: 'Durable build', d: 'Smooth control' },
    html: (f, im) => `${img(im)}<div class="mo-shade"></div>${[['a', 62, 18, 'l'], ['b', 66, 36, 'l'], ['c', 64, 60, 'l'], ['d', 10, 80, 'r']].map(([k, x, y, s]) => `<p class="s-co ${s}" style="left:${x}%;top:${y}%"><i></i>${esc(f[k])}</p>`).join('')}` },
  { id: 's-bracket-year', name: 'Year in brackets', cat: 'Gradient', look: L('#0a2ad8', '#ffffff', '#ffffff', '#3a5bff', '#020a5a', 'grotesk', 'grotesk'),
    fields: { head: 'What will\nchange in\nyour taxes\nin', year: '2026', foot: 'north.finance' },
    html: (f) => `<div class="s-bluefield"></div><p class="mo-dw s-by-h">${lines(f.head)} <span>[ ${esc(f.year)} ]</span></p>${t(f.foot, 'left:var(--m);bottom:var(--m);text-transform:none')}` },
  { id: 's-offer', name: 'Offer with rules', cat: 'Gradient', look: L('#ffffff', '#0a2ad8', '#0a2ad8', '#1240ff', '#ffffff', 'grotesk', 'grotesk'),
    fields: { a: 'Your first month\nof bookkeeping', b: 'Free', more: 'More →' },
    html: (f) => `<div class="s-bluecorner"></div><p class="mo-dw s-of a">${lines(f.a)}</p><i class="s-hr" style="top:44%;background:currentColor;opacity:.5"></i><p class="mo-dw s-of b">${esc(f.b)}</p><i class="s-hr" style="top:56%;background:currentColor;opacity:.5"></i>${t(f.more, 'left:var(--m);bottom:var(--m);text-transform:none')}` },
  // ---------- sport motion type ----------
  { id: 's-motion-word', name: 'Motion word', cat: 'Sport', look: L('#7a8ea6', '#ffffff', '#ffffff', '#7a8ea6', '#7a8ea6', 'wide', 'grotesk'), art: ['front', ['#3c4e66', '#cfd8e3']],
    fields: { word: 'Move', foot: 'The game begins\nwhen you do.', mark: 'V' },
    html: (f, im, b) => `${img(im)}<p class="mo-dw s-mw ghost" aria-hidden="true">${esc(f.word)}</p><p class="mo-dw s-mw">${esc(f.word)}</p>${t(f.foot, 'left:var(--m);bottom:var(--m)')}${mk(b, f.mark, 'br')}` },
  { id: 's-ghost-words', name: 'Ghost words', cat: 'Sport', look: L('#141414', '#ffffff', '#ffffff', '#141414', '#141414', 'wide', 'grotesk'),
    fields: { ghost: 'No\nlimits\nno\nrules', head: 'Just\nthe drive\nto push\nharder.', mark: 'V' },
    html: (f, im, b) => `<p class="mo-dw s-gh">${lines(f.ghost)}</p><p class="mo-dw s-gh-h">${lines(f.head)}</p>${mk(b, f.mark, 'br')}` },
  { id: 's-blur-centre', name: 'Blurred word behind', cat: 'Sport', look: L('#c4d7f0', '#111111', '#111111', '#e9f1fb', '#8fb2e0', 'wide', 'grotesk'),
    fields: { back: 'Run', word: 'Run faster', foot: 'Speed is a mindset', mark: 'V' },
    html: (f, im, b) => `<div class="s-skyg"></div><p class="mo-dw s-bc-b" aria-hidden="true">${esc(f.back)}</p><p class="mo-dw s-bc">${esc(f.word)}</p>${t(f.foot, 'left:var(--m);bottom:var(--m)')}${mk(b, f.mark, 'br')}` },
  // ---------- run club stories ----------
  { id: 's-run-mark', name: 'Run club wordmark', cat: 'Sport', look: L('#0a1424', '#ffffff', '#ffffff', '#0a1424', '#0a1424', 'wide', 'grotesk'), art: ['front', ['#0a1424', '#6f8fbf']],
    fields: { top: 'Not built to follow.\nMade to move different.', word: 'Offrun', tag: 'Find your own pace.', body: 'We don’t run against the clock. We run to see the city wake up, to meet people and to feel good after.', foot: 'Run\n2026' },
    html: (f, im) => `<div class="s-run">${img(im, 'soft')}</div>${t(f.top, 'left:var(--m);top:var(--m)')}<p class="mo-dw s-rm">${esc(f.word)}<sup>®</sup></p>${t(f.tag, 'left:62%;top:calc(50% + var(--u)*1)')}<p class="s-p" style="left:var(--m);width:64%;bottom:var(--m);font-size:calc(var(--u)*1.6)">${esc(f.body)}</p>${t(f.foot, 'right:var(--m);bottom:var(--m);text-align:right')}` },
  { id: 's-route-stats', name: 'Route and stats', cat: 'Sport', look: L('#0a1424', '#ffffff', '#ffffff', '#0a1424', '#0a1424', 'wide', 'grotesk'), art: ['front', ['#0a1424', '#7a93bf']],
    fields: { mark: 'Offrun', stats: 'Distance 5.20 km\nTime 00:28:45\nPace 5:31 km' },
    html: (f, im, b) => `${img(im)}<div class="mo-shade low"></div><p class="mo-dw" style="left:0;right:0;top:calc(var(--m) + var(--u)*6);text-align:center;font-size:calc(var(--u)*3.4);font-style:italic">${logo(b, f.mark)}</p><svg class="s-route" viewBox="0 0 100 40" aria-hidden="true"><path d="M6 32C16 30 18 12 28 14s10 18 20 16 8-22 18-20 12 10 18 2 8-8 10-8"/><circle cx="6" cy="32" r="2"/><circle cx="90" cy="6" r="2"/></svg><div class="s-stats">${list(f.stats).slice(0, 3).map((l) => { const m = l.match(/^(\S+)\s+(.*)$/) || [0, l, '']; return `<p><span>${esc(m[1])}</span><b>${esc(m[2])}</b></p>`; }).join('')}</div>` },
  { id: 's-vertical-run', name: 'Vertical story title', cat: 'Sport', look: L('#0a1424', '#ffffff', '#ffffff', '#0a1424', '#0a1424', 'wide', 'grotesk'), art: ['front', ['#0a1424', '#7a93bf']],
    fields: { handle: 'offrun', head: 'Morning\nrun 10k', when: '09 November\n07:00\nCity centre', tag: 'Find your\nown pace.' },
    html: (f, im) => `${img(im)}<div class="mo-shade"></div><div class="s-sbars"><i></i><i></i><i></i><i></i></div><p class="s-t s-who" style="left:var(--m);top:calc(var(--m) + var(--u)*3)"><i></i>${esc(f.handle)}</p><p class="mo-dw s-vr">${lines(f.head)}</p>${t(f.when, 'left:var(--m);top:66%', 's-vrw')}<p class="mo-dw s-vr-t">${lines(f.tag)}</p><i class="s-reply"></i>` },
  { id: 's-staggered', name: 'Staggered words', cat: 'Sport', look: L('#0a1424', '#ffffff', '#ffffff', '#0a1424', '#0a1424', 'wide', 'grotesk'), art: ['front', ['#0a1424', '#7a93bf']],
    fields: { w1: 'Move', s1: 'We believe running is more\nthan just distance.', w2: 'Your', s2: 'It’s about the people you meet\nand the streets you explore.', w3: 'Own', s3: 'Run together, stay different.', w4: 'Pace' },
    html: (f, im) => `${img(im, 'dim')}<p class="mo-dw s-sw" style="left:var(--m);top:14%">${esc(f.w1)}</p>${t(f.s1, 'left:44%;top:25%')}<p class="mo-dw s-sw" style="right:var(--m);top:32%">${esc(f.w2)}</p>${t(f.s2, 'left:var(--m);top:44%')}<p class="mo-dw s-sw" style="left:var(--m);top:54%">${esc(f.w3)}</p>${t(f.s3, 'left:44%;top:65%')}<p class="mo-dw s-sw" style="right:var(--m);top:72%">${esc(f.w4)}</p>` },
  { id: 's-manifesto', name: 'Quiet manifesto', cat: 'Minimal', look: L('#070d18', '#ffffff', '#ffffff', '#070d18', '#070d18', 'wide', 'grotesk'),
    fields: { mark: 'Offrun', text: 'We move differently.\n\nNot for the records.\nNot for the numbers.\nNot to be the fastest.\n\nJust for the feeling.\nJust for the movement.' },
    html: (f, im, b) => `<p class="mo-dw" style="left:var(--m);top:50%;translate:0 -50%;font-size:calc(var(--u)*3.2);font-style:italic">${logo(b, f.mark)}</p><p class="s-t s-mf">${lines(f.text)}</p>` },
  // ---------- neon beauty ----------
  { id: 's-dots-face', name: 'Dots on a face', cat: 'Bold photo', look: L('#f2efe9', '#111111', '#e9ff2a', '#ffffff', '#f2efe9', 'grotesk', 'grotesk'), art: ['front', ['#e8d7c8', '#7a5a46']],
    fields: { a: 'north.shop', b: 'Hair products', head: 'Tired of\nfrizzy hair?' },
    html: (f, im) => `${img(im)}<div class="s-dots">${[[12, 8, 5], [22, 4, 7], [36, 10, 4], [58, 6, 6], [74, 12, 5], [88, 4, 7], [8, 24, 6], [80, 26, 5], [64, 30, 4], [18, 38, 7], [90, 40, 6], [44, 22, 5]].map(([x, y, r]) => `<i style="left:${x}%;top:${y}%;--r:${r}"></i>`).join('')}</div>${t(f.a, 'left:var(--m);top:var(--m)')}${t(f.b, 'right:var(--m);top:var(--m)')}<p class="mo-dw s-df-h">${lines(f.head)}</p>` },
  { id: 's-neon', name: 'Neon note', cat: 'Minimal', look: L('#e9ff2a', '#111111', '#111111', '#e9ff2a', '#e9ff2a', 'grotesk', 'grotesk'),
    fields: { a: 'north.shop', b: 'Hair products', head: 'We love\n*your hair!*', body: 'Gentle formulas, honest ingredients and a routine that fits into five minutes. Made for hair that has opinions.' },
    html: (f) => `${t(f.a, 'left:var(--m);top:var(--m)')}${t(f.b, 'right:var(--m);top:var(--m)')}<p class="mo-dw s-ne-h">${mix(f.head)}</p><p class="s-p" style="left:22%;right:22%;top:46%;text-align:center;font-size:calc(var(--u)*2.2)">${esc(f.body)}</p>` },
  { id: 's-ribbon-path', name: 'Text on a ribbon', cat: 'Minimal', look: L('#f4f2ee', '#111111', '#e9ff2a', '#2a1f3a', '#f4f2ee', 'grotesk', 'grotesk'),
    fields: { head: 'How to live\nwith fine hair?', ribbon: 'north.shop · north.shop · north.shop · north.shop · north.shop · north.shop' },
    html: (f) => `<svg class="s-rib" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true"><defs><path id="srp" d="M-10 30C30 30 70 10 82 34S40 70 30 92s40 30 80 22"/></defs><use href="#srp" fill="none" stroke="var(--g1)" stroke-width="13" stroke-linecap="round"/><text font-size="5.4" fill="#fff" font-family="var(--ftv)" letter-spacing=".6" dy="1.8"><textPath href="#srp">${esc(f.ribbon)}</textPath></text></svg><i class="s-neondot"></i><p class="mo-dw s-rp-h">${lines(f.head)}</p>` },
  { id: 's-routine', name: 'Routine in four steps', cat: 'Professional', slots: ['Product 1', 'Product 2', 'Product 3', 'Product 4'], look: L('#ffffff', '#111111', '#e9ff2a', '#ffffff', '#f4f2ee', 'serif', 'grotesk'), art: ['object', ['#f4f2ee', '#c9b8a8']],
    fields: { head: 'Hair care routine', steps: 'Step 1\nStep 2\nStep 3\nStep 4', a: 'north.shop', b: 'Hair products' },
    html: (f, im, b, c, ims = []) => `${t(f.a, 'left:var(--m);bottom:var(--m)')}${t(f.b, 'right:var(--m);bottom:var(--m)')}<p class="mo-dw s-rt-h">${esc(f.head)}</p><div class="s-prods">${list(f.steps).slice(0, 4).map((s, i) => `<div><span>${img(ims[i] || im, 'contain')}</span><b>${esc(s)}</b></div>`).join('')}</div>` },
  // ---------- carousel covers ----------
  { id: 's-poster-arrow', name: 'Wide headline with arrows', cat: 'Carousel', look: L('#ff6a00', '#ffffff', '#ffffff', '#ff6a00', '#1a0500', 'wide', 'grotesk'), art: ['front', ['#1a0500', '#ff8a2a']],
    fields: { head: 'Best colour\ncombos for\nposters', mark: 'north' },
    html: (f, im, b) => `${img(im, 'blurred')}<div class="s-warm"></div>${arrow('s-pa1')}<p class="mo-dw s-pa-h">${lines(f.head)}</p>${arrow('s-pa2')}<p class="mo-dw" style="left:0;right:0;bottom:calc(var(--m) - var(--u)*1);text-align:center;font-size:calc(var(--u)*2.6);text-transform:uppercase">${logo(b, f.mark)}</p>` },
  { id: 's-part-cover', name: 'Series part cover', cat: 'Carousel', look: L('#7a0a16', '#ffffff', '#ffffff', '#7a0a16', '#7a0a16', 'grotesk', 'serif'), art: ['front', ['#3a0208', '#c4182a']],
    fields: { a: 'Get in touch\nhello@north.studio', page: '1/7', part: 'Part 5', head: 'Colour', it: 'combos', mark: 'north' },
    html: (f, im, b) => `${img(im)}<div class="mo-shade low"></div>${t(f.a, 'left:var(--m);top:var(--m);text-transform:none;letter-spacing:0')}${t(f.page, 'right:var(--m);top:var(--m)')}<p class="s-t s-pcp" style="left:0;right:0;top:60%;text-align:center;letter-spacing:.9em">${esc(f.part)}</p><p class="mo-dw s-pc-h">${esc(f.head)}</p><p class="s-pc-i">${esc(f.it)}</p><span class="s-go"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M12 6l6 6-6 6"/></svg></span><p class="mo-dw" style="left:0;right:0;bottom:var(--m);text-align:center;font-size:calc(var(--u)*3.2);font-style:italic">${logo(b, f.mark)}</p>` },
  { id: 's-ribbed', name: 'Ribbed glass cover', cat: 'Carousel', look: L('#0d2a8a', '#ffffff', '#f4f12a', '#0d2a8a', '#0d2a8a', 'wide', 'grotesk'), art: ['profile', ['#0d2a8a', '#c9a48a']],
    fields: { tag: '#keywords', top: '#designers', head: 'Pinterest\ndesign\n*inspo\nkeywords*', sub: 'Find the right keywords for *design inspiration.*', handle: '@north.graphic', save: 'Save for later' },
    html: (f, im) => `${img(im)}<div class="s-rib-g">${img(im)}</div>${arrow('s-rbar')}${t(f.top, 'right:var(--m);top:var(--m)')}${t(f.tag, 'left:calc(var(--m) + var(--u)*6);top:22%')}<p class="mo-dw s-rb-h">${mix(f.head)}</p><p class="s-p s-rb-s">${mix(f.sub)}</p>${t(f.handle, 'left:var(--m);bottom:var(--m);text-transform:none;font-size:calc(var(--u)*2.2)')}<p class="s-t s-save" style="left:0;right:0;bottom:var(--m);text-align:center;font-size:calc(var(--u)*2.2)">${esc(f.save)} <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4Z"/></svg></p>` },
];

export const more7Css = `
.bi-ad .s-acc{color:var(--accent);font-style:normal} .bi-ad .s-it{font-style:italic}
.bi-ad .s-t{position:absolute;z-index:5;font-family:var(--ftv);font-size:calc(var(--u)*1.7);line-height:1.3;font-weight:500;text-transform:uppercase;letter-spacing:.04em}
.bi-ad .s-p{position:absolute;z-index:5;font-family:var(--ftv);font-size:calc(var(--u)*1.7);line-height:1.35;font-weight:400}
.bi-ad .s-sf{position:absolute;z-index:5;font-family:var(--ftv);font-size:calc(var(--u)*2.1);line-height:1.2}
.bi-ad .s-vert{writing-mode:vertical-rl;rotate:180deg} .bi-ad .s-vert.r{rotate:0deg}
.bi-ad .s-box{position:absolute;z-index:3;overflow:hidden}
.bi-ad .s-hr{position:absolute;z-index:4;left:var(--m);right:var(--m);height:1px;background:currentColor;opacity:.4}
.bi-ad .s-mk{position:absolute;z-index:5;display:inline-flex;align-items:center;font-family:var(--fdv);font-weight:700;font-size:calc(var(--u)*4)}
.bi-ad .s-mk .bi-logo{height:calc(var(--u)*5*var(--ls,1));width:auto}
.bi-ad .s-mk.acc{left:var(--m);top:var(--m);color:var(--accent)} .bi-ad .s-mk.br{right:var(--m);bottom:var(--m)} .bi-ad .s-mk.tr{right:var(--m);top:var(--m)} .bi-ad .s-mk.bl{left:var(--m);bottom:var(--m)}
.bi-ad .s-mk.ot{right:var(--m);top:calc(48% - var(--u)*9)}
.bi-ad .s-mk.inl{position:static;margin-right:calc(var(--u)*1.2)} .bi-ad .s-mk.inl .bi-logotext:empty{display:none}
.bi-ad .s-mk .bi-logotext:empty{display:none}
.bi-ad .s-arr{position:absolute;z-index:5;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.bi-ad .bi-media.soft{filter:blur(calc(var(--u)*1)) grayscale(1);scale:1.06} .bi-ad .bi-media.blurred{filter:blur(calc(var(--u)*2.4));scale:1.1}
/* grey editorial */
.bi-ad .s-ins-h{right:var(--m);top:var(--m);width:40%;text-align:center;font-size:calc(var(--u)*5);line-height:.95;text-transform:uppercase;font-weight:800}
.bi-ad .s-badge{position:absolute;z-index:5;width:calc(var(--u)*5);height:calc(var(--u)*3);border-radius:99px;background:var(--ink);color:var(--bg);display:grid;place-items:center;font-size:calc(var(--u)*1.6);font-weight:700}
.bi-ad .s-imp-h{left:var(--m);top:var(--m);font-size:calc(var(--u)*5);font-weight:400;line-height:1.05;letter-spacing:-.02em}
.bi-ad .s-dots{position:absolute;z-index:5;right:var(--m);top:calc(var(--m) + var(--u)*1);font-size:calc(var(--u)*3);letter-spacing:.1em}
.bi-ad .s-day{left:var(--m);bottom:var(--m);font-size:calc(var(--u)*7);font-weight:500;line-height:.9} .bi-ad .s-day small{display:block;font-size:calc(var(--u)*1.5);font-family:var(--ftv);font-weight:500;text-transform:uppercase;letter-spacing:.06em;margin-top:calc(var(--u)*.8)}
.bi-ad .s-quote{left:32%;right:var(--m);bottom:var(--m);font-style:italic;font-size:calc(var(--u)*2)}
.bi-ad .s-ff{left:var(--m);right:var(--m);top:var(--m);display:flex;justify-content:space-between;font-size:calc(var(--u)*5);text-transform:uppercase;font-weight:800;letter-spacing:-.02em}
.bi-ad .s-row4{position:absolute;z-index:3;left:var(--m);right:var(--m);bottom:var(--m);height:24%;display:grid;grid-template-columns:repeat(4,1fr);gap:calc(var(--u)*1.2)} .bi-ad .s-row4>div{position:relative;overflow:hidden}
.bi-ad .s-dc-d{left:var(--m);top:56%;font-size:calc(var(--u)*7.4);font-weight:300;letter-spacing:-.03em}
.bi-ad .s-dc-t{left:var(--m);top:67%;font-size:calc(var(--u)*5.4);font-weight:300;line-height:1}
.bi-ad .s-toprow{position:absolute;z-index:5;left:var(--m);right:var(--m);top:var(--m);display:flex;justify-content:space-between;font-size:calc(var(--u)*1.6);text-transform:uppercase;letter-spacing:.04em;font-weight:500}
.bi-ad .s-year{left:0;right:0;top:36%;text-align:center;font-size:calc(var(--u)*15);font-weight:500;letter-spacing:-.05em}
.bi-ad .s-sel{left:-1%;right:-1%;bottom:calc(var(--m) - var(--u)*1);text-align:center;font-size:calc(var(--u)*12.4);text-transform:uppercase;font-weight:500;letter-spacing:-.04em;line-height:.9}
.bi-ad .s-selit{position:absolute;z-index:6;left:0;right:0;bottom:calc(var(--m) + var(--u)*3);text-align:center;font-family:var(--ftv);font-style:italic;font-size:calc(var(--u)*12);line-height:.9;color:var(--bg);-webkit-text-stroke:calc(var(--u)*.25) var(--ink);mix-blend-mode:normal}
.bi-ad .s-dw-ph{position:absolute;left:0;right:0;top:0;height:64%;overflow:hidden}
.bi-ad .s-dw-h{right:var(--m);top:calc(64% + var(--u)*3);text-align:right;font-size:calc(var(--u)*4.6);text-transform:uppercase;font-weight:500;line-height:1;letter-spacing:-.01em}
.bi-ad .s-det-h{left:var(--m);top:var(--m);font-size:calc(var(--u)*11);text-transform:uppercase;font-weight:400;letter-spacing:-.03em}
.bi-ad .s-det-a{left:var(--m);top:calc(var(--m) + var(--u)*16);width:calc(var(--u)*7);stroke-width:1.2}
.bi-ad .s-oval{position:absolute;z-index:3;left:12%;top:52%;width:22%;aspect-ratio:3/4;border-radius:50%;overflow:hidden}
.bi-ad .s-det-t{right:var(--m);top:52%;width:44%;font-size:calc(var(--u)*4);text-transform:uppercase;font-weight:400;line-height:1}
.bi-ad .s-lg-h{left:0;right:0;top:50%;translate:0 -50%;text-align:center;font-size:calc(var(--u)*5.4);text-transform:uppercase;font-weight:500;letter-spacing:.12em}
.bi-ad .s-vc{left:calc(var(--m) - var(--u)*1);top:var(--m);bottom:var(--m);writing-mode:vertical-rl;rotate:180deg;font-size:calc(var(--u)*13.4);text-transform:uppercase;font-weight:400;line-height:.8;letter-spacing:-.03em;text-align:right}
.bi-ad .s-vc-code{left:34%;top:var(--m);font-size:calc(var(--u)*6.4);text-transform:uppercase;font-weight:400;line-height:.95}
/* condensed and serif */
.bi-ad .s-labels{position:absolute;z-index:5;left:var(--m);right:var(--m);top:var(--m);display:flex;justify-content:space-between;font-family:var(--ftv);font-size:calc(var(--u)*1.5);text-transform:uppercase;line-height:1.15}
.bi-ad .s-rs-h{left:0;right:0;top:50%;translate:0 -60%;text-align:center;font-size:calc(var(--u)*8.6);text-transform:uppercase;font-weight:400;line-height:.95}
.bi-ad .s-rs-s{left:0;right:0;top:calc(50% + var(--u)*7);text-align:center} .bi-ad .s-rs-s b{font-size:.8em}
.bi-ad .s-pf-h{left:var(--m);right:var(--m);top:var(--m);white-space:nowrap;font-size:calc(var(--u)*9.2);text-transform:uppercase;font-weight:400;line-height:.9}
.bi-ad .s-list{position:absolute;z-index:5;left:var(--m);width:40%;bottom:calc(var(--m) + var(--u)*5);font-family:var(--ftv);font-size:calc(var(--u)*2);line-height:1.15} .bi-ad .s-list p{position:static;border-bottom:1px solid currentColor;padding:calc(var(--u)*1.4) 0}
.bi-ad .s-row{position:absolute;z-index:5;left:var(--m);right:var(--m);display:flex;justify-content:space-between;font-family:var(--ftv);font-size:calc(var(--u)*1.6);text-transform:uppercase} .bi-ad .s-row.s-top{top:var(--m)} .bi-ad .s-row.s-bot{bottom:var(--m)}
.bi-ad .s-rule{position:absolute;z-index:5;height:1px;background:currentColor}
.bi-ad .s-cm{font-size:calc(var(--u)*6);text-transform:uppercase;font-weight:400;line-height:1}
.bi-ad .s-cm.a{left:22%;top:36.5%;white-space:nowrap;font-size:calc(var(--u)*5)} .bi-ad .s-cm.b{left:var(--m);top:45%} .bi-ad .s-cm.c{left:56%;top:45%} .bi-ad .s-cm.d{left:var(--m);top:52%}
.bi-ad .s-ppill{position:absolute;z-index:5;left:31%;top:45.5%;width:22%;height:calc(var(--u)*5);border-radius:99px;overflow:hidden}
.bi-ad .s-cmq{left:60%;top:60%;font-size:calc(var(--u)*1.9);border-bottom:1px solid currentColor}
.bi-ad .s-wcard{position:absolute;z-index:5;left:16%;right:16%;top:40%;padding:calc(var(--u)*3.4);background:#fff;color:var(--ink);text-align:center;display:grid;gap:calc(var(--u)*2.2)}
.bi-ad .s-wcard p{position:static} .bi-ad .s-wcard .mo-dw{font-size:calc(var(--u)*5.2);text-transform:uppercase;font-weight:400;line-height:1}
.bi-ad .s-wcard .s-sf{font-size:calc(var(--u)*1.9)} .bi-ad .s-wcard .s-sf.b{font-size:calc(var(--u)*2)}
.bi-ad .s-dl-h{left:var(--m);top:var(--m);font-size:calc(var(--u)*13);font-weight:300;letter-spacing:-.04em}
.bi-ad .s-dl-n{left:0;right:0;bottom:calc(var(--m) + var(--u)*9.4);text-align:center;font-size:calc(var(--u)*3.6);text-transform:uppercase;font-weight:600;line-height:1}
.bi-ad .s-pw{left:0;right:0;text-align:center;font-size:calc(var(--u)*6.6);text-transform:uppercase;font-weight:400}
.bi-ad .s-half{position:absolute;left:0;right:0;top:0;height:50%;overflow:hidden}
.bi-ad .s-cs{left:0;right:0;top:61%;text-align:center;font-size:calc(var(--u)*6);text-transform:uppercase;font-weight:400;line-height:1.08}
.bi-ad .s-cpill{display:inline-block;position:relative;width:calc(var(--u)*13);height:calc(var(--u)*4.6);border-radius:99px;overflow:hidden;vertical-align:middle;margin:0 calc(var(--u)*.6)}
/* giant type */
.bi-ad .s-bd{font-size:calc(var(--u)*8.4);text-transform:uppercase;font-weight:400;line-height:.86;letter-spacing:-.03em}
.bi-ad .s-bd.a{left:var(--m);top:var(--m)} .bi-ad .s-bd.b{left:var(--m);top:44%} .bi-ad .s-bd.c{left:var(--m);bottom:var(--m)} .bi-ad .s-bd.d{left:52%;bottom:var(--m)}
.bi-ad .s-just{left:var(--m);right:var(--m);top:var(--m);font-size:calc(var(--u)*7.3);text-transform:uppercase;font-weight:400;line-height:.9;text-align:justify;text-align-last:justify;letter-spacing:-.02em}
.bi-ad .s-just-n{right:var(--m);bottom:var(--m);font-size:calc(var(--u)*9);font-weight:300}
/* marks and gradient brands */
.bi-ad .s-ring{position:absolute;z-index:5;left:var(--m);top:var(--m);width:calc(var(--u)*26);color:var(--ink)} .bi-ad .s-ring svg{width:100%;height:auto} .bi-ad .s-ring .bi-logo{height:calc(var(--u)*22*var(--ls,1));width:auto}
.bi-ad .s-rw{left:var(--m);right:var(--m);bottom:var(--m);font-size:calc(var(--u)*11);font-weight:400;letter-spacing:-.05em;white-space:nowrap} .bi-ad .s-rw sup{font-size:.3em}
.bi-ad .s-glow{position:absolute;inset:0;background:radial-gradient(80% 60% at 70% 30%,var(--accent),transparent 70%),radial-gradient(70% 60% at 20% 90%,var(--g2),transparent 70%),linear-gradient(160deg,var(--g1),var(--bg))}
.bi-ad .s-spinwrap{position:absolute;z-index:5;left:50%;top:38%;translate:-50% -50%;width:calc(var(--u)*16);color:#fff} .bi-ad .s-spinwrap.sm{top:auto;bottom:calc(var(--m) + var(--u)*8);width:calc(var(--u)*6)}
.bi-ad .s-spinwrap svg{width:100%;height:auto} .bi-ad .s-spinwrap .bi-logo{height:calc(var(--u)*14*var(--ls,1));width:auto}
.bi-ad .s-og-h{left:var(--m);bottom:var(--m);font-size:calc(var(--u)*7);font-weight:500;line-height:1;letter-spacing:-.03em}
.bi-ad .s-bars{position:absolute;z-index:3;left:var(--m);right:var(--m);top:24%;height:24%;display:flex;align-items:center;gap:calc(var(--u)*.7)} .bi-ad .s-bars i{flex:1;height:var(--h);border-radius:99px;background:linear-gradient(transparent,rgba(255,255,255,.8),transparent);filter:blur(calc(var(--u)*.25))}
.bi-ad .s-roi-n{left:0;right:0;top:54%;text-align:center;font-size:calc(var(--u)*14);font-weight:500;letter-spacing:-.04em}
.bi-ad .s-block{position:absolute;z-index:5;left:var(--m);top:var(--m);width:calc(var(--u)*20);color:var(--ink)} .bi-ad .s-block svg{width:100%;height:auto} .bi-ad .s-block .bi-logo{height:calc(var(--u)*18*var(--ls,1));width:auto}
.bi-ad .s-reg{position:absolute;z-index:5;left:calc(var(--m) + var(--u)*21);top:calc(var(--m) + var(--u)*17);font-style:normal;font-size:calc(var(--u)*2.6)}
.bi-ad .s-sc-h{left:var(--m);right:var(--m);bottom:calc(var(--m) + var(--u)*6);font-size:calc(var(--u)*8.4);text-transform:uppercase;font-weight:500;line-height:.92;letter-spacing:-.03em}
.bi-ad .s-lines{position:absolute;inset:0;background:repeating-conic-gradient(from 0deg at 18% 115%,rgba(255,255,255,.0) 0deg,rgba(255,255,255,.22) 1.2deg,rgba(255,255,255,0) 2.6deg,rgba(255,255,255,0) 7deg);filter:blur(calc(var(--u)*.6));-webkit-mask:radial-gradient(120% 90% at 20% 110%,#000 30%,transparent 80%);mask:radial-gradient(120% 90% at 20% 110%,#000 30%,transparent 80%)}
.bi-ad .s-sp-h{left:var(--m);right:var(--m);bottom:var(--m);font-size:calc(var(--u)*10);text-transform:uppercase;font-weight:500;line-height:.92;letter-spacing:-.03em}
.bi-ad .s-wc-h{left:var(--m);right:var(--m);top:var(--m);font-size:calc(var(--u)*9.4);text-transform:uppercase;font-weight:500;line-height:.92;letter-spacing:-.03em}
.bi-ad .s-wc-m{left:var(--m);bottom:var(--m);display:flex;align-items:center;font-size:calc(var(--u)*6);font-weight:500;letter-spacing:-.03em} .bi-ad .s-wc-m .s-mk{color:var(--accent)} .bi-ad .s-wc-m sup{font-size:.3em}
.bi-ad .s-teal{position:absolute;inset:0;background:linear-gradient(180deg,color-mix(in srgb,var(--bg) 70%,transparent),color-mix(in srgb,var(--bg) 30%,transparent) 50%,color-mix(in srgb,var(--bg) 60%,transparent))}
.bi-ad .s-bn-h{left:var(--m);top:var(--m);font-size:calc(var(--u)*6);text-transform:uppercase;font-weight:500;line-height:.95}
.bi-ad .s-bn-w{left:var(--m);right:var(--m);bottom:var(--m);font-size:calc(var(--u)*18);font-weight:500;letter-spacing:-.05em;line-height:.8;color:#f6eadf;white-space:nowrap} .bi-ad .s-bn-w sup{font-size:.2em}
/* events */
.bi-ad .s-ev-h{left:var(--m);top:var(--m);font-size:calc(var(--u)*15);text-transform:uppercase;font-weight:800;line-height:.84;letter-spacing:-.04em}
.bi-ad .s-digits{position:absolute;z-index:5;left:var(--m);top:50%;display:flex;gap:calc(var(--u)*.8)} .bi-ad .s-digits b{width:calc(var(--u)*5);height:calc(var(--u)*5);border-radius:50%;background:var(--accent);color:#fff;display:grid;place-items:center;font-family:var(--ftv);font-weight:400;font-size:calc(var(--u)*2.6)}
.bi-ad .s-digits b.dash{background:#d9d9d9;color:var(--ink)} .bi-ad .s-digits.col{left:auto;right:var(--m);top:var(--m);flex-direction:column}
.bi-ad .s-vcols{position:absolute;z-index:5;right:var(--m);top:var(--m);bottom:24%;display:flex;flex-direction:column;justify-content:space-between} .bi-ad .s-vcols p{position:static;writing-mode:vertical-rl;font-size:calc(var(--u)*1.5);opacity:.7}
.bi-ad .s-search{position:absolute;z-index:5;left:50%;top:40%;translate:-50% -50%;width:calc(var(--u)*13);aspect-ratio:1;border-radius:50%;background:rgba(255,255,255,.08);display:grid;place-items:center} .bi-ad .s-search svg{width:45%;fill:none;stroke:currentColor;stroke-width:1.8}
.bi-ad .s-ed-h{left:var(--m);bottom:calc(var(--m) + var(--u)*18);font-size:calc(var(--u)*11);font-weight:700;line-height:.88;letter-spacing:-.04em}
.bi-ad .s-reddot{position:absolute;z-index:5;left:var(--m);top:var(--m);width:calc(var(--u)*4.4);aspect-ratio:1;border-radius:50%;background:var(--accent)}
.bi-ad .s-e22-h{left:34%;top:20%;font-size:calc(var(--u)*7);font-weight:700;line-height:.9;letter-spacing:-.04em}
.bi-ad .s-e22-l{position:absolute;z-index:5;left:34%;top:36%;width:30%;display:grid;gap:calc(var(--u)*2.4);font-size:calc(var(--u)*1.5)} .bi-ad .s-e22-l p{position:static;line-height:1.3}
.bi-ad .s-e22-n{right:-4%;bottom:-6%;font-size:calc(var(--u)*46);color:var(--accent);font-weight:700;line-height:.8;letter-spacing:-.06em}
/* accent bar and orange */
.bi-ad .s-top55{position:absolute;left:0;right:0;top:0;height:52%;overflow:hidden}
.bi-ad .s-ab-h{left:calc(var(--m) + var(--u)*3);right:var(--m);top:56%;font-size:calc(var(--u)*5.4);font-weight:400;line-height:1.05;letter-spacing:-.02em;border-left:calc(var(--u)*.9) solid var(--accent);padding-left:calc(var(--u)*2.4);margin-left:calc(var(--u)*-3)}
.bi-ad .s-ob{position:absolute;left:0;right:0;bottom:0;height:52%;overflow:hidden}
.bi-ad .s-otop{position:absolute;left:0;right:0;top:0;height:48%;background:var(--accent)}
.bi-ad .s-ot-h{left:var(--m);top:var(--m);font-size:calc(var(--u)*5.4);font-weight:400;line-height:1.05;border-left:calc(var(--u)*.9) solid #fff;padding-left:calc(var(--u)*2.4)}
.bi-ad .s-ggrid{position:absolute;inset:0;background:linear-gradient(rgba(255,255,255,.2) 1px,transparent 1px) 0 0/calc(100%/8) calc(100%/10),linear-gradient(90deg,rgba(255,255,255,.2) 1px,transparent 1px) 0 0/calc(100%/8) calc(100%/10),var(--bg)}
.bi-ad .s-gph{position:absolute;left:10%;right:10%;top:8%;bottom:0;overflow:hidden;-webkit-mask:radial-gradient(70% 80% at 50% 45%,#000 55%,transparent 80%);mask:radial-gradient(70% 80% at 50% 45%,#000 55%,transparent 80%)}
.bi-ad .s-gfade{position:absolute;left:0;right:0;bottom:0;height:40%;background:linear-gradient(transparent,var(--g2))}
.bi-ad .s-gw{left:0;right:0;bottom:var(--m);text-align:center;font-size:calc(var(--u)*3.6);text-transform:uppercase;font-weight:700;letter-spacing:.14em}
/* macro and lab */
.bi-ad .s-top80{position:absolute;left:0;right:0;top:0;height:72%;overflow:hidden}
.bi-ad .s-dotlab{position:absolute;z-index:5;left:var(--m);top:calc(72% + var(--u)*3);font-size:calc(var(--u)*2.4);font-weight:500;display:flex;align-items:center;gap:calc(var(--u)*1)} .bi-ad .s-dotlab::before{content:"";width:calc(var(--u)*1.6);aspect-ratio:1;border-radius:50%;background:var(--accent)}
.bi-ad .s-st-h{left:var(--m);top:var(--m);font-size:calc(var(--u)*11);font-weight:400;line-height:.9;letter-spacing:-.04em}
.bi-ad .s-blobs{position:absolute;inset:0;width:100%;height:100%}
.bi-ad .s-bfade{position:absolute;left:0;right:0;bottom:0;height:34%;background:linear-gradient(transparent,var(--bg) 70%)}
.bi-ad .s-bp-h{left:var(--m);bottom:var(--m);font-size:calc(var(--u)*7);font-weight:400;line-height:.95;letter-spacing:-.03em}
/* blue athletic */
.bi-ad .s-bfph{position:absolute;left:0;right:0;bottom:0;height:62%;z-index:2;background:linear-gradient(transparent,color-mix(in srgb,var(--g1) 85%,transparent) 30%,var(--g1) 55%,var(--g2))}
.bi-ad .s-bf-h{left:var(--m);right:var(--m);bottom:var(--m);font-size:calc(var(--u)*8.4);font-weight:400;line-height:.98;letter-spacing:-.03em}
.bi-ad .s-bgrad{position:absolute;inset:0;background:linear-gradient(180deg,var(--bg),var(--g1) 45%,var(--g2))}
.bi-ad .s-k{left:var(--m);top:var(--m);font-size:calc(var(--u)*26);font-weight:400;line-height:.85;letter-spacing:-.05em}
.bi-ad .s-orb{position:absolute;inset:0;background:radial-gradient(48% 42% at 50% 50%,var(--g2) 0,var(--g1) 45%,color-mix(in srgb,var(--g1) 30%,var(--bg)) 70%,var(--bg) 92%)}
.bi-ad .s-orb-w{left:0;right:0;justify-content:center;top:50%;translate:0 -50%;display:flex;align-items:center;font-size:calc(var(--u)*5);text-transform:uppercase;font-weight:800} .bi-ad .s-orb-w sup{font-size:.4em}
.bi-ad .s-co{position:absolute;z-index:5;display:flex;align-items:center;gap:calc(var(--u)*1);font-size:calc(var(--u)*1.6);text-transform:uppercase;letter-spacing:.04em;font-weight:500;white-space:nowrap}
.bi-ad .s-co i{width:calc(var(--u)*8);height:1px;background:currentColor;position:relative} .bi-ad .s-co i::before{content:"";position:absolute;left:0;top:50%;width:calc(var(--u)*1);aspect-ratio:1;border-radius:50%;background:currentColor;translate:-50% -50%}
.bi-ad .s-co.r{flex-direction:row-reverse} .bi-ad .s-co.r i::before{left:100%}
.bi-ad .s-bluefield{position:absolute;inset:0;background:radial-gradient(70% 55% at 80% 90%,#ffffff 0,var(--g1) 40%,var(--g2) 100%)}
.bi-ad .s-by-h{left:var(--m);right:var(--m);bottom:calc(var(--m) + var(--u)*7);font-size:calc(var(--u)*7.4);text-transform:uppercase;font-weight:300;line-height:1} .bi-ad .s-by-h span{white-space:nowrap}
.bi-ad .s-bluecorner{position:absolute;inset:0;background:radial-gradient(60% 50% at 10% 0%,var(--g1),transparent 70%),radial-gradient(60% 40% at 100% 100%,color-mix(in srgb,var(--g1) 70%,transparent),transparent 70%)}
.bi-ad .s-of{left:var(--m);right:var(--m);font-size:calc(var(--u)*5.4);text-transform:uppercase;font-weight:300;line-height:1} .bi-ad .s-of.a{top:31%} .bi-ad .s-of.b{top:47%}
/* sport motion type */
.bi-ad .s-mw{left:0;right:0;top:46%;text-align:center;font-size:calc(var(--u)*14);text-transform:uppercase;font-weight:800;letter-spacing:.02em;color:#fff}
.bi-ad .s-mw.ghost{filter:blur(calc(var(--u)*1.2));scale:1.16 1;opacity:.75}
.bi-ad .s-gh{left:var(--m);top:var(--m);font-size:calc(var(--u)*14);text-transform:uppercase;font-weight:800;line-height:.86;color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.3);filter:blur(calc(var(--u)*.3))}
.bi-ad .s-gh-h{left:var(--m);bottom:var(--m);font-size:calc(var(--u)*6);text-transform:uppercase;font-weight:800;line-height:.92}
.bi-ad .s-skyg{position:absolute;inset:0;background:linear-gradient(180deg,var(--g2),var(--bg) 50%,var(--g1))}
.bi-ad .s-bc-b{left:-4%;right:-4%;top:50%;translate:0 -50%;text-align:center;font-size:calc(var(--u)*30);text-transform:uppercase;font-weight:800;color:#fff;filter:blur(calc(var(--u)*1.6));opacity:.85;letter-spacing:-.02em}
.bi-ad .s-bc{left:0;right:0;top:50%;translate:0 -50%;text-align:center;font-size:calc(var(--u)*6);text-transform:uppercase;font-weight:800;letter-spacing:.02em}
/* run club */
.bi-ad .s-run{position:absolute;inset:0}
.bi-ad .s-rm{left:var(--m);top:50%;translate:0 -50%;font-size:calc(var(--u)*9);text-transform:uppercase;font-weight:800;font-style:italic;letter-spacing:-.04em} .bi-ad .s-rm sup{font-size:.3em}
.bi-ad .s-route{position:absolute;z-index:4;left:10%;right:10%;top:48%;width:80%;fill:none;stroke:#fff;stroke-width:.8} .bi-ad .s-route circle{fill:#fff}
.bi-ad .s-stats{position:absolute;z-index:5;left:var(--m);right:var(--m);bottom:var(--m);display:flex;justify-content:space-between} .bi-ad .s-stats p{position:static;display:grid;gap:calc(var(--u)*.6)} .bi-ad .s-stats span{font-size:calc(var(--u)*2);opacity:.8} .bi-ad .s-stats b{font-family:var(--fdv);font-size:calc(var(--u)*3.8);font-weight:600}
.bi-ad .s-sbars{position:absolute;z-index:5;left:var(--m);right:var(--m);top:calc(var(--m) - var(--u)*2);display:flex;gap:calc(var(--u)*.6)} .bi-ad .s-sbars i{flex:1;height:2px;background:rgba(255,255,255,.4)} .bi-ad .s-sbars i:first-child{background:#fff}
.bi-ad .s-who{display:flex;align-items:center;gap:calc(var(--u)*1);text-transform:none;font-size:calc(var(--u)*2.2)} .bi-ad .s-who i{width:calc(var(--u)*3.4);aspect-ratio:1;border-radius:50%;border:1.5px solid currentColor}
.bi-ad .s-vr{left:var(--m);top:calc(var(--m) + var(--u)*10);writing-mode:vertical-rl;rotate:180deg;font-size:calc(var(--u)*9);text-transform:uppercase;font-weight:800;line-height:.9}
.bi-ad .s-vr-t{right:var(--m);bottom:calc(var(--m) + var(--u)*9);text-align:right;font-size:calc(var(--u)*4.4);text-transform:uppercase;font-weight:800;line-height:.95}
.bi-ad .s-reply{position:absolute;z-index:5;left:var(--m);right:var(--m);bottom:var(--m);height:calc(var(--u)*5.4);border-radius:99px;border:1px solid rgba(255,255,255,.5)}
.bi-ad .s-sw{font-size:calc(var(--u)*9);text-transform:uppercase;font-weight:800;line-height:.9}
.bi-ad .s-mf{right:var(--m);top:50%;translate:0 -50%;text-align:right;line-height:1.5;font-size:calc(var(--u)*1.9)}
/* neon beauty */
.bi-ad .s-dots{position:absolute;inset:0;z-index:4} .bi-ad .s-dots i{position:absolute;width:calc(var(--u)*var(--r));aspect-ratio:1;border-radius:50%;background:#fff}
.bi-ad .s-df-h{right:var(--m);bottom:var(--m);text-align:right;font-size:calc(var(--u)*6);text-transform:uppercase;font-weight:600;line-height:1;color:#fff}
.bi-ad .s-ne-h{left:0;right:0;top:20%;text-align:center;font-size:calc(var(--u)*7);font-weight:600;line-height:1}
.bi-ad .s-ne-h .s-acc{color:var(--ink);text-transform:uppercase;font-weight:800}
.bi-ad .s-rib{position:absolute;inset:0;width:100%;height:100%;z-index:2}
.bi-ad .s-neondot{position:absolute;z-index:4;left:44%;top:66%;width:calc(var(--u)*7);aspect-ratio:1;border-radius:50%;background:var(--accent);box-shadow:0 0 0 calc(var(--u)*1) color-mix(in srgb,var(--accent) 40%,transparent)}
.bi-ad .s-rp-h{left:var(--m);top:var(--m);text-align:left;font-size:calc(var(--u)*5);text-transform:uppercase;font-weight:600;line-height:1.05}
.bi-ad .s-rt-h{left:0;right:0;top:12%;text-align:center;font-size:calc(var(--u)*7);font-weight:400;line-height:1}
.bi-ad .s-prods{position:absolute;z-index:5;left:var(--m);right:var(--m);top:30%;bottom:20%;display:grid;grid-template-columns:repeat(4,1fr);gap:calc(var(--u)*2);align-items:end}
.bi-ad .s-prods div{display:grid;gap:calc(var(--u)*1.6);justify-items:center;height:100%;grid-template-rows:1fr auto} .bi-ad .s-prods span{position:relative;width:100%;height:100%} .bi-ad .s-prods span .bi-media{mix-blend-mode:multiply}
.bi-ad .s-prods b{padding:calc(var(--u)*.7) calc(var(--u)*1.8);border-radius:99px;background:var(--accent);font-size:calc(var(--u)*1.8);font-weight:500;white-space:nowrap}
.bi-ad .s-topshade{position:absolute;left:0;right:0;top:0;height:30%;z-index:2;background:linear-gradient(rgba(0,0,0,.35),transparent)}
/* carousel covers */
.bi-ad .s-warm{position:absolute;inset:0;background:linear-gradient(180deg,color-mix(in srgb,var(--bg) 40%,transparent),color-mix(in srgb,var(--g2) 70%,transparent))}
.bi-ad .s-pa1{left:var(--m);top:46%;width:calc(var(--u)*4)} .bi-ad .s-pa2{right:var(--m);bottom:calc(var(--m) + var(--u)*8);width:calc(var(--u)*10);stroke-width:1.4}
.bi-ad .s-pa-h{left:var(--m);right:var(--m);top:53%;font-size:calc(var(--u)*8);text-transform:uppercase;font-weight:800;line-height:.92}
.bi-ad .s-pc-h{left:0;right:0;top:65%;text-align:center;font-size:calc(var(--u)*11);font-weight:600;letter-spacing:-.04em;line-height:1}
.bi-ad .s-pc-i{position:absolute;z-index:5;left:0;right:0;top:calc(65% + var(--u)*10);text-align:center;font-family:var(--ftv);font-style:italic;font-size:calc(var(--u)*10);line-height:.9}
.bi-ad .s-go{position:absolute;z-index:5;left:50%;bottom:calc(var(--m) + var(--u)*7);translate:-50% 0;width:calc(var(--u)*5);aspect-ratio:1;border-radius:50%;background:#fff;color:#111;display:grid;place-items:center} .bi-ad .s-go svg{width:60%;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.bi-ad .s-rib-g{position:absolute;left:0;top:0;bottom:0;width:48%;overflow:hidden;z-index:2} .bi-ad .s-rib-g .bi-media{width:208%;max-width:none;filter:blur(calc(var(--u)*.6)) brightness(1.08)}
.bi-ad .s-rib-g::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,rgba(255,255,255,.16) 0 calc(var(--u)*.5),rgba(0,0,0,.14) calc(var(--u)*.9),rgba(255,255,255,0) calc(var(--u)*1.6))}
.bi-ad .s-rbar{left:var(--m);top:var(--m);width:calc(var(--u)*6);stroke-width:1.6}
.bi-ad .s-rb-h{left:var(--m);right:var(--m);top:28%;font-size:calc(var(--u)*9);text-transform:uppercase;font-weight:800;line-height:.92}
.bi-ad .s-rb-s{left:var(--m);right:var(--m);top:calc(28% + var(--u)*38);font-size:calc(var(--u)*2.4);font-weight:600}
.bi-ad .s-save{display:flex;justify-content:center;align-items:center;gap:calc(var(--u)*1)} .bi-ad .s-save svg{width:calc(var(--u)*2.6);fill:currentColor}
@container (min-aspect-ratio: 13/10){
  .bi-ad .s-ins-h,.bi-ad .s-ins-h+.s-p{width:30%} .bi-ad .s-row4{left:52%;top:var(--m);bottom:var(--m);height:auto;grid-template-columns:1fr 1fr}
  .bi-ad .s-dw-ph{height:100%;right:44%} .bi-ad .s-dw-h{right:var(--m);top:calc(var(--m) + var(--u)*8);color:inherit}
  .bi-ad .s-det-t{top:18%} .bi-ad .s-detb{top:64%!important} .bi-ad .s-ffb{left:var(--m)!important;top:30%!important;width:36%!important} .bi-ad .s-ff{right:46%} .bi-ad .s-row4{left:58%!important} .bi-ad .s-csn{left:50%!important} .bi-ad .s-vc{font-size:calc(var(--u)*10)}
  .bi-ad .s-cm.a{left:34%} .bi-ad .s-wcard{left:auto;right:8%;width:40%;top:50%;translate:0 -50%}
  .bi-ad .s-half{height:100%;right:50%} .bi-ad .s-cs{left:50%;top:30%}
  .bi-ad .s-bd{font-size:calc(var(--u)*7)} .bi-ad .s-bd.b{left:52%;top:var(--m)} .bi-ad .s-just{font-size:calc(var(--u)*6.4)}
  .bi-ad .s-top55{height:100%;right:50%} .bi-ad .s-ab-h{left:calc(50% + var(--m) + var(--u)*3);top:var(--m)} .bi-ad .s-ob{height:100%;left:50%} .bi-ad .s-otop{height:100%;right:50%}
  .bi-ad .s-top80{height:100%;right:46%} .bi-ad .s-dotlab{left:58%;top:var(--m)} .bi-ad .s-mb{left:58%!important;width:36%!important} .bi-ad .s-mc{left:58%!important}
  .bi-ad .s-pcp{top:36%!important} .bi-ad .s-pc-h{top:42%} .bi-ad .s-pc-i{top:calc(42% + var(--u)*10)}
  .bi-ad .s-e22-n{font-size:calc(var(--u)*60)} .bi-ad .s-k{font-size:calc(var(--u)*30)}
  .bi-ad .s-mw{font-size:calc(var(--u)*16)} .bi-ad .s-vr{writing-mode:horizontal-tb;rotate:0deg;top:auto;bottom:calc(var(--m) + var(--u)*9)} .bi-ad .s-vrw{top:30%!important}
  .bi-ad .s-prods{left:18%;right:18%} .bi-ad .s-rib-g{width:40%}
  .bi-ad .s-rb-h{right:40%} .bi-ad .s-rb-s{top:auto;bottom:calc(var(--m) + var(--u)*6)}
}
@container (max-aspect-ratio: 7/10){
  .bi-ad .s-row4{height:18%} .bi-ad .s-dw-ph{height:58%} .bi-ad .s-dw-h{top:calc(58% + var(--u)*3)}
  .bi-ad .s-pf-h{font-size:calc(var(--u)*9.2)} .bi-ad .s-wcard{left:8%;right:8%}
  .bi-ad .s-just{font-size:calc(var(--u)*8.6)} .bi-ad .s-ev-h{font-size:calc(var(--u)*17)}
  .bi-ad .s-k{font-size:calc(var(--u)*24)} .bi-ad .s-rb-s{top:calc(28% + var(--u)*40)}
}`;
