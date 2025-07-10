#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🚀 Starting Medusa in production mode...');

// Start the server directly - let Medusa handle the build
console.log('🌟 Starting Medusa server...');
try {
  execSync('npx medusa start', { 
    stdio: 'inherit',
    env: { 
      ...process.env, 
      NODE_OPTIONS: '--max-old-space-size=1024',
      NODE_ENV: 'production'
    }
  });
} catch (error) {
  console.error('❌ Failed to start server:', error.message);
  process.exit(1);
}
