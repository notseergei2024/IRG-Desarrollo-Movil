import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView } from 'react-native';

export default function App() {
  return (
    // SafeAreaView evita que el contenido se tape con el notch (la muesca) del movil
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Aqui es donde cada pareja inyectara sus pantallas o componentes */}
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
  },
});
