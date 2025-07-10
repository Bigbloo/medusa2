#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Force building admin for production...');

try {
  // Supprimer les anciens builds
  const adminBuildPath = path.join(__dirname, '.medusa', 'admin');
  if (fs.existsSync(adminBuildPath)) {
    console.log('🗑️ Removing old admin build...');
    fs.rmSync(adminBuildPath, { recursive: true, force: true });
  }

  // Construire l'admin uniquement
  console.log('🏗️ Building admin only...');
  execSync('NODE_OPTIONS="--max-old-space-size=2048" npx medusa build --admin-only', { 
    stdio: 'inherit',
    env: { 
      ...process.env, 
      NODE_OPTIONS: '--max-old-space-size=2048',
      NODE_ENV: 'production'
    }
  });

  console.log('✅ Admin build completed successfully!');
  
  // Vérifier que les fichiers admin existent
  const adminFiles = path.join(__dirname, '.medusa', 'admin');
  if (fs.existsSync(adminFiles)) {
    console.log('✅ Admin files found at:', adminFiles);
    const files = fs.readdirSync(adminFiles);
    console.log('📁 Admin files:', files.slice(0, 5).join(', '), files.length > 5 ? '...' : '');
  } else {
    console.log('❌ Admin files not found');
  }

} catch (error) {
  console.error('❌ Admin build failed:', error.message);
  
  // Essayer une approche alternative
  console.log('🔄 Trying alternative build approach...');
  try {
    execSync('NODE_OPTIONS="--max-old-space-size=2048" npx medusa build', { 
      stdio: 'inherit',
      env: { 
        ...process.env, 
        NODE_OPTIONS: '--max-old-space-size=2048',
        NODE_ENV: 'production'
      }
    });
    console.log('✅ Full build completed successfully!');
  } catch (altError) {
    console.error('❌ Alternative build also failed:', altError.message);
    process.exit(1);
  }
}

console.log('🚀 Ready to start server with admin!');
