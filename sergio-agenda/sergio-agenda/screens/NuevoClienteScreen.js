// screens/NuevoClienteScreen.js
// Modal con formulario para crear o editar un cliente.

import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';

import {
  crearCliente,
  actualizarCliente
} from '../services/clientesService';

const PRIMARIO = '#2563EB';

export default function NuevoClienteScreen({ visible, cliente, onClose, onGuardado }) {
  const esEdicion = !!cliente;

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [notas, setNotas] = useState('');

  // Cuando se abre, rellena el formulario con los datos del cliente (si edita)
  // o con valores en blanco (si es nuevo).
  useEffect(() => {
    if (visible) {
      setNombre(cliente?.nombre || '');
      setEmail(cliente?.email || '');
      setTelefono(cliente?.telefono || '');
      setNotas(cliente?.notas || '');
    }
  }, [visible, cliente]);

  const guardar = async () => {
    if (!nombre.trim()) {
      Alert.alert('Falta el nombre', 'El nombre del cliente es obligatorio.');
      return;
    }
    const datos = {
      nombre: nombre.trim(),
      email: email.trim(),
      telefono: telefono.trim(),
      notas: notas.trim()
    };
    try {
      const guardado = esEdicion
        ? await actualizarCliente(cliente.id, datos)
        : await crearCliente(datos);
      onGuardado?.(guardado);
      onClose?.();
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={false}
    >
      <KeyboardAvoidingView
        style={styles.contenedor}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} hitSlop={10}>
            <Text style={styles.cancelar}>Cancelar</Text>
          </TouchableOpacity>
          <Text style={styles.titulo}>
            {esEdicion ? 'Editar cliente' : 'Nuevo cliente'}
          </Text>
          <TouchableOpacity onPress={guardar} hitSlop={10}>
            <Text style={styles.guardar}>Guardar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.body}>
          <Campo label="Nombre *">
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Ej: Javier Martínez"
              placeholderTextColor="#94A3B8"
            />
          </Campo>

          <Campo label="Email">
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="cliente@correo.com"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Campo>

          <Campo label="Teléfono">
            <TextInput
              style={styles.input}
              value={telefono}
              onChangeText={setTelefono}
              placeholder="600 000 000"
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
            />
          </Campo>

          <Campo label="Notas">
            <TextInput
              style={[styles.input, styles.textarea]}
              value={notas}
              onChangeText={setNotas}
              placeholder="Información adicional (opcional)"
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </Campo>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function Campo({ label, children }) {
  return (
    <View style={styles.campo}>
      <Text style={styles.campoLabel}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingTop: 50,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0'
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A'
  },
  cancelar: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600'
  },
  guardar: {
    fontSize: 14,
    color: PRIMARIO,
    fontWeight: '700'
  },
  body: {
    padding: 16,
    paddingBottom: 40
  },
  campo: {
    marginBottom: 14
  },
  campoLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.4
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A'
  },
  textarea: {
    minHeight: 100
  }
});
