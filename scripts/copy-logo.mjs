import { mkdirSync, copyFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const src = resolve(process.cwd(), 'Introduction to AI/ppt/media/image8.png');
const dest = resolve(process.cwd(), 'public/brand/logo.png');

try {
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(src, dest);
  console.log('Copied logo to public/brand/logo.png');
} catch (e) {
  console.warn('Logo copy skipped or failed:', e?.message || e);
}

