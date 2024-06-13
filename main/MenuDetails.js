import {View, Text, StyleSheet, Image} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import React, {useCallback, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MenuDetails({ route }) {
    const { date, data } = route.params;

    const [nickname, setNickname] = useState('');

    console.log("해당 식단",data);

    function formatDate(dateString) {
        const parts = dateString.split('.'); // 날짜 형식에 맞게 '-'로 분할
        const year = parts[0];
        const month = parts[1];
        const day = parts[2];

        return `${month}월 ${day}일`;
    }


    const formattedDate = formatDate(date);

    useFocusEffect(
        React.useCallback(() => {
            async function fetchData() {
                const nickname = await AsyncStorage.getItem('nickname');
                setNickname(nickname);
                console.log("저장된 닉네임", nickname);
            }

            fetchData();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={{backgroundColor:'#fff', flex: 3}}>
                <Image
                    source={require('../assets/Ellipse.png')}
                    style={styles.profileImage}
                />
                <Text style={{fontSize:20, alignSelf:'center'}}>{nickname}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Image
                    source={require('../assets/Rectangle.png')}
                    style={styles.image}
                />
                <View style={styles.menuContainer}>
                    <Text style={{ fontSize: 18, color: '#555', marginBottom: 3,}}>{formattedDate} 식단 정보</Text>
                    <View style={{width: 150, borderBottomWidth:1, borderBottomColor: '#333', marginBottom: 20}}></View>
                    <View style={styles.menuBox}>
                        <Text style={styles.heading}>
                            - 아침
                            <Text style={styles.calories}>(총 {data.totalCalories.breakfast}kcal)</Text>
                        </Text>
                        <View style={styles.foodList}>
                            {data.breakfast.split(',').map((food, index) => (
                                <Text key={index} style={styles.foodItem}>
                                    • {food.trim()}
                                </Text>
                            ))}
                        </View>
                    </View>
                    <View style={styles.menuBox}>
                        <Text style={styles.heading}>
                            - 점심
                            <Text style={styles.calories}>(총 {data.totalCalories.lunch}kcal)</Text>
                        </Text>
                        <View style={styles.foodList}>
                            {data.lunch.split(',').map((food, index) => (
                                <Text key={index} style={styles.foodItem}>
                                    • {food.trim()}
                                </Text>
                            ))}
                        </View>
                    </View>
                    <View style={styles.menuBox}>
                        <Text style={styles.heading}>
                            - 저녁
                            <Text style={styles.calories}>(총 {data.totalCalories.dinner}kcal)</Text>
                        </Text>
                        <View style={styles.foodList}>
                            {data.dinner.split(',').map((food, index) => (
                                <Text key={index} style={styles.foodItem}>
                                    • {food.trim()}
                                </Text>
                            ))}
                        </View>
                    </View>
                    <View style={{...styles.menuBox, alignSelf:'flex-end',}}>
                        <Text style={styles.heading}>
                          총 {data.totalCalories.total}kcal
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    profileImage: {
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 10,
        width: 150,
        height: 150,
        borderRadius: 100,
        borderColor: '#4992ff',
        borderWidth: 4
    },
    image: {
        width: '100%',
        height: '100%',
    },
    detailsContainer: {
        flex: 7,
    },
    menuContainer: {
        position: 'absolute',
        top: '7%', // Adjust as needed
        width: '90%', // Adjust as needed
        height: '85%', // Adjust as needed
        borderRadius: 10,
        backgroundColor: '#fff',
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    menuBox: {
        marginBottom: 15,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#646464',
        marginBottom: 10,
    },
    calories:{
        fontSize: 14,
        fontWeight: 'normal',
        color: '#646464',
    },
    foodList: {
        marginLeft: 25,
    },
    foodItem: {
        fontSize: 16,
        color: '#5E5E5E',
        marginBottom: 5,
    },
});