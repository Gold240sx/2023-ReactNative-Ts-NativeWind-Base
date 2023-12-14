import { View, Text, Button, StyleSheet } from "react-native"
import React from "react"
import { Link, Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import MarkdownDisplay from "@/components/day3/MarkdownDisplay"

const description = `
#  Voice Memos

## In this module, We will cover: 
- working with native audio , microphone and recording in react-native
- playback recordings
- functions reducing and expanding the audio wavelength into a set number 
	of wavelengths to handle very long/short audio clips. (Array averaging)
`

const DayDetailsScreen = () => {
	return (
		<SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
			<Stack.Screen options={{ title: "Day 7: Voice Memos" }} />
			<MarkdownDisplay>{description}</MarkdownDisplay>
			<Link href="/day7/memos" asChild>
				<Button title="Let's  record!" />
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
