// services/clientesService.ts
// CRUD de clientes. Aquí el borrado SÍ elimina el cliente físicamente
// (no es una entidad legal/auditable como la cita).

import { DB, dbEvents } from '../data/db';
import type { Cliente, ClienteInput, ClienteUpdate } from '../types';

const nuevoId = (): string =>
  `cli-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

/** Devuelve la lista de clientes ordenada alfabéticamente. */
export async function listarClientes(): Promise<Cliente[]> {
  const all = await DB.leer<Cliente>(DB.KEY_CLIENTES);
  return all.sort((a, b) => a.nombre.localeCompare(b.nombre));
}

/** Devuelve un cliente por id (o undefined). */
export async function getCliente(id: string | null | undefined): Promise<Cliente | undefined> {
  if (!id) return undefined;
  const all = await DB.leer<Cliente>(DB.KEY_CLIENTES);
  return all.find((c) => c.id === id);
}

/** Crea un cliente nuevo. */
export async function crearCliente(data: Partial<ClienteInput>): Promise<Cliente> {
  const todos = await DB.leer<Cliente>(DB.KEY_CLIENTES);
  const cliente: Cliente = {
    id: nuevoId(),
    nombre: '',
    email: '',
    telefono: '',
    notas: '',
    ...data
  };
  todos.push(cliente);
  await DB.escribir<Cliente>(DB.KEY_CLIENTES, todos);
  dbEvents.emit();
  return cliente;
}

/** Actualiza un cliente. */
export async function actualizarCliente(id: string, cambios: ClienteUpdate): Promise<Cliente> {
  const todos = await DB.leer<Cliente>(DB.KEY_CLIENTES);
  const idx = todos.findIndex((c) => c.id === id);
  if (idx === -1) throw new Error(`Cliente ${id} no encontrado`);
  todos[idx] = { ...todos[idx], ...cambios };
  await DB.escribir<Cliente>(DB.KEY_CLIENTES, todos);
  dbEvents.emit();
  return todos[idx];
}

/** Elimina un cliente. */
export async function borrarCliente(id: string): Promise<void> {
  const todos = await DB.leer<Cliente>(DB.KEY_CLIENTES);
  const filtrados = todos.filter((c) => c.id !== id);
  await DB.escribir<Cliente>(DB.KEY_CLIENTES, filtrados);
  dbEvents.emit();
}
