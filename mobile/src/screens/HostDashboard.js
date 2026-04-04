import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import QRCode from 'react-native-qrcode-svg'
import { API_URL } from '../config/env'

function HostDashboard() {
	const [qrData, setQrData] = useState(null)
	const [type, setType] = useState(null)

	const generateQR = async actionType => {
		setType(actionType)

		const res = await fetch(`http://10.23.29.243:5000/api/device/generateQr`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				deviceId: 1,
				type: actionType,
			}),
		})

		const data = await res.json()
		setQrData(data.qrData)
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
				<TouchableOpacity style={styles.btn} onPress={() => generateQR('START')}>
					<Text style={styles.btnText}>Start Work</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.btn} onPress={() => generateQR('END')}>
					<Text style={styles.btnText}>End Work</Text>
				</TouchableOpacity>
			</View>

			{qrData && (
				<View style={styles.qrContainer}>
					<Text style={styles.qrLabel}>{type === 'START' ? 'Scan to START' : 'Scan to END'}</Text>

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
