import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Image,
    Button,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TaskListScreen({ route, navigation }) {
    const { date } = route.params;

    const [task, setTask] = useState("");
    const [hours, setHours] = useState("");
    const [tasks, setTasks] = useState([]);

    const TASK_KEY = `TASKS_${date}`;

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const savedTasks = await AsyncStorage.getItem(TASK_KEY);
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    };

    const addTask = async () => {
        if (!task || !hours) return;

        const newTask = {
            id: Date.now().toString(),
            task: task,
            hours: Number(hours),
        };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);

        await AsyncStorage.setItem(TASK_KEY, JSON.stringify(updatedTasks));
        setTask("");
        setHours("");
    };

    // const cleareData = async () => {
    //     try {
    //         await AsyncStorage.clear();
    //         console.log("All AsyncStorage data cleared successfully");
    //     } catch (error) {
    //         console.error("Error clearing AsyncStorage:", error);
    //     }
    // };
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

                <TextInput
                    placeholder="Task name"
                    value={task}
                    onChangeText={setTask}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Hours (eg: 2)"
                    value={hours}
                    onChangeText={setHours}
                    // keyboardType="numeric"
                    style={styles.input}
                />

                <TouchableOpacity style={styles.addBtn} onPress={addTask}>
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
                            <Text style={styles.hoursText}>{item.hours}h</Text>
                        </View>
                    )}
                />

                {/* <Button onPress={cleareData} title="cleare data" /> */}
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
        marginBottom: 20,
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
    input: {
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        backgroundColor: "#fff",
    },
    addBtn: {
        backgroundColor: "#2563eb",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 16,
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
    },
    hoursText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#2563eb",
    },
});
