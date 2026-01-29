import { useMemo } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { welcomeData } from "../data/GretingData";

const { width } = Dimensions.get('window');

export default function HomeScreen() {

  const welcome = useMemo(() => {
    const index = Math.floor(Math.random() * welcomeData.length);
    return welcomeData[index];
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image
        source={require("../assets/img/bgImg.png")}
        style={styles.background}
        resizeMode="cover"
      />

      <View style={styles.top}>
        <Image
          source={require('../assets/img/tcz.png')}
          style={styles.logo}
        />
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons
            name="notifications-outline"
            size={28}
            color="#0f172a"
          />
        </TouchableOpacity>
      </View>


      <View style={styles.content}>
        <Text style={styles.hello}>
          {welcome.greeting},
        </Text>
        <Text style={styles.name}>Beerendra</Text>

        <Text style={styles.subTitle}>
          {welcome.subtitle}
        </Text>

        <View style={styles.quoteBox}>
          <Text style={styles.quote}>
            “{welcome.quote}”
          </Text>
          <Text style={styles.author}>
            {welcome.author.toUpperCase()}
          </Text>
        </View>

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

  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingHorizontal: 12,
  },
  logo: {
    width: width * 0.35,
    height: 50,
    resizeMode: 'cover',
  },
  content: {
    alignItems: "center",
    paddingTop: 300,
  },
  hello: {
    fontSize: 42,
    fontWeight: 800,
    color: "#0f172a",
  },
  name: {
    fontSize: 38,
    fontWeight: 800,
    color: "#3b5bfd",
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 18,
    color: "#94a3b8",
    lineHeight: 24,
  },
  quoteBox: {
    marginTop: 200,
    alignItems: "center",
    paddingHorizontal: 12,
  },
  quote: {
    fontSize: 16,
    color: "#475569",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 8,
  },
  author: {
    fontSize: 12,
    color: "#94a3b8",
    letterSpacing: 1,
    fontWeight: "600",
  },
});
