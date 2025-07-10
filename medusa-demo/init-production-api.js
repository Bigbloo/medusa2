#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🚀 Initializing production API...');

const BACKEND_URL = 'https://medusa2-0tjn.onrender.com';

try {
  // Créer un utilisateur admin
  console.log('👤 Creating admin user...');
  
  const createUserResponse = execSync(`curl -s -X POST ${BACKEND_URL}/auth/user/emailpass/register \\
    -H "Content-Type: application/json" \\
    -d '{"email": "admin@example.com", "password": "password123"}'`, 
    { encoding: 'utf8' }
  );
  
  console.log('Create user response:', createUserResponse);
  
  // Se connecter
  console.log('🔑 Logging in...');
  
  const loginResponse = execSync(`curl -s -X POST ${BACKEND_URL}/auth/user/emailpass \\
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
  
  const salesChannelResponse = execSync(`curl -s -X POST ${BACKEND_URL}/admin/sales-channels \\
    -H "Content-Type: application/json" \\
    -H "Authorization: Bearer ${authToken}" \\
    -d '{"name": "Production Sales Channel", "description": "Main channel for production storefront"}'`, 
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
  
  const apiKeyResponse = execSync(`curl -s -X POST ${BACKEND_URL}/admin/api-keys \\
    -H "Content-Type: application/json" \\
    -H "Authorization: Bearer ${authToken}" \\
    -d '{"title": "Production Storefront API Key", "type": "publishable"}'`, 
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
  
  const associationResponse = execSync(`curl -s -X POST ${BACKEND_URL}/admin/api-keys/${apiKeyId}/sales-channels \\
    -H "Content-Type: application/json" \\
    -H "Authorization: Bearer ${authToken}" \\
    -d '{"add": ["${salesChannelId}"]}'`, 
    { encoding: 'utf8' }
  );
  
  console.log('Association response:', associationResponse);
  console.log('✅ API key associated with sales channel');
  
  // Créer une région
  console.log('🌍 Creating region...');
  
  const regionResponse = execSync(`curl -s -X POST ${BACKEND_URL}/admin/regions \\
    -H "Content-Type: application/json" \\
    -H "Authorization: Bearer ${authToken}" \\
    -d '{"name": "France", "currency_code": "EUR", "countries": ["FR"]}'`, 
    { encoding: 'utf8' }
  );
  
  console.log('Region response:', regionResponse);
  console.log('✅ Region created');
  
  console.log('\n🎉 Production setup completed successfully!');
  console.log('📋 Summary:');
  console.log(`   Backend URL: ${BACKEND_URL}`);
  console.log(`   Sales Channel ID: ${salesChannelId}`);
  console.log(`   API Key: ${apiKey}`);
  console.log(`   Admin Email: admin@example.com`);
  console.log(`   Admin Password: password123`);
  
  console.log('\n💡 Next steps:');
  console.log('1. Update storefront environment variables with this API key');
  console.log('2. Deploy the storefront');
  console.log('3. Test the complete setup');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.log('\n🔍 This might be normal if the admin user already exists.');
  console.log('Try accessing the admin directly at:', BACKEND_URL + '/app');
  process.exit(1);
}
