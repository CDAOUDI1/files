/**
 * MainScreen Component
 * Main screen with WebView and navigation
 */

import React, {useRef, useState} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {WebViewNavigation} from 'react-native-webview';
import CustomHeader from '../components/CustomHeader';
import WebViewContainer from '../components/WebViewContainer';
import NavigationBar from '../components/NavigationBar';
import {COLORS} from '../constants/colors';

const MainScreen: React.FC = () => {
  const webViewContainerRef = useRef<any>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('Espace Étudiant ENSABM');

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    
    // Update title based on page title if available
    if (navState.title) {
      setCurrentTitle(navState.title);
    }
  };

  const handleRefresh = () => {
    if (webViewContainerRef.current) {
      webViewContainerRef.current.reload?.();
    }
  };

  const handleBackPress = () => {
    if (webViewContainerRef.current) {
      webViewContainerRef.current.goBack?.();
    }
  };

  const handleForwardPress = () => {
    if (webViewContainerRef.current) {
      webViewContainerRef.current.goForward?.();
    }
  };

  const handleHomePress = () => {
    if (webViewContainerRef.current) {
      webViewContainerRef.current.goHome?.();
    }
  };

  const handleBookmarkPress = () => {
    if (webViewContainerRef.current) {
      webViewContainerRef.current.toggleBookmark?.();
      setIsBookmarked(!isBookmarked);
    }
  };

  const handleMenuPress = () => {
    // TODO: Open side menu or settings
    console.log('Menu pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <CustomHeader
          title={currentTitle}
          onMenuPress={handleMenuPress}
          onRefreshPress={handleRefresh}
          showRefresh={true}
        />

        <WebViewContainer
          ref={webViewContainerRef}
          onNavigationStateChange={handleNavigationStateChange}
        />

        <NavigationBar
          canGoBack={canGoBack}
          canGoForward={canGoForward}
          onBackPress={handleBackPress}
          onForwardPress={handleForwardPress}
          onHomePress={handleHomePress}
          onBookmarkPress={handleBookmarkPress}
          isBookmarked={isBookmarked}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});

export default MainScreen;
