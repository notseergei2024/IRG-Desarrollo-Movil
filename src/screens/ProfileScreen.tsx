import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeaderBackButton } from '../components/HeaderBackButton';
import { PROFILE_DATA } from '../data/mockData';
import { colors, typography } from '../theme/colors';

export function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{PROFILE_DATA.title}</Text>
          <HeaderBackButton />
        </View>

        <View style={styles.profileCard}>
          <Image source={{ uri: PROFILE_DATA.avatarUrl }} style={styles.avatar} />
          <Text style={styles.name}>{PROFILE_DATA.name}</Text>
          <Text style={styles.role}>{PROFILE_DATA.role}</Text>
          <Text style={styles.detail}>{PROFILE_DATA.office}</Text>
        </View>
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
  profileCard: {
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.slate50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.gradientBackground[2],
    padding: 20,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textMain,
  },
  role: {
    color: colors.slate400,
  },
  detail: {
    color: colors.slate400,
  },
});
