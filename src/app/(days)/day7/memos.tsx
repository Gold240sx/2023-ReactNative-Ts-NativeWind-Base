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
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
	withDelay,
} from "react-native-reanimated"
import MemoListItem from "@/components/day7/memoListItem"

export type Memo = {
	uri: string
	metering: number[]
}

const MemosScreen = () => {
	const [recording, setRecording] = useState<Recording>()
	const [memos, setMemos] = useState<Memo[]>([])
	const [audioMetering, setAudioMetering] = useState<number[]>([])
	const metering = useSharedValue(-100)

	const startRecording = async () => {
		try {
			setAudioMetering([])
			console.log("Requesting permission")
			await Audio.requestPermissionsAsync()
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true,
			})

			console.log("Starting Recording")
			const { recording } = await Audio.Recording.createAsync(
				Audio.RecordingOptionsPresets.HIGH_QUALITY,
				undefined,
				// 1000 / 60
				100
			)
			setRecording(recording)
			console.log("Recording  started")
			recording.setOnRecordingStatusUpdate((status) => {
				console.log(status.metering)
				if (status.metering) {
					metering.value = status.metering
					setAudioMetering((curVal) => [
						...curVal,
						status.metering || -100,
					])
				}
			})
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
		metering.value = -100
		if (uri) {
			setMemos((existingMemos) => [
				{ uri, metering: audioMetering },
				...existingMemos,
			])
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

	const animatedRecordWave = useAnimatedStyle(() => {
		const size = withTiming(
			interpolate(metering.value, [-160, -60, 0], [0, 0, -100]),
			{ duration: 100 }
		)

		return {
			top: size,
			bottom: size,
			left: size,
			right: size,
			opacity: withDelay(
				150,
				withTiming(recording ? 100 : 0, { duration: 300 })
			),
		}
	})

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
					renderItem={({ item }) => <MemoListItem memo={item} />}
				/>
				<View style={styles.footer}>
					<View>
						<Animated.View
							style={[
								styles.recordWave,
								animatedRecordWave,
							]}></Animated.View>
						<Pressable
							onPress={
								recording ? stopRecording : startRecording
							}>
							<Animated.View
								style={[
									styles.recordButton,
									AnimatedRecordButton,
								]}>
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
	recordWave: {
		backgroundColor: "#FF000035",
		position: "absolute",
		zIndex: -1,
		borderRadius: 20,
	},
	name: {},
	image: {},
})

export default MemosScreen
