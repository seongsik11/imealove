import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import loading from '../assets/Group1.png';

const Question = ({ navigation }) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = () => {
        if (input.trim() && !isSending) {
            const userMessage = { id: Math.random().toString(), text: input, type: 'user' };
            setMessages([...messages, userMessage]);
            setInput('');
            setIsSending(true);
            setIsLoading(true);

            setTimeout(() => {
                const fixedResponse = { id: Math.random().toString(), text: "식단 중에 라면을 드시고 싶을 때는 일주일에 한 번의 치팅데이를 잡으시고 그 날에 라면 을 드시는 것이 좋을 것 같습니다. 다만,\n식단 중에 라면은 좋지 않아 권장 드리지 않습니다!", type: 'gpt' };
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
                            <Text style={styles.messageText}>{item.text}</Text>
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
                    placeholder="우리 아이 식단을 입력하세요"
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
