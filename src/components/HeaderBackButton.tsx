import { Pressable, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../theme/colors';
import type { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type HeaderBackButtonProps = {
  onPress?: () => void;
};

export function HeaderBackButton({ onPress }: HeaderBackButtonProps) {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Volver"
      style={styles.button}
      onPress={onPress ?? navigation.goBack}
    >
      <ChevronLeft color={colors.slate50} size={18} />
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
});
