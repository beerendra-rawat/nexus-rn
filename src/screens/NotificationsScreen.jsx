import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { notificationsData } from "../data/NotificationsData";

export default function NotificationsScreen({ navigation }) {
  const [notifications] = useState(notificationsData);

  const renderItem = ({ item }) => (
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image
        source={require("../assets/img/bgImg.png")}
        style={styles.background}
        resizeMode="cover"
      />

      {/* Screen Padding Wrapper */}
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require("../assets/img/leftArrow.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <Text style={styles.header}>Notifications</Text>
        </View>

        {/* List */}
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    flex: 1,
    paddingHorizontal: 24, // ✅ HORIZONTAL PADDING
    paddingTop: 24,        // ✅ TOP PADDING
  },

  background: {
    position: "absolute",
    width: "100%",
    height: "110%",
    transform: [{ rotate: "180deg" }],
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },

  header: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
  },

  listContent: {
    paddingBottom: 24,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
  },

  message: {
    fontSize: 13,
    color: "#555",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  time: {
    fontSize: 11,
    color: "#888",
  },

  unread: {
    fontSize: 11,
    color: "#007AFF",
    fontWeight: "600",
  },
});
