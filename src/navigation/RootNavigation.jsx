import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainTabs"
                component={BottomTabs}
                options={{
                    headerTransparent: true,
                    headerTitle: () => (
                        <Image
                            source={require('../assets/img/tcz.png')}
                            style={styles.logo}
                        />
                    ),
                    headerRight: () => (
                        <TouchableOpacity>
                            <Ionicons
                                name="notifications-outline"
                                size={22}
                                color="#0f172a"
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}
const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
    },
});
