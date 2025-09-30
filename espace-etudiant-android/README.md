# Espace Étudiant ENSABM - Application Android

Application Android WebView native pour accéder à l'espace étudiant de l'École Nationale des Sciences Appliquées de Béni Mellal (ENSABM).

## 📱 Description

Cette application offre une expérience native optimisée pour accéder à l'espace étudiant ENSABM depuis un appareil Android. Elle intègre toutes les fonctionnalités du portail web avec des améliorations natives pour une meilleure performance et ergonomie.

## ✨ Fonctionnalités

### Fonctionnalités Principales
- ✅ **WebView Optimisé** - Affichage rapide et fluide du portail étudiant
- ✅ **Navigation Intuitive** - Boutons retour/avant/accueil/favoris
- ✅ **Écran de Démarrage** - Splash screen avec logo ENSABM
- ✅ **Indicateur de Chargement** - Barre de progression pour le chargement des pages
- ✅ **Mode Hors Ligne** - Page d'erreur élégante sans connexion
- ✅ **Pull-to-Refresh** - Actualisation par glissement vers le bas
- ✅ **Gestion des Sessions** - Maintien automatique de la connexion
- ✅ **Téléchargement de Fichiers** - Support PDF et documents
- ✅ **Upload de Fichiers** - Support photos et documents

### Fonctionnalités Avancées
- 🔖 **Signets/Favoris** - Sauvegarde des pages importantes
- 🌐 **Support Multi-langue** - Français et Arabe
- 🎨 **Mode Sombre** - Interface adaptative (clair/sombre)
- 📊 **Gestion du Cache** - Cache intelligent pour meilleures performances
- 🔔 **Notifications** - Structure de base pour notifications push
- 🔒 **Sécurité HTTPS** - Connexions sécurisées uniquement
- 📱 **Interface Responsive** - Adaptation tablettes et téléphones

### Accès Rapide
- 📝 Notes et résultats
- 📅 Emploi du temps
- ✓ Absences
- 📄 Documents et ressources

## 🛠️ Technologies Utilisées

- **React Native** 0.72.6 - Framework mobile cross-platform
- **TypeScript** - Typage statique pour meilleure qualité du code
- **React Native WebView** - Composant WebView optimisé
- **React Navigation** - Navigation entre écrans
- **AsyncStorage** - Stockage local persistant
- **NetInfo** - Détection de la connectivité réseau
- **React Native Permissions** - Gestion des permissions

## 📋 Prérequis

- Node.js >= 16
- npm ou yarn
- JDK 11 ou supérieur
- Android Studio
- Android SDK (API 23-34)
- React Native CLI

### Configuration de l'environnement

```bash
# Installer Node.js et npm
# Télécharger depuis https://nodejs.org/

# Installer React Native CLI
npm install -g react-native-cli

# Installer Android Studio
# Télécharger depuis https://developer.android.com/studio

# Configurer les variables d'environnement
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

## 🚀 Installation

### 1. Cloner le projet

```bash
cd espace-etudiant-android
```

### 2. Installer les dépendances

```bash
# Avec npm
npm install

# Ou avec yarn
yarn install
```

### 3. Installer les dépendances Android

```bash
cd android
./gradlew clean
cd ..
```

## 📱 Exécution

### Mode Développement

```bash
# Démarrer Metro bundler
npm start

# Dans un autre terminal, lancer l'application
npm run android

# Ou directement
npx react-native run-android
```

### Avec un émulateur Android

```bash
# Lister les émulateurs disponibles
emulator -list-avds

# Démarrer un émulateur
emulator -avd Pixel_5_API_34

# Lancer l'application
npm run android
```

### Avec un appareil physique

1. Activer le mode développeur sur l'appareil
2. Activer le débogage USB
3. Connecter l'appareil via USB
4. Vérifier la connexion : `adb devices`
5. Lancer : `npm run android`

## 🏗️ Compilation

### Version Debug

```bash
cd android
./gradlew assembleDebug
```

L'APK sera disponible dans :
`android/app/build/outputs/apk/debug/app-debug.apk`

### Version Release

```bash
cd android
./gradlew assembleRelease
```

L'APK sera disponible dans :
`android/app/build/outputs/apk/release/app-release.apk`

## 📁 Structure du Projet

```
espace-etudiant-android/
├── App.tsx                      # Point d'entrée principal
├── index.js                     # Enregistrement de l'application
├── package.json                 # Dépendances npm
├── tsconfig.json               # Configuration TypeScript
├── babel.config.js             # Configuration Babel
├── metro.config.js             # Configuration Metro bundler
│
├── src/
│   ├── components/             # Composants réutilisables
│   │   ├── WebViewContainer.tsx     # Composant WebView principal
│   │   ├── CustomHeader.tsx         # En-tête personnalisé
│   │   ├── LoadingScreen.tsx        # Écran de chargement
│   │   ├── OfflinePage.tsx          # Page hors ligne
│   │   └── NavigationBar.tsx        # Barre de navigation
│   │
│   ├── screens/                # Écrans de l'application
│   │   ├── MainScreen.tsx           # Écran principal
│   │   ├── SplashScreen.tsx         # Écran de démarrage
│   │   └── SettingsScreen.tsx       # Écran des paramètres
│   │
│   ├── utils/                  # Fonctions utilitaires
│   │   ├── networkUtils.ts          # Gestion réseau
│   │   ├── storageUtils.ts          # Stockage local
│   │   └── webViewUtils.ts          # Utilitaires WebView
│   │
│   ├── services/               # Services
│   │   ├── notificationService.ts   # Service notifications
│   │   └── cacheService.ts          # Service cache
│   │
│   └── constants/              # Constantes
│       ├── config.ts                # Configuration app
│       ├── urls.ts                  # URLs
│       └── colors.ts                # Couleurs
│
└── android/                    # Fichiers Android natifs
    ├── app/
    │   ├── src/main/
    │   │   ├── AndroidManifest.xml  # Manifest Android
    │   │   └── res/                 # Ressources Android
    │   └── build.gradle             # Configuration Gradle
    └── build.gradle                 # Configuration Gradle racine
