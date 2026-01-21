import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Banner from '../components/Banner'
import InputBox from '../components/InputBox'

function LoginScreen() {
	return (
		<View>
			<Banner text={'Please provide login code.'} />
			<InputBox text="Login code" placeholder="Provide login code here..." />
			<TouchableOpacity style={styles.btn}>
				<Text style={styles.btnText}>Log in</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	btn: {
        alignSelf: 'center',
		backgroundColor: '#0f52ba',
        marginTop: 32,
		paddingVertical: 22,
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

export default LoginScreen
