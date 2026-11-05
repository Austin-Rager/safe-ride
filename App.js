import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import YearsScreen from './src/screens/YearsScreen';
import MakesScreen from './src/screens/MakesScreen';
import ModelsScreen from './src/screens/ModelsScreen';
import VariantsScreen from './src/screens/VariantsScreen';
import VehicleDetailScreen from './src/screens/VehicleDetailScreen';
import { colors } from './src/theme';

const Stack = createNativeStackNavigator();

// Shared header style for every screen.
const screenOptions = {
  headerStyle: { backgroundColor: colors.primary },
  headerTintColor: colors.white,
  headerTitleStyle: { fontWeight: '700' },
  headerBackButtonDisplayMode: 'minimal',
  contentStyle: { backgroundColor: colors.background },
};

// Navigation setup only. Each header title shows the user's place in the
// flow, e.g. "2022 › HONDA › CIVIC".
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator initialRouteName="Years" screenOptions={screenOptions}>
        <Stack.Screen
          name="Years"
          component={YearsScreen}
          options={{ title: 'SafeRide' }}
        />
        <Stack.Screen
          name="Makes"
          component={MakesScreen}
          options={({ route }) => ({ title: `${route.params.year}` })}
        />
        <Stack.Screen
          name="Models"
          component={ModelsScreen}
          options={({ route }) => ({
            title: `${route.params.year} › ${route.params.make}`,
          })}
        />
        <Stack.Screen
          name="Variants"
          component={VariantsScreen}
          options={({ route }) => ({
            title: `${route.params.year} › ${route.params.make} › ${route.params.model}`,
          })}
        />
        <Stack.Screen
          name="VehicleDetail"
          component={VehicleDetailScreen}
          options={({ route }) => ({
            title: `${route.params.make} ${route.params.model}`,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
