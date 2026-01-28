import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchBar({ onPress }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <TouchableOpacity
          style={styles.searchBar}
          activeOpacity={0.7}
          onPress={onPress}
        >
          <Image
            source={require('../assets/img/search.png')}
            style={styles.icon}
          />
          <Text style={styles.placeholder}>Search Project...</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    padding: 12,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  icon: {
    width: 18,
    height: 18,
    tintColor: '#64748b',
    marginRight: 8,
  },

  placeholder: {
    fontSize: 14,
    color: '#94a3b8',
  },
});
