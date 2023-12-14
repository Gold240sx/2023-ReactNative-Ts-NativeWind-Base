import React from "react"
import { Text, View, StyleSheet, Button } from "react-native"
import LottieView from "lottie-react-native"
import { useRef } from "react"
import { blue600 } from "react-native-paper/lib/typescript/styles/themes/v2/colors"

const Animation = () => {
	const animation = useRef<LottieView>(null)

	return (
		<View>
			<LottieView
				// autoPlay
				ref={animation}
				style={{
					width: "100%",
					height: "auto",
					backgroundColor: "#eee",
				}}
				source={require("@assets/splashAnimation.json")}
			/>
			<View className="flex-row justify-between mx-10">
				<Button
					title="play"
					onPress={() => animation.current?.play()}
				/>
				<Button
					title="pause"
					onPress={() => animation.current?.pause()}
				/>
				<Button
					title="reset"
					onPress={() => animation.current?.reset()}
				/>
			</View>
		</View>
	)
}

export default Animation

const styles = StyleSheet.create({
	page: {
		backgroundColor: "white",
		flex: 1,
		padding: 10,
		borderRadius: 10,
	},
})
