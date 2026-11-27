// BrandIt: shapes as pictures. The photo is seen through one simple shape: a star, a flower, petals, a badge,
// a plus, an arch, a blob, two thick bands or three pills, plus layouts where the photo takes half or a quarter of the page.
// Every shape is our own and drawn from scratch. Two font families at most: --fdv and --ftv.
import { esc, lines, img, L, logo } from './motion.js?v=33';

const SH = {
  star: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cg fill='black'%3E%3Cpath d='M50.0 0.0L62.6 19.5L85.4 14.6L80.5 37.4L100.0 50.0L80.5 62.6L85.4 85.4L62.6 80.5L50.0 100.0L37.4 80.5L14.6 85.4L19.5 62.6L0.0 50.0L19.5 37.4L14.6 14.6L37.4 19.5Z'/%3E%3C/g%3E%3C/svg%3E",
  flower: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cg fill='black'%3E%3Ccircle cx='50.0' cy='23.0' r='23'/%3E%3Ccircle cx='73.4' cy='36.5' r='23'/%3E%3Ccircle cx='73.4' cy='63.5' r='23'/%3E%3Ccircle cx='50.0' cy='77.0' r='23'/%3E%3Ccircle cx='26.6' cy='63.5' r='23'/%3E%3Ccircle cx='26.6' cy='36.5' r='23'/%3E%3Ccircle cx='50' cy='50' r='27'/%3E%3C/g%3E%3C/svg%3E",
  petals: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cg fill='black'%3E%3Ccircle cx='50.0' cy='20.0' r='20'/%3E%3Ccircle cx='71.2' cy='28.8' r='20'/%3E%3Ccircle cx='80.0' cy='50.0' r='20'/%3E%3Ccircle cx='71.2' cy='71.2' r='20'/%3E%3Ccircle cx='50.0' cy='80.0' r='20'/%3E%3Ccircle cx='28.8' cy='71.2' r='20'/%3E%3Ccircle cx='20.0' cy='50.0' r='20'/%3E%3Ccircle cx='28.8' cy='28.8' r='20'/%3E%3Ccircle cx='50' cy='50' r='30'/%3E%3C/g%3E%3C/svg%3E",
  badge: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cg fill='black'%3E%3Ccircle cx='88.0' cy='50.0' r='12'/%3E%3Ccircle cx='82.9' cy='69.0' r='12'/%3E%3Ccircle cx='69.0' cy='82.9' r='12'/%3E%3Ccircle cx='50.0' cy='88.0' r='12'/%3E%3Ccircle cx='31.0' cy='82.9' r='12'/%3E%3Ccircle cx='17.1' cy='69.0' r='12'/%3E%3Ccircle cx='12.0' cy='50.0' r='12'/%3E%3Ccircle cx='17.1' cy='31.0' r='12'/%3E%3Ccircle cx='31.0' cy='17.1' r='12'/%3E%3Ccircle cx='50.0' cy='12.0' r='12'/%3E%3Ccircle cx='69.0' cy='17.1' r='12'/%3E%3Ccircle cx='82.9' cy='31.0' r='12'/%3E%3Ccircle cx='50' cy='50' r='40'/%3E%3C/g%3E%3C/svg%3E",
  plus: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cg fill='black'%3E%3Cpath d='M36 0h28v36h36v28H64v36H36V64H0V36h36Z'/%3E%3C/g%3E%3C/svg%3E",
  arch: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cg fill='black'%3E%3Cpath d='M0 100V50a50 50 0 0 1 100 0v50Z'/%3E%3C/g%3E%3C/svg%3E",
  blob: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cg fill='black'%3E%3Cpath d='M52 4c18 0 34 9 40 25s2 30-4 42-22 26-40 25S14 86 7 70 2 38 12 22 34 4 52 4Z'/%3E%3C/g%3E%3C/svg%3E",
  stripes: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cg fill='black'%3E%3Cpath d='M-20 30 120 -10v26L-20 56Z M-20 74 120 34v26L-20 100Z'/%3E%3C/g%3E%3C/svg%3E",
  pills: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cg fill='black'%3E%3Crect x='0' y='0' width='30' height='100' rx='15'/%3E%3Crect x='35' y='0' width='30' height='100' rx='15'/%3E%3Crect x='70' y='0' width='30' height='100' rx='15'/%3E%3C/g%3E%3C/svg%3E",
};
const shape = (k, im, cls = '', style = '') => `<div class="t-sh ${cls}" style="--mask:url(&quot;${SH[k]}&quot;);${style}">${img(im)}</div>`;
const mark = (b, cls = '') => `<span class="t-mark ${cls}">${logo(b, b.name)}</span>`;

