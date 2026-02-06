import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen'
import HostScreen from './src/screens/HostScreen'
import LoginScreen from './src/screens/LoginScreen'
import EmployeeDashboard from './src/screens/EmployeeDashboard'
import QrScannerScreen from './src/screens/QrScannerScreen'
import WorkStatsScreen from './src/screens/WorkStatsScreen'

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home" screenOptions={{ animation: 'slide_from_right' }}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Host" component={HostScreen} />
				<Stack.Screen name="EmployeeDashboard" component={EmployeeDashboard} options={{title: 'Employee dashboard'}}/>
				<Stack.Screen name="QrScanner" component={QrScannerScreen} options={{title: 'Scan QR'}}/>
				<Stack.Screen name="WorkStats" component={WorkStatsScreen} options={{title: 'Work statistics'}}/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
