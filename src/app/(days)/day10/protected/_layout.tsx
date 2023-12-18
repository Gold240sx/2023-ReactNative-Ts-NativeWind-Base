import { Redirect, Slot } from "expo-router"
import { useAuthenticator } from "@aws-amplify/ui-react-native"
import { useEffect, useState } from "react"
import * as LocalAuthentication from "expo-local-authentication"
import { FontAwesome5 } from "@expo/vector-icons"
import { Alert, Text, View } from "react-native"
import { useBiometrics } from "@/components/day10/BiometricsProvider"

const BiometricProtectedLayout = () => {
	const { isUnlocked, authenticate } = useBiometrics()

	useEffect(() => {
		if (!isUnlocked) {
			authenticate()
		}
	}, [])

	if (!isUnlocked) {
		return (
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
				}}>
				<Text
					style={{
						fontFamily: "Inter",
						fontSize: 20,
						marginBottom: 20,
					}}>
					Use FaceId to unlock
				</Text>
				<FontAwesome5
					onPress={authenticate}
					name="fingerprint"
					size={75}
					color="darkgray"
				/>
			</View>
		)
	}

	return <Slot />
}

// export default withAuthenticator(ProtectedLayout) // for auto auth integration
export default BiometricProtectedLayout
