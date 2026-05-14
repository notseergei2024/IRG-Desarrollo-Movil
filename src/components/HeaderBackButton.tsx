import { Pressable, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../theme/colors';
import type { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type HeaderBackButtonProps = {
  onPress?: () => void;
  variant?: 'default' | 'light';
};

export function HeaderBackButton({ onPress, variant = 'default' }: HeaderBackButtonProps) {
  const navigation = useNavigation<NavigationProp>();
  const isLight = variant === 'light';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Volver"
      style={[
        styles.button,
        isLight && styles.buttonLight,
      ]}
      onPress={onPress ?? navigation.goBack}
    >
      <ChevronLeft color={isLight ? colors.primary : colors.slate50} size={18} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLight: {
    backgroundColor: colors.slate50,
    borderColor: colors.slate50,
  },
});
