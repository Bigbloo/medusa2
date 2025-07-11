#!/bin/bash

echo "🚀 Configuration ngrok pour exposer votre site local"
echo "=================================================="

# Vérifier si ngrok est installé
if ! command -v ngrok &> /dev/null; then
    echo "📦 Installation de ngrok..."
    
    # Détecter l'OS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install ngrok/ngrok/ngrok
        else
            echo "❌ Homebrew non trouvé. Installez ngrok manuellement depuis https://ngrok.com/download"
            exit 1
        fi
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null
        echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list
        sudo apt update && sudo apt install ngrok
    else
        echo "❌ OS non supporté. Installez ngrok manuellement depuis https://ngrok.com/download"
        exit 1
    fi
else
    echo "✅ ngrok déjà installé"
fi

echo ""
echo "🔧 Configuration de ngrok..."

# Créer le fichier de configuration ngrok
cat > ~/.ngrok2/ngrok.yml << EOF
version: "2"
authtoken: # Ajoutez votre token ici après inscription sur ngrok.com
tunnels:
  storefront:
    addr: 8000
    proto: http
    hostname: # Optionnel: votre sous-domaine personnalisé
  backend:
    addr: 9000
    proto: http
    hostname: # Optionnel: votre sous-domaine personnalisé
EOF

echo "📝 Fichier de configuration créé : ~/.ngrok2/ngrok.yml"
echo ""
echo "🎯 Prochaines étapes :"
echo "1. Créez un compte gratuit sur https://ngrok.com"
echo "2. Récupérez votre authtoken"
echo "3. Ajoutez-le dans ~/.ngrok2/ngrok.yml"
echo "4. Lancez : ./start-with-ngrok.sh"
echo ""
echo "✨ Votre site sera alors accessible publiquement !"
