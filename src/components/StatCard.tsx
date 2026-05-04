import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import { COLORS } from '../constants/theme';

type StatCardProps = {
  title: string;
  iconName: string;
  items: string[];
  color: string;
  watermarkIconName?: string;
};

const StatCard = ({ title, iconName, items, color, watermarkIconName }: StatCardProps) => {
  const icons = LucideIcons as Record<string, React.ComponentType<any>>;
  const Icon = icons[iconName] || icons.HelpCircle;
  const WatermarkIcon = icons[watermarkIconName || iconName] || icons.HelpCircle;
  const softBg = `${color}1A`;

  return (
    <View style={styles.card}>
      <View style={styles.watermark} pointerEvents="none">
        <WatermarkIcon size={80} color={color} strokeWidth={1.3} style={styles.watermarkIcon} />
      </View>

      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: softBg }]}>
          <Icon size={18} color={color} />
        </View>
        <Text style={[styles.title, { color }]}>{title}</Text>
      </View>

      {items.map((item, index) => (
        <View key={index} style={styles.itemRow}>
          <View style={[styles.dot, { backgroundColor: color }]} />
          <Text style={styles.itemText}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  watermark: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    opacity: 0.12,
  },
  watermarkIcon: {
    opacity: 0.7,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 6,
    marginRight: 8,
  },
  itemText: {
    fontSize: 13,
    color: COLORS.textLight,
    flex: 1,
  },
});

export default StatCard;
