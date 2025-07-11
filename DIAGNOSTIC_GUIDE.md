# 🔍 Guide de Diagnostic Medusa

## 📊 **État Actuel du Système**

### ✅ **Local (Fonctionnel)**
- **Backend** : http://localhost:9000 ✅
- **Admin** : http://localhost:9000/app ✅
- **Storefront** : http://localhost:8000 ✅

### 🔄 **Production (En Cours de Correction)**
- **Backend API** : https://medusa2-0tjn.onrender.com
- **Base de données** : PostgreSQL sur Render

## 🛠️ **Corrections Appliquées**

### 1. **Script d'Initialisation Complet**
- ✅ `init-production-complete.js` : Migrations + Seed + Admin + API Key
- ✅ `start-production-final.js` : Démarrage robuste avec gestion d'erreurs

### 2. **Configuration Render Mise à Jour**
- ✅ Health check corrigé : `/` au lieu de `/health`
- ✅ Build command : Inclut l'initialisation complète
- ✅ CORS configurés pour le storefront

### 3. **Variables d'Environnement**
- ✅ Base de données PostgreSQL configurée
- ✅ CORS pour autoriser le storefront
- ✅ Secrets JWT et Cookie générés

## 🔍 **Tests de Diagnostic**

### **Test 1 : Backend Principal**
```bash
curl https://medusa2-0tjn.onrender.com/
# Attendu : "OK"
```

### **Test 2 : API Store (Avec Clé)**
```bash
curl -H "x-publishable-api-key: [NOUVELLE_CLE]" https://medusa2-0tjn.onrender.com/store/regions
# Attendu : JSON avec les régions
```

### **Test 3 : Logs de Déploiement**
```bash
render logs --tail
# Vérifier l'initialisation et la création de la clé API
```

## 🎯 **Prochaines Étapes**

1. **Attendre le redéploiement** (5-10 minutes)
2. **Récupérer la nouvelle clé API** depuis les logs
3. **Mettre à jour les configurations** avec la vraie clé
4. **Déployer le storefront** avec la bonne clé
5. **Tester la connexion complète**

## 📋 **Checklist de Vérification**

- [ ] Backend répond à `/`
- [ ] Migrations exécutées
- [ ] Base de données seedée
- [ ] Admin user créé
- [ ] Clé API générée
- [ ] Sales channel associé
- [ ] API Store accessible
- [ ] Storefront déployable

## 🚨 **En Cas de Problème**

### **Si l'initialisation échoue :**
1. Vérifier les logs Render
2. Exécuter manuellement : `node init-production-complete.js`
3. Redéployer si nécessaire

### **Si l'API ne répond pas :**
1. Vérifier la clé API dans les logs
2. Tester avec curl
3. Mettre à jour les configurations

### **Si le storefront ne se connecte pas :**
1. Vérifier les CORS
2. Mettre à jour la clé API
3. Redéployer le storefront

## 📞 **Support**

En cas de problème persistant :
1. Consulter les logs Render
2. Vérifier la base de données
3. Tester les endpoints manuellement
