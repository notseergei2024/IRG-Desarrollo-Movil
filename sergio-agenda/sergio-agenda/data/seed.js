// data/seed.js
// Datos iniciales que se vuelcan a la "base de datos" la primera vez que
// se arranca la app (después se persiste en AsyncStorage como JSON).

// Empleados: aquí los dejamos hardcodeados porque son fijos del equipo.
export const EMPLEADOS = [
  { id: 'anis',   nombre: 'Anis',   color: '#3B82F6' }, // azul
  { id: 'luis',   nombre: 'Luis',   color: '#10B981' }, // verde
  { id: 'javier', nombre: 'Javier', color: '#F59E0B' }  // ámbar
];

// Helper para fechas en formato YYYY-MM-DD que usa react-native-calendars.
const f = (yyyy, mm, dd) =>
  `${yyyy}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`;

// ---------- Clientes seed ----------
export const CLIENTES_SEED = [
  { id: 'cli-1',  nombre: 'Carlos Méndez',   email: 'carlos.mendez@mail.com',  telefono: '600 111 222', notas: 'Interesado en alquiler.' },
  { id: 'cli-2',  nombre: 'María Pérez',     email: 'maria.perez@mail.com',    telefono: '600 222 333', notas: 'Cliente recurrente.' },
  { id: 'cli-3',  nombre: 'Jordi Soler',     email: 'jordi.soler@mail.com',    telefono: '600 333 444', notas: '' },
  { id: 'cli-4',  nombre: 'Lucía Romero',    email: 'lucia.romero@mail.com',   telefono: '600 444 555', notas: '' },
  { id: 'cli-5',  nombre: 'Familia Torres',  email: 'torres@mail.com',         telefono: '600 555 666', notas: '4 miembros, buscan piso grande.' },
  { id: 'cli-6',  nombre: 'Ana Vidal',       email: 'ana.vidal@mail.com',      telefono: '600 666 777', notas: '' },
  { id: 'cli-7',  nombre: 'Pablo Ruiz',      email: 'pablo.ruiz@mail.com',     telefono: '600 777 888', notas: '' },
  { id: 'cli-8',  nombre: 'Laura Giménez',   email: 'laura.gimenez@mail.com',  telefono: '600 888 999', notas: '' },
  { id: 'cli-9',  nombre: 'Marc Oliver',     email: 'marc.oliver@mail.com',    telefono: '601 111 222', notas: '' },
  { id: 'cli-10', nombre: 'Sergi Bosch',     email: 'sergi.bosch@mail.com',    telefono: '601 222 333', notas: '' },
  { id: 'cli-11', nombre: 'Núria Martí',     email: 'nuria.marti@mail.com',    telefono: '601 333 444', notas: '' },
  { id: 'cli-12', nombre: 'David López',     email: 'david.lopez@mail.com',    telefono: '601 444 555', notas: '' },
  { id: 'cli-13', nombre: 'Marta Sala',      email: 'marta.sala@mail.com',     telefono: '601 555 666', notas: '' },
  { id: 'cli-14', nombre: 'Familia Puig',    email: 'puig@mail.com',           telefono: '601 666 777', notas: '' }
];

