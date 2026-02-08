import { View, Text, StyleSheet } from 'react-native'

function WorkStatus({ isWorking }) {
	return (
		<View>
			<Text style={styles.status}>{isWorking ? 'Active' : 'Not active'}</Text>

			<View style={styles.dotWrapper}>
				<View style={[styles.statusDot, isWorking ? styles.active : styles.notActive]} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	status: {
		marginTop: 24,
		fontSize: 18,
		textAlign: 'center',
	},

	dotWrapper: {
		alignItems: 'center',
		marginTop: 15,
	},

	statusDot: {
		width: 20,
		height: 20,
		borderRadius: '50%',
	},

	active: {
		backgroundColor: 'green',
	},

	notActive: {
		backgroundColor: 'red',
	},
})

export default WorkStatus
