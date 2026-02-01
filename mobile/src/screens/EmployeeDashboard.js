import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'

function EmployeeDashboard() {

	const [employee, setEmployee] = useState(null)

    useEffect(() => {
        const loadEmployee = async () => {
            const storedData = await AsyncStorage.getItem('employee')
            if(storedData) {
                setEmployee(JSON.parse(storedData))
            }
        }
        loadEmployee()
    }, [])

    if(!employee) {
        return (
            <View>
                <Text>Loading data...</Text>
            </View>
        )
    }

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Hello {employee.firstName}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
    header: {
        marginTop: 64,
        textAlign: 'center',
        fontSize: 24
    },
})

export default EmployeeDashboard
