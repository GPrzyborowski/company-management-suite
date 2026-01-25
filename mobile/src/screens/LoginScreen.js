import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useState } from 'react'
import Banner from '../components/Banner'
import InputBox from '../components/InputBox'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

function LoginScreen() {
	const [code, setCode] = useState('')
	const navigation = useNavigation()
	const localEndpoint = 'http://192.168.133.243:5000/api/auth/loginmobile'

	const handleLogin = async () => {
		try {
			const res = await fetch(localEndpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ code }),
			})
			if (!res.ok) {
				throw new Error('Invalid login code.')
			}
			const data = await res.json()
			await AsyncStorage.setItem('token', data.token)
			await AsyncStorage.setItem('employee', JSON.stringify(data.employee))
			navigation.reset({
				index: 0,
				routes: [{ name: 'EmployeeDashboard' }],
			})
		} catch (err) {
			Alert.alert('Wrong login code.')
		}
	}

	return (
		<View>
			<Banner text={'Please provide a login code.'} />
			<Text style={styles.info}>If you don't have a login code yet, contact your employer.</Text>
			<InputBox text="Login code" placeholder="Enter your login code..." value={code} onChangeText={setCode} />
			<TouchableOpacity style={styles.btn} onPress={handleLogin}>
				<Text style={styles.btnText}>Log in</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	btn: {
		alignSelf: 'center',
		backgroundColor: '#0f52ba',
		marginTop: 32,
		paddingVertical: 22,
		paddingHorizontal: 10,
		borderRadius: 8,
		width: '80%',
		alignItems: 'center',
		marginVertical: 10,
		elevation: 3,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
	},
	btnText: {
		color: '#FFF',
	},
	info: {
		marginTop: 16,
		textAlign: 'center',
		fontSize: 12,
		fontStyle: 'italic',
	},
})

export default LoginScreen
