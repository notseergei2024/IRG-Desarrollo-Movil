import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BaseCard } from '../components/BaseCard';
import { HeaderBackButton } from '../components/HeaderBackButton';
import { CLIENTS_DATA } from '../data/mockData';
import { colors, typography } from '../theme/colors';

export function ClientsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{CLIENTS_DATA.title}</Text>
          <HeaderBackButton />
        </View>
        <TextInput
          placeholder={CLIENTS_DATA.searchPlaceholder}
          placeholderTextColor={colors.slate400}
          style={styles.input}
        />

        {CLIENTS_DATA.cards.map((card) => (
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
  input: {
    backgroundColor: colors.slate50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gradientBackground[2],
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.textMain,
  },
});
