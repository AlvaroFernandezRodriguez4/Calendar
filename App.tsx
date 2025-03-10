import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/components/screens/HomeScreen';
import AñadirTarea from './src/components/screens/añadirTarea';

export type RootStackParamList = {
  Home: undefined;
  AñadirTarea: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Calndario' }} />
        <Stack.Screen name="AñadirTarea" component={AñadirTarea} options={{ title: 'Tareas' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
