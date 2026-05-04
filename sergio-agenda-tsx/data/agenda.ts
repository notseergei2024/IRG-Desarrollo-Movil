// data/agenda.ts
// DEPRECADO. Los datos iniciales están ahora en data/seed.ts y la
// persistencia/CRUD se hace desde services/citasService.ts y
// services/clientesService.ts. Este archivo se mantiene solo para
// no romper imports antiguos: re-exporta lo necesario.

export { EMPLEADOS, CITAS_SEED as CITAS } from './seed';
