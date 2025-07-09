const { MedusaApp } = require("@medusajs/framework");

module.exports = async function getApiKey() {
  const app = await MedusaApp({
    workerMode: "shared"
  });
  
  try {
    const apiKeys = await app.modules.apiKey.listApiKeys({ 
      type: "publishable" 
    });
    
    if (apiKeys.length > 0) {
      console.log("API Key:", apiKeys[0].token);
      return apiKeys[0].token;
    } else {
      console.log("No publishable API keys found");
    }
    
  } catch (error) {
    console.error("Error:", error.message);
  }
};
