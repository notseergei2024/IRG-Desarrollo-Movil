// screens/DetalleCitaScreen.tsx
// Modal "bottom sheet" con el detalle de una cita.
// Permite editar o anular (soft delete). Si la cita ya está anulada,
// muestra un botón para reactivarla.

import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';

import { anularCita, reactivarCita } from '../services/citasService';
import { getCliente } from '../services/clientesService';
import { EMPLEADOS } from '../data/seed';
import type { Cita, Cliente } from '../types';

const PRIMARIO = '#2563EB';
const ROJO = '#EF4444';

interface DetalleCitaScreenProps {
  visible: boolean;
  cita: Cita | null;
  onClose: () => void;
  onEditar?: (cita: Cita) => void;
}

export default function DetalleCitaScreen({
  visible,
  cita,
  onClose,
  onEditar
}: DetalleCitaScreenProps): JSX.Element | null {
  const [cliente, setCliente] = useState<Cliente | null>(null);

  useEffect(() => {
    let cancel = false;
    (async () => {
      if (!cita?.clienteId) {
        setCliente(null);
        return;
      }
      const c = await getCliente(cita.clienteId);
      if (!cancel) setCliente(c || null);
    })();
    return () => { cancel = true; };
  }, [cita]);

  if (!cita) return null;

  const empleado = EMPLEADOS.find((e) => e.id === cita.empleadoId);

  const onAnular = (): void => {
    Alert.alert(
      'Anular cita',
      '¿Anular esta cita? Aparecerá tachada y solo será visible si activas "Mostrar citas anuladas".',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Anular',
          style: 'destructive',
          onPress: async () => {
            await anularCita(cita.id);
            onClose?.();
          }
        }
      ]
    );
  };

  const onReactivar = async (): Promise<void> => {
    await reactivarCita(cita.id);
    onClose?.();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View
          style={styles.sheet}
          onStartShouldSetResponder={() => true}
        >
          <View style={styles.handle} />

          {/* Cabecera */}
          <View style={styles.headerSheet}>
            <Text style={styles.tituloAsunto}>
              {cita.asunto || '(Sin asunto)'}
            </Text>
            {cita.anulada && (
              <View style={styles.badgeAnulada}>
                <Text style={styles.badgeAnuladaTexto}>ANULADA</Text>
              </View>
            )}
          </View>

          <FilaInfo etiqueta="Fecha" valor={cita.fecha} />
          <FilaInfo etiqueta="Horario" valor={`${cita.horaInicio} – ${cita.horaFin}`} />
          <FilaInfo
            etiqueta="Empleado"
            valor={empleado?.nombre || '—'}
            color={empleado?.color}
          />
          <FilaInfo
            etiqueta="Cliente"
            valor={cliente?.nombre || '—'}
          />
          {!!cliente?.telefono && (
            <FilaInfo etiqueta="Teléfono" valor={cliente.telefono} />
          )}
          {!!cita.especificaciones && (
            <View style={styles.especs}>
              <Text style={styles.etiqueta}>Especificaciones</Text>
              <Text style={styles.especsTexto}>{cita.especificaciones}</Text>
            </View>
          )}

          {/* Acciones */}
          <View style={styles.acciones}>
            <TouchableOpacity
              style={[styles.boton, styles.botonSec]}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.botonSecTexto}>Cerrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.boton, styles.botonPrim]}
              onPress={() => {
                onClose?.();
                onEditar?.(cita);
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.botonPrimTexto}>Editar</Text>
            </TouchableOpacity>

            {cita.anulada ? (
              <TouchableOpacity
                style={[styles.boton, styles.botonReactivar]}
                onPress={onReactivar}
                activeOpacity={0.8}
              >
                <Text style={styles.botonPrimTexto}>Reactivar</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.boton, styles.botonAnular]}
                onPress={onAnular}
                activeOpacity={0.8}
              >
                <Text style={styles.botonPrimTexto}>Anular</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

interface FilaInfoProps {
  etiqueta: string;
  valor: string;
  color?: string;
}

function FilaInfo({ etiqueta, valor, color }: FilaInfoProps): JSX.Element {
  return (
    <View style={styles.fila}>
      <Text style={styles.etiqueta}>{etiqueta}</Text>
      <View style={styles.valorWrap}>
        {!!color && (
          <View style={[styles.dotEmp, { backgroundColor: color }]} />
        )}
        <Text style={styles.valor}>{valor}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'flex-end'
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
    alignSelf: 'center',
    marginBottom: 14
  },
  headerSheet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14
  },
  tituloAsunto: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A'
  },
  badgeAnulada: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginLeft: 8
  },
  badgeAnuladaTexto: {
    color: ROJO,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.4
  },
  fila: {
    flexDirection: 'row',
    paddingVertical: 6,
    alignItems: 'center'
  },
  etiqueta: {
    width: 110,
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.4
  },
  valorWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  valor: {
    fontSize: 14,
    color: '#0F172A',
    flexShrink: 1
  },
  dotEmp: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6
  },
  especs: {
    marginTop: 8,
    marginBottom: 4
  },
  especsTexto: {
    fontSize: 14,
    color: '#0F172A',
    marginTop: 4,
    lineHeight: 20
  },
  acciones: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 8
  },
  boton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  botonSec: {
    backgroundColor: '#F1F5F9'
  },
  botonSecTexto: {
    color: '#475569',
    fontWeight: '700',
    fontSize: 13
  },
  botonPrim: {
    backgroundColor: PRIMARIO
  },
  botonPrimTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13
  },
  botonAnular: {
    backgroundColor: ROJO
  },
  botonReactivar: {
    backgroundColor: '#10B981'
  }
});
