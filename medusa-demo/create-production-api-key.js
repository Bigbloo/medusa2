#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🔑 Creating production API key...');

try {
  // Exécuter la commande pour créer une clé API
  const result = execSync('npx medusa user -e admin@medusa-test.com -p supersecret', {
    encoding: 'utf8',
    env: {
      ...process.env,
      NODE_ENV: 'production'
    }
  });
  
  console.log('👤 Admin user result:', result);

  // Créer une clé API publishable
  const apiKeyResult = execSync('npx medusa exec ./scripts/create-publishable-key.js', {
    encoding: 'utf8',
    env: {
      ...process.env,
      NODE_ENV: 'production'
    }
  });
  
  console.log('🔑 API Key result:', apiKeyResult);

} catch (error) {
  console.error('❌ Error:', error.message);
  
  // Fallback: créer directement via l'API
  console.log('🔄 Trying direct API approach...');
  
  try {
    const directResult = execSync('node -e "' +
      'const { MedusaApp } = require(\"@medusajs/medusa\"); ' +
      'const { configLoader } = require(\"@medusajs/medusa/dist/loaders/config\"); ' +
      'async function createKey() { ' +
      '  const config = configLoader(process.cwd()); ' +
      '  const { container } = await MedusaApp({ configModule: config }); ' +
      '  const publishableApiKeyService = container.resolve(\"publishableApiKeyService\"); ' +
      '  const key = await publishableApiKeyService.create({ title: \"Production Store Key\" }); ' +
      '  console.log(\"🔑 Created key:\", key.id); ' +
      '  process.exit(0); ' +
      '} ' +
      'createKey().catch(console.error);' +
    '"', {
      encoding: 'utf8',
      env: {
        ...process.env,
        NODE_ENV: 'production'
      }
    });
    
    console.log('✅ Direct API result:', directResult);
    
  } catch (directError) {
    console.error('❌ Direct API error:', directError.message);
  }
}
