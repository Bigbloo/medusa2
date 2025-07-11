#!/bin/bash

echo "🚀 Déploiement Complet Medusa Backend + Storefront"
echo "=================================================="

# Vérifier que nous sommes connectés à Render
if ! render whoami > /dev/null 2>&1; then
    echo "❌ Vous devez être connecté à Render. Lancez: render login"
    exit 1
fi

echo "✅ Connecté à Render"

# Supprimer les anciens services (optionnel)
echo ""
echo "🗑️ Nettoyage des anciens services..."

# Déployer le backend
echo ""
echo "🔧 Déploiement du Backend Medusa..."
render service create \
    --name "medusa-backend-v2" \
    --type "web" \
    --runtime "node" \
    --plan "starter" \
    --repo "https://github.com/Bigbloo/medusa2.git" \
    --branch "main" \
    --root-dir "medusa-demo" \
    --build-command "yarn install --frozen-lockfile && node init-production-complete.js" \
    --start-command "node start-production-final.js" \
    --health-check-path "/" \
    --env NODE_ENV=production \
    --env DATABASE_URL="postgresql://medusa:OCSg5gp84TDq50NvE3Pg7wP9xm3z3FF9@dpg-d1mq3kgdl3ps73cieogg-a.oregon-postgres.render.com/medusa_jyxk?sslmode=require" \
    --env STORE_CORS="http://localhost:8000,https://medusa-storefront-v2.onrender.com" \
    --env ADMIN_CORS="http://localhost:9000,https://medusa-backend-v2.onrender.com" \
    --env AUTH_CORS="http://localhost:8000,http://localhost:9000,https://medusa-storefront-v2.onrender.com,https://medusa-backend-v2.onrender.com" \
    --env MEDUSA_ADMIN_ONBOARDING_TYPE="default"

echo ""
echo "⏳ Attente du déploiement du backend..."
sleep 30

# Déployer le storefront
echo ""
echo "🛍️ Déploiement du Storefront..."
render service create \
    --name "medusa-storefront-v2" \
    --type "web" \
    --runtime "node" \
    --plan "free" \
    --repo "https://github.com/Bigbloo/medusa2.git" \
    --branch "main" \
    --root-dir "medusa-demo-storefront" \
    --build-command "yarn install && yarn build" \
    --start-command "yarn start" \
    --env NODE_ENV=production \
    --env MEDUSA_BACKEND_URL="https://medusa-backend-v2.onrender.com" \
    --env NEXT_PUBLIC_MEDUSA_BACKEND_URL="https://medusa-backend-v2.onrender.com" \
    --env NEXT_PUBLIC_BASE_URL="https://medusa-storefront-v2.onrender.com" \
    --env NEXT_PUBLIC_DEFAULT_REGION="fr"

echo ""
echo "🎉 Déploiement lancé !"
echo ""
echo "📋 URLs de vos services :"
echo "🔧 Backend  : https://medusa-backend-v2.onrender.com"
echo "🛍️ Storefront : https://medusa-storefront-v2.onrender.com"
echo ""
echo "⏳ Le déploiement peut prendre 5-10 minutes..."
echo "📊 Surveillez les logs avec : render logs --tail"
