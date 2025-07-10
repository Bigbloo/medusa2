#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🚀 Initializing Medusa Production Database...');

async function initProduction() {
  try {
    console.log('📊 Running database migrations...');
    execSync('npx medusa migrations run', {
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_ENV: 'production'
      }
    });

    console.log('🌱 Seeding database...');
    execSync('npx medusa seed -f ./data/seed.json', {
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_ENV: 'production'
      }
    });

    console.log('👤 Creating admin user...');
    execSync('npx medusa user -e admin@medusa-test.com -p supersecret', {
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_ENV: 'production'
      }
    });

    console.log('🔑 Creating publishable API key...');
    
    // Utiliser le script existant
    const { MedusaApp } = require('@medusajs/medusa');
    const { configLoader } = require('@medusajs/medusa/dist/loaders/config');
    
    const config = configLoader(process.cwd());
    const { container } = await MedusaApp({ configModule: config });
    
    const publishableApiKeyService = container.resolve('publishableApiKeyService');
    const salesChannelService = container.resolve('salesChannelService');
    
    // Créer la clé API
    const key = await publishableApiKeyService.create({
      title: 'Production Store Key'
    });
    
    console.log('🔑 Created publishable key:', key.id);
    
    // Associer à un sales channel
    const salesChannels = await salesChannelService.list();
    if (salesChannels.length > 0) {
      await publishableApiKeyService.addSalesChannels(key.id, [salesChannels[0].id]);
      console.log('🔗 Associated with sales channel:', salesChannels[0].name);
    }
    
    console.log('✅ Production initialization complete!');
    console.log('🔑 Your publishable key:', key.id);
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Initialization failed:', error.message);
    process.exit(1);
  }
}

initProduction();
