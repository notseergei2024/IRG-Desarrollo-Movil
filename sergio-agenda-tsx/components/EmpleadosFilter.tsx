// components/EmpleadosFilter.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import type { Empleado } from '../types';

interface EmpleadosFilterProps {
  empleados: Empleado[];
  empleadosActivos: string[];
  onToggle: (id: string) => void;
  onToggleTodos: (activar: boolean) => void;
}

/**
 * Fila horizontal de chips para filtrar la agenda por empleado.
 * Incluye un chip "Todos" que activa o desactiva todos a la vez.
 */
export default function EmpleadosFilter({
  empleados,
  empleadosActivos,
  onToggle,
  onToggleTodos
}: EmpleadosFilterProps): JSX.Element {
  const todosActivos = empleadosActivos.length === empleados.length;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contenedor}
    >
      <Chip
        label="Todos"
        activo={todosActivos}
        color="#0F172A"
        onPress={() => onToggleTodos(!todosActivos)}
      />
      {empleados.map((emp) => {
        const activo = empleadosActivos.includes(emp.id);
        return (
          <Chip
            key={emp.id}
            label={emp.nombre}
            activo={activo}
            color={emp.color}
            onPress={() => onToggle(emp.id)}
          />
        );
      })}
    </ScrollView>
  );
}

interface ChipProps {
  label: string;
  activo: boolean;
  color: string;
  onPress: () => void;
}

function Chip({ label, activo, color, onPress }: ChipProps): JSX.Element {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.chip,
        activo
          ? { backgroundColor: color, borderColor: color }
          : { backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }
      ]}
    >
      <View
        style={[
          styles.dot,
          { backgroundColor: activo ? '#FFFFFF' : color }
        ]}
      />
      <Text
        style={[
          styles.chipTexto,
          { color: activo ? '#FFFFFF' : '#334155' }
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center'
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    borderWidth: 1,
    marginHorizontal: 4
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
  }
});
