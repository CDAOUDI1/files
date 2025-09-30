/**
 * OfflinePage Component
 * Displays when there's no internet connection
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {COLORS} from '../constants/colors';

interface OfflinePageProps {
  onRetry?: () => void;
}

const OfflinePage: React.FC<OfflinePageProps> = ({onRetry}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📡</Text>
        </View>
        
        <Text style={styles.title}>Pas de connexion Internet</Text>
        
        <Text style={styles.message}>
          Veuillez vérifier votre connexion Internet et réessayer.
        </Text>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Suggestions:</Text>
          <Text style={styles.tip}>• Activez les données mobiles ou le Wi-Fi</Text>
          <Text style={styles.tip}>• Vérifiez le mode avion</Text>
          <Text style={styles.tip}>• Rapprochez-vous d'un routeur Wi-Fi</Text>
        </View>

        {onRetry && (
          <TouchableOpacity
            style={styles.retryButton}
            onPress={onRetry}
            activeOpacity={0.8}>
            <Text style={styles.retryButtonText}>Réessayer</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offlineBg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: COLORS.offlineText,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  tipsContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 16,
    width: '100%',
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  tip: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginVertical: 4,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 200,
  },
  retryButtonText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OfflinePage;
