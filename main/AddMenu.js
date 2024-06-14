import {StyleSheet, View, Text, Pressable, TextInput, Alert} from "react-native";
import {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddMenu() {
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };
    const [date, setDate] = useState(getCurrentDate());

    const [breakfast, setBreakfast] = useState('');
    const [breakfastCal, setBreakfastCal] = useState('');
    const [lunch, setLunch] = useState('');
    const [lunchCal, setLunchCal] = useState('');
    const [dinner, setDinner] = useState('');
    const [dinnerCal, setDinnerCal] = useState('');
    const [totalCal, setTotalCal] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#fff',
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
                elevation: 5,
            },
            headerLeft: () => <HeaderBackTitle title={"식단 추가하기"} navigation={navigation} />,
            headerTitle: () => <></>,
            headerRight: () => <></>,
            headerBackVisible: false,
        });
    }, []);

    const handleSubmit = async () => {
        const totalCalories = (parseInt(breakfastCal) || 0) + (parseInt(lunchCal) || 0) + (parseInt(dinnerCal) || 0);

        const menuData = {
            date,
            menu: {
                breakfast,
                lunch,
                dinner,
                totalCalories: {
                    breakfast: parseInt(breakfastCal) || 0,
                    lunch: parseInt(lunchCal) || 0,
                    dinner: parseInt(dinnerCal) || 0,
                    total: totalCalories,
                },
            },
        };

        try {
            const existingData = await AsyncStorage.getItem('menuData');
            const menuDataList = existingData ? JSON.parse(existingData) : [];

            // Check if there is already a menu entry for today
            const existingMenu = menuDataList.find(item => item.date === date);
            if (existingMenu) {
                Alert.alert('알림', '오늘 날짜로 식단이 이미 있습니다.');
            } else {
                menuDataList.push(menuData);
                await AsyncStorage.setItem('menuData', JSON.stringify(menuDataList));
                setBreakfast('');
                setBreakfastCal('');
                setLunch('');
                setLunchCal('');
                setDinner('');
                setDinnerCal('');
                setDate('');
                Alert.alert('알림', '식단이 추가되었습니다.');
                navigation.goBack();
                console.log('Data saved successfully:', menuData);
            }
        } catch (e) {
            console.error('Failed to save data to AsyncStorage:', e);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>아침 메뉴</Text>
            <TextInput
                style={styles.input}
                value={breakfast}
                onChangeText={setBreakfast}
                placeholder="아침 메뉴를 입력하세요"
            />
            <Text style={styles.label}>아침 칼로리</Text>
            <TextInput
                style={styles.input}
                value={breakfastCal}
                onChangeText={setBreakfastCal}
                placeholder="아침 칼로리를 입력하세요"
                keyboardType="numeric"
            />
            <Text style={styles.label}>점심 메뉴</Text>
            <TextInput
                style={styles.input}
                value={lunch}
                onChangeText={setLunch}
                placeholder="점심 메뉴를 입력하세요"
            />
            <Text style={styles.label}>점심 칼로리</Text>
            <TextInput
                style={styles.input}
                value={lunchCal}
                onChangeText={setLunchCal}
                placeholder="점심 칼로리를 입력하세요"
                keyboardType="numeric"
            />
            <Text style={styles.label}>저녁 메뉴</Text>
            <TextInput
                style={styles.input}
                value={dinner}
                onChangeText={setDinner}
                placeholder="저녁 메뉴를 입력하세요"
            />
            <Text style={styles.label}>저녁 칼로리</Text>
            <TextInput
                style={styles.input}
                value={dinnerCal}
                onChangeText={setDinnerCal}
                placeholder="저녁 칼로리를 입력하세요"
                keyboardType="numeric"
            />
            <Pressable  onPress={handleSubmit}>
                <Text style={{ color: '#333', fontSize: 16}}>추가하기</Text>
            </Pressable>
            {totalCal !== null && <Text style={styles.totalCal}>총 칼로리: {(parseInt(breakfastCal) || 0) + (parseInt(lunchCal) || 0) + (parseInt(dinnerCal) || 0)}</Text>}
        </View>
    );
}

export const HeaderBackTitle = (props) => {
    return (
        <View style={stylesHeader.container}>
            <Pressable style={stylesHeader.btn} onPress={() => props.navigation.goBack()}>
                <Text style={{ color: '#333', fontSize: 12 }}>
                    <Ionicons name="chevron-back-outline" size={32} color="black" />
                </Text>
            </Pressable>
                <>
                    {props.children}
                    <Text style={stylesHeader.title}>{props.title}</Text>
                </>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 16,
        paddingHorizontal: 10,
    },
    totalCal: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

const stylesHeader = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    btn: {
        width: 35,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#474348",
    },
})