import {StyleSheet, View} from "react-native";

export default function AddMenu() {

    return (
        <View style={styles.container}>
            <Text>AddMenu</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
})