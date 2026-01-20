import { View } from "react-native"
import Banner from "../components/Banner"
import InputBox from "../components/InputBox"

function LoginScreen() {
    return (
        <View>
            <Banner text={'Please provide login code.'}/>
            <InputBox text='Login code' placeholder='Provide login code here...' />
        </View>
    )
}

export default LoginScreen