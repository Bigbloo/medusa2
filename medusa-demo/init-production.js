#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🚀 Initializing Medusa production database...');

try {
  // Run migrations
  console.log('📦 Running database migrations...');
  execSync('npx medusa db:migrate', { 
    stdio: 'inherit',
    env: { ...process.env }
  });
  console.log('✅ Migrations completed');

  // Create admin user (skip if exists)
  console.log('👤 Creating admin user...');
  try {
    execSync('npx medusa user --email admin@example.com --password password123', { 
      stdio: 'pipe',
      env: { ...process.env }
    });
    console.log('✅ Admin user created');
  } catch (error) {
    if (error.stderr && error.stderr.toString().includes('already exists')) {
      console.log('✅ Admin user already exists');
    } else if (error.message.includes('already exists')) {
      console.log('✅ Admin user already exists');
    } else {
      console.log('⚠️ Admin user creation failed, continuing...');
    }
  }

  // Setup basic data using our scripts
  console.log('🌱 Setting up basic data...');
  try {
    execSync('node setup-region.js', { 
      stdio: 'inherit',
      env: { ...process.env }
    });
    console.log('✅ Region setup completed');
  } catch (error) {
    console.log('⚠️ Region setup failed, continuing...');
  }

  try {
    execSync('node create-api-key.js', { 
      stdio: 'inherit',
      env: { ...process.env }
    });
    console.log('✅ API key created');
  } catch (error) {
    console.log('⚠️ API key creation failed, continuing...');
  }

  console.log('🎉 Production database initialized successfully!');
  console.log('📧 Admin email: admin@example.com');
  console.log('🔑 Admin password: password123');

} catch (error) {
  console.error('❌ Failed to initialize database:', error.message);
  process.exit(1);
}
