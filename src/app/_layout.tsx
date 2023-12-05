import { Stack } from "expo-router"
import { useEffect } from "react"
import { View, StyleSheet } from "react-native"
import {
	useFonts,
	Inter_900Black,
	Inter_700Bold,
	Inter_600SemiBold,
	Inter_400Regular,
} from "@expo-google-fonts/inter"
import { Button } from "react-native-paper"
import {
	MD3LightTheme as DefaultTheme,
	PaperProvider,
} from "react-native-paper"
import {
	AmaticSC_400Regular,
	AmaticSC_700Bold,
} from "@expo-google-fonts/amatic-sc"
import { GestureHandlerRootView } from "react-native-gesture-handler"
// import store from "./store"

import * as SplashScreen from "expo-splash-screen"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [fontsLoaded, fontError] = useFonts({
		Inter: Inter_400Regular,
		InterSemi: Inter_600SemiBold,
		InterBold: Inter_700Bold,
		InterBlack: Inter_900Black,
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
		<GestureHandlerRootView style={{ flex: 1 }}>
			<PaperProvider theme={theme}>
				{/* <PaperProvider store={store}> // if using something like redux*/}

				<Stack screenOptions={{}}>
					<Stack.Screen
						name="index"
						options={{ title: "RN-TS-NT-Base" }}
					/>
				</Stack>
			</PaperProvider>
		</GestureHandlerRootView>
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
