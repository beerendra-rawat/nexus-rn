import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import dayjs from "dayjs";

export default function Timesheet() {

  const week = useMemo(() => {
    const start = dayjs("2026-01-12"); // Monday
    return Array.from({ length: 7 }).map((_, i) => {
      const d = start.add(i, "day");
      return {
        label: d.format("ddd"),
        date: d.format("DD"),
        isWeekend: [0, 6].includes(d.day()),
      };
    });
  }, []);

  const [internHours, setInternHours] = useState(["8","8","8","8","","",""]);
  const [leaveHours, setLeaveHours] = useState(Array(7).fill(""));

  const sum = (arr) =>
    arr.reduce((t, v, i) => t + (week[i].isWeekend ? 0 : Number(v || 0)), 0);

  const renderProject = (title, hours, setHours) => (
    <View style={styles.card}>
      <Text style={styles.projectTitle}>{title}</Text>

      {week.map((d, i) => (
        <View key={i} style={styles.row}>
          <View>
            <Text style={styles.day}>{d.label}</Text>
            <Text style={styles.date}>{d.date}</Text>
          </View>

          {d.isWeekend ? (
            <View style={styles.off}>
              <Text style={styles.offText}>W-OFF</Text>
            </View>
          ) : (
            <View style={styles.right}>
              <TextInput
                style={styles.input}
                placeholder="hh"
                keyboardType="numeric"
                value={hours[i]}
                onChangeText={(v) => {
                  const copy = [...hours];
                  copy[i] = v;
                  setHours(copy);
                }}
              />
              {title === "Internship And Training" && hours[i] && (
                <Text style={styles.task}>TASKS</Text>
              )}
            </View>
          )}
        </View>
      ))}

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total Hours</Text>
        <Text style={styles.totalValue}>{sum(hours)}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.weekTitle}>Jan 12 – Jan 18, 2026</Text>
      <Text style={styles.status}>PARTIAL SUBMITTED</Text>

      {renderProject(
        "Internship And Training",
        internHours,
        setInternHours
      )}

      {renderProject("Leaves", leaveHours, setLeaveHours)}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btnGhost}>
          <Text>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnGhost}>
          <Text>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnPrimary}>
          <Text style={{ color: "#fff" }}>Submit Timesheet</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 16,
  },
  weekTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  status: {
    marginTop: 4,
    color: "#2563eb",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  projectTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  day: { fontWeight: "600" },
  date: { fontSize: 12, color: "#6b7280" },
  right: { alignItems: "center" },
  input: {
    width: 55,
    height: 38,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    textAlign: "center",
  },
  task: {
    fontSize: 11,
    marginTop: 4,
    color: "#2563eb",
    fontWeight: "600",
  },
  off: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  offText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 14,
  },
  totalLabel: { fontWeight: "600" },
  totalValue: { fontWeight: "700", fontSize: 16 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 24,
  },
  btnGhost: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    width: "30%",
    alignItems: "center",
  },
  btnPrimary: {
    padding: 12,
    backgroundColor: "#6b7280",
    borderRadius: 10,
    width: "35%",
    alignItems: "center",
  },
});
