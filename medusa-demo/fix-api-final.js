#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🔧 Final API fix using REST endpoints...');

try {
  // D'abord, créons un token d'authentification admin
  console.log('🔑 Creating admin session...');
  
  const loginResponse = execSync(`curl -s -X POST http://localhost:9000/auth/user/emailpass \\
    -H "Content-Type: application/json" \\
    -d '{"email": "admin@example.com", "password": "password123"}'`, 
    { encoding: 'utf8' }
  );
  
  console.log('Login response:', loginResponse);
  
  const loginData = JSON.parse(loginResponse);
  if (!loginData.token) {
    throw new Error('Failed to get authentication token');
  }
  
  const authToken = loginData.token;
  console.log('✅ Authentication successful');
  
  // Créer un canal de vente
  console.log('📦 Creating sales channel...');
  
  const salesChannelResponse = execSync(`curl -s -X POST http://localhost:9000/admin/sales-channels \\
    -H "Content-Type: application/json" \\
    -H "Authorization: Bearer ${authToken}" \\
    -d '{"name": "Default Sales Channel", "description": "Default channel for storefront"}'`, 
    { encoding: 'utf8' }
  );
  
  console.log('Sales channel response:', salesChannelResponse);
  
  const salesChannelData = JSON.parse(salesChannelResponse);
  const salesChannelId = salesChannelData.sales_channel?.id;
  
  if (!salesChannelId) {
    throw new Error('Failed to create sales channel');
  }
  
  console.log('✅ Sales channel created:', salesChannelId);
  
  // Créer une clé API publishable
  console.log('🔑 Creating publishable API key...');
  
  const apiKeyResponse = execSync(`curl -s -X POST http://localhost:9000/admin/api-keys \\
    -H "Content-Type: application/json" \\
    -H "Authorization: Bearer ${authToken}" \\
    -d '{"title": "Storefront API Key", "type": "publishable"}'`, 
    { encoding: 'utf8' }
  );
  
  console.log('API key response:', apiKeyResponse);
  
  const apiKeyData = JSON.parse(apiKeyResponse);
  const apiKey = apiKeyData.api_key?.token;
  const apiKeyId = apiKeyData.api_key?.id;
  
  if (!apiKey || !apiKeyId) {
    throw new Error('Failed to create API key');
  }
  
  console.log('✅ API key created:', apiKey);
  
  // Associer la clé API au canal de vente
  console.log('🔗 Associating API key with sales channel...');
  
  const associationResponse = execSync(`curl -s -X POST http://localhost:9000/admin/api-keys/${apiKeyId}/sales-channels \\
    -H "Content-Type: application/json" \\
    -H "Authorization: Bearer ${authToken}" \\
    -d '{"add": ["${salesChannelId}"]}'`, 
    { encoding: 'utf8' }
  );
  
  console.log('Association response:', associationResponse);
  console.log('✅ API key associated with sales channel');
  
  // Mettre à jour le fichier .env.local du storefront
  console.log('📝 Updating storefront environment...');
  
  const envContent = `NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${apiKey}
NEXT_PUBLIC_BASE_URL=http://localhost:8000
NEXT_PUBLIC_DEFAULT_REGION=fr
`;
  
  require('fs').writeFileSync('../medusa-demo-storefront/.env.local', envContent);
  
  console.log('✅ Environment file updated');
  
  console.log('\n🎉 Setup completed successfully!');
  console.log('📋 Summary:');
  console.log(`   Sales Channel ID: ${salesChannelId}`);
  console.log(`   API Key: ${apiKey}`);
  console.log('\n💡 The storefront should now work correctly!');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
