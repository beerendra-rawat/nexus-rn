import { StyleSheet, Image, Text, View } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ProjectsScreen() {

    return (
        <SafeAreaView style={styles.safeArea}>
            <Image
                source={require("../assets/img/bgImg.png")}
                style={styles.background}
                resizeMode="cover"
            />
            <View style={styles.main}>
                <Text style={styles.title}>Allocations</Text>
            </View>
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
        height: "110%",
        transform: [{ rotate: "180deg" }],
    },
    main: {
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    title: {
        fontSize: 26,
        fontWeight: 800,
    }
})