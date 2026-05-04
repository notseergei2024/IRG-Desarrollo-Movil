// screens/NuevaCitaScreen.tsx
// Modal con formulario para crear o editar una cita.
// Campos: fecha, hora inicio/fin, asunto, especificaciones, empleado, cliente.

import React, { useEffect, useState, ReactNode } from 'react';
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
  Alert,
  StyleProp,
  ViewStyle
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import {
  crearCita,
  actualizarCita
} from '../services/citasService';
import { getCliente } from '../services/clientesService';
import { EMPLEADOS } from '../data/seed';
import ClientesScreen from './ClientesScreen';
import type { Cita, Cliente } from '../types';

const PRIMARIO = '#2563EB';

// Validación rápida de hora "HH:MM" (00-23 : 00-59)
const horaValida = (h: string): boolean => /^([01]\d|2[0-3]):[0-5]\d$/.test(h);

interface NuevaCitaScreenProps {
  visible: boolean;
  cita?: Cita | null;            // null = nueva, objeto = edición
  fechaInicial?: string | null;  // 'YYYY-MM-DD' opcional para precargar la fecha
  onClose: () => void;
  onGuardado?: (c: Cita) => void;
}

export default function NuevaCitaScreen({
  visible,
  cita,
  fechaInicial,
  onClose,
  onGuardado
}: NuevaCitaScreenProps): JSX.Element {
  const esEdicion = !!cita;

  const [fecha, setFecha] = useState<string>('');
  const [horaInicio, setHoraInicio] = useState<string>('10:00');
  const [horaFin, setHoraFin] = useState<string>('11:00');
  const [asunto, setAsunto] = useState<string>('');
  const [especificaciones, setEspecificaciones] = useState<string>('');
  const [empleadoId, setEmpleadoId] = useState<string>(EMPLEADOS[0].id);
  const [clienteId, setClienteId] = useState<string | null>(null);
  const [clienteCache, setClienteCache] = useState<Cliente | null>(null);

  const [showCalendario, setShowCalendario] = useState<boolean>(false);
  const [showClientes, setShowClientes] = useState<boolean>(false);

  // Carga inicial al abrir.
  useEffect(() => {
    if (!visible) return;
    if (esEdicion && cita) {
      setFecha(cita.fecha);
      setHoraInicio(cita.horaInicio);
      setHoraFin(cita.horaFin);
      setAsunto(cita.asunto || '');
      setEspecificaciones(cita.especificaciones || '');
      setEmpleadoId(cita.empleadoId);
      setClienteId(cita.clienteId);
    } else {
      setFecha(fechaInicial || hoyISO());
      setHoraInicio('10:00');
      setHoraFin('11:00');
      setAsunto('');
      setEspecificaciones('');
      setEmpleadoId(EMPLEADOS[0].id);
      setClienteId(null);
    }
  }, [visible, cita, fechaInicial, esEdicion]);

  // Resuelve el objeto cliente seleccionado (para mostrar el nombre).
  useEffect(() => {
    let cancel = false;
    (async () => {
      if (!clienteId) {
        setClienteCache(null);
        return;
      }
      const c = await getCliente(clienteId);
      if (!cancel) setClienteCache(c || null);
    })();
    return () => { cancel = true; };
  }, [clienteId]);

  const guardar = async (): Promise<void> => {
    if (!fecha) return Alert.alert('Falta la fecha', 'Elige una fecha.');
    if (!horaValida(horaInicio) || !horaValida(horaFin))
      return Alert.alert('Hora no válida', 'Usa el formato HH:MM (24h).');
    if (horaFin <= horaInicio)
      return Alert.alert('Horas incoherentes', 'La hora de fin debe ser posterior a la de inicio.');
    if (!asunto.trim()) return Alert.alert('Falta el asunto', 'Indica un asunto para la cita.');
    if (!clienteId) return Alert.alert('Falta el cliente', 'Selecciona o crea un cliente.');

    const datos = {
      fecha,
      horaInicio,
      horaFin,
      asunto: asunto.trim(),
      especificaciones: especificaciones.trim(),
      empleadoId,
      clienteId,
      tipo: 'visita'
    };

    try {
      const guardada = esEdicion && cita
        ? await actualizarCita(cita.id, datos)
        : await crearCita(datos);
      onGuardado?.(guardada);
      onClose?.();
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Error desconocido';
      Alert.alert('Error', msg);
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
            {esEdicion ? 'Editar cita' : 'Nueva cita'}
          </Text>
          <TouchableOpacity onPress={guardar} hitSlop={10}>
            <Text style={styles.guardar}>Guardar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.body}>
          {/* Fecha */}
          <Campo label="Fecha *">
            <TouchableOpacity
              style={styles.selector}
              onPress={() => setShowCalendario(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.selectorTexto}>
                {fecha ? formatearFechaLarga(fecha) : 'Elegir fecha'}
              </Text>
              <Text style={styles.selectorChevron}>›</Text>
            </TouchableOpacity>
          </Campo>

          {/* Horas */}
          <View style={styles.fila}>
            <Campo label="Hora inicio" estilo={{ flex: 1, marginRight: 6 }}>
              <TextInput
                style={styles.input}
                value={horaInicio}
                onChangeText={setHoraInicio}
                placeholder="HH:MM"
                placeholderTextColor="#94A3B8"
                maxLength={5}
              />
            </Campo>
            <Campo label="Hora fin" estilo={{ flex: 1, marginLeft: 6 }}>
              <TextInput
                style={styles.input}
                value={horaFin}
                onChangeText={setHoraFin}
                placeholder="HH:MM"
                placeholderTextColor="#94A3B8"
                maxLength={5}
              />
            </Campo>
          </View>

          {/* Asunto */}
          <Campo label="Asunto *">
            <TextInput
              style={styles.input}
              value={asunto}
              onChangeText={setAsunto}
              placeholder="Ej: Visita C/ Mallorca 145"
              placeholderTextColor="#94A3B8"
            />
          </Campo>

          {/* Especificaciones */}
          <Campo label="Especificaciones">
            <TextInput
              style={[styles.input, styles.textarea]}
              value={especificaciones}
              onChangeText={setEspecificaciones}
              placeholder="Detalles, contexto, lo que sea relevante..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </Campo>

          {/* Empleado */}
          <Campo label="Empleado">
            <View style={styles.chipsFila}>
              {EMPLEADOS.map((emp) => {
                const activo = emp.id === empleadoId;
                return (
                  <TouchableOpacity
                    key={emp.id}
                    onPress={() => setEmpleadoId(emp.id)}
                    activeOpacity={0.8}
                    style={[
                      styles.chip,
                      activo
                        ? { backgroundColor: emp.color, borderColor: emp.color }
                        : { backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }
                    ]}
                  >
                    <View
                      style={[
                        styles.dot,
                        { backgroundColor: activo ? '#FFFFFF' : emp.color }
                      ]}
                    />
                    <Text
                      style={[
                        styles.chipTexto,
                        { color: activo ? '#FFFFFF' : '#334155' }
                      ]}
                    >
                      {emp.nombre}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Campo>

          {/* Cliente */}
          <Campo label="Cliente *">
            <TouchableOpacity
              style={styles.selector}
              onPress={() => setShowClientes(true)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.selectorTexto,
                  !clienteCache && { color: '#94A3B8' }
                ]}
              >
                {clienteCache ? clienteCache.nombre : 'Elegir cliente'}
              </Text>
              <Text style={styles.selectorChevron}>›</Text>
            </TouchableOpacity>
          </Campo>
        </ScrollView>

        {/* Modal calendario para elegir fecha */}
        <Modal
          visible={showCalendario}
          animationType="fade"
          transparent
          onRequestClose={() => setShowCalendario(false)}
        >
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setShowCalendario(false)}
          >
            <View style={styles.calendarioCard} onStartShouldSetResponder={() => true}>
              <Text style={styles.calendarioTitulo}>Elegir fecha</Text>
              <Calendar
                current={fecha || hoyISO()}
                onDayPress={(d) => {
                  setFecha(d.dateString);
                  setShowCalendario(false);
                }}
                markedDates={fecha ? {
                  [fecha]: { selected: true, selectedColor: PRIMARIO }
                } : {}}
                firstDay={1}
                theme={{
                  selectedDayBackgroundColor: PRIMARIO,
                  todayTextColor: PRIMARIO,
                  arrowColor: PRIMARIO,
                  monthTextColor: '#0F172A'
                }}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Selector de cliente (CRUD reusado en modo selector) */}
        <ClientesScreen
          visible={showClientes}
          onClose={() => setShowClientes(false)}
          onSeleccionar={(c) => {
            setClienteId(c.id);
            setShowClientes(false);
          }}
        />
      </KeyboardAvoidingView>
    </Modal>
  );
}

// ---------- Helpers locales ----------

interface CampoProps {
  label: string;
  children: ReactNode;
  estilo?: StyleProp<ViewStyle>;
}

function Campo({ label, children, estilo }: CampoProps): JSX.Element {
  return (
    <View style={[styles.campo, estilo]}>
      <Text style={styles.campoLabel}>{label}</Text>
      {children}
    </View>
  );
}

function hoyISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

interface LocaleEs {
  monthNames: string[];
  dayNames: string[];
}

function formatearFechaLarga(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const fecha = new Date(y, m - 1, d);
  const loc = (LocaleConfig.locales['es'] || LocaleConfig.locales['']) as LocaleEs | undefined;
  if (!loc) return iso;
  return `${loc.dayNames[fecha.getDay()]}, ${d} de ${loc.monthNames[fecha.getMonth()]} de ${y}`;
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
  fila: {
    flexDirection: 'row'
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
  },
  selector: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  selectorTexto: {
    fontSize: 14,
    color: '#0F172A',
    flex: 1
  },
  selectorChevron: {
    fontSize: 22,
    color: '#94A3B8',
    marginLeft: 8,
    lineHeight: 22
  },
  chipsFila: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 6
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6
  },
  chipTexto: {
    fontSize: 13,
    fontWeight: '600'
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  calendarioCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    paddingTop: 16
  },
  calendarioTitulo: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginLeft: 6,
    marginBottom: 4
  }
});
