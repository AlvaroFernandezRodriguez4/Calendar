import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../App';

interface BotonDiaProps {
  day?: number;
  isPlaceholder?: boolean;
}

const BotonDia = ({ day, isPlaceholder }: BotonDiaProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (isPlaceholder) {
    return <View style={styles.itemPlaceholder} />;
  }

  return (
    <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('AñadirTarea')}>
      <Text style={styles.textoBoton}>{day}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#008080',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  textoBoton: {
    color: 'white',
    textAlign: 'center',
  },
  itemPlaceholder: {
    width: '100%',
    height: 40,
  },
});

export default BotonDia;