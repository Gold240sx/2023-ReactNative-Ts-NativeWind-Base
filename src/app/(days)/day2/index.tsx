import { View, Text, Button } from "react-native"
import React from "react"
import { Link, Stack } from "expo-router"
import { Button as PaperButton } from "react-native-paper"

const DayDetailsScreen = () => {
	return (
		<View>
			<Stack.Screen options={{ title: "Day 2. Onboarding" }} />
			<Text>Day Details Screen</Text>
			{/* <Button className="bg-blue-600 px-4">
				<Text className="text-white">Go to onboarding</Text>
			</Button> */}
			<Link href="/day2/onboarding" asChild>
				<Button title="Go to onboarding" />
			</Link>
		</View>
	)
}

export default DayDetailsScreen
