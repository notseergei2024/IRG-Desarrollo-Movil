// services/citasService.ts
// CRUD de citas sobre la "BD JSON" (AsyncStorage).
//
// Importante: borrar una cita no la elimina, solo la marca como anulada.
// Las citas anuladas se ven solo si la opción "Mostrar citas anuladas"
// está activa en la pantalla de Agenda.

import { DB, dbEvents } from '../data/db';
import type { Cita, CitaInput, CitaUpdate } from '../types';

/** Genera un id único corto para una cita nueva. */
const nuevoId = (): string =>
  `c-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

/** Devuelve TODAS las citas (incluidas las anuladas). */
export async function listarCitas(): Promise<Cita[]> {
  return DB.leer<Cita>(DB.KEY_CITAS);
}

export interface FiltroCitas {
  empleadosActivos?: string[] | null;   // array de ids o null para no filtrar
  incluirAnuladas?: boolean;
  fecha?: string | null;                // 'YYYY-MM-DD' o null para todas
}

/** Devuelve las citas que coincidan con el filtro dado. */
export async function listarCitasFiltradas({
  empleadosActivos = null,
  incluirAnuladas = false,
  fecha = null
}: FiltroCitas = {}): Promise<Cita[]> {
  const todas = await listarCitas();
  return todas.filter((c) => {
    if (!incluirAnuladas && c.anulada) return false;
    if (empleadosActivos && !empleadosActivos.includes(c.empleadoId)) return false;
    if (fecha && c.fecha !== fecha) return false;
    return true;
  });
}

/** Crea una cita y la guarda. */
export async function crearCita(data: CitaInput): Promise<Cita> {
  const todas = await listarCitas();
  const cita: Cita = {
    id: nuevoId(),
    anulada: false,
    asunto: '',
    especificaciones: '',
    tipo: 'visita',
    ...data
  };
  todas.push(cita);
  await DB.escribir<Cita>(DB.KEY_CITAS, todas);
  dbEvents.emit();
  return cita;
}

/** Actualiza una cita existente (por id) con los campos nuevos. */
export async function actualizarCita(id: string, cambios: CitaUpdate): Promise<Cita> {
  const todas = await listarCitas();
  const idx = todas.findIndex((c) => c.id === id);
  if (idx === -1) throw new Error(`Cita ${id} no encontrada`);
  todas[idx] = { ...todas[idx], ...cambios };
  await DB.escribir<Cita>(DB.KEY_CITAS, todas);
  dbEvents.emit();
  return todas[idx];
}

/**
 * "Borrar" una cita = marcarla como anulada.
 * Las anuladas siguen en la BD pero solo se ven con el filtro activo.
 */
export async function anularCita(id: string): Promise<Cita> {
  return actualizarCita(id, { anulada: true });
}

/** Restaurar una cita anulada. */
export async function reactivarCita(id: string): Promise<Cita> {
  return actualizarCita(id, { anulada: false });
}
