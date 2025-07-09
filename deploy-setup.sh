#!/bin/bash

echo "🚀 Configuration du déploiement Medusa sur Render"
echo "================================================"

# Vérifier si Git est initialisé
if [ ! -d ".git" ]; then
    echo "📦 Initialisation de Git..."
    git init
    git add .
    git commit -m "Initial commit - Medusa app ready for deployment"
    echo "✅ Git initialisé avec succès"
else
    echo "✅ Git déjà initialisé"
fi

echo ""
echo "📋 Prochaines étapes pour déployer sur Render :"
echo ""
echo "1. Créez un repository GitHub :"
echo "   - Allez sur https://github.com/new"
echo "   - Créez un nouveau repository (ex: medusa-ecommerce)"
echo "   - Copiez l'URL du repository"
echo ""
echo "2. Poussez votre code :"
echo "   git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_REPO.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Déployez sur Render :"
echo "   - Connectez-vous à https://render.com"
echo "   - Cliquez sur 'New +' → 'Blueprint'"
echo "   - Connectez votre repository GitHub"
echo "   - Sélectionnez le dossier 'medusa-demo' pour le backend"
echo "   - Render détectera automatiquement le fichier render.yaml"
echo ""
echo "4. Consultez le guide détaillé :"
echo "   📖 Lisez DEPLOYMENT_GUIDE.md pour les instructions complètes"
echo ""
echo "🎉 Votre application Medusa est prête pour le déploiement !"
echo ""
echo "📁 Fichiers de configuration créés :"
echo "   ✅ medusa-demo/render.yaml (Backend)"
echo "   ✅ medusa-demo-storefront/render.yaml (Storefront)"
echo "   ✅ medusa-demo/scripts/deploy.js (Script de déploiement)"
echo "   ✅ DEPLOYMENT_GUIDE.md (Guide détaillé)"
echo "   ✅ README.md (Documentation)"
echo "   ✅ .gitignore (Fichiers à ignorer)"
