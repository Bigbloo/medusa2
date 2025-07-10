#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🛍️ Setting up sales channel and API key association...');

try {
  // Créer un script temporaire pour l'exécution
  const scriptContent = `
export default async function ({ container }) {
  const query = container.resolve("query");
  
  try {
    console.log("Creating sales channel...");
    
    // Créer un canal de vente
    const { data: salesChannels } = await query.graph({
      entity: "sales_channel",
      fields: ["id", "name"],
      filters: {}
    });
    
    let salesChannel;
    if (salesChannels.length === 0) {
      const { data: newChannel } = await query.graph({
        entity: "sales_channel",
        fields: ["id", "name"],
        data: {
          name: "Default Sales Channel",
          description: "Default channel for storefront"
        }
      }, { method: "POST" });
      
      salesChannel = newChannel[0];
      console.log("Sales channel created:", salesChannel.id);
    } else {
      salesChannel = salesChannels[0];
      console.log("Using existing sales channel:", salesChannel.id);
    }
    
    // Récupérer les clés API
    const { data: apiKeys } = await query.graph({
      entity: "api_key",
      fields: ["id", "token", "type"],
      filters: { type: "publishable" }
    });
    
    if (apiKeys.length > 0) {
      const apiKey = apiKeys[0];
      console.log("Found API key:", apiKey.token);
      
      // Associer la clé API au canal de vente
      await query.graph({
        entity: "api_key",
        fields: ["id"],
        data: {
          sales_channels: [{ id: salesChannel.id }]
        }
      }, { 
        method: "POST",
        filters: { id: apiKey.id }
      });
      
      console.log("API key associated with sales channel");
    }
    
    console.log("Setup completed successfully!");
    
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};
  `;
  
  // Écrire le script temporaire
  require('fs').writeFileSync('./temp-setup.js', scriptContent);
  
  // Exécuter le script
  execSync('npx medusa exec ./temp-setup.js', { stdio: 'inherit' });
  
  // Supprimer le script temporaire
  require('fs').unlinkSync('./temp-setup.js');
  
  console.log('✅ Sales channel setup completed');

} catch (error) {
  console.error('❌ Failed to setup sales channel:', error.message);
  
  // Nettoyer le fichier temporaire en cas d'erreur
  try {
    require('fs').unlinkSync('./temp-setup.js');
  } catch (e) {}
  
  process.exit(1);
}
