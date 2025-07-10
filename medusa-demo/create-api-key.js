const { MedusaApp } = require("@medusajs/framework");

module.exports = async function createPublishableKey() {
  const app = await MedusaApp({
    workerMode: "shared"
  });
  
  const apiKeyModule = app.modules.apiKey;
  
  try {
    // Créer ou récupérer le canal de vente par défaut
    const salesChannelModule = app.modules.salesChannel;
    let channels = await salesChannelModule.listSalesChannels();
    
    let defaultChannel;
    if (channels.length === 0) {
      defaultChannel = await salesChannelModule.createSalesChannels({
        name: "Default Sales Channel",
        description: "Default channel for storefront"
      });
      console.log("Default sales channel created:", defaultChannel.id);
    } else {
      defaultChannel = channels[0];
      console.log("Using existing sales channel:", defaultChannel.id);
    }
    
    // Créer une clé API publique
    const publishableKey = await apiKeyModule.createApiKeys({
      title: "Storefront Key",
      type: "publishable",
      created_by: "system"
    });
    
    console.log("Publishable API Key created:", publishableKey.token);
    
    // Associer la clé API au canal de vente
    await apiKeyModule.updateApiKeys(publishableKey.id, {
      sales_channels: [{ id: defaultChannel.id }]
    });
    
    console.log("API Key associated with sales channel");
    
  } catch (error) {
    console.error("Error:", error.message);
  }
};
