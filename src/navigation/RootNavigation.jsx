import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabs from './BottomTabs';
import NotificationsScreen from '../screens/NotificationsScreen';
import GoogleAuthScreen from '../screens/GoogleAuthScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="GoogleAuth"
          component={GoogleAuthScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Tabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Notification"
          component={NotificationsScreen}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
