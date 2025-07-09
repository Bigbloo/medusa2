const { MedusaApp } = require("@medusajs/framework");

module.exports = async function createPublishableKey() {
  const app = await MedusaApp({
    workerMode: "shared"
  });
  
  const apiKeyModule = app.modules.apiKey;
  
  try {
    // Créer une clé API publique
    const publishableKey = await apiKeyModule.createApiKeys({
      title: "Storefront Key",
      type: "publishable",
      created_by: "system"
    });
    
    console.log("Publishable API Key created:", publishableKey.token);
    
    // Créer aussi un canal de vente par défaut si nécessaire
    const salesChannelModule = app.modules.salesChannel;
    const channels = await salesChannelModule.listSalesChannels();
    
    if (channels.length === 0) {
      const defaultChannel = await salesChannelModule.createSalesChannels({
        name: "Default Sales Channel",
        description: "Default channel for storefront"
      });
      console.log("Default sales channel created:", defaultChannel.id);
    }
    
  } catch (error) {
    console.error("Error:", error.message);
  }
};
