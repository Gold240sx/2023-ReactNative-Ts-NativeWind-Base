import { View, Text, StyleSheet } from "react-native"
import React from "react"

const MemosScreen = () => {
	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}>
			{/* <Stack.Screen options={{ headerShown: false }} /> */}
			<Text style={styles.title}>Memos screen</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {},
	title: {
		fontFamily: "InterBold",
		fontSize: 30,
	},
	subTitle: {
		fontFamily: "InterSemi",
		fontSize: 20,
		color: "gray",
	},
	name: {},
	image: {},
})

export default MemosScreen
