import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function TimesheetDayCard({ date, onPress }) {
    const day = dayjs(date);

    const isToday = day.isSame(dayjs(), "day");
    const isFuture = day.isAfter(dayjs(), "day");
    const isWeekend = day.day() === 0 || day.day() === 6;

    const [taskCount, setTaskCount] = useState(0);
    const [totalHours, setTotalHours] = useState(0);

    const TASK_KEY = `TASKS_${day.format("YYYY-MM-DD")}`;

    useFocusEffect(
        useCallback(() => {
            if (!isWeekend) {
                loadTasks();
            } else {
                setTaskCount(0);
                setTotalHours(0);
            }
        }, [date])
    );

    const loadTasks = async () => {
        try {
            const saved = await AsyncStorage.getItem(TASK_KEY);
            if (!saved) {
                setTaskCount(0);
                setTotalHours(0);
                return;
            }

            const tasks = JSON.parse(saved);
            const total = tasks.reduce(
                (sum, t) => sum + Number(t.hours || 0),
                0
            );
            setTaskCount(tasks.length);
            setTotalHours(total);
        } catch (error) {
            console.log("Error loading tasks:", error);
            setTaskCount(0);
            setTotalHours(0);
        }
    };

    return (
        <TouchableOpacity
            disabled={isFuture || isWeekend}
            onPress={onPress}
            activeOpacity={0.7}
            style={[
                styles.card,
                isToday && !isWeekend && styles.today,
                isWeekend && styles.weekOffCard,
            ]}
        >
            <View style={styles.dateCard}>
                <View style={styles.monthBox}>
                    <Text style={styles.monthText}>{day.format("MMM")}</Text>
                </View>
                <View style={styles.dayBox}>
                    <Text style={styles.dayNumber}>{day.format("DD")}</Text>
                </View>
            </View>

            <View style={styles.info}>
                <Text style={styles.dayName}>{day.format("dddd")}</Text>

                {isWeekend ? (
                    <Text style={styles.weekOffText}>Week Off</Text>
                ) : taskCount > 0 ? (
                    <Text style={styles.status}>
                        {taskCount} {taskCount === 1 ? "Task" : "Tasks"}
                    </Text>
                ) : (
                    <Text style={styles.noTask}>No Tasks</Text>
                )}
            </View>

            <View style={styles.right}>
                {!isWeekend && (
                    <>
                        <Text style={styles.hours}>
                            {taskCount > 0 ? `${totalHours}h` : "--"}
                        </Text>

                        {!isFuture && (
                            <Ionicons
                                name="chevron-forward"
                                size={18}
                                color="#B0B0B0"
                            />
                        )}
                    </>
                )}
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 14,
        padding: 12,
        marginBottom: 10,
        backgroundColor: "#F5F5F7",
    },
    today: {
        backgroundColor: "#EDEAFF",
    },
    weekOffCard: {
        backgroundColor: "#F2F2F2",
        opacity: 0.75,
    },
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
    info: {
        flex: 1,
    },
    dayName: {
        fontSize: 15,
        fontWeight: "600",
    },
    status: {
        fontSize: 12,
        color: "#252424",
        marginTop: 2,
    },
    noTask: {
        fontSize: 12,
        color: "#252424",
        marginTop: 2,
        fontStyle: "italic",
    },
    weekOffText: {
        fontSize: 12,
        color: "#252424",
        marginTop: 2,
        fontStyle: "italic",
    },
    right: {
        flexDirection: "row",
        alignItems: "center",
    },
    hours: {
        fontSize: 12,
        color: "#2563eb",
        marginRight: 6,
        fontWeight: "600",
    },
});
