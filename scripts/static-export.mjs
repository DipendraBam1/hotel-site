import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

// Reads the Vite manifest and writes dist/index.html, the static equivalent of welcome.blade.php
const manifestPath = ['public/build/manifest.json', 'public/build/.vite/manifest.json'].find(existsSync);
if (!manifestPath) throw new Error('Vite manifest not found. Run "npm run build" first.');

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const entries = Object.values(manifest).filter((e) => e.isEntry);
const script = entries.find((e) => e.file.endsWith('.js'));
if (!script) throw new Error('No JavaScript entry found in the manifest.');

const styles = new Set();
for (const e of entries) {
  if (e.file.endsWith('.css')) styles.add(e.file);
  (e.css ?? []).forEach((f) => styles.add(f));
}

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });
cpSync('public/build', 'dist/build', { recursive: true });
if (existsSync('public/images')) cpSync('public/images', 'dist/images', { recursive: true });

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>Alder House</title>
${[...styles].map((f) => `  <link rel="stylesheet" href="/build/${f}">`).join('\n')}
  <script type="module" src="/build/${script.file}"></script>
</head>
<body>
  <noscript>This site needs JavaScript to run. Please enable it to view Alder House.</noscript>
  <div id="app"></div>
</body>
</html>
`;

writeFileSync('dist/index.html', html);
console.log('Static export written to dist/');