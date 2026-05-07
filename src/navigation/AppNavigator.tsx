import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AgendaScreen } from '../screens/AgendaScreen';
import { ClientsScreen } from '../screens/ClientsScreen';
import { CreateScreen } from '../screens/CreateScreen';
import { CrossRelationsScreen } from '../screens/CrossRelationsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { InsightsScreen } from '../screens/InsightsScreen';
import { MenuOverlayScreen } from '../screens/MenuOverlayScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { PropertiesScreen } from '../screens/PropertiesScreen';
import { RequestsScreen } from '../screens/RequestsScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { SupportScreen } from '../screens/SupportScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator id="main-stack" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Agenda" component={AgendaScreen} />
      <Stack.Screen name="Insights" component={InsightsScreen} />
      <Stack.Screen name="Create" component={CreateScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="MenuOverlay" component={MenuOverlayScreen} />
      <Stack.Screen name="Clients" component={ClientsScreen} />
      <Stack.Screen name="Properties" component={PropertiesScreen} />
      <Stack.Screen name="Requests" component={RequestsScreen} />
      <Stack.Screen name="CrossRelations" component={CrossRelationsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
    </Stack.Navigator>
  );
}