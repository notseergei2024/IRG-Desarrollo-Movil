import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { RingProgress } from '../components/dashboard/RingProgress';
import { StatCard } from '../components/dashboard/StatCard';
import { HOME_DATA } from '../data/mockData';
import { colors, typography } from '../theme/colors';

type TabParamList = {
  Home: undefined;
  Agenda: undefined;
  Insights: undefined;
};

export function HomeScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 12 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <View style={styles.titleBlock}>
            <Text style={styles.greeting}>
              {HOME_DATA.greeting} {HOME_DATA.userName}
            </Text>
          </View>
          <Pressable style={styles.agendaButton} onPress={() => navigation.navigate('Agenda')}>
            <Text style={styles.agendaButtonText}>{HOME_DATA.agendaButton}</Text>
          </Pressable>
        </View>

        <View style={styles.grid}>
          {HOME_DATA.stats.map((item) => (
            <StatCard
              key={item.key}
              title={item.title}
              accent={item.accent}
              iconName={item.iconName}
              watermarkIconName={item.watermarkIconName}
              bullets={item.bullets}
            />
          ))}
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <View style={[styles.sectionBadge, { backgroundColor: colors.lime }]} />
              <Text style={styles.sectionTitle}>Gestión de Objetivos</Text>
            </View>
            <Pressable style={styles.analysisButton}>
              <Text style={styles.analysisButtonText}>Impresión análisis datos</Text>
            </Pressable>
          </View>

          <View style={styles.objectiveGrid}>
            {HOME_DATA.objectives.map((objective) => (
              <View key={objective.label} style={styles.objectiveItem}>
                <RingProgress value={objective.value} color={objective.color} />
                <Text style={styles.objectiveLabel}>{objective.label}</Text>
                <Text style={styles.objectiveOwner}>{objective.owner}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.trainingCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <View style={[styles.sectionBadge, { backgroundColor: colors.primary }]} />
              <Text style={styles.sectionTitle}>{HOME_DATA.training.title}</Text>
            </View>
          </View>

          <Text style={styles.trainingSubtitle}>{HOME_DATA.training.subtitle}</Text>

          <View style={styles.trainingBody}>
            <View style={styles.videoPlaceholder}>
              <Text style={styles.videoText}>Video</Text>
            </View>

            <View style={styles.trainingMeta}>
              <Text style={styles.trainingTeam}>{HOME_DATA.training.team}</Text>
              {HOME_DATA.training.authors.map((author) => (
                <Text key={author} style={styles.trainingAuthor}>
                  {author}
                </Text>
              ))}
              <Text style={styles.trainingDuration}>Antiguedad: {HOME_DATA.training.duration}</Text>
              <Text style={styles.trainingDuration}>Afiliado</Text>
            </View>
          </View>

          <Text style={styles.trainingTitle}>{HOME_DATA.training.tag}</Text>
          <Text style={styles.trainingDescription}>{HOME_DATA.training.description}</Text>
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
    gap: 18,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleBlock: {
    flex: 1,
    paddingRight: 12,
  },
  greeting: {
    color: colors.text,
    fontSize: 30,
    lineHeight: 36,
    fontFamily: typography.title,
    fontWeight: '700',
    flexShrink: 1,
  },
  agendaButton: {
    marginTop: 2,
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  agendaButtonText: {
    color: colors.surface,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'column',
    gap: 14,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  sectionBadge: {
    width: 22,
    height: 22,
    borderRadius: 6,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    flex: 1,
  },
  analysisButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  analysisButtonText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '700',
  },
  objectiveGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  objectiveItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  objectiveLabel: {
    color: colors.text,
    fontWeight: '800',
  },
  objectiveOwner: {
    color: colors.muted,
    fontSize: 11,
    textAlign: 'center',
    textTransform: 'lowercase',
  },
  trainingCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 10,
  },
  trainingSubtitle: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '700',
  },
  trainingBody: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
  },
  videoPlaceholder: {
    width: 180,
    height: 132,
    borderRadius: 6,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoText: {
    color: colors.surface,
    fontSize: 17,
    fontWeight: '700',
  },
  trainingMeta: {
    flex: 1,
    gap: 4,
  },
  trainingTeam: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },
  trainingAuthor: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  trainingDuration: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 4,
  },
  trainingTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  trainingDescription: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
  },
});