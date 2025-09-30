/**
 * WebViewContainer Component
 * Main WebView component with all features
 */

import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  BackHandler,
  RefreshControl,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import WebView, {
  WebViewNavigation,
  WebViewMessageEvent,
} from 'react-native-webview';
import {COLORS} from '../constants/colors';
import {URLS} from '../constants/urls';
import {
  getCustomUserAgent,
  shouldHandleInWebView,
  openInExternalBrowser,
  getInjectedJavaScript,
} from '../utils/webViewUtils';
import {checkInternetConnection} from '../utils/networkUtils';
import {
  addBookmark,
  removeBookmark,
  isBookmarked as checkIsBookmarked,
} from '../utils/storageUtils';
import LoadingScreen from './LoadingScreen';
import OfflinePage from './OfflinePage';

interface WebViewContainerProps {
  url?: string;
  onNavigationStateChange?: (navState: WebViewNavigation) => void;
  onLoadProgress?: (progress: number) => void;
  onError?: () => void;
}

const WebViewContainer: React.FC<WebViewContainerProps> = ({
  url = URLS.STUDENT_SPACE,
  onNavigationStateChange,
  onLoadProgress,
  onError,
}) => {
  const webViewRef = useRef<WebView>(null);
  const [currentUrl, setCurrentUrl] = useState(url);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isOffline, setIsOffline] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Check internet connection on mount
  useEffect(() => {
    checkConnection();
  }, []);

  // Handle Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backHandler.remove();
  }, [canGoBack]);

  // Check if current URL is bookmarked
  useEffect(() => {
    checkBookmarkStatus();
  }, [currentUrl]);

  const checkConnection = async () => {
    const connected = await checkInternetConnection();
    setIsOffline(!connected);
  };

  const checkBookmarkStatus = async () => {
    const bookmarked = await checkIsBookmarked(currentUrl);
    setIsBookmarked(bookmarked);
  };

  const handleBackPress = (): boolean => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    setCurrentUrl(navState.url);

    if (onNavigationStateChange) {
      onNavigationStateChange(navState);
    }
  };

  const handleLoadStart = () => {
    setIsLoading(true);
    setLoadProgress(0);
  };

  const handleLoadProgress = (event: {nativeEvent: {progress: number}}) => {
    const progress = event.nativeEvent.progress;
    setLoadProgress(progress);
    
    if (onLoadProgress) {
      onLoadProgress(progress);
    }
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
    setLoadProgress(1);
  };

  const handleError = () => {
    setIsLoading(false);
    setIsOffline(true);
    
    if (onError) {
      onError();
    }
  };

  const handleShouldStartLoadWithRequest = (
    request: {url: string},
  ): boolean => {
    const {url: requestUrl} = request;

    // Check if URL should be handled in WebView
    if (!shouldHandleInWebView(requestUrl)) {
      openInExternalBrowser(requestUrl);
      return false;
    }

    return true;
  };

  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);

      switch (message.type) {
        case 'EXTERNAL_LINK':
          openInExternalBrowser(message.url);
          break;
        case 'FORM_DATA':
          // Handle form data auto-save
          console.log('Form data:', message.data);
          break;
        default:
          console.log('Unknown message type:', message.type);
      }
    } catch (error) {
      console.error('Error handling WebView message:', error);
    }
  };

  const handleRefresh = () => {
    if (webViewRef.current) {
      setRefreshing(true);
      webViewRef.current.reload();
      setTimeout(() => setRefreshing(false), 1000);
    }
  };

  const handleRetry = async () => {
    await checkConnection();
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const goBack = () => {
    if (webViewRef.current && canGoBack) {
      webViewRef.current.goBack();
    }
  };

  const goForward = () => {
    if (webViewRef.current && canGoForward) {
      webViewRef.current.goForward();
    }
  };

  const goHome = () => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(
        `window.location.href = '${URLS.STUDENT_SPACE}'; true;`,
      );
    }
  };

  const toggleBookmark = async () => {
    if (isBookmarked) {
      await removeBookmark(currentUrl);
      setIsBookmarked(false);
      Alert.alert('Signet supprimé', 'Cette page a été retirée des favoris.');
    } else {
      await addBookmark(currentUrl);
      setIsBookmarked(true);
      Alert.alert('Signet ajouté', 'Cette page a été ajoutée aux favoris.');
    }
  };

  if (isOffline) {
    return <OfflinePage onRetry={handleRetry} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }>
        <View style={styles.webViewContainer}>
          {isLoading && loadProgress < 1 && (
            <LoadingScreen progress={loadProgress} />
          )}
          
          <WebView
            ref={webViewRef}
            source={{uri: currentUrl}}
            style={styles.webView}
            userAgent={getCustomUserAgent()}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
            bounces={true}
            scrollEnabled={true}
            allowsBackForwardNavigationGestures={true}
            allowsLinkPreview={false}
            sharedCookiesEnabled={true}
            thirdPartyCookiesEnabled={true}
            allowFileAccess={true}
            allowFileAccessFromFileURLs={false}
            allowUniversalAccessFromFileURLs={false}
            mixedContentMode="compatibility"
            onNavigationStateChange={handleNavigationStateChange}
            onLoadStart={handleLoadStart}
            onLoadProgress={handleLoadProgress}
            onLoadEnd={handleLoadEnd}
            onError={handleError}
            onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
            onMessage={handleMessage}
            injectedJavaScript={getInjectedJavaScript()}
          />
        </View>
      </ScrollView>

      {/* Expose methods for parent component */}
      {React.useImperativeHandle(
        useRef(),
        () => ({
          goBack,
          goForward,
          goHome,
          reload: handleRefresh,
          toggleBookmark,
          canGoBack,
          canGoForward,
          isBookmarked,
        }),
        [canGoBack, canGoForward, isBookmarked],
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  webViewContainer: {
    flex: 1,
    minHeight: '100%',
  },
  webView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});

export default WebViewContainer;
