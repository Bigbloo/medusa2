const { MedusaApp } = require("@medusajs/framework");

module.exports = async function setupRegion() {
  const app = await MedusaApp({
    workerMode: "shared"
  });
  
  try {
    // Vérifier si des régions existent déjà
    const existingRegions = await app.modules.region.listRegions();
    
    if (existingRegions.length > 0) {
      console.log("Regions already exist:", existingRegions.map(r => r.name));
      return;
    }
    
    // Créer une région par défaut
    const region = await app.modules.region.createRegions({
      name: "Europe",
      currency_code: "eur",
      countries: ["fr", "de", "es", "it", "be", "nl"]
    });
    
    console.log("Region created:", region.name);
    
    // Créer un canal de vente par défaut si nécessaire
    const salesChannels = await app.modules.salesChannel.listSalesChannels();
    
    if (salesChannels.length === 0) {
      const defaultChannel = await app.modules.salesChannel.createSalesChannels({
        name: "Default Sales Channel",
        description: "Default channel for storefront"
      });
      console.log("Default sales channel created:", defaultChannel.name);
    }
    
  } catch (error) {
    console.error("Error:", error.message);
  }
};
