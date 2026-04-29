import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView } from 'react-native';

export default function App() {
  return (
    // SafeAreaView evita que el contenido se tape con el notch (la muesca) del móvil
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Aquí es donde cada pareja inyectará sus pantallas o componentes */}
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Un gris muy claro es más profesional que el blanco puro
  },
  content: {
    flex: 1,
    // Eliminamos alignItems y justifyContent center 
    // para que el contenido empiece arriba a la izquierda por defecto
  },
});