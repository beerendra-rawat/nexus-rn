import {
    Text,
    View,
    StyleSheet
} from "react-native";

export default function Inactive() {
    return (
        <View style={styles.main}>
            <View style={styles.card}>
                <View style={styles.overlay} />
                <View style={styles.cardContent}>
                    <Text style={styles.title}>No Inactive Projects</Text>
                    <Text style={styles.subtitle}>
                        All projects are currently active or upcoming.
                    </Text>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    main: {
        paddingVertical: 16,
    },
    card: {
        height: 160,
        backgroundColor: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#2563eb",
        opacity: 0.03,
    },
    cardContent: {
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 14,
        color: "#64748b",
        textAlign: "center",
        lineHeight: 20,
    },
});
