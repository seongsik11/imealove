import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const Question = ({ navigation }) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isSending, setIsSending] = useState(false);

    const handleSend = async () => {
        if (input.trim() && !isSending) {
            const userMessage = { id: Math.random().toString(), text: input, type: 'user' };
            setMessages([...messages, userMessage]);
            setIsSending(true);

            try {
                const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                    model: "gpt-3.5-turbo",
                    prompt: input,
                    max_tokens: 150,
                    temperature: 0.7,
                }, {
                    headers: {
                        'Authorization': `Bearer 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`,
                        'Content-Type': 'application/json',
                    },
                });

                const gptMessage = { id: Math.random().toString(), text: response.data.choices[0].text.trim(), type: 'gpt' };
                setMessages([...messages, userMessage, gptMessage]);
            } catch (error) {
                console.error(error);
            }

            setInput('');
            setTimeout(() => setIsSending(false), 1000); // 1초 지연
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
            <View style={styles.header}>
                <Text style={styles.headerTitle}>AI 식단 질문 창고</Text>
            </View>
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.messageContainer, item.type === 'user' ? styles.userMessage : styles.gptMessage]}>
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                )}
                style={styles.messagesList}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder="질문을 입력하세요"
                />
                <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
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
