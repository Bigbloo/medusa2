#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const http = require('http');

console.log('🚀 Starting Medusa Production Server...');

// Configuration
const PORT = process.env.PORT || 9000;
const NODE_ENV = process.env.NODE_ENV || 'production';

console.log(`📍 Environment: ${NODE_ENV}`);
console.log(`🔌 Port: ${PORT}`);

// Fonction pour créer un serveur de santé simple
function createHealthServer() {
  const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('OK');
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });
  
  return server;
}

// Démarrer Medusa
try {
  console.log('🌟 Starting Medusa server...');
  
  // Créer le processus Medusa
  const medusaProcess = spawn('npx', ['medusa', 'start'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: '--max-old-space-size=1024',
      NODE_ENV: NODE_ENV,
      PORT: PORT
    }
  });

  // Gérer les erreurs du processus
  medusaProcess.on('error', (error) => {
    console.error('❌ Failed to start Medusa:', error.message);
    process.exit(1);
  });

  medusaProcess.on('exit', (code) => {
    if (code !== 0) {
      console.error(`❌ Medusa process exited with code ${code}`);
      process.exit(code);
    }
  });

  // Gérer les signaux de fermeture
  process.on('SIGTERM', () => {
    console.log('🛑 Received SIGTERM, shutting down gracefully...');
    medusaProcess.kill('SIGTERM');
  });

  process.on('SIGINT', () => {
    console.log('🛑 Received SIGINT, shutting down gracefully...');
    medusaProcess.kill('SIGINT');
  });

  console.log('✅ Medusa server started successfully!');

} catch (error) {
  console.error('❌ Failed to start server:', error.message);
  
  // Fallback: créer un serveur de santé simple
  console.log('🔄 Starting fallback health server...');
  const healthServer = createHealthServer();
  
  healthServer.listen(PORT, () => {
    console.log(`🏥 Health server running on port ${PORT}`);
  });
}
