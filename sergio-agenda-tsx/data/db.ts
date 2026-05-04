// data/db.ts
// Wrapper muy fino sobre AsyncStorage que actúa como "base de datos JSON" local.
//
// Cada "colección" se guarda en su propia clave como un array JSON.
// La primera vez que se ejecuta la app, las colecciones se rellenan con los
// datos del seed (data/seed.ts).

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CITAS_SEED, CLIENTES_SEED } from './seed';

const KEY_CITAS = '@agenda:citas';
const KEY_CLIENTES = '@agenda:clientes';
const KEY_INICIALIZADA = '@agenda:inicializada';

/**
 * Inicializa la BD si es la primera vez que se abre la app.
 * (Idempotente — se puede llamar siempre al arrancar.)
 */
export async function initDB(): Promise<void> {
  const ya = await AsyncStorage.getItem(KEY_INICIALIZADA);
  if (ya === '1') return;

  await AsyncStorage.multiSet([
    [KEY_CITAS, JSON.stringify(CITAS_SEED)],
    [KEY_CLIENTES, JSON.stringify(CLIENTES_SEED)],
    [KEY_INICIALIZADA, '1']
  ]);
}

// ---------- Operaciones genéricas sobre una colección ----------

async function leer<T>(key: string): Promise<T[]> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as T[];
  } catch (e) {
    console.warn('JSON corrupto en', key, e);
    return [];
  }
}

async function escribir<T>(key: string, data: T[]): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(data));
}

// Exporto las claves y funciones genéricas para que los servicios las usen.
export const DB = {
  KEY_CITAS,
  KEY_CLIENTES,
  leer,
  escribir
};

/**
 * Helper para eventos: los servicios pueden notificar cambios y los
 * componentes pueden suscribirse para refrescar.
 *
 * Es un mini event-bus para evitar tener que pasar callbacks por todas
 * las pantallas.
 */
type DbEventListener = () => void;
const listeners = new Set<DbEventListener>();

export const dbEvents = {
  on(cb: DbEventListener): () => void {
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  },
  emit(): void {
    listeners.forEach((cb) => {
      try {
        cb();
      } catch (e) {
        console.warn('listener falló', e);
      }
    });
  }
};
