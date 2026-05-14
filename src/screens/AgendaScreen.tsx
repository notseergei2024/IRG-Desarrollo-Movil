import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomActionBar } from '../components/BottomActionBar';
import { TopNavBar } from '../components/TopNavBar';
import { CalendarioTab } from '../components/CalendarioTab';
import { ActividadesTab } from '../components/ActividadesTab';
import { colors, typography } from '../theme/colors';

type Tab = 'calendario' | 'actividades';

export function AgendaScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('calendario');

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <TopNavBar />
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[styles.content, { paddingTop: 12, paddingBottom: 96 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.heroHeader}>
            <Text style={styles.heroTitle}>
              {activeTab === 'calendario' ? 'Calendario' : 'Actividades'}
            </Text>
            <View style={styles.togglePill}>
              <Pressable onPress={() => setActiveTab('calendario')}>
                <Text
                  style={
                    activeTab === 'calendario'
                      ? styles.toggleTextActive
                      : styles.toggleTextInactive
                  }
                >
                  Calendario
                </Text>
              </Pressable>
              <Pressable onPress={() => setActiveTab('actividades')}>
                <Text
                  style={
                    activeTab === 'actividades'
                      ? styles.toggleTextActive
                      : styles.toggleTextInactive
                  }
                >
                  Actividades
                </Text>
              </Pressable>
            </View>
          </View>

          {activeTab === 'calendario' ? <CalendarioTab /> : <ActividadesTab />}
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
  },
  hero: {
    backgroundColor: colors.slate50,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.gradientBackground[2],
    padding: 16,
    minHeight: 620,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18,
  },
  heroTitle: {
    color: colors.textMain,
    fontFamily: typography.title,
    fontSize: 19,
    fontWeight: '800',
  },
  togglePill: {
    flexDirection: 'row',
    gap: 14,
    backgroundColor: colors.gradientBackground[1],
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  toggleTextActive: {
    color: colors.primary,
    fontWeight: '800',
  },
  toggleTextInactive: {
    color: colors.slate400,
    fontWeight: '700',
  },
});