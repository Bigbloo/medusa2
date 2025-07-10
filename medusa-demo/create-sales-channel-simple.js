#!/usr/bin/env node

const https = require('https');

console.log('🛍️ Creating sales channel via API...');

// Fonction pour faire une requête POST
function makeRequest(path, data, headers = {}) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: 'localhost',
      port: 9000,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        ...headers
      }
    };

    const req = require('http').request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: JSON.parse(responseData)
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function createSalesChannel() {
  try {
    // Créer un canal de vente
    const response = await makeRequest('/admin/sales-channels', {
      name: 'Default Sales Channel',
      description: 'Default channel for storefront'
    });
    
    console.log('Sales channel response:', response);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

createSalesChannel();
