import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight, Clock3 } from 'lucide-react-native';

import { HOME_DATA } from '../data/mockData';
import { colors, typography } from '../theme/colors';

export function AgendaScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 12 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.heroHeader}>
            <Text style={styles.heroTitle}>Calendario</Text>
            <View style={styles.togglePill}>
              <Text style={styles.toggleTextActive}>Calendario</Text>
              <Text style={styles.toggleTextInactive}>Actividades</Text>
            </View>
          </View>

          <View style={styles.dateRow}>
            <Text style={styles.owner} numberOfLines={1}>
              {HOME_DATA.agenda.owner}
            </Text>
            <View style={styles.dateNav}>
              <Pressable style={styles.arrowButton}>
                <ChevronLeft color={colors.slate400} size={18} />
              </Pressable>
              <Text style={styles.dateText} numberOfLines={1} ellipsizeMode="tail">
                {HOME_DATA.agenda.date}
              </Text>
              <Pressable style={styles.arrowButton}>
                <ChevronRight color={colors.slate400} size={18} />
              </Pressable>
            </View>
          </View>

          <View style={styles.timeline}>
            {HOME_DATA.agenda.slots.map((time) => {
              const event = HOME_DATA.agenda.events.find((item) => item.time === time);

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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundMain,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundMain,
  },
  content: {
    paddingHorizontal: 18,
    paddingBottom: 28,
  },
  hero: {
    backgroundColor: colors.slate50,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.gradientBackground[2],
    padding: 16,
    minHeight: 620,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18,
  },
  heroTitle: {
    color: colors.textMain,
    fontFamily: typography.title,
    fontSize: 19,
    fontWeight: '800',
  },
  togglePill: {
    flexDirection: 'row',
    gap: 14,
    backgroundColor: colors.gradientBackground[1],
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  toggleTextActive: {
    color: colors.primary,
    fontWeight: '800',
  },
  toggleTextInactive: {
    color: colors.slate400,
    fontWeight: '700',
  },
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
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    color: colors.textMain,
    fontSize: 14,
    fontWeight: '700',
    flexShrink: 1,
    maxWidth: 180,
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