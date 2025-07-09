# Guide de Déploiement Medusa sur Render

Ce guide vous explique comment déployer votre application Medusa (backend + storefront) sur Render.

## 📋 Prérequis

1. Compte GitHub avec votre code Medusa
2. Compte Render (gratuit)
3. Votre application Medusa fonctionnelle en local

## 🚀 Étapes de Déploiement

### 1. Préparer le Repository GitHub

1. Créez un repository GitHub et poussez votre code :
```bash
git init
git add .
git commit -m "Initial commit - Medusa app ready for deployment"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_REPO.git
git push -u origin main
```

### 2. Déployer le Backend Medusa

1. **Connectez-vous à Render** : https://render.com
2. **Créez un nouveau service** :
   - Cliquez sur "New +" → "Blueprint"
   - Connectez votre repository GitHub
   - Sélectionnez le dossier `medusa-demo`
   - Render détectera automatiquement le fichier `render.yaml`

3. **Configuration automatique** :
   - Base de données PostgreSQL sera créée automatiquement
   - Variables d'environnement seront configurées
   - Le déploiement commencera automatiquement

4. **Attendez le déploiement** (5-10 minutes)
   - Render va installer les dépendances
   - Construire l'application
   - Migrer la base de données
   - Démarrer le serveur

5. **Notez l'URL du backend** : `https://medusa-backend-XXXXX.onrender.com`

### 3. Configurer les Clés API

Une fois le backend déployé :

1. **Accédez à l'admin** : `https://medusa-backend-XXXXX.onrender.com/app`
2. **Connectez-vous** avec vos identifiants admin
3. **Créez une clé API publique** :
   - Allez dans Settings → API Key Management
   - Créez une nouvelle clé publique
   - **Copiez cette clé** - vous en aurez besoin pour le storefront

### 4. Déployer le Storefront

1. **Créez un nouveau service Render** :
   - "New +" → "Blueprint"
   - Même repository GitHub
   - Sélectionnez le dossier `medusa-demo-storefront`

2. **Mettez à jour les variables d'environnement** :
   - `MEDUSA_BACKEND_URL` : URL de votre backend (étape 2.5)
   - `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` : Clé API publique (étape 3.3)
   - `NEXT_PUBLIC_BASE_URL` : URL de votre storefront (sera fournie par Render)

3. **Déployez le storefront**

### 5. Mettre à jour les CORS

Retournez dans l'admin de votre backend et mettez à jour les CORS :

1. **Variables d'environnement du backend** :
   - `STORE_CORS` : Ajoutez l'URL de votre storefront
   - `ADMIN_CORS` : Ajoutez l'URL de votre backend
   - `AUTH_CORS` : Ajoutez les deux URLs

## 🔧 Configuration Post-Déploiement

### Mise à jour des URLs CORS

Dans Render, mettez à jour les variables d'environnement du backend :

```
STORE_CORS=https://medusa-storefront-XXXXX.onrender.com,http://localhost:8000
ADMIN_CORS=https://medusa-backend-XXXXX.onrender.com,http://localhost:9000
AUTH_CORS=https://medusa-backend-XXXXX.onrender.com,https://medusa-storefront-XXXXX.onrender.com,http://localhost:8000,http://localhost:9000
```

### Mise à jour du Storefront

Dans les variables d'environnement du storefront :

```
MEDUSA_BACKEND_URL=https://medusa-backend-XXXXX.onrender.com
NEXT_PUBLIC_BASE_URL=https://medusa-storefront-XXXXX.onrender.com
```

## ✅ Vérification

1. **Backend** : `https://medusa-backend-XXXXX.onrender.com/health` → doit retourner 200
2. **Admin** : `https://medusa-backend-XXXXX.onrender.com/app` → interface d'administration
3. **Storefront** : `https://medusa-storefront-XXXXX.onrender.com` → boutique en ligne

## 🐛 Dépannage

### Erreurs communes :

1. **"No regions found"** : Vérifiez que la région France est bien configurée dans l'admin
2. **CORS errors** : Vérifiez les variables CORS dans le backend
3. **API Key errors** : Vérifiez que la clé publique est correcte dans le storefront
4. **Database errors** : Vérifiez que les migrations ont bien été exécutées

### Logs utiles :

- Backend : Render Dashboard → Service → Logs
- Storefront : Render Dashboard → Service → Logs

## 📝 Notes importantes

- **Plan gratuit Render** : Les services s'endorment après 15 minutes d'inactivité
- **Base de données** : Sauvegardée automatiquement sur le plan gratuit
- **SSL** : Fourni automatiquement par Render
- **Domaine personnalisé** : Possible avec les plans payants

## 🔄 Mises à jour

Pour mettre à jour votre application :

1. Poussez vos changements sur GitHub
2. Render redéploiera automatiquement
3. Les migrations de base de données s'exécuteront automatiquement

---

🎉 **Votre boutique Medusa est maintenant en ligne !**
