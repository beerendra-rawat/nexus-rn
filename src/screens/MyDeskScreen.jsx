import { View, Text, StyleSheet, Image } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
export default function MyDeskScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Image
                source={require("../assets/img/bgImg.png")}
                style={styles.background}
                resizeMode="cover"
            />
        </SafeAreaView>
    )
}
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
})