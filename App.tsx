import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BotonDia from './src/components/botonDia';

const App = () => (
  <SafeAreaProvider>
    <BotonDia />
  </SafeAreaProvider>
);

export default App;