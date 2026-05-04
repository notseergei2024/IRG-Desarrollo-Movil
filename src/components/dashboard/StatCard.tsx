import { StyleSheet, Text, View } from 'react-native';
import * as LucideIcons from 'lucide-react-native';

import type { DashboardStat } from '../../data/mockData';
import { colors } from '../../theme/colors';

export function StatCard({ title, accent, iconName, watermarkIconName, bullets }: DashboardStat) {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<any>>;
  const Icon = icons[iconName] || icons.HelpCircle;
  const WatermarkIcon = icons[watermarkIconName || iconName] || icons.HelpCircle;
  const softBg = `${accent}1A`;

  return (
    <View style={styles.statCard}>
      <View style={styles.watermark} pointerEvents="none">
        <WatermarkIcon size={86} color={accent} strokeWidth={1.4} style={styles.watermarkIcon} />
      </View>

      <View style={styles.statHeader}>
        <View style={[styles.statIcon, { backgroundColor: softBg }]}>
          <Icon size={18} color={accent} />
        </View>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <View style={styles.statContent}>
        {bullets.map((bullet) => (
          <View style={styles.bulletRow} key={bullet}>
            <View style={[styles.bulletDot, { backgroundColor: accent }]} />
            <Text style={styles.bulletText}>{bullet}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statCard: {
    width: '100%',
    minHeight: 172,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    overflow: 'hidden',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  statTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
  },
  statContent: {
    gap: 7,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingRight: 22,
  },
  bulletDot: {
    width: 5,
    height: 5,
    borderRadius: 999,
    marginTop: 7,
    marginRight: 8,
  },
  bulletText: {
    flex: 1,
    color: colors.muted,
    fontSize: 11.5,
    lineHeight: 16,
  },
  watermark: {
    position: 'absolute',
    right: 12,
    bottom: 6,
    opacity: 0.12,
  },
  watermarkIcon: {
    opacity: 0.8,
  },
});
