export default async function ({ container }) {
  const salesChannelModule = container.resolve("salesChannelModuleService");
  const apiKeyModule = container.resolve("apiKeyModuleService");
  
  try {
    console.log("Creating default sales channel...");
    
    // Vérifier si un canal de vente existe déjà
    const existingChannels = await salesChannelModule.listSalesChannels();
    
    let salesChannel;
    if (existingChannels.length === 0) {
      // Créer un canal de vente par défaut
      salesChannel = await salesChannelModule.createSalesChannels({
        name: "Default Sales Channel",
        description: "Default channel for storefront"
      });
      console.log("Sales channel created:", salesChannel.id);
    } else {
      salesChannel = existingChannels[0];
      console.log("Using existing sales channel:", salesChannel.id);
    }
    
    // Récupérer toutes les clés API publishable
    const apiKeys = await apiKeyModule.listApiKeys({ type: "publishable" });
    
    if (apiKeys.length > 0) {
      // Associer la première clé API au canal de vente
      const apiKey = apiKeys[0];
      await apiKeyModule.updateApiKeys(apiKey.id, {
        sales_channels: [{ id: salesChannel.id }]
      });
      
      console.log("API key associated with sales channel:", apiKey.token);
    }
    
    console.log("Setup completed successfully!");
    
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};
