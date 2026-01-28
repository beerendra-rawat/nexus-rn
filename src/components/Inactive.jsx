import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Inactive() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.main}>
                <Text>No inactive project found</Text>

            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },

    main: {
        margin: 12,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        padding: 16,
    },
})