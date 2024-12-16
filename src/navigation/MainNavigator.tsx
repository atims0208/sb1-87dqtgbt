import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '../screens/Home';
import Discover from '../screens/Discover';
import LiveStream from '../screens/LiveStream';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Discover':
              iconName = focused ? 'compass' : 'compass-outline';
              break;
            case 'LiveStream':
              iconName = focused ? 'radio' : 'radio-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen 
        name="LiveStream" 
        component={LiveStream}
        options={{
          tabBarLabel: 'Go Live',
        }}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};