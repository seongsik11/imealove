import {Button, View, Text, Image, StyleSheet, Pressable, TextInput, Alert} from "react-native";
import {useState, useEffect} from "react";
import CheckBox from 'react-native-check-box';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function SignUpPage({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [nickname, setNickname] = useState('');

    const [showPassword, setShowPassword] = useState(true);

    const handleInputChange = (text, type) => {
        if (type === 'email') {
            setEmail(text);
        } else if (type === 'password') {
            setPassword(text);
        } else if (type === 'passwordConfirm') {
            setPasswordConfirm(text);
        } else if (type === 'nickname') {
            setNickname(text);
        }
    }


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSignUp = () => {
        // 이메일 유효성 검사
        if (!email || !email.includes('@')) {
            Alert.alert('유효한 이메일 주소를 입력하세요.');
            return;
        }
        // 비밀번호 일치 여부 검사
        if (password !== passwordConfirm) {
            Alert.alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        // 닉네임 길이 검사
        if (nickname.length > 10) {
            Alert.alert('닉네임은 10자 이하여야 합니다.');
            return;
        }
        // 유효성 검사 통과 시 다음 단계로 이동
        try {
            AsyncStorage.setItem('email', email);
            AsyncStorage.setItem('password', password);
            AsyncStorage.setItem('nickname', nickname);
            // 회원가입 성공 메시지
            Alert.alert('회원가입이 완료되었습니다.\n로그인 페이지로 이동합니다.');
            navigation.navigate('Home');
        } catch (error) {
            console.error('AsyncStorage에 데이터를 저장하는 도중 오류가 발생했습니다:', error);
            Alert.alert('회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
    }

    console.log('email:', email);
    console.log('password, passwordConfirm:', password, passwordConfirm);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const email = await AsyncStorage.getItem('email');
                const password = await AsyncStorage.getItem('password');
                const nickname = await AsyncStorage.getItem('nickname');
                console.log('EmailAsyncStorage:', email);
                console.log('PasswordAsyncStorage:', password);
                console.log('NicknameAsyncStorage:', nickname);
            } catch (error) {
                console.error('AsyncStorage에서 데이터를 가져오는 중 에러 발생:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.backButton}
                onPress={() => navigation.navigate('Home')}>
                <Text style={{color: '#666',fontSize: 40, alignSelf:'flex-start'}}>⤺ <Text style={{fontSize: 18}}>back</Text></Text>
            </Pressable>
            <Text style={styles.title}>Sign Up</Text>
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
                <TextInput
                    style={styles.input}
                    secureTextEntry={showPassword}
                    placeholder="Password Confirm"
                    value={passwordConfirm}
                    onChangeText={(text) => handleInputChange(text, 'passwordConfirm')}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nickname"
                    value={nickname}
                    onChangeText={(text) => handleInputChange(text, 'nickname')}
                    autoCapitalize="none"
                />
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        isChecked={!showPassword}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                    <Text>Show Password</Text>
                </View>
                <Pressable
                    style={styles.button}
                    onPress={handleSignUp}
                >
                    <LinearGradient
                        colors={['#FF00D6', '#FF4D00']}
                        style={styles.gradient}
                    >
                        <Text style={styles.buttonText}>SIGN UP</Text>
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
        width: 80,
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        padding: 15,
        backgroundColor: '#fff',
        borderWidth: 1, // 테두리 두께
        borderRadius: 8, // 테두리 둥글기
        borderColor: '#000', // 테두리 색상
        marginBottom: 20,
    },
    checkboxContainer: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    button: {
        height: 50,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});