import { Text, View, StyleSheet } from 'react-native'

function Banner({text}) {
	return (
		<View>
			<Text style={styles.headerText}>{text}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	headerText: {
        paddingTop: 32,
		textAlign: 'center',
		fontSize: 18,
	},
})

export default Banner
