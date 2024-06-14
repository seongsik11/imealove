import {View, Text, StyleSheet, Pressable, FlatList, ActivityIndicator} from "react-native";
import {useCallback, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "@react-navigation/native";


export default function MainScreen({navigation}) {


    const [menuDataList, setMenuDataList] = useState(null);
    const [loading, setLoading] = useState(true);

    // const saveData = async () => {
    //     try {
    //         const jsonValue = JSON.stringify(dummyMenuData);
    //         await AsyncStorage.setItem('menuData', jsonValue);
    //     } catch (e) {
    //         console.error('Failed to save data to AsyncStorage:', e);
    //     }
    // };

    const loadData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('menuData');
            if (jsonValue != null) {
                setMenuDataList(JSON.parse(jsonValue).reverse());
            }
        } catch (e) {
            console.error('Failed to load data from AsyncStorage:', e);
        } finally {
            setLoading(false);
        }
    };

    // useFocusEffect(
    //     useCallback(() => {
    //         saveData();
    //     }, [])
    // );

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }


    const renderItem = ({ item }) => {
        return (
            <View style={styles.listItem}>
                <View style={styles.listItemLeft}>
                    <Text style={styles.dateText}>{item.date} 식단 정보</Text>
                </View>
                <Pressable
                    style={styles.listItemRight}
                    onPress={() => {
                        console.log("눌린 아이템의 데이터:", item.menu);
                        navigation.navigate('MenuDetails', { date: item.date, data: item.menu })}}
                >
                    <Text style={styles.listItemRightText}>식단표 확인 ></Text>
                </Pressable>
            </View>
        );
    };

    const onAddMenu = () => {
        navigation.navigate('AddMenu');
    }


    return (
        <View style={styles.container}>
                <FlatList
                    data={menuDataList}
                    renderItem={renderItem}
                    keyExtractor={item => item.date}
                    showsVerticalScrollIndicator={false}
                />
                <Pressable style={{flex: 1, alignItems:'center', justifyContent:'center',
                                    position: 'absolute', bottom: 80, right: 20, width: 60, height: 60, borderRadius: 50, backgroundColor:'#E08582'}}
                           onPress={onAddMenu}
                >
                    <Text style={{fontSize: 28, fontWeight: 700,color: '#fff', alignSelf: 'center', lineHeight: 40}}>+</Text>
                </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    title: {
        fontSize: 36,
        marginBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listContainer: {
        paddingBottom: 15,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 25,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: 'rgba(178, 178, 178, 0.2)',
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    listItemLeft: {
        flex: 3,
    },
    listItemRight: {
        flex: 1,
        alignItems: 'flex-end',
    },
    dateText: {
        fontSize: 16,
        color: '#888888',
        shadowColor: 'transparent',  // Remove shadow
        elevation: 0,  // Remove elevation
    },
    listItemRightText: {
        fontSize: 14,
        color: '#E08582',
        fontWeight: 'bold',
        shadowColor: 'transparent',  // Remove shadow
        elevation: 0,  // Remove elevation
    },
});