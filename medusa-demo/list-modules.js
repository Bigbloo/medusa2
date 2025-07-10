export default async function ({ container }) {
  try {
    console.log("Available modules in container:");
    
    // Lister tous les modules disponibles
    const registrations = container.registrations;
    const moduleNames = Object.keys(registrations).filter(name => 
      name.includes('Module') || name.includes('Service')
    ).sort();
    
    console.log("Found modules/services:");
    moduleNames.forEach(name => {
      console.log(`- ${name}`);
    });
    
    // Essayer de trouver les modules sales channel et api key
    const salesChannelModules = moduleNames.filter(name => 
      name.toLowerCase().includes('saleschannel') || name.toLowerCase().includes('sales_channel')
    );
    
    const apiKeyModules = moduleNames.filter(name => 
      name.toLowerCase().includes('apikey') || name.toLowerCase().includes('api_key')
    );
    
    console.log("\nSales Channel modules:", salesChannelModules);
    console.log("API Key modules:", apiKeyModules);
    
  } catch (error) {
    console.error("Error:", error.message);
  }
};
