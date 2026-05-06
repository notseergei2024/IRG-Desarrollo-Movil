import { colors } from '../theme/colors';

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