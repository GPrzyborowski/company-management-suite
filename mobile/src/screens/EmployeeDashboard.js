import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import WorkStatus from '../components/WorkStatus'

function EmployeeDashboard() {
	const navigation = useNavigation()

	const [employee, setEmployee] = useState(null)
	const [isWorking, setIsWorking] = useState(false)

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
			<View style={styles['status-container']}>
				<Text style={styles['status-text']}>Your current work status:</Text>
				<WorkStatus isWorking={isWorking} />
			</View>
			<View style={styles['btn-container']}>
				<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('QrScanner')}>
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
	['status-container']: {
		marginTop: 32,
	},
	['status-text']: {
		textAlign: 'center',
	},
	['btn-container']: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 120,
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
