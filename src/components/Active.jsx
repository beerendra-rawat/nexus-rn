import { Text, View, StyleSheet, Image } from "react-native";
import { allocationsData } from "../data/allocationsData";

export default function Active() {
    return (
        <View style={styles.main}>
            {allocationsData.projects.map(project => (
                <View key={project.id} style={styles.card}>

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
                    <View style={styles.progressTrack}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: `${project.progress}%` },
                            ]}
                        />
                    </View>

                </View>
            ))}

        </View>
    )
}
const styles = StyleSheet.create({
    main: {
        paddingHorizontal: 12,
        paddingVertical: 24,
    },
    divider: {
        height: 1,
        backgroundColor: '#e5e7eb',
        marginVertical: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#c7d2fe',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    avatarText: {
        fontSize: 18,
        fontWeight: 800,
        color: '#1e293b',
    },
    cardHeaderText: {
        flex: 1,
    },
    projectName: {
        fontSize: 18,
        fontWeight: 800,
        color: '#0f172a',
    },
    subText: {
        fontSize: 16,
        fontWeight: 600,
        color: '#64748b',
        marginTop: 2,
    },
    innerDivider: {
        height: 1,
        backgroundColor: '#e5e7eb',
        marginVertical: 12,
    },
    detailLabel: {
        fontSize: 14,
        color: '#64748b',
        fontWeight: 400,
    },
    detailValue: {
        fontSize: 14,
        color: '#0f172a',
        fontWeight: 400,
        marginTop: 2,
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: 18,
    },
    detailIcon: {
        width: 18,
        height: 18,
        tintColor: '#0f172a',
        marginRight: 8,
        marginTop: 4,
    },
    progressTrack: {
        height: 5,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#2563eb',
        borderRadius: 5,
    },
})