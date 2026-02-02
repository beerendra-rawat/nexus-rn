import { Text, View, StyleSheet, Image } from "react-native";
import { allocationsData } from "../data/allocationsData";

export default function Active() {
    return (
        <View style={styles.main}>
            {allocationsData.projects.map(project => (
                <View key={project.id} style={styles.card}>

                    {/* OPACITY OVERLAY */}
                    <View style={styles.overlay} />

                    {/* CONTENT */}
                    <View style={styles.cardContent}>

                        {/* Header */}
                        <View style={styles.cardHeader}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>
                                    {project.shortName}
                                </Text>
                            </View>

                            <View style={styles.cardHeaderText}>
                                <Text style={styles.projectName}>
                                    {project.name}
                                </Text>
                                <Text style={styles.subText}>
                                    {project.subText}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.innerDivider} />

                        {/* Details */}
                        {project.details.map(detail => (
                            <View key={detail.id} style={styles.detailRow}>
                                <Image source={detail.icon} style={styles.detailIcon} />

                                <View>
                                    <Text style={styles.detailLabel}>
                                        {detail.label}
                                    </Text>
                                    <Text style={styles.detailValue}>
                                        {detail.value}
                                    </Text>
                                </View>
                            </View>
                        ))}

                        {/* Progress */}
                        <View style={styles.progressTrack}>
                            <View
                                style={[
                                    styles.progressFill,
                                    { width: `${project.progress}%` },
                                ]}
                            />
                        </View>

                    </View>
                </View>
            ))}
        </View>
    );
}
const styles = StyleSheet.create({
    main: {
        paddingVertical: 16,
    },

    /* ===== CARD ===== */
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        marginBottom: 16,
        overflow: "hidden", // 🔥 IMPORTANT for overlay
        elevation: 4,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
    },

    /* OPACITY LAYER */
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#2563eb",
        opacity: 0.03, // 👈 subtle overlay
    },

    cardContent: {
        padding: 18,
    },

    /* ===== HEADER ===== */
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#e0e7ff",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    avatarText: {
        fontSize: 18,
        fontWeight: "800",
        color: "#1e293b",
    },

    cardHeaderText: {
        flex: 1,
    },

    projectName: {
        fontSize: 18,
        fontWeight: "800",
        color: "#0f172a",
    },

    subText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#64748b",
        marginTop: 2,
    },

    innerDivider: {
        height: 1,
        backgroundColor: "#e5e7eb",
        marginVertical: 14,
    },

    /* ===== DETAILS ===== */
    detailRow: {
        flexDirection: "row",
        marginBottom: 14,
    },

    detailIcon: {
        width: 18,
        height: 18,
        tintColor: "#2563eb",
        marginRight: 10,
        marginTop: 3,
    },

    detailLabel: {
        fontSize: 13,
        color: "#64748b",
    },

    detailValue: {
        fontSize: 14,
        color: "#0f172a",
        fontWeight: "600",
        marginTop: 2,
    },

    /* ===== PROGRESS ===== */
    progressTrack: {
        height: 6,
        backgroundColor: "#e5e7eb",
        borderRadius: 6,
        overflow: "hidden",
        marginTop: 6,
    },

    progressFill: {
        height: "100%",
        backgroundColor: "#2563eb",
        borderRadius: 6,
    },
});
