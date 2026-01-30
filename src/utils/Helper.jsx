import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'TIMESHEET_DATA';

export const getTimesheet = async () => {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : {};
};

export const saveEntry = async (date, hours, task) => {
    const data = await getTimesheet();
    data[date] = { hours, task };
    await AsyncStorage.setItem(KEY, JSON.stringify(data));
};

export const deleteEntry = async (date) => {
    const data = await getTimesheet();
    delete data[date];
    await AsyncStorage.setItem(KEY, JSON.stringify(data));
};



export const getCurrentWeek = () => {
    const today = new Date();
    const day = today.getDay(); // Sun = 0
    const monday = new Date(today);
    monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));

    return Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return d.toISOString().split('T')[0]; // YYYY-MM-DD
    });
};
