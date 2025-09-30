# Guide de Démarrage Rapide - Espace Étudiant ENSABM

## 🚀 Installation Rapide

### Étape 1: Prérequis
```bash
# Vérifier Node.js
node --version  # Devrait être >= 16

# Vérifier npm
npm --version

# Vérifier Java
java -version   # Devrait être >= 11
```

### Étape 2: Installation des Dépendances
```bash
cd espace-etudiant-android
npm install
```

### Étape 3: Configuration Android
```bash
# Définir ANDROID_HOME
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Vérifier la configuration
adb --version
```

### Étape 4: Lancer l'Application
```bash
# Terminal 1 - Metro Bundler
npm start

# Terminal 2 - Application Android
npm run android
```

## 📱 Premiers Pas

### Naviguer dans l'Application

1. **Écran de Démarrage** - Logo ENSABM s'affiche pendant 2 secondes
2. **Écran Principal** - WebView avec l'espace étudiant
3. **Navigation** - Utilisez les boutons en bas pour naviguer

### Fonctionnalités Principales

#### Boutons de Navigation
- **← Retour** - Retourne à la page précédente
- **→ Suivant** - Avance à la page suivante
- **🏠 Accueil** - Retourne à la page d'accueil
- **☆ Favoris** - Ajoute/retire la page actuelle des favoris

#### Menu Header
- **☰ Menu** - Ouvre le menu latéral (à implémenter)
- **⟳ Actualiser** - Recharge la page actuelle

### Gestion Hors Ligne

Lorsque la connexion est perdue:
1. Une page d'erreur s'affiche automatiquement
2. Des suggestions pour résoudre le problème sont présentées
3. Bouton "Réessayer" pour tenter une reconnexion

### Signets/Favoris

Pour sauvegarder une page importante:
1. Naviguez vers la page souhaitée
2. Appuyez sur le bouton ☆ en bas
3. L'étoile devient pleine (★) pour confirmer
4. La page est maintenant dans vos favoris

### Paramètres

Accédez aux paramètres pour:
- Activer/Désactiver le mode sombre
- Changer la langue (Français/Arabe)
- Voir et gérer le cache
- Effacer les données

## 🛠️ Résolution de Problèmes

### Problème: Metro bundler ne démarre pas
```bash
# Solution: Nettoyer le cache
npm start -- --reset-cache
```

### Problème: Erreur de build Android
```bash
# Solution: Nettoyer le build
cd android
./gradlew clean
cd ..
npm run android
```

### Problème: Application ne se connecte pas
1. Vérifiez votre connexion Internet
2. Vérifiez que l'URL est accessible dans un navigateur
3. Vérifiez les permissions dans AndroidManifest.xml

### Problème: Écran blanc au démarrage
```bash
# Solution: Recharger l'application
# Sur l'émulateur: Ctrl+M (Windows) ou Cmd+M (Mac)
# Sélectionnez "Reload"
```

## 📝 Personnalisation Rapide

### Changer l'URL de l'espace étudiant
Fichier: `src/constants/urls.ts`
```typescript
export const URLS = {
  STUDENT_SPACE: 'https://votre-url.com',
  ...
};
```

### Changer les couleurs
Fichier: `src/constants/colors.ts`
```typescript
export const COLORS = {
  primary: '#VOTRE_COULEUR',
  ...
};
```

### Modifier le nom de l'application
Fichier: `app.json`
```json
{
  "name": "VotreNomApp",
  "displayName": "Votre Nom d'Affichage"
}
```

## 🔍 Commandes Utiles

```bash
# Développement
npm start                    # Démarrer Metro bundler
npm run android             # Lancer sur Android
npm run android -- --variant=release  # Build release

# Tests
npm test                    # Lancer les tests
npm test -- --coverage      # Tests avec couverture

# Nettoyage
npm run clean               # Nettoyer le build
rm -rf node_modules && npm install  # Réinstaller dépendances

# Build
cd android && ./gradlew assembleDebug    # Build debug APK
cd android && ./gradlew assembleRelease  # Build release APK

# Logs
adb logcat                  # Tous les logs
adb logcat | grep ReactNative  # Logs React Native seulement
```

## 📚 Ressources Supplémentaires

- [README Principal](./README.md) - Documentation complète
- [React Native Docs](https://reactnative.dev/)
- [Android Developer Guide](https://developer.android.com/)

## 💡 Conseils

1. **Toujours tester** sur un appareil physique pour les performances réelles
2. **Utiliser le mode Debug** pendant le développement
3. **Nettoyer régulièrement** le cache pour éviter les problèmes
4. **Vérifier les logs** en cas d'erreur
5. **Mettre à jour** les dépendances régulièrement

## 🎯 Checklist de Développement

- [ ] Node.js et npm installés
- [ ] Android Studio configuré
- [ ] ANDROID_HOME défini
- [ ] Dépendances npm installées
- [ ] Émulateur Android configuré
- [ ] Application lancée avec succès
- [ ] WebView charge correctement
- [ ] Navigation fonctionne
- [ ] Mode hors ligne testé
- [ ] Signets fonctionnent

---

**Besoin d'aide?** Consultez la [documentation complète](./README.md) ou contactez le support.
