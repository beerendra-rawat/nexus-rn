import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";

export default function WeekHeader({
  weekStart,
  onPrev,
  onNext,
  onCalendarPress
}) {
  const start = dayjs(weekStart);
  const end = start.add(6, "day");

  const currentWeekMonday =
    dayjs().day() === 0
      ? dayjs().subtract(6, "day")
      : dayjs().startOf("week").add(1, "day");

  const isCurrentWeek = start.isSame(currentWeekMonday, "day");

  return (
    <View style={styles.container}>
      <View style={styles.dateBox}>
        <TouchableOpacity onPress={onPrev} style={styles.arrowBtn}>
          <Ionicons name="chevron-back" size={28} />
        </TouchableOpacity>

        <Text style={styles.dateText}>
          {start.format("MMM DD")} - {end.format("MMM DD, YYYY")}
        </Text>

        {/* 🔒 disable ONLY next arrow */}
        <TouchableOpacity
          onPress={!isCurrentWeek ? onNext : null}
          disabled={isCurrentWeek}
          style={[styles.arrowBtn, isCurrentWeek && { opacity: 0.3 }]}
        >
          <Ionicons name="chevron-forward" size={28} />
        </TouchableOpacity>
      </View>

      {/* ✅ calendar ALWAYS active */}
      <TouchableOpacity onPress={onCalendarPress} style={styles.calendarBtn}>
        <Ionicons name="calendar-outline" size={28} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },

  dateBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    height: 44,
  },

  arrowBtn: {
    padding: 10,
  },

  dateText: {
    fontSize: 16,
    fontWeight: 600,
    marginHorizontal: 12,
  },

  calendarBtn: {
    borderRadius: 14,
    justifyContent: "center"
  }
});
