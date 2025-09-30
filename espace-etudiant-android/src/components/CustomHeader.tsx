/**
 * CustomHeader Component
 * Header bar with navigation controls and menu
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import {COLORS} from '../constants/colors';
import {APP_CONFIG} from '../constants/config';

interface CustomHeaderProps {
  title?: string;
  onMenuPress?: () => void;
  onRefreshPress?: () => void;
  showRefresh?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title = APP_CONFIG.APP_NAME,
  onMenuPress,
  onRefreshPress,
  showRefresh = true,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuPress = () => {
    setIsMenuOpen(!isMenuOpen);
    if (onMenuPress) {
      onMenuPress();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.header}
        barStyle="light-content"
      />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={handleMenuPress}
          activeOpacity={0.7}>
          <View style={styles.menuIcon}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </View>
        </TouchableOpacity>

        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        {showRefresh && (
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={onRefreshPress}
            activeOpacity={0.7}>
            <Text style={styles.refreshIcon}>⟳</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.header,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: COLORS.header,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  menuLine: {
    width: 24,
    height: 3,
    backgroundColor: COLORS.headerText,
    borderRadius: 2,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.headerText,
    marginHorizontal: 16,
    textAlign: 'center',
  },
  refreshButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshIcon: {
    fontSize: 24,
    color: COLORS.headerText,
    fontWeight: 'bold',
  },
});

export default CustomHeader;
