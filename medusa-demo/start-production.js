#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Medusa in production mode...');

// Check if backend build exists
const backendBuildPath = path.join(__dirname, '.medusa', 'server');
if (!fs.existsSync(backendBuildPath)) {
  console.log('📦 Backend build not found, building backend only...');
  try {
    // Build backend only (admin is disabled in config)
    execSync('NODE_OPTIONS="--max-old-space-size=1024" npx medusa build', { 
      stdio: 'inherit',
      env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=1024' }
    });
    console.log('✅ Backend build completed successfully');
  } catch (error) {
    console.log('⚠️ Build failed, starting server anyway');
  }
}

// Start the server
console.log('🌟 Starting Medusa server...');
try {
  execSync('npx medusa start', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=1024' }
  });
} catch (error) {
  console.error('❌ Failed to start server:', error.message);
  process.exit(1);
}
