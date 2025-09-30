/**
 * SettingsScreen Component
 * Settings and preferences screen
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import {COLORS} from '../constants/colors';
import {APP_CONFIG} from '../constants/config';
import {
  getThemeMode,
  saveThemeMode,
  getLanguage,
  saveLanguage,
  clearAll,
} from '../utils/storageUtils';
import {clearCache, getCacheStats} from '../services/cacheService';

const SettingsScreen: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [cacheSize, setCacheSize] = useState(0);
  const [cacheEntries, setCacheEntries] = useState(0);

  useEffect(() => {
    loadSettings();
    loadCacheStats();
  }, []);

  const loadSettings = async () => {
    const theme = await getThemeMode();
    const lang = await getLanguage();
    setIsDarkMode(theme === 'dark');
    setLanguage(lang);
  };

  const loadCacheStats = async () => {
    const stats = await getCacheStats();
    setCacheSize(stats.totalSize);
    setCacheEntries(stats.entryCount);
  };

  const handleThemeToggle = async (value: boolean) => {
    setIsDarkMode(value);
    await saveThemeMode(value ? 'dark' : 'light');
  };

  const handleLanguageChange = async (lang: string) => {
    setLanguage(lang);
    await saveLanguage(lang);
  };

  const handleClearCache = async () => {
    Alert.alert(
      'Effacer le cache',
      'Êtes-vous sûr de vouloir effacer le cache ?',
      [
        {text: 'Annuler', style: 'cancel'},
        {
          text: 'Effacer',
          style: 'destructive',
          onPress: async () => {
            await clearCache();
            await loadCacheStats();
            Alert.alert('Succès', 'Le cache a été effacé.');
          },
        },
      ],
    );
  };

  const handleClearAllData = async () => {
    Alert.alert(
      'Effacer toutes les données',
      'Cette action supprimera tous vos paramètres et données sauvegardées. Continuer ?',
      [
        {text: 'Annuler', style: 'cancel'},
        {
          text: 'Effacer tout',
          style: 'destructive',
          onPress: async () => {
            await clearAll();
            await loadSettings();
            await loadCacheStats();
            Alert.alert('Succès', 'Toutes les données ont été effacées.');
          },
        },
      ],
    );
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Apparence</Text>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Mode sombre</Text>
          <Switch
            value={isDarkMode}
            onValueChange={handleThemeToggle}
            trackColor={{false: COLORS.disabled, true: COLORS.primary}}
            thumbColor={isDarkMode ? COLORS.secondary : COLORS.background}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Langue</Text>
        
        <TouchableOpacity
          style={[
            styles.languageButton,
            language === 'fr' && styles.languageButtonActive,
          ]}
          onPress={() => handleLanguageChange('fr')}>
          <Text
            style={[
              styles.languageButtonText,
              language === 'fr' && styles.languageButtonTextActive,
            ]}>
            Français
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.languageButton,
            language === 'ar' && styles.languageButtonActive,
          ]}
          onPress={() => handleLanguageChange('ar')}>
          <Text
            style={[
              styles.languageButtonText,
              language === 'ar' && styles.languageButtonTextActive,
            ]}>
            العربية
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Stockage</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Taille du cache:</Text>
          <Text style={styles.infoValue}>{formatBytes(cacheSize)}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Entrées en cache:</Text>
          <Text style={styles.infoValue}>{cacheEntries}</Text>
        </View>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleClearCache}>
          <Text style={styles.actionButtonText}>Effacer le cache</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.dangerButton]}
          onPress={handleClearAllData}>
          <Text style={[styles.actionButtonText, styles.dangerButtonText]}>
            Effacer toutes les données
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>À propos</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Version:</Text>
          <Text style={styles.infoValue}>{APP_CONFIG.APP_VERSION}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Package:</Text>
          <Text style={styles.infoValue}>{APP_CONFIG.PACKAGE_NAME}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2024 ENSA Béni Mellal
        </Text>
        <Text style={styles.footerText}>
          Tous droits réservés
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  section: {
    backgroundColor: COLORS.background,
    marginVertical: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingLabel: {
    fontSize: 16,
    color: COLORS.text,
  },
  languageButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginVertical: 4,
  },
  languageButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  languageButtonText: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center',
  },
  languageButtonTextActive: {
    color: COLORS.textLight,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  actionButtonText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dangerButton: {
    backgroundColor: COLORS.error,
  },
  dangerButtonText: {
    color: COLORS.textLight,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginVertical: 2,
  },
});

export default SettingsScreen;
