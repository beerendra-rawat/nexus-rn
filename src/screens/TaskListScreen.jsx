// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
// } from "react-native";
// import { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function TaskListScreen({ route }) {
//   const { date } = route.params;

//   const [task, setTask] = useState("");
//   const [hours, setHours] = useState("");
//   const [tasks, setTasks] = useState([]);

//   const TASK_KEY = `TASKS_${date}`;
//   const SUMMARY_KEY = `SUMMARY_${date}`;

//   useEffect(() => {
//     loadTasks();
//   }, []);

//   const loadTasks = async () => {
//     const saved = await AsyncStorage.getItem(TASK_KEY);
//     if (saved) setTasks(JSON.parse(saved));
//   };

//   const saveSummary = async (list) => {
//     const totalTasks = list.length;
//     const totalHours = list.reduce(
//       (sum, item) => sum + Number(item.hours),
//       0
//     );

//     await AsyncStorage.setItem(
//       SUMMARY_KEY,
//       JSON.stringify({ totalTasks, totalHours })
//     );
//   };

//   const addTask = async () => {
//     if (!task || !hours) return;

//     const newTask = {
//       id: Date.now(),
//       task,
//       hours: Number(hours),
//     };

//     const updated = [...tasks, newTask];
//     setTasks(updated);

//     await AsyncStorage.setItem(TASK_KEY, JSON.stringify(updated));
//     await saveSummary(updated);

//     setTask("");
//     setHours("");
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tasks – {date}</Text>

//       <TextInput
//         placeholder="Task name"
//         value={task}
//         onChangeText={setTask}
//         style={styles.input}
//       />

//       <TextInput
//         placeholder="Hours (eg: 2)"
//         value={hours}
//         onChangeText={setHours}
//         keyboardType="numeric"
//         style={styles.input}
//       />

//       <TouchableOpacity style={styles.addBtn} onPress={addTask}>
//         <Text style={styles.addText}>+ Add Task</Text>
//       </TouchableOpacity>

//       <FlatList
//         data={tasks}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.taskRow}>
//             <Text>{item.task}</Text>
//             <Text>{item.hours}h</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: "#fff" },
//   title: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 10,
//   },
//   addBtn: {
//     backgroundColor: "#6C63FF",
//     padding: 12,
//     borderRadius: 10,
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   addText: { color: "#fff", fontWeight: "600" },
//   taskRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 12,
//     borderBottomWidth: 1,
//     borderColor: "#eee",
//   },
// });




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
    const saved = await AsyncStorage.getItem(TASK_KEY);
    if (saved) setTasks(JSON.parse(saved));
  };

  const addTask = async () => {
    if (!task || !hours) return;

    const newTask = {
      id: Date.now().toString(),
      task,
      hours: Number(hours),
    };

    const updated = [...tasks, newTask];
    setTasks(updated);

    await AsyncStorage.setItem(TASK_KEY, JSON.stringify(updated));
    setTask("");
    setHours("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Background */}
      <Image
        source={require("../assets/img/bgImg.png")}
        style={styles.background}
        resizeMode="cover"
      />

      {/* Content */}
      <View style={styles.container}>

        {/* ✅ Custom Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../assets/img/leftArrow.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <Text style={styles.title}>Tasks – {date}</Text>
        </View>

        {/* Inputs */}
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

        {/* Task List */}
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },

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

  /* Header */
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

  taskText: { fontSize: 14, color: "#0f172a" },
  hoursText: { fontSize: 14, fontWeight: "600", color: "#2563eb" },
});
