#!/usr/bin/env node

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

console.log('🔧 Direct database fix for sales channel association...');

// Chemin vers la base de données SQLite
const dbPath = path.join(__dirname, 'medusa.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error opening database:', err.message);
    process.exit(1);
  }
  console.log('📦 Connected to SQLite database');
});

async function fixSalesChannelAssociation() {
  return new Promise((resolve, reject) => {
    // D'abord, vérifier les tables existantes
    db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
      if (err) {
        reject(err);
        return;
      }
      
      console.log('📋 Available tables:');
      tables.forEach(table => console.log(`- ${table.name}`));
      
      // Chercher les tables liées aux API keys et sales channels
      const apiKeyTables = tables.filter(t => t.name.toLowerCase().includes('api_key'));
      const salesChannelTables = tables.filter(t => t.name.toLowerCase().includes('sales_channel'));
      
      console.log('\n🔑 API Key tables:', apiKeyTables.map(t => t.name));
      console.log('🛍️ Sales Channel tables:', salesChannelTables.map(t => t.name));
      
      if (apiKeyTables.length > 0 && salesChannelTables.length > 0) {
        // Vérifier le contenu des tables
        const apiKeyTable = apiKeyTables[0].name;
        const salesChannelTable = salesChannelTables[0].name;
        
        db.all(`SELECT * FROM ${apiKeyTable} LIMIT 5`, (err, apiKeys) => {
          if (err) {
            reject(err);
            return;
          }
          
          console.log(`\n📊 API Keys in ${apiKeyTable}:`, apiKeys);
          
          db.all(`SELECT * FROM ${salesChannelTable} LIMIT 5`, (err, salesChannels) => {
            if (err) {
              reject(err);
              return;
            }
            
            console.log(`📊 Sales Channels in ${salesChannelTable}:`, salesChannels);
            
            resolve({ apiKeys, salesChannels, apiKeyTable, salesChannelTable });
          });
        });
      } else {
        console.log('❌ Could not find API key or sales channel tables');
        resolve(null);
      }
    });
  });
}

fixSalesChannelAssociation()
  .then((result) => {
    if (result) {
      console.log('✅ Database inspection completed');
    }
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('📦 Database connection closed');
      }
    });
  })
  .catch((error) => {
    console.error('❌ Error:', error.message);
    db.close();
    process.exit(1);
  });
