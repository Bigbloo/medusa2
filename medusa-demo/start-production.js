#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Medusa in production mode...');

// Check if admin build exists
const adminBuildPath = path.join(__dirname, '.medusa', 'admin');
if (!fs.existsSync(adminBuildPath)) {
  console.log('📦 Admin build not found, building admin...');
  try {
    execSync('npx medusa build --admin-only', { stdio: 'inherit' });
    console.log('✅ Admin build completed');
  } catch (error) {
    console.log('⚠️ Admin build failed, starting without admin interface');
  }
}

// Start the server
console.log('🌟 Starting Medusa server...');
try {
  execSync('npx medusa start', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Failed to start server:', error.message);
  process.exit(1);
}
