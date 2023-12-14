import { View, Text, Button, StyleSheet } from "react-native"
import React from "react"
import { Link, Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import MarkdownDisplay from "@/components/day3/MarkdownDisplay"

const description = `
# Air BnB Maps application

current location article: https://medium.com/@Sarmilasivaraja/integrating-real-time-map-with-user-location-in-a-react-native-app-d0bef63ba3b2
`

const DayDetailsScreen = () => {
	return (
		<SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
			<Stack.Screen options={{ title: "Day 5: Maps" }} />

			<MarkdownDisplay>{description}</MarkdownDisplay>

			<Link href="/day5/airbnb" asChild>
				<Button title="Go to Map" />
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
