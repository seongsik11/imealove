import {Button, View, Text, Image, StyleSheet, Pressable} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/Rectangle.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
                <Image
                    source={require('../assets/Group.png')}
                    style={styles.centerImage}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.buttonContainer}>
                <LinearGradient
                    colors={['#FF00D6', '#FF4D00']}
                    style={styles.gradientBorder}
                >
                    <View style={styles.buttonInner}>
                        <Pressable
                            style={styles.button}
                            onPress={() => navigation.navigate('SignUp')}
                        >
                            <Text style={styles.buttonText1}>SIGN UP</Text>
                        </Pressable>
                    </View>
                </LinearGradient>

                <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}
                >
                    <LinearGradient
                        colors={['#FF00D6', '#FF4D00']}
                        style={styles.gradient}
                    >
                        <Text style={styles.buttonText2}>LOG IN</Text>
                    </LinearGradient>
                </Pressable>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        flex: 8.5,
    },
    centerImage: {
        alignSelf: 'center',
        position: 'absolute',
        top: '25%', // Adjust as needed
        width: '50%', // Adjust as needed
        height: '50%', // Adjust as needed
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: 'white',
    },
    gradientBorder: {
        width: '45%',
        height: 50,
        borderRadius: 8,
        padding: 2, // Add padding to create space for the gradient border
    },
    buttonInner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        padding: 2,
        backgroundColor: 'white', // Inner background color
    },
    button: {
        width: '45%',
        height: 50,
        borderRadius: 8,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText1: {
        textAlign: 'center',
        color: '#5E5E5E',
        fontSize: 14,
        fontWeight: 'bold',
    },
    buttonText2: {
        textAlign: 'center',
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    }
});