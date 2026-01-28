import { View, Text, StyleSheet, Image } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from "../components/SearchBar";
export default function SearchScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Image
                source={require("../assets/img/bgImg.png")}
                style={styles.background}
                resizeMode="cover"
            />

            <SearchBar />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffff',
    },
    background: {
        position: "absolute",
        width: "100%",
        height: "108%",
        transform: [{ rotate: "180deg" }],
    },
})