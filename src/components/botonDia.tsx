import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;
const containerMargin = 30;
const numColumns = 7;
const itemMarginPerItem = 10;
const totalItemMarginsPerRow = numColumns * itemMarginPerItem;
const itemWidth = (screenWidth - containerMargin - totalItemMarginsPerRow) / numColumns;

const months = [
  { name: 'Enero', days: 31 },
  { name: 'Febrero', days: 28 }, 
  { name: 'Marzo', days: 31 },
  { name: 'Abril', days: 30 },
  { name: 'Mayo', days: 31 },
  { name: 'Junio', days: 30 },
  { name: 'Julio', days: 31 },
  { name: 'Agosto', days: 31 },
  { name: 'Septiembre', days: 30 },
  { name: 'Octubre', days: 31 },
  { name: 'Noviembre', days: 30 },
  { name: 'Diciembre', days: 31 },
];

const DayButton = ({ day }: { day: number }) => (
  <TouchableOpacity
    style={styles.button}
    onPress={() => Alert.alert(`Día ${day} seleccionado`)}>
    <Text style={styles.buttonText}>{day}</Text>
  </TouchableOpacity>
);

const BotonDia = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  const nextMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex + 1) % months.length);
  };

  const prevMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex - 1 + months.length) % months.length);
  };

  const days = Array.from({ length: months[currentMonthIndex].days }, (_, i) => i + 1);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.fullWidth}>
          {/* Sección de navegación de meses */}
          <View style={styles.monthNav}>
            <TouchableOpacity onPress={prevMonth} style={styles.navButton}>
              <Text style={styles.navText}>◀</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{months[currentMonthIndex].name}</Text>
            <TouchableOpacity onPress={nextMonth} style={styles.navButton}>
              <Text style={styles.navText}>▶</Text>
            </TouchableOpacity>
          </View>

          {/* Lista de días */}
          <FlatList
            data={days}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <DayButton day={item} />
              </View>
            )}
            numColumns={7}
            columnWrapperStyle={styles.row}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 16,
  },
  fullWidth: {
    width: '100%',
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  navButton: {
    padding: 10,
  },
  navText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    justifyContent: 'flex-start',
  },
  item: {
    margin: 5,
    width: itemWidth,
  },
  button: {
    backgroundColor: '#008080',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default BotonDia;
