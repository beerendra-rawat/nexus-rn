import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";

export default function WeekHeader({
  weekStart,
  onPrev,
  onNext,
  onCalendarPress,
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
          <Ionicons name="chevron-back" size={26} />
        </TouchableOpacity>

        <Text style={styles.dateText}>
          {start.format("MMM DD")} - {end.format("MMM DD, YYYY")}
        </Text>

        <TouchableOpacity
          onPress={!isCurrentWeek ? onNext : undefined}
          disabled={isCurrentWeek}
          style={[styles.arrowBtn, isCurrentWeek && styles.disabled]}
        >
          <Ionicons name="chevron-forward" size={26} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={onCalendarPress}
        style={styles.calendarBtn}
      >
        <Ionicons name="calendar-outline" size={26} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 12,
  },
  dateBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrowBtn: {
    padding: 6,
  },
  disabled: {
    opacity: 0.3,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 12,
  },
  calendarBtn: {
    padding: 6,
    borderRadius: 12,
  },
});
