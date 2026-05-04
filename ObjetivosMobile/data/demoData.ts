export type Priority = "Alta" | "Media" | "Baja";

export type ObjectiveStatus = "Pendiente" | "Activo" | "Completado" | "Pausado";

export type EmployeeStatus = "warning" | "ok" | "danger";

export type Employee = {
  id: string;
  name: string;
  role: string;
  status: EmployeeStatus;
};

export type Objective = {
  id: string;
  title: string;
  description: string;
};

export type TargetValue = {
  current: number;
  target: number;
};

export type TargetsMap = Record<string, Record<string, TargetValue>>;

export type Agency = {
  id: number;
  name: string;
  office: string;
};

export type AgencyObjective = {
  id: number;
  objectiveId: string;
  description: string;
  current: number;
  target: number;
  priority: Priority;
  status: ObjectiveStatus;
  createdAt: string;
  deadline: string | null;
};

export const demoAgency: Agency = {
  id: 1,
  name: "Agencia Centro Madrid",
  office: "Oficina Principal",
};

export const demoEmployees: Employee[] = [
  {
    id: "EMP1",
    name: "Carlos García",
    role: "AGENTE",
    status: "warning",
  },
  {
    id: "EMP2",
    name: "Marta López",
    role: "RESPONSABLE",
    status: "ok",
  },
  {
    id: "EMP3",
    name: "Antonio Ruiz",
    role: "TITULAR",
    status: "danger",
  },
];

export const demoObjectives: Objective[] = [
  {
    id: "OBJ1",
    title: "OBJ1",
    description: "Ventas totales de agencias en el mes",
  },
  {
    id: "OBJ2",
    title: "OBJ2",
    description: "Captaciones nuevas realizadas",
  },
  {
    id: "OBJ3",
    title: "OBJ3",
    description: "Llamadas comerciales realizadas",
  },
  {
    id: "OBJ4",
    title: "OBJ4",
    description: "Visitas a inmuebles cerradas",
  },
];

export const demoTargets: TargetsMap = {
  EMP1: {
    OBJ1: {
      current: 2,
      target: 5,
    },
    OBJ2: {
      current: 1,
      target: 3,
    },
    OBJ3: {
      current: 12,
      target: 25,
    },
  },
  EMP2: {
    OBJ1: {
      current: 4,
      target: 6,
    },
    OBJ3: {
      current: 18,
      target: 30,
    },
    OBJ4: {
      current: 3,
      target: 8,
    },
  },
  EMP3: {
    OBJ1: {
      current: 1,
      target: 4,
    },
    OBJ2: {
      current: 2,
      target: 4,
    },
    OBJ4: {
      current: 5,
      target: 10,
    },
  },
};

export const demoAgencyObjectives: AgencyObjective[] = [
  {
    id: 1,
    objectiveId: "OBJ1",
    description: "Ventas totales de agencias en el mes",
    current: 7,
    target: 15,
    priority: "Alta",
    status: "Activo",
    createdAt: "2026-05-04",
    deadline: "2026-05-30",
  },
  {
    id: 2,
    objectiveId: "OBJ2",
    description: "Captaciones nuevas realizadas",
    current: 3,
    target: 10,
    priority: "Media",
    status: "Pendiente",
    createdAt: "2026-05-04",
    deadline: "2026-06-15",
  },
];