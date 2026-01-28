import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import BottomTabs from './src/navigation/BottomTabs';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
