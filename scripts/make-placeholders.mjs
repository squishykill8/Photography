// Generates soft, abstract placeholder "photos" so the site looks complete
// before your own work is uploaded. Run: npm run placeholders
// Delete these files from src/assets/uploads once you've replaced them in /admin.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const out = new URL('../src/assets/uploads/', import.meta.url);
mkdirSync(out, { recursive: true });

const palettes = {
  landscape: [['#f6d5a8', '#d98a6c', '#5b4a6b', '#2c2c46'], ['#cfe3ea', '#8fb3bf', '#4d6b78', '#22343c'], ['#fde2c4', '#e9a77b', '#7a5a7c', '#2d2240']],
  interior: [['#efe8df', '#d8cbb8', '#a9937a', '#5d4d3e'], ['#e9ecea', '#c6cfc9', '#8e9d93', '#4c5850'], ['#f3ede6', '#e1d2c3', '#b49a83', '#6b5644']],
  portrait: [['#e8d6cc', '#c9a593', '#8b6a5e', '#3e2f2b'], ['#dcdde3', '#a9adbd', '#6c7088', '#2f3142'], ['#efe1d1', '#d2b79b', '#99785e', '#46352a']],
  wedding: [['#f7efe9', '#ead7cc', '#cfae9d', '#8a6b5e'], ['#f4f1ec', '#e3dccf', '#c2b49c', '#7f725c'], ['#faf3f0', '#efd9d3', '#d6aea4', '#93665c']],
};

function scene(kind, p, w, h, seed) {
  const r = (n) => ((Math.sin(seed * 999 + n * 77.7) + 1) / 2);
  const bg = `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${p[0]}"/><stop offset="0.6" stop-color="${p[1]}"/><stop offset="1" stop-color="${p[2]}"/></linearGradient>
    <radialGradient id="v" cx="0.5" cy="0.5" r="0.75"><stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.35"/></radialGradient>
    <filter id="b"><feGaussianBlur stdDeviation="${Math.round(w / 300)}"/></filter></defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>`;
  let body = '';
  if (kind === 'landscape') {
    body += `<circle cx="${w * (0.25 + r(1) * 0.5)}" cy="${h * 0.38}" r="${w * 0.06}" fill="#fff" opacity="0.55" filter="url(#b)"/>`;
    for (let i = 0; i < 3; i++) {
      const base = h * (0.55 + i * 0.13);
      let d = `M0 ${h} L0 ${base}`;
      for (let x = 0; x <= w; x += w / 8) d += ` L${x} ${base - r(i * 10 + x) * h * (0.22 - i * 0.05)}`;
      d += ` L${w} ${h} Z`;
      body += `<path d="${d}" fill="${p[1 + i]}" opacity="${0.75 + i * 0.1}" filter="url(#b)"/>`;
    }
  } else if (kind === 'interior') {
    body += `<rect x="${w * 0.12}" y="${h * 0.12}" width="${w * 0.34}" height="${h * 0.5}" fill="#fff" opacity="0.6" filter="url(#b)"/>`;
    body += `<rect x="${w * 0.28}" y="${h * 0.12}" width="${w * 0.01}" height="${h * 0.5}" fill="${p[2]}" opacity="0.5"/>`;
    body += `<rect x="0" y="${h * 0.72}" width="${w}" height="${h * 0.28}" fill="${p[2]}" opacity="0.8"/>`;
    body += `<rect x="${w * 0.52}" y="${h * 0.52}" width="${w * 0.38}" height="${h * 0.22}" rx="${w * 0.02}" fill="${p[3]}" opacity="0.85" filter="url(#b)"/>`;
    body += `<circle cx="${w * 0.78}" cy="${h * 0.3}" r="${w * 0.05}" fill="${p[1]}" opacity="0.9"/>`;
    body += `<rect x="${w * 0.776}" y="${h * 0.33}" width="${w * 0.008}" height="${h * 0.2}" fill="${p[3]}"/>`;
  } else if (kind === 'portrait') {
    body += `<ellipse cx="${w * 0.5}" cy="${h * 0.4}" rx="${w * 0.16}" ry="${w * 0.2}" fill="${p[3]}" opacity="0.85" filter="url(#b)"/>`;
    body += `<ellipse cx="${w * 0.5}" cy="${h * 1.02}" rx="${w * 0.42}" ry="${h * 0.38}" fill="${p[3]}" opacity="0.85" filter="url(#b)"/>`;
  } else {
    body += `<circle cx="${w * 0.45}" cy="${h * 0.5}" r="${w * 0.12}" fill="none" stroke="#fff" stroke-width="${w * 0.018}" opacity="0.8" filter="url(#b)"/>`;
    body += `<circle cx="${w * 0.57}" cy="${h * 0.5}" r="${w * 0.12}" fill="none" stroke="${p[3]}" stroke-width="${w * 0.018}" opacity="0.7" filter="url(#b)"/>`;
    for (let i = 0; i < 14; i++) body += `<circle cx="${r(i) * w}" cy="${r(i + 50) * h}" r="${w * (0.01 + r(i + 9) * 0.03)}" fill="#fff" opacity="${0.15 + r(i + 3) * 0.3}" filter="url(#b)"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${bg}${body}<rect width="${w}" height="${h}" fill="url(#v)"/></svg>`;
}

const sizes = [[2400, 1600], [1600, 2400], [2400, 1600], [1800, 1800], [1600, 2400], [2400, 1500]];
const jobs = [];
for (const [kind, pals] of Object.entries(palettes)) {
  for (let i = 0; i < 6; i++) {
    const [w, h] = kind === 'portrait' && i % 2 === 0 ? [1600, 2200] : sizes[i];
    const svg = scene(kind, pals[i % pals.length], w, h, i + kind.length);
    jobs.push(sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(new URL(`sample-${kind}-${i + 1}.jpg`, out).pathname));
  }
}
jobs.push(sharp(Buffer.from(scene('landscape', palettes.landscape[2], 3000, 1700, 42))).jpeg({ quality: 82 }).toFile(new URL('sample-banner.jpg', out).pathname));
jobs.push(sharp(Buffer.from(scene('portrait', palettes.portrait[0], 1400, 1750, 7))).jpeg({ quality: 82 }).toFile(new URL('sample-headshot.jpg', out).pathname));
await Promise.all(jobs);
console.log(`Wrote ${jobs.length} placeholder images to src/assets/uploads/`);
