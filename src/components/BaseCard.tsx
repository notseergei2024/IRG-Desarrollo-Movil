import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';

type BaseCardProps = {
  title: string;
  subtitle?: string;
  lines?: string[];
};

export function BaseCard({ title, subtitle, lines }: BaseCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {lines?.map((line) => (
        <Text key={line} style={styles.line}>
          {line}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.slate50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gradientBackground[2],
    padding: 16,
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textMain,
  },
  subtitle: {
    color: colors.slate400,
    fontSize: 13,
  },
  line: {
    color: colors.slate400,
    fontSize: 12,
  },
});
