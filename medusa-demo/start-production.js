#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Medusa in production mode with admin interface...');

// Check if admin build exists
const adminBuildPath = path.join(__dirname, '.medusa', 'admin');
if (!fs.existsSync(adminBuildPath)) {
  console.log('📦 Admin build not found, building admin with increased memory...');
  try {
    // Increase Node.js memory limit for admin build
    execSync('NODE_OPTIONS="--max-old-space-size=2048" npx medusa build --admin-only', { 
      stdio: 'inherit',
      env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=2048' }
    });
    console.log('✅ Admin build completed successfully');
  } catch (error) {
    console.log('⚠️ Admin build failed, trying regular build...');
    try {
      execSync('npx medusa build', { stdio: 'inherit' });
      console.log('✅ Regular build completed');
    } catch (error2) {
      console.log('⚠️ All builds failed, starting server without admin');
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
