# 🏗️ Architecture de l'Application - Espace Étudiant ENSABM

## 📊 Vue d'Ensemble

```
┌─────────────────────────────────────────────────────────────────┐
│                    Application Android                          │
│                  Espace Étudiant ENSABM                        │
│                      (React Native)                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │         App.tsx (Entry Point)           │
        │    - Navigation Container               │
        │    - Services Initialization            │
        └─────────────────────────────────────────┘
                              │
                ┌─────────────┴──────────────┐
                ▼                            ▼
        ┌──────────────┐           ┌──────────────┐
        │ SplashScreen │           │  MainScreen  │
        │              │    →      │              │
        │ - Logo       │  (2s)     │ - WebView    │
        │ - Animation  │           │ - Navigation │
        └──────────────┘           └──────────────┘
                                           │
                    ┌──────────────────────┼──────────────────────┐
                    ▼                      ▼                      ▼
            ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
            │CustomHeader  │      │WebViewContainer│    │NavigationBar │
            │              │      │              │      │              │
            │- Menu        │      │- WebView     │      │- Back/Forward│
            │- Refresh     │      │- JavaScript  │      │- Home        │
            │- Title       │      │- Cookies     │      │- Bookmarks   │
            └──────────────┘      └──────────────┘      └──────────────┘
```

## 🔄 Flux de Données

```
┌──────────────────────────────────────────────────────────────┐
│                      Data Flow                                │
└──────────────────────────────────────────────────────────────┘

User Action
    │
    ▼
┌─────────────────┐
│   Components    │ ◄─── State Management (React Hooks)
│  (UI Layer)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Utils Layer    │ ◄─── Business Logic
│                 │
│ - networkUtils  │
│ - storageUtils  │
│ - webViewUtils  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Services Layer  │ ◄─── Data Persistence
│                 │
│ - cacheService  │
│ - notifyService │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Constants     │ ◄─── Configuration
│                 │
│ - config        │
│ - urls          │
│ - colors        │
└─────────────────┘
```

## 🎨 Structure des Composants

```
App (Container)
│
├─ SplashScreen
│  └─ Animation + Logo
│
├─ MainScreen
│  │
│  ├─ CustomHeader
│  │  ├─ Menu Button
│  │  ├─ Title
│  │  └─ Refresh Button
│  │
│  ├─ WebViewContainer
│  │  ├─ WebView
│  │  ├─ LoadingScreen (conditional)
│  │  ├─ OfflinePage (conditional)
│  │  └─ RefreshControl
│  │
│  └─ NavigationBar
│     ├─ Back Button
│     ├─ Forward Button
│     ├─ Home Button
│     └─ Bookmark Button
│
└─ SettingsScreen
   ├─ Theme Toggle
   ├─ Language Selector
   ├─ Cache Manager
   └─ App Info
```

## 📱 Écrans et Navigation

```
┌─────────────────────────────────────────────────────────┐
│                    Screen Flow                          │
└─────────────────────────────────────────────────────────┘

         App Launch
             │
             ▼
    ┌────────────────┐
    │ SplashScreen   │
    │                │
    │  [Logo ENSABM] │
    │  Version 1.0.0 │
    └────────┬───────┘
             │ (2 seconds)
             ▼
    ┌────────────────┐
    │  MainScreen    │◄─────┐
    │                │      │
    │  ┌──────────┐  │      │ Navigation
    │  │ Header   │  │      │
    │  ├──────────┤  │      │
    │  │          │  │      │
    │  │ WebView  │  │      │
    │  │          │  │      │
    │  ├──────────┤  │      │
    │  │  NavBar  │  │      │
    │  └──────────┘  │      │
    └────────┬───────┘      │
             │              │
             │ Menu Button  │
             ▼              │
    ┌────────────────┐      │
    │ SettingsScreen │──────┘
    │                │
    │ - Dark Mode    │
    │ - Language     │
    │ - Cache        │
    └────────────────┘
```

## 🔌 Intégration WebView

```
┌──────────────────────────────────────────────────────────┐
│                 WebView Integration                      │
└──────────────────────────────────────────────────────────┘

React Native Layer
        │
        ▼
┌───────────────────┐
│ WebViewContainer  │
│                   │
│ Configuration:    │
│ ✓ JavaScript      │
│ ✓ Cookies         │
│ ✓ LocalStorage    │
│ ✓ SessionStorage  │
│ ✓ Downloads       │
│ ✓ Uploads         │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│  Native WebView   │
│                   │
│  URL: ENSABM      │
│  User-Agent: +    │
│  Custom Headers   │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│   Web Content     │
│                   │
│  Espace Étudiant  │
│  ensabm.usms.ac.ma│
└───────────────────┘

Callbacks:
  ↑
  ├─ onNavigationStateChange
  ├─ onLoadProgress
  ├─ onLoadStart
  ├─ onLoadEnd
  ├─ onError
  └─ onMessage (JavaScript injection)
```

