import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RootNavigation from './src/navigation/RootNavigation';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <RootNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

