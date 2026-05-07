import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BaseCard } from '../components/BaseCard';
import { HeaderBackButton } from '../components/HeaderBackButton';
import { CROSS_RELATIONS_DATA } from '../data/mockData';
import { colors, typography } from '../theme/colors';

export function CrossRelationsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{CROSS_RELATIONS_DATA.title}</Text>
          <HeaderBackButton />
        </View>
        <Text style={styles.subtitle}>{CROSS_RELATIONS_DATA.subtitle}</Text>

        {CROSS_RELATIONS_DATA.cards.map((card) => (
          <BaseCard key={card.title} title={card.title} subtitle={card.subtitle} lines={card.lines} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundMain,
  },
  container: {
    padding: 20,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textMain,
    fontFamily: typography.title,
  },
  subtitle: {
    color: colors.slate400,
  },
});
