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



export type Property = {
  id: string;
  code: string;
  estadoInmueble: string;
  propietario: string;
  telPropietario: string;
  direccionCompleta: string;
  diasUltimoContacto: number | null;
  ocupadoPor: string | null;
  resumenZona: string;
  informadorRelacionado: string | null;
  potencialAdquisicion: boolean;
  propietarioLocal: boolean;
  category: string;
};

export type PropertyCategory = {
  key: string;
  label: string;
  count: number;
};

export const PROPERTY_CATEGORIES: PropertyCategory[] = [
  { key: 'inmuebles', label: 'Inmuebles', count: 3 },
  { key: 'noticia', label: 'Noticia', count: 2 },
  { key: 'encargos_activos', label: 'Encargos activos', count: 2 },
  { key: 'complejo', label: 'Complejo', count: 3 },
  { key: 'edificio', label: 'Edificio', count: 1 },
  { key: 'potencial_adquisicion', label: 'Inmuebles Potencial Adquisición', count: 2 },
  { key: 'noticias_cerradas', label: 'Noticias cerradas', count: 1 },
  { key: 'encargos_cerrados', label: 'Encargos cerrados', count: 1 },
];

export const ALL_PROPERTIES: Property[] = [
  
  {
    id: '1',
    code: 'INM-000003',
    estadoInmueble: 'Obra nueva',
    propietario: 'Cliente Test',
    telPropietario: '604765321',
    direccionCompleta: 'Calle Rosa 8',
    diasUltimoContacto: null,
    ocupadoPor: null,
    resumenZona: 'Zona residencial tranquila',
    informadorRelacionado: null,
    potencialAdquisicion: true,
    propietarioLocal: false,
    category: 'inmuebles',
  },
  {
    id: '2',
    code: 'INM-000002',
    estadoInmueble: 'A reformar',
    propietario: 'Cristiano Ronaldo',
    telPropietario: '123456789',
    direccionCompleta: 'Avenida del Sol 45, 3B',
    diasUltimoContacto: null,
    ocupadoPor: null,
    resumenZona: 'Zona comercial bien comunicada',
    informadorRelacionado: null,
    potencialAdquisicion: true,
    propietarioLocal: true,
    category: 'inmuebles',
  },
  {
    id: '3',
    code: 'INM-000001',
    estadoInmueble: 'Reformado',
    propietario: 'Anis Ben Ayed',
    telPropietario: '123456789',
    direccionCompleta: 'Calle Mayor 12',
    diasUltimoContacto: null,
    ocupadoPor: 'Propietario',
    resumenZona: 'Zona residencial céntrica',
    informadorRelacionado: null,
    potencialAdquisicion: true,
    propietarioLocal: true,
    category: 'inmuebles',
  },
  
  {
    id: '4',
    code: 'NOT-000001',
    estadoInmueble: 'En venta',
    propietario: 'Laura Fernández',
    telPropietario: '611223344',
    direccionCompleta: 'Plaza España 3, 1A',
    diasUltimoContacto: 12,
    ocupadoPor: 'Inquilino',
    resumenZona: 'Centro histórico peatonal',
    informadorRelacionado: 'Pedro Gómez',
    potencialAdquisicion: false,
    propietarioLocal: true,
    category: 'noticia',
  },
  {
    id: '5',
    code: 'NOT-000002',
    estadoInmueble: 'Pendiente',
    propietario: 'Javier Ruiz',
    telPropietario: '622334455',
    direccionCompleta: 'Calle Luna 22',
    diasUltimoContacto: 5,
    ocupadoPor: null,
    resumenZona: 'Barrio universitario',
    informadorRelacionado: 'Ana López',
    potencialAdquisicion: true,
    propietarioLocal: false,
    category: 'noticia',
  },
  
  {
    id: '6',
    code: 'ENC-000001',
    estadoInmueble: 'En exclusiva',
    propietario: 'Marta Sánchez',
    telPropietario: '633445566',
    direccionCompleta: 'Av. Constitución 88, 5C',
    diasUltimoContacto: 3,
    ocupadoPor: null,
    resumenZona: 'Zona nueva expansión',
    informadorRelacionado: null,
    potencialAdquisicion: true,
    propietarioLocal: true,
    category: 'encargos_activos',
  },
  {
    id: '7',
    code: 'ENC-000002',
    estadoInmueble: 'Compartido',
    propietario: 'Diego Torres',
    telPropietario: '644556677',
    direccionCompleta: 'Paseo Marítimo 15',
    diasUltimoContacto: 20,
    ocupadoPor: 'Propietario',
    resumenZona: 'Primera línea de playa',
    informadorRelacionado: 'Carlos Ruiz',
    potencialAdquisicion: false,
    propietarioLocal: true,
    category: 'encargos_activos',
  },
  
  {
    id: '8',
    code: 'COM-000001',
    estadoInmueble: 'Nuevo',
    propietario: 'Promotora Mediterránea S.L.',
    telPropietario: '655667788',
    direccionCompleta: 'Urbanización Las Palmas, Parcela 7',
    diasUltimoContacto: null,
    ocupadoPor: null,
    resumenZona: 'Complejo residencial con piscina',
    informadorRelacionado: null,
    potencialAdquisicion: true,
    propietarioLocal: false,
    category: 'complejo',
  },
  {
    id: '9',
    code: 'COM-000002',
    estadoInmueble: 'En construcción',
    propietario: 'Grupo Inmobiliario Sur',
    telPropietario: '666778899',
    direccionCompleta: 'Sector Norte, Manzana 3',
    diasUltimoContacto: 45,
    ocupadoPor: null,
    resumenZona: 'Zona de nueva construcción',
    informadorRelacionado: 'Sofia Mora',
    potencialAdquisicion: true,
    propietarioLocal: false,
    category: 'complejo',
  },
  {
    id: '10',
    code: 'COM-000003',
    estadoInmueble: 'Entregado',
    propietario: 'Inversiones Levante',
    telPropietario: '677889900',
    direccionCompleta: 'Residencial El Parque, Bloque 2',
    diasUltimoContacto: 90,
    ocupadoPor: 'Varios propietarios',
    resumenZona: 'Zona verde con colegios',
    informadorRelacionado: null,
    potencialAdquisicion: false,
    propietarioLocal: true,
    category: 'complejo',
  },
  
  {
    id: '11',
    code: 'EDI-000001',
    estadoInmueble: 'Rehabilitado',
    propietario: 'Comunidad Prop. Calle Real 5',
    telPropietario: '688990011',
    direccionCompleta: 'Calle Real 5',
    diasUltimoContacto: 60,
    ocupadoPor: 'Múltiples inquilinos',
    resumenZona: 'Casco antiguo rehabilitado',
    informadorRelacionado: 'Nicolas Vega',
    potencialAdquisicion: false,
    propietarioLocal: true,
    category: 'edificio',
  },
  
  {
    id: '12',
    code: 'POT-000001',
    estadoInmueble: 'Seguimiento',
    propietario: 'Elena García',
    telPropietario: '699001122',
    direccionCompleta: 'Calle Olivo 33, Bajo',
    diasUltimoContacto: 7,
    ocupadoPor: 'Propietario',
    resumenZona: 'Barrio tranquilo familiar',
    informadorRelacionado: 'Ana Torres',
    potencialAdquisicion: true,
    propietarioLocal: true,
    category: 'potencial_adquisicion',
  },
  {
    id: '13',
    code: 'POT-000002',
    estadoInmueble: 'Contactado',
    propietario: 'Fernando Muñoz',
    telPropietario: '600112233',
    direccionCompleta: 'Av. Libertad 120, 8A',
    diasUltimoContacto: 2,
    ocupadoPor: null,
    resumenZona: 'Zona financiera céntrica',
    informadorRelacionado: null,
    potencialAdquisicion: true,
    propietarioLocal: false,
    category: 'potencial_adquisicion',
  },
  
  {
    id: '14',
    code: 'NTC-000001',
    estadoInmueble: 'Cerrada — Vendido',
    propietario: 'Rosa Delgado',
    telPropietario: '611223300',
    direccionCompleta: 'Calle Jardín 7, 2B',
    diasUltimoContacto: 120,
    ocupadoPor: 'Nuevo propietario',
    resumenZona: 'Zona residencial consolidada',
    informadorRelacionado: 'Pedro Gómez',
    potencialAdquisicion: false,
    propietarioLocal: true,
    category: 'noticias_cerradas',
  },
  
  {
    id: '15',
    code: 'ECC-000001',
    estadoInmueble: 'Cerrado — Caducado',
    propietario: 'Miguel Ángel Ramos',
    telPropietario: '622330044',
    direccionCompleta: 'Paseo de la Estación 9',
    diasUltimoContacto: 200,
    ocupadoPor: 'Propietario',
    resumenZona: 'Zona estación de tren',
    informadorRelacionado: null,
    potencialAdquisicion: false,
    propietarioLocal: true,
    category: 'encargos_cerrados',
  },
];

export const PROPERTIES_SCREEN_DATA = {
  title: 'Inmuebles',
  searchPlaceholder: 'Buscar por código, dirección, propietario...',
  toolsMenu: [
    { key: 'impresiones', label: 'Impresiones' },
    { key: 'filtros', label: 'Filtros' },
  ] as const,
  pageSize: 5,
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