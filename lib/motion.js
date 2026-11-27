// BrandIt Motion: clean, photo-led ads in a Framer-like style. Add one photo and the ad is finished.
// Layout ideas come from a moodboard of current campaign posters; every word, mark and drawing here is our own.
// Each template reads these CSS variables, so the studio can restyle it without touching the markup:
//   --bg --ink --accent   colours          --g1 --g2   gradient and glow colours
//   --fd --ft --fm        display, text and label fonts
//   --ix --iy --iz        photo position (0–100 %) and zoom     --ov   overlay strength (0–1)

export const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const lines = (s = '') => esc(s).split(/\n/).join('<br>');
export const list = (s = '') => String(s).split(/\n/).filter(Boolean);
// *word* in a field becomes the accent colour
export const accent = (s = '') => lines(s).replace(/\*([^*]+)\*/g, '<em class="mo-acc">$1</em>');
export const img = (src, cls = '') => `<img class="bi-media ${cls}" src="${esc(src)}" alt="" decoding="async">`;

// Placeholder photography drawn in code: a studio portrait with a rim light, in the template's own colours.
export function portrait(pose = 'profile', tone = ['#2a0f04', '#ff7a1a'], seed = 1) {
  const [dark, light] = tone;
  const w = 1200, h = 1500;
  const profile = 'M330 1500 L360 1180 C380 1080 430 1020 470 980 C400 900 330 780 330 640 C330 420 480 300 660 300 C820 300 920 400 935 540 C940 590 945 620 960 650 L1010 735 C1015 755 1000 765 975 768 C985 790 990 805 980 820 C990 840 985 855 970 862 C975 900 960 930 920 940 C880 950 840 950 800 960 C780 1010 790 1060 820 1100 C900 1150 1050 1200 1200 1260 L1200 1500 Z';
  const front = 'M600 300 C730 300 800 410 800 560 C800 700 740 800 690 850 L700 960 C860 1000 1060 1080 1120 1500 L80 1500 C140 1080 340 1000 500 960 L510 850 C460 800 400 700 400 560 C400 410 470 300 600 300 Z';
  const up = 'M260 1500 C300 1300 420 1180 520 1120 C470 1040 450 930 470 820 C500 640 640 520 820 540 C980 560 1080 690 1070 850 C1062 960 1010 1040 940 1090 C1000 1180 1110 1260 1200 1300 L1200 1500 Z';
  const d = pose === 'front' ? front : pose === 'up' ? up : profile;
  const shape = pose === 'object'
    ? `<circle cx="600" cy="780" r="330" fill="#0b0b0c"/><circle cx="600" cy="780" r="330" fill="none" stroke="${light}" stroke-width="26" filter="url(#rb)" clip-path="url(#oc)" transform="translate(-14 -14)"/><clipPath id="oc"><circle cx="600" cy="780" r="330"/></clipPath>`
    : `<clipPath id="pc"><path d="${d}"/></clipPath><path d="${d}" fill="#0b0b0c"/><path d="${d}" fill="none" stroke="${light}" stroke-width="34" filter="url(#rb)" clip-path="url(#pc)" transform="translate(-18 -10)"/>`;
  return 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>
<radialGradient id="g" cx=".62" cy=".42" r=".8"><stop offset="0" stop-color="${light}"/><stop offset=".55" stop-color="${dark}"/><stop offset="1" stop-color="#050506"/></radialGradient>
<filter id="rb" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="9"/></filter>
<filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="${seed}"/><feColorMatrix values="0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .14 0"/></filter></defs>
<rect width="100%" height="100%" fill="url(#g)"/>${shape}<rect width="100%" height="100%" filter="url(#n)"/></svg>`);
}

// Small marks drawn in code (not anyone's logo)
export const dots = (n = 14) => `<span class="mo-dots" aria-hidden="true">${Array.from({ length: n }, (_, i) => `<i${i === n - 1 ? ' class="on"' : ''}></i>`).join('')}</span>`;
const ticks = '<i class="mo-tk tl"></i><i class="mo-tk tr"></i><i class="mo-tk bl"></i><i class="mo-tk br"></i>';
const route = '<svg class="mo-route" viewBox="0 0 400 160" preserveAspectRatio="none" aria-hidden="true"><path d="M10 120 C60 120 70 60 120 70 C170 80 160 130 210 120 C260 110 250 40 300 50 C340 58 350 20 390 22" fill="none" stroke="currentColor" stroke-width="2.4" vector-effect="non-scaling-stroke"/><circle cx="10" cy="120" r="5" fill="currentColor"/><circle cx="390" cy="22" r="5" fill="currentColor"/></svg>';
const ribbon = '<svg class="mo-ribbon" viewBox="0 0 1000 1250" preserveAspectRatio="none" aria-hidden="true"><defs><filter id="mo-rb" filterUnits="userSpaceOnUse" x="-300" y="-300" width="1600" height="1850"><feGaussianBlur stdDeviation="38"/></filter><filter id="mo-rc" filterUnits="userSpaceOnUse" x="-300" y="-300" width="1600" height="1850"><feGaussianBlur stdDeviation="10"/></filter></defs><path d="M-80 560 C160 420 260 820 480 640 C700 460 760 300 1080 420" fill="none" stroke="var(--g1)" stroke-width="190" filter="url(#mo-rb)" opacity=".85"/><path d="M-80 560 C160 420 260 820 480 640 C700 460 760 300 1080 420" fill="none" stroke="#fff" stroke-width="54" filter="url(#mo-rc)"/></svg>';
export const icon = { heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-9.6A4 4 0 0 1 12 8a4 4 0 0 1 7 2.4C19 15.6 12 20 12 20Z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>', send: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 3 3 10.5l7 2.5 2.5 7L21 3Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>', at: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>', arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2"/></svg>', down: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v15M6 13l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>', play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7Z" fill="currentColor"/></svg>' };

// look: the template's own colours and fonts (used when the theme is "Own")
export const L = (bg, ink, accent, g1, g2, fd, ft = 'tight', fm = 'mono') => ({ bg, ink, accent, g1, g2, fonts: { d: fd, t: ft, m: fm } });

export const motionTemplates = [
  { id: 'mo-crosshair', name: 'Crosshair', family: 'Motion', look: L('#1a0a04', '#ffffff', '#ff7a1a', '#ff7a1a', '#2a0f04', 'michroma'), art: ['profile'],
    fields: { word: 'SIGNAL', left: 'Field study //', right: 'Studio approved' },
    html: (f, img$, b) => `${img(img$)}<div class="mo-tint"></div><i class="mo-v" style="left:35%"></i><i class="mo-v" style="left:65%"></i><i class="mo-h" style="top:48.4%"></i><i class="mo-h" style="top:51.6%"></i>
      <p class="mo-label" style="left:var(--m);top:50%;translate:0 -50%">${esc(f.left)}</p><p class="mo-dw mo-cw">${esc(f.word)}</p><p class="mo-label" style="right:var(--m);top:50%;translate:0 -50%">${esc(f.right)}</p>` },
  { id: 'mo-glass-cross', name: 'Glass cross', family: 'Motion', look: L('#120806', '#ffffff', '#ff5a1f', '#ffb26b', '#3a1408', 'grotesk', 'grotesk'), art: ['front'],
    fields: { left: 'Precision', right: 'Motion', mark: 'NORTH' },
    html: (f, img$, b) => `${img(img$)}<div class="mo-tint soft"></div><div class="mo-cross"><i class="v"></i><i class="h"></i><p class="l">${esc(f.left)}</p><p class="r">${esc(f.right)}</p></div><p class="mo-dw mo-mark">${logo(b, f.mark)}</p>` },
  { id: 'mo-data-frame', name: 'Data frame', family: 'Motion', look: L('#050608', '#e9edf0', '#e9edf0', '#9fb1c2', '#050608', 'grotesk', 'grotesk', 'jet'), art: ['front', ['#050608', '#8da2b4']],
    fields: { n1: '0.13', n2: '0.1', n3: '0.02s', side: 'Alternative', phase: 'In\nphase', line: '1 12 20', state: 'State : open', mark: 'N°' },
    html: (f, img$, b) => `${img(img$)}<div class="mo-shade"></div><p class="mo-mono" style="left:var(--m);top:var(--m)">${esc(f.n1)}</p><p class="mo-mono" style="left:50%;top:var(--m);translate:-50% 0">${esc(f.n2)}</p><p class="mo-mono" style="right:var(--m);top:var(--m)">${esc(f.n3)}</p>
      <div class="mo-frame"><i class="sq a"></i><i class="sq b"></i><i class="hl"></i></div><p class="mo-mono" style="left:80.5%;top:16.5%">${esc(f.side)}</p><p class="mo-mono" style="left:80.5%;top:42%">${lines(f.phase)}</p>
      <p class="mo-mono" style="right:81.5%;top:58.6%;text-align:right">${esc(f.line)}</p><p class="mo-mono" style="left:8%;top:72%">${esc(f.state)}</p><p class="mo-dw" style="left:0;right:0;bottom:var(--m);text-align:center;font-size:calc(var(--u)*4)">${logo(b, f.mark)}</p>` },
  { id: 'mo-spec-sheet', name: 'Spec sheet', family: 'Motion', look: L('#0d0f12', '#ffffff', '#ffffff', '#5d6670', '#0d0f12', 'wide', 'tight', 'jet'), art: ['profile', ['#1a1d22', '#9aa5b0']],
    fields: { id: 'MDL – 01\nPULSE by NORTH', dims: '5.8" × 5.5" × 3.0"\n0.67" (19 g)', left: 'Made for long days\nLight on the face\nBuilt for speed\nTested in motion\nOne frame, no screws', right: 'Version 1.0\n\n\nAir frame\nTR – 90', notes: 'Matte\nNose pad\n30 g', brand: 'NORTH' },
    html: (f, img$, b) => `${img(img$)}${img(img$, 'mo-smear')}<div class="mo-shade light"></div><div class="mo-spec"><p class="r">${lines(f.id)}</p><p>${lines(f.dims)}</p><p class="r gap">${lines(f.left)}</p><p class="gap">${lines(f.right)}</p><p class="r gap">${lines(f.notes)}</p><p class="gap mo-dw mo-it">${logo(b, f.brand)}</p></div>` },
  { id: 'mo-three-words', name: 'Three words', family: 'Motion', look: L('#24324a', '#ffffff', '#ffffff', '#c5d3e6', '#24324a', 'tight', 'tight'), art: ['up', ['#2a3a58', '#c5d3e6']],
    fields: { a: 'North', x: 'x', b: 'Track', tl: 'north.studio', tr: 'north_fyi' },
    html: (f, img$, b) => `${img(img$)}<p class="mo-handle" style="left:var(--m);top:var(--m)">${icon.at}${esc(f.tl)}</p><p class="mo-handle" style="right:var(--m);top:var(--m)">${icon.send}${esc(f.tr)}</p>
      <div class="mo-three"><p>${esc(f.a)}</p><p class="x">${esc(f.x)}</p><p>${esc(f.b)}</p></div>` },
  { id: 'mo-haze', name: 'Haze wordmark', family: 'Motion', look: L('#14233a', '#ffffff', '#ffffff', '#e9e4dc', '#14233a', 'syne', 'space'), art: ['front', ['#14233a', '#d8d2c8']],
    fields: { word: '.north', tag: 'studio for your brand ©', line: 'quiet products, loud ideas, made with care in Prague', foot: 'all rights reserved // 2026' },
    html: (f, img$, b) => `${img(img$)}<div class="mo-haze"></div><div class="mo-hz"><p class="mo-dw w">${logo(b, f.word)}</p><p class="t">${esc(f.tag)}</p><p class="j">${esc(f.line)}</p></div><p class="mo-foot">${esc(f.foot)}</p>` },
  { id: 'mo-giant-word', name: 'Giant word', family: 'Motion', look: L('#e4e4e2', '#ffffff', '#e8401c', '#e4e4e2', '#9a9a96', 'tight', 'tight'), art: ['front', ['#d6d6d4', '#ffffff']],
    fields: { word: 'Obelisk', cta: 'View product', body: 'Where precision becomes character. Sharp geometry, tactile surfaces and restrained proportions.' },
    html: (f, img$, b) => `${img(img$, 'grey')}${dots(14)}<div class="mo-glass-pill"><span>${esc(f.cta)}</span><b>${icon.arrow}</b></div><p class="mo-body">${esc(f.body)}</p><p class="mo-dw mo-giant">${esc(f.word)}</p>` },
  { id: 'mo-about', name: 'About paragraph', family: 'Motion', look: L('#e9e9e7', '#ffffff', '#ff4a2a', '#e9e9e7', '#141414', 'tight', 'tight'), art: ['profile', ['#cfcfcd', '#ffffff']],
    fields: { num: '02', label: 'About', text: 'We treat it as *industrial design* rather than a gadget. Every part belongs to *one system* you can see and touch.' },
    html: (f, img$, b) => `${img(img$, 'grey')}<div class="mo-shade low"></div><p class="mo-small" style="left:56%;top:66%"><span class="mo-acc">${esc(f.num)}</span>&nbsp;&nbsp;${esc(f.label)}</p><p class="mo-para">${accent(f.text)}</p>` },
  { id: 'mo-bracket', name: 'Bracketed wordmark', family: 'Motion', look: L('#f2f2f0', '#ffffff', '#ff5a1f', '#f2f2f0', '#0b0b0b', 'pixel', 'grotesk', 'jet'), art: ['profile', ['#0b0b0b', '#c9c9c7']],
    fields: { word: 'VECTORA', m1: 'NR × VC\nCopyright ©', m2: 'Est.\nAll rights reserved', m3: '2026' },
    html: (f, img$, b) => `${img(img$)}${img(img$, 'mo-smear')}<div class="mo-brk">${ticks}<p class="mo-dw w">${esc(f.word)}<sup>™</sup></p><div class="meta"><p>${lines(f.m1)}</p><p>${lines(f.m2)}</p><p class="r">${lines(f.m3)}</p></div></div>` },
  { id: 'mo-route', name: 'Route stats', family: 'Motion', look: L('#0a1424', '#ffffff', '#ffffff', '#3d6bb3', '#0a1424', 'pixel', 'tight'), art: ['front', ['#0a1424', '#3d6bb3']],
    fields: { l1: 'Distance', v1: '5.20 km', l2: 'Time', v2: '00:28:45', l3: 'Pace', v3: '5:31 /km' },
    html: (f, img$, b) => `${img(img$)}<div class="mo-tint cold"></div>${route}<div class="mo-stats"><p><span>${esc(f.l1)}</span>${esc(f.v1)}</p><p><span>${esc(f.l2)}</span>${esc(f.v2)}</p><p><span>${esc(f.l3)}</span>${esc(f.v3)}</p></div>` },
  { id: 'mo-vertical', name: 'Vertical headline', family: 'Motion', look: L('#0a1424', '#ffffff', '#ffffff', '#3d6bb3', '#0a1424', 'pixel', 'tight'), art: ['up', ['#0a1424', '#6b8fc7']],
    fields: { head: 'Night run\n8 km', info: '12 December\n19:00\nOld town', cta: 'Find your\nown pace.' },
    html: (f, img$, b) => `${img(img$)}<div class="mo-tint cold"></div><p class="mo-dw mo-vert">${lines(f.head)}</p><p class="mo-small" style="left:24%;top:46%">${lines(f.info)}</p><p class="mo-h3" style="right:var(--m);bottom:calc(var(--m)*1.6);text-align:right">${lines(f.cta)}</p>` },
  { id: 'mo-echo', name: 'Echo headline', family: 'Motion', look: L('#0f0f10', '#ffffff', '#ffffff', '#0f0f10', '#2a2a2c', 'wide', 'tight'),
    fields: { head: 'Keep\nforward', foot: 'The game\nnever stops.', mid: '© 2026\nNorth', right: 'A North\npresentation' },
    html: (f, img$, b) => `<div class="mo-echo"><p class="e3">${lines(f.head)}</p><p class="e2">${lines(f.head)}</p><p class="e1 mo-dw">${lines(f.head)}</p></div><p class="mo-micro" style="left:var(--m);bottom:var(--m)">${lines(f.foot)}</p><p class="mo-micro" style="left:46%;bottom:var(--m)">${lines(f.mid)}</p><p class="mo-micro" style="right:var(--m);bottom:var(--m);text-align:right">${lines(f.right)}</p>` },
  { id: 'mo-ghost-stack', name: 'Ghost stack', family: 'Motion', look: L('#141415', '#ffffff', '#ffffff', '#141415', '#2b2b2d', 'black', 'tight'),
    fields: { ghost: 'No limits\nNo rules\nNo limits', head: 'Only the\ndrive to\nkeep going.', mark: 'N' },
    html: (f, img$, b) => `<div class="mo-ghost">${list(f.ghost).map((w) => `<p>${esc(w)}</p>`).join('')}</div><p class="mo-dw mo-gh">${lines(f.head)}</p><p class="mo-dw" style="right:var(--m);bottom:var(--m);font-size:calc(var(--u)*5)">${logo(b, f.mark)}</p>` },
  { id: 'mo-blur-word', name: 'Blur word', family: 'Motion', look: L('#c9d8f0', '#0b0b0b', '#0b0b0b', '#ffffff', '#a9c0e6', 'wide', 'tight'),
    fields: { big: 'RUN', head: 'Run faster', foot: 'Pace is a habit', mark: 'N' },
    html: (f, img$, b) => `<div class="mo-sky"></div><p class="mo-bigblur">${esc(f.big)}</p><p class="mo-dw mo-bwh">${esc(f.head)}</p><p class="mo-small" style="left:var(--m);bottom:var(--m)">${esc(f.foot)}</p><p class="mo-dw" style="right:var(--m);bottom:var(--m);font-size:calc(var(--u)*4)">${logo(b, f.mark)}</p>` },
  { id: 'mo-duotone', name: 'Red duotone', family: 'Motion', look: L('#0b0b0b', '#ffffff', '#ff1f1f', '#ff1f1f', '#0b0b0b', 'tight', 'tight'), art: ['profile', ['#2a0505', '#ff3a2a']],
    fields: { head: 'Be the\nbold one.', body: 'Identities that refuse to be average and are brave enough to own their space.', label: 'Branding studio\n& digital direction' },
    html: (f, img$, b) => `${img(img$, 'grey')}<div class="mo-duo"></div><i class="mo-star" aria-hidden="true"></i><p class="mo-dw mo-duoh">${lines(f.head)}</p><p class="mo-small" style="left:var(--m);right:46%;top:64%">${esc(f.body)}</p><p class="mo-micro" style="left:var(--m);bottom:var(--m)">${lines(f.label)}</p>` },
  { id: 'mo-aura', name: 'Aura', family: 'Motion', look: L('#f3f3f1', '#0b0b0b', '#1238ff', '#1238ff', '#f3f3f1', 'tight', 'tight'),
    fields: { head: 'First month\nof service', rule: 'Free', foot: 'More ↓' },
    html: (f, img$, b) => `<div class="mo-aura"></div><div class="mo-grain"></div><p class="mo-dw mo-aurah">${lines(f.head)}</p><i class="mo-rule" style="top:57%"></i><p class="mo-h3" style="left:var(--m);top:59.5%">${esc(f.rule)}</p><i class="mo-rule" style="top:66%"></i><p class="mo-micro" style="left:var(--m);bottom:var(--m)">${esc(f.foot)}</p>` },
  { id: 'mo-orb', name: 'Orb', family: 'Motion', look: L('#f3f3f1', '#ffffff', '#ffffff', '#1238ff', '#050508', 'grotesk', 'grotesk'),
    fields: { word: 'MERIDIAN', foot: 'Accounting, made calm' },
    html: (f, img$, b) => `<div class="mo-orb"></div><div class="mo-grain"></div><p class="mo-dw mo-orbw">${esc(f.word)}</p><p class="mo-micro" style="left:0;right:0;bottom:var(--m);text-align:center;color:#0b0b0b">${esc(f.foot)}</p>` },
  { id: 'mo-glow-step', name: 'Glow step', family: 'Motion', look: L('#ffffff', '#111111', '#e8622c', '#ff7a3d', '#ffffff', 'tight', 'tight'),
    fields: { name: 'Ada Novak\nGrowth studio', step: 'Step 02', head: 'Promise a real\nresult', sub: '(with a timeline)' },
    html: (f, img$, b) => `<div class="mo-glow"></div><p class="mo-micro" style="left:var(--m);top:var(--m)">${lines(f.name)}</p><i class="mo-rule" style="top:calc(var(--m) + var(--u)*6)"></i><b class="mo-ic" style="right:var(--m);top:var(--m)">${icon.arrow}</b>
      <p class="mo-chip">${esc(f.step)}</p><p class="mo-dw mo-steph">${lines(f.head)} <span>${esc(f.sub)}</span></p>` },
  { id: 'mo-ribbon', name: 'Light ribbon', family: 'Motion', look: L('#05070b', '#ffffff', '#ffffff', '#7fb0ff', '#05070b', 'grotesk', 'grotesk'),
    fields: { mark: 'Meridian', body: 'We were asked to bring a stalled office build back on schedule. Every week of delay cost the owner money and trust.', head: 'From noise to a\nclear plan.' },
    html: (f, img$, b) => `${ribbon}<div class="mo-grain"></div><p class="mo-dw" style="left:var(--m);top:var(--m);font-size:calc(var(--u)*6)">${logo(b, f.mark)}</p><p class="mo-micro" style="left:44%;right:var(--m);top:var(--m);text-transform:none">${esc(f.body)}</p><p class="mo-dw mo-ribh">${lines(f.head)}</p>` },
  { id: 'mo-app-tile', name: 'App tile', family: 'Motion', look: L('#07152e', '#ffffff', '#2e8bff', '#2e8bff', '#07152e', 'grotesk', 'grotesk'),
    fields: { mark: '/north', foot: 'north.app', tag: 'Now on iOS' },
    html: (f, img$, b) => `<div class="mo-deep"></div><div class="mo-tile"><p><span class="mo-acc">${esc(f.mark.slice(0, 1))}</span>${esc(f.mark.slice(1))}</p></div><p class="mo-micro" style="left:var(--m);bottom:var(--m)">${esc(f.foot)}</p><p class="mo-micro" style="right:var(--m);bottom:var(--m)">${esc(f.tag)}</p>` },
  { id: 'mo-story', name: 'Story card', family: 'Motion', look: L('#0a0f1c', '#ffffff', '#1f6bff', '#1f6bff', '#0a0f1c', 'space', 'space'), art: ['front', ['#151a26', '#8a96ad']],
    fields: { name: 'North', time: '4h', head: 'A planning tool that\nsees progress as\nit happens.', cta: 'Start with North →', msg: 'Leave a message' },
    html: (f, img$, b) => `<div class="mo-sphoto">${img(img$)}</div><div class="mo-scard"><p>${lines(f.head)}</p><span class="mo-sbtn">${esc(f.cta)}</span></div>
      <div class="mo-bars"><i class="on"></i><i></i><i></i></div><p class="mo-who"><b>${esc(f.name.slice(0, 1))}</b>${esc(f.name)} <span>${esc(f.time)}</span></p><p class="mo-x">×</p>
      <div class="mo-msg"><span>${esc(f.msg)}</span>${icon.heart}${icon.send}</div>` },
  { id: 'mo-pills', name: 'Word pills', family: 'Motion', look: L('#060a18', '#ffffff', '#1f6bff', '#1f6bff', '#060a18', 'space', 'space'),
    fields: { words: 'Intelligent\nStructured\nEfficient\nClear\nPrecise\nProfessional', cta: 'Discover North →' },
    html: (f, img$, b) => `<div class="mo-deep side"></div><div class="mo-pills">${list(f.words).map((w, i) => `<p class="p${i % 6}">${esc(w)}</p>`).join('')}</div><p class="mo-dash">${esc(f.cta)}</p>` },
  { id: 'mo-quiet-card', name: 'Quiet card', family: 'Motion', look: L('#c7d7e6', '#ffffff', '#ffffff', '#e6edf4', '#9db8d3', 'grotesk', 'grotesk'),
    fields: { chip: 'Daily note', head: 'Slow mornings\nmake strong days', b1: 'Read', b2: 'Listen' },
    html: (f, img$, b) => `<div class="mo-sky soft"></div><div class="mo-card"><p><span class="mo-chip in">${esc(f.chip)}</span> ${lines(f.head)}</p></div><div class="mo-btns"><span>${esc(f.b1)}</span><span>${esc(f.b2)}</span></div>` },
  { id: 'mo-verse', name: 'Centred line', family: 'Motion', look: L('#3f78b8', '#ffffff', '#ffffff', '#3f78b8', '#bcd2e8', 'grotesk', 'grotesk'), art: ['up', ['#3f78b8', '#dbe7f3']],
    fields: { ref: 'Note 11:28', text: 'Come as you are.\nRest is part\nof the work.' },
    html: (f, img$, b) => `${img(img$, 'low')}<div class="mo-sky fade"></div><p class="mo-micro" style="left:0;right:0;top:var(--m);text-align:center;text-transform:none;opacity:.7">${esc(f.ref)}</p><p class="mo-centre">${lines(f.text)}</p><div class="mo-round"><b>${icon.down}</b><b>${icon.send}</b></div>` },
  { id: 'mo-cover', name: 'Club cover', family: 'Motion', look: L('#d9dbd6', '#ffffff', '#c9e64b', '#c9e64b', '#3b4a12', 'tight', 'tight'), art: ['object', ['#3b4a12', '#d6f05a']],
    fields: { word: 'Baseline', cap: 'Modern tennis club', badge: 'BL' },
    html: (f, img$, b) => `${img(img$)}<div class="mo-shade light"></div><div class="mo-cov"><p class="mo-dw">${esc(f.word)}</p><p class="mo-micro" style="position:static;text-transform:none">${esc(f.cap)}</p></div><p class="mo-badge"><b>${esc(f.badge)}</b><b>${esc(f.badge)}</b></p>` },
];

// Every built-in font. `family` is the CSS name; files are in /fonts (all SIL Open Font License).
export const fonts = {
  grotesk: { label: 'Host Grotesk', family: 'BI Grotesk', faces: [['host-grotesk', 400], ['host-grotesk', 500]] },
  tight: { label: 'Inter Tight', family: 'BI Tight', faces: [['inter-tight', 400], ['inter-tight', 500], ['inter-tight', 700], ['inter-tight', 800]] },
  space: { label: 'Space Grotesk', family: 'BI Space', faces: [['space-grotesk', 400], ['space-grotesk', 500], ['space-grotesk', 700]] },
  wide: { label: 'Archivo Expanded', family: 'BI Wide', variable: 'archivo-latin-standard-normal', stretch: '125%' },
  black: { label: 'Archivo Black', family: 'BI Black', faces: [['archivo-black', 400]] },
  condensed: { label: 'Anton', family: 'BI Condensed', faces: [['anton', 400]] },
  unbounded: { label: 'Unbounded', family: 'BI Unbounded', faces: [['unbounded', 400], ['unbounded', 600], ['unbounded', 800]] },
  michroma: { label: 'Michroma', family: 'BI Michroma', faces: [['michroma', 400]] },
  syne: { label: 'Syne', family: 'BI Syne', faces: [['syne', 700], ['syne', 800]] },
  serif: { label: 'Instrument Serif', family: 'BI Serif', faces: [['instrument-serif', 400], ['instrument-serif', 400, 'italic']] },
  pixel: { label: 'Silkscreen (pixel)', family: 'BI Pixel', faces: [['silkscreen', 400]] },
  dot: { label: 'Doto (dot matrix)', family: 'BI Dot', faces: [['doto', 700], ['doto', 900]] },
  mono: { label: 'IBM Plex Mono', family: 'BI Mono', faces: [['ibm-plex-mono', 400], ['ibm-plex-mono', 500]] },
  jet: { label: 'JetBrains Mono', family: 'BI Jet', faces: [['jetbrains-mono', 400], ['jetbrains-mono', 500]] },
  manrope: { label: 'Manrope', family: 'BI Manrope', faces: [['manrope', 400], ['manrope', 500], ['manrope', 700]] },
  sora: { label: 'Sora', family: 'BI Sora', faces: [['sora', 400], ['sora', 500], ['sora', 700]] },
  figtree: { label: 'Figtree', family: 'BI Figtree', faces: [['figtree', 400], ['figtree', 500], ['figtree', 700]] },
  onest: { label: 'Onest', family: 'BI Onest', faces: [['onest', 400], ['onest', 500], ['onest', 700]] },
  bricolage: { label: 'Bricolage Grotesque', family: 'BI Bricolage Grotesque', faces: [['bricolage-grotesque', 400], ['bricolage-grotesque', 500], ['bricolage-grotesque', 700]] },
  schibsted: { label: 'Schibsted Grotesk', family: 'BI Schibsted Grotesk', faces: [['schibsted-grotesk', 400], ['schibsted-grotesk', 500], ['schibsted-grotesk', 700]] },
  familjen: { label: 'Familjen Grotesk', family: 'BI Familjen Grotesk', faces: [['familjen-grotesk', 400], ['familjen-grotesk', 500], ['familjen-grotesk', 700]] },
  redhat: { label: 'Red Hat Display', family: 'BI Red Hat Display', faces: [['red-hat-display', 400], ['red-hat-display', 500], ['red-hat-display', 700]] },
  lexend: { label: 'Lexend', family: 'BI Lexend', faces: [['lexend', 400], ['lexend', 500], ['lexend', 700]] },
  bebas: { label: 'Bebas Neue', family: 'BI Bebas Neue', faces: [['bebas-neue', 400]] },
  oswald: { label: 'Oswald', family: 'BI Oswald', faces: [['oswald', 400], ['oswald', 500], ['oswald', 700]] },
  barlow: { label: 'Barlow Condensed', family: 'BI Barlow Condensed', faces: [['barlow-condensed', 400], ['barlow-condensed', 500], ['barlow-condensed', 700]] },
  shoulders: { label: 'Big Shoulders Display', family: 'BI Big Shoulders Display', faces: [['big-shoulders-display', 400], ['big-shoulders-display', 500], ['big-shoulders-display', 700]] },
  chakra: { label: 'Chakra Petch', family: 'BI Chakra Petch', faces: [['chakra-petch', 400], ['chakra-petch', 500], ['chakra-petch', 700]] },
  orbitron: { label: 'Orbitron', family: 'BI Orbitron', faces: [['orbitron', 400], ['orbitron', 500], ['orbitron', 700]] },
  dmserif: { label: 'DM Serif Display', family: 'BI DM Serif Display', faces: [['dm-serif-display', 400]] },
  young: { label: 'Young Serif', family: 'BI Young Serif', faces: [['young-serif', 400]] },
  gloock: { label: 'Gloock', family: 'BI Gloock', faces: [['gloock', 400]] },
  bodoni: { label: 'Bodoni Moda', family: 'BI Bodoni Moda', faces: [['bodoni-moda', 400], ['bodoni-moda', 500], ['bodoni-moda', 700]] },
  garamond: { label: 'EB Garamond', family: 'BI EB Garamond', faces: [['eb-garamond', 400], ['eb-garamond', 500], ['eb-garamond', 700]] },
  caslon: { label: 'Libre Caslon Text', family: 'BI Libre Caslon Text', faces: [['libre-caslon-text', 400], ['libre-caslon-text', 700]] },
  fraunces: { label: 'Fraunces', family: 'BI Fraunces', faces: [['fraunces', 400], ['fraunces', 500], ['fraunces', 700]] },
  spacemono: { label: 'Space Mono', family: 'BI Space Mono', faces: [['space-mono', 400], ['space-mono', 700]] },
  dmmono: { label: 'DM Mono', family: 'BI DM Mono', faces: [['dm-mono', 400], ['dm-mono', 500]] },
  rubikmono: { label: 'Rubik Mono One', family: 'BI Rubik Mono One', faces: [['rubik-mono-one', 400]] },
  monoton: { label: 'Monoton', family: 'BI Monoton', faces: [['monoton', 400]] },
};
const HAS_EXT = new Set(['host-grotesk', 'anton', 'inter-tight', 'space-grotesk', 'unbounded', 'jetbrains-mono', 'instrument-serif', 'syne', 'archivo-black', 'manrope', 'sora', 'figtree', 'onest', 'bricolage-grotesque', 'schibsted-grotesk', 'familjen-grotesk', 'red-hat-display', 'lexend', 'bebas-neue', 'oswald', 'barlow-condensed', 'big-shoulders-display', 'chakra-petch', 'dm-serif-display', 'young-serif', 'gloock', 'bodoni-moda', 'eb-garamond', 'libre-caslon-text', 'fraunces', 'space-mono', 'dm-mono', 'rubik-mono-one', 'monoton']);

export function fontCss(base) {
  let out = '';
  for (const f of Object.values(fonts)) {
    if (f.variable) {
      out += `@font-face{font-family:"${f.family}";font-weight:100 900;font-stretch:${f.stretch};src:url(${base}${f.variable}.woff2) format("woff2")}`;
      out += `@font-face{font-family:"${f.family}";font-weight:100 900;font-stretch:${f.stretch};unicode-range:U+0100-024F;src:url(${base}${f.variable.replace('latin-', 'latin-ext-')}.woff2) format("woff2")}`;
      continue;
    }
    for (const [file, w, style = 'normal'] of f.faces) {
      const fam = `font-family:"${f.family}";font-weight:${w};font-style:${style}`;
      out += `@font-face{${fam};src:url(${base}${file}-latin-${w}-${style}.woff2) format("woff2")}`;
      if (HAS_EXT.has(file)) out += `@font-face{${fam};unicode-range:U+0100-024F;src:url(${base}${file}-latin-ext-${w}-${style}.woff2) format("woff2")}`;
    }
  }
  return out;
}

export const motionCss = `
.bi-ad{--fdv:var(--fd,"BI Grotesk");--ftv:var(--ft,"BI Grotesk");--fmv:var(--fm,"BI Mono")}
.bi-ad .bi-media{object-position:var(--ix,50%) var(--iy,50%);scale:var(--iz,1);transform-origin:var(--ix,50%) var(--iy,50%)}
.bi-ad .bi-media.low{top:auto;height:55%}
.bi-ad .mo-acc{color:var(--accent);font-style:normal}
.bi-ad .mo-dw{position:absolute;z-index:4;font-family:var(--fdv);font-weight:700;line-height:.92;letter-spacing:-.02em}
.bi-ad .mo-label,.bi-ad .mo-small,.bi-ad .mo-micro,.bi-ad .mo-mono,.bi-ad .mo-h3,.bi-ad .mo-foot,.bi-ad .mo-body,.bi-ad .mo-para,.bi-ad .mo-handle{position:absolute;z-index:4}
.bi-ad .mo-label{font-size:calc(var(--u)*1.9);text-transform:uppercase;letter-spacing:.04em;opacity:.85}
.bi-ad .mo-small{font-size:calc(var(--u)*2.4);line-height:1.25;font-weight:500}
.bi-ad .mo-micro{font-size:calc(var(--u)*1.7);line-height:1.3;font-weight:500;text-transform:uppercase;letter-spacing:.02em}
.bi-ad .mo-mono{font-family:var(--fmv);font-size:calc(var(--u)*2.2);line-height:1.3;letter-spacing:0}
.bi-ad .mo-h3{font-family:var(--fdv);font-size:calc(var(--u)*4.4);font-weight:700;line-height:1;letter-spacing:-.01em;text-transform:uppercase}
.bi-ad .mo-tint{position:absolute;inset:0;background:radial-gradient(90% 70% at 70% 45%,transparent,color-mix(in srgb,var(--g2) calc(var(--ov,.6)*100%),transparent)),linear-gradient(180deg,transparent 40%,color-mix(in srgb,var(--g1) calc(var(--ov,.6)*45%),transparent));mix-blend-mode:normal}
.bi-ad .mo-tint.soft{background:radial-gradient(60% 50% at 20% 25%,color-mix(in srgb,var(--g1) calc(var(--ov,.6)*70%),transparent),transparent 70%),radial-gradient(50% 40% at 95% 80%,color-mix(in srgb,var(--g1) calc(var(--ov,.6)*60%),transparent),transparent 70%),rgba(0,0,0,calc(var(--ov,.6)*.4))}
.bi-ad .mo-tint.cold{background:linear-gradient(180deg,rgba(5,10,20,calc(var(--ov,.6)*.5)),transparent 35%,rgba(5,10,20,calc(var(--ov,.6)*.9))),color-mix(in srgb,var(--g1) calc(var(--ov,.6)*25%),transparent);mix-blend-mode:normal}
.bi-ad .mo-shade{position:absolute;inset:0;background:radial-gradient(70% 60% at 50% 40%,transparent,rgba(0,0,0,calc(var(--ov,.6)*.9)))}
.bi-ad .mo-shade.light{background:linear-gradient(180deg,transparent 50%,rgba(0,0,0,calc(var(--ov,.6)*.5)))}
.bi-ad .mo-shade.low{background:linear-gradient(180deg,transparent 55%,rgba(0,0,0,calc(var(--ov,.6)*1.1)))}
.bi-ad .mo-v{position:absolute;top:0;bottom:0;width:1px;background:currentColor;opacity:.45;z-index:3}
.bi-ad .mo-h{position:absolute;left:0;right:0;height:1px;background:currentColor;opacity:.45;z-index:3}
.bi-ad .mo-cw{left:0;right:0;top:50%;translate:0 -50%;text-align:center;font-size:calc(var(--u)*6.6);font-weight:400;letter-spacing:.02em;white-space:nowrap}
.bi-ad .mo-grain{position:absolute;inset:0;z-index:2;opacity:.5;mix-blend-mode:overlay;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
/* glass cross */
.bi-ad .mo-cross{position:absolute;left:-10%;right:-10%;top:4%;bottom:-6%;rotate:-7deg;z-index:3}
.bi-ad .mo-cross i{position:absolute;background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(0,0,0,.45));-webkit-backdrop-filter:blur(calc(var(--u)*1.2)) brightness(.7);backdrop-filter:blur(calc(var(--u)*1.2)) brightness(.7);box-shadow:inset 0 0 0 1px rgba(255,255,255,.55)}
.bi-ad .mo-cross .v{left:41%;width:22%;top:0;bottom:0}
.bi-ad .mo-cross .h{left:0;right:0;top:30%;height:22%}
.bi-ad .mo-cross p{position:absolute;top:39%;font-size:calc(var(--u)*4);font-family:var(--ftv);z-index:2}
.bi-ad .mo-cross .l{left:16%} .bi-ad .mo-cross .r{left:70%}
.bi-ad .mo-mark{right:var(--m);bottom:var(--m);font-size:calc(var(--u)*11);letter-spacing:-.04em}
/* data frame */
.bi-ad .mo-frame{position:absolute;left:21%;right:21%;top:16%;bottom:16%;border:1px solid currentColor;z-index:4;opacity:.75}
.bi-ad .mo-frame::before,.bi-ad .mo-frame::after{content:"";position:absolute;width:calc(var(--u)*1.4);height:calc(var(--u)*1.4);border:1px solid currentColor}
.bi-ad .mo-frame::before{left:calc(var(--u)*-1.8);top:calc(var(--u)*-1.8);border-width:0 1px 1px 0}
.bi-ad .mo-frame::after{right:calc(var(--u)*-1.8);bottom:calc(var(--u)*-1.8);border-width:1px 0 0 1px}
.bi-ad .mo-frame .sq{position:absolute;width:calc(var(--u)*1.6);height:calc(var(--u)*1.6);background:currentColor}
.bi-ad .mo-frame .sq.a{right:calc(var(--u)*-.8);top:58%} .bi-ad .mo-frame .sq.b{left:calc(var(--u)*-.8);bottom:calc(var(--u)*-.8)}
.bi-ad .mo-frame .hl{position:absolute;left:0;right:0;top:59%;height:1px;background:currentColor}
/* spec sheet */
.bi-ad .mo-smear{filter:blur(calc(var(--u)*1.4));-webkit-mask-image:linear-gradient(90deg,#000 0,transparent 45%);mask-image:linear-gradient(90deg,#000 0,transparent 45%);scale:calc(var(--iz,1)*1.04)}
.bi-ad .mo-spec{position:absolute;left:24%;right:12%;top:38%;display:grid;grid-template-columns:1fr 1fr;gap:calc(var(--u)*2) calc(var(--u)*4);z-index:4;font-family:var(--fmv);font-size:calc(var(--u)*1.75);line-height:1.38;text-transform:uppercase;letter-spacing:.01em}
.bi-ad .mo-spec .r{text-align:right} .bi-ad .mo-spec .gap{margin-top:calc(var(--u)*2.2)}
.bi-ad .mo-it{position:static;font-style:italic;font-size:calc(var(--u)*2.6);transform:skewX(-10deg)}
/* three words */
.bi-ad .mo-handle{display:flex;align-items:center;gap:calc(var(--u)*1);font-size:calc(var(--u)*2.2);letter-spacing:.06em;text-transform:uppercase}
.bi-ad .mo-handle svg{width:calc(var(--u)*2.6);height:calc(var(--u)*2.6)}
.bi-ad .mo-three{position:absolute;left:var(--m);right:var(--m);top:50%;translate:0 -50%;display:flex;justify-content:space-between;align-items:baseline;z-index:4;font-size:calc(var(--u)*4);text-shadow:0 0 calc(var(--u)*3) rgba(0,0,0,.25)}
.bi-ad .mo-three .x{font-size:.75em}
/* haze */
.bi-ad .mo-haze{position:absolute;inset:0;background:radial-gradient(70% 45% at 45% 72%,color-mix(in srgb,var(--g1) calc(var(--ov,.6)*160%),transparent),transparent 75%),radial-gradient(40% 30% at 85% 30%,color-mix(in srgb,var(--g1) calc(var(--ov,.6)*90%),transparent),transparent 80%);-webkit-backdrop-filter:blur(calc(var(--u)*.6));backdrop-filter:blur(calc(var(--u)*.6))}
.bi-ad .mo-hz{position:absolute;left:19%;right:19%;top:62%;z-index:4}
.bi-ad .mo-hz .w{position:static;font-size:calc(var(--u)*11);font-weight:800;letter-spacing:-.04em}
.bi-ad .mo-hz .t{font-size:calc(var(--u)*2.8);font-weight:500;margin-top:calc(var(--u)*.6)}
.bi-ad .mo-hz .j{margin-top:calc(var(--u)*5);font-size:calc(var(--u)*2.9);line-height:1.35;text-align:justify;text-align-last:justify;letter-spacing:.02em}
.bi-ad .mo-foot{left:0;right:0;bottom:var(--m);text-align:center;font-size:calc(var(--u)*1.9)}
/* giant word */
.bi-ad .mo-dots{position:absolute;left:var(--m);top:var(--m);display:grid;grid-template-columns:repeat(7,1fr);gap:calc(var(--u)*.35);z-index:4}
.bi-ad .mo-dots i{width:calc(var(--u)*.9);height:calc(var(--u)*.9);border-radius:50%;background:#111;opacity:.75}
.bi-ad .mo-dots i.on{background:var(--accent);opacity:1}
.bi-ad .mo-glass-pill{position:absolute;left:38%;top:47%;z-index:4;display:flex;align-items:center;gap:calc(var(--u)*1.4);padding:calc(var(--u)*.8) calc(var(--u)*.8) calc(var(--u)*.8) calc(var(--u)*2);border-radius:calc(var(--u)*1.2);background:rgba(40,40,40,.35);-webkit-backdrop-filter:blur(calc(var(--u)*1.5));backdrop-filter:blur(calc(var(--u)*1.5));font-size:calc(var(--u)*1.9)}
.bi-ad .mo-glass-pill b{display:grid;place-items:center;width:calc(var(--u)*5);height:calc(var(--u)*5);border-radius:calc(var(--u)*1);background:var(--accent)}
.bi-ad .mo-glass-pill svg{width:45%;height:45%}
.bi-ad .mo-body{left:38%;right:22%;top:56%;font-size:calc(var(--u)*1.6);line-height:1.35;opacity:.75}
.bi-ad .mo-giant{left:-1%;right:-4%;bottom:-.12em;font-size:calc(var(--u)*25);font-weight:500;letter-spacing:-.06em;white-space:nowrap;line-height:1;mix-blend-mode:difference}
/* about */
.bi-ad .mo-para{left:56%;right:6%;top:70%;font-size:calc(var(--u)*3.4);line-height:1.12;letter-spacing:-.02em}
.bi-ad .mo-para .mo-acc{color:var(--accent)}
/* bracketed wordmark */
.bi-ad .mo-brk{position:absolute;left:20%;right:20%;top:39%;height:22%;z-index:4}
.bi-ad .mo-tk{position:absolute;width:calc(var(--u)*1.4);height:calc(var(--u)*1.4)}
.bi-ad .mo-tk::before,.bi-ad .mo-tk::after{content:"";position:absolute;background:currentColor}
.bi-ad .mo-tk::before{left:0;right:0;top:50%;height:1px} .bi-ad .mo-tk::after{top:0;bottom:0;left:50%;width:1px}
.bi-ad .mo-tk.tl{left:-2%;top:0;clip-path:inset(50% 0 0 50%)} .bi-ad .mo-tk.tr{right:-2%;top:0;clip-path:inset(50% 50% 0 0)} .bi-ad .mo-tk.bl{left:-2%;bottom:0;clip-path:inset(0 0 50% 50%)} .bi-ad .mo-tk.br{right:-2%;bottom:0;clip-path:inset(0 50% 50% 0)}
.bi-ad .mo-brk .w{position:static;font-size:calc(var(--u)*8.4);font-weight:400;letter-spacing:0;line-height:1;text-align:center;margin-top:calc(var(--u)*3.4)}
.bi-ad .mo-brk sup{font-size:.22em;vertical-align:top;font-family:var(--ftv)}
.bi-ad .mo-brk .meta{display:grid;grid-template-columns:1fr 1fr auto;gap:calc(var(--u)*2);margin-top:calc(var(--u)*3);font-family:var(--fmv);font-size:calc(var(--u)*1.45);line-height:1.6;text-transform:uppercase}
.bi-ad .mo-brk .meta .r{text-align:right}
/* route stats */
.bi-ad .mo-route{position:absolute;left:12%;right:12%;top:38%;height:18%;z-index:4;overflow:visible}
.bi-ad .mo-stats{position:absolute;left:var(--m);right:var(--m);bottom:calc(var(--m)*1.6);display:grid;grid-template-columns:repeat(3,1fr);z-index:4;font-family:var(--fdv);font-size:calc(var(--u)*4.4);letter-spacing:.01em}
.bi-ad .mo-stats span{display:block;font-family:var(--ftv);font-size:calc(var(--u)*2);margin-bottom:calc(var(--u)*.8);opacity:.85}
/* vertical headline */
.bi-ad .mo-vert{left:var(--m);bottom:var(--m);writing-mode:vertical-rl;rotate:180deg;font-size:calc(var(--u)*11);font-weight:400;letter-spacing:0;line-height:.95;text-transform:uppercase;white-space:nowrap}
/* echo */
.bi-ad .mo-echo{position:absolute;left:var(--m);right:var(--m);top:34%;z-index:3}
.bi-ad .mo-echo p{position:absolute;left:0;top:0;font-family:var(--fdv);font-weight:800;font-size:calc(var(--u)*14);line-height:.9;letter-spacing:-.02em;text-transform:uppercase}
.bi-ad .mo-echo .e1{position:relative} .bi-ad .mo-echo .e2{translate:0 -18%;filter:blur(calc(var(--u)*.5));opacity:.35} .bi-ad .mo-echo .e3{translate:0 -36%;filter:blur(calc(var(--u)*1.2));opacity:.18}
/* ghost stack */
.bi-ad .mo-ghost{position:absolute;left:var(--m);right:0;top:var(--m);z-index:1;filter:blur(calc(var(--u)*.35));opacity:.1}
.bi-ad .mo-ghost p{font-family:var(--fdv);font-size:calc(var(--u)*20);line-height:.86;text-transform:uppercase;white-space:nowrap;letter-spacing:-.02em}
.bi-ad .mo-gh{left:var(--m);bottom:calc(var(--m)*1.6);font-size:calc(var(--u)*7.4);text-transform:uppercase;font-weight:800;line-height:.92}
/* blur word */
.bi-ad .mo-sky{position:absolute;inset:0;background:linear-gradient(180deg,var(--g2),var(--g1))}
.bi-ad .mo-sky.soft{background:radial-gradient(80% 60% at 50% 20%,var(--g1),var(--g2))}
.bi-ad .mo-sky.fade{background:linear-gradient(180deg,var(--bg) 0,color-mix(in srgb,var(--bg) 70%,transparent) 45%,transparent 70%)}
.bi-ad .mo-bigblur{position:absolute;left:0;right:0;top:50%;translate:0 -50%;z-index:2;text-align:center;font-family:var(--fdv);font-weight:800;font-size:calc(var(--u)*40);line-height:1;color:#fff;filter:blur(calc(var(--u)*1.6));opacity:.9;letter-spacing:-.02em}
.bi-ad .mo-bwh{left:0;right:0;top:50%;translate:0 -50%;text-align:center;font-size:calc(var(--u)*6.4);font-weight:800;text-transform:uppercase;letter-spacing:.01em}
/* duotone */
.bi-ad .mo-duo{position:absolute;inset:0;background:var(--g1);mix-blend-mode:multiply;opacity:calc(.5 + var(--ov,.6)*.5)}
.bi-ad .mo-star{position:absolute;left:var(--m);top:44%;width:calc(var(--u)*8);height:calc(var(--u)*8);z-index:4;background:linear-gradient(currentColor,currentColor) 50% 0/1.5px 100% no-repeat,linear-gradient(currentColor,currentColor) 0 50%/100% 1.5px no-repeat;rotate:-30deg}
.bi-ad .mo-duoh{left:var(--m);top:52%;font-size:calc(var(--u)*7);font-weight:700;letter-spacing:-.03em}
/* aura and orb */
.bi-ad .mo-aura{position:absolute;inset:0;background:radial-gradient(70% 55% at 110% -5%,var(--g1),color-mix(in srgb,var(--g1) 30%,transparent) 45%,transparent 70%),radial-gradient(60% 50% at 100% 110%,var(--g1),transparent 70%),var(--bg);filter:blur(calc(var(--u)*1))}
.bi-ad .mo-aurah{left:var(--m);top:36%;font-size:calc(var(--u)*6.4);font-weight:400;text-transform:uppercase;letter-spacing:-.02em;line-height:1}
.bi-ad .mo-rule{position:absolute;left:var(--m);right:var(--m);height:1px;background:currentColor;opacity:.4;z-index:4}
.bi-ad .mo-orb{position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,var(--g2) 0,var(--g2) 26%,var(--g1) 34%,color-mix(in srgb,var(--g1) 40%,var(--bg)) 42%,var(--bg) 58%)}
.bi-ad .mo-orbw{left:0;right:0;top:50%;translate:0 -50%;text-align:center;font-size:calc(var(--u)*4);font-weight:400;letter-spacing:.04em}
/* glow step */
.bi-ad .mo-glow{position:absolute;left:-20%;right:-20%;top:42%;height:42%;background:radial-gradient(50% 50% at 50% 50%,var(--g1),color-mix(in srgb,var(--g1) 40%,transparent) 45%,transparent 72%);filter:blur(calc(var(--u)*4))}
.bi-ad .mo-ic{position:absolute;z-index:4;width:calc(var(--u)*3);height:calc(var(--u)*3);opacity:.5} .bi-ad .mo-ic svg{width:100%;height:100%;rotate:90deg}
.bi-ad .mo-chip{position:absolute;left:var(--m);top:30%;z-index:4;padding:calc(var(--u)*.7) calc(var(--u)*1.8);border-radius:99px;border:1px solid color-mix(in srgb,var(--accent) 60%,transparent);background:color-mix(in srgb,var(--accent) 12%,transparent);color:var(--accent);font-size:calc(var(--u)*2.2)}
.bi-ad .mo-chip.in{position:relative;left:auto;top:-.2em;display:inline-block;color:inherit;background:rgba(255,255,255,.25);border:0;font-size:.4em;vertical-align:middle;margin-right:.3em}
.bi-ad .mo-steph{left:var(--m);right:var(--m);top:37%;font-size:calc(var(--u)*7);font-weight:400;letter-spacing:-.035em;line-height:1}
.bi-ad .mo-steph span{font-size:.45em;letter-spacing:-.01em}
/* ribbon */
.bi-ad .mo-ribbon{position:absolute;inset:0;width:100%;height:100%;z-index:1}
.bi-ad .mo-ribh{left:var(--m);right:var(--m);bottom:calc(var(--m)*1.4);font-size:calc(var(--u)*7.4);font-weight:700;letter-spacing:-.035em;line-height:.95}
/* app tile */
.bi-ad .mo-deep{position:absolute;inset:0;background:radial-gradient(70% 60% at 90% 100%,var(--g1),transparent 70%),radial-gradient(60% 50% at 0 0,color-mix(in srgb,var(--g1) 35%,transparent),transparent 70%),var(--bg)}
.bi-ad .mo-deep.side{background:radial-gradient(60% 80% at 100% 100%,color-mix(in srgb,var(--g1) 70%,#fff),transparent 70%),radial-gradient(50% 60% at 0 30%,color-mix(in srgb,var(--g1) 45%,transparent),transparent 70%),var(--bg)}
.bi-ad .mo-tile{position:absolute;left:50%;top:50%;translate:-50% -50%;width:calc(var(--u)*26);aspect-ratio:1;border-radius:22%;display:grid;place-items:center;background:linear-gradient(140deg,#000 30%,color-mix(in srgb,var(--g1) 70%,#000));box-shadow:0 calc(var(--u)*3) calc(var(--u)*8) rgba(0,0,0,.45),inset 0 0 0 1px rgba(255,255,255,.08);z-index:4}
.bi-ad .mo-tile p{font-family:var(--fdv);font-size:calc(var(--u)*6.6);letter-spacing:-.03em}
/* story card */
.bi-ad .mo-sphoto{position:absolute;left:0;right:0;top:0;height:46%;overflow:hidden}
.bi-ad .mo-scard{position:absolute;left:30%;right:0;top:34%;height:42%;z-index:3;border-radius:calc(var(--u)*5) 0 0 calc(var(--u)*5);background:var(--g1);padding:calc(var(--u)*6) calc(var(--u)*5);font-size:calc(var(--u)*4);line-height:1.18;letter-spacing:-.01em}
.bi-ad .mo-sbtn{display:inline-block;margin-top:calc(var(--u)*5);padding:calc(var(--u)*1.2) calc(var(--u)*2.6);border-radius:99px;background:#fff;color:#0b0b0b;font-size:calc(var(--u)*2.1);font-weight:500}
.bi-ad .mo-bars{position:absolute;left:var(--m);right:var(--m);top:calc(var(--u)*2.5);display:flex;gap:calc(var(--u)*.8);z-index:5}
.bi-ad .mo-bars i{flex:1;height:calc(var(--u)*.4);border-radius:9px;background:rgba(255,255,255,.4)} .bi-ad .mo-bars i.on{background:#fff}
.bi-ad .mo-who{position:absolute;left:var(--m);top:calc(var(--u)*5);display:flex;align-items:center;gap:calc(var(--u)*1.4);z-index:5;font-size:calc(var(--u)*2.6);font-weight:500}
.bi-ad .mo-who b{display:grid;place-items:center;width:calc(var(--u)*6);height:calc(var(--u)*6);border-radius:50%;background:#fff;color:var(--g1);font-size:calc(var(--u)*3)}
.bi-ad .mo-who span{opacity:.6;font-weight:400}
.bi-ad .mo-x{position:absolute;right:var(--m);top:calc(var(--u)*5.6);z-index:5;font-size:calc(var(--u)*4.4);line-height:1}
.bi-ad .mo-msg{position:absolute;left:var(--m);right:var(--m);bottom:calc(var(--u)*5);display:flex;align-items:center;gap:calc(var(--u)*2.2);z-index:5;font-size:calc(var(--u)*2.2)}
.bi-ad .mo-msg span{flex:1;padding:calc(var(--u)*1.6) calc(var(--u)*2.6);border-radius:99px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.5);opacity:.85}
.bi-ad .mo-msg svg{width:calc(var(--u)*4.4);height:calc(var(--u)*4.4)}
/* pills */
.bi-ad .mo-pills{position:absolute;left:0;right:0;top:26%;z-index:4;display:grid;justify-items:center;gap:calc(var(--u)*.6)}
.bi-ad .mo-pills p{padding:calc(var(--u)*1.8) calc(var(--u)*4.4);border-radius:99px;font-family:var(--fdv);font-size:calc(var(--u)*3.6);rotate:-4deg;box-shadow:0 calc(var(--u)*1) calc(var(--u)*3) rgba(0,0,0,.35)}
.bi-ad .mo-pills .p0{translate:-12% 0;background:linear-gradient(90deg,var(--g1),#cfe0ff);color:#06122e}
.bi-ad .mo-pills .p1{translate:14% 0;background:linear-gradient(90deg,#5b3df5,#7d6bff)}
.bi-ad .mo-pills .p2{translate:-16% 0;background:linear-gradient(90deg,#1aa4ff,#7fd0ff);color:#06122e}
.bi-ad .mo-pills .p3{translate:8% 0;background:linear-gradient(90deg,#e8eeff,#4f86ff);color:#06122e}
.bi-ad .mo-pills .p4{translate:-12% 0;background:color-mix(in srgb,var(--g1) 40%,#06122e)}
.bi-ad .mo-pills .p5{translate:12% 0;background:linear-gradient(90deg,#28b8ff,#1f6bff)}
.bi-ad .mo-dash{position:absolute;left:50%;bottom:16%;translate:-50% 0;z-index:4;padding:calc(var(--u)*1.4) calc(var(--u)*3);border-radius:99px;border:1px dashed rgba(255,255,255,.6);font-size:calc(var(--u)*2.2);white-space:nowrap}
/* quiet card and centred line */
.bi-ad .mo-card{position:absolute;left:14%;right:14%;top:14%;height:48%;z-index:4;border-radius:calc(var(--u)*4);background:linear-gradient(160deg,rgba(110,150,190,.55),rgba(150,185,215,.35));box-shadow:inset 0 0 0 1px rgba(255,255,255,.45),0 calc(var(--u)*2) calc(var(--u)*6) rgba(40,70,110,.18);-webkit-backdrop-filter:blur(calc(var(--u)*2));backdrop-filter:blur(calc(var(--u)*2));padding:calc(var(--u)*5)}
.bi-ad .mo-card p{font-family:var(--fdv);font-size:calc(var(--u)*5);font-weight:400;line-height:1.12;letter-spacing:-.015em}
.bi-ad .mo-btns{position:absolute;left:0;right:0;top:68%;display:flex;justify-content:center;gap:calc(var(--u)*1.6);z-index:4}
.bi-ad .mo-btns span{padding:calc(var(--u)*1.8) calc(var(--u)*4.6);border-radius:99px;background:rgba(255,255,255,.9);color:#4a6a8c;font-size:calc(var(--u)*2.4);font-weight:500}
.bi-ad .mo-centre{position:absolute;left:12%;right:12%;top:28%;z-index:4;text-align:center;font-family:var(--fdv);font-size:calc(var(--u)*5.4);font-weight:500;line-height:1.2;letter-spacing:-.01em}
.bi-ad .mo-round{position:absolute;left:0;right:0;top:63%;display:flex;justify-content:center;gap:calc(var(--u)*1.4);z-index:4}
.bi-ad .mo-round b{display:grid;place-items:center;width:calc(var(--u)*7);height:calc(var(--u)*7);border-radius:50%;background:rgba(255,255,255,.25);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
.bi-ad .mo-round svg{width:45%;height:45%}
/* club cover */
.bi-ad .mo-cov{position:absolute;left:0;right:0;top:50%;translate:0 -50%;z-index:4;display:grid;justify-items:center;gap:calc(var(--u)*.8);text-align:center}
.bi-ad .mo-cov .mo-dw{position:static;font-size:calc(var(--u)*11);font-weight:700;letter-spacing:-.05em}
.bi-ad .mo-badge{position:absolute;left:50%;bottom:calc(var(--m)*1.2);translate:-50% 0;display:flex;z-index:4}
.bi-ad .mo-badge b{display:grid;place-items:center;width:calc(var(--u)*8);height:calc(var(--u)*8);border-radius:50%;border:2px solid #fff;background:#0b0b0b;color:#fff;font-family:var(--fdv);font-size:calc(var(--u)*2.6);margin-left:calc(var(--u)*-1.5)}
/* wide formats */
@container (min-aspect-ratio: 13/10){
  .bi-ad .mo-spec{left:42%;right:6%;top:24%} .bi-ad .mo-para{left:52%;top:52%} .bi-ad .mo-giant{font-size:calc(var(--u)*30)}
  .bi-ad .mo-scard{left:46%;top:16%;height:68%} .bi-ad .mo-sphoto{width:52%;height:100%}
  .bi-ad .mo-card{left:28%;right:28%;top:12%;height:56%} .bi-ad .mo-hz{left:30%;right:30%;top:48%}
  .bi-ad .mo-frame{left:34%;right:34%} .bi-ad .mo-brk{left:30%;right:30%}
}
/* tall formats */
@container (max-aspect-ratio: 7/10){
  .bi-ad .mo-spec{left:14%;right:8%;top:44%} .bi-ad .mo-para{left:var(--m);right:var(--m);top:72%;font-size:calc(var(--u)*5)}
  .bi-ad .mo-scard{left:20%;top:38%;height:36%} .bi-ad .mo-card{left:10%;right:10%;top:20%;height:38%}
  .bi-ad .mo-hz{left:12%;right:12%;top:64%} .bi-ad .mo-brk{left:10%;right:10%} .bi-ad .mo-frame{left:14%;right:14%;top:20%;bottom:20%}
  .bi-ad .mo-giant{font-size:calc(var(--u)*24);bottom:8%} .bi-ad .mo-echo p{font-size:calc(var(--u)*16)}
}`;

// The brand's own logo when one is uploaded, otherwise the given text set in the display font.
// the studio's own mark, used when a brand has no uploaded logo; it takes the logo colour
export const DEFAULT_MARK = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="258 239 692 720"><path fill="currentColor" d="M400.3 955.5C411.2 953.5 423.9 949.1 435.0 943.4C465.6 927.6 489.0 896.5 496.2 862.1C498.7 850.5 499.1 829.1 497.1 818.0C488.3 768.6 451.5 730.9 402.0 720.4C391.5 718.2 369.7 718.0 359.0 719.9C301.6 730.2 260.0 779.7 260.0 837.6C260.0 870.0 272.1 899.3 294.9 922.0C312.9 939.9 334.0 951.1 357.7 955.4C368.3 957.3 389.4 957.4 400.3 955.5ZM844.1 955.5C896.7 946.3 937.3 901.8 941.9 848.1C946.2 799.4 919.6 752.1 875.8 730.7C859.0 722.5 845.9 719.5 820.5 718.1C807.7 717.4 801.0 716.5 793.5 714.5C772.3 708.9 754.8 698.9 738.9 683.0C723.3 667.6 712.9 649.4 707.3 628.0C703.9 615.1 703.0 592.7 705.4 579.0C713.9 530.4 750.8 491.9 798.5 482.0C803.6 480.9 815.6 479.6 825.1 479.1C854.5 477.4 873.8 470.9 894.5 455.5C916.9 438.8 933.2 413.8 939.6 386.3C948.6 347.3 936.3 304.3 908.1 275.9C884.8 252.6 855.9 240.6 823.0 240.6C790.2 240.6 762.0 252.3 738.5 275.7C717.1 297.0 704.0 327.7 704.0 356.4C704.0 414.4 666.7 462.6 611.6 476.1C606.6 477.3 597.0 478.4 586.5 479.0C560.8 480.4 548.5 483.3 531.2 491.8C499.5 507.5 476.6 536.3 467.8 571.8C465.9 579.1 465.6 583.4 465.6 598.5C465.5 613.9 465.9 617.8 467.8 625.5C473.8 649.3 483.5 666.6 499.9 683.0C516.7 699.7 536.7 710.8 559.0 715.6C562.6 716.4 572.9 717.5 582.0 718.0C591.1 718.5 602.2 719.6 606.8 720.5C648.2 728.4 682.7 758.2 696.8 798.2C701.1 810.3 702.9 820.7 704.0 840.5C704.6 852.7 705.6 860.2 707.3 867.0C718.8 911.8 754.1 945.4 799.5 955.0C810.8 957.3 832.2 957.6 844.1 955.5ZM399.6 477.5C448.4 469.0 485.8 432.3 496.6 382.5C498.9 371.5 499.0 349.5 496.7 337.7C487.0 289.1 450.8 252.6 402.0 242.4C390.6 240.0 368.8 240.0 356.7 242.4C311.0 251.4 275.1 285.4 263.3 330.9C260.0 343.9 259.1 365.6 261.4 378.6C268.7 420.6 295.6 454.5 334.0 470.3C341.8 473.5 356.2 477.4 363.5 478.3C371.7 479.3 391.6 478.9 399.6 477.5Z"/></svg>';
export const logo = (b = {}, text = '', cls = '') => (b.logo ? (String(b.logo).startsWith('<svg') ? `<span class="bi-logo bi-logo-svg ${cls}" role="img" aria-label="${esc(b.name || '')}">${b.logo}</span>` : `<img class="bi-logo ${cls}" src="${esc(b.logo)}" alt="${esc(b.name || '')}">`) : `<span class="bi-logotext ${cls}">${esc(text || b.name || '')}</span>`);