export const more8Templates = [
  { id: 't-star', name: 'Star window', cat: 'Shapes', look: L('#f1ede6', '#141414', '#e8401c', '#e8401c', '#f1ede6', 'tight', 'tight'), art: ['front', ['#2a2420', '#e8cdb8']],
    fields: { top: 'New season', head: 'Shine on\nyour own terms', foot: 'Spring collection · 2026' },
    html: (f, im, b) => `<p class="t-tiny" style="left:var(--m);top:var(--m)">${esc(f.top)}</p>${mark(b, 'tr')}${shape('star', im, 't-c', 'width:min(58%,calc(var(--u)*58));top:41%')}<p class="mo-dw t-h c" style="bottom:calc(var(--m) + var(--u)*5)">${lines(f.head)}</p><p class="t-tiny c" style="bottom:var(--m)">${esc(f.foot)}</p>` },
  { id: 't-flower', name: 'Flower window', cat: 'Shapes', look: L('#ffd9e4', '#2a0f1c', '#ff3d7f', '#ff3d7f', '#ffd9e4', 'tight', 'tight'), art: ['front', ['#3a1020', '#f2c2d0']],
    fields: { head: 'In full bloom', sub: 'A small shop for slow flowers and quiet mornings.', foot: 'Open Tuesday to Sunday' },
    html: (f, im, b) => `${shape('flower', im, 't-c', 'width:min(62%,calc(var(--u)*62));top:40%')}<p class="mo-dw t-h c" style="bottom:calc(var(--m) + var(--u)*9)">${esc(f.head)}</p><p class="t-p c" style="bottom:calc(var(--m) + var(--u)*3.6)">${esc(f.sub)}</p><p class="t-tiny" style="left:var(--m);top:var(--m)">${esc(f.foot)}</p>${mark(b, 'tr')}` },
  { id: 't-flower-mark', name: 'Flower badge', cat: 'Shapes', look: L('#141414', '#f4efe8', '#c9f04b', '#c9f04b', '#141414', 'tight', 'tight'), art: ['front', ['#141414', '#c8b8a8']],
    fields: { a: 'Studio', b: 'Since 2016', word: 'Bloom house', foot: 'Flowers · Plants · Workshops' },
    html: (f, im, b) => `<p class="t-tiny" style="left:var(--m);top:var(--m)">${esc(f.a)}</p><p class="t-tiny" style="right:var(--m);top:var(--m);text-align:right">${esc(f.b)}</p>${shape('badge', im, 't-c', 'width:min(52%,calc(var(--u)*52));top:40%')}<p class="mo-dw t-word c" style="top:calc(40% + var(--u)*30)">${esc(f.word)}</p><p class="t-tiny c" style="bottom:var(--m)">${esc(f.foot)}</p>${mark(b, 'mid')}` },
  { id: 't-giant-flower', name: 'Giant petals', cat: 'Shapes', look: L('#e8401c', '#ffffff', '#ffffff', '#e8401c', '#e8401c', 'tight', 'tight'), art: ['front', ['#3a1206', '#ffb08a']],
    fields: { head: 'Grown\nin the city', foot: 'Weekend market\nevery Saturday' },
    html: (f, im, b) => `${shape('petals', im, 't-gf')}<p class="mo-dw t-h" style="left:var(--m);bottom:calc(var(--m) + var(--u)*8)">${lines(f.head)}</p><p class="t-tiny" style="left:var(--m);bottom:var(--m)">${lines(f.foot)}</p>${mark(b, 'tl')}` },
  { id: 't-stripes', name: 'Two thick bands', cat: 'Shapes', look: L('#111111', '#ffffff', '#c9f04b', '#111111', '#111111', 'tight', 'tight'), art: ['front', ['#111111', '#9a9a9a']],
    fields: { head: 'Move\nbetween\nthe lines', foot: 'Night run · Friday 21:00' },
    html: (f, im, b) => `${shape('stripes', im, 't-full t-stretch')}<p class="mo-dw t-h" style="left:var(--m);top:var(--m)">${lines(f.head)}</p><p class="t-tiny" style="right:var(--m);bottom:var(--m);text-align:right">${esc(f.foot)}</p>${mark(b, 'bl')}` },
  { id: 't-arch', name: 'Arch window', cat: 'Shapes', look: L('#efe7da', '#1d1a16', '#b5653f', '#b5653f', '#efe7da', 'tight', 'tight'), art: ['up', ['#3a2a1e', '#e8d4bc']],
    fields: { head: 'Stay a little longer', body: 'Rooms with thick walls, cool floors and a garden that smells of figs.', foot: 'Book direct · north.house' },
    html: (f, im, b) => `${shape('arch', im, 't-arch')}<p class="mo-dw t-h" style="left:var(--m);right:var(--m);top:calc(58% + var(--u)*4)">${esc(f.head)}</p><p class="t-p" style="left:var(--m);width:56%;bottom:calc(var(--m) + var(--u)*5)">${esc(f.body)}</p><p class="t-tiny" style="left:var(--m);bottom:var(--m)">${esc(f.foot)}</p>${mark(b, 'br')}` },
  { id: 't-quarter', name: 'Quarter photo', cat: 'Shapes', look: L('#f4f4f2', '#111111', '#1f3fe6', '#1f3fe6', '#f4f4f2', 'tight', 'tight'), art: ['front', ['#d9d9d6', '#3a3a3a']],
    fields: { head: 'Less noise.\nMore work\nthat lasts.', sub: 'A design studio for brands that plan to stay.', foot: 'north.studio' },
    html: (f, im, b) => `<div class="t-q">${img(im)}</div>${mark(b, 'tl')}<p class="mo-dw t-h" style="left:var(--m);top:calc(var(--m) + var(--u)*10)">${lines(f.head)}</p><p class="t-p" style="left:var(--m);width:40%;top:calc(var(--m) + var(--u)*36)">${esc(f.sub)}</p><p class="t-tiny" style="left:var(--m);bottom:var(--m)">${esc(f.foot)}</p>` },
  { id: 't-half', name: 'Half and half', cat: 'Shapes', look: L('#111111', '#ffffff', '#ff5a1f', '#111111', '#111111', 'tight', 'tight'), art: ['front', ['#111111', '#c9b8a8']],
    fields: { head: 'Half the noise,\ntwice the focus', body: 'One idea per post. One photo that carries it. The rest is space.', foot: 'Read the guide →' },
    html: (f, im, b) => `<div class="t-halfph">${img(im)}</div>${mark(b, 'tr')}<p class="mo-dw t-h" style="left:var(--m);right:var(--m);top:calc(50% + var(--u)*4)">${lines(f.head)}</p><p class="t-p" style="left:var(--m);width:60%;bottom:calc(var(--m) + var(--u)*6)">${esc(f.body)}</p><p class="t-tiny" style="left:var(--m);bottom:var(--m);color:var(--accent)">${esc(f.foot)}</p>` },
  { id: 't-circle', name: 'Circle off the edge', cat: 'Shapes', look: L('#1f3fe6', '#ffffff', '#ffffff', '#1f3fe6', '#1f3fe6', 'tight', 'tight'), art: ['front', ['#0a1a5a', '#c9d4f0']],
    fields: { head: 'Round\nthe clock\nsupport', foot: 'Talk to a person,\nnot a ticket.' },
    html: (f, im, b) => `<div class="t-circ">${img(im)}</div>${mark(b, 'tl')}<p class="mo-dw t-h" style="left:var(--m);bottom:calc(var(--m) + var(--u)*10)">${lines(f.head)}</p><p class="t-tiny" style="left:var(--m);bottom:var(--m)">${lines(f.foot)}</p>` },
  { id: 't-plus', name: 'Plus window', cat: 'Shapes', look: L('#f2f2f0', '#111111', '#e8401c', '#e8401c', '#f2f2f0', 'tight', 'tight'), art: ['front', ['#2a2a2a', '#d0c4b8']],
    fields: { a: 'Health', b: 'Clinic', head: 'Care that adds up', foot: 'Book online in two minutes' },
    html: (f, im, b) => `<p class="t-tiny" style="left:var(--m);top:var(--m)">${esc(f.a)}</p><p class="t-tiny" style="right:var(--m);top:var(--m);text-align:right">${esc(f.b)}</p>${shape('plus', im, 't-c', 'width:min(56%,calc(var(--u)*56));top:42%')}<p class="mo-dw t-h c" style="bottom:calc(var(--m) + var(--u)*5)">${esc(f.head)}</p><p class="t-tiny c" style="bottom:var(--m)">${esc(f.foot)}</p>` },
  { id: 't-blob', name: 'Soft blob', cat: 'Shapes', look: L('#e9f0e4', '#14281d', '#2f7a4f', '#2f7a4f', '#e9f0e4', 'tight', 'tight'), art: ['object', ['#14281d', '#bcd8b4']],
    fields: { head: 'Made from\nthings that grow', foot: 'Plant-based skin care', price: 'From 18 €' },
    html: (f, im, b) => `${shape('blob', im, 't-blob')}<p class="mo-dw t-h" style="left:var(--m);top:var(--m)">${lines(f.head)}</p><p class="t-tiny" style="left:var(--m);bottom:var(--m)">${esc(f.foot)}</p><p class="mo-dw t-price">${esc(f.price)}</p>${mark(b, 'br')}` },
  { id: 't-pills', name: 'Three pills', cat: 'Shapes', look: L('#111111', '#ffffff', '#c9f04b', '#111111', '#111111', 'tight', 'tight'), art: ['front', ['#111111', '#c8b8a8']],
    fields: { head: 'Three ways\nto wear it', foot: 'Drop 04 · online Friday' },
    html: (f, im, b) => `${shape('pills', im, 't-pl t-stretch')}<p class="mo-dw t-h" style="left:var(--m);top:var(--m)">${lines(f.head)}</p><p class="t-tiny" style="left:var(--m);bottom:var(--m)">${esc(f.foot)}</p>${mark(b, 'br')}` },
];

