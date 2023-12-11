import React, { useEffect, useState, useCallback } from "react"
import { View, Text, StyleSheet } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import { AVPlaybackStatus, Audio } from "expo-av"
import { Sound } from "expo-av/build/Audio"
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated"
import { LinearGradient } from "expo-linear-gradient"
import RadialGradient from "react-native-radial-gradient"
import { type Memo } from "@/app/(days)/day7/memos"

export default function MemoListItem({ memo }: { memo: Memo }) {
	const [sound, setSound] = useState<Sound>()
	const [status, setStatus] = useState<AVPlaybackStatus>()

	async function loadSound() {
		// console.log("loading sound")
		const { sound } = await Audio.Sound.createAsync(
			{ uri: memo.uri },
			{ progressUpdateIntervalMillis: 1000 / 60 },
			onPlaybackStatusUpdate
		)
		setSound(sound)

		sound.setOnAudioSampleReceived((sample) => {
			console.log(JSON.stringify(sample, null, 2))
		})
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
	}, [memo.uri])

	async function playSound() {
		if (!sound) {
			return
		}
		// console.log("playing sound")
		if (status?.isLoaded && status.isPlaying) {
			await sound.playAsync()
		} else await sound.replayAsync()
	}

	useEffect(() => {
		return sound
			? () => {
					// console.log("unloading sound")
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
		// opacity: isPlaying ? 100 : 0,
		// might want to use the withTiming function as opposed to the 60 fps 1000/60 above
	}))

	// const lines = memo.metering.slice(0, 10)
	let lines = []
	let numLines = 35

	// metering []

	for (let i = 0; i < numLines; i++) {
		const meteringIndex = Math.floor((i * memo.metering.length) / numLines)
		const nextMeteringIndex = Math.ceil(
			(i + 1 * memo.metering.length) / numLines
		)
		const values = memo.metering.slice(meteringIndex, nextMeteringIndex)
		const average = values.reduce((sum, a) => sum + a, 0) / values.length // the value over a particular period
		lines.push(memo.metering[meteringIndex])
	}

	memo.metering.forEach((db, index) => {
		// esrnrioa
	})

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
				{/* <View style={styles.playbackBackground}> */}
				<View style={styles.wave}>
					{lines.map((db, index) => (
						<View
							style={[
								styles.waveLine,
								{
									height: interpolate(
										db,
										[-60, 0],
										[5, 50],
										Extrapolate.CLAMP //keeps us between 5 and 50
									),
									backgroundColor:
										progress > index / lines.length
											? "royalblue"
											: "gainsboro",
								},
							]}
						/>
					))}
				</View>
				{/* <Animated.View
					style={[styles.playbackIndicator, animatedIndicatorStyle]}>
					 <RadialGradient
							style={{ width: 200, height: 200 }}
							colors={["black", "green", "blue", "red"]}
							stops={[0.1, 0.4, 0.3, 0.75]}
							center={[100, 100]}
							radius={200}></RadialGradient> 
				</Animated.View> */}
				{/* </View> */}
				<Text style={styles.playbackText}>
					{formatMilliseconds(position)} /
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
		height: 80,
		justifyContent: "center",
		// backgroundColor: "lime",
		position: "relative",
		paddingLeft: 8,
		paddingRight: 0,
	},
	playbackBackground: {
		height: 5,
		marginHorizontal: 5,
		backgroundColor: "gainsboro",
		borderRadius: 4,
	},
	playbackIndicator: {
		width: 15,
		aspectRatio: 1,
		backgroundColor: "blue",
		// background-color: radial-gradient(80.41% 88.9% at 50.13% 32.58%, #FFB5B5 17.19%, rgba(130, 153, 153, 0) 100%),
		borderRadius: 10,
		position: "absolute",
		// transform: [{ translateY: -5 }],
	},
	playbackText: {
		bottom: 0,
		right: 0,
		position: "absolute",
		marginHorizontal: 5,
		color: "gray",
		fontFamily: "InterSemi",
	},
	// linearGradient1: {
	// 	position: "absolute",
	// 	width: "100%",
	// 	height: "100%",
	// 	borderRadius: 50,
	// 	top: "2%",
	// },
	// linearGradient2: {
	// 	position: "absolute",
	// 	width: "100%",
	// 	height: "100%",
	// 	borderRadius: 50,
	// 	bottom: "0%",
	// },
	wave: {
		flexDirection: "row",
		alignItems: "center",
		gap: 3,
	},
	waveLine: {
		flex: 1,
		height: 30,
		backgroundColor: "#D4D4D4",
		borderRadius: 20,
	},
})
