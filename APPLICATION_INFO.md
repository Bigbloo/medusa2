# Informations de l'Application Medusa

## 🔑 Identifiants et Clés

### Compte Admin Local
- **Email** : admin@example.com
- **Mot de passe** : password123
- **URL Admin** : http://localhost:9000/app

### Clés API Générées
- **Clé Publique** : `pk_3452472ca0622d48146144633f6bde6c385e75dd8239c4eca845e8fa572288d5`
- **Clé Secrète** : `sk_7b6e6023039192e116f42b790e6666d7f939524d794570b450ab06c7e7f02be7`

## 🌍 Configuration Régionale

### Région Configurée
- **Nom** : blog (à renommer en production)
- **Devise** : EUR (Euro)
- **Pays** : France (FR)
- **Région par défaut** : fr

## 🔗 URLs Locales

- **Backend API** : http://localhost:9000
- **Interface Admin** : http://localhost:9000/app
- **Storefront** : http://localhost:8000
- **Health Check** : http://localhost:9000/health

## 📊 Base de Données

### Configuration Locale
- **Type** : PostgreSQL
- **Base** : medusa_demo
- **URL** : postgres://athomeproject@localhost:5432/medusa_demo

## 🚀 Commandes de Démarrage

### Backend
```bash
cd medusa-demo
yarn dev
```

### Storefront
```bash
cd medusa-demo-storefront
yarn dev
```

## 📦 Statut du Projet

✅ **Backend Medusa** : Fonctionnel
✅ **Storefront Next.js** : Fonctionnel
✅ **Base de données** : Configurée et migrée
✅ **Région** : Configurée (France)
✅ **Clés API** : Générées et configurées
✅ **CORS** : Configuré pour le développement local
✅ **Configuration Render** : Prête pour le déploiement

## 🔧 Prochaines Étapes

### Pour le Développement Local
1. Ajouter des produits via l'admin
2. Personnaliser le design du storefront
3. Configurer Stripe pour les paiements (optionnel)

### Pour le Déploiement
1. Suivre le guide dans `DEPLOYMENT_GUIDE.md`
2. Créer un repository GitHub
3. Déployer sur Render
4. Mettre à jour les URLs de production

## 📝 Notes Importantes

- **Sécurité** : Changez les secrets en production
- **CORS** : Mettez à jour avec les vraies URLs de production
- **Base de données** : Utilisez PostgreSQL en production
- **Monitoring** : Surveillez les logs en production

---

💡 **Conseil** : Gardez ce fichier à jour avec vos modifications !
