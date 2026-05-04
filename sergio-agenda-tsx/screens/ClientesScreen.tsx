// screens/ClientesScreen.tsx
// Modal-pantalla con la lista de clientes (CRUD).
// - Buscador
// - Tap en una fila → editar
// - Botón "borrar" en cada fila (con confirmación)
// - FAB "+ nuevo cliente"

import React, { useEffect, useState, useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';

import {
  listarClientes,
  borrarCliente
} from '../services/clientesService';
import { dbEvents } from '../data/db';
import NuevoClienteScreen from './NuevoClienteScreen';
import type { Cliente } from '../types';

const PRIMARIO = '#2563EB';

interface ClientesScreenProps {
  visible: boolean;
  onClose: () => void;
  onSeleccionar?: (cliente: Cliente) => void;
}

export default function ClientesScreen({
  visible,
  onClose,
  onSeleccionar
}: ClientesScreenProps): JSX.Element {
  // Si onSeleccionar viene definida, la pantalla actúa como "selector"
  // (al tocar un cliente lo devuelve), si no, actúa como CRUD.
  const modoSelector = typeof onSeleccionar === 'function';

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [busqueda, setBusqueda] = useState<string>('');
  const [editando, setEditando] = useState<Cliente | null>(null); // null | cliente
  const [showForm, setShowForm] = useState<boolean>(false);

  const cargar = useCallback(async () => {
    setClientes(await listarClientes());
  }, []);

  useEffect(() => {
    if (visible) cargar();
  }, [visible, cargar]);

  // Suscripción a cambios en la BD para refrescar al volver del form.
  useEffect(() => {
    return dbEvents.on(cargar);
  }, [cargar]);

  const filtrados = clientes.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const onTapCliente = (cliente: Cliente): void => {
    if (modoSelector && onSeleccionar) {
      onSeleccionar(cliente);
    } else {
      setEditando(cliente);
      setShowForm(true);
    }
  };

  const onBorrar = (cliente: Cliente): void => {
    Alert.alert(
      'Borrar cliente',
      `¿Borrar a ${cliente.nombre}? Esta acción no se puede deshacer.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Borrar',
          style: 'destructive',
          onPress: async () => {
            await borrarCliente(cliente.id);
            cargar();
          }
        }
      ]
    );
  };

  const abrirNuevo = (): void => {
    setEditando(null);
    setShowForm(true);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={false}
    >
      <View style={styles.contenedor}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} hitSlop={10}>
            <Text style={styles.cerrar}>Cerrar</Text>
          </TouchableOpacity>
          <Text style={styles.titulo}>
            {modoSelector ? 'Elegir cliente' : 'Clientes'}
          </Text>
          <View style={{ width: 50 }} />
        </View>

        {/* Buscador */}
        <View style={styles.buscadorWrap}>
          <TextInput
            style={styles.buscador}
            placeholder="Buscar cliente..."
            placeholderTextColor="#94A3B8"
            value={busqueda}
            onChangeText={setBusqueda}
          />
        </View>

        {/* Botón destacado: + Añadir nuevo cliente
            (en el sitio donde antes solo se veía el ejemplo de Javier) */}
        <TouchableOpacity
          style={styles.botonAnadir}
          onPress={abrirNuevo}
          activeOpacity={0.85}
        >
          <Text style={styles.botonAnadirIcono}>+</Text>
          <Text style={styles.botonAnadirTexto}>Añadir nuevo cliente</Text>
        </TouchableOpacity>

        {/* Lista */}
        <FlatList
          data={filtrados}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.lista}
          renderItem={({ item }) => (
            <ClienteRow
              cliente={item}
              onTap={() => onTapCliente(item)}
              onBorrar={modoSelector ? null : () => onBorrar(item)}
            />
          )}
          ListEmptyComponent={
            <View style={styles.vacio}>
              <Text style={styles.vacioEmoji}>👤</Text>
              <Text style={styles.vacioTitulo}>
                {busqueda
                  ? 'Sin resultados'
                  : 'No hay clientes registrados'}
              </Text>
            </View>
          }
        />

        {/* Formulario (modal anidado) */}
        <NuevoClienteScreen
          visible={showForm}
          cliente={editando}
          onClose={() => setShowForm(false)}
          onGuardado={(c) => {
            // Si estamos en modo selector y se acaba de crear, lo devolvemos.
            if (modoSelector && !editando && onSeleccionar) {
              onSeleccionar(c);
            }
          }}
        />
      </View>
    </Modal>
  );
}

interface ClienteRowProps {
  cliente: Cliente;
  onTap: () => void;
  onBorrar: (() => void) | null;
}

function ClienteRow({ cliente, onTap, onBorrar }: ClienteRowProps): JSX.Element {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.rowMain}
        onPress={onTap}
        activeOpacity={0.7}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>
            {cliente.nombre.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.rowDatos}>
          <Text style={styles.rowNombre}>{cliente.nombre}</Text>
          {!!cliente.telefono && (
            <Text style={styles.rowSub}>{cliente.telefono}</Text>
          )}
          {!cliente.telefono && !!cliente.email && (
            <Text style={styles.rowSub}>{cliente.email}</Text>
          )}
        </View>
      </TouchableOpacity>

      {!!onBorrar && (
        <TouchableOpacity
          style={styles.rowBorrar}
          onPress={onBorrar}
          hitSlop={10}
        >
          <Text style={styles.rowBorrarTexto}>×</Text>
        </TouchableOpacity>
      )}
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
  cerrar: {
    fontSize: 14,
    color: PRIMARIO,
    fontWeight: '600'
  },
  buscadorWrap: {
    paddingHorizontal: 16,
    paddingTop: 12
  },
  buscador: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A'
  },
  botonAnadir: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingVertical: 12,
    backgroundColor: PRIMARIO,
    borderRadius: 10
  },
  botonAnadirIcono: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginRight: 8,
    lineHeight: 22
  },
  botonAnadirTexto: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700'
  },
  lista: {
    paddingBottom: 24
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 10,
    overflow: 'hidden'
  },
  rowMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  avatarTexto: {
    color: PRIMARIO,
    fontWeight: '700',
    fontSize: 15
  },
  rowDatos: {
    flex: 1
  },
  rowNombre: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A'
  },
  rowSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2
  },
  rowBorrar: {
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  rowBorrarTexto: {
    color: '#EF4444',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 22
  },
  vacio: {
    alignItems: 'center',
    paddingVertical: 60
  },
  vacioEmoji: {
    fontSize: 36,
    marginBottom: 8
  },
  vacioTitulo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569'
  }
});
