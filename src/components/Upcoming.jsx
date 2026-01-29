import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Upcoming() {
    return (
            <View style={styles.main}>
                <Text style={styles.text}>No upcoming project found</Text>

            </View>
    )
}
const styles = StyleSheet.create({
    main: {
        paddingTop: 100,
    },
    text:{
        textAlign: 'center',
    },
})