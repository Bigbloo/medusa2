#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Medusa in production mode...');

// Force build admin and backend
console.log('📦 Building backend and admin...');
try {
  execSync('node force-admin-build.js', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=2048' }
  });
  console.log('✅ Build completed successfully');
} catch (error) {
  console.log('⚠️ Build failed, starting server anyway');
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
