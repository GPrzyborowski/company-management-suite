import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import HomeScreen from './src/screens/HomeScreen'
import HostScreen from './src/screens/HostScreen'
import LoginScreen from './src/screens/LoginScreen'
import EmployeeDashboard from './src/screens/EmployeeDashboard'

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home" screenOptions={{ animation: 'slide_from_right' }}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Host" component={HostScreen} />
				<Stack.Screen name="EmployeeDashboard" component={EmployeeDashboard} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
