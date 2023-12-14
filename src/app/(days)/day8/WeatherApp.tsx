import {
	View,
	Text,
	ActivityIndicator,
	StyleSheet,
	FlatList,
	ImageBackground,
	Pressable,
	Button,
} from "react-native"
import React, { useEffect, useState } from "react"
import { Stack, Link } from "expo-router"
import ForecastItem from "../../../components/day8/ForecastItem"
import { FontAwesome5 } from "@expo/vector-icons"
import LottieView from "lottie-react-native"
import Animated from "react-native-reanimated"
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView)
import Rain from "@assets/rain.json"
import PartCloudy from "@assets/partCloudy.json"

const APIKEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY
import * as Location from "expo-location"
import { BlurView } from "expo-blur"

export type MainWeather = {
	name: string
	dt: number
	main: {
		temp: number
		feels_like: number
		temp_min: number
		temp_max: number
		pressure: number
		humidity: number
		sea_level: number
		grnd_level: number
	}
}

type Weather = MainWeather & {
	name: string
	weather: [
		{
			id: string
			main: string
			description: string
			icon: string
		}
	]
}

const WeatherScreen = () => {
	const [weather, setWeather] = useState<Weather>()
	const [location, setLocation] = useState<Location.LocationObject>()
	const [errorMsg, setErrorMsg] = useState<String>("")
	const [forecast, setForecast] = useState<Weather[]>()
	//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
	// const APIKEY = process.env: "OPEN_WEATHER_API_KEY"
	const baseUrl = "https://api.openweathermap.org/data/2.5/"
	const bgImage =
		"https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg"

	useEffect(() => {
		if (location) {
			fetchWeather()
			fetchForecast()
			console.log("fetched weather")
		}
	}, [location])

	useEffect(() => {
		const getLocation = async () => {
			try {
				let { status } =
					await Location.requestForegroundPermissionsAsync()
				if (status !== "granted") {
					setErrorMsg("Permission to access location was denied")
					return
				}

				let location = await Location.getCurrentPositionAsync({})
				setLocation(location)
			} catch (error) {
				// Handle errors here
				console.error(error)
			}
		}

		getLocation()
	}, [])

	const fetchWeather = async () => {
		if (!location) {
			return
		}
		const lat = location.coords.latitude
		const long = location.coords.longitude
		const results = await fetch(
			`${baseUrl}weather?lat=${lat}&lon=${long}&appid=${APIKEY}&units=imperial`
		)
		const data = await results.json()
		setWeather(data)
	}

	const fetchForecast = async () => {
		// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
		if (!location) {
			return
		}
		const lat = location.coords.latitude
		const long = location.coords.longitude
		const results = await fetch(
			`${baseUrl}forecast?lat=${lat}&lon=${long}&appid=${APIKEY}&units=imperial`
		)
		const data = await results.json()
		setForecast(data.list)
	}

	if (!weather) {
		return <ActivityIndicator />
	}

	return (
		<ImageBackground source={{ uri: bgImage }} style={styles.container}>
			<Stack.Screen options={{ headerShown: false }} />
			{/* <View
				style={[
					{
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
					},
					styles.container,
				]}> */}
			<View style={styles.backButton}>
				<BlurView intensity={60} style={styles.backButtonBlur}>
					<Link href="/day8" asChild>
						<FontAwesome5
							name="arrow-alt-circle-left"
							color="#fff"
							size={50}
						/>
					</Link>
				</BlurView>
			</View>
			<View className="absolute w-full h-full bg-black/40" />
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
				}}>
				{/* {weather.weather[0].main === "rain" && ( */}
				<LottieView
					source={
						weather.weather[0].main === "rain" ? Rain : PartCloudy
					}
					style={{ width: "80%", aspectRatio: 1 }}
					loop
					autoPlay
				/>
				{/* )} */}
				{/* {weather.weather[0].main === "sun" ||
					("clear" && <Player ref={playerRef} icon={ICON} />)} */}
				<Text style={styles.location}>{weather.name}</Text>
				<Text style={styles.temperature}>
					{Math.round(weather.main?.temp)}°
				</Text>
			</View>

			<FlatList
				data={forecast}
				horizontal
				showsHorizontalScrollIndicator={false}
				style={{
					flexGrow: 0,
					height: 200,
					marginBottom: 40,
				}}
				contentContainerStyle={{
					gap: 10,
					paddingHorizontal: 10,
				}}
				renderItem={({ item }) => <ForecastItem forecast={item} />}
			/>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
	},
	backButton: {
		marginTop: 70,
		marginRight: "auto",
		marginLeft: 20,
		height: 70,
		width: 70,
		borderRadius: 30,
		overflow: "hidden",
		padding: 5,
		zIndex: 10,
	},
	backButtonBlur: {
		padding: 5,
		borderRadius: 30,
		overflow: "hidden",
	},
	location: {
		fontFamily: "InterSemi",
		fontSize: 30,
		color: "lightgray",
	},
	temperature: {
		fontFamily: "InterBlack",
		fontSize: 120,
		color: "#FEFEFE",
	},
})

export default WeatherScreen
