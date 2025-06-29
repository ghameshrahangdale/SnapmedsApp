import * as React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './Navigations/AppNavigator';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';
import { CustomToast } from './Common/CustomToast';

export default function App() {

  useEffect(() => {
  GoogleSignin.configure({
    webClientId: '145929342075-v5t7vu8rp30avumh153t1sfg4ek8lotg.apps.googleusercontent.com',
    offlineAccess: true,
    scopes: ['profile', 'email', 'openid'],
  });
  console.log('Google Signin Configured');
}, []);

  return (
    <NavigationContainer>
      <AppNavigator />
        <Toast config={CustomToast} />
    </NavigationContainer>
  );
}
