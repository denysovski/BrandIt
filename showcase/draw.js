// Drawings for the KALT and PELLA showcases, all in SVG: film grain, ice, frost, brushed steel,
// water drops and liquid chrome. No photography and no paid image generation. Swap in real photos later.

let uid = 0;
const n = () => `d${uid++}`;
const svg = (w, h, body, name = 'picture') => `<svg class="art" data-n="${name}" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true">${body}</svg>`;

// Film-grain grey ground. tone: a CSS colour.
export function grain({ w = 1080, h = 1350, tone = '#8e9094', amount = 0.22, seed = 1 } = {}) {
  const id = n();
  return svg(w, h, `<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="${seed}"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 ${amount * 4} -${amount * 1.6}"/></filter>
    <radialGradient id="${id}v" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></radialGradient>
    <rect width="${w}" height="${h}" fill="${tone}"/><rect width="${w}" height="${h}" filter="url(#${id})"/><rect width="${w}" height="${h}" fill="url(#${id}v)"/>`, 'grain');
}

// Macro ice: crystal ridges lit from the top left, in cold greys.
export function ice({ w = 600, h = 600, seed = 3, scale = 1, dark = false } = {}) {
  const id = n();
  const f = (0.006 / scale).toFixed(4);
  return svg(w, h, `<filter id="${id}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="${f}" numOctaves="5" seed="${seed}" result="t"/>
      <feColorMatrix in="t" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.4 0 0 0 -.2" result="r"/>
      <feComponentTransfer in="r" result="a"><feFuncA type="table" tableValues="0 .9 .15 1 .3 .8 0"/></feComponentTransfer>
      <feSpecularLighting in="a" surfaceScale="${dark ? 9 : 7}" specularConstant="1.1" specularExponent="22" lighting-color="#f3f8fc" result="s"><feDistantLight azimuth="235" elevation="38"/></feSpecularLighting>
      <feDiffuseLighting in="a" surfaceScale="5" diffuseConstant="${dark ? 0.7 : 1}" lighting-color="${dark ? '#7f8a94' : '#c9d2da'}" result="d"><feDistantLight azimuth="235" elevation="55"/></feDiffuseLighting>
      <feComposite in="s" in2="d" operator="arithmetic" k2="1" k3="1"/></filter>
    <rect width="${w}" height="${h}" fill="${dark ? '#2a3036' : '#aeb7bf'}"/><rect width="${w}" height="${h}" filter="url(#${id})"/>`, 'ice');
}

// Frost and snow ground with soft drifts, for a product to stand on.
export function frost({ w = 1080, h = 600, seed = 4 } = {}) {
  const id = n();
  return svg(w, h, `<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".012 .03" numOctaves="5" seed="${seed}" result="t"/>
      <feDiffuseLighting in="t" surfaceScale="6" lighting-color="#fbfdff"><feDistantLight azimuth="250" elevation="50"/></feDiffuseLighting></filter>
    <filter id="${id}g"><feTurbulence type="fractalNoise" baseFrequency="1.1" seed="${seed + 1}"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1.2 -.85"/></filter>
    <linearGradient id="${id}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset=".25" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <rect width="${w}" height="${h}" filter="url(#${id})"/><rect width="${w}" height="${h}" filter="url(#${id}g)"/><rect width="${w}" height="${h}" fill="url(#${id}f)" opacity=".0"/>`, 'frost');
}

