// types.ts
// Tipos compartidos por toda la app.

export interface Empleado {
  id: string;
  nombre: string;
  color: string;
}

export interface Cliente {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  notas: string;
}

export interface Cita {
  id: string;
  fecha: string;        // 'YYYY-MM-DD'
  horaInicio: string;   // 'HH:MM'
  horaFin: string;      // 'HH:MM'
  tipo: string;         // 'visita' | etc.
  empleadoId: string;
  clienteId: string;
  asunto: string;
  especificaciones: string;
  anulada: boolean;
}

/** Datos para crear una cita: id/anulada se rellenan en el servicio. */
export type CitaInput = Omit<Cita, 'id' | 'anulada'> & {
  anulada?: boolean;
};

/** Datos para actualizar una cita (todos los campos opcionales). */
export type CitaUpdate = Partial<Omit<Cita, 'id'>>;

/** Datos para crear un cliente. */
export type ClienteInput = Omit<Cliente, 'id'>;

/** Datos para actualizar un cliente. */
export type ClienteUpdate = Partial<Omit<Cliente, 'id'>>;
