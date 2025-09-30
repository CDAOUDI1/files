/**
 * Network utility functions
 */

import NetInfo from '@react-native-community/netinfo';

/**
 * Check if device is connected to internet
 */
export const checkInternetConnection = async (): Promise<boolean> => {
  try {
    const state = await NetInfo.fetch();
    return state.isConnected ?? false;
  } catch (error) {
    console.error('Error checking internet connection:', error);
    return false;
  }
};

/**
 * Get network connection type
 */
export const getConnectionType = async (): Promise<string> => {
  try {
    const state = await NetInfo.fetch();
    return state.type || 'unknown';
  } catch (error) {
    console.error('Error getting connection type:', error);
    return 'unknown';
  }
};

/**
 * Check if connection is fast (wifi or cellular with good connection)
 */
export const isFastConnection = async (): Promise<boolean> => {
  try {
    const state = await NetInfo.fetch();
    if (state.type === 'wifi') {
      return true;
    }
    if (state.type === 'cellular') {
      const effectiveType = state.details?.cellularGeneration;
      return effectiveType === '4g' || effectiveType === '5g';
    }
    return false;
  } catch (error) {
    console.error('Error checking connection speed:', error);
    return false;
  }
};

/**
 * Subscribe to network state changes
 */
export const subscribeToNetworkChanges = (
  callback: (isConnected: boolean) => void
) => {
  const unsubscribe = NetInfo.addEventListener(state => {
    callback(state.isConnected ?? false);
  });
  return unsubscribe;
};

/**
 * Check if URL is reachable
 */
export const isUrlReachable = async (url: string): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.error('URL not reachable:', error);
    return false;
  }
};

export default {
  checkInternetConnection,
  getConnectionType,
  isFastConnection,
  subscribeToNetworkChanges,
  isUrlReachable,
};
