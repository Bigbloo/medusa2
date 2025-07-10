#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🔧 Fixing API key sales channel association...');

try {
  // D'abord, créons un canal de vente par défaut
  console.log('📦 Creating default sales channel...');
  execSync('npx medusa exec ./scripts/create-sales-channel.js', { 
    stdio: 'inherit',
    env: { ...process.env }
  });
  
  console.log('✅ Sales channel setup completed');

} catch (error) {
  console.error('❌ Failed to fix API key:', error.message);
  process.exit(1);
}