// ---------- Citas seed ----------
// Cada cita ahora referencia a un cliente por id (clienteId) y trae
// asunto + especificaciones (campos que pidió Sergio).
// El campo `anulada` empieza siempre en false.
export const CITAS_SEED = [
  // ----- Abril 2026 (lo que aparecía en la captura web) -----
  { id: '1',  fecha: f(2026, 4, 1),  horaInicio: '10:00', horaFin: '11:00', tipo: 'visita', empleadoId: 'anis',   clienteId: 'cli-1',  asunto: 'Visita Av. Diagonal 312, 2º 1ª', especificaciones: 'Primera visita, interesado en alquiler.', anulada: false },
  { id: '2',  fecha: f(2026, 4, 5),  horaInicio: '17:30', horaFin: '18:30', tipo: 'visita', empleadoId: 'luis',   clienteId: 'cli-2',  asunto: 'Visita C/ Mallorca 145, ático',   especificaciones: 'Cliente repite visita.', anulada: false },
  { id: '3',  fecha: f(2026, 4, 24), horaInicio: '11:00', horaFin: '12:00', tipo: 'visita', empleadoId: 'javier', clienteId: 'cli-3',  asunto: 'Visita C/ Aragó 220, 4º 2ª',       especificaciones: '', anulada: false },
  { id: '4',  fecha: f(2026, 4, 24), horaInicio: '17:00', horaFin: '18:00', tipo: 'visita', empleadoId: 'anis',   clienteId: 'cli-4',  asunto: 'Visita Pg. de Gràcia 89, 3º 1ª',  especificaciones: '', anulada: false },
  { id: '5',  fecha: f(2026, 4, 29), horaInicio: '12:30', horaFin: '13:30', tipo: 'visita', empleadoId: 'luis',   clienteId: 'cli-5',  asunto: 'Visita C/ Provença 178',          especificaciones: 'Familia con dos niños.', anulada: false },
  { id: '6',  fecha: f(2026, 4, 30), horaInicio: '09:30', horaFin: '10:30', tipo: 'visita', empleadoId: 'javier', clienteId: 'cli-6',  asunto: 'Visita Rda. Sant Pere 22, 1º',    especificaciones: '', anulada: false },

  // ----- Mayo 2026 (mes en curso) -----
  { id: '7',  fecha: f(2026, 5, 2),  horaInicio: '10:00', horaFin: '11:00', tipo: 'visita', empleadoId: 'anis',   clienteId: 'cli-7',  asunto: 'Visita C/ València 410, 2º 3ª',   especificaciones: 'Llamó ayer para confirmar.', anulada: false },
  { id: '8',  fecha: f(2026, 5, 2),  horaInicio: '12:00', horaFin: '13:00', tipo: 'visita', empleadoId: 'luis',   clienteId: 'cli-8',  asunto: 'Visita Av. Meridiana 80, ppal',   especificaciones: '', anulada: false },
  { id: '9',  fecha: f(2026, 5, 2),  horaInicio: '17:30', horaFin: '18:30', tipo: 'visita', empleadoId: 'javier', clienteId: 'cli-9',  asunto: 'Visita C/ Casanova 55, 4º 1ª',    especificaciones: '', anulada: false },
  { id: '10', fecha: f(2026, 5, 4),  horaInicio: '11:00', horaFin: '12:00', tipo: 'visita', empleadoId: 'anis',   clienteId: 'cli-10', asunto: 'Visita C/ Còrsega 270',           especificaciones: '', anulada: false },
  { id: '11', fecha: f(2026, 5, 6),  horaInicio: '16:00', horaFin: '17:00', tipo: 'visita', empleadoId: 'luis',   clienteId: 'cli-11', asunto: 'Visita C/ Balmes 412, 3º 2ª',     especificaciones: '', anulada: false },
  { id: '12', fecha: f(2026, 5, 8),  horaInicio: '10:30', horaFin: '11:30', tipo: 'visita', empleadoId: 'javier', clienteId: 'cli-12', asunto: 'Visita Av. Madrid 145, 1º 4ª',    especificaciones: '', anulada: false },
  { id: '13', fecha: f(2026, 5, 12), horaInicio: '18:00', horaFin: '19:00', tipo: 'visita', empleadoId: 'anis',   clienteId: 'cli-13', asunto: 'Visita C/ Roselló 95',            especificaciones: '', anulada: false },
  { id: '14', fecha: f(2026, 5, 15), horaInicio: '09:00', horaFin: '10:00', tipo: 'visita', empleadoId: 'luis',   clienteId: 'cli-14', asunto: 'Visita C/ Calabria 188',          especificaciones: '', anulada: false }
];
