import { View } from 'react-native'
import Banner from '../components/Banner'
import InputBox from '../components/InputBox'

function HostScreen() {
	return (
		<View>
			<Banner text={'Please provide a host code.'} />
			<InputBox text="Host code" placeholder="Provide host code here..." />
		</View>
	)
}

export default HostScreen
