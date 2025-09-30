# 🚀 Guide d'Installation Complet - Espace Étudiant ENSABM

Ce guide vous accompagnera étape par étape pour installer et lancer l'application.

## 📋 Table des Matières

1. [Prérequis](#prérequis)
2. [Installation des Outils](#installation-des-outils)
3. [Configuration de l'Environnement](#configuration-de-lenvironnement)
4. [Installation du Projet](#installation-du-projet)
5. [Lancement de l'Application](#lancement-de-lapplication)
6. [Dépannage](#dépannage)

---

## 📋 Prérequis

### Système d'exploitation
- ✅ Windows 10/11
- ✅ macOS 10.15 ou supérieur
- ✅ Linux (Ubuntu 18.04+, Fedora, etc.)

### Ressources minimales
- 8 GB RAM (16 GB recommandé)
- 20 GB d'espace disque disponible
- Connexion Internet stable

---

## 🛠️ Installation des Outils

### 1. Node.js et npm

#### Windows
```bash
# Télécharger depuis https://nodejs.org/
# Choisir la version LTS (Long Term Support)
# Version >= 16.x requise

# Vérifier l'installation
node --version  # Devrait afficher v16.x ou supérieur
npm --version   # Devrait afficher 8.x ou supérieur
```

#### macOS
```bash
# Avec Homebrew
brew install node

# Ou télécharger depuis https://nodejs.org/

# Vérifier
node --version
npm --version
```

#### Linux (Ubuntu/Debian)
```bash
# Installer Node.js 16.x
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Vérifier
node --version
npm --version
```

### 2. Java Development Kit (JDK)

```bash
# Installer JDK 11 ou supérieur

# Windows - Télécharger depuis:
# https://www.oracle.com/java/technologies/downloads/

# macOS
brew install --cask adoptopenjdk11

# Linux (Ubuntu)
sudo apt-get install openjdk-11-jdk

# Vérifier
java -version  # Devrait afficher 11.x ou supérieur
```

### 3. Android Studio

#### Téléchargement
1. Aller sur https://developer.android.com/studio
2. Télécharger Android Studio
3. Installer en suivant l'assistant

#### Configuration Android Studio
1. Ouvrir Android Studio
2. Aller dans **Configure** > **SDK Manager**
3. Dans l'onglet **SDK Platforms**, cocher:
   - ✅ Android 14.0 (API 34)
   - ✅ Android 6.0 (API 23)
4. Dans l'onglet **SDK Tools**, cocher:
   - ✅ Android SDK Build-Tools
   - ✅ Android SDK Platform-Tools
   - ✅ Android Emulator
   - ✅ Intel x86 Emulator Accelerator (HAXM)
5. Cliquer sur **Apply** et attendre la fin du téléchargement

---

## ⚙️ Configuration de l'Environnement

### Variables d'Environnement

#### Windows
```bash
# Ouvrir "Modifier les variables d'environnement système"
# Ajouter ou modifier:

ANDROID_HOME = C:\Users\VOTRE_NOM\AppData\Local\Android\Sdk

# Ajouter au PATH:
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\emulator
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
```

#### macOS / Linux
```bash
# Ajouter à ~/.bash_profile ou ~/.zshrc

export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
# OU
export ANDROID_HOME=$HOME/Android/Sdk  # Linux

export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Recharger
source ~/.bash_profile  # ou ~/.zshrc
```

### Vérification de la Configuration

```bash
# Vérifier que tout est bien configuré
adb --version  # Devrait afficher la version d'ADB
emulator -list-avds  # Devrait lister les émulateurs disponibles
```

---

## 📥 Installation du Projet

### 1. Naviguer vers le Projet

```bash
cd espace-etudiant-android
```

### 2. Installer les Dépendances npm

```bash
# Avec npm
npm install

# Ou avec yarn (si vous préférez)
yarn install
```

⏱️ **Temps estimé:** 5-10 minutes (selon la connexion Internet)

### 3. Vérifier l'Installation

```bash
# Vérifier que node_modules est créé
ls -la node_modules/  # macOS/Linux
dir node_modules\     # Windows

# Vérifier package-lock.json
ls -la package-lock.json
```

---

## 🚀 Lancement de l'Application

### Option 1: Avec un Émulateur Android

#### 1. Créer un Émulateur (première fois seulement)

```bash
# Ouvrir Android Studio
# Tools > AVD Manager > Create Virtual Device

# Recommandé:
# - Device: Pixel 5
# - System Image: API 34 (Android 14)
# - RAM: 2048 MB minimum
```

#### 2. Démarrer l'Émulateur

```bash
# Depuis Android Studio AVD Manager, cliquer sur Play
# OU en ligne de commande:
emulator -avd Pixel_5_API_34
```

#### 3. Lancer l'Application

```bash
# Terminal 1: Démarrer Metro Bundler
npm start

# Terminal 2: Lancer l'app sur Android
npm run android
```

### Option 2: Avec un Appareil Physique

#### 1. Activer le Mode Développeur
1. Ouvrir **Paramètres** sur votre téléphone
2. Aller dans **À propos du téléphone**
3. Taper 7 fois sur **Numéro de build**
4. Retourner aux paramètres
5. Ouvrir **Options pour les développeurs**
6. Activer **Débogage USB**

#### 2. Connecter l'Appareil
```bash
# Connecter via USB
# Vérifier la connexion
adb devices

# Devrait afficher:
# List of devices attached
# XXXXXXXXXXXXXX    device
```

#### 3. Lancer l'Application
```bash
# Terminal 1: Metro Bundler
npm start

# Terminal 2: Lancer sur l'appareil
npm run android
```

---

## ⏱️ Première Compilation

La première compilation peut prendre **10-15 minutes**. C'est normal!

### Ce qui se passe:
1. ✅ Téléchargement des dépendances Gradle
2. ✅ Compilation du code Java/Kotlin
3. ✅ Bundling du code JavaScript
4. ✅ Installation de l'APK
5. ✅ Lancement de l'application

### Indicateurs de Succès
```bash
# Vous devriez voir:
✓ Metro bundler started
✓ Building app...
✓ Installing app...
✓ App launched successfully

# Sur l'appareil/émulateur:
1. Splash screen ENSABM (2 secondes)
2. Écran principal avec WebView
3. Chargement de l'espace étudiant
```

---

## 🔧 Dépannage

### Problème: Metro Bundler ne démarre pas

```bash
# Solution 1: Nettoyer le cache
npm start -- --reset-cache

# Solution 2: Supprimer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Problème: Erreur Gradle

```bash
# Nettoyer le build Gradle
cd android
./gradlew clean
cd ..

# Relancer
npm run android
```

### Problème: "SDK location not found"

```bash
# Créer android/local.properties
echo "sdk.dir=/Users/VOTRE_NOM/Library/Android/sdk" > android/local.properties

# Remplacer le chemin par votre ANDROID_HOME
```

### Problème: "Unable to load script"

```bash
# Vérifier que Metro tourne
npm start

# Dans un autre terminal
npm run android
```

### Problème: Appareil non détecté

```bash
# Windows: Installer les pilotes USB du fabricant
# Réessayer
adb kill-server
adb start-server
adb devices
```

### Problème: Application crash au démarrage

```bash
# Voir les logs
adb logcat | grep ReactNative

# Réinstaller l'app
npm run android -- --reset-cache
```

---

## ✅ Vérification de l'Installation Réussie

### Checklist Finale

- [ ] Node.js installé (node --version)
- [ ] npm installé (npm --version)
- [ ] Java installé (java -version)
- [ ] Android Studio installé
- [ ] ANDROID_HOME configuré
- [ ] adb fonctionne (adb --version)
- [ ] Dépendances npm installées (node_modules existe)
- [ ] Émulateur créé OU appareil connecté
- [ ] Application lancée avec succès
- [ ] Splash screen affiché
- [ ] WebView charge l'espace étudiant

### Test de Fonctionnement

1. ✅ L'application se lance
2. ✅ Splash screen apparaît pendant 2 secondes
3. ✅ Écran principal s'affiche
4. ✅ WebView charge https://ensabm.usms.ac.ma/espace_etudiant/
5. ✅ Boutons de navigation fonctionnent
6. ✅ Pull-to-refresh fonctionne
7. ✅ Mode hors ligne détecté (si wifi désactivé)

---

## 📚 Ressources Supplémentaires

### Documentation
- [README.md](./README.md) - Documentation complète
- [QUICKSTART.md](./QUICKSTART.md) - Guide rapide
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Résumé du projet

### Liens Utiles
- [React Native Docs](https://reactnative.dev/)
- [Android Developer Guide](https://developer.android.com/)
- [React Native WebView](https://github.com/react-native-webview/react-native-webview)

---

## 🎉 Félicitations!

Si vous avez suivi toutes les étapes, votre application **Espace Étudiant ENSABM** devrait maintenant fonctionner parfaitement!

### Prochaines Étapes
1. Explorer l'application
2. Tester toutes les fonctionnalités
3. Personnaliser selon vos besoins
4. Compiler la version release pour distribution

---

**Besoin d'aide?** Consultez la section Dépannage ou les logs: `adb logcat`

**Bon développement! 🚀**