export const more8Css = `
.bi-ad .t-sh{position:absolute;z-index:2;aspect-ratio:1;-webkit-mask:var(--mask) center/contain no-repeat;mask:var(--mask) center/contain no-repeat}
.bi-ad .t-sh .bi-media{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.bi-ad .t-sh.t-c{left:50%;translate:-50% -50%}
.bi-ad .t-sh.t-stretch{-webkit-mask-size:100% 100%;mask-size:100% 100%;aspect-ratio:auto}
.bi-ad .t-sh.t-full{inset:0}
.bi-ad .t-sh.t-gf{width:max(118%,calc(var(--u)*118));right:-38%;top:-24%}
.bi-ad .t-sh.t-arch{left:var(--m);right:var(--m);top:var(--m);height:56%;aspect-ratio:auto;-webkit-mask-size:100% 100%;mask-size:100% 100%}
.bi-ad .t-sh.t-blob{width:min(78%,calc(var(--u)*78));right:-6%;bottom:6%}
.bi-ad .t-sh.t-pl{left:46%;right:var(--m);top:var(--m);bottom:var(--m)}
.bi-ad .t-q{position:absolute;right:0;bottom:0;width:56%;height:46%;overflow:hidden;border-top-left-radius:calc(var(--u)*22)}
.bi-ad .t-halfph{position:absolute;left:0;right:0;top:0;height:50%;overflow:hidden}
.bi-ad .t-circ{position:absolute;width:min(86%,calc(var(--u)*86));aspect-ratio:1;right:-26%;top:8%;border-radius:50%;overflow:hidden}
.bi-ad .t-h{font-size:calc(var(--u)*7.4);font-weight:600;line-height:.98;letter-spacing:-.04em}
.bi-ad .t-h.c,.bi-ad .t-p.c,.bi-ad .t-tiny.c,.bi-ad .t-word.c{left:var(--m);right:var(--m);text-align:center}
.bi-ad .t-word{font-size:calc(var(--u)*6);font-weight:700;letter-spacing:-.03em}
.bi-ad .t-p{position:absolute;z-index:5;font-family:var(--ftv);font-size:calc(var(--u)*2.2);line-height:1.35;opacity:.85}
.bi-ad .t-tiny{position:absolute;z-index:5;font-family:var(--ftv);font-size:calc(var(--u)*1.8);line-height:1.3;font-weight:500;letter-spacing:.01em}
.bi-ad .t-price{right:var(--m);top:var(--m);font-size:calc(var(--u)*4.4);font-weight:600;color:var(--accent)}
.bi-ad .t-mark{position:absolute;z-index:5;font-family:var(--fdv);font-weight:700;font-size:calc(var(--u)*3.4)} .bi-ad .t-mark .bi-logo{height:calc(var(--u)*5*var(--ls,1))}
.bi-ad .t-mark.tr{right:var(--m);top:var(--m)} .bi-ad .t-mark.tl{left:var(--m);top:var(--m)} .bi-ad .t-mark.br{right:var(--m);bottom:var(--m)} .bi-ad .t-mark.bl{left:var(--m);bottom:var(--m)}
.bi-ad .t-mark.mid{left:50%;top:40%;translate:-50% -50%;z-index:6;color:var(--accent)} .bi-ad .t-mark.mid{font-size:calc(var(--u)*7)} .bi-ad .t-mark.mid .bi-logo{height:calc(var(--u)*12*var(--ls,1))}
@container (min-aspect-ratio: 13/10){
  .bi-ad .t-sh.t-c{left:70%;top:50%!important;width:min(46%,calc(var(--u)*84))!important} .bi-ad .t-h.c,.bi-ad .t-p.c,.bi-ad .t-tiny.c{right:46%;text-align:left}
  .bi-ad .t-word.c{right:auto} .bi-ad .t-mark.mid{left:70%;top:50%}
  .bi-ad .t-sh.t-arch{left:auto;right:var(--m);width:42%;height:auto;top:var(--m);bottom:0}
  .bi-ad .t-halfph{height:100%;left:50%} .bi-ad .t-q{width:40%;height:70%} .bi-ad .t-circ{width:calc(var(--u)*110);right:-14%;top:-10%}
  .bi-ad .t-sh.t-pl{left:50%}
}
@container (max-aspect-ratio: 7/10){
  .bi-ad .t-sh.t-c{top:40%!important} .bi-ad .t-q{height:40%;width:70%} .bi-ad .t-sh.t-pl{left:var(--m);top:calc(var(--m) + var(--u)*22);bottom:calc(var(--m) + var(--u)*7)} .bi-ad .t-sh.t-blob{width:92%;bottom:14%} .bi-ad .t-sh.t-arch{height:52%}
}`;
