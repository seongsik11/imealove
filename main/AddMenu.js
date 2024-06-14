import {StyleSheet, View, Text, Pressable, TextInput, Alert, ScrollView} from "react-native";
import {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LinearGradient} from "expo-linear-gradient";

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

    const navigation = useNavigation();

    const totalCal = (parseInt(breakfastCal) || 0) + (parseInt(lunchCal) || 0) + (parseInt(dinnerCal) || 0);

    let backgroundColor;

    if (totalCal === 0) {
        backgroundColor = '#f1f1f1';
    }
    else if (totalCal <= 1000) {
        backgroundColor = '#CFFFB8';
    } else if (totalCal > 1000 && totalCal <= 1500) {
        backgroundColor = '#83D15E';
    } else if (totalCal > 1500 && totalCal <= 2000) {
        backgroundColor = '#FFA51E';
    } else {
        backgroundColor = '#FF5959';
    }



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
        Alert.alert(
            '알림',
            '식단을 추가하시겠습니까?',
            [
                {
                    text: '취소',
                    onPress: () => console.log('취소됨'),
                    style: 'cancel',
                },
                {
                    text: '확인',
                    onPress: async () => {
                        if (!date || !breakfast || !breakfastCal || !lunch || !lunchCal || !dinner || !dinnerCal) {
                            Alert.alert('알림', '모든 항목을 입력해주세요.');
                            return;
                        }

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
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.label}>아침 메뉴</Text>
            <TextInput
                style={{...styles.input, height: 100}}
                value={breakfast}
                onChangeText={setBreakfast}
                placeholder="아침 메뉴를 입력하세요. ex) 밥, 닭가슴살, 물"
                multiline={true}
                textAlignVertical="top"
            />
            <Text style={styles.label}>아침 칼로리</Text>
            <TextInput
                style={{...styles.input, height: 40}}
                value={breakfastCal}
                onChangeText={setBreakfastCal}
                placeholder="아침 칼로리를 입력하세요. ex) 500"
                keyboardType="numeric"
            />
            <Text style={styles.label}>점심 메뉴</Text>
            <TextInput
                style={{...styles.input, height: 100}}
                value={lunch}
                onChangeText={setLunch}
                placeholder="점심 메뉴를 입력하세요. ex) 밥, 닭가슴살, 물"
                multiline={true}
                textAlignVertical="top"
            />
            <Text style={styles.label}>점심 칼로리</Text>
            <TextInput
                style={{...styles.input, height: 40}}
                value={lunchCal}
                onChangeText={setLunchCal}
                placeholder="점심 칼로리를 입력하세요. ex) 500"
                keyboardType="numeric"
            />
            <Text style={styles.label}>저녁 메뉴</Text>
            <TextInput
                style={{...styles.input, height: 100}}
                value={dinner}
                onChangeText={setDinner}
                placeholder="저녁 메뉴를 입력하세요. ex) 밥, 닭가슴살, 물"
                multiline={true}
                textAlignVertical="top"
            />
            <Text style={styles.label}>저녁 칼로리</Text>
            <TextInput
                style={{...styles.input, height: 40}}
                value={dinnerCal}
                onChangeText={setDinnerCal}
                placeholder="저녁 칼로리를 입력하세요. ex) 500"
                keyboardType="numeric"
            />

            <Text style={styles.label}>하루 식단 총 칼로리</Text>
            <View style={[styles.calContainer, { backgroundColor }]}>
                {totalCal !== null && (
                    <Text style={styles.totalCal}>{totalCal} kcal</Text>
                )}
            </View>
            <View style={{flex: 1, flexDirection:'row', marginTop: 10}}>
                <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                    <View style={{width: 28, height: 18, backgroundColor:'#CFFFB8', marginRight: 5}}></View>
                    <Text style={{fontSize:12, fontWeight: 400, color:'#5E5E5E'}}>좋음</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                    <View style={{width: 28, height: 18, backgroundColor:'#83D15E', marginRight: 5}}></View>
                    <Text style={{fontSize:12, fontWeight: 400, color:'#5E5E5E'}}>보통</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                    <View style={{width: 28, height: 18, backgroundColor:'#FFA51E', marginRight: 5}}></View>
                    <Text style={{fontSize:12, fontWeight: 400, color:'#5E5E5E'}}>살짝 높음</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                    <View style={{width: 28, height: 18, backgroundColor:'#FF5959', marginRight: 5}}></View>
                    <Text style={{fontSize:12, fontWeight: 400, color:'#5E5E5E'}}>매우 높음</Text>
                </View>
            </View>
            <Pressable
                style={styles.button}
                onPress={handleSubmit}
            >
                <LinearGradient
                    colors={['#FF00D6', '#FF4D00']}
                    style={styles.gradient}
                >
                    <Text style={styles.buttonText}>추가하기</Text>
                </LinearGradient>
            </Pressable>
        </ScrollView>
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
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingVertical: 40,
        paddingBottom: 100, // 추가 공간 확보
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#5E5E5E',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 16,
        paddingHorizontal: 10,
    },
    calContainer:{
        borderWidth: 1,
        borderColor: '#B5B5B5',
        borderRadius: 10,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height: 150,
    },
    totalCal: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#5E5E5E',
    },
    button: {
        marginTop: 40,
        height: 50,
        borderRadius: 8,
    },
    gradient: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
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