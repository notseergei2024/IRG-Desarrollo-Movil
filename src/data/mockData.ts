import { colors } from '../theme/colors';
import type { RootStackParamList } from '../navigation/types';

export type DashboardStat = {
  key: string;
  title: string;
  accent: string;
  iconName: string;
  watermarkIconName?: string;
  bullets: string[];
};

export type Objective = {
  label: string;
  value: number;
  color: string;
  owner: string;
};

export type AgendaSlot = {
  time: string;
  label?: string;
  detail?: string;
  color?: string;
};

export type MenuItem = {
  label: string;
  route?: keyof RootStackParamList;
};

export type SearchItem = {
  label: string;
  route: keyof RootStackParamList;
  keywords: string[];
};

export type ListCard = {
  title: string;
  subtitle?: string;
  lines?: string[];
};

export type SupportContact = {
  name: string;
  role: string;
  phone: string;
};

export const HOME_DATA = {
  userName: 'Ismael Reghoud MDo',
  greeting: 'Bienvenido',
  agendaButton: 'Agenda',
  stats: [
    {
      key: 'zone',
      title: 'Gestión zona',
      accent: colors.cardGreen,
      iconName: 'MapPin',
      bullets: [
        'Potencial adquisición (seguimiento frecuente)',
        'Calidad relación alta (amigos en zona)',
        'Inmuebles sin contactar > 90 días',
        'Inmuebles nunca contactados',
      ],
    },
    {
      key: 'news',
      title: 'Gestión noticias',
      accent: colors.cardBlue,
      iconName: 'Crown',
      bullets: [
        'Noticias por debajo de 15%',
        'Noticias sin cita de adquisición',
        'Noticias mal gestionadas',
        'Noticias sin prioridad asignada (Alta / Media / Baja)',
      ],
    },
    {
      key: 'orders',
      title: 'Gestión encargos',
      accent: colors.cardOrange,
      iconName: 'Flag',
      bullets: [
        'Cartera TOTAL',
        'Encargos no rebajados en 30 días',
        'Encargos sin cita gestión <= 7 días',
        'Encargos caducados',
      ],
    },
    {
      key: 'requests',
      title: 'Gestión pedidos',
      accent: colors.cardSky,
      iconName: 'Zap',
      bullets: [
        'Pedidos Viable Kiron (seguimiento frecuente)',
        'Pedidos que viven en zona',
        'Pedidos compra oficina (prioridad)',
      ],
    },
  ] satisfies DashboardStat[],
  objectives: [
    { label: 'NT3', value: 0, color: colors.cardGreen, owner: 'alejandro sanchez mijeres' },
    { label: 'NT11', value: 1, color: colors.primary, owner: 'ismael reghoud, alejandro sanchez mijeres' },
    { label: 'IM3', value: 2, color: colors.cardOrange, owner: 'alejandro sanchez mijeres' },
  ] satisfies Objective[],
  agenda: {
    owner: 'Ismael Reghoud',
    date: 'lunes, 27 de abril de 2026',
    slots: [
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
    ] satisfies string[],
    events: [
      { time: '10:00', label: 'Reunión zona', detail: 'Seguimiento potencial adquisición', color: colors.cardGreen },
      { time: '12:30', label: 'Cita encargos', detail: 'Cartera total y caducados', color: colors.cardOrange },
      { time: '16:00', label: 'Pedidos oficina', detail: 'Pedidos compra prioridad', color: colors.cardSky },
    ] satisfies AgendaSlot[],
  },
  training: {
    title: 'Escuela de Formación',
    subtitle: 'Último video publicado',
    team: 'Equipo Oficina',
    authors: ['Alejandro Sanchez Mijeres', 'Ignacio Parreño'],
    duration: '56.4 años, 8 meses',
    tag: 'Qué Hago Cuando mi Cliente Está en la Playa',
    description:
      'Medios de julio y plantamos una mesa fuera del año en la que muchos de nuestros clientes se encuentran de vacaciones.',
  },
};

export type Activity = {
  id: string;
  type: 'call' | 'visit' | 'meeting' | 'task' | 'follow-up';
  title: string;
  description: string;
  time: string;
  date: string;
  status: 'pending' | 'completed' | 'in-progress';
  color: string;
};

export const ACTIVITIES_DATA: Activity[] = [
  {
    id: '1',
    type: 'call',
    title: 'Llamar a Maria Gonzalez',
    description: 'Seguimiento interés piso 3 habitaciones centro',
    time: '09:30',
    date: 'Hoy',
    status: 'completed',
    color: colors.cardGreen,
  },
  {
    id: '2',
    type: 'visit',
    title: 'Visita Apartamento Centro',
    description: 'Enseñar inmueble a Raul Martinez — 120 m²',
    time: '11:00',
    date: 'Hoy',
    status: 'in-progress',
    color: colors.primary,
  },
  {
    id: '3',
    type: 'meeting',
    title: 'Reunión equipo oficina',
    description: 'Revisión semanal cartera y objetivos',
    time: '13:00',
    date: 'Hoy',
    status: 'pending',
    color: colors.cardOrange,
  },
  {
    id: '4',
    type: 'follow-up',
    title: 'Seguimiento Ático Norte',
    description: 'Confirmar disponibilidad y enviar documentación',
    time: '15:30',
    date: 'Hoy',
    status: 'pending',
    color: colors.cardSky,
  },
  {
    id: '5',
    type: 'task',
    title: 'Actualizar fichas inmuebles',
    description: 'Subir nuevas fotografías y ajustar precios',
    time: '17:00',
    date: 'Hoy',
    status: 'pending',
    color: colors.cardBlue,
  },
  {
    id: '6',
    type: 'call',
    title: 'Contactar propietario zona sur',
    description: 'Inmueble sin contactar > 90 días — prioridad alta',
    time: '09:00',
    date: 'Mañana',
    status: 'pending',
    color: colors.cardGreen,
  },
  {
    id: '7',
    type: 'visit',
    title: 'Valoración chalet Las Rozas',
    description: 'Nueva captación — visita de valoración',
    time: '10:30',
    date: 'Mañana',
    status: 'pending',
    color: colors.primary,
  },
];

export const CREATE_DATA = {
  title: 'Pagina creacion',
  cardTitle: 'Estado de la pantalla',
  cardLines: ['Esta pantalla se conectara cuando el compañero termine la implementacion.'],
};

export const SEARCH_DATA = {
  title: 'Buscador',
  placeholder: 'Buscar pantallas...',
  items: [
    { label: 'Dashboard', route: 'Home', keywords: ['home', 'inicio', 'dashboard'] },
    { label: 'Agenda', route: 'Agenda', keywords: ['agenda', 'citas', 'calendario'] },
    { label: 'Resumen', route: 'Insights', keywords: ['resumen', 'insights'] },
    { label: 'Clientes', route: 'Clients', keywords: ['clientes', 'client'] },
    { label: 'Inmuebles', route: 'Properties', keywords: ['inmuebles', 'propiedades'] },
    { label: 'Pedidos', route: 'Requests', keywords: ['pedidos', 'encargos'] },
    { label: 'Relaciones cruce', route: 'CrossRelations', keywords: ['relaciones', 'cruce'] },
    { label: 'Perfil', route: 'Profile', keywords: ['perfil', 'usuario'] },
    { label: 'Soporte', route: 'Support', keywords: ['soporte', 'ayuda'] },
  ] satisfies SearchItem[],
};

export const MENU_DATA = {
  title: 'Menu',
  items: [
    { label: 'Clientes', route: 'Clients' },
    { label: 'Inmuebles', route: 'Properties' },
    { label: 'Pedidos', route: 'Requests' },
    { label: 'Relaciones Cruce', route: 'CrossRelations' },
    { label: 'Tu perfil', route: 'Profile' },
    { label: 'Soporte', route: 'Support' },
    { label: 'Cerrar sesion' },
  ] satisfies MenuItem[],
};

export const CLIENTS_DATA = {
  title: 'Clientes',
  searchPlaceholder: 'Buscar clientes',
  cards: [
    {
      title: 'Maria Gonzalez',
      subtitle: 'Interes: Piso 3 habitaciones',
      lines: ['Telefono: 600 123 456'],
    },
    {
      title: 'Raul Martinez',
      subtitle: 'Interes: Chalet con patio',
      lines: ['Telefono: 600 987 321'],
    },
  ] satisfies ListCard[],
};

export const PROPERTIES_DATA = {
  title: 'Inmuebles',
  searchPlaceholder: 'Buscar inmuebles',
  cards: [
    {
      title: 'Apartamento Centro',
      subtitle: '120 m2 · 3 habitaciones',
      lines: ['Precio: 250.000 €'],
    },
    {
      title: 'Atico Norte',
      subtitle: '90 m2 · 2 habitaciones',
      lines: ['Precio: 210.000 €'],
    },
  ] satisfies ListCard[],
};

export const REQUESTS_DATA: { title: string; subtitle: string; cards: ListCard[] } = {
  title: 'Pedidos',
  subtitle: 'Seccion de pedidos en construccion.',
  cards: [
    {
      title: 'Pedido oficina',
      subtitle: 'Prioridad alta · 16:00',
    },
    {
      title: 'Pedido cliente',
      subtitle: 'Seguimiento semanal · 12:30',
    },
  ],
};

export const CROSS_RELATIONS_DATA: { title: string; subtitle: string; cards: ListCard[] } = {
  title: 'Relaciones Cruce',
  subtitle: 'Referencias y cruces de clientes e inmuebles.',
  cards: [
    {
      title: 'Cruce potencial',
      subtitle: 'Cliente: Maria Gonzalez · Inmueble: Centro',
    },
    {
      title: 'Cruce activo',
      subtitle: 'Cliente: Raul Martinez · Inmueble: Norte',
    },
  ],
};

export const PROFILE_DATA = {
  title: 'Tu perfil',
  name: 'Ismael Reghoud',
  role: 'Asesor inmobiliario',
  office: 'Oficina Centro',
  avatarUrl: 'https://i.pravatar.cc/160?img=12',
};

export const SUPPORT_DATA = {
  title: 'Soporte',
  contacts: [
    { name: 'Ana Torres', role: 'Asesora', phone: '600 111 222' },
    { name: 'Carlos Ruiz', role: 'Asesor', phone: '600 333 444' },
    { name: 'Lucia Perez', role: 'Asesora', phone: '600 555 666' },
    { name: 'Martin Lopez', role: 'Informatico', phone: '600 777 888' },
    { name: 'Sofia Mora', role: 'Fotografa', phone: '600 999 000' },
    { name: 'Nicolas Vega', role: 'Abogado', phone: '600 222 333' },
  ] satisfies SupportContact[],
};