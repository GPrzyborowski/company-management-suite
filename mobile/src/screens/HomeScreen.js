import { View, Text, Button } from 'react-native'

function HomeScreen({ navigation }) {
	return (
		<View>
			<Text>Choose what you would like to do.</Text>
			<Button title="Employee Login"
                onPress={() => navigation.navigate('Login')}
            ></Button>
			<Button title="Configure as Host"></Button>
		</View>
	)
}

export default HomeScreen
