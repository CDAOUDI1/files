/**
 * Main App Component
 * Entry point for the ENSABM Student Space application
 */

import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import MainScreen from './src/screens/MainScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import {COLORS} from './src/constants/colors';
import {initializeNotifications} from './src/services/notificationService';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Initialize app services
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Initialize notifications
      await initializeNotifications();
      
      // Add any other initialization here
      console.log('App initialized successfully');
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  };

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <>
      <StatusBar
        backgroundColor={COLORS.primary}
        barStyle="light-content"
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              headerShown: true,
              title: 'Paramètres',
              headerStyle: {
                backgroundColor: COLORS.primary,
              },
              headerTintColor: COLORS.textLight,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
