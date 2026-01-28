import { Text, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { allocationsData } from '../data/allocationsData';

export default function Active() {
    return (
        <SafeAreaView style={styles.safeArea}>
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
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        padding: 12,
        marginTop: 12,
        paddingVertical: 24,
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
        fontWeight: '600',
        color: '#1e293b',
    },

    cardHeaderText: {
        flex: 1,
    },

    projectName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0f172a',
    },

    subText: {
        fontSize: 12,
        color: '#64748b',
        marginTop: 2,
    },

    innerDivider: {
        height: 1,
        backgroundColor: '#e5e7eb',
        marginVertical: 30,
    },

    detailRow: {
        marginBottom: 8,
    },

    detailLabel: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '500',
    },

    detailValue: {
        fontSize: 13,
        color: '#0f172a',
        fontWeight: '500',
        marginTop: 2,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },

    detailIcon: {
        width: 16,
        height: 16,
        tintColor: '#0f172a',
        marginRight: 8,
        marginTop: 2,
    },


    progressTrack: {
        height: 3,
        backgroundColor: '#e5e7eb',
        borderRadius: 4,
        overflow: 'hidden',
        marginTop: 10,
    },

    progressFill: {
        height: '100%',
        backgroundColor: '#2563eb',
    },
})