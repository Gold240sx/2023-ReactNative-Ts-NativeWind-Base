import { View, Text, Button, StyleSheet } from "react-native"
import React from "react"
import { Link, Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import MarkdownDisplay from "@/components/day3/MarkdownDisplay"

const description = `
#  Camera App
- Record and take photos
- Save photos / recordings to the Photo's section
`

const DayDetailsScreen = () => {
	return (
		<SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
			<Stack.Screen options={{ title: "Day 6: Tinder Cards" }} />
			<MarkdownDisplay>{description}</MarkdownDisplay>
			<Link href="/day9/protected" asChild>
				<Button title="Let's log in!" />
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
