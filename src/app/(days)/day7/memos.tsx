import {
	View,
	Text,
	StyleSheet,
	Button,
	FlatList,
	Pressable,
} from "react-native"
import React, { useState } from "react"
import { Audio } from "expo-av"
import { UserInterfaceIdiom } from "expo-constants"
import { Recording } from "expo-av/build/Audio"
import Animated, {
	useAnimatedStyle,
	withSpring,
	withTiming,
} from "react-native-reanimated"
import MemoListItem from "@/components/day7/memoListItem"

const MemosScreen = () => {
	const [recording, setRecording] = useState<Recording>()
	const [memos, setMemos] = useState<string[]>([])

	const startRecording = async () => {
		try {
			console.log("Requesting permission")
			await Audio.requestPermissionsAsync()
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true,
			})

			console.log("Starting Recording")
			const { recording } = await Audio.Recording.createAsync(
				Audio.RecordingOptionsPresets.HIGH_QUALITY
			)
			setRecording(recording)
			console.log("Recording  started")
		} catch (err) {
			console.error(err)
		}
	}

	const stopRecording = async () => {
		if (!recording) {
			return
		}
		console.log("Stopping Recording")
		setRecording(undefined)
		await recording.stopAndUnloadAsync()
		await Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
		})
		const uri = recording.getURI()
		console.log("Recording stopped at stored at: ", uri)

		if (uri) {
			setMemos((existingMemos) => [uri, ...existingMemos])
		}
	}

	const animatedRedCircle = useAnimatedStyle(() => ({
		width: withTiming(recording ? "85%" : "100%"),
		borderRadius: withTiming(recording ? 5 : 60),
		height: withTiming(recording ? "85%" : "100%"),
		padding: withTiming(recording ? 6 : 6),
	}))

	const AnimatedRecordButton = useAnimatedStyle(() => ({
		borderRadius: withTiming(recording ? 14 : 50),
		padding: withTiming(recording ? 2 : 4),
		width: withSpring(recording ? 60 : 70),
		height: withSpring(recording ? 60 : 70),
	}))

	return (
		<View
			style={{
				flex: 1,
				// alignItems: "center",
				// justifyContent: "center",
			}}>
			{/* <Stack.Screen options={{ headerShown: false }} /> */}
			<View style={styles.container}>
				<Text style={styles.title}>My Memos</Text>
				<FlatList
					data={memos}
					renderItem={({ item }) => <MemoListItem uri={item} />}
				/>
				<View style={styles.footer}>
					<Pressable
						onPress={recording ? stopRecording : startRecording}>
						<Animated.View
							style={[styles.recordButton, AnimatedRecordButton]}>
							<Animated.View
								style={[
									styles.redCircle,
									animatedRedCircle,
								]}></Animated.View>
						</Animated.View>
					</Pressable>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "#ecf0f1",
	},
	title: {
		fontSize: 28,
		fontFamily: "InterBold",
		padding: 20,
	},
	footer: {
		backgroundColor: "white",
		height: 200,
		alignItems: "center",
		justifyContent: "center",
	},
	recordButton: {
		borderRadius: 70,
		borderWidth: 3,
		borderColor: "gray",
		alignItems: "center",
		justifyContent: "center",
	},
	redCircle: {
		backgroundColor: "orangered",
		aspectRatio: 1,
		borderRadius: 35,
	},
	name: {},
	image: {},
})

export default MemosScreen
