import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useState } from 'react'
import Banner from '../components/Banner'
import InputBox from '../components/InputBox'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

function HostScreen() {
	const [code, setCode] = useState('')
	const navigation = useNavigation()
	const localEndpoint = `http://10.23.29.243:5000/api/auth/activatehost`

	const handleLogin = async () => {
		try {
			const res = await fetch(localEndpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ code }),
			})

			const data = await res.json()

			if (!res.ok) {
				console.log('Server error:', data)
				throw new Error(data.message || 'Invalid activation code.')
			}

			if (data.token && data.device) {
				await AsyncStorage.setItem('token', data.token)
				await AsyncStorage.setItem('host', JSON.stringify(data.device))

				navigation.reset({
					index: 0,
					routes: [{ name: 'HostDashboard' }],
				})
			}
		} catch (err) {
			console.error('Error:', err)
			Alert.alert('Error', err.message || 'Something went wrong')
		}
	}

	return (
		<View>
			<Banner text={'Please provide a host code.'} />
			<InputBox text="Host code" placeholder="Enter your host code..." value={code} onChangeText={setCode} />
			<TouchableOpacity style={styles.btn} onPress={handleLogin}>
				<Text style={styles.btnText}>Submit</Text>
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
})

export default HostScreen
