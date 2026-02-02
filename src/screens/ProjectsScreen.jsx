import { StyleSheet, Image, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import { allocationsData } from "../data/allocationsData";
import Active from "../components/Active";
import Upcoming from "../components/Upcoming";
import Inactive from "../components/Inactive";

export default function ProjectsScreen() {
    const [activeTab, setActiveTab] = useState("Active");

    const renderContent = () => {
        switch (activeTab) {
            case "Active":
                return <Active />;
            case "Upcoming":
                return <Upcoming />;
            case "Inactive":
                return <Inactive />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Background Image */}
            <Image
                source={require("../assets/img/bgImg.png")}
                style={styles.background}
                resizeMode="cover"
            />

            {/* Global Padding Wrapper */}
            <View style={styles.container}>
                <Text style={styles.title}>Allocations</Text>

                {/* Tabs */}
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

                {/* Tab Content */}
                {renderContent()}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },

    background: {
        position: "absolute",
        width: "100%",
        height: "110%",
        transform: [{ rotate: "180deg" }],
    },

    /* ✅ GLOBAL PADDING APPLIED HERE */
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
    },

    title: {
        fontSize: 26,
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: 16,
    },

    tabs: {
        flexDirection: "row",
        gap: 18,
        marginTop: 12,
    },

    tabText: {
        fontSize: 14,
        color: "#64748b",
        fontWeight: "600",
    },

    activeTab: {
        color: "#0f172a",
        fontSize: 16,
        fontWeight: "600",
        borderBottomWidth: 4,
        borderBottomColor: "#2563eb",
        paddingBottom: 6,
    },

    divider: {
        height: 1,
        backgroundColor: "#e5e7eb",
        marginBottom: 12,
    },
});
