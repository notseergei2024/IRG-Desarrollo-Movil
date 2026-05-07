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
        <HeaderBackButton />
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
    backgroundColor: colors.backgroundMain,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.gradientBackground[2],
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textMain,
    fontFamily: typography.title,
  },
  list: {
    padding: 20,
    gap: 16,
  },
  item: {
    paddingVertical: 8,
  },
  itemText: {
    color: colors.textMain,
    fontSize: 16,
    fontWeight: '600',
  },
});
