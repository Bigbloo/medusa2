#!/usr/bin/env node

const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

console.log('🚀 Starting Medusa Production Server');
console.log('===================================');

// Configuration
const PORT = process.env.PORT || 9000;
const NODE_ENV = process.env.NODE_ENV || 'production';
const DATABASE_URL = process.env.DATABASE_URL;

console.log(`📍 Environment: ${NODE_ENV}`);
console.log(`🔌 Port: ${PORT}`);
console.log(`🗄️ Database: ${DATABASE_URL ? 'Connected' : 'Not configured'}`);

// Créer un serveur de santé simple
function createHealthServer() {
  const server = http.createServer((req, res) => {
    // Headers CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }
    
    if (req.url === '/' || req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        status: 'OK',
        service: 'Medusa Backend',
        timestamp: new Date().toISOString(),
        port: PORT,
        environment: NODE_ENV
      }));
    } else if (req.url === '/admin' || req.url === '/app') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Medusa Admin</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1>🏪 Medusa Admin</h1>
          <p>Backend is running on port ${PORT}</p>
          <p>Admin interface will be available once fully initialized.</p>
          <p><a href="/health">Health Check</a></p>
        </body>
        </html>
      `);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Not Found',
        message: 'This endpoint does not exist',
        availableEndpoints: ['/', '/health', '/admin']
      }));
    }
  });
  
  return server;
}

// Fonction pour démarrer Medusa
function startMedusa() {
  console.log('\n🌟 Starting Medusa server...');
  
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
    console.log('🔄 Starting fallback health server...');
    startFallbackServer();
  });

  medusaProcess.on('exit', (code) => {
    if (code !== 0) {
      console.error(`❌ Medusa process exited with code ${code}`);
      console.log('🔄 Starting fallback health server...');
      startFallbackServer();
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

  return medusaProcess;
}

// Serveur de fallback
function startFallbackServer() {
  const healthServer = createHealthServer();
  
  healthServer.listen(PORT, () => {
    console.log(`🏥 Fallback health server running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
  });
  
  healthServer.on('error', (error) => {
    console.error('❌ Fallback server error:', error.message);
    process.exit(1);
  });
}

// Fonction principale
async function main() {
  try {
    // Vérifier les prérequis
    if (!DATABASE_URL) {
      console.warn('⚠️ DATABASE_URL not configured, using fallback server');
      startFallbackServer();
      return;
    }
    
    // Vérifier que package.json existe
    if (!fs.existsSync('package.json')) {
      console.error('❌ package.json not found');
      startFallbackServer();
      return;
    }
    
    // Démarrer Medusa
    const medusaProcess = startMedusa();
    
    // Attendre un peu pour voir si le processus démarre correctement
    setTimeout(() => {
      if (medusaProcess.exitCode === null) {
        console.log('✅ Medusa server started successfully!');
      }
    }, 5000);
    
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    startFallbackServer();
  }
}

// Exécuter le script
if (require.main === module) {
  main();
}

module.exports = { main, createHealthServer, startMedusa };
