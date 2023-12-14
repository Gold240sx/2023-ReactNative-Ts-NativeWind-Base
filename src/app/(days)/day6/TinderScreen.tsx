import { View, Text, StyleSheet, Image } from "react-native"
import { Children, useDebugValue, useState, useEffect } from "react"
import React from "react"
import TinderCard from "@components/day6/TinderCard"
import { Stack } from "expo-router"
import {
	useDerivedValue,
	useSharedValue,
	withDecay,
	withSpring,
	interpolate,
	useAnimatedReaction,
	runOnJS,
} from "react-native-reanimated"
import { GestureDetector, Gesture } from "react-native-gesture-handler"

const Users = [
	{
		id: 1,
		image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg",
		name: "Jon",
	},
	{
		id: 2,
		image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/2.jpg",
		name: "Dani",
	},
	{
		id: 3,
		image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/3.jpg",
		name: "Alice",
	},
	{
		id: 4,
		image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/4.jpeg",
		name: "Kelsey",
	},
	{
		id: 5,
		image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/5.jpg",
		name: "Bobby",
	},
]

const TinderScreen = () => {
	const [users, setUsers] = useState(Users)
	const activeIndex = useSharedValue(0)
	const [index, setIndex] = useState(0)

	useAnimatedReaction(
		() => activeIndex.value,
		(value, prevValue) => {
			if (Math.floor(value) !== index) {
				runOnJS(setIndex)(Math.floor(value))
			}
		}
	)

	useEffect(() => {
		if (index > users.length - 3) {
			console.warn("Last 2 cards remining. Fetch more!")
			setUsers((usrs) => [...usrs, ...Users.reverse()])
		}
	}, [index])

	const onResponse = (res: boolean) => {
		console.log("on Response: ", res)
	}

	// const translationX = useSharedValue(0)
	// useDerivedValue((event: any) => {
	// 	activeIndex.value = interpolate(
	// 		Math.abs(translationX.value),
	// 		[0, 500],
	// 		[0, activeIndex.value + 1]
	// 	)
	// })

	// const gesture = Gesture.Pan()
	// 	// .onBegin()
	// 	// .onFinalize()
	// 	.onChange(
	// 		(event) =>
	// 			// console.log("onTranslationX: ", event.translationX)
	// 			(translationX.value = event.translationX)
	// 		// activeIndex.value =
	// 	)
	// 	// .onUpdate()
	// 	// .onStart()
	// 	.onEnd((event) => {
	// 		translationX.value = withSpring(0)
	// 		// velocity
	// 		if (Math.abs(event.velocityX) > 400) {
	// 			// transllationX.value = withDecay({ velocity: event.velocityX})
	// 			translationX.value = withSpring(
	// 				Math.sign(event.velocityX) * 500,
	// 				{ velocity: event.velocityX },
	// 				(finished) => {
	// 					if (finished) {
	// 						activeIndex.value = withSpring(
	// 							activeIndex.value + 1
	// 						)
	// 					}
	// 				}
	// 			)
	// 		}
	// 	})

	// {
	// 	/*
	// 	Gesture details:
	// 	onBegin: when the screen is touched
	// 	onFinalize: when the screen is untouched
	// 	onStart: when the gesture is triggered
	// 	onEnd: when the gesture ends
	// 	onChange: while the gesture is happening - returns what changed ( changeX, changeY )
	// 	onUpdate: while the gesture is happening - returns how much was updated
	// */
	// }

	return (
		// <GestureDetector gesture={gesture}>
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}>
			{/* <Stack.Screen options={{ headerShown: false }} /> */}
			{users.map((user, index) => (
				<TinderCard
					key={index}
					user={user}
					numOfCards={users.length}
					curIndex={index}
					activeIndex={activeIndex}
					onResponse={onResponse}
					// translationX={translationX}
				/>
			))}
		</View>
		// </GestureDetector>
	)
}

// const styles = StyleSheet.create({
// 	card: {},
// 	name: {},
// 	image: {},
// })

export default TinderScreen
