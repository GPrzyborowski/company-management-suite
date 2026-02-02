import { Text, View, StyleSheet, Button } from 'react-native'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { useState, useEffect } from 'react'

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
		<CameraView
			style={StyleSheet.absoluteFillObject}
			barcodeScannerSettings={{
				barcodeTypes: ['qr'],
			}}
			onBarcodeScanned={scanned ? undefined : handleScan}
		/>
	)
}

const styles = StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default QrScannerScreen
