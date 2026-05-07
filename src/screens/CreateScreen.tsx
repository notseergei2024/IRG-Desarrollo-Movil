import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BaseCard } from '../components/BaseCard';
import { HeaderBackButton } from '../components/HeaderBackButton';
import { CREATE_DATA } from '../data/mockData';
import { colors, typography } from '../theme/colors';

export function CreateScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{CREATE_DATA.title}</Text>
          <HeaderBackButton />
        </View>
        <BaseCard title={CREATE_DATA.cardTitle} lines={CREATE_DATA.cardLines} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundMain,
  },
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textMain,
    fontFamily: typography.title,
  },
});
