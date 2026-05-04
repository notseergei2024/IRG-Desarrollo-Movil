import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BarChart3, Sparkles } from 'lucide-react-native';

import { HOME_DATA } from '../data/mockData';
import { colors, typography } from '../theme/colors';

export function InsightsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 12 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.titleRow}>
              <View style={[styles.iconBox, { backgroundColor: colors.primary }]}>
                <BarChart3 color={colors.surface} size={18} />
              </View>
              <Text style={styles.title}>Resumen operativo</Text>
            </View>
            <View style={styles.miniChip}>
              <Sparkles color={colors.accent} size={14} />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 18,
    paddingBottom: 28,
    gap: 16,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
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
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    fontFamily: typography.title,
  },
  miniChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F3FBF4',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  miniChipText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
  },
  lead: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  metricCard: {
    flex: 1,
    backgroundColor: colors.surfaceAlt,
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
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  metricLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  trainingTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  trainingText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
  },
});