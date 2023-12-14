import React from "react"
import { Text, View, StyleSheet, Button } from "react-native"
import LottieView from "lottie-react-native"
import { useRef } from "react"
import { Stack } from "expo-router"
import { blue600 } from "react-native-paper/lib/typescript/styles/themes/v2/colors"
import Animated, {
	FadeIn,
	FadeOut,
	ZoomIn,
	ZoomOut,
} from "react-native-reanimated"

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView)

const SplashScreenComponent = ({
	onAnimationFinish = (isCancelled) => {},
}: {
	onAnimationFinish?: (isCancelled: boolean) => void
}) => {
	const animation = useRef<LottieView>(null)

	return (
		<View
			// <Animated.View
			// entering={FadeIn.duration(1000)}
			// exiting={FadeOut.duration(300)}
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#EEEEEE",
			}}>
			{/* <Stack.Screen options={{ headerShown: false }} /> */}
			<AnimatedLottieView
				autoPlay
				exiting={ZoomOut.duration(300)}
				ref={animation}
				onAnimationFinish={onAnimationFinish}
				loop={false}
				duration={1200}
				speed={0.5}
				style={{
					width: "80%",
					maxWidth: 400,
					backgroundColor: "#eee",
				}}
				source={require("@assets/splashAnimation.json")}
			/>
			{/* </Animated.View> */}
		</View>
	)
}

export default SplashScreenComponent
