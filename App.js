import {Alert, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./home/HomePage";
import SignUpPage from "./signup/SignUpPage";
import LoginPage from "./login/LoginPage";
import MainScreen from "./main/MainPage";
import MenuDetails from "./main/MenuDetails";
import {RecoilRoot} from "recoil";
import AddMenu from "./main/AddMenu";
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function App() {


    const handleLogout = async (navigation) => {
        Alert.alert(
            '로그아웃',
            '정말 로그아웃 하시겠습니까?',
            [
                {
                    text: '취소',
                    onPress: () => console.log('취소됨'),
                    style: 'cancel',
                },
                {
                    text: '확인',
                    onPress: async () => {
                        try {
                            Alert.alert('로그아웃 되었습니다.');
                            navigation.navigate('Home'); // 예시: Login 스크린으로 이동
                        } catch (e) {
                            Alert.alert('로그아웃에 실패했습니다.');
                            console.error('Failed to Logout:', e);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

  return (
      <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" >
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }}/>
          <Stack.Screen name="SignUp" component={SignUpPage} options={{ headerShown: false }}/>
          <Stack.Screen
              name="Main"
              component={MainScreen}
              options={({ navigation }) => ({
                  headerShown: true,
                  title: '나의 식단 스케쥴',
                  headerTitleStyle: {
                      fontSize: 22,
                      fontWeight: 'bold',
                      color: '#5E5E5E'
                  },
                  headerTitleAlign: 'left',
                  headerLeft: () => null,
                  headerRight: () => (
                      <TouchableOpacity onPress={() => handleLogout(navigation)} style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                          <Text style={{ marginRight: 10, color: '#5E5E5E', fontSize: 16 }}>로그아웃</Text>
                          <MaterialIcons name="logout" size={24} color="#5E5E5E" style={{marginRight: 10}}/>
                      </TouchableOpacity>
                  ),
              })}
          />
          <Stack.Screen
            name="MenuDetails"
            component={MenuDetails}
            options={{
                headerShown: true,
                title: '식단 세부 정보',
                headerTitleStyle: {
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: '#5E5E5E'
                },
                headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
              name="AddMenu"
              component={AddMenu}
              options={{
              title: '식단 추가하기',
              headerTitleStyle: {
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: '#5E5E5E'
              },
              headerTitleAlign: 'center',
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
      </RecoilRoot>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
