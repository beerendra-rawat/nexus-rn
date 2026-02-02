import {
    View,
    Text,
    StyleSheet,
    Image,
    Platform,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import dayjs from "dayjs";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

import WeekHeader from "../components/WeekHeader";
import TimesheetDayCard from "../components/TimesheetDayCard";


const getCurrentWeekMonday = () => {
    const today = dayjs();
    return today.day() === 0
        ? today.subtract(6, "day")
        : today.startOf("week").add(1, "day");
};

export default function TimesheetScreen() {
    const navigation = useNavigation();

    const [weekStart, setWeekStart] = useState(getCurrentWeekMonday());
    const [showCalendar, setShowCalendar] = useState(false);

    const onDateChange = (event, selectedDate) => {
        setShowCalendar(false);
        if (!selectedDate) return;

        const picked = dayjs(selectedDate);
        const monday =
            picked.day() === 0
                ? picked.subtract(6, "day")
                : picked.startOf("week").add(1, "day");

        setWeekStart(monday);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* background */}
            <Image
                source={require("../assets/img/bgImg.png")}
                style={styles.background}
                resizeMode="cover"
            />

            {/* title */}
            <View style={styles.main}>
                <Text style={styles.title}>Timesheet</Text>
            </View>

            {/* week header */}
            <WeekHeader
                weekStart={weekStart}
                onPrev={() => setWeekStart(weekStart.subtract(7, "day"))}
                onNext={() => setWeekStart(weekStart.add(7, "day"))}
                onCalendarPress={() => setShowCalendar(true)}
            />

            {/* calendar */}
            {showCalendar && (
                <DateTimePicker
                    value={weekStart.toDate()}
                    mode="date"
                    display={Platform.OS === "ios" ? "inline" : "calendar"}
                    onChange={onDateChange}
                />
            )}

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 24, marginTop: 12 }}>
                    {[...Array(7)].map((_, i) => {
                        const date = weekStart.add(i, "day");
                        return (
                            <TimesheetDayCard
                                key={i}
                                date={date}
                                onPress={() =>
                                    navigation.navigate("TaskList", {
                                        date: date.format("YYYY-MM-DD"),
                                    })
                                }
                            />
                        );
                    })}
                </View>
            </ScrollView>

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
    main: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    title: {
        fontSize: 26,
        fontWeight: "800",
    },
});
