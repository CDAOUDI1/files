/**
 * NavigationBar Component
 * Bottom navigation bar with navigation controls
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Text,
} from 'react-native';
import {COLORS} from '../constants/colors';

interface NavigationBarProps {
  canGoBack?: boolean;
  canGoForward?: boolean;
  onBackPress?: () => void;
  onForwardPress?: () => void;
  onHomePress?: () => void;
  onBookmarkPress?: () => void;
  isBookmarked?: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  canGoBack = false,
  canGoForward = false,
  onBackPress,
  onForwardPress,
  onHomePress,
  onBookmarkPress,
  isBookmarked = false,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, !canGoBack && styles.buttonDisabled]}
        onPress={onBackPress}
        disabled={!canGoBack}
        activeOpacity={0.7}>
        <Text style={[styles.icon, !canGoBack && styles.iconDisabled]}>
          ←
        </Text>
        <Text style={[styles.label, !canGoBack && styles.labelDisabled]}>
          Retour
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, !canGoForward && styles.buttonDisabled]}
        onPress={onForwardPress}
        disabled={!canGoForward}
        activeOpacity={0.7}>
        <Text style={[styles.icon, !canGoForward && styles.iconDisabled]}>
          →
        </Text>
        <Text style={[styles.label, !canGoForward && styles.labelDisabled]}>
          Suivant
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onHomePress}
        activeOpacity={0.7}>
        <Text style={styles.icon}>🏠</Text>
        <Text style={styles.label}>Accueil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onBookmarkPress}
        activeOpacity={0.7}>
        <Text style={styles.icon}>{isBookmarked ? '★' : '☆'}</Text>
        <Text style={styles.label}>Favoris</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    ...Platform.select({
      android: {
        elevation: 8,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -2},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
    }),
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  icon: {
    fontSize: 24,
    color: COLORS.primary,
    marginBottom: 4,
  },
  iconDisabled: {
    color: COLORS.disabled,
  },
  label: {
    fontSize: 12,
    color: COLORS.text,
  },
  labelDisabled: {
    color: COLORS.disabled,
  },
});

export default NavigationBar;
