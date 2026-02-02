import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Image,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const isValidTime = (time) => {
    // HH:MM (0–16 hours)
    const regex = /^([0-9]|1[0-6]):[0-5][0-9]$/;
    return regex.test(time);
};

const timeToDecimal = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h + m / 60;
};

const decimalToTime = (decimal) => {
    const h = Math.floor(decimal);
    const m = Math.round((decimal - h) * 60);
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

export default function TaskListScreen({ route, navigation }) {
    const { date } = route.params;

    const [task, setTask] = useState("");
    const [hours, setHours] = useState("");
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");

    const TASK_KEY = `TASKS_${date}`;

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const saved = await AsyncStorage.getItem(TASK_KEY);
        if (saved) setTasks(JSON.parse(saved));
    };

    const totalHoursDecimal = tasks.reduce(
        (sum, t) => sum + Number(t.hours || 0), 0);

    const addTask = async () => {
        setError("");

        if (!task.trim() || !hours.trim()) {
            setError("Task name and time are required");
            return;
        }

        if (!isValidTime(hours)) {
            setError("Enter time in HH:MM format (e.g. 1:30)");
            return;
        }

        const enteredDecimal = timeToDecimal(hours);

        if (enteredDecimal <= 0) {
            setError("Time must be greater than 0");
            return;
        }

        if (totalHoursDecimal + enteredDecimal > 16) {
            setError(
                `Only ${decimalToTime(16 - totalHoursDecimal)} hours left`
            );
            return;
        }

        const newTask = {
            id: Date.now().toString(),
            task: task.trim(),
            time: hours,               // HH:MM (display)
            hours: enteredDecimal,     // decimal (calculation)
        };

        const updated = [...tasks, newTask];
        setTasks(updated);
        await AsyncStorage.setItem(TASK_KEY, JSON.stringify(updated));

        setTask("");
        setHours("");
    };

    const isDayFull = totalHoursDecimal >= 16;

    return (
        <SafeAreaView style={styles.safeArea}>
            <Image
                source={require("../assets/img/bgImg.png")}
                style={styles.background}
                resizeMode="cover"
            />

            <View style={styles.container}>

                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={require("../assets/img/leftArrow.png")}
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>Tasks – {date}</Text>
                </View>

                <Text
                    style={[
                        styles.totalText,
                        isDayFull && { color: "#dc2626" },
                    ]}
                >
                    Total Time: {decimalToTime(totalHoursDecimal)} / 16:00
                </Text>

                <TextInput
                    placeholder="Task name"
                    value={task}
                    onChangeText={setTask}
                    editable={!isDayFull}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Hours (HH:MM)"
                    value={hours}
                    onChangeText={setHours}
                    editable={!isDayFull}
                    keyboardType="numeric"
                    style={styles.input}
                />

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity
                    style={[styles.addBtn, isDayFull && styles.disabledBtn]}
                    onPress={addTask}
                    disabled={isDayFull}
                >
                    <Text style={styles.addText}>+ Add Task</Text>
                </TouchableOpacity>

                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 24 }}
                    renderItem={({ item }) => (
                        <View style={styles.taskRow}>
                            <Text style={styles.taskText}>{item.task}</Text>
                            <Text style={styles.hoursText}>{item.time}</Text>
                        </View>
                    )}
                />
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
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 12,
    },
    backIcon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#0f172a",
    },
    totalText: {
        marginBottom: 12,
        fontSize: 14,
        fontWeight: "600",
        color: "#2563eb",
    },
    input: {
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        backgroundColor: "#fff",
    },
    errorText: {
        color: "#dc2626",
        marginBottom: 12,
        fontSize: 13,
        fontWeight: "500",
    },
    addBtn: {
        backgroundColor: "#2563eb",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 16,
    },
    disabledBtn: {
        backgroundColor: "#94a3b8",
    },
    addText: {
        color: "#fff",
        fontWeight: "600",
    },
    taskRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: "#e5e7eb",
    },
    taskText: {
        fontSize: 14,
        color: "#0f172a",
        flex: 1,
        marginRight: 8,
    },
    hoursText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#2563eb",
    },
});
