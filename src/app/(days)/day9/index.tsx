import { View, Text, Button, StyleSheet } from "react-native"
import React from "react"
import { Link, Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import MarkdownDisplay from "@/components/day3/MarkdownDisplay"

const description = `
#  Auth Flow
- AWS Amplify v6 Authentication
- Set up amplify project
- add authentication to the app
- custom auth screen  + a quick setup auth screen
- control app flow with permissions
`

const DayDetailsScreen = () => {
	return (
		<SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
			<Stack.Screen options={{ title: "Day 6: Tinder Cards" }} />
			<MarkdownDisplay>{description}</MarkdownDisplay>
			<Link href="/day9/protected" asChild>
				<Button title="View Protected!" />
			</Link>
			<Link href="/day9/auth/confirm-email" asChild>
				<Button title="Confirm Email Page" />
			</Link>
			{/* <Link href="/day9/auth/sign-in" asChild>
				<Button title="Sign in bro..." />
			</Link> */}
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
