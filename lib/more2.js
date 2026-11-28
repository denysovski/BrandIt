// BrandIt: the third moodboard set — real blur and motion, windows into the photo, letter crops, lineups and
// editorial strips. Layout patterns only; all copy, marks and shapes are our own. Blur is real: the photo is
// duplicated and blurred with CSS filters, so it works on any photo you upload and in the exported PNG.
import { esc, lines, list, img, icon, L, logo } from './motion.js?v=35';

const plus = '<i class="y-plus" aria-hidden="true"></i>';
const corners4 = '<i class="y-cm tl"></i><i class="y-cm tr"></i><i class="y-cm bl"></i><i class="y-cm br"></i>';

export const more2Templates = [
  { id: 'y-motion-blur', name: 'Motion blur headline', cat: 'Bold photo', look: L('#3a0e02', '#ffffff', '#ffffff', '#ff5a12', '#2a0600', 'tight', 'tight'), art: ['front', ['#4a1202', '#ff7a2a']],
    fields: { tags: 'Creative.\nDesigner.\nMinimal.\nBrand.', head: 'Focus on clarity\n& function', body: 'Every element should have a purpose. Minimal is as useful as it is beautiful.', num: '04' },
    html: (f, im, b) => `${img(im)}${img(im, 'y-zoomblur')}<div class="mo-tint"></div><div class="y-tags">${list(f.tags).map((t) => `<p>${esc(t)}</p>`).join('')}</div><p class="y-sq"><i></i><i></i><i></i><i class="on"></i><i></i></p>
      <p class="y-ghostnum">${esc(f.num)}</p><p class="mo-dw y-mbh">${lines(f.head)}</p><p class="mo-small y-mbb">${esc(f.body)}</p>
      <p class="y-social">${icon.heart}${icon.send}</p><p class="mo-dw y-lgr">${logo(b, b.name)}</p>` },
  { id: 'y-red-profile', name: 'Red profile', cat: 'Sport', look: L('#e0120f', '#f3efe9', '#f3efe9', '#e0120f', '#0b0000', 'tight', 'tight'), art: ['profile', ['#2a0000', '#ff2a1f']],
    fields: { left: 'Night series\nTour © 2026', right: 'This race asks\nfor everything.' },
    html: (f, im, b) => `${img(im, 'grey')}<div class="y-red"></div><div class="mo-grain"></div><p class="mo-dw y-rl">${lines(f.left)} <span class="y-lgi">${logo(b, '')}</span></p><p class="mo-dw y-rr">${lines(f.right)}</p>` },
  { id: 'y-word-column', name: 'Word column', cat: 'Minimal', look: L('#ececec', '#ff1a1a', '#ff1a1a', '#ececec', '#0b0b0b', 'tight', 'tight'), art: ['profile', ['#ececec', '#ffffff']],
    fields: { words: 'You\nwait\nfor\na\nsign\nwhen\nyou\ncould\nbe\nmoving' },
    html: (f, im) => `${img(im, 'y-softblur')}<div class="y-col">${list(f.words).map((w) => `<p>${esc(w)}</p>`).join('')}</div>` },
  { id: 'y-speed', name: 'Speed poster', cat: 'Sport', look: L('#111111', '#ffffff', '#ff2a1f', '#111111', '#000000', 'wide', 'tight'), art: ['up', ['#1a1a1a', '#bdbdbd']],
    fields: { top: 'This race asks\nfor everything', word: 'AIR', line: 'Move first', date: 'Nov\n2026', body: 'Nothing is given, it is earned. Every hard morning brings you one step closer to the line. When others stop, keep going. Trust the work and the miles you put in.' },
    html: (f, im, b) => `${img(im, 'grey')}${img(im, 'y-streak a')}${img(im, 'y-streak b')}<div class="mo-shade"></div><div class="mo-grain"></div><p class="mo-dw y-top">${lines(f.top)}</p><p class="mo-dw y-lgtr">${logo(b, b.name)}</p>
      <p class="mo-dw y-air">${esc(f.word)}</p><p class="mo-dw y-jd">${esc(f.line)}</p><p class="mo-dw y-date">${lines(f.date)}</p><p class="mo-micro y-sbody">${esc(f.body)}</p>` },
  { id: 'y-lineup', name: 'Lineup', cat: 'Sport', slots: ['Background', 'Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5'], look: L('#1c1c1c', '#ffffff', '#e8160c', '#e8160c', '#1c1c1c', 'wide', 'tight'), art: ['front', ['#3a3a3a', '#e6e6e6']],
    fields: { head: 'Starting\nlineup', players: 'Ada Novak 4\nEli Brand 9\nJon Varga 19\nMia Holm 5\nTom Reyes 3', a: 'PRG', vs: 'vs', b: 'BRN' },
    html: (f, im, b, c, ims = []) => `<div class="y-city">${img(ims[0] || im, 'grey dim')}</div><div class="mo-grain"></div><p class="mo-dw y-luh">${lines(f.head)}</p><p class="mo-dw y-lglu">${logo(b, b.name)}</p>
      <div class="y-cards">${list(f.players).slice(0, 5).map((p, k) => { const m = p.match(/^(.*?)\s*(\d+)?$/); return `<div>${img(ims[k + 1] || im, 'grey')}<i class="y-redblur"></i><p><span>${esc(m[1])}</span><b>${esc(m[2] || '')}</b></p></div>`; }).join('')}</div>
      <p class="mo-dw y-team l">${esc(f.a)}</p><p class="mo-dw y-team c">${esc(f.vs)}</p><p class="mo-dw y-team r">${esc(f.b)}</p>` },
  { id: 'y-focus-window', name: 'Focus window', cat: 'Bold photo', slots: ['Background', 'Window'], look: L('#0a4fd8', '#ffffff', '#ff4a1a', '#0a5cff', '#021a5a', 'grotesk', 'grotesk'), art: ['front', ['#0a2a7a', '#ff6a3a']],
    fields: { t1: 'light', t2: 'focus', t3: 'shine', word: 'Focus', l1: 'Designed\nby focus.', l2: 'Defined\nby light.', r1: 'Find your\nlight in the\nblur.', r2: 'Red meets\nblue.', stamp: '03-11-2026  15:45' },
    html: (f, im, b, c, ims = []) => `${img(ims[0] || im, 'y-halftone')}<div class="y-blue"></div><div class="y-dotsov"></div><div class="y-win">${img(ims[1] || ims[0] || im)}</div><div class="y-winf">${corners4}${plus}</div>
      <p class="mo-micro" style="left:var(--m);top:var(--m);text-transform:none">${esc(f.t1)}</p><p class="mo-micro" style="left:50%;top:var(--m);text-transform:none">${esc(f.t2)}</p><p class="mo-micro" style="right:var(--m);top:var(--m);text-transform:none">${esc(f.t3)}</p>
      <p class="mo-dw y-fw">${esc(f.word)}</p><p class="mo-micro" style="left:var(--m);top:55%">${lines(f.l1)}</p><p class="mo-micro" style="left:17%;top:55%">${lines(f.l2)}</p><p class="mo-micro" style="left:64%;top:79%">${lines(f.r1)}</p><p class="mo-micro" style="left:76%;top:79%;text-align:right">${lines(f.r2)}</p><p class="mo-micro" style="left:var(--m);bottom:var(--m)">${esc(f.stamp)}</p>` },
  { id: 'y-giant-letters', name: 'Giant letters', cat: 'Bold photo', look: L('#1a2a40', '#57c4ff', '#57c4ff', '#57c4ff', '#0b1626', 'wide', 'tight'), art: ['front', ['#1a2a40', '#8aa4bf']],
    fields: { word: 'NOVA', top: 'Reconnect', tour: 'Europe tour\n2026', date: '18-19-20\nSeptember\n2026', more: 'More details\nout soon', city: 'Prague' },
    html: (f, im) => `${img(im)}<p class="y-gl a">${esc(f.word.slice(0, 1))}</p><p class="y-gl b">${esc(f.word.slice(-1))}</p><p class="y-gl c">${esc(f.word.slice(-2))}</p><p class="mo-dw y-gtop">${esc(f.top)}</p>
      <p class="mo-small y-gtour">${lines(f.tour)}</p><p class="mo-dw y-gw">${esc(f.word)}</p><p class="mo-micro y-gcity">${esc(f.city)}</p><p class="mo-dw y-gdate">${lines(f.date)}</p><p class="mo-dw y-gmore">${lines(f.more)}</p>` },
  { id: 'y-stacked-accent', name: 'Stacked accent', cat: 'Bold photo', look: L('#0d0d0d', '#ffffff', '#e2ff1a', '#e2ff1a', '#0d0d0d', 'tight', 'tight'), art: ['up', ['#1a1a1a', '#9a9a9a']],
    fields: { tags: 'Studio • Branding • Design', a: 'BE', b: 'PUR\nPOSE\nFUL', c: '*Be* intentional' },
    html: (f, im) => `${img(im, 'grey')}${img(im, 'y-streak a')}<div class="mo-shade"></div><p class="mo-micro y-st">${esc(f.tags)}</p><p class="mo-dw y-be">${esc(f.a)}</p><i class="y-astbox"><svg viewBox="0 0 100 100"><g stroke="#0d0d0d" stroke-width="10"><path d="M50 12v76M12 50h76M23 23l54 54M77 23 23 77"/></g></svg></i>
      <p class="mo-dw y-pur">${lines(f.b)}<sup>©</sup></p><p class="y-arrow2">↗</p><p class="mo-dw y-sub2">${esc(f.c).replace(/\*([^*]+)\*/g, '<span class="mo-acc">$1</span>')}</p>` },
  { id: 'y-letter-window', name: 'Letter window', cat: 'Professional', look: L('#000000', '#ffffff', '#ff2a1f', '#ff2a1f', '#000000', 'tight', 'tight'), art: ['object', ['#6a7a8a', '#f2c08a']],
    fields: { label: 'Logistics', head: 'Modern delivery\nsolutions', body: 'We move goods fast and reliably for modern business. One network connects warehouses, hubs and routes so every order arrives on time.', name: 'NORTH.' },
    html: (f, im, b) => `<div class="y-shape">${img(im)}</div><p class="mo-micro" style="left:var(--m);top:60%">${esc(f.label)}</p><p class="mo-dw y-lwh">${lines(f.head)}</p><i class="y-redsq"></i><p class="mo-micro y-lwb">${esc(f.body)}</p><p class="mo-dw y-lwl">${logo(b, b.short)}</p><p class="mo-dw y-lwn">${esc(f.name)}</p>` },
  { id: 'y-notch', name: 'Notched panel', cat: 'Professional', look: L('#3a383d', '#f1f1f1', '#f1f1f1', '#cfcfd2', '#3a383d', 'tight', 'tight'), art: ['object', ['#1e1e22', '#9a9aa2']],
    fields: { head: 'Built to *resonate*', name: 'formwork', sub: 'Architecture\nstudio' },
    html: (f, im, b) => `<div class="y-ntop">${img(im, 'grey')}</div><p class="mo-dw y-nh">${esc(f.head).replace(/\*([^*]+)\*/g, '<em>$1</em>')}</p><div class="y-npanel"><p class="mo-dw">${esc(f.name)}</p><p class="s">${lines(f.sub)}</p><span class="y-nlogo">${logo(b, b.short)}</span></div>` },
  { id: 'y-wave', name: 'Wave card', cat: 'Bold photo', look: L('#2b2bd9', '#ffffff', '#ffffff', '#2b2bd9', '#ffffff', 'tight', 'tight'), art: ['front', ['#7a7a7a', '#e6e6e6']],
    fields: { head: 'Over\ncome', body: 'Made for the street and the long walk home. Heavy cotton, cut loose, built to last.' },
    html: (f, im, b) => `<div class="y-wtop">${img(im)}</div><svg class="y-wcut" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true"><path d="M0 20 L0 14 C30 14 40 12 52 6 C58 3 62 0 66 0 C70 0 72 6 76 10 C80 14 90 14 100 14 L100 20Z" fill="var(--bg)"/></svg><div class="y-wbot"></div><p class="mo-dw y-wh">${lines(f.head)}</p><p class="mo-micro y-wb">${esc(f.body)}</p><p class="mo-dw y-wl">${logo(b, b.short)}</p>` },
  { id: 'y-dot-grid', name: 'Dot grid board', cat: 'Editorial', slots: ['Photo 1', 'Photo 2', 'Photo 3', 'Photo 4', 'Photo 5'], look: L('#ffffff', '#0b0b0b', '#e2ff1a', '#e2ff1a', '#0b0b0b', 'tight', 'tight'), art: ['front', ['#d9d9d9', '#f2f2f2']],
    fields: { date: 'May 27', intro: 'a talk at north', head: 'Off the\nrecord', sub: 'five designers,\nfive paths', tile: 'design\nmeetup' },
    html: (f, im, b, cc, ims = []) => `<div class="y-dg"></div>${[[0, 0], [1, 1], [3, 1], [2, 2], [4, 2]].map(([c, r], k) => `<div class="y-cell" style="--c:${c};--r:${r}">${img(ims[k] || im)}</div>`).join('')}<div class="y-cell k" style="--c:3;--r:3"><p>${lines(f.tile)}</p></div><div class="y-cell a" style="--c:4;--r:3">${logo(b, b.short)}</div>
      <p class="y-datebox">${esc(f.date)}</p><p class="mo-small y-dgi">${esc(f.intro)}</p><p class="mo-dw y-dgh">${lines(f.head)}</p><p class="mo-small y-dgs">${lines(f.sub)}</p>` },
  { id: 'y-team-intro', name: 'Team intro', cat: 'Professional', look: L('#8a4a2e', '#fff4e6', '#fff4e6', '#c26a42', '#2a120a', 'condensed', 'grotesk'), art: ['front', ['#7a3a22', '#e8a07a']],
    fields: { name: 'Ada\nNovak', role: 'Communications', line: 'and our spreadsheet star ✦', handle: '@ada.novak' },
    html: (f, im, b) => `${img(im)}<div class="mo-shade low"></div><p class="mo-dw y-tilg">${logo(b, b.name)}</p><div class="y-ti"><p class="mo-dw">${lines(f.name)}</p><p class="r">${esc(f.role)}</p><p>${esc(f.line)}</p><p class="h">${esc(f.handle)}</p></div>` },
  { id: 'y-numbered-quote', name: 'Numbered quote', cat: 'Editorial', look: L('#7c7c7c', '#ffffff', '#e8160c', '#7c7c7c', '#2a2a2a', 'tight', 'tight'), art: ['profile', ['#5a5a5a', '#bdbdbd']],
    fields: { num: '13.', quote: 'Interesting beats perfect —', rest: 'we want people doing\nthings nobody else does.', foot: 'Open—Studio' },
    html: (f, im) => `${img(im, 'grey')}<div class="mo-grain"></div><i class="y-cross" style="left:10%;top:8%"></i><i class="y-cross" style="right:10%;top:8%"></i><i class="y-cross" style="left:10%;bottom:8%"></i><i class="y-cross" style="right:10%;bottom:8%"></i>
      <p class="y-numtag">${esc(f.num)}</p><p class="y-nq"><em>${esc(f.quote)}</em><br>${lines(f.rest)}</p><p class="mo-micro" style="left:0;right:0;bottom:8%;text-align:center">${esc(f.foot)}<sup>®</sup></p>` },
  { id: 'y-info-strip', name: 'Info strip', cat: 'Editorial', look: L('#5a5a5a', '#ffffff', '#ffffff', '#5a5a5a', '#111111', 'tight', 'tight'), art: ['front', ['#3a3a3a', '#d6d6d6']],
    fields: { c1: 'North\nThen and now\n\nMulti\nplatinum artist', c2: 'EU tour\n2026\n\nOfficer of\nthe late-night order', c3: 'Feat\nAda Novak\nEli Brand', c4: 'Dates from\n09 September 2026\n\nTickets from\n€49.99', c5: '\n\n\nOn sale\nat north.live' },
    html: (f, im) => `${img(im, 'grey')}<div class="mo-grain"></div><div class="y-strip"><p>${lines(f.c1)}</p><p>${lines(f.c2)}</p><p>${lines(f.c3)}</p><p>${lines(f.c4)}</p><p class="r">${lines(f.c5)}</p></div>` },
];