const brushed = (id, x1, x2, stops) => `<linearGradient id="${id}" x1="${x1}" x2="${x2}" y1="0" y2="0">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
const STEEL = [[0, '#3c4248'], [0.12, '#8d969e'], [0.26, '#d9dfe4'], [0.34, '#f4f7f9'], [0.45, '#a7b0b8'], [0.62, '#5b636b'], [0.8, '#9aa3ab'], [0.92, '#cfd5da'], [1, '#575e65']];

// Brushed-steel pump bottle with an engraved wordmark.
export function bottle({ size = 520, word = 'KALT', shadow = true } = {}) {
  const id = n();
  const w = 240, h = 620;
  return `<svg class="art" data-n="bottle" viewBox="0 0 ${w} ${h}" width="${size * w / h}" height="${size}" aria-hidden="true" style="overflow:visible">
    <defs>${brushed(id + 'b', 0, 1, STEEL)}${brushed(id + 'c', 0, 1, [[0, '#1d2125'], [0.3, '#5c646b'], [0.42, '#aab2b9'], [0.55, '#3b4147'], [1, '#15181b']])}
    <filter id="${id}n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".004 .9" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 -.35"/><feComposite in2="SourceGraphic" operator="in"/></filter>
    <filter id="${id}s" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="14"/></filter>
    <linearGradient id="${id}r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".25"/><stop offset=".1" stop-color="#fff" stop-opacity="0"/><stop offset=".92" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient></defs>
    ${shadow ? `<ellipse cx="${w / 2}" cy="${h - 6}" rx="118" ry="16" fill="#2d343b" opacity=".45" filter="url(#${id}s)"/>` : ''}
    <rect x="96" y="12" width="48" height="16" rx="3" fill="url(#${id}c)"/><rect x="104" y="28" width="32" height="70" fill="url(#${id}c)"/>
    <path d="M120 22 h70 a8 8 0 0 1 8 8 v6 h-78z" fill="url(#${id}c)"/>
    <rect x="78" y="96" width="84" height="64" rx="6" fill="url(#${id}b)"/><rect x="78" y="96" width="84" height="64" rx="6" fill="#fff" filter="url(#${id}n)" opacity=".5"/>
    <rect x="20" y="168" width="200" height="${h - 180}" rx="26" fill="url(#${id}b)"/>
    <rect x="20" y="168" width="200" height="${h - 180}" rx="26" fill="#fff" filter="url(#${id}n)" opacity=".55"/>
    <rect x="20" y="168" width="200" height="${h - 180}" rx="26" fill="url(#${id}r)"/>
    <rect x="20" y="160" width="200" height="12" rx="4" fill="#2b3035"/>
    <text x="120" y="420" text-anchor="middle" font-family="Display, sans-serif" font-size="40" font-weight="500" letter-spacing="10" style="font-stretch:62%" fill="#22272c" fill-opacity=".72">${word}</text>
    <text x="120" y="450" text-anchor="middle" font-family="Mono, monospace" font-size="9" letter-spacing="2.4" fill="#22272c" fill-opacity=".6">COLD SERUM · 30 ML</text></svg>`;
}

// Hexagonal steel jar at three-quarters.
export function jar({ size = 360, word = 'KALT', shadow = true } = {}) {
  const id = n();
  const W = 400, H = 300, cx = 200, top = 92, rx = 170, ry = 58, hgt = 120;
  const pts = [0, 60, 120, 180, 240, 300].map((a) => [cx + rx * Math.cos((a * Math.PI) / 180), top + ry * Math.sin((a * Math.PI) / 180)]);
  const faces = [];
  for (let i = 0; i < 6; i++) {
    const [a, b] = [pts[i], pts[(i + 1) % 6]];
    if (a[1] + b[1] < top * 2 - 1) continue; // back faces
    const shade = ['#cfd5da', '#9aa3ab', '#5b636b', '#3c4248', '#8d969e', '#e6eaee'][i];
    faces.push(`<path d="M${a[0]} ${a[1]} L${b[0]} ${b[1]} L${b[0]} ${b[1] + hgt} L${a[0]} ${a[1] + hgt}Z" fill="${shade}"/><path d="M${a[0]} ${a[1]} L${b[0]} ${b[1]} L${b[0]} ${b[1] + hgt} L${a[0]} ${a[1] + hgt}Z" fill="#fff" filter="url(#${id}n)" opacity=".4"/>`);
  }
  const lid = pts.map((p) => p.join(' ')).join(' L');
  return `<svg class="art" data-n="jar" viewBox="0 0 ${W} ${H}" width="${size}" height="${size * H / W}" aria-hidden="true" style="overflow:visible"><defs>
    ${brushed(id + 'b', 0, 1, STEEL)}
    <filter id="${id}n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9 .004" numOctaves="2" seed="5"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 -.35"/><feComposite in2="SourceGraphic" operator="in"/></filter>
    <filter id="${id}s" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="14"/></filter></defs>
    ${shadow ? `<ellipse cx="${cx}" cy="${top + ry + hgt - 4}" rx="190" ry="34" fill="#2d343b" opacity=".4" filter="url(#${id}s)"/>` : ''}
    ${faces.join('')}<path d="M${lid}Z" fill="url(#${id}b)"/><path d="M${lid}Z" fill="#fff" filter="url(#${id}n)" opacity=".45"/>
    <text x="${cx}" y="${top + 12}" text-anchor="middle" font-family="Display, sans-serif" font-size="34" font-weight="500" letter-spacing="9" style="font-stretch:62%" fill="#22272c" fill-opacity=".55" transform="translate(0 ${top}) scale(1 .34) translate(0 ${-top})">${word}</text></svg>`;
}

// Water drops on a soft grey gradient, like a macro of skin after mist.
export function drops({ w = 600, h = 760, seed = 9, count = 70 } = {}) {
  const id = n();
  let s = seed * 9301 + 49297;
  const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  let dots = '';
  for (let i = 0; i < count; i++) {
    const x = r() * w, y = r() * h, d = 3 + r() ** 3 * 26;
    dots += `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><ellipse rx="${d}" ry="${d * 0.92}" fill="url(#${id}d)"/><ellipse cx="${-d * 0.32}" cy="${-d * 0.36}" rx="${d * 0.28}" ry="${d * 0.2}" fill="#fff" opacity=".85"/><ellipse cy="${d * 0.9}" rx="${d * 0.9}" ry="${d * 0.22}" fill="#000" opacity=".12"/></g>`;
  }
  return svg(w, h, `<defs><radialGradient id="${id}b" cx=".4" cy=".35" r=".9"><stop offset="0" stop-color="#d9dcdf"/><stop offset=".6" stop-color="#8e9399"/><stop offset="1" stop-color="#3b3f44"/></radialGradient>
    <radialGradient id="${id}d" cx=".62" cy=".7" r=".7"><stop offset="0" stop-color="#f4f6f8"/><stop offset=".55" stop-color="#9ca2a8" stop-opacity=".55"/><stop offset="1" stop-color="#2d3237" stop-opacity=".7"/></radialGradient>
    <filter id="${id}g" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" seed="${seed}"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 .8 -.32"/></filter></defs>
    <rect width="${w}" height="${h}" fill="url(#${id}b)"/>${dots}<rect width="${w}" height="${h}" filter="url(#${id}g)"/>`, 'drops');
}

// Liquid chrome: banded silver and ice-blue gradient, warped by low-frequency noise.
const CHROME = [[0, '#0c0f12'], [0.08, '#5a6570'], [0.16, '#eef3f7'], [0.22, '#b9c2cb'], [0.3, '#2a3138'], [0.4, '#cfe3f2'], [0.48, '#ffffff'], [0.56, '#8f9ba6'], [0.66, '#1a1f24'], [0.76, '#a9c3d6'], [0.86, '#f4f8fb'], [1, '#4d5862']];
function chromeDefs(id, seed, warp = 60, angle = 0) {
  return `<linearGradient id="${id}c" x1="0" y1="0" x2="1" y2="1" gradientTransform="rotate(${angle} .5 .5)">${CHROME.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>
    <filter id="${id}w" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".008" numOctaves="2" seed="${seed}"/><feDisplacementMap in="SourceGraphic" scale="${warp}" xChannelSelector="R" yChannelSelector="G"/></filter>`;
}

// Chrome box at three-quarters with an optional wordmark on the front.
export function chromeBox({ size = 520, word = 'PELLA', seed = 2, open = false, shadow = true } = {}) {
  const id = n();
  const W = 520, H = 520;
  const F = 'M60 170 L300 230 L300 470 L60 410Z', S = 'M300 230 L470 160 L470 400 L300 470Z', T = 'M60 170 L230 100 L470 160 L300 230Z';
  const clip = (d, k) => `<clipPath id="${id}${k}"><path d="${d}"/></clipPath>`;
  const face = (k, d, ang, op = 1) => `<g clip-path="url(#${id}${k})"><g filter="url(#${id}w)"><rect x="0" y="0" width="${W}" height="${H}" fill="url(#${id}c)" transform="rotate(${ang} 260 260)" opacity="${op}"/></g></g>`;
  return `<svg class="art" data-n="chrome-box" viewBox="0 0 ${W} ${H}" width="${size}" height="${size}" aria-hidden="true" style="overflow:visible"><defs>${chromeDefs(id, seed)}${clip(F, 'f')}${clip(S, 's')}${clip(T, 't')}
    <filter id="${id}s" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="18"/></filter></defs>
    ${shadow ? `<path d="M70 420 L300 480 L480 405 L250 350Z" fill="#26303a" opacity=".35" filter="url(#${id}s)"/>` : ''}
    ${face('f', F, 8)}${face('s', S, 64)}${open ? `<path d="${T}" fill="#0c0f12"/><path d="M90 172 L230 115 L440 166 L300 222Z" fill="#cfe3f2" opacity=".9"/>` : face('t', T, -30)}
    <path d="${F}" fill="#000" opacity=".06"/><path d="${S}" fill="#000" opacity=".22"/>
    <g fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.2"><path d="${F}"/><path d="${S}"/><path d="${T}"/></g>
    ${word ? `<text font-family="Display, sans-serif" font-weight="900" font-size="58" letter-spacing="-1" style="font-stretch:112%" fill="#0a0a0b" transform="matrix(1 .25 0 1 82 300)">${word}</text>
    <text font-family="Mono, monospace" font-size="11" letter-spacing="2" fill="#0a0a0b" transform="matrix(1 .25 0 1 84 330)">24 PCS · 12 SIZES</text>` : ''}</svg>`;
}

// A word cast in liquid chrome.
export function chromeWord({ word = 'PELLA', w = 960, h = 300, size = 260, seed = 6 } = {}) {
  const id = n();
  return svg(w, h, `<defs>${chromeDefs(id, seed, 36, 90)}<mask id="${id}m"><text x="50%" y="${h * 0.78}" text-anchor="middle" font-family="Display, sans-serif" font-weight="900" font-size="${size}" letter-spacing="-6" style="font-stretch:112%" fill="#fff">${word}</text></mask>
    <filter id="${id}e" x="-5%" y="-10%" width="110%" height="120%"><feGaussianBlur in="SourceAlpha" stdDeviation="6"/><feOffset dy="14"/><feComponentTransfer><feFuncA type="linear" slope=".35"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <g filter="url(#${id}e)"><g mask="url(#${id}m)"><g filter="url(#${id}w)"><rect x="-40" y="-40" width="${w + 80}" height="${h + 80}" fill="url(#${id}c)"/></g></g></g>`, 'chrome-word');
}

// A liquid chrome blob, for stickers and backgrounds.
export function chromeBlob({ w = 400, h = 400, seed = 8 } = {}) {
  const id = n();
  return svg(w, h, `<defs>${chromeDefs(id, seed, 90, 30)}<clipPath id="${id}k"><ellipse cx="${w / 2}" cy="${h / 2}" rx="${w * 0.46}" ry="${h * 0.46}"/></clipPath></defs>
    <g clip-path="url(#${id}k)"><g filter="url(#${id}w)"><rect x="-40" y="-40" width="${w + 80}" height="${h + 80}" fill="url(#${id}c)"/></g></g>`, 'chrome-blob');
}

// A press-on nail in liquid chrome: a long rounded tip, seen from above.
export function nail({ w = 120, h = 260, seed = 3, tilt = 0 } = {}) {
  const id = n();
  const d = `M${w * 0.1} ${h} L${w * 0.06} ${h * 0.4} Q${w * 0.06} 0 ${w / 2} 0 Q${w * 0.94} 0 ${w * 0.94} ${h * 0.4} L${w * 0.9} ${h} Z`;
  return `<svg class="art" data-n="nail" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true" style="overflow:visible;rotate:${tilt}deg"><defs>${chromeDefs(id, seed, 40, 80)}<clipPath id="${id}k"><path d="${d}"/></clipPath></defs>
    <g clip-path="url(#${id}k)"><g filter="url(#${id}w)"><rect x="-30" y="-30" width="${w + 60}" height="${h + 60}" fill="url(#${id}c)"/></g></g>
    <path d="${d}" fill="none" stroke="#fff" stroke-opacity=".6"/></svg>`;
}
