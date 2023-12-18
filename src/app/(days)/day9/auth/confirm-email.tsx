import {
	View,
	Text,
	StyleSheet,
	Button,
	TextInput,
	Pressable,
} from "react-native"
import {
	confirmSignUp,
	getCurrentUser,
	type ConfirmSignUpInput,
} from "aws-amplify/auth"
import { router } from "expo-router"
import { useEffect, useState } from "react"

const ConfirmEmail = () => {
	const [email, setEmail] = useState<string>("")
	const [code, setCode] = useState<string>("")

	const getCurrentUserEmail = async () => {
		setEmail((await getCurrentUser()).username)
	}

	useEffect(() => {
		getCurrentUserEmail()
	}, [])

	async function handleSignUpConfirmation({
		username,
		confirmationCode,
	}: ConfirmSignUpInput) {
		try {
			const { isSignUpComplete, nextStep } = await confirmSignUp({
				username,
				confirmationCode,
			})
			if (nextStep.signUpStep === "DONE") {
				router.push("/(days)/day9/protected")
			}
		} catch (error) {
			if (!email) {
				console.log("no email was found")
				return
			}
			console.log("error confirming sign up", error)
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				To proceed, you need to first verify your email
			</Text>
			<Text style={styles.subTitle}>
				Please enter the verification code found within your email
			</Text>
			<TextInput
				style={styles.input}
				placeholder="Confirmation Code"
				value={code}
				onChangeText={setCode}
			/>
			<Pressable
				style={styles.actionButton}
				onPress={() =>
					handleSignUpConfirmation({
						username: email,
						confirmationCode: code,
					})
				}>
				<Text style={styles.actionButtonText}>Confirm</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		justifyContent: "center",
		flex: 1,
		alignContent: "center",
		textAlign: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 32,
		fontFamily: "InterSemi",
		color: "black",
		marginBottom: 20,
		textAlign: "center",
	},
	subTitle: {
		fontSize: 14,
		fontFamily: "InterSemi",
		color: "dimgray",
		marginBottom: 5,
		textAlign: "center",
	},
	input: {
		borderWidth: 1,
		borderColor: "gainsboro",
		padding: 10,
		marginVertical: 10,
		backgroundColor: "white",
		borderRadius: 5,
		width: 200,
		marginHorizontal: "auto",
	},
	actionButton: {
		backgroundColor: "red",
		width: "60%",
		padding: 8,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
	},
	actionButtonText: {
		color: "white",
		textAlign: "center",
		fontSize: 25,
	},
})

export default ConfirmEmail
