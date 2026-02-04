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
        const data = await AsyncStorage.getItem(TASK_KEY);
        console.log("saved data is : ", data)
        if (data) {
            setTasks(JSON.parse(data));
        }
    };

    const totalHours = tasks.reduce((sum, item) => sum + item.hours, 0);

    const addTask = async () => {
        if (!task || !hours) return;

        const enteredHours = Number(hours);

        if (totalHours + enteredHours > 16) {
            console.log("Cannot add more than 16 hours");
            return;
        }

        const newTask = {
            id: Date.now().toString(),
            task: task,
            hours: enteredHours,
        };

        const updated = [...tasks, newTask];
        setTasks(updated);
        await AsyncStorage.setItem(TASK_KEY, JSON.stringify(updated));

        setTask("");
        setHours("");
    };


    // const clearData = async () => {
    //     try{
    //         await AsyncStorage.clear()
    //         console.log("All data is clear in AsyncStorage")
    //     }
    //     catch(error){
    //         console.log("Something went wrong: ", error)
    //     }
    // }
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
                    placeholder="Hours (0 - 16)"
                    value={hours}
                    keyboardType="numeric"
                    style={styles.input}
                    onChangeText={(text) => {
                        // allow only numbers (max 2 digits)
                        if (!/^\d{0,2}$/.test(text)) return;
                        const num = Number(text);
                        // if above 16, force set 16
                        if (num > 16) {
                            setHours("16");
                        } else {
                            setHours(text);
                        }
                    }}
                />

                <TouchableOpacity
                    style={[
                        styles.addBtn,
                        totalHours >= 16 && styles.disabledBtn,
                    ]}
                    onPress={addTask}
                    disabled={totalHours >= 16}
                >
                    <Text style={styles.addText}>+ Add Task</Text>
                </TouchableOpacity>

                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.taskRow}>
                            <Text style={styles.taskText}>{item.task}</Text>
                            <Text style={styles.hoursText}>{item.hours}h</Text>
                        </View>
                    )}
                />

                {/* <Button onPress={clearData} title="clear data"/> */}
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
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
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
    },
    hoursText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#2563eb",
    },
});
