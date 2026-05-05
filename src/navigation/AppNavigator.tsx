import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CalendarDays, ChartColumnIncreasing, Home } from 'lucide-react-native';

import { AgendaScreen } from '../screens/AgendaScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { InsightsScreen } from '../screens/InsightsScreen';
import { colors } from '../theme/colors';

type TabParamList = {
  Home: undefined;
  Agenda: undefined;
  Insights: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export function AppNavigator() {
  return (
    <Tab.Navigator
      id="main-tabs"
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 68,
          paddingTop: 8,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <Home color={color} size={size} strokeWidth={2.2} />;
          }

          if (route.name === 'Agenda') {
            return <CalendarDays color={color} size={size} strokeWidth={2.2} />;
          }

          return <ChartColumnIncreasing color={color} size={size} strokeWidth={2.2} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Tab.Screen name="Agenda" component={AgendaScreen} options={{ title: 'Agenda' }} />
      <Tab.Screen name="Insights" component={InsightsScreen} options={{ title: 'Resumen' }} />
    </Tab.Navigator>
  );
}