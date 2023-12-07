import { View, Text, StyleSheet, Image, Dimensions } from "react-native"
import React from "react"
import { LinearGradient } from "expo-linear-gradient"
import Animated, {
	SharedValue,
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withSpring,
} from "react-native-reanimated"
import {
	PanGesture,
	GestureDetector,
	Gesture,
} from "react-native-gesture-handler"

const screenWidth = Dimensions.get("screen").width
export const tinderCardWidth = screenWidth * 0.8

type TinderCard = {
	user: {
		image: string
		name: string
	}
	numOfCards: number
	curIndex: number
	activeIndex: SharedValue<number>
	onResponse: (a: boolean) => void
}

const TinderCard = ({
	user,
	numOfCards,
	curIndex,
	activeIndex,
	onResponse,
}: TinderCard) => {
	const translationX = useSharedValue(0)
	const animatedCard = useAnimatedStyle(() => ({
		// basically a stylesheet.create but it's reactive to changes
		opacity: interpolate(
			activeIndex.value,
			[curIndex - 1, curIndex, curIndex + 1],
			[1 - 1 / 5, 1, 1]
		),
		transform: [
			{
				scale: interpolate(
					activeIndex.value,
					[curIndex - 1, curIndex, curIndex + 1],
					[0.95, 1, 1]
				),
			},
			{
				translateY: interpolate(
					activeIndex.value,
					[curIndex - 1, curIndex, curIndex + 1],
					[-30, 0, 0]
				),
			},
			{
				translateX: translationX.value,
			},
			{
				rotateZ: `${interpolate(
					translationX.value,
					[-screenWidth / 2, 0, screenWidth / 2],
					[-15, 0, 15]
				)}deg`,
			},
		],
	}))

	const gesture = Gesture.Pan()
		.onChange((event) => {
			translationX.value = event.translationX

			activeIndex.value = interpolate(
				Math.abs(translationX.value),
				[0, 500],
				[curIndex, curIndex + 0.8]
			)
		})
		.onEnd((event) => {
			if (Math.abs(event.velocityX) > 400) {
				translationX.value = withSpring(
					Math.sign(event.velocityX) * 500,
					{
						velocity: event.velocityX,
					}
				)
				activeIndex.value = withSpring(curIndex + 1)

				runOnJS(onResponse)(event.velocityX > 0)
			} else {
				translationX.value = withSpring(0)
			}
		})

	return (
		<GestureDetector gesture={gesture}>
			<Animated.View
				style={[
					styles.card,
					animatedCard,
					{
						zIndex: numOfCards - curIndex,
						// opacity: 1 - curIndex * 0.2,
						// transform: [
						// 	{ translateY: -curIndex * 30 },
						// 	{ scale: 1 - curIndex * 0.05 },
						// ],
					},
				]}>
				<Image
					style={[StyleSheet.absoluteFillObject, styles.image]}
					source={{ uri: user.image }}
				/>
				<LinearGradient
					//backgrount linear gradient
					colors={["transparent", "rgba(0,0,0,0.8)"]}
					style={[StyleSheet.absoluteFillObject, styles.overlay]}
				/>
				<View style={styles.footer}>
					<Text style={styles.name}>{user.name}</Text>
				</View>
			</Animated.View>
		</GestureDetector>
	)
}

const styles = StyleSheet.create({
	card: {
		width: tinderCardWidth,
		aspectRatio: 1 / 1.67,
		borderRadius: 15,
		position: "absolute",
		justifyContent: "flex-end",

		//shadow
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
	name: {
		fontSize: 24,
		color: "white",
		fontFamily: "InterBold",
	},
	image: {
		borderRadius: 15,
	},
	footer: {
		padding: 10,
	},
	overlay: {
		top: "50%",
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
	},
})

export default TinderCard
