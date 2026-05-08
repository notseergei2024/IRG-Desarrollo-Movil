import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../theme/colors';
import type { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type NavLink = {
  label: string;
  route: keyof RootStackParamList;
};

const NAV_LINKS: NavLink[] = [
  { label: 'Clientes', route: 'Clients' },
  { label: 'Inmuebles', route: 'Properties' },
  { label: 'Pedidos', route: 'Requests' },
  { label: 'Relaciones Cruce', route: 'CrossRelations' },
  { label: 'Actividades/Citas', route: 'Agenda' },
  { label: 'Búsqueda/Informes', route: 'Insights' },
];

export function TopNavBar() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.logoPill} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.logoText}>CRM</Text>
      </Pressable>

      <View style={styles.links}>
        {NAV_LINKS.map((link) => {
          const isActive = route.name === link.route;
          return (
            <Pressable
              key={link.route}
              onPress={() => {}}
              style={({ pressed }) => [
                styles.linkPressable,
                pressed && styles.linkPressed,
              ]}
            >
              <Text style={[styles.linkText, isActive && styles.linkTextActive]}>
                {link.label}
              </Text>
              {isActive && <View style={styles.activeIndicator} />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.slate50,
    borderBottomWidth: 1,
    borderBottomColor: colors.gradientBackground[2],
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 16,
  },


  logoPill: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: colors.slate50,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },


  links: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  linkPressable: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    position: 'relative',
  },
  linkPressed: {
    backgroundColor: colors.gradientBackground[1],
  },
  linkText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.slate400,
  },
  linkTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 8,
    right: 8,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.primary,
  },
});
