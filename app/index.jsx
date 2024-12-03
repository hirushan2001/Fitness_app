import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import  Home from './pages/Home';
import Exercise from './pages/Exercise';
const Stack = createStackNavigator();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome}   options={{ headerShown: false }}/>
        <Stack.Screen name="Signin" component={Signin}  options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup}  options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home}  options={{ headerShown: false }} />
        <Stack.Screen name="Exercise" component={Exercise}  options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}
