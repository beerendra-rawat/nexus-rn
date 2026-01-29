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
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.main}>

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
                                <View style={styles.iconWrap}>
                                    <Image source={item.icon} style={styles.icon} />
                                </View>

                                <View style={{ flex: 1 }}>
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

                <View style={styles.progressWrap}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressLabel}>
                            Total Allocation
                        </Text>
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

    info: {
        paddingHorizontal: 16,
        paddingTop: 0,
    },

    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: '#e5e7eb',
    },

    iconWrap: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#eff6ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    icon: {
        width: 20,
        height: 20,
        tintColor: '#2563eb',
    },

    label: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748b',
        textTransform: 'uppercase',
    },

    value: {
        fontSize: 16,
        fontWeight: '500',
        color: '#0f172a',
        marginTop: 2,
    },

    link: {
        color: '#2563eb',
    },

    progressWrap: {
        paddingHorizontal: 16,
        paddingTop: 20,
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
    },

    progressValue: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0f172a',
    },

    progressTrack: {
        height: 8,
        backgroundColor: '#e5e7eb',
        borderRadius: 8,
        overflow: 'hidden',
    },

    progressFill: {
        height: '100%',
        backgroundColor: '#22c55e',
    },
});
