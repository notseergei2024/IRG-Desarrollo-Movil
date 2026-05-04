// screens/AgendaScreen.js
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import { EMPLEADOS } from '../data/seed';
import { initDB, dbEvents } from '../data/db';
import { listarCitas } from '../services/citasService';
import { listarClientes } from '../services/clientesService';

import CitaCard from '../components/CitaCard';
import EmpleadosFilter from '../components/EmpleadosFilter';
import NuevaCitaScreen from './NuevaCitaScreen';
import DetalleCitaScreen from './DetalleCitaScreen';
import ClientesScreen from './ClientesScreen';

// ----- Configuración de idioma del calendario (español) -----
LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  monthNamesShort: [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ],
  dayNames: [
    'Domingo', 'Lunes', 'Martes', 'Miércoles',
    'Jueves', 'Viernes', 'Sábado'
  ],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';

const PRIMARIO = '#2563EB';

// ----- Helpers -----
const hoyISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const formatearFechaLarga = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  const fecha = new Date(y, m - 1, d);
  const loc = LocaleConfig.locales['es'];
  return `${loc.dayNames[fecha.getDay()]}, ${d} de ${loc.monthNames[fecha.getMonth()]} de ${y}`;
};

export default function AgendaScreen() {
  // ---- Estado de datos ----
  const [cargando, setCargando] = useState(true);
  const [citas, setCitas] = useState([]);
  const [clientes, setClientes] = useState([]);

  // ---- Estado de UI ----
  const [diaSeleccionado, setDiaSeleccionado] = useState(hoyISO());
  const [empleadosActivos, setEmpleadosActivos] = useState(
    EMPLEADOS.map((e) => e.id)
  );
  const [verAnuladas, setVerAnuladas] = useState(false);
  const [verOtrasOficinas, setVerOtrasOficinas] = useState(false);

  // ---- Estado de modales ----
  const [showNuevaCita, setShowNuevaCita] = useState(false);
  const [editandoCita, setEditandoCita] = useState(null); // null = crear
  const [detalleCita, setDetalleCita] = useState(null);
  const [showClientes, setShowClientes] = useState(false);

  // ---- Carga inicial + suscripción a cambios en la BD ----
  const recargar = useCallback(async () => {
    const [c, cli] = await Promise.all([listarCitas(), listarClientes()]);
    setCitas(c);
    setClientes(cli);
  }, []);

  useEffect(() => {
    let activo = true;
    (async () => {
      await initDB();
      if (!activo) return;
      await recargar();
      if (activo) setCargando(false);
    })();
    const off = dbEvents.on(recargar);
    return () => {
      activo = false;
      off?.();
    };
  }, [recargar]);

  // ---- Citas filtradas por empleado y "anuladas" ----
  const citasVisibles = useMemo(() => {
    return citas.filter((c) => {
      if (!empleadosActivos.includes(c.empleadoId)) return false;
      if (c.anulada && !verAnuladas) return false;
      return true;
    });
  }, [citas, empleadosActivos, verAnuladas]);

  // ---- Days marcados en el calendario ----
  const markedDates = useMemo(() => {
    const result = {};
    citasVisibles.forEach((c) => {
      const empleado = EMPLEADOS.find((e) => e.id === c.empleadoId);
      result[c.fecha] = {
        marked: true,
        dotColor: c.anulada ? '#CBD5E1' : (empleado?.color || PRIMARIO)
      };
    });
    result[diaSeleccionado] = {
      ...(result[diaSeleccionado] || {}),
      selected: true,
      selectedColor: PRIMARIO,
      selectedTextColor: '#FFFFFF'
    };
    return result;
  }, [citasVisibles, diaSeleccionado]);

  // ---- Citas del día seleccionado ----
  const citasDelDia = useMemo(() => {
    return citasVisibles
      .filter((c) => c.fecha === diaSeleccionado)
      .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));
  }, [citasVisibles, diaSeleccionado]);

  // ---- Acciones ----
  const toggleEmpleado = (id) => {
    setEmpleadosActivos((actuales) =>
      actuales.includes(id)
        ? actuales.filter((x) => x !== id)
        : [...actuales, id]
    );
  };

  const toggleTodos = (activar) => {
    setEmpleadosActivos(activar ? EMPLEADOS.map((e) => e.id) : []);
  };

  const abrirNuevaCita = () => {
    setEditandoCita(null);
    setShowNuevaCita(true);
  };

  const abrirEditarCita = (cita) => {
    setEditandoCita(cita);
    setShowNuevaCita(true);
  };

  // Mapa rápido id → cliente.
  const clientesPorId = useMemo(() => {
    const m = {};
    clientes.forEach((c) => { m[c.id] = c; });
    return m;
  }, [clientes]);

  if (cargando) {
    return (
      <View style={[styles.contenedor, styles.centrado]}>
        <ActivityIndicator size="large" color={PRIMARIO} />
        <Text style={styles.cargandoTexto}>Cargando agenda...</Text>
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.tituloApp}>Agenda</Text>
        <View style={styles.headerBotones}>
          <TouchableOpacity
            style={styles.botonSec}
            onPress={() => setShowClientes(true)}
            activeOpacity={0.85}
          >
            <Text style={styles.botonSecTexto}>Clientes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botonHoy}
            onPress={() => setDiaSeleccionado(hoyISO())}
            activeOpacity={0.85}
          >
            <Text style={styles.botonHoyTexto}>Hoy</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Calendario */}
      <Calendar
        current={diaSeleccionado}
        onDayPress={(day) => setDiaSeleccionado(day.dateString)}
        markedDates={markedDates}
        firstDay={1}
        enableSwipeMonths
        theme={{
          backgroundColor: '#FFFFFF',
          calendarBackground: '#FFFFFF',
          selectedDayBackgroundColor: PRIMARIO,
          selectedDayTextColor: '#FFFFFF',
          todayTextColor: PRIMARIO,
          dayTextColor: '#0F172A',
          textDisabledColor: '#CBD5E1',
          arrowColor: PRIMARIO,
          monthTextColor: '#0F172A',
          textMonthFontWeight: '700',
          textDayFontWeight: '500',
          textDayHeaderFontWeight: '600',
          textMonthFontSize: 16,
          textDayFontSize: 14,
          textDayHeaderFontSize: 12
        }}
      />

      {/* Filtro empleados */}
      <EmpleadosFilter
        empleados={EMPLEADOS}
        empleadosActivos={empleadosActivos}
        onToggle={toggleEmpleado}
        onToggleTodos={toggleTodos}
      />

      {/* Opciones adicionales */}
      <View style={styles.opciones}>
        <Opcion
          label="Mostrar citas anuladas"
          activo={verAnuladas}
          onToggle={() => setVerAnuladas((v) => !v)}
        />
        <Opcion
          label="Citas del franquiciado en otras oficinas"
          activo={verOtrasOficinas}
          onToggle={() => setVerOtrasOficinas((v) => !v)}
        />
      </View>

      {/* Cabecera del día */}
      <View style={styles.encabezadoDia}>
        <Text style={styles.encabezadoDiaTexto}>
          {formatearFechaLarga(diaSeleccionado)}
        </Text>
        <Text style={styles.encabezadoDiaContador}>
          {citasDelDia.length}{' '}
          {citasDelDia.length === 1 ? 'cita' : 'citas'}
        </Text>
      </View>

      {/* Lista de citas */}
      <FlatList
        data={citasDelDia}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <CitaCard
            cita={item}
            empleado={EMPLEADOS.find((e) => e.id === item.empleadoId)}
            cliente={clientesPorId[item.clienteId]}
            onPress={() => setDetalleCita(item)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.vacio}>
            <Text style={styles.vacioEmoji}>📅</Text>
            <Text style={styles.vacioTitulo}>Sin citas este día</Text>
            <Text style={styles.vacioSub}>
              Pulsa el botón “+” para crear una nueva cita.
            </Text>
          </View>
        }
      />

      {/* FAB nueva cita */}
      <TouchableOpacity
        style={styles.fab}
        onPress={abrirNuevaCita}
        activeOpacity={0.85}
      >
        <Text style={styles.fabTexto}>+</Text>
      </TouchableOpacity>

      {/* ----- Modales ----- */}
      <NuevaCitaScreen
        visible={showNuevaCita}
        cita={editandoCita}
        fechaInicial={diaSeleccionado}
        onClose={() => setShowNuevaCita(false)}
        onGuardado={(c) => {
          // Tras guardar, saltar al día de la cita.
          setDiaSeleccionado(c.fecha);
        }}
      />

      <DetalleCitaScreen
        visible={!!detalleCita}
        cita={detalleCita}
        onClose={() => setDetalleCita(null)}
        onEditar={(c) => abrirEditarCita(c)}
      />

      <ClientesScreen
        visible={showClientes}
        onClose={() => setShowClientes(false)}
      />
    </View>
  );
}

