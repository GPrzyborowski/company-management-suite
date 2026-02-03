import { View, Text, StyleSheet } from 'react-native'

function WorkStatus({ isWorking }) {

	return (
        <View>
            <Text style={styles.status}>{isWorking ? 'Active' : 'Not active'}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    status: {
        marginTop: 24,
        textAlign: 'center'
    }
})

export default WorkStatus
