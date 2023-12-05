import { Text } from "react-native-paper"
import { View, StyleSheet, SafeAreaView, Pressable } from "react-native"
import { useState } from "react"
import { Link, Stack, router } from "expo-router"
import { FontAwesome5 } from "@expo/vector-icons"
import { StatusBar } from "expo-status-bar"
import {
	GestureDetector,
	Gesture,
	Directions,
} from "react-native-gesture-handler"
import Animated, {
	FadeIn,
	FadeOut,
	BounceInRight,
	BounceOutLeft,
	BounceOutRight,
	BounceInLeft,
	SlideInLeft,
	SlideInRight,
	SlideOutRight,
	SlideOutLeft,
} from "react-native-reanimated"

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

	const onBack = () => {
		const isFirstScreen = screenIndex === 0
		if (isFirstScreen) {
			endOnboarding()
		} else {
			setScreenIndex(screenIndex - 1)
		}
	}

	const endOnboarding = () => {
		setScreenIndex(0)
		router.back()
	}

	const swipes = Gesture.Simultaneous(
		Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
		Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack)
	)

	return (
		<SafeAreaView style={styles.page}>
			<Stack.Screen options={{ headerShown: false }} />
			<StatusBar style="light" />
			<View style={styles.stepIndicatorContainer} className="">
				{onboardingSteps.map((step, index) => (
					<View
						key={index}
						style={styles.stepIndicator}
						className={
							index === screenIndex
								? "bg-lime-400"
								: "bg-slate-500"
						}
					/>
				))}
			</View>
			<GestureDetector gesture={swipes}>
				<Animated.View
					// entering={SlideInRight}
					style={styles.pageContent}
					key={screenIndex}>
					<Animated.View entering={FadeIn} exiting={FadeOut}>
						<FontAwesome5
							name={data.icon}
							style={styles.image}
							className=""
							size={120}
							color="#CEF202"
						/>
					</Animated.View>
					<View style={styles.footer}>
						<Animated.Text
							entering={SlideInRight}
							exiting={SlideOutLeft}
							className="px-2 text-5xl text-white"
							style={styles.title}>
							{data.title}
						</Animated.Text>
						<Animated.Text
							entering={SlideInRight.delay(50)}
							exiting={SlideOutLeft}
							style={styles.description}
							className="p-2 text-lg text-slate-600">
							{data.description}
						</Animated.Text>
						<View
							style={styles.buttonRow}
							className="items-center gap-10 mt-2 text-white align-middle">
							<Text
								style={styles.buttonTextSkip}
								onPress={endOnboarding}
								className="flex-1 text-xl text-center text-white border border-white">
								Skip
							</Text>
							<Pressable
								style={styles.button}
								onPress={onContinue}
								className="justify-between flex-auto text-white">
								<Text
									style={styles.buttonText}
									className="text-white text-center text-xl bg-[#302E38]">
									Continue
								</Text>
							</Pressable>
						</View>
					</View>
				</Animated.View>
			</GestureDetector>
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
	stepIndicatorContainer: {
		flexDirection: "row",
		gap: 8,
		marginHorizontal: 15,
	},
	stepIndicator: {
		flex: 1,
		height: 5,
		margin: 5,
		borderRadius: 10,
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
