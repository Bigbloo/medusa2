#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Medusa in production mode with admin interface...');

// Check if admin build exists
const adminBuildPath = path.join(__dirname, '.medusa', 'admin');
if (!fs.existsSync(adminBuildPath)) {
  console.log('📦 Admin build not found, building complete project...');
  try {
    // Build everything including admin with increased memory
    execSync('NODE_OPTIONS="--max-old-space-size=2048" npx medusa build', { 
      stdio: 'inherit',
      env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=2048' }
    });
    console.log('✅ Complete build completed successfully');
  } catch (error) {
    console.log('⚠️ Build failed, trying without admin...');
    try {
      execSync('npx medusa build --no-admin', { stdio: 'inherit' });
      console.log('✅ Backend build completed (no admin)');
    } catch (error2) {
      console.log('⚠️ All builds failed, starting server anyway');
    }
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
