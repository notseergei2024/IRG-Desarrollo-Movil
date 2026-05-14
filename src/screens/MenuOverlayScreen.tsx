import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { HeaderBackButton } from '../components/HeaderBackButton';
import { MENU_DATA } from '../data/mockData';
import { colors, typography } from '../theme/colors';
import type { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function MenuOverlayScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>{MENU_DATA.title}</Text>
        <HeaderBackButton variant="light" />
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {MENU_DATA.items.map((item) => (
          <Pressable
            key={item.label}
            style={styles.item}
            onPress={() => (item.route ? navigation.navigate(item.route) : navigation.goBack())}
          >
            <Text style={styles.itemText}>{item.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.25)',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.slate50,
    fontFamily: typography.title,
  },
  list: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  item: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  itemText: {
    color: colors.slate50,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