// ---- Subcomponente para checkboxes de "Opciones adicionales" ----
function Opcion({ label, activo, onToggle }) {
  return (
    <TouchableOpacity
      style={styles.opcionFila}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.checkbox,
          activo
            ? { backgroundColor: PRIMARIO, borderColor: PRIMARIO }
            : { backgroundColor: '#FFFFFF', borderColor: '#CBD5E1' }
        ]}
      >
        {activo && <Text style={styles.checkboxTick}>✓</Text>}
      </View>
      <Text style={styles.opcionTexto}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  centrado: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  cargandoTexto: {
    marginTop: 12,
    fontSize: 13,
    color: '#64748B'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0'
  },
  tituloApp: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A'
  },
  headerBotones: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  botonSec: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginRight: 8
  },
  botonSecTexto: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '600'
  },
  botonHoy: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: PRIMARIO
  },
  botonHoyTexto: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600'
  },
  opciones: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0'
  },
  opcionFila: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  checkboxTick: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 14
  },
  opcionTexto: {
    fontSize: 13,
    color: '#334155'
  },
  encabezadoDia: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 4
  },
  encabezadoDiaTexto: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1
  },
  encabezadoDiaContador: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B'
  },
  lista: {
    paddingBottom: 100,
    paddingTop: 4
  },
  vacio: {
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 24
  },
  vacioEmoji: {
    fontSize: 36,
    marginBottom: 8
  },
  vacioTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155'
  },
  vacioSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center'
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: PRIMARIO,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6
  },
  fabTexto: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 30
  }
});
