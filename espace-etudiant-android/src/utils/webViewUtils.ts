/**
 * WebView utility functions
 */

import {Platform, Linking} from 'react-native';
import {APP_CONFIG} from '../constants/config';
import {ALLOWED_DOMAINS, EXTERNAL_DOMAINS} from '../constants/urls';

/**
 * Get custom user agent
 */
export const getCustomUserAgent = (): string => {
  const baseUserAgent = Platform.select({
    android: 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36',
    ios: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
    default: 'Mozilla/5.0',
  });
  return `${baseUserAgent} ${APP_CONFIG.USER_AGENT_SUFFIX}`;
};

/**
 * Check if URL should be handled by WebView or external browser
 */
export const shouldHandleInWebView = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;

    // Check if it's an allowed domain
    const isAllowed = ALLOWED_DOMAINS.some(domain =>
      hostname.includes(domain)
    );

    // Check if it's an external domain
    const isExternal = EXTERNAL_DOMAINS.some(domain =>
      hostname.includes(domain)
    );

    return isAllowed && !isExternal;
  } catch (error) {
    console.error('Error parsing URL:', error);
    return false;
  }
};

/**
 * Open URL in external browser
 */
export const openInExternalBrowser = async (url: string): Promise<void> => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error('Cannot open URL:', url);
    }
  } catch (error) {
    console.error('Error opening external URL:', error);
  }
};

/**
 * Extract domain from URL
 */
export const extractDomain = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (error) {
    return '';
  }
};

/**
 * Check if URL is HTTPS
 */
export const isHttps = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:';
  } catch (error) {
    return false;
  }
};

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Get file extension from URL
 */
export const getFileExtension = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const lastDot = pathname.lastIndexOf('.');
    if (lastDot > 0) {
      return pathname.substring(lastDot + 1).toLowerCase();
    }
    return '';
  } catch (error) {
    return '';
  }
};

/**
 * Check if URL points to a downloadable file
 */
export const isDownloadableFile = (url: string): boolean => {
  const downloadableExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'zip', 'rar'];
  const extension = getFileExtension(url);
  return downloadableExtensions.includes(extension);
};

/**
 * Inject JavaScript code to WebView
 */
export const getInjectedJavaScript = (): string => {
  return `
    // Save form data automatically
    (function() {
      const forms = document.querySelectorAll('form');
      forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
          input.addEventListener('change', function() {
            const formData = {};
            inputs.forEach(inp => {
              if (inp.name) {
                formData[inp.name] = inp.value;
              }
            });
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'FORM_DATA',
              data: formData
            }));
          });
        });
      });
    })();

    // Detect external links
    (function() {
      document.addEventListener('click', function(e) {
        const target = e.target.closest('a');
        if (target && target.href) {
          const url = target.href;
          if (url.startsWith('http') && !url.includes('ensabm.usms.ac.ma')) {
            e.preventDefault();
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'EXTERNAL_LINK',
              url: url
            }));
          }
        }
      }, true);
    })();

    true;
  `;
};

export default {
  getCustomUserAgent,
  shouldHandleInWebView,
  openInExternalBrowser,
  extractDomain,
  isHttps,
  isValidUrl,
  getFileExtension,
  isDownloadableFile,
  getInjectedJavaScript,
};
