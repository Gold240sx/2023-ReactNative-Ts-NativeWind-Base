import { View, Text, Button, StyleSheet } from "react-native"
import React from "react"
import { Link, Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import MarkdownDisplay from "@/components/day3/MarkdownDisplay"

const description = `
#  Weather application
  - data fetching from a pulic api (openWeather) into react-native
`

const DayDetailsScreen = () => {
	return (
		<SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
			<Stack.Screen options={{ title: "Day 8: Weather App" }} />
			<MarkdownDisplay>{description}</MarkdownDisplay>
			<Link href="/day8/WeatherApp" asChild>
				<Button title="How cold is it?!!!!" />
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
