import { View, Text } from "react-native"
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
			<Text>Memos screen</Text>
		</View>
	)
}

// const styles = StyleSheet.create({
// 	card: {},
// 	name: {},
// 	image: {},
// })

export default MemosScreen
