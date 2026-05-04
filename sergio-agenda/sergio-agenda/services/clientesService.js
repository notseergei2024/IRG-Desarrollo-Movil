// services/clientesService.js
// CRUD de clientes. Aquí el borrado SÍ elimina el cliente físicamente
// (no es una entidad legal/auditable como la cita).

import { DB, dbEvents } from '../data/db';

const nuevoId = () =>
  `cli-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

/** Devuelve la lista de clientes ordenada alfabéticamente. */
export async function listarClientes() {
  const all = await DB.leer(DB.KEY_CLIENTES);
  return all.sort((a, b) => a.nombre.localeCompare(b.nombre));
}

/** Devuelve un cliente por id (o undefined). */
export async function getCliente(id) {
  if (!id) return undefined;
  const all = await DB.leer(DB.KEY_CLIENTES);
  return all.find((c) => c.id === id);
}

/** Crea un cliente nuevo. */
export async function crearCliente(data) {
  const todos = await DB.leer(DB.KEY_CLIENTES);
  const cliente = {
    id: nuevoId(),
    nombre: '',
    email: '',
    telefono: '',
    notas: '',
    ...data
  };
  todos.push(cliente);
  await DB.escribir(DB.KEY_CLIENTES, todos);
  dbEvents.emit();
  return cliente;
}

/** Actualiza un cliente. */
export async function actualizarCliente(id, cambios) {
  const todos = await DB.leer(DB.KEY_CLIENTES);
  const idx = todos.findIndex((c) => c.id === id);
  if (idx === -1) throw new Error(`Cliente ${id} no encontrado`);
  todos[idx] = { ...todos[idx], ...cambios };
  await DB.escribir(DB.KEY_CLIENTES, todos);
  dbEvents.emit();
  return todos[idx];
}

/** Elimina un cliente. */
export async function borrarCliente(id) {
  const todos = await DB.leer(DB.KEY_CLIENTES);
  const filtrados = todos.filter((c) => c.id !== id);
  await DB.escribir(DB.KEY_CLIENTES, filtrados);
  dbEvents.emit();
}
