import { StatusBar } from "expo-status-bar"
import { StyleSheet, View, FlatList, Text } from "react-native"
import { Button } from "react-native-paper"
import DayListItem from "@components/core/DayListItem"

const days = [...Array(15)].map((val, index) => index + 1)

export default function HomeScreen() {
	return (
		<>
			<View style={styles.container}>
				<Text className="text-3xl text-center text-teal-400">
					This is now a red title
				</Text>
				<Button
					icon="camera"
					mode="contained"
					className="mx-6 bg-teal-800 active:bg-teal-500 "
					onPress={() => console.log("Pressed")}>
					Press me
				</Button>
				<FlatList
					data={days}
					contentContainerStyle={styles.content}
					columnWrapperStyle={styles.column}
					numColumns={2}
					renderItem={({ item }) => <DayListItem day={item} />}
				/>
				<StatusBar style="auto" />
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},

	content: {
		gap: 10,
		padding: 10,
	},
	column: {
		gap: 10,
	},
})
