const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');
const routes = ['dashboard', 'login', 'signup', 'ai', 'profile', 'chat', 'map', 'admin'];

if (!fs.existsSync(indexPath)) {
  throw new Error('dist/index.html was not found. Run vite build first.');
}

for (const route of routes) {
  const routeDir = path.join(distDir, route);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.copyFileSync(indexPath, path.join(routeDir, 'index.html'));
}

console.log(`Created SPA fallback pages for: ${routes.map((route) => `/${route}`).join(', ')}`);
