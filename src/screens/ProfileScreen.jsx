import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { userInfoData, userProfile } from '../data/UserInfoData';

export default function ProfileScreen({ navigation }) {

  const handlePress = (item) => {
    if (!item.clickable) return;

    if (item.actionType === 'phone') {
      Linking.openURL(`tel:${item.value}`);
    } else if (item.actionType === 'email') {
      Linking.openURL(`mailto:${item.value}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image
        source={require('../assets/img/bgImg.png')}
        style={styles.background}
        resizeMode="cover"
      />

      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.headerRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {userProfile.shortName}
            </Text>
          </View>

          <View style={styles.nameWrap}>
            <Text style={styles.nameText}>{userProfile.name}</Text>
            <View style={styles.status}>
              <Text style={styles.statusText}>
                {userProfile.status}
              </Text>
            </View>
          </View>
        </View>

        {/* PROGRESS + DIVIDER */}
        <View style={styles.progressWrap}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Total Allocation</Text>
            <Text style={styles.progressValue}>
              {userProfile.allocation}%
            </Text>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${userProfile.allocation}%` },
              ]}
            />
          </View>

          <View style={styles.divider} />
        </View>

        {/* BODY */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.info}>
            {userInfoData.map((item) => {
              const Wrapper = item.clickable ? TouchableOpacity : View;
              return (
                <Wrapper
                  key={item.id}
                  style={styles.item}
                  onPress={() => handlePress(item)}
                  activeOpacity={0.7}
                >
                  <View style={styles.iconWrap}>
                    <Image source={item.icon} style={styles.icon} />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.label}>{item.label}</Text>
                    <Text
                      style={[
                        styles.value,
                        item.clickable && styles.link,
                      ]}
                    >
                      {item.value}
                    </Text>
                  </View>
                </Wrapper>
              );
            })}
          </View>

          <TouchableOpacity
            style={styles.logOutBtn}
            onPress={() => navigation.navigate('GoogleAuth')}
          >
            <Text style={styles.btnText}>Log-Out</Text>
          </TouchableOpacity>
        </ScrollView>

      </View>
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
    position: 'absolute',
    width: '100%',
    height: '110%',
    transform: [{ rotate: '180deg' }],
  },

  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2563eb',
  },

  nameWrap: {
    marginLeft: 14,
    flex: 1,
  },

  nameText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },

  status: {
    marginTop: 6,
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },

  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#15803d',
  },

  progressWrap: {
    marginTop: 24,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },

  progressValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a',
  },

  progressTrack: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#22c55e',
  },

  /* ✅ ONE CONSISTENT DIVIDER */
  divider: {
    marginTop: 24,
    height: 1,
    backgroundColor: '#e5e7eb',
  },

  scrollContent: {
    paddingBottom: 24,
  },

  info: {
    marginBottom: 24,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },

  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  icon: {
    width: 20,
    height: 20,
    tintColor: '#2563eb',
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
  },

  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginTop: 2,
  },

  link: {
    color: '#2563eb',
  },

  logOutBtn: {
    borderWidth: 2,
    borderColor: '#2350ba',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },

  btnText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
  },
});
