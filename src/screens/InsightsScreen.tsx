import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart3, Sparkles } from 'lucide-react-native';

import { HOME_DATA } from '../data/mockData';
import { BottomActionBar } from '../components/BottomActionBar';
import { TopNavBar } from '../components/TopNavBar';
import { colors, typography } from '../theme/colors';

export function InsightsScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <TopNavBar />
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[styles.content, { paddingTop: 12, paddingBottom: 96 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.titleRow}>
              <View style={[styles.iconBox, { backgroundColor: colors.primary }]}>
                <BarChart3 color={colors.slate50} size={18} />
              </View>
              <Text style={styles.title}>Resumen operativo</Text>
            </View>
            <View style={styles.miniChip}>
              <Sparkles color={colors.primary} size={14} />
              <Text style={styles.miniChipText}>Mock data</Text>
            </View>
          </View>

          <Text style={styles.lead}>
            Vista pensada para el tercer tab del MVP, con datos estáticos listos para conectar después.
          </Text>

          <View style={styles.metricsRow}>
            {HOME_DATA.objectives.map((item) => (
              <View key={item.label} style={styles.metricCard}>
                <View style={[styles.metricDot, { backgroundColor: item.color }]} />
                <Text style={styles.metricValue}>{item.value}</Text>
                <Text style={styles.metricLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>Escuela de Formación</Text>
          </View>
          <Text style={styles.trainingTitle}>{HOME_DATA.training.tag}</Text>
          <Text style={styles.trainingText}>{HOME_DATA.training.description}</Text>
        </View>
      </ScrollView>
      <BottomActionBar />
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
    gap: 16,
  },
  card: {
    backgroundColor: colors.slate50,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.gradientBackground[2],
    padding: 16,
    gap: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.textMain,
    fontSize: 18,
    fontWeight: '800',
    fontFamily: typography.title,
  },
  miniChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.gradientBackground[1],
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  miniChipText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  lead: {
    color: colors.slate400,
    fontSize: 13,
    lineHeight: 19,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  metricCard: {
    flex: 1,
    backgroundColor: colors.gradientBackground[1],
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 8,
  },
  metricDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
  },
  metricValue: {
    color: colors.textMain,
    fontSize: 24,
    fontWeight: '800',
  },
  metricLabel: {
    color: colors.slate400,
    fontSize: 12,
    fontWeight: '700',
  },
  sectionTitle: {
    color: colors.textMain,
    fontSize: 18,
    fontWeight: '800',
  },
  trainingTitle: {
    color: colors.textMain,
    fontSize: 16,
    fontWeight: '800',
  },
  trainingText: {
    color: colors.slate400,
    fontSize: 13,
    lineHeight: 19,
  },
});
