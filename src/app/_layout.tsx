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
import { useState } from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import SplashScreenComponent from "@components/day4/animatedSplashScreen"
// import store from "./store"
import * as SplashScreen from "expo-splash-screen"
// SplashScreen.preventAutoHideAsync() //keeps the splashscreen visible as long as we are loading assets
import Animated, { FadeIn } from "react-native-reanimated"

// AWS
import { Amplify } from "aws-amplify"
import ampifyconfig from "../amplifyconfiguration.json"
Amplify.configure(ampifyconfig)
import {
	Authenticator,
	ThemeProvider,
	type Theme,
} from "@aws-amplify/ui-react-native"
import BiometricsProvider from "@/components/day10/BiometricsProvider"

const AmplifyTheme: Theme = {
	tokens: {
		colors: {
			font: {
				primary: "black",
			},
		},
	},
}

export default function RootLayout() {
	const [appReady, setAppReady] = useState(false)
	const [splashAnimationFinished, setSplashAnimationFinished] =
		useState(false)
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
			// SplashScreen.hideAsync()
			setAppReady(true)
		}
	}, [fontsLoaded, fontError])

	const showAnimatedSplash = !appReady || !splashAnimationFinished
	if (showAnimatedSplash) {
		return (
			<SplashScreenComponent
				onAnimationFinish={(isCancelled) => {
					console.log("Finished: ", isCancelled)
					if (isCancelled) {
						setSplashAnimationFinished(true)
					}
				}}
			/>
		)
	}

	return (
		<BiometricsProvider>
			<Authenticator.Provider>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<ThemeProvider theme={AmplifyTheme}>
						<PaperProvider theme={theme}>
							{/* <PaperProvider store={store}> // if using something like redux*/}

							<Animated.View
								style={{ flex: 1 }}
								entering={FadeIn}>
								<Stack screenOptions={{}}>
									<Stack.Screen
										name="index"
										options={{ title: "RN-TS-NT-Base" }}
									/>
								</Stack>
							</Animated.View>
						</PaperProvider>
					</ThemeProvider>
				</GestureHandlerRootView>
			</Authenticator.Provider>
		</BiometricsProvider>
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
