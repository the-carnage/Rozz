import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import WriteScreen from './screens/WriteScreen';
import ReadScreen from './screens/ReadScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen}
          options={{ title: 'Sign Up' }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerLeft: null, title: 'Rozz' }}
        />
        <Stack.Screen 
          name="Write" 
          component={WriteScreen}
          options={{ title: 'Write Diary' }}
        />
        <Stack.Screen 
          name="Read" 
          component={ReadScreen}
          options={{ title: 'Read Diary' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
