import { Text } from "react-native-paper"
import { View, StyleSheet, SafeAreaView, Pressable } from "react-native"
import { useState } from "react"
import { Link, Stack, router } from "expo-router"
import { FontAwesome5 } from "@expo/vector-icons"

const onboardingSteps = [
	{
		icon: "snowflake",
		title: "Welcome to Channukah",
		description: "Or Hannukah... or chanunnuchkah?.",
	},
	{
		icon: "car",
		title: "Track every transaction",
		description:
			"Monitor the time spent on essential business functions, to know what to automate, so you can focus on business.",
	},
	{
		icon: "people-arrows",
		title: "Learn this weeks parasha",
		description: "Listen alone, with your kids, or even at work!",
	},
]

export default function OnboardingScreen() {
	const [screenIndex, setScreenIndex] = useState(0)

	const data = onboardingSteps[screenIndex]

	const onContinue = () => {
		const isLastScreen = screenIndex === onboardingSteps.length - 1
		if (isLastScreen) {
			endOnboarding()
		} else {
			setScreenIndex(screenIndex + 1)
		}
	}

	const endOnboarding = () => {
		setScreenIndex(0)
		router.back()
	}

	return (
		<SafeAreaView style={styles.page}>
			<Stack.Screen options={{ headerShown: false }} />

			<View style={styles.pageContent}>
				<FontAwesome5
					name={data.icon}
					style={styles.image}
					className=""
					size={120}
					color="#CEF202"
				/>
				<View style={styles.footer}>
					<Text
						className="text-5xl text-white px-2"
						style={styles.title}>
						{data.title}
					</Text>
					<Text
						style={styles.description}
						className="text-lg text-slate-600 p-2">
						{data.description}
					</Text>
					<View
						style={styles.buttonRow}
						className="text-white mt-2 align-middle items-center gap-10">
						<Text
							style={styles.buttonTextSkip}
							onPress={endOnboarding}
							className="text-white flex-1  text-center text-xl border border-white">
							Skip
						</Text>
						<Pressable
							style={styles.button}
							onPress={onContinue}
							className="text-white flex-auto  justify-between">
							<Text
								style={styles.buttonText}
								className="text-white text-center text-xl bg-[#302E38]">
								Continue
							</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	page: {
		justifyContent: "center",
		flex: 1,
		backgroundColor: "#15141a",
	},
	pageContent: {
		padding: 20,
		flex: 1,
	},
	image: {
		alignSelf: "center",
		margin: 20,
	},
	title: {
		fontFamily: "InterBlack",
		letterSpacing: 1.3,
		marginVertical: 10,
	},
	description: {
		fontFamily: "Inter",
		lineHeight: 25,
	},
	footer: {
		marginTop: "auto",
		padding: 2,
	},
	buttonRow: {
		display: "flex",
		flexDirection: "row",
		marginTop: 30,
		justifyContent: "space-between",
	},
	buttonText: {
		color: "#FDFDFD",
		padding: 15,
		fontFamily: "InterSemi",
		flex: 1,
	},
	buttonTextSkip: {
		borderColor: "white",
		borderRadius: 30,
		padding: 15,
		borderWidth: 2,
	},
	button: {
		backgroundColor: "#302E38",
		borderRadius: 50,
		alignItems: "center",
	},
})
