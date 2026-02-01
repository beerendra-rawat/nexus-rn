import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";

export default function TimesheetDayCard({ date, status = "2 Tasks", hours = "0h 00m", onPress }) {
    const day = dayjs(date);

    const isToday = day.isSame(dayjs(), "day");


    return (
        <TouchableOpacity style={[ styles.card, isToday && { backgroundColor: "#EDEAFF" }]}
            onPress={onPress}
        >


            {/* LEFT DATE CARD */}
            <View style={styles.dateCard}>
                <View style={styles.monthBox}>
                    <Text style={styles.monthText}>{day.format("MMM")}</Text>
                </View>

                <View style={styles.dayBox}>
                    <Text style={styles.dayNumber}>{day.format("DD")}</Text>
                </View>
            </View>

            {/* MIDDLE INFO */}
            <View style={styles.info}>
                <Text style={styles.dayName}>{day.format("dddd")}</Text>
                <Text style={styles.status}>{status}</Text>
            </View>

            {/* RIGHT HOURS */}
            <View style={styles.right}>
                <Text style={styles.hours}>{hours}</Text>
                <Ionicons name="chevron-forward" size={18} color="#B0B0B0" />
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        // backgroundColor: "#F5F5F7",
        borderRadius: 14,
        padding: 12,
        marginBottom: 10,
    },

    /* LEFT DATE CARD */
    dateCard: {
        width: 52,
        borderRadius: 10,
        overflow: "hidden",
        marginRight: 12,
    },

    monthBox: {
        backgroundColor: "#6C63FF",
        alignItems: "center",
        paddingVertical: 4,
    },

    monthText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },

    dayBox: {
        backgroundColor: "#fff",
        alignItems: "center",
        paddingVertical: 6,
    },

    dayNumber: {
        fontSize: 18,
        fontWeight: "700",
    },

    /* MIDDLE */
    info: {
        flex: 1,
    },

    dayName: {
        fontSize: 15,
        fontWeight: "600",
    },

    status: {
        fontSize: 12,
        color: "#888",
        marginTop: 2,
    },

    /* RIGHT */
    right: {
        flexDirection: "row",
        alignItems: "center",
    },

    hours: {
        fontSize: 12,
        color: "#999",
        marginRight: 6,
    },
});
