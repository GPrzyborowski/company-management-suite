import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'
import QRCode from 'react-native-qrcode-svg'
import { API_URL } from '../config/env'

function HostDashboard() {
	const [qrData, setQrData] = useState(null)
	const [type, setType] = useState(null)
	const [token, setToken] = useState(null)
	const [deviceId, setDeviceId] = useState(null)
	const [deviceName, setDeviceName] = useState(null)
	const [timer, setTimer] = useState(10)

	useEffect(() => {
		const loadAsyncStorage = async () => {
			const storedToken = await AsyncStorage.getItem('token')
			setToken(storedToken)

			const hostString = await AsyncStorage.getItem('host')

			if (hostString) {
				const host = JSON.parse(hostString)
				setDeviceId(host.id)
				setDeviceName(host.name)
			}
		}

		loadAsyncStorage()
	}, [])

	useEffect(() => {
		if (!qrData) return

		setTimer(10)

		const interval = setInterval(() => {
			setTimer(prev => {
				if (prev <= 1) {
					clearInterval(interval)
					return 0
				}
				return prev - 1
			})
		}, 1000)

		return () => clearInterval(interval)
	}, [qrData])

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
					deviceId: deviceId,
					type: actionType,
				}),
			})

			const data = await res.json()

			if (!res.ok) {
				throw new Error(data.message || 'Request failed')
			}
			setQrData(data.qrData)
		} catch (err) {
			console.log(`Error: ${err}`)
		}
	}

	useEffect(() => {
		if (!type) return

		const interval = setInterval(() => {
			generateQR(type)
		}, 10000)

		return () => clearInterval(interval)
	}, [type])

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{deviceName}</Text>

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
					<Text style={styles.qrLabel}>
						{type === 'start' ? `Scan to start the shift (${timer}s)` : `Scan to end the shift (${timer}s)`}
					</Text>

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
