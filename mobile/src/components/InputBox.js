import { View, Text, TextInput, StyleSheet } from "react-native"

function InputBox({text, placeholder}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <TextInput style={styles.input} placeholder={placeholder}></TextInput>
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