import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TaskListScreen({ route }) {
  const { date } = route.params;

  const [task, setTask] = useState("");
  const [hours, setHours] = useState("");
  const [tasks, setTasks] = useState([]);

  const STORAGE_KEY = `TASKS_${date}`;

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (saved) setTasks(JSON.parse(saved));
  };

  const addTask = async () => {
    if (!task || !hours) return;

    const newTask = {
      id: Date.now(),
      task,
      hours,
    };

    const updated = [...tasks, newTask];
    setTasks(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    setTask("");
    setHours("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks – {date}</Text>

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
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.addBtn} onPress={addTask}>
        <Text style={styles.addText}>+ Add Task</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <Text>{item.task}</Text>
            <Text>{item.hours}h</Text>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  addBtn: {
    backgroundColor: "#6C63FF",
    padding: 12,
    borderRadius: 10,
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
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
});
