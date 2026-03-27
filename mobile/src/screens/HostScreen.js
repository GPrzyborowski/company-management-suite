import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useState } from 'react'
import Banner from '../components/Banner'
import InputBox from '../components/InputBox'
import { API_URL } from '../config/env'

function HostScreen() {

	const [code, setCode] = useState('')

	const localEndpoint = `http://192.168.137.1:5000/api/auth/loginmobile`;

	const handleLogin = async () => {
		try {
			const res = await fetch(localEndpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ code }),
			})
			if (!res.ok) {
				throw new Error('Invalid activation code.')
			}
			const data = await res.json()
			await AsyncStorage.setItem('token', data.token)
			await AsyncStorage.setItem('host', JSON.stringify(data.host))
			navigation.reset({
				index: 0,
				routes: [{ name: 'HostDashboard' }],
			})
		} catch (err) {
			Alert.alert('Wrong activation code.')
		}
	}

	return (
		<View>
			<Banner text={'Please provide a host code.'} />
			<InputBox text="Host code" placeholder="Enter your host code..." value={code} onChangeText={setCode}/>
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
