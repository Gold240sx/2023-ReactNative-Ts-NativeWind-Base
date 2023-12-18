import { View, Text, StyleSheet } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import React from "react"
import { Link } from "expo-router"

const ProtectedScreen = () => {
	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}>
			<Text
				style={{
					fontFamily: "Inter",
					fontSize: 20,
					marginBottom: 20,
				}}>
				Protected by Biometrics
			</Text>
			<FontAwesome5
				// onPress={authenticate}
				name="lock"
				size={75}
				color="darkgray"
			/>
			<Link href={"/day10/protected/second"}>Next Page</Link>
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

export default ProtectedScreen