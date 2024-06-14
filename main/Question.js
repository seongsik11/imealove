import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import loading from '../assets/Group1.png';
import dietPlanImage from '../assets/imagez.png'; // 실제 이미지 경로로 변경

const Question = ({ navigation }) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [responseStage, setResponseStage] = useState(0);

    useEffect(() => {
        const initialMessage = { id: 'initial', text: '궁금한 것을 물어보세요', type: 'gpt' };
        setMessages([initialMessage]);
    }, []);

    const handleSend = () => {
        if (input.trim() && !isSending) {
            const userMessage = { id: Math.random().toString(), text: input, type: 'user' };
            setMessages([...messages, userMessage]);
            setInput('');
            setIsSending(true);
            setIsLoading(true);

            setTimeout(() => {
                let fixedResponse;
                if (responseStage === 0) {
                    fixedResponse = { id: Math.random().toString(), text: "네, 아이의 식습관을 고치는 것이 좋습니다. 일주일에 세 번 배달 음식을 먹는 것은 건강에 좋지 않을 수 있습니다. 균형 잡힌 식사와 건강한 식습관을 유지하도록 지도해 주세요.", type: 'gpt' };
                    setResponseStage(1);
                } else if (responseStage === 1) {
                    fixedResponse = { id: Math.random().toString(), text: "아이의 나이와 키, 몸무게, 성별을 입력해주세요.", type: 'gpt' };
                    setResponseStage(2);
                } else {
                    fixedResponse = { id: Math.random().toString(), text: "8살 남자 아이를 위한 맞춤 식단을 짜드릴게요. 성장기 아이의 영양 요구를 충족시키고 건강한 식습관을 기르는 데 중점을 두겠습니다.", type: 'gpt', imageUrl: dietPlanImage };
                    setResponseStage(3);
                }
                setMessages(prevMessages => prevMessages.map(msg => msg.type === 'loading' ? fixedResponse : msg));
                setIsLoading(false);
                setIsSending(false);
            }, 2000); // 2초 지연

            setMessages(prevMessages => [...prevMessages, { id: 'loading', type: 'loading' }]);
        }
    };

    const goMainScreen = () => {
        navigation.navigate('Main');
    }

    const onAddMenu = () => {
        navigation.navigate('AddMenu');
    }

    const goQuestion = () => {
        navigation.navigate('Question');
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={[
                        styles.messageContainer,
                        item.type === 'user'
                            ? styles.userMessage
                            : item.type === 'loading'
                                ? styles.loadingMessage
                                : styles.gptMessage
                    ]}>
                        {item.type === 'loading' ? (
                            <Image source={loading} style={styles.loadingImage} />
                        ) : (
                            <>
                                <Text style={styles.messageText}>{item.text}</Text>
                                {item.imageUrl && <Image source={item.imageUrl} style={styles.dietImage} />}
                            </>
                        )}
                    </View>
                )}
                style={styles.messagesList}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder="식단에 대한 궁금한 점을 물어보세요"
                />
                <TouchableOpacity onPress={handleSend} style={styles.sendButton} disabled={isSending}>
                    <Icon name="send-outline" size={24} color="#FF1493" />
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton} onPress={goMainScreen}>
                    <Icon name="home-outline" size={30} color="#5E5E5E" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={onAddMenu}>
                    <Icon name="add-circle-outline" size={40} color="#FF1493" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={goQuestion}>
                    <Icon name="search-outline" size={30} color="#5E5E5E" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    header: {
        paddingTop: 50,
        paddingBottom: 10,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5E5E5E',
    },
    messagesList: {
        flex: 1,
        padding: 10,
    },
    messageContainer: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        maxWidth: '80%',
    },
    userMessage: {
        backgroundColor: '#FFCDD2',
        alignSelf: 'flex-end',
    },
    gptMessage: {
        backgroundColor: '#E0E0E0',
        alignSelf: 'flex-start',
    },
    loadingMessage: {
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#eaeaea',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#eaeaea',
        borderRadius: 25,
    },
    sendButton: {
        marginLeft: 10,
    },
    loadingContainer: {
        alignSelf: 'flex-start',
        marginVertical: 5,
        padding: 10,
    },
    loadingImage: {
        width: 93,
        height: 35,
    },
    dietImage: {
        width: 200,
        height: 150,
        marginTop: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        borderTopWidth: 1,
        borderTopColor: '#eaeaea',
        backgroundColor: '#fff',
    },
    footerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});

export default Question;
