import { View, Text, Button, StyleSheet } from "react-native"
import React from "react"
import { Link, Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import MarkdownDisplay from "@/components/day3/MarkdownDisplay"

const description = `
# Animated Splash Screen

`

const DayDetailsScreen = () => {
	return (
		<SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
			<Stack.Screen options={{ title: "Day 5: Maps" }} />

			<MarkdownDisplay>{description}</MarkdownDisplay>

			<Link href="/day4/animation" asChild>
				<Button title="Go to the animation" />
			</Link>
			<Link href="/day4/splashScreen" asChild>
				<Button title="Go to the splash screen animation" />
			</Link>
		</SafeAreaView>
	)
}

export default DayDetailsScreen

const styles = StyleSheet.create({
	page: {
		backgroundColor: "white",
		flex: 1,
		padding: 10,
		borderRadius: 10,
	},
})
