import { Redirect, Slot } from "expo-router"
import { useAuthenticator } from "@aws-amplify/ui-react-native"

const ProtectedLayout = () => {
	const { authStatus } = useAuthenticator((context) => [context.authStatus])
	if (authStatus === "unauthenticated") {
		return <Redirect href={"/day9/auth/sign-in"} />
	}
	// console.warn("Protected")
	return <Slot />
}

// export default withAuthenticator(ProtectedLayout) // for auto auth integration
export default ProtectedLayout
