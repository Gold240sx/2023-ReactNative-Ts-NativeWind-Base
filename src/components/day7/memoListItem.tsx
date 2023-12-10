import React, { useEffect, useState, useCallback } from "react"
import { View, Text, StyleSheet } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import { AVPlaybackStatus, Audio } from "expo-av"
import { Sound } from "expo-av/build/Audio"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"

export default function MemoListItem({ uri }: { uri: string }) {
	const [sound, setSound] = useState<Sound>()
	const [status, setStatus] = useState<AVPlaybackStatus>()

	async function loadSound() {
		console.log("loading sound")
		const { sound } = await Audio.Sound.createAsync(
			{ uri },
			{ progressUpdateIntervalMillis: 1000 / 60 },
			onPlaybackStatusUpdate
		)
		setSound(sound)
	}

	const onPlaybackStatusUpdate = useCallback(
		async (newStatus: AVPlaybackStatus) => {
			// console.log(JSON.stringify(status, null, 2))
			setStatus(newStatus)

			if (!newStatus.isLoaded || !sound) {
				return
			}
			if (newStatus.didJustFinish) {
				// console.warn("should restart")
				// await sound?.setPositionAsync(0)
				sound?.setStatusAsync({ positionMillis: 0 })
			}
		},
		[sound]
	)

	useEffect(() => {
		loadSound()
	}, [uri])

	async function playSound() {
		if (!sound) {
			return
		}
		console.log("playing sound")
		if (status?.isLoaded && status.isPlaying) {
			await sound.playAsync()
		} else await sound.replayAsync()
	}

	useEffect(() => {
		return sound
			? () => {
					console.log("unloading sound")
					sound.unloadAsync()
			  }
			: undefined
	}, [sound])

	const isPlaying = status?.isLoaded ? status.isPlaying : false
	const position = status?.isLoaded ? status.positionMillis : 0
	const duration = status?.isLoaded ? status.durationMillis : 1

	//@ts-ignore
	const progress = position / duration

	const formatMilliseconds = (millis: number) => {
		const minutes = Math.floor(millis / (1000 * 60))
		const seconds = Math.floor((millis % (1000 * 60)) / 1000)

		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
	}

	const animatedIndicatorStyle = useAnimatedStyle(() => ({
		left: `${progress * 100}%`,
		// might want to use the withTiming function as opposed to the 60 fps 1000/60 above
	}))

	return (
		<View style={styles.container}>
			<FontAwesome5
				onPress={playSound}
				name={isPlaying ? "pause" : "play"}
				className="ml-3 active:bg-white hover:text-zinc-600"
				size={20}
				color={"gray"}
			/>
			<View style={styles.playbackContainer}>
				<View style={styles.playbackBackground}>
					<Animated.View
						style={[
							styles.playbackIndicator,
							animatedIndicatorStyle,
						]}></Animated.View>
				</View>
				<Text style={styles.playbackText}>
					{formatMilliseconds(duration || 0)}
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		margin: 5,
		flexDirection: "row",
		alignItems: "center",
		padding: 15,
		borderRadius: 10,
		gap: 10,

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
	playbackContainer: {
		flex: 1,
		height: 50,
		justifyContent: "center",
		// backgroundColor: "lime",
		position: "relative",
		paddingHorizontal: 8,
	},
	playbackBackground: {
		height: 5,
		marginHorizontal: 5,
		backgroundColor: "gainsboro",
	},
	playbackIndicator: {
		width: 15,
		aspectRatio: 1,
		backgroundColor: "blue",
		borderRadius: 10,
		position: "absolute",
		transform: [{ translateY: -5 }],
	},
	playbackText: {
		bottom: 0,
		right: 0,
		position: "absolute",
		marginHorizontal: 5,
		color: "gray",
		fontFamily: "InterSemi",
	},
})