export const more2Css = `
.bi-ad .y-zoomblur{filter:blur(calc(var(--u)*1.6)) saturate(1.2);scale:calc(var(--iz,1)*1.12);opacity:.85;-webkit-mask-image:radial-gradient(60% 55% at 50% 50%,transparent 20%,#000 70%);mask-image:radial-gradient(60% 55% at 50% 50%,transparent 20%,#000 70%)}
.bi-ad .y-softblur{filter:blur(calc(var(--u)*1.2)) grayscale(1) contrast(1.1)}
.bi-ad .y-streak{filter:blur(calc(var(--u)*.9)) grayscale(1);opacity:.55;scale:calc(var(--iz,1)*1.18) var(--iz,1)}
.bi-ad .y-streak.a{translate:-4% 0} .bi-ad .y-streak.b{translate:5% 0;opacity:.35}
.bi-ad .y-tags{position:absolute;left:var(--m);right:30%;top:var(--m);display:grid;grid-template-columns:repeat(4,1fr);gap:calc(var(--u)*1);z-index:4;font-size:calc(var(--u)*1.8);line-height:1.2}
.bi-ad .y-sq{position:absolute;right:var(--m);top:var(--m);display:flex;gap:calc(var(--u)*.6);z-index:4}
.bi-ad .y-sq i{width:calc(var(--u)*2.4);height:calc(var(--u)*2.4);background:rgba(255,255,255,.4)} .bi-ad .y-sq i.on{background:#fff}
.bi-ad .y-ghostnum{position:absolute;right:-4%;bottom:-12%;z-index:3;font-family:var(--fdv);font-weight:300;font-size:calc(var(--u)*46);line-height:1;opacity:.14;letter-spacing:-.05em}
.bi-ad .y-mbh{left:var(--m);right:var(--m);top:52%;font-weight:300;font-size:calc(var(--u)*7.6);letter-spacing:-.02em;line-height:.95}
.bi-ad .y-mbb{left:var(--m);right:52%;top:69%;font-weight:400}
.bi-ad .y-social{position:absolute;left:var(--m);bottom:var(--m);display:flex;gap:calc(var(--u)*1.6);z-index:4} .bi-ad .y-social svg{width:calc(var(--u)*3.4);height:calc(var(--u)*3.4)}
.bi-ad .y-lgr{right:var(--m);bottom:var(--m);font-size:calc(var(--u)*3.6)}
.bi-ad .y-red{position:absolute;inset:0;background:var(--g1);mix-blend-mode:multiply;opacity:calc(.7 + var(--ov,.6)*.3)}
.bi-ad .y-rl{left:var(--m);top:47%;font-size:calc(var(--u)*2.8);font-weight:700;text-transform:uppercase;line-height:1}
.bi-ad .y-lgi{font-style:italic;font-weight:800;margin-left:.3em}
.bi-ad .y-rr{left:63%;right:var(--m);top:47%;font-size:calc(var(--u)*2.8);font-weight:700;text-transform:uppercase;line-height:1}
.bi-ad .y-col{position:absolute;left:0;right:0;top:6%;bottom:6%;display:flex;flex-direction:column;justify-content:space-between;align-items:center;z-index:4;font-family:var(--fdv);font-size:calc(var(--u)*2);font-weight:700;text-transform:uppercase;color:var(--ink)}
.bi-ad .y-top{left:var(--m);top:var(--m);color:var(--accent);font-size:calc(var(--u)*2.2);font-weight:800;text-transform:uppercase;line-height:1}
.bi-ad .y-lgtr{right:var(--m);top:var(--m);font-size:calc(var(--u)*4);font-style:italic;font-weight:800}
.bi-ad .y-air{left:var(--m);top:44%;font-size:calc(var(--u)*10);font-weight:800;text-transform:uppercase}
.bi-ad .y-jd{left:48%;top:47%;font-size:calc(var(--u)*4.4);font-weight:800;text-transform:uppercase;font-style:italic}
.bi-ad .y-date{left:var(--m);bottom:var(--m);color:var(--accent);font-size:calc(var(--u)*5);font-weight:800;text-transform:uppercase;line-height:.9}
.bi-ad .y-sbody{left:40%;right:var(--m);bottom:var(--m);text-transform:none;font-weight:400;font-size:calc(var(--u)*1.5);text-align:justify}
.bi-ad .y-city{position:absolute;inset:0;opacity:.45}
.bi-ad .y-luh{left:var(--m);top:var(--m);font-size:calc(var(--u)*7.4);font-weight:800;text-transform:uppercase;line-height:.88}
.bi-ad .y-lglu{right:var(--m);top:calc(var(--m)*1.3);font-size:calc(var(--u)*5);font-weight:800}
.bi-ad .y-cards{position:absolute;left:var(--m);right:var(--m);top:23%;bottom:12%;display:grid;grid-template-columns:repeat(6,1fr);grid-template-rows:1fr 1fr;gap:calc(var(--u)*1.6);z-index:4}
.bi-ad .y-cards div{position:relative;overflow:hidden;grid-column:span 2;background:#ddd}
.bi-ad .y-cards div:nth-child(4){grid-column:2/span 2} .bi-ad .y-cards div:nth-child(5){grid-column:4/span 2}
.bi-ad .y-redblur{position:absolute;inset:0;background:linear-gradient(90deg,transparent 30%,var(--accent) 90%);mix-blend-mode:multiply;-webkit-backdrop-filter:blur(calc(var(--u)*.6));backdrop-filter:blur(calc(var(--u)*.6))}
.bi-ad .y-cards p{position:absolute;left:6%;right:6%;bottom:5%;display:flex;justify-content:space-between;font-size:calc(var(--u)*1.5);font-weight:700;text-transform:uppercase;color:#fff}
.bi-ad .y-team{bottom:calc(var(--m)*.8);color:var(--accent);font-size:calc(var(--u)*3);font-weight:800;text-transform:uppercase}
.bi-ad .y-team.l{left:var(--m)} .bi-ad .y-team.c{left:50%;translate:-50% 0} .bi-ad .y-team.r{right:var(--m)}
.bi-ad .y-halftone{filter:blur(calc(var(--u)*1.1)) contrast(1.4)}
.bi-ad .y-blue{position:absolute;inset:0;background:var(--g1);mix-blend-mode:color;opacity:.9}
.bi-ad .y-dotsov{position:absolute;inset:0;background:radial-gradient(circle,rgba(0,0,0,.55) 32%,transparent 36%) 0 0/calc(var(--u)*.9) calc(var(--u)*.9);mix-blend-mode:multiply;opacity:calc(var(--ov,.6)*.9)}
.bi-ad .y-win{position:absolute;left:50%;top:24%;width:21%;height:38%;overflow:hidden;z-index:3}
.bi-ad .y-win .bi-media{left:-238%;top:-63%;width:476%;height:263%;inset:auto;filter:saturate(1.3)}
.bi-ad .y-winf{position:absolute;left:50%;top:24%;width:21%;height:38%;border:1.5px solid #fff;z-index:4}
.bi-ad .y-cm{position:absolute;width:calc(var(--u)*2.4);height:calc(var(--u)*2.4);border:1.5px solid #fff}
.bi-ad .y-cm.tl{left:-1.2em;top:-1.2em;left:calc(var(--u)*-1.2);top:calc(var(--u)*-1.2)} .bi-ad .y-cm.tr{right:calc(var(--u)*-1.2);top:calc(var(--u)*-1.2)} .bi-ad .y-cm.bl{left:calc(var(--u)*-1.2);bottom:calc(var(--u)*-1.2)} .bi-ad .y-cm.br{right:calc(var(--u)*-1.2);bottom:calc(var(--u)*-1.2)}
.bi-ad .y-plus{position:absolute;left:50%;top:50%;width:calc(var(--u)*4);height:calc(var(--u)*4);translate:-50% -50%;background:linear-gradient(#fff,#fff) 50% 0/1.5px 100% no-repeat,linear-gradient(#fff,#fff) 0 50%/100% 1.5px no-repeat}
.bi-ad .y-fw{left:50%;top:65%;font-size:calc(var(--u)*5);font-weight:500;letter-spacing:-.03em}
.bi-ad .y-gl{position:absolute;z-index:3;font-family:var(--fdv);font-weight:800;color:var(--accent);line-height:.8;letter-spacing:-.04em}
.bi-ad .y-gl.a{left:-12%;top:-8%;font-size:calc(var(--u)*44)} .bi-ad .y-gl.b{right:-14%;top:10%;font-size:calc(var(--u)*48)} .bi-ad .y-gl.c{left:-6%;bottom:-10%;font-size:calc(var(--u)*44)}
.bi-ad .y-gtop{left:0;right:0;top:var(--m);text-align:center;color:var(--accent);font-size:calc(var(--u)*3.2);font-weight:800;text-transform:uppercase}
.bi-ad .y-gtour{left:20%;top:36%;color:var(--accent);text-transform:uppercase}
.bi-ad .y-gw{left:0;right:0;top:44%;text-align:center;color:var(--accent);font-size:calc(var(--u)*19);font-weight:800;text-transform:uppercase;letter-spacing:-.03em}
.bi-ad .y-gcity{left:20%;top:60%;color:var(--accent)}
.bi-ad .y-gdate{left:20%;top:64%;color:var(--accent);font-size:calc(var(--u)*4.6);font-weight:700;text-transform:uppercase;line-height:.95}
.bi-ad .y-gmore{left:58%;top:68%;color:var(--accent);font-size:calc(var(--u)*3);font-weight:600;text-transform:uppercase;line-height:.95}
.bi-ad .y-st{left:20%;right:20%;top:24%;display:flex;justify-content:space-between;font-weight:700;color:#fff}
.bi-ad .y-be{left:20%;top:28%;font-size:calc(var(--u)*14);font-weight:800;letter-spacing:-.06em;color:#fff}
.bi-ad .y-astbox{position:absolute;right:20%;top:29%;width:calc(var(--u)*13);aspect-ratio:1;background:var(--accent);z-index:4;display:grid;place-items:center} .bi-ad .y-astbox svg{width:76%;height:76%}
.bi-ad .y-pur{left:20%;right:20%;top:42%;text-align:right;font-size:calc(var(--u)*14);font-weight:800;letter-spacing:-.06em;color:var(--accent);line-height:.82}
.bi-ad .y-pur sup{font-size:.25em;color:#fff;vertical-align:baseline}
.bi-ad .y-arrow2{position:absolute;left:20%;top:70%;z-index:4;font-size:calc(var(--u)*12);font-weight:300;line-height:1}
.bi-ad .y-sub2{left:20%;top:84%;font-size:calc(var(--u)*6.4);font-weight:800;letter-spacing:-.05em}
.bi-ad .y-shape{position:absolute;left:4%;right:4%;top:4%;height:46%;overflow:hidden;clip-path:polygon(0 0,40% 0,40% 0,58% 30%,58% 0,100% 0,100% 50%,76% 50%,100% 100%,62% 100%,42% 64%,42% 100%,0 100%,0 46%,24% 46%,0 0)}
.bi-ad .y-lwh{left:46%;right:var(--m);top:58%;font-size:calc(var(--u)*5.4);font-weight:400;letter-spacing:-.03em;line-height:1}
.bi-ad .y-redsq{position:absolute;left:var(--m);top:70%;width:calc(var(--u)*2.2);height:calc(var(--u)*2.2);background:var(--accent);z-index:4}
.bi-ad .y-lwb{left:46%;right:var(--m);top:71%;text-transform:none;font-weight:400;line-height:1.4}
.bi-ad .y-lwl{left:var(--m);bottom:var(--m);font-size:calc(var(--u)*6);font-weight:800}
.bi-ad .y-lwn{right:var(--m);bottom:var(--m);font-size:calc(var(--u)*2.4);font-weight:700}
.bi-ad .y-ntop{position:absolute;inset:0;bottom:30%}
.bi-ad .y-nh{left:var(--m);top:var(--m);font-size:calc(var(--u)*6);font-weight:400;letter-spacing:-.03em;color:#fff;white-space:nowrap}
.bi-ad .y-nh em{font-style:italic;font-weight:600}
.bi-ad .y-npanel{position:absolute;left:0;bottom:0;width:66%;height:58%;z-index:3;background:var(--bg);clip-path:polygon(0 0,82% 0,100% 18%,100% 100%,0 100%);padding:calc(var(--u)*30) var(--m) var(--m)}
.bi-ad .y-npanel .mo-dw{position:static;font-size:calc(var(--u)*6);font-weight:500;letter-spacing:-.03em}
.bi-ad .y-npanel .s{font-size:calc(var(--u)*4);line-height:1.05;opacity:.85;margin-top:calc(var(--u)*.6)}
.bi-ad .y-nlogo{position:absolute;left:var(--m);bottom:var(--m);font-family:var(--fdv);font-size:calc(var(--u)*5);font-weight:800}
.bi-ad .y-wtop{position:absolute;left:0;right:0;top:0;height:72%}
.bi-ad .y-wcut{position:absolute;left:0;right:0;top:62%;width:100%;height:10.5%;z-index:2}
.bi-ad .y-wbot{position:absolute;left:0;right:0;top:72%;bottom:0;background:var(--bg)}
.bi-ad .y-wh{left:var(--m);top:75%;font-size:calc(var(--u)*7.4);font-weight:400;text-transform:uppercase;letter-spacing:-.04em;line-height:.9}
.bi-ad .y-wb{left:var(--m);right:46%;bottom:var(--m);text-transform:none;font-weight:400;font-size:calc(var(--u)*1.4)}
.bi-ad .y-wl{right:var(--m);bottom:var(--m);font-size:calc(var(--u)*7);font-weight:800}
.bi-ad .y-dg{position:absolute;inset:0;background:radial-gradient(circle,#555 calc(var(--u)*.35),transparent calc(var(--u)*.4)) calc(var(--u)*2.8) calc(var(--u)*2.4)/18.9% 19.2%}
.bi-ad .y-cell{position:absolute;left:calc(3.4% + var(--c)*18.9%);top:calc(2.6% + var(--r)*19.2%);width:18%;height:18.4%;overflow:hidden;background:#dcdcdc;z-index:3}
.bi-ad .y-cell.k{background:#0b0b0b;color:#fff;display:grid;place-items:center} .bi-ad .y-cell.k p{font-family:var(--fdv);font-weight:700;font-size:calc(var(--u)*3.4);rotate:6deg;line-height:.9;letter-spacing:-.05em}
.bi-ad .y-cell.a{background:var(--accent);display:grid;place-items:center;font-family:var(--fdv);font-size:calc(var(--u)*6);font-weight:800}
.bi-ad .y-datebox{position:absolute;right:4%;top:3.4%;z-index:4;background:#0b0b0b;color:#fff;padding:calc(var(--u)*.8) calc(var(--u)*2);font-size:calc(var(--u)*3)}
.bi-ad .y-dgi{left:var(--m);top:72%;font-size:calc(var(--u)*3.8);font-weight:400}
.bi-ad .y-dgh{left:var(--m);bottom:var(--m);font-size:calc(var(--u)*11);font-weight:800;text-transform:uppercase;letter-spacing:-.03em;line-height:.88}
.bi-ad .y-dgs{right:var(--m);bottom:var(--m);text-align:right;font-size:calc(var(--u)*3.2);font-weight:400;line-height:1.1}
.bi-ad .y-tilg{left:var(--m);top:var(--m);font-size:calc(var(--u)*3);font-weight:800;text-transform:uppercase;font-family:var(--fd,"BI Wide"),sans-serif}
.bi-ad .y-ti{position:absolute;left:0;right:0;bottom:calc(var(--m)*1.2);z-index:4;text-align:center;font-size:calc(var(--u)*2.4);line-height:1.5}
.bi-ad .y-ti .mo-dw{position:static;font-size:calc(var(--u)*7.4);line-height:.95;text-transform:uppercase;margin-bottom:calc(var(--u)*1)}
.bi-ad .y-ti .r{text-transform:uppercase} .bi-ad .y-ti .h{margin-top:calc(var(--u)*.8)}
.bi-ad .y-cross{position:absolute;width:calc(var(--u)*3);height:calc(var(--u)*3);z-index:4;background:linear-gradient(#fff,#fff) 50% 0/1.5px 100% no-repeat,linear-gradient(#fff,#fff) 0 50%/100% 1.5px no-repeat}
.bi-ad .y-numtag{position:absolute;left:0;top:41%;z-index:4;padding:calc(var(--u)*.4) calc(var(--u)*1) calc(var(--u)*.4) calc(var(--u)*8);background:var(--accent);font-family:var(--fdv);font-size:calc(var(--u)*3)}
.bi-ad .y-nq{position:absolute;left:16%;right:48%;top:41%;z-index:4;font-size:calc(var(--u)*2.9);line-height:1.15;font-weight:300}
.bi-ad .y-nq em{font-family:var(--fd,"BI Serif"),serif;font-style:italic;font-weight:400}
.bi-ad .y-strip{position:absolute;left:var(--m);right:var(--m);top:44%;display:grid;grid-template-columns:1.1fr 1.4fr 1.1fr 1fr 1fr;gap:calc(var(--u)*1.4);z-index:4;font-size:calc(var(--u)*1.35);font-weight:700;line-height:1.05;text-transform:uppercase;letter-spacing:-.01em}
.bi-ad .y-strip .r{text-align:right}
@container (min-aspect-ratio: 13/10){ .bi-ad .y-cards{left:30%} .bi-ad .y-npanel{width:40%} .bi-ad .y-shape{height:60%} .bi-ad .y-lwh,.bi-ad .y-lwb{left:56%} }
@container (max-aspect-ratio: 7/10){ .bi-ad .y-cards{top:20%;bottom:16%} .bi-ad .y-shape{height:40%} }`;
