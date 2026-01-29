import { Text, View, StyleSheet } from "react-native";

export default function Inactive() {
    return (
            <View style={styles.main}>
                <Text style={styles.text}>No inactive project found</Text>

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