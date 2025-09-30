/**
 * Cache service for managing WebView cache
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_CONFIG} from '../constants/config';

interface CacheEntry {
  url: string;
  data: string;
  timestamp: number;
  size: number;
}

const CACHE_PREFIX = '@cache_';
const CACHE_INDEX_KEY = '@cache_index';
const MAX_CACHE_SIZE = APP_CONFIG.CACHE_SIZE_MB * 1024 * 1024; // Convert MB to bytes
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Get cache index
 */
const getCacheIndex = async (): Promise<string[]> => {
  try {
    const indexJson = await AsyncStorage.getItem(CACHE_INDEX_KEY);
    return indexJson ? JSON.parse(indexJson) : [];
  } catch (error) {
    console.error('Error getting cache index:', error);
    return [];
  }
};

/**
 * Update cache index
 */
const updateCacheIndex = async (index: string[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(CACHE_INDEX_KEY, JSON.stringify(index));
  } catch (error) {
    console.error('Error updating cache index:', error);
  }
};

/**
 * Calculate total cache size
 */
const getTotalCacheSize = async (): Promise<number> => {
  try {
    const index = await getCacheIndex();
    let totalSize = 0;

    for (const key of index) {
      const entryJson = await AsyncStorage.getItem(CACHE_PREFIX + key);
      if (entryJson) {
        const entry: CacheEntry = JSON.parse(entryJson);
        totalSize += entry.size;
      }
    }

    return totalSize;
  } catch (error) {
    console.error('Error calculating cache size:', error);
    return 0;
  }
};

/**
 * Remove oldest cache entries to free up space
 */
const evictOldestEntries = async (requiredSpace: number): Promise<void> => {
  try {
    const index = await getCacheIndex();
    const entries: CacheEntry[] = [];

    // Load all cache entries
    for (const key of index) {
      const entryJson = await AsyncStorage.getItem(CACHE_PREFIX + key);
      if (entryJson) {
        entries.push(JSON.parse(entryJson));
      }
    }

    // Sort by timestamp (oldest first)
    entries.sort((a, b) => a.timestamp - b.timestamp);

    let freedSpace = 0;
    const keysToRemove: string[] = [];

    // Remove oldest entries until we have enough space
    for (const entry of entries) {
      if (freedSpace >= requiredSpace) {
        break;
      }
      keysToRemove.push(entry.url);
      freedSpace += entry.size;
    }

    // Remove entries
    for (const key of keysToRemove) {
      await AsyncStorage.removeItem(CACHE_PREFIX + key);
    }

    // Update index
    const newIndex = index.filter(key => !keysToRemove.includes(key));
    await updateCacheIndex(newIndex);
  } catch (error) {
    console.error('Error evicting cache entries:', error);
  }
};

/**
 * Cache data for a URL
 */
export const cacheData = async (url: string, data: string): Promise<void> => {
  try {
    if (!APP_CONFIG.ENABLE_CACHE) {
      return;
    }

    const dataSize = new Blob([data]).size;
    const totalSize = await getTotalCacheSize();

    // Check if we need to evict old entries
    if (totalSize + dataSize > MAX_CACHE_SIZE) {
      await evictOldestEntries(dataSize);
    }

    const entry: CacheEntry = {
      url,
      data,
      timestamp: Date.now(),
      size: dataSize,
    };

    await AsyncStorage.setItem(CACHE_PREFIX + url, JSON.stringify(entry));

    // Update index
    const index = await getCacheIndex();
    if (!index.includes(url)) {
      index.push(url);
      await updateCacheIndex(index);
    }
  } catch (error) {
    console.error('Error caching data:', error);
  }
};

/**
 * Get cached data for a URL
 */
export const getCachedData = async (url: string): Promise<string | null> => {
  try {
    if (!APP_CONFIG.ENABLE_CACHE) {
      return null;
    }

    const entryJson = await AsyncStorage.getItem(CACHE_PREFIX + url);
    if (!entryJson) {
      return null;
    }

    const entry: CacheEntry = JSON.parse(entryJson);

    // Check if cache has expired
    if (Date.now() - entry.timestamp > CACHE_EXPIRY) {
      await removeCachedData(url);
      return null;
    }

    return entry.data;
  } catch (error) {
    console.error('Error getting cached data:', error);
    return null;
  }
};

/**
 * Remove cached data for a URL
 */
export const removeCachedData = async (url: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(CACHE_PREFIX + url);

    // Update index
    const index = await getCacheIndex();
    const newIndex = index.filter(key => key !== url);
    await updateCacheIndex(newIndex);
  } catch (error) {
    console.error('Error removing cached data:', error);
  }
};

/**
 * Clear all cache
 */
export const clearCache = async (): Promise<void> => {
  try {
    const index = await getCacheIndex();

    // Remove all cached entries
    for (const key of index) {
      await AsyncStorage.removeItem(CACHE_PREFIX + key);
    }

    // Clear index
    await AsyncStorage.removeItem(CACHE_INDEX_KEY);
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

/**
 * Get cache statistics
 */
export const getCacheStats = async (): Promise<{
  totalSize: number;
  entryCount: number;
  maxSize: number;
}> => {
  try {
    const totalSize = await getTotalCacheSize();
    const index = await getCacheIndex();

    return {
      totalSize,
      entryCount: index.length,
      maxSize: MAX_CACHE_SIZE,
    };
  } catch (error) {
    console.error('Error getting cache stats:', error);
    return {
      totalSize: 0,
      entryCount: 0,
      maxSize: MAX_CACHE_SIZE,
    };
  }
};

export default {
  cacheData,
  getCachedData,
  removeCachedData,
  clearCache,
  getCacheStats,
};
