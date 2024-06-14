import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./home/HomePage";
import SignUpPage from "./signup/SignUpPage";
import LoginPage from "./login/LoginPage";
import MainScreen from "./main/MainPage";
import MenuDetails from "./main/MenuDetails";
import {RecoilRoot} from "recoil";
import AddMenu from "./main/AddMenu";
import Question from "./main/Question";

const Stack = createStackNavigator();

export default function App() {
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
              options={{
                  headerShown: true,
                  title: '나의 식단 스케쥴',
                  headerTitleStyle: {
                      fontSize: 22, // 원하는 폰트 사이즈로 설정
                      fontWeight: 'bold', // 선택 사항: 폰트 무게
                      color: '#5E5E5E'
                  },
                  headerTitleAlign: 'left',
                  headerLeft: () => null,
              }}
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
              headerShown: true,
              title: '식단 추가',
              headerTitleStyle: {
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: '#5E5E5E'
              },
              headerTitleAlign: 'center',
          }}/>
            <Stack.Screen
                name="Question"
                component={Question}
                options={{
                    headerShown: true,
                    title: 'AI 식단 질문',
                    headerTitleStyle: {
                        fontSize: 22, // 원하는 폰트 사이즈로 설정
                        fontWeight: 'bold', // 선택 사항: 폰트 무게
                        color: '#5E5E5E'
                    },
                    headerTitleAlign: 'left',
                    headerLeft: () => null,
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
