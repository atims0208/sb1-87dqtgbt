import React from 'react';
import { AppProvider } from './src/context/AppContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { initializeApp } from 'firebase/app';
import Constants from 'expo-constants';

// Initialize Firebase
const firebaseConfig = Constants.expoConfig?.extra?.firebaseConfig;
initializeApp(firebaseConfig);

export default function App() {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
}