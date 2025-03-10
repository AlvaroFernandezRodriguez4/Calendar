import React from 'react';
import { View, StyleSheet } from 'react-native';
import NavegacionMes from '../navegacionMes';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <NavegacionMes />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