## 💾 Gestion des Données

```
┌──────────────────────────────────────────────────────────┐
│                   Data Management                        │
└──────────────────────────────────────────────────────────┘

┌─────────────────┐
│   User Data     │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│      AsyncStorage (Persistent)      │
│                                     │
│  ┌─────────────────────────────┐  │
│  │ User Preferences            │  │
│  │ - Theme (dark/light)        │  │
│  │ - Language (fr/ar)          │  │
│  └─────────────────────────────┘  │
│                                     │
│  ┌─────────────────────────────┐  │
│  │ Bookmarks                   │  │
│  │ - Saved URLs                │  │
│  │ - Page titles               │  │
│  └─────────────────────────────┘  │
│                                     │
│  ┌─────────────────────────────┐  │
│  │ Cache (50MB Max)            │  │
│  │ - HTML content              │  │
│  │ - Expiry: 24h               │  │
│  │ - LRU eviction              │  │
│  └─────────────────────────────┘  │
│                                     │
│  ┌─────────────────────────────┐  │
│  │ Session Data                │  │
│  │ - Form data                 │  │
│  │ - Temp storage              │  │
│  └─────────────────────────────┘  │
└─────────────────────────────────────┘
```

## 🌐 Gestion Réseau

```
┌──────────────────────────────────────────────────────────┐
│                  Network Management                      │
└──────────────────────────────────────────────────────────┘

┌─────────────────┐
│   App Start     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      Yes    ┌──────────────┐
│ Check Network   │─────────────►│ Load WebView │
└────────┬────────┘              └──────────────┘
         │
         │ No
         ▼
┌─────────────────┐              ┌──────────────┐
│  Show Offline   │              │ Retry Button │
│     Page        │◄─────────────┤              │
└─────────────────┘              └──────────────┘

Network Monitor (Real-time)
         │
         ├─ WiFi Status
         ├─ Cellular Status
         ├─ Connection Type
         └─ Speed Detection

NetInfo Events:
  ├─ onConnected
  ├─ onDisconnected
  └─ onConnectionChange
```

## 🔒 Sécurité

```
┌──────────────────────────────────────────────────────────┐
│                   Security Layers                        │
└──────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  Network Security                        │
│                                                          │
│  ✓ HTTPS Only (no cleartext traffic)                   │
│  ✓ Network Security Config (XML)                        │
│  ✓ Allowed Domains: ensabm.usms.ac.ma                  │
│  ✓ Certificate Pinning (optional)                       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                 WebView Security                         │
│                                                          │
│  ✓ No File Access from URLs                            │
│  ✓ No Universal Access                                  │
│  ✓ Domain Whitelisting                                  │
│  ✓ Secure Cookies                                       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   Data Security                          │
│                                                          │
│  ✓ Encrypted Storage (Android Keystore)                │
│  ✓ Secure Session Management                            │
│  ✓ Auto-logout on inactivity                            │
└─────────────────────────────────────────────────────────┘
```

## 📊 Statistiques du Projet

```
┌──────────────────────────────────────────────────────────┐
│                  Project Statistics                      │
└──────────────────────────────────────────────────────────┘

Total Files:              44
TypeScript Files:         16
Java Files:               5
XML Files:                6
Configuration Files:      8
Documentation Files:      5

Lines of Code:
  TypeScript:             2,387
  Java:                   ~300
  XML:                    ~400
  Total:                  ~3,100

Components:               5
  - WebViewContainer
  - CustomHeader
  - LoadingScreen
  - OfflinePage
  - NavigationBar

Screens:                  3
  - SplashScreen
  - MainScreen
  - SettingsScreen

Utils:                    3
  - networkUtils
  - storageUtils
  - webViewUtils

Services:                 2
  - cacheService
  - notificationService

Constants:                3
  - config
  - urls
  - colors
```

## 🎯 Points Clés de l'Architecture

### ✅ Séparation des Préoccupations
- **Composants** → UI uniquement
- **Utilitaires** → Logique métier
- **Services** → Persistance et API
- **Constants** → Configuration

### ✅ Réutilisabilité
- Composants modulaires
- Utilitaires génériques
- Services indépendants

### ✅ Maintenabilité
- TypeScript pour le typage
- Structure claire
- Documentation complète
- Code commenté en français

### ✅ Performance
- Cache intelligent (50MB)
- Lazy loading
- Optimisations React Native
- Hermes JS Engine

### ✅ Évolutivité
- Architecture modulaire
- Facile d'ajouter features
- Services extensibles
- Configuration centralisée

---

**Cette architecture permet une application robuste, performante et facile à maintenir!** 🚀