```

## 🔧 Configuration

### Modifier l'URL de l'espace étudiant

Éditer `src/constants/urls.ts`:

```typescript
export const URLS = {
  STUDENT_SPACE: 'https://ensabm.usms.ac.ma/espace_etudiant/index.php',
  // Autres URLs...
};
```

### Personnaliser les couleurs

Éditer `src/constants/colors.ts`:

```typescript
export const COLORS = {
  primary: '#003366',
  secondary: '#0066CC',
  // Autres couleurs...
};
```

### Configurer les permissions

Éditer `android/app/src/main/AndroidManifest.xml` pour ajouter ou retirer des permissions.

## 🧪 Tests

```bash
# Lancer les tests
npm test

# Tests avec couverture
npm test -- --coverage

# Tests en mode watch
npm test -- --watch
```

## 🐛 Débogage

### React Native Debugger

```bash
# Ouvrir le menu de débogage sur l'émulateur
adb shell input keyevent 82

# Ou secouer l'appareil physique
```

### Logs Android

```bash
# Afficher tous les logs
adb logcat

# Filtrer les logs React Native
adb logcat | grep ReactNative

# Filtrer les logs de l'application
adb logcat | grep ENSABM
```

### Nettoyer le cache

```bash
# Nettoyer le cache Metro
npm start -- --reset-cache

# Nettoyer le build Android
cd android && ./gradlew clean && cd ..

# Nettoyer node_modules
rm -rf node_modules && npm install
```

## 📦 Dépendances Principales

| Package | Version | Description |
|---------|---------|-------------|
| react-native | 0.72.6 | Framework mobile |
| react-native-webview | ^13.6.2 | Composant WebView |
| @react-navigation/native | ^6.1.9 | Navigation |
| @react-native-async-storage/async-storage | ^1.19.3 | Stockage local |
| @react-native-community/netinfo | ^9.4.1 | Détection réseau |

## 🔐 Sécurité

- ✅ HTTPS uniquement (configuré dans network_security_config.xml)
- ✅ Permissions minimales nécessaires
- ✅ Pas d'accès fichier universel
- ✅ Cookies sécurisés
- ✅ Validation des domaines

## 📱 Compatibilité

- **Minimum** : Android 6.0 (API 23)
- **Target** : Android 14 (API 34)
- **Testé sur** : Android 9, 10, 11, 12, 13, 14

## 🎨 Personnalisation

### Changer le nom de l'application

1. Éditer `app.json`
2. Éditer `android/app/src/main/res/values/strings.xml`

### Changer l'icône

Remplacer les fichiers dans :
- `android/app/src/main/res/mipmap-*/ic_launcher.png`

### Changer le package name

1. Éditer `android/app/build.gradle`
2. Éditer `android/app/src/main/AndroidManifest.xml`
3. Renommer les dossiers dans `android/app/src/main/java/`

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est développé pour l'ENSA Béni Mellal.

## 👥 Auteurs

- **Développement** - Application développée pour ENSA Béni Mellal
- **Design** - Basé sur la charte graphique ENSABM

## 🙏 Remerciements

- ENSA Béni Mellal
- Université Sultan Moulay Slimane
- Communauté React Native

## 📞 Support

Pour toute question ou problème :
- Email : support@ensabm.usms.ac.ma
- Site web : https://ensabm.usms.ac.ma

## 📚 Documentation Additionnelle

- [React Native Documentation](https://reactnative.dev/)
- [React Native WebView](https://github.com/react-native-webview/react-native-webview)
- [React Navigation](https://reactnavigation.org/)
- [Android Developer Guide](https://developer.android.com/)

## 🔄 Changelog

### Version 1.0.0 (2024)
- 🎉 Version initiale
- ✅ WebView fonctionnel
- ✅ Navigation complète
- ✅ Gestion hors ligne
- ✅ Signets/Favoris
- ✅ Mode sombre
- ✅ Multi-langue (FR/AR)
- ✅ Cache intelligent
- ✅ Interface responsive

## 🗺️ Roadmap

### Prochaines versions
- [ ] Notifications push
- [ ] Widget Android
- [ ] Raccourcis rapides
- [ ] Mode examen avancé
- [ ] Synchronisation cloud
- [ ] Support tablettes optimisé
- [ ] Partage avancé
- [ ] Thèmes personnalisés

---

**Fait avec ❤️ pour les étudiants de l'ENSA Béni Mellal**
