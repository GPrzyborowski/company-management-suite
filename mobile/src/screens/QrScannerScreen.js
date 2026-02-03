import { Text, View, StyleSheet, Button, Dimensions } from 'react-native'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { useState, useEffect } from 'react'

const { width } = Dimensions.get('window');
const scannerSize = width * 0.7

function QrScannerScreen({ navigation }) {
	const [permission, requestPermission] = useCameraPermissions()
	const [scanned, setScanned] = useState(false)

	useEffect(() => {
		requestPermission()
	}, [])

	if (!permission) {
		return <View />
	}

	if (!permission.granted) {
		return (
			<View style={styles.center}>
				<Text>Camera permission required</Text>
				<Button title="Grant permission" onPress={requestPermission} />
			</View>
		)
	}

	const handleScan = ({ data }) => {
		setScanned(true)
		console.log(data)
		navigation.goBack()
	}

	return (
		<View style={styles.container}>
			<CameraView
				style={StyleSheet.absoluteFillObject}
				barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
				onBarcodeScanned={scanned ? undefined : handleScan}
			/>

			<View style={styles.overlay}>
				<View style={styles.unfocusedContainer}></View>

				<View style={styles.middleContainer}>
					<View style={styles.unfocusedContainer}></View>

					<View style={styles.focusedContainer}>
						<View style={[styles.corner, styles.topLeft]} />
						<View style={[styles.corner, styles.topRight]} />
						<View style={[styles.corner, styles.bottomLeft]} />
						<View style={[styles.corner, styles.bottomRight]} />
					</View>

					<View style={styles.unfocusedContainer}></View>
				</View>

				<View style={styles.unfocusedContainer}>
					<Text style={styles.instructionText}>Position the QR code inside the frame</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	unfocusedContainer: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	middleContainer: {
		flexDirection: 'row',
		height: scannerSize,
	},
	focusedContainer: {
		width: scannerSize,
		height: scannerSize,
		backgroundColor: 'transparent',
	},

	corner: {
		position: 'absolute',
		width: 40,
		height: 40,
		borderColor: '#ffffff',
		borderWidth: 5,
	},
	topLeft: {
		top: 0,
		left: 0,
		borderRightWidth: 0,
		borderBottomWidth: 0,
	},
	topRight: {
		top: 0,
		right: 0,
		borderLeftWidth: 0,
		borderBottomWidth: 0,
	},
	bottomLeft: {
		bottom: 0,
		left: 0,
		borderRightWidth: 0,
		borderTopWidth: 0,
	},
	bottomRight: {
		bottom: 0,
		right: 0,
		borderLeftWidth: 0,
		borderTopWidth: 0,
	},
    instructionText: {
        color: 'white',
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
    }
})

export default QrScannerScreen
