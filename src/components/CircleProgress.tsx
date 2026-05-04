import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { COLORS } from '../constants/theme';

type CircleProgressProps = {
  value: number;
  title: string;
  color: string;
  code?: string;
  subtitle?: string;
  maxValue?: number;
  size?: number;
  strokeWidth?: number;
};

const CircleProgress = ({
  value,
  title,
  color,
  code,
  subtitle,
  maxValue = 10,
  size = 86,
  strokeWidth = 8,
}: CircleProgressProps) => {
  const clampedValue = Math.max(0, Math.min(value, maxValue));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = maxValue === 0 ? 0 : clampedValue / maxValue;
  const dashOffset = circumference * (1 - progress);

  return (
    <View style={styles.container}>
      <View style={[styles.svgWrap, { width: size, height: size }]}>
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={COLORS.borderLight}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={dashOffset}
            fill="none"
            rotation={-90}
            originX={size / 2}
            originY={size / 2}
          />
        </Svg>
        <View style={styles.centerLabel}>
          <Text style={styles.valueText}>{clampedValue}</Text>
        </View>
      </View>
      <Text style={styles.title}>{title}</Text>
      {code ? <Text style={styles.code}>{code}</Text> : null}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  svgWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerLabel: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  title: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  code: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 10,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});

export default CircleProgress;
