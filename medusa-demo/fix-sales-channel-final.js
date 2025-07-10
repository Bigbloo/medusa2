#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🔧 Final fix for sales channel association...');

try {
  // Créer un script temporaire qui utilise les modules corrects
  const scriptContent = `
export default async function ({ container }) {
  try {
    console.log("Starting sales channel fix...");
    
    // Utiliser le module sales channel
    const salesChannelModule = container.resolve("salesChannelModuleService");
    const apiKeyModule = container.resolve("apiKeyModuleService");
    
    // Lister les canaux de vente existants
    const salesChannels = await salesChannelModule.listSalesChannels();
    console.log("Found sales channels:", salesChannels.length);
    
    let salesChannel;
    if (salesChannels.length === 0) {
      // Créer un canal de vente
      salesChannel = await salesChannelModule.createSalesChannels({
        name: "Default Sales Channel",
        description: "Default channel for storefront"
      });
      console.log("Created sales channel:", salesChannel.id);
    } else {
      salesChannel = salesChannels[0];
      console.log("Using existing sales channel:", salesChannel.id);
    }
    
    // Lister les clés API
    const apiKeys = await apiKeyModule.listApiKeys({ type: "publishable" });
    console.log("Found API keys:", apiKeys.length);
    
    if (apiKeys.length > 0) {
      const apiKey = apiKeys[0];
      console.log("Working with API key:", apiKey.token);
      
      // Mettre à jour la clé API avec le canal de vente
      await apiKeyModule.updateApiKeys(apiKey.id, {
        sales_channels: [{ id: salesChannel.id }]
      });
      
      console.log("✅ API key successfully associated with sales channel");
    } else {
      console.log("❌ No API keys found");
    }
    
  } catch (error) {
    console.error("❌ Error in script:", error.message);
    console.error("Stack:", error.stack);
    throw error;
  }
};
  `;
  
  // Écrire le script temporaire
  require('fs').writeFileSync('./temp-fix.js', scriptContent);
  
  // Exécuter le script
  console.log('📦 Executing fix script...');
  execSync('npx medusa exec ./temp-fix.js', { stdio: 'inherit' });
  
  // Supprimer le script temporaire
  require('fs').unlinkSync('./temp-fix.js');
  
  console.log('✅ Sales channel fix completed successfully');

} catch (error) {
  console.error('❌ Failed to fix sales channel:', error.message);
  
  // Nettoyer le fichier temporaire en cas d'erreur
  try {
    require('fs').unlinkSync('./temp-fix.js');
  } catch (e) {}
  
  process.exit(1);
}
