import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { type MainWeather } from "../../app/(days)/day8/WeatherApp"
import dayjs from "dayjs"
import { BlurView } from "expo-blur"

type WeatherForecast = MainWeather & {
	dt: number
}

const ForecastItem = ({ forecast }: { forecast: WeatherForecast }) => {
	return (
		<BlurView intensity={30} style={styles.container}>
			<Text style={styles.temp}>{Math.round(forecast.main.temp)}°</Text>
			<Text style={styles.date}>
				{dayjs(forecast.dt * 1000).format("ddd hA")}
			</Text>
		</BlurView>
	)
}

const styles = StyleSheet.create({
	container: {
		// backgroundColor: "ghostwhite",
		padding: 10,
		aspectRatio: 9 / 16,
		borderRadius: 10,
		alignItems: "center",
		overflow: "hidden", //required for the borderRadius when using the bg-blur
		justifyContent: "center",
		borderColor: "gainsboro",
		borderWidth: StyleSheet.hairlineWidth,
	},
	temp: {
		fontFamily: "InterBlack",
		fontSize: 35,
		color: "white",
	},
	date: {
		fontFamily: "Inter",
		color: "ghostwhite",
		fontSize: 16,
		fontWeight: "bold",
	},
})

export default ForecastItem
