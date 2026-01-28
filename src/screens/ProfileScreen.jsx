import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserInfo from '../components/UserInfo';
import TeamMembers from '../components/TeamMembers';
import Allocations from '../components/Allocations';



export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Image
        source={require("../assets/img/bgImg.png")}
        style={styles.background}
        resizeMode="cover"
      />

      <View style={styles.topRow}>
        <TouchableOpacity>
          <View style={styles.btnWrap}>
            <Image
              source={require('../assets/img/leftArrow.png')}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.name}>Beerendra Singh Rawat</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        <UserInfo />
        <TeamMembers />
        <Allocations />

      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "108%",
    transform: [{ rotate: "180deg" }],
  },
  scrollContent: {
    flexGrow: 1,
  },
  topRow: {
    marginVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#f8fafc',
    backgroundColor: '#fff',
  },
  btnWrap: {
    width: 32,
    height: 32,
    borderWidth: 1, 
    borderRadius: 8,
    borderColor: '#d3d6d8',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginRight: 12,
  },

  icon: {
    width: 18,
    height: 18,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
  },
});
