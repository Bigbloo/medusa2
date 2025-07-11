# 🌐 Configuration ngrok pour Exposer Votre Site Local

## 🔑 **Votre Clé API ngrok**
```
2zj2zTaoB4LLC7jGJhLHRFgEdmY_424ohpgzgtT8K5v2hK2Mc
```

## 🚀 **Installation et Configuration Rapide**

### **Étape 1 : Installer ngrok**
```bash
# Sur macOS avec Homebrew
brew install ngrok/ngrok/ngrok

# Ou télécharger depuis https://ngrok.com/download
```

### **Étape 2 : Configurer votre token**
```bash
ngrok config add-authtoken 2zj2zTaoB4LLC7jGJhLHRFgEdmY_424ohpgzgtT8K5v2hK2Mc
```

### **Étape 3 : Exposer votre storefront**
```bash
# Dans un nouveau terminal (votre site doit tourner sur localhost:8000)
ngrok http 8000
```

## 🎯 **Résultat**

Après avoir lancé `ngrok http 8000`, vous obtiendrez :

```
ngrok by @inconshreveable

Session Status                online
Account                       Votre compte (Plan: Free)
Version                       3.x.x
Region                        United States (us)
Latency                       50ms
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123.ngrok.io -> http://localhost:8000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

## 🌐 **Votre Site est Maintenant Public !**

- **URL Publique** : `https://abc123.ngrok.io` (remplacez par votre vraie URL)
- **Interface ngrok** : http://127.0.0.1:4040 (pour voir les requêtes)
- **Site Local** : http://localhost:8000 (toujours accessible)

## 🔗 **Configuration Domaine**

### **Option 1 : Redirection Simple**
Dans votre registrar de domaine :
```
Type: CNAME
Name: www
Value: abc123.ngrok.io (sans https://)
```

### **Option 2 : Redirection 301**
Créez une page de redirection :
```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=https://abc123.ngrok.io">
    <script>window.location.href = "https://abc123.ngrok.io";</script>
</head>
<body>Redirection...</body>
</html>
```

## ⚡ **Commandes Utiles**

### **Démarrage Complet**
```bash
# Terminal 1 : Backend
cd medusa-demo && yarn dev

# Terminal 2 : Storefront  
cd medusa-demo-storefront && yarn dev

# Terminal 3 : ngrok
ngrok http 8000
```

### **Avec Sous-domaine Personnalisé (Plan Payant)**
```bash
ngrok http 8000 --subdomain=monsite
# Résultat : https://monsite.ngrok.io
```

### **Exposer Aussi le Backend**
```bash
# Terminal 4 : Backend public
ngrok http 9000
```

## 🎯 **Avantages de Cette Solution**

✅ **Gratuit** : Plan gratuit ngrok suffisant  
✅ **Rapide** : Configuration en 2 minutes  
✅ **HTTPS** : SSL automatique  
✅ **Accessible** : Depuis n'importe où dans le monde  
✅ **Développement** : Parfait pour tester et montrer  

## ⚠️ **Limitations Plan Gratuit**

❌ **URL Temporaire** : Change à chaque redémarrage  
❌ **Limite de Connexions** : 20 connexions simultanées  
❌ **Pas de Sous-domaine** : URL aléatoire  

## 🚀 **Pour la Production**

Pour un site e-commerce en production, utilisez plutôt :
1. **Render** (gratuit) - Déjà configuré dans votre projet
2. **Vercel** (gratuit pour projets personnels)
3. **Netlify** (gratuit avec limitations)

## 📞 **Support**

Si vous avez des problèmes :
1. Vérifiez que votre site local fonctionne sur http://localhost:8000
2. Consultez l'interface ngrok : http://127.0.0.1:4040
3. Redémarrez ngrok si l'URL ne fonctionne plus
