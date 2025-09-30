/**
 * Storage utility functions using AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_CONFIG} from '../constants/config';

/**
 * Save data to storage
 */
export const saveData = async (key: string, value: any): Promise<boolean> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
};

/**
 * Get data from storage
 */
export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};

/**
 * Remove data from storage
 */
export const removeData = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing data:', error);
    return false;
  }
};

/**
 * Clear all storage
 */
export const clearAll = async (): Promise<boolean> => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
};

/**
 * Save user preferences
 */
export const saveUserPreferences = async (preferences: any): Promise<boolean> => {
  return saveData(APP_CONFIG.STORAGE_KEYS.USER_PREFERENCES, preferences);
};

/**
 * Get user preferences
 */
export const getUserPreferences = async (): Promise<any> => {
  return getData(APP_CONFIG.STORAGE_KEYS.USER_PREFERENCES);
};

/**
 * Save bookmarks
 */
export const saveBookmarks = async (bookmarks: string[]): Promise<boolean> => {
  return saveData(APP_CONFIG.STORAGE_KEYS.BOOKMARKS, bookmarks);
};

/**
 * Get bookmarks
 */
export const getBookmarks = async (): Promise<string[]> => {
  const bookmarks = await getData<string[]>(APP_CONFIG.STORAGE_KEYS.BOOKMARKS);
  return bookmarks || [];
};

/**
 * Add bookmark
 */
export const addBookmark = async (url: string): Promise<boolean> => {
  const bookmarks = await getBookmarks();
  if (!bookmarks.includes(url)) {
    bookmarks.push(url);
    return saveBookmarks(bookmarks);
  }
  return true;
};

/**
 * Remove bookmark
 */
export const removeBookmark = async (url: string): Promise<boolean> => {
  const bookmarks = await getBookmarks();
  const updatedBookmarks = bookmarks.filter(b => b !== url);
  return saveBookmarks(updatedBookmarks);
};

/**
 * Check if URL is bookmarked
 */
export const isBookmarked = async (url: string): Promise<boolean> => {
  const bookmarks = await getBookmarks();
  return bookmarks.includes(url);
};

/**
 * Save theme mode
 */
export const saveThemeMode = async (mode: 'light' | 'dark'): Promise<boolean> => {
  return saveData(APP_CONFIG.STORAGE_KEYS.THEME, mode);
};

/**
 * Get theme mode
 */
export const getThemeMode = async (): Promise<'light' | 'dark'> => {
  const mode = await getData<'light' | 'dark'>(APP_CONFIG.STORAGE_KEYS.THEME);
  return mode || 'light';
};

/**
 * Save language
 */
export const saveLanguage = async (language: string): Promise<boolean> => {
  return saveData(APP_CONFIG.STORAGE_KEYS.LANGUAGE, language);
};

/**
 * Get language
 */
export const getLanguage = async (): Promise<string> => {
  const language = await getData<string>(APP_CONFIG.STORAGE_KEYS.LANGUAGE);
  return language || APP_CONFIG.DEFAULT_LANGUAGE;
};

export default {
  saveData,
  getData,
  removeData,
  clearAll,
  saveUserPreferences,
  getUserPreferences,
  saveBookmarks,
  getBookmarks,
  addBookmark,
  removeBookmark,
  isBookmarked,
  saveThemeMode,
  getThemeMode,
  saveLanguage,
  getLanguage,
};
