import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text } from 'react-native'
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
		<View>
			<Text>Hello {employee.firstName}</Text>
		</View>
	)
}

export default EmployeeDashboard
