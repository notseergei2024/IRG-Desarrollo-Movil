// data/db.js
// Wrapper muy fino sobre AsyncStorage que actúa como "base de datos JSON" local.
//
// Cada "colección" se guarda en su propia clave como un array JSON.
// La primera vez que se ejecuta la app, las colecciones se rellenan con los
// datos del seed (data/seed.js).

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CITAS_SEED, CLIENTES_SEED } from './seed';

const KEY_CITAS = '@agenda:citas';
const KEY_CLIENTES = '@agenda:clientes';
const KEY_INICIALIZADA = '@agenda:inicializada';

/**
 * Inicializa la BD si es la primera vez que se abre la app.
 * (Idempotente — se puede llamar siempre al arrancar.)
 */
export async function initDB() {
  const ya = await AsyncStorage.getItem(KEY_INICIALIZADA);
  if (ya === '1') return;

  await AsyncStorage.multiSet([
    [KEY_CITAS, JSON.stringify(CITAS_SEED)],
    [KEY_CLIENTES, JSON.stringify(CLIENTES_SEED)],
    [KEY_INICIALIZADA, '1']
  ]);
}

// ---------- Operaciones genéricas sobre una colección ----------

async function leer(key) {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.warn('JSON corrupto en', key, e);
    return [];
  }
}

async function escribir(key, data) {
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
const listeners = new Set();

export const dbEvents = {
  on(cb) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  emit() {
    listeners.forEach((cb) => {
      try {
        cb();
      } catch (e) {
        console.warn('listener falló', e);
      }
    });
  }
};
