import { View, Text, Button } from "react-native"
import React from "react"
import { Link, Stack } from "expo-router"
import { Button as PaperButton } from "react-native-paper"

const DayDetailsScreen = () => {
	return (
		<View>
			<Stack.Screen options={{ title: "Day 2. Onboarding" }} />
			<Text>Day Details Screen</Text>
			<Link href="/day3/editor" asChild>
				<Button title="Go to editor" />
			</Link>
		</View>
	)
}

export default DayDetailsScreen
