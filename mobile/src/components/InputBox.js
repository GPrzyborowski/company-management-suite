import { View, Text, TextInput, StyleSheet } from "react-native"

function InputBox({text, placeholder, value, onChangeText}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <TextInput style={styles.input} placeholder={placeholder} onChangeText={onChangeText} value={value} autoCapitalize='none'></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: '50%',
        alignSelf: 'center',
        width: '80%'
    },
    text: {
        marginBottom: 8,
        fontSize: 16
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#b8b8b8',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#fff',
    }
})

export default InputBox