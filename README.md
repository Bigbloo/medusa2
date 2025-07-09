# Medusa E-commerce Application

Une application e-commerce complète construite avec Medusa v2, comprenant un backend API et un storefront Next.js.

## 🏗️ Architecture

- **Backend** : Medusa v2 avec PostgreSQL
- **Storefront** : Next.js 15 avec Tailwind CSS
- **Base de données** : PostgreSQL
- **Déploiement** : Render (configuration incluse)

## 📁 Structure du Projet

```
├── medusa-demo/                 # Backend Medusa
│   ├── src/                     # Code source du backend
│   ├── scripts/                 # Scripts de déploiement
│   ├── render.yaml             # Configuration Render pour le backend
│   ├── medusa-config.ts        # Configuration Medusa
│   └── package.json
├── medusa-demo-storefront/      # Storefront Next.js
│   ├── src/                     # Code source du storefront
│   ├── render.yaml             # Configuration Render pour le storefront
│   └── package.json
├── DEPLOYMENT_GUIDE.md         # Guide de déploiement détaillé
└── README.md                   # Ce fichier
```

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 20+
- PostgreSQL
- Yarn

### Installation Locale

1. **Clonez le repository**
```bash
git clone <votre-repo>
cd medusa-app
```

2. **Installez les dépendances du backend**
```bash
cd medusa-demo
yarn install
```

3. **Configurez la base de données**
```bash
# Créez une base de données PostgreSQL
createdb medusa_demo

# Copiez et configurez les variables d'environnement
cp .env.example .env
# Éditez .env avec vos paramètres de base de données
```

4. **Migrez et seedez la base de données**
```bash
yarn build
npx medusa db:migrate
yarn seed
```

5. **Démarrez le backend**
```bash
yarn dev
```
Le backend sera accessible sur http://localhost:9000

6. **Installez et démarrez le storefront**
```bash
cd ../medusa-demo-storefront
yarn install
yarn dev
```
Le storefront sera accessible sur http://localhost:8000

## 🔑 Configuration

### Backend (.env)

```env
DATABASE_URL=postgres://user:password@localhost:5432/medusa_demo
JWT_SECRET=supersecret
COOKIE_SECRET=supersecret
STORE_CORS=http://localhost:8000
ADMIN_CORS=http://localhost:9000
AUTH_CORS=http://localhost:8000,http://localhost:9000
```

### Storefront (.env.local)

```env
MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_your_publishable_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:8000
NEXT_PUBLIC_DEFAULT_REGION=fr
```

## 🌐 Déploiement sur Render

Suivez le guide détaillé dans [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) pour déployer votre application sur Render.

### Résumé du déploiement :

1. Poussez votre code sur GitHub
2. Connectez votre repository à Render
3. Déployez le backend avec `medusa-demo/render.yaml`
4. Configurez les clés API
5. Déployez le storefront avec `medusa-demo-storefront/render.yaml`
6. Mettez à jour les CORS et URLs

## 🛠️ Commandes Utiles

### Backend

```bash
yarn dev          # Démarrage en mode développement
yarn build        # Construction pour la production
yarn start        # Démarrage en production
yarn seed         # Seed de la base de données
yarn deploy       # Script de déploiement
```

### Storefront

```bash
yarn dev          # Démarrage en mode développement
yarn build        # Construction pour la production
yarn start        # Démarrage en production
yarn lint         # Linting du code
```

## 📊 Fonctionnalités

### Backend Medusa

- ✅ API REST complète pour l'e-commerce
- ✅ Interface d'administration
- ✅ Gestion des produits, commandes, clients
- ✅ Système de régions et devises
- ✅ Gestion des stocks
- ✅ Système de promotions
- ✅ Intégration Stripe (optionnelle)

### Storefront Next.js

- ✅ Interface utilisateur moderne
- ✅ Catalogue de produits
- ✅ Panier d'achat
- ✅ Processus de commande
- ✅ Gestion des comptes clients
- ✅ Design responsive
- ✅ Optimisé pour les performances

## 🔧 Développement

### Ajouter des Produits

1. Accédez à l'admin : http://localhost:9000/app
2. Connectez-vous avec vos identifiants
3. Allez dans "Products" → "Add Product"
4. Remplissez les informations du produit
5. Le produit apparaîtra automatiquement dans le storefront

### Personnalisation

- **Backend** : Modifiez les fichiers dans `medusa-demo/src/`
- **Storefront** : Modifiez les composants dans `medusa-demo-storefront/src/`
- **Styles** : Utilisez Tailwind CSS pour le styling

## 🐛 Dépannage

### Problèmes Courants

1. **"No regions found"** : Configurez une région dans l'admin
2. **Erreurs CORS** : Vérifiez les variables CORS dans .env
3. **Erreurs de base de données** : Vérifiez la connexion PostgreSQL
4. **Clés API** : Vérifiez que les clés sont correctement configurées

### Logs

- Backend : Consultez la console où `yarn dev` s'exécute
- Storefront : Consultez la console du navigateur et du terminal

## 📚 Documentation

- [Documentation Medusa](https://docs.medusajs.com/)
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Render](https://render.com/docs)

## 🤝 Contribution

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

---

🎉 **Votre boutique e-commerce Medusa est prête !**
