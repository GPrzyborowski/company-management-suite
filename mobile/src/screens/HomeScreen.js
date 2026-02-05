import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

function HomeScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.header}>Company management suite.</Text>
				<Text style={styles.headerText}>Choose what you would like to do.</Text>
			</View>
			<View style={styles.btnContainer}>
				<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
					<Text style={styles.btnText}>Employee Login</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Host')}>
					<Text style={styles.btnText}>Configure as Host</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerContainer: {
		paddingTop: 32,
	},
	header: {
		fontWeight: 'bold',
		paddingBottom:  24,
		textAlign: 'center',
		fontSize: 24,
	},
	headerText: {
		textAlign: 'center',
		fontSize: 18,
	},
	btnContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 56,
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

export default HomeScreen
