import React from "react"
import { Text, View, StyleSheet } from "react-native"
import LottieView from "lottie-react-native"

const SplashScreen = () => {
	return (
		<View>
			<LottieView
				autoPlay
				style={{
					width: 200,
					height: 200,
					backgroundColor: "#eee",
				}}
				source={require("@assets/splashAnimation.json")}
			/>
		</View>
	)
}

export default SplashScreen

const styles = StyleSheet.create({
	page: {
		backgroundColor: "white",
		flex: 1,
		padding: 10,
		borderRadius: 10,
	},
})
