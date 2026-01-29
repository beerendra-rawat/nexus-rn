import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { notificationsData } from '../data/NotificationsData';
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(notificationsData);

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.card, !item.isRead && styles.unreadCard]}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>

        <View style={styles.footer}>
          <Text style={styles.time}>
            {item.date} • {item.time}
          </Text>

          {!item.isRead && <Text style={styles.unread}>Unread</Text>}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image
        source={require("../assets/img/bgImg.png")}
        style={styles.background}
        resizeMode="cover"
      />
      <View style={styles.container}>

        <View style={styles.topRow}>
          <TouchableOpacity style={styles.btnWrap}
            onPress={() => navigation.goBack()}>
            <Image style={styles.backBtn} source={require('../assets/img/leftArrow.png')} />
          </TouchableOpacity>
          <Text style={styles.header}>Notifications</Text>
        </View>


        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>

  );
}

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
  container: {
    paddingHorizontal: 12,
  },
  topRow: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 12,
  },
  btnWrap: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#5c5858e9',
  },
  backBtn: {
    alignContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    // marginVertical: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  message: {
    fontSize: 13,
    color: '#555',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  time: {
    fontSize: 11,
    color: '#888',
  },
  unread: {
    fontSize: 11,
    color: '#007AFF',
    fontWeight: '600',
  },
});
