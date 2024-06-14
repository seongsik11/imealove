import {useState} from "react";
import {Alert, Pressable, TextInput, View, StyleSheet, Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LinearGradient} from "expo-linear-gradient";
import CheckBox from "react-native-check-box";

export default function LoginPage({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);

    const handleInputChange = (text, type) => {
        if (type === 'email') {
            setEmail(text);
        } else if (type === 'password') {
            setPassword(text);
        }
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleLogin = async () => {
        // 유효성 검사 통과 시 다음 단계로 이동
        try {
            const saveEmail = await AsyncStorage.getItem('email');
            const savePassword = await AsyncStorage.getItem('password');

            if (saveEmail === email && savePassword === password) {
                Alert.alert('로그인 성공');
                navigation.navigate('Main');
            } else {
                Alert.alert('이메일 또는 비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error('AsyncStorage에 데이터를 저장하는 도중 오류가 발생했습니다:', error);
            Alert.alert('회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
    }


    return (
        <View style={styles.container}>
            <Pressable
                style={styles.backButton}
                onPress={() => navigation.navigate('Home')}>
                <Text style={{ color: '#666', fontSize: 40, alignSelf: 'flex-start' }}>⤺ <Text style={{ fontSize: 18 }}>back</Text></Text>
            </Pressable>
            <Text style={styles.title}>LOG IN</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => handleInputChange(text, 'email')}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={showPassword}
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => handleInputChange(text, 'password')}
                    autoCapitalize="none"
                />
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        isChecked={!showPassword}
                        onClick={toggleShowPassword}
                    />
                    <Text>Show Password</Text>
                </View>
                <Pressable
                    style={styles.button}
                    onPress={handleLogin}
                >
                    <LinearGradient
                        colors={['#FF00D6', '#FF4D00']}
                        style={styles.gradient}
                    >
                        <Text style={styles.buttonText}>LOG IN</Text>
                    </LinearGradient>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 100,
    },
    title: {
        fontSize: 36,
        marginBottom: 20,
    },
    backButton: {
        marginBottom: 20,
    },
    inputContainer: {
        backgroundColor: '#f8f8f8',
        marginBottom: 20,
    },
    input: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
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