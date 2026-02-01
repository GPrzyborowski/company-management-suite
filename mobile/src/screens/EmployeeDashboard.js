import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'

function EmployeeDashboard() {
	const [employee, setEmployee] = useState(null)

	useEffect(() => {
		const loadEmployee = async () => {
			const storedData = await AsyncStorage.getItem('employee')
			if (storedData) {
				setEmployee(JSON.parse(storedData))
			}
		}
		loadEmployee()
	}, [])

	if (!employee) {
		return (
			<View>
				<Text>Loading data...</Text>
			</View>
		)
	}

	return (
		<View>
			<View style={styles['header-container']}>
				<Text style={styles.header}>Hello {employee.firstName}</Text>
			</View>
			<View style={styles['btn-container']}>
				<TouchableOpacity style={styles.btn}>
					<Text style={styles.btnText}>Scan QR</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btn}>
					<Text style={styles.btnText}>Work statistics</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	['header-container']: {
		marginTop: 64,
	},
	header: {
		textAlign: 'center',
		fontSize: 24,
	},
	['btn-container']: {
		marginTop: 255,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
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
		color: '#FFF',
	},
})

export default EmployeeDashboard
