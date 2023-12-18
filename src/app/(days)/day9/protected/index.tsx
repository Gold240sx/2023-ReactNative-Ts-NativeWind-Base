import { View, Text, StyleSheet, Button } from "react-native"
import React from "react"
import { useAuthenticator } from "@aws-amplify/ui-react-native"
import {
	signIn,
	signUp,
	signOut,
	rememberDevice,
	forgetDevice,
	resetPassword,
} from "aws-amplify/auth"

const Protected = () => {
	const { signOut } = useAuthenticator()
	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}>
			{/* <Stack.Screen options={{ headerShown: false }} /> */}
			<Text style={styles.title}>This is a protected Page</Text>
			<Text style={styles.subTitle}>This is a protected Page</Text>
			<Button title="sign out" onPress={() => signOut()} />
		</View>
	)
}

const styles = StyleSheet.create({
	card: {},
	title: {
		fontFamily: "InterBold",
		fontSize: 30,
	},
	subTitle: {
		fontFamily: "InterSemi",
		fontSize: 20,
		color: "gray",
	},
	name: {},
	image: {},
})

export default Protected
