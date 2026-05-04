// data/agenda.js
// DEPRECADO. Los datos iniciales están ahora en data/seed.js y la
// persistencia/CRUD se hace desde services/citasService.js y
// services/clientesService.js. Este archivo se mantiene solo para
// no romper imports antiguos: re-exporta lo necesario.

export { EMPLEADOS, CITAS_SEED as CITAS } from './seed';
