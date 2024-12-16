import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../hooks/useAuth';
import { MainNavigator } from './MainNavigator';
import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';
import Comments from '../screens/Comments';
import { LoadingIndicator } from '../components/common/LoadingIndicator';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!user ? (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainNavigator} />
            <Stack.Screen 
              name="Comments" 
              component={Comments}
              options={{
                headerShown: true,
                title: 'Comments',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};