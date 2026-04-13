import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect, useRef } from 'react'
import QRCode from 'react-native-qrcode-svg'
import { API_URL } from '../config/env'

function HostDashboard() {
	const [qrData, setQrData] = useState(null)
	const [type, setType] = useState(null)
	const [token, setToken] = useState(null)
	const [deviceId, setDeviceId] = useState(null)
	const [deviceName, setDeviceName] = useState(null)
	const [timer, setTimer] = useState(10)

	const refreshCount = useRef(0)

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
		if (!type) return

		refreshCount.current = 0
		setTimer(10)

		const countdown = setInterval(() => {
			setTimer(prev => (prev <= 1 ? 10 : prev - 1))
		}, 1000)

		const refresh = setInterval(() => {
			refreshCount.current += 1

			if (refreshCount.current >= 3) {
				clearInterval(refresh)
				clearInterval(countdown)
				setQrData(null)
				setType(null)
				return
			}

			generateQR(type)
		}, 10000)

		return () => {
			clearInterval(countdown)
			clearInterval(refresh)
		}
	}, [type])

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

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{deviceName}</Text>

			<View style={styles.btnContainer}>
				<TouchableOpacity style={styles.btn} onPress={() => generateQR('start')}>
					<Text style={styles.btnText}>Start shift</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.btn} onPress={() => generateQR('end')}>
					<Text style={styles.btnText}>End shift</Text>
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
		justifyContent: 'start',
		alignItems: 'center',
		marginTop: '48',
	},
	title: {
		fontSize: 28,
		marginBottom: 64,
	},
	btnContainer: {
		alignItems: 'center',
		width: '95%',
		marginBottom: 64,
	},
	btn: {
		backgroundColor: '#0f52ba',
		paddingVertical: 25,
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
