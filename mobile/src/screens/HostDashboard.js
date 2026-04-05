import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'
import QRCode from 'react-native-qrcode-svg'
import { API_URL } from '../config/env'

function HostDashboard() {
	const [qrData, setQrData] = useState(null)
	const [type, setType] = useState(null)
	const [token, setToken] = useState(null)

	useEffect(() => {
		const loadToken = async () => {
			const storedToken = await AsyncStorage.getItem('token')
			setToken(storedToken)
		}
		loadToken()
	}, [])

	const generateQR = async actionType => {
		try {
			setType(actionType)

			const res = await fetch(`http://10.23.29.243:5000/api/device/generateQr`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					deviceId: 1,
					type: actionType,
				}),
			})

			console.log('STATUS:', res.status)

			const data = await res.json()
			console.log('DATA:', data)

			if (!res.ok) {
				throw new Error(data.message || 'Request failed')
			}

			setQrData(data.qrData)
		} catch (err) {
			console.error('QR ERROR:', err)
		}
	}

	useEffect(() => {
		if (!type) return

		const interval = setInterval(() => {
			generateQR(type)
		}, 50000)

		return () => clearInterval(interval)
	}, [type])

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Host Device</Text>

			<View style={styles.btnContainer}>
				<TouchableOpacity style={styles.btn} onPress={() => generateQR('start')}>
					<Text style={styles.btnText}>Start Work</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.btn} onPress={() => generateQR('end')}>
					<Text style={styles.btnText}>End Work</Text>
				</TouchableOpacity>
			</View>

			{qrData && (
				<View style={styles.qrContainer}>
					<Text style={styles.qrLabel}>{type === 'start' ? 'Scan to start the shift' : 'Scan to end the shift'}</Text>

					<QRCode value={JSON.stringify(qrData)} size={250} />
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 28,
		marginBottom: 20,
	},
	btnContainer: {
		flexDirection: 'row',
		marginBottom: 30,
	},
	btn: {
		backgroundColor: '#0f52ba',
		padding: 20,
		marginHorizontal: 10,
		borderRadius: 8,
	},
	btnText: {
		color: '#fff',
	},
	qrContainer: {
		alignItems: 'center',
	},
	qrLabel: {
		marginBottom: 10,
		fontSize: 18,
	},
})

export default HostDashboard
