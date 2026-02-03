import { View, Text } from 'react-native'

function WorkStatus({ isWorking }) {

	return (
        <View>
            <Text>{isWorking ? 'Active' : 'Not active'}</Text>
        </View>
    )
}

export default WorkStatus
