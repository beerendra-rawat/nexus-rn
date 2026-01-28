import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { userInfoData, userProfile } from '../data/UserInfoData';

export default function UserInfo() {

    const handlePress = (item) => {
        if (!item.clickable) return;

        if (item.actionType === 'phone') {
            Linking.openURL(`tel:${item.value}`);
        } else if (item.actionType === 'email') {
            Linking.openURL(`mailto:${item.value}`);
        } else if (item.actionType === 'profile') {
            console.log('Open profile:', item.value);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>

            <View style={styles.main}>
                <View style={styles.topRow}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{userProfile.shortName}</Text>
                    </View>

                    <View style={styles.nameWrap}>
                        <Text style={styles.name}>{userProfile.name}</Text>
                    </View>

                    <View style={styles.status}>
                        <Text style={styles.statusText}>{userProfile.status}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.info}>
                    {userInfoData.map((item) => {
                        const Wrapper = item.clickable ? TouchableOpacity : View;

                        return (
                            <Wrapper
                                key={item.id}
                                style={styles.item}
                                onPress={() => handlePress(item)}
                                activeOpacity={0.7}
                            >
                                <Image source={item.icon} style={styles.icon} />

                                <View>
                                    <Text style={styles.label}>{item.label}</Text>
                                    <Text
                                        style={[
                                            styles.value,
                                            item.clickable && styles.link,
                                        ]}
                                    >
                                        {item.value}
                                    </Text>
                                </View>
                            </Wrapper>
                        );
                    })}
                </View>

                <View style={styles.divider} />

                <View style={styles.progressWrap}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressLabel}>Total Allocation</Text>
                        <Text style={styles.progressValue}>
                            {userProfile.allocation}%
                        </Text>
                    </View>

                    <View style={styles.progressTrack}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: `${userProfile.allocation}%` },
                            ]}
                        />
                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    main: {
        margin: 12,
        backgroundColor: '#ffff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },

    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },

    avatar: {
        width: 52,
        height: 52,
        borderRadius: 14,
        backgroundColor: '#f1f5f9',
        justifyContent: 'center',
        alignItems: 'center',
    },

    avatarText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#0f172a',
    },

    nameWrap: {
        flex: 1,
        marginLeft: 12,
    },

    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#0f172a',
    },

    status: {
        backgroundColor: '#dcfce7',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },

    statusText: {
        color: '#15803d',
        fontWeight: '600',
    },

    divider: {
        height: 1,
        backgroundColor: '#e5e7eb',
        marginHorizontal: 12,
    },

    info: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 12,
        paddingVertical: 24,
    },

    item: {
        width: '50%',
        flexDirection: 'row',
        marginBottom: 16,
    },

    icon: {
        width: 22,
        height: 22,
        tintColor: '#2563eb',
        marginRight: 8,
        marginTop: 8,
    },

    label: {
        fontSize: 13,
        color: '#64748b',
        fontWeight: '600',
        textTransform: 'uppercase',
    },

    value: {
        fontSize: 16,
        color: '#0f172a',
        fontWeight: '500',
        marginTop: 2,
    },

    link: {
        color: '#2563eb',
    },

    progressWrap: {
        paddingVertical: 24,
        paddingHorizontal: 12,
    },

    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },

    progressLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748b',
        textTransform: 'uppercase',
    },

    progressValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0f172a',
    },

    progressTrack: {
        height: 6,
        backgroundColor: '#e5e7eb',
        borderRadius: 6,
        overflow: 'hidden',
    },

    progressFill: {
        height: '100%',
        backgroundColor: '#16a34a',
    },
});
