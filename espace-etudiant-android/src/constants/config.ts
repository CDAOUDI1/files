/**
 * Application configuration constants
 */

export const APP_CONFIG = {
  // App Information
  APP_NAME: 'Espace Étudiant ENSABM',
  APP_VERSION: '1.0.0',
  PACKAGE_NAME: 'com.ensabm.espaceetudiant',
  
  // WebView Configuration
  USER_AGENT_SUFFIX: 'EspaceEtudiantApp/1.0',
  CONNECTION_TIMEOUT: 10000, // 10 seconds
  CACHE_SIZE_MB: 50,
  
  // Feature Flags
  ENABLE_JAVASCRIPT: true,
  ENABLE_COOKIES: true,
  ENABLE_LOCAL_STORAGE: true,
  ENABLE_GEOLOCATION: false,
  ENABLE_CAMERA: true,
  ENABLE_FILE_UPLOAD: true,
  ENABLE_FILE_DOWNLOAD: true,
  
  // Performance
  ENABLE_CACHE: true,
  ENABLE_COMPRESSION: true,
  
  // Security
  HTTPS_ONLY: true,
  ALLOW_UNIVERSAL_ACCESS: false,
  ALLOW_FILE_ACCESS: false,
  
  // UI Configuration
  SHOW_SPLASH_SCREEN: true,
  SPLASH_DURATION: 2000, // 2 seconds
  SHOW_LOADING_INDICATOR: true,
  ENABLE_PULL_TO_REFRESH: true,
  ENABLE_SWIPE_NAVIGATION: true,
  
  // Language & Localization
  DEFAULT_LANGUAGE: 'fr',
  SUPPORTED_LANGUAGES: ['fr', 'ar'],
  
  // Storage Keys
  STORAGE_KEYS: {
    USER_PREFERENCES: '@user_preferences',
    BOOKMARKS: '@bookmarks',
    CACHED_DATA: '@cached_data',
    SESSION_DATA: '@session_data',
    THEME: '@theme_mode',
    LANGUAGE: '@language',
  },
  
  // Target SDK
  TARGET_SDK: 34, // Android 14
  MIN_SDK: 23,    // Android 6.0
};

export default APP_CONFIG;
