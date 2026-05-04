// components/CitaCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { Cita, Empleado, Cliente } from '../types';

interface CitaCardProps {
  cita: Cita;
  empleado?: Empleado;
  cliente?: Cliente;
  onPress?: () => void;
}

/**
 * Tarjeta de una cita en el listado del día.
 * Muestra hora, asunto, empleado (color) y nombre del cliente.
 * Si la cita está anulada se muestra atenuada y con badge.
 */
export default function CitaCard({ cita, empleado, cliente, onPress }: CitaCardProps): JSX.Element {
  const color = empleado?.color || '#3B82F6';
  const anulada = !!cita.anulada;

  return (
    <TouchableOpacity
      style={[styles.card, anulada && styles.cardAnulada]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Barra lateral coloreada según el empleado */}
      <View style={[styles.barra, { backgroundColor: color }]} />

      <View style={styles.contenido}>
        <View style={styles.filaSuperior}>
          <Text style={styles.hora}>
            {cita.horaInicio} – {cita.horaFin}
          </Text>
          {anulada ? (
            <View style={styles.chipAnulada}>
              <Text style={styles.chipAnuladaTexto}>ANULADA</Text>
            </View>
          ) : (
            <View style={[styles.chipTipo, { backgroundColor: color }]}>
              <Text style={styles.chipTipoTexto}>{cita.tipo || 'visita'}</Text>
            </View>
          )}
        </View>

        <Text
          style={[styles.asunto, anulada && styles.textoTachado]}
          numberOfLines={1}
        >
          {cita.asunto || '(sin asunto)'}
        </Text>

        {!!cliente && (
          <Text style={styles.cliente}>
            👤 {cliente.nombre}
          </Text>
        )}

        <View style={styles.filaEmpleado}>
          <View style={[styles.dot, { backgroundColor: color }]} />
          <Text style={styles.empleado}>{empleado?.nombre || '—'}</Text>
        </View>

        {!!cita.especificaciones && (
          <Text style={styles.especs} numberOfLines={2}>
            {cita.especificaciones}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  cardAnulada: {
    opacity: 0.55
  },
  barra: {
    width: 6
  },
  contenido: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14
  },
  filaSuperior: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  hora: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569'
  },
  chipTipo: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10
  },
  chipTipoTexto: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'capitalize',
    letterSpacing: 0.3
  },
  chipAnulada: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10
  },
  chipAnuladaTexto: {
    color: '#EF4444',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4
  },
  asunto: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A'
  },
  textoTachado: {
    textDecorationLine: 'line-through'
  },
  cliente: {
    fontSize: 13,
    color: '#475569',
    marginTop: 2
  },
  filaEmpleado: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6
  },
  empleado: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155'
  },
  especs: {
    marginTop: 6,
    fontSize: 12,
    fontStyle: 'italic',
    color: '#64748B'
  }
});
