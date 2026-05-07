import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { HeaderBackButton } from '../components/HeaderBackButton';
import { SEARCH_DATA } from '../data/mockData';
import { colors, typography } from '../theme/colors';
import type { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function SearchScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return SEARCH_DATA.items;

    return SEARCH_DATA.items.filter((item) =>
      item.label.toLowerCase().includes(normalized) ||
      item.keywords.some((keyword) => keyword.includes(normalized))
    );
  }, [query]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{SEARCH_DATA.title}</Text>
          <HeaderBackButton />
        </View>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={SEARCH_DATA.placeholder}
          placeholderTextColor={colors.slate400}
          style={styles.input}
        />

        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
          {results.map((item) => (
            <Pressable key={item.route} style={styles.resultItem} onPress={() => navigation.navigate(item.route)}>
              <Text style={styles.resultText}>{item.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

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
  list: {
    gap: 10,
  },
  resultItem: {
    backgroundColor: colors.slate50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gradientBackground[2],
    padding: 12,
  },
  resultText: {
    color: colors.textMain,
    fontWeight: '600',
  },
});
