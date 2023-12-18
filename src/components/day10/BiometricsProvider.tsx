import { PropsWithChildren, createContext, useContext, useState } from "react"
import * as LocalAuthentication from "expo-local-authentication"
import { Alert } from "react-native"

type BioMetricsContext = {
	isUnlocked: boolean
	authenticate: () => Promise<void>
}

const BioMetricsContext = createContext<BioMetricsContext>({
	isUnlocked: false,
	authenticate: async () => {},
})

const BiometricsProvider = ({ children }: PropsWithChildren) => {
	const [isUnlocked, setIsUnlocked] = useState<boolean>(false)

	const authenticate = async () => {
		const enrolled = await LocalAuthentication.getEnrolledLevelAsync()
		const supported =
			await LocalAuthentication.supportedAuthenticationTypesAsync()
		const hasHardware = await LocalAuthentication.hasHardwareAsync()

		if (!hasHardware) {
			Alert.alert("Face ID and Fingerprint both Not Supported")
			setIsUnlocked(true) // unlock when not supported. Consider unlocking a different way.
		}

		console.log("hasHardware: ", hasHardware) // when the device doesn't have face Id or biometrics
		console.log("enrolled: ", enrolled)
		console.log("supported: ", supported)

		const res = await LocalAuthentication.authenticateAsync()
		console.log(res)
		if (res.success) {
			setIsUnlocked(true)
		}
	}

	return (
		<BioMetricsContext.Provider value={{ isUnlocked, authenticate }}>
			{children}
		</BioMetricsContext.Provider>
	)
}

export default BiometricsProvider

export const useBiometrics = () => useContext(BioMetricsContext)
