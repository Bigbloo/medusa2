# 🚀 Guide de Déploiement du Storefront Medusa

## Étape 1 : Créer le Service Storefront sur Render

1. **Aller sur le Dashboard Render** : https://dashboard.render.com
2. **Cliquer sur "New +"** → **"Web Service"**
3. **Connecter le Repository** : `https://github.com/Bigbloo/medusa2`
4. **Configurer le Service** :
   - **Name** : `medusa-storefront-production`
   - **Runtime** : `Node`
   - **Region** : `Oregon (US West)`
   - **Branch** : `main`
   - **Root Directory** : `medusa-demo-storefront`
   - **Build Command** : `yarn install && yarn build`
   - **Start Command** : `yarn start`
   - **Plan** : `Free`

## Étape 2 : Variables d'Environnement

Ajouter ces variables d'environnement dans le dashboard :

```
NODE_ENV=production
MEDUSA_BACKEND_URL=https://medusa2-0tjn.onrender.com
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://medusa2-0tjn.onrender.com
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_0e6a8c9498dbfcbe077f15866357ad9d5e0769fdb7b04faa0cc2c20b66717930
NEXT_PUBLIC_BASE_URL=https://medusa-storefront-production.onrender.com
NEXT_PUBLIC_DEFAULT_REGION=fr
REVALIDATE_SECRET=[généré automatiquement]
```

## Étape 3 : Déploiement

1. **Cliquer sur "Create Web Service"**
2. **Attendre le déploiement** (5-10 minutes)
3. **Votre site sera disponible** à : `https://medusa-storefront-production.onrender.com`

## Étape 4 : Vérification

1. **Tester l'API Backend** : https://medusa2-0tjn.onrender.com/store/regions
2. **Tester le Storefront** : https://medusa-storefront-production.onrender.com
3. **Vérifier la connexion** entre storefront et backend

## 🎯 Résultat Final

Vous aurez :
- ✅ **Backend API** : https://medusa2-0tjn.onrender.com
- ✅ **Storefront** : https://medusa-storefront-production.onrender.com
- ✅ **Admin Local** : http://localhost:9000/app (pour gérer les produits)

## 📝 Notes Importantes

- Le **backend est déjà déployé** et fonctionnel
- Le **storefront sera déployé** après création du service
- Utilisez l'**admin local** pour ajouter des produits
- Les **CORS sont configurés** pour autoriser la communication
