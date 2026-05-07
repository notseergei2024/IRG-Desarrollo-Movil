import type React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { CalendarDays, Home, Menu, Plus, Search } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../theme/colors';
import type { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type ActionItem = {
  key: string;
  label: string;
  route: keyof RootStackParamList;
  icon: (props: { color: string; size: number }) => React.ReactElement;
};

const ACTIONS: ActionItem[] = [
  {
    key: 'home',
    label: 'Inicio',
    route: 'Home',
    icon: ({ color, size }) => <Home color={color} size={size} strokeWidth={2.2} />,
  },
  {
    key: 'agenda',
    label: 'Agenda',
    route: 'Agenda',
    icon: ({ color, size }) => <CalendarDays color={color} size={size} strokeWidth={2.2} />,
  },
  {
    key: 'create',
    label: 'Crear',
    route: 'Create',
    icon: ({ color, size }) => <Plus color={color} size={size} strokeWidth={2.2} />,
  },
  {
    key: 'search',
    label: 'Buscar',
    route: 'Search',
    icon: ({ color, size }) => <Search color={color} size={size} strokeWidth={2.2} />,
  },
  {
    key: 'menu',
    label: 'Menu',
    route: 'MenuOverlay',
    icon: ({ color, size }) => <Menu color={color} size={size} strokeWidth={2.2} />,
  },
];

export function BottomActionBar() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  return (
    <View style={styles.wrapper}>
      {ACTIONS.map((action) => {
        const isActive = route.name === action.route;
        const color = isActive ? colors.primary : colors.slate400;

        return (
          <Pressable
            key={action.key}
            style={styles.action}
            onPress={() => navigation.navigate(action.route)}
          >
            {action.icon({ color, size: action.key === 'create' ? 26 : 22 })}
            <Text style={[styles.label, { color }]}>{action.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.slate50,
    borderTopWidth: 1,
    borderTopColor: colors.gradientBackground[2],
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  action: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
});
