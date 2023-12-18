import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Button,
	Pressable,
} from "react-native"
import { useState } from "react"
import { FontAwesome5 } from "@expo/vector-icons"
import { signIn, type SignInInput } from "aws-amplify/auth"
import { router, Link } from "expo-router"

const SignIn = () => {
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [viewPassword, setViewPassword] = useState<boolean>(true)
	const [error, setError] = useState<string>("")

	const eyeIcon = viewPassword ? "eye" : "eye-slash"

	const onSignInPress = async () => {
		// console.warn("Sign In: ", email, "- ", password)
		setError("")
		try {
			if (email === "" || password === "") return
			const { isSignedIn, nextStep } = await signIn({
				username: email,
				password: password,
			})
			if (isSignedIn) {
				// console.log(isSignedIn)
				router.push("/(days)/day9/protected")
			} else {
				if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
					router.push("/(days)/day9/auth/confirmEmail")
				}
				setError("something went wrong")
			}
		} catch (e: any) {
			setError(e.message)
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Sign In</Text>
			<TextInput
				style={styles.input}
				placeholder="jon@doe.com"
				value={email}
				textContentType="emailAddress"
				onChangeText={setEmail}
			/>
			<View style={styles.passwordView}>
				<TextInput
					style={[styles.input, styles.password]}
					placeholder="password"
					// className="focus:placeholder-opacity-0"
					value={password}
					onChangeText={setPassword}
					secureTextEntry={viewPassword}
					textContentType="password"
				/>
				<Pressable onPress={() => setViewPassword(!viewPassword)}>
					{/* <Text>View</Text> */}
					<FontAwesome5
						name={eyeIcon}
						style={styles.eyeIcon}
						className=""
						size={30}
						color="#CEF202"
					/>
				</Pressable>
			</View>

			{error && <Text style={{ color: "red" }}>{error}</Text>}
			<Pressable
				style={styles.actionButton}
				onPress={() => onSignInPress()}>
				<Text style={styles.actionButtonText}>Sign In</Text>
			</Pressable>
			{/* <Pressable onPress={() => onRedirect()}>
				<Text style={styles.redirect}>
					Already have an account? Click Here!
				</Text>
			</Pressable> */}
			<Link href={"/(days)/day9/auth/sign-up"} style={styles.redirect}>
				New here? Sign Up!
			</Link>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		justifyContent: "center",
		flex: 1,
	},
	title: {
		fontSize: 35,
		fontFamily: "InterSemi",
		color: "dimgray",
		marginBottom: 20,
	},
	input: {
		borderWidth: 1,
		borderColor: "gainsboro",
		padding: 10,
		marginVertical: 10,
		backgroundColor: "white",
		borderRadius: 5,
	},
	passwordView: {
		flexDirection: "row",
	},
	eyeIcon: {
		position: "absolute",
		right: 10,
		paddingVertical: 14,
		color: "dimgray",
	},
	password: {
		flex: 1,
	},
	actionButton: {
		backgroundColor: "red",
		width: "100%",
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
	redirect: {
		fontWeight: "700",
		color: "dimgray",
		paddingVertical: 20,
		paddingHorizontal: 8,
		fontSize: 18,
	},
})

export default SignIn
