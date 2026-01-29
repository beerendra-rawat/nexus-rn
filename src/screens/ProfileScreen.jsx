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
import { userProfile } from '../data/UserInfoData';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Image
        source={require("../assets/img/bgImg.png")}
        style={styles.background}
        resizeMode="cover"
      />

      <View style={styles.topRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {userProfile.shortName}
          </Text>
        </View>

        <View style={styles.nameWrap}>
          <Text style={styles.nameText}>{userProfile.name}</Text>
          <View style={styles.status}>
            <Text style={styles.statusText}>{userProfile.status}</Text>
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        <UserInfo />
        <TouchableOpacity style={styles.logOutBtn}>
          <Text style={styles.btnText}>Log-Out</Text>
        </TouchableOpacity>

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
    height: "110%",
    transform: [{ rotate: "180deg" }],
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 22,
    fontWeight: 800,
    color: '#2563eb',
  },
  nameWrap: {
    flex: 1,
    marginLeft: 14,
  },
  nameText: {
    fontSize: 22,
    fontWeight: 800,
    color: '#0f172a',
  },
  status: {
    alignSelf: 'flex-start',
    marginTop: 6,
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 600,
    color: '#15803d',
  },
  scrollContent: {
    flexGrow: 1,
  },
  logOutBtn: {
    borderWidth: 2,
    borderColor: "#2350ba",
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 12,
  },
  btnText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 800,
  },
});
