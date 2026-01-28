import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import { allocationsData } from '../data/allocationsData';
import SearchBar from './SearchBar';

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
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.main}>
                <Text style={styles.title}>
                    {allocationsData.header.title}
                </Text>

                <SearchBar onPress={() => console.log('Search tapped')} />

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
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },

    main: {
        margin: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        padding: 16,
    },

    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: 12,
    },

    tabs: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 12,
    },

    tabText: {
        fontSize: 13,
        color: '#64748b',
        fontWeight: '500',
    },

    activeTab: {
        color: '#0f172a',
        fontWeight: '700',
        borderBottomWidth: 2,
        borderBottomColor: '#2563eb',
        paddingBottom: 4,
    },

    divider: {
        height: 1,
        backgroundColor: '#e5e7eb',
        marginVertical: 12,
    },
});
