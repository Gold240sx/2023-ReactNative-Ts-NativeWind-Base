import { Stack } from "expo-router"
import { useEffect } from "react"
import { View, StyleSheet } from "react-native"
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter"
import { Button } from "react-native-paper"
import {
	MD3LightTheme as DefaultTheme,
	PaperProvider,
} from "react-native-paper"
import {
	AmaticSC_400Regular,
	AmaticSC_700Bold,
} from "@expo-google-fonts/amatic-sc"
// import store from "./store"

import * as SplashScreen from "expo-splash-screen"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [fontsLoaded, fontError] = useFonts({
		Inter: Inter_900Black,
		Amatic: AmaticSC_400Regular,
		AmaticBold: AmaticSC_700Bold,
	})

	useEffect(() => {
		if (fontsLoaded || fontError) {
			SplashScreen.hideAsync()
		}
	}, [fontsLoaded, fontError])

	if (!fontsLoaded && !fontError) {
		return null
	}

	return (
		<PaperProvider theme={theme}>
			{/* <PaperProvider store={store}> // if using something like redux*/}

			<Stack screenOptions={{}}>
				<Stack.Screen
					name="index"
					options={{ title: "RN-TS-NT-Base" }}
				/>
			</Stack>
		</PaperProvider>
	)
}

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "tomato",
		secondary: "yellow",
	},
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
})
