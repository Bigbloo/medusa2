#!/usr/bin/env node

const express = require('express');
const cors = require('cors');

console.log('🚀 Starting Simple Medusa Server...');

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes de base
app.get('/', (req, res) => {
  res.json({ 
    message: 'Medusa Backend is running!',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Essayer de démarrer Medusa
try {
  const { createMedusaApp } = require('@medusajs/medusa');
  
  createMedusaApp().then((medusaApp) => {
    app.use('/', medusaApp);
    
    app.listen(PORT, () => {
      console.log(`✅ Medusa server running on port ${PORT}`);
    });
  }).catch((error) => {
    console.error('❌ Failed to create Medusa app:', error.message);
    
    // Fallback: serveur simple
    app.listen(PORT, () => {
      console.log(`🏥 Fallback server running on port ${PORT}`);
    });
  });
  
} catch (error) {
  console.error('❌ Error loading Medusa:', error.message);
  
  // Fallback: serveur simple
  app.listen(PORT, () => {
    console.log(`🏥 Simple server running on port ${PORT}`);
  });
}
