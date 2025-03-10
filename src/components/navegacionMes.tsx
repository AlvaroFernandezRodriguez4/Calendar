import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import BotonDia from './botonDia';

const diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

const NavegacionMes = () => {

  const calcularAnchoItem = () => {
    const margenContenedor = 30;
    const numColumnas = 7;
    const margenPorItem = 10;
    const totalMargenesPorFila = numColumnas * margenPorItem;
    return (anchoPantalla - margenContenedor - totalMargenesPorFila) / numColumnas;
  };

  //Estado para la fecha actual
  const [fechaActual, setFechaActual] = useState<Date>(new Date());

  //Estado para el ancho actual
  const [anchoPantalla, setAnchoPantalla] = useState(Dimensions.get('window').width);


  //Función para avanzar al mes siguiente 
  const siguienteMes = () => {
    const nuevaFecha = new Date(fechaActual);
    nuevaFecha.setMonth(nuevaFecha.getMonth() + 1);
    setFechaActual(nuevaFecha);
  };

  //Función para retroceder mes
  const mesAnterior = () => {
    const nuevaFecha = new Date(fechaActual);
    nuevaFecha.setMonth(nuevaFecha.getMonth() - 1);
    setFechaActual(nuevaFecha);
  };

  //Función para saber el número de días que tiene el mes
  const obtenerDiasEnMes = (fecha: Date) => {
    const año = fecha.getFullYear();
    const mes = fecha.getMonth();
    return new Date(año, mes + 1, 0).getDate();
  };

  //Función que devuelve el nombre del mes en español con la primera letra en mayúscula
  const obtenerNombreMes = (fecha: Date) => {
    const nombreMes = fecha.toLocaleString('es-ES', { month: 'long' });
    return nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);
  };

  //Obtenemos número de días del mes actual
  const numDiasMes = obtenerDiasEnMes(fechaActual);

  //Calculamos en qué día de la semana empieza este mes.
  const primerDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
  let indicePrimerDia = primerDiaMes.getDay();

  //Ajustamos para que Lunes sea 0
  indicePrimerDia = (indicePrimerDia + 6) % 7;

  //Creamos un array de placeholders para los días vacíos
  const espaciosVacios = Array(indicePrimerDia).fill({ isPlaceholder: true });

  //Creamos el array de días
  const diasDelMes = Array.from({ length: numDiasMes }, (item, i) => ({
    day: i + 1,
    isPlaceholder: false,
  }));

  //Unimos los placeholders y los días en un array que le pasaremos al flatlist
  const datosCalendario = [...espaciosVacios, ...diasDelMes];

  //Actualizamos el ancho de la pantalla cuando cambia la orientación
  useEffect(() => {
    const actualizaAnchoPantalla = ({ window }: { window: { width: number } }) => {
      setAnchoPantalla(window.width);
    };

    const subscription = Dimensions.addEventListener('change', actualizaAnchoPantalla);

    return () => {
      subscription?.remove();
    };
  }, []);


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.contenedor}>
        <View style={styles.anchoCompleto}>
          <View style={styles.navegacionMes}>
            <TouchableOpacity onPress={mesAnterior} style={styles.botonNavegacion}>
              <Text style={styles.textoNavegacion}>{'<'}</Text>
            </TouchableOpacity>

            <Text style={styles.titulo}>
              {obtenerNombreMes(fechaActual)} {fechaActual.getFullYear()}
            </Text>

            <TouchableOpacity onPress={siguienteMes} style={styles.botonNavegacion}>
              <Text style={styles.textoNavegacion}>{'>'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filaDiasSemana}>
            {diasSemana.map((dia, index) => (
              <View key={index} style={styles.itemDiaSemana}>
                <Text style={styles.textoDiaSemana}>{dia}</Text>
              </View>
            ))}
          </View>

          <FlatList
            data={datosCalendario}
            keyExtractor={(_item, index) => index.toString()}
            numColumns={7}
            renderItem={({ item }) => (
              <View style={[styles.item, { width: calcularAnchoItem() }]}>
                <BotonDia day={item.day} isPlaceholder={item.isPlaceholder} />
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    marginHorizontal: 16,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  anchoCompleto: {
    width: '100%',
  },
  navegacionMes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  botonNavegacion: {
    padding: 10,
  },
  textoNavegacion: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  titulo: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  filaDiasSemana: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  itemDiaSemana: {
    width: '15%',
    alignItems: 'center',
  },
  textoDiaSemana: {
    fontWeight: '600',
  },
  fila: {
    justifyContent: 'flex-start',
  },
  item: {
    margin: 5,
  },
});

export default NavegacionMes;