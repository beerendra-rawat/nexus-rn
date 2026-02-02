import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabs from './BottomTabs';
import NotificationsScreen from '../screens/NotificationsScreen';
import GoogleAuthScreen from '../screens/GoogleAuthScreen';
import TaskListScreen from '../screens/TaskListScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, 
        }}>

        <Stack.Screen
          name="GoogleAuth"
          component={GoogleAuthScreen}
        />

        <Stack.Screen
          name="Tabs"
          component={BottomTabs}
          
        />

        <Stack.Screen
          name="Notification"
          component={NotificationsScreen}
         
        />

        <Stack.Screen name="TaskList" component={TaskListScreen}
           />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
