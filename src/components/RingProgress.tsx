import { Circle, G, Svg, Text as SvgText } from 'react-native-svg';

import { colors } from '../theme/colors';

type RingProgressProps = {
  value: number;
  color: string;
};

export function RingProgress({ value, color }: RingProgressProps) {
  const size = 82;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 3) * circumference;

  return (
    <Svg height={size} width={size}>
      <G rotation="-90" originX={size / 2} originY={size / 2}>
        <Circle cx={size / 2} cy={size / 2} r={radius} stroke={colors.gradientBackground[2]} strokeWidth={strokeWidth} fill="none" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </G>
      <SvgText x="50%" y="55%" textAnchor="middle" fontSize="26" fontWeight="700" fill={colors.textMain}>
        {value}
      </SvgText>
    </Svg>
  );
}
