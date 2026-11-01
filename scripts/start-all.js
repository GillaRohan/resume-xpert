const { spawn } = require('child_process');
const path = require('path');

console.log('='.repeat(70));
console.log('  🚀 Launching Resume Xpert (Full-Stack AWS Generative AI Platform)');
console.log('='.repeat(70));

const rootDir = path.resolve(__dirname, '..');

// 1. Launch FastAPI Python Backend
console.log('\n[Backend] Starting FastAPI Server on http://127.0.0.1:8000 ...');
const backend = spawn('python', ['backend/run.py'], {
  cwd: rootDir,
  shell: true,
  stdio: 'inherit'
});

// 2. Launch Vite Frontend
console.log('\n[Frontend] Starting Vite Dev Server on http://localhost:3000 ...');
const frontend = spawn('npx', ['vite', '--port', '3000'], {
  cwd: rootDir,
  shell: true,
  stdio: 'inherit'
});

const cleanup = () => {
  console.log('\nShutting down full-stack servers...');
  backend.kill();
  frontend.kill();
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

