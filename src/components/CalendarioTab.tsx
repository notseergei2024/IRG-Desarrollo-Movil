import { useState, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronLeft, ChevronRight, Clock3 } from 'lucide-react-native';

import { HOME_DATA } from '../data/mockData';
import { colors } from '../theme/colors';

function formatDateLong(date: Date): string {
  const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
  ];
  return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
}

function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function eventsForDate(date: Date) {
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  const pool = [
    { label: 'Reunión zona', detail: 'Seguimiento potencial adquisición', color: colors.cardGreen },
    { label: 'Cita encargos', detail: 'Cartera total y caducados', color: colors.cardOrange },
    { label: 'Pedidos oficina', detail: 'Pedidos compra prioridad', color: colors.cardSky },
    { label: 'Visita inmueble', detail: 'Valoración de captación nueva', color: colors.primary },
    { label: 'Llamada cliente', detail: 'Seguimiento interés compra', color: colors.cardBlue },
    { label: 'Formación equipo', detail: 'Técnicas de negociación', color: colors.cardGreen },
  ];

  const count = 1 + (seed % 4);
  const slots = HOME_DATA.agenda.slots;
  const events: { time: string; label: string; detail: string; color: string }[] = [];

  for (let i = 0; i < count; i++) {
    const slotIdx = ((seed * (i + 3)) % (slots.length - 2)) + 1;
    const poolIdx = (seed + i * 7) % pool.length;
    if (!events.find((e) => e.time === slots[slotIdx])) {
      events.push({ time: slots[slotIdx], ...pool[poolIdx] });
    }
  }

  return events;
}

export function CalendarioTab() {
  const [currentDate, setCurrentDate] = useState(() => new Date(2026, 3, 27));

  const formattedDate = useMemo(() => formatDateLong(currentDate), [currentDate]);
  const events = useMemo(() => eventsForDate(currentDate), [currentDate]);

  const goBack = () => setCurrentDate((d) => addDays(d, -1));
  const goForward = () => setCurrentDate((d) => addDays(d, 1));

  return (
    <>
      <View style={styles.dateRow}>
        <Text style={styles.owner} numberOfLines={1}>
          {HOME_DATA.agenda.owner}
        </Text>
        <View style={styles.dateNav}>
          <Pressable style={styles.arrowButton} onPress={goBack}>
            <ChevronLeft color={colors.slate400} size={18} />
          </Pressable>
          <Text style={styles.dateText} numberOfLines={1} ellipsizeMode="tail">
            {formattedDate}
          </Text>
          <Pressable style={styles.arrowButton} onPress={goForward}>
            <ChevronRight color={colors.slate400} size={18} />
          </Pressable>
        </View>
      </View>

      <View style={styles.timeline}>
        {HOME_DATA.agenda.slots.map((time) => {
          const event = events.find((item) => item.time === time);

          return (
            <View key={time} style={styles.timelineRow}>
              <Text style={styles.timeLabel}>{time}</Text>
              <View style={styles.timeTrack}>
                {event ? (
                  <View style={[styles.eventCard, { borderLeftColor: event.color ?? colors.primary }]}>
                    <View style={styles.eventHeader}>
                      <Clock3 color={event.color ?? colors.primary} size={14} />
                      <Text style={styles.eventTitle}>{event.label}</Text>
                    </View>
                    <Text style={styles.eventDetail}>{event.detail}</Text>
                  </View>
                ) : null}
              </View>
            </View>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
    marginBottom: 18,
  },
  owner: {
    color: colors.textMain,
    fontSize: 15,
    fontWeight: '800',
    flexShrink: 1,
    marginRight: 10,
  },
  dateNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
    justifyContent: 'flex-end',
  },
  arrowButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: colors.gradientBackground[1],
  },
  dateText: {
    color: colors.textMain,
    fontSize: 14,
    fontWeight: '700',
    flexShrink: 1,
    maxWidth: 200,
  },
  timeline: {
    gap: 8,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    minHeight: 36,
  },
  timeLabel: {
    width: 54,
    color: colors.slate400,
    fontSize: 11,
    fontWeight: '600',
    paddingTop: 2,
  },
  timeTrack: {
    flex: 1,
    minHeight: 36,
    borderBottomWidth: 1,
    borderBottomColor: colors.gradientBackground[2],
    paddingBottom: 8,
  },
  eventCard: {
    backgroundColor: colors.gradientBackground[1],
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderLeftWidth: 4,
    gap: 6,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  eventTitle: {
    color: colors.textMain,
    fontWeight: '800',
    fontSize: 13,
  },
  eventDetail: {
    color: colors.slate400,
    fontSize: 12,
    lineHeight: 16,
  },
});
