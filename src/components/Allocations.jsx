import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState } from 'react';
import { allocationsData } from '../data/allocationsData';

import Active from './Active';
import Upcoming from './Upcoming';
import Inactive from './Inactive';

export default function Allocations() {
    const [activeTab, setActiveTab] = useState('Active');

    const renderContent = () => {
        switch (activeTab) {
            case 'Active':
                return <Active />;
            case 'Upcoming':
                return <Upcoming />;
            case 'Inactive':
                return <Inactive />;
            default:
                return null;
        }
    };
    return (
        <View style={styles.main}>

            <View style={styles.tabs}>
                {allocationsData.tabs.map(tab => (
                    <Pressable
                        key={tab.id}
                        onPress={() => setActiveTab(tab.label)}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === tab.label && styles.activeTab,
                            ]}
                        >
                            {tab.label} ({tab.count})
                        </Text>
                    </Pressable>
                ))}
            </View>

            <View style={styles.divider} />

            {renderContent()}
        </View>
    );
}
const styles = StyleSheet.create({
    main: {
        paddingVertical: 12,
    },
    tabs: {
        flexDirection: 'row',
        gap: 18,
        marginTop: 12,
    },
    tabText: {
        fontSize: 14,
        color: '#64748b',
        fontWeight: 600,
    },
    activeTab: {
        color: '#0f172a',
        fontSize: 16,
        fontWeight: 600,
        borderBottomWidth: 4,
        borderBottomColor: '#2563eb',
        paddingBottom: 6,
    },
    divider: {
        height: 1,
        backgroundColor: '#e5e7eb',
    },
});
