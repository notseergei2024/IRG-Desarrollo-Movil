import { StyleSheet, Text, View } from 'react-native';
import { Clock3, Phone, MapPin, Users, CheckSquare, RotateCcw } from 'lucide-react-native';

import { ACTIVITIES_DATA } from '../data/mockData';
import { colors } from '../theme/colors';

const TYPE_ICONS: Record<string, typeof Phone> = {
  call: Phone,
  visit: MapPin,
  meeting: Users,
  task: CheckSquare,
  'follow-up': RotateCcw,
};

const STATUS_LABELS: Record<string, string> = {
  completed: 'Completada',
  'in-progress': 'En curso',
  pending: 'Pendiente',
};

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  completed: { bg: '#dcfce7', text: '#16a34a' },
  'in-progress': { bg: '#dbeafe', text: '#2563eb' },
  pending: { bg: '#fef3c7', text: '#d97706' },
};

export function ActividadesTab() {
  const todayActivities = ACTIVITIES_DATA.filter((a) => a.date === 'Hoy');
  const tomorrowActivities = ACTIVITIES_DATA.filter((a) => a.date === 'Mañana');

  return (
    <View style={styles.container}>
      <View style={styles.summaryStrip}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryCount}>{ACTIVITIES_DATA.length}</Text>
          <Text style={styles.summaryLabel}>Total</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryCount, { color: '#16a34a' }]}>
            {ACTIVITIES_DATA.filter((a) => a.status === 'completed').length}
          </Text>
          <Text style={styles.summaryLabel}>Hechas</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryCount, { color: '#2563eb' }]}>
            {ACTIVITIES_DATA.filter((a) => a.status === 'in-progress').length}
          </Text>
          <Text style={styles.summaryLabel}>En curso</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryCount, { color: '#d97706' }]}>
            {ACTIVITIES_DATA.filter((a) => a.status === 'pending').length}
          </Text>
          <Text style={styles.summaryLabel}>Pendientes</Text>
        </View>
      </View>

      <ActivityGroup title="Hoy" activities={todayActivities} />

      {tomorrowActivities.length > 0 && (
        <ActivityGroup title="Mañana" activities={tomorrowActivities} style={{ marginTop: 10 }} />
      )}
    </View>
  );
}

function ActivityGroup({
  title,
  activities,
  style,
}: {
  title: string;
  activities: typeof ACTIVITIES_DATA;
  style?: object;
}) {
  return (
    <View style={style}>
      <Text style={styles.dayHeader}>{title}</Text>
      <View style={styles.cardList}>
        {activities.map((activity) => {
          const Icon = TYPE_ICONS[activity.type] ?? Clock3;
          const statusStyle = STATUS_COLORS[activity.status];
          return (
            <View key={activity.id} style={styles.activityCard}>
              <View style={[styles.activityIcon, { backgroundColor: activity.color + '18' }]}>
                <Icon color={activity.color} size={18} />
              </View>
              <View style={styles.activityBody}>
                <View style={styles.activityTopRow}>
                  <Text style={styles.activityTitle} numberOfLines={1}>
                    {activity.title}
                  </Text>
                  <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                    <Text style={[styles.statusText, { color: statusStyle.text }]}>
                      {STATUS_LABELS[activity.status]}
                    </Text>
                  </View>
                </View>
                <Text style={styles.activityDesc} numberOfLines={2}>
                  {activity.description}
                </Text>
                <View style={styles.timeRow}>
                  <Clock3 color={colors.slate400} size={11} />
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  summaryStrip: {
    flexDirection: 'row',
    backgroundColor: colors.gradientBackground[1],
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  summaryCount: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textMain,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.slate400,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: colors.gradientBackground[2],
    marginVertical: 4,
  },
  dayHeader: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textMain,
    marginBottom: 8,
  },
  cardList: {
    gap: 10,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: colors.gradientBackground[1],
    borderRadius: 14,
    padding: 12,
    gap: 12,
    alignItems: 'flex-start',
  },
  activityIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityBody: {
    flex: 1,
    gap: 4,
  },
  activityTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  activityTitle: {
    color: colors.textMain,
    fontSize: 14,
    fontWeight: '800',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  activityDesc: {
    color: colors.slate400,
    fontSize: 12,
    lineHeight: 17,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  activityTime: {
    color: colors.slate400,
    fontSize: 11,
    fontWeight: '600',
  },
});
