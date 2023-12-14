import { Stack } from "expo-router"
import React, { useState, useMemo } from "react"
import { View, Text, StyleSheet, FlatList } from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import Appartments from "@assets/data/day5/appartments.json"
import CustomMarker from "@/components/day5/customMarker"
import AppartmentListItem from "@/components/day5/AppartmentListItems"
import BottomSheet, {
	BottomSheetFlatList,
	useGestureEventsHandlersDefault,
} from "@gorhom/bottom-sheet"
import { Gesture } from "react-native-gesture-handler"

const AirBnB = () => {
	const [selectedApartment, setSelectedApartment] = useState(null)
	const [mapRegion, setMapRegion] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.1922,
		longitudeDelta: 0.0421,
	})
	const snapPoints = useMemo(() => ["10%", "50%", "90%"], [])

	// Zoom in to the map's focus when the bottom sheet is pulled up.
	// const gestureHandle = useGestureEventsHandlersDefault({
	// 	handleOnActive: (source, payload, context) => {
	// 		console.log("active")
	// 	},
	// 	handleOnActive: () => {},
	// 	handleOnEnd: () => {},
	// })
	// const gestureHandle = Gesture.Pan()
	// 	.onBegin((event) => console.log("begin pan"))
	// 	.onUpdate((event) => console.log("update pan"))
	// const gestureHandle = () => ({
	// 	handleOnStart: () => {
	// 		console.log("begin pan")
	// 	},
	// 	handleOnActive: () => {
	// 		console.log("log active")
	// 	},
	// 	handleOnEnd: () => {
	// 		console.log("log end")
	// 	},
	// })

	return (
		<View>
			<Stack.Screen options={{ headerShown: false }} />
			<MapView
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				region={mapRegion}>
				{Appartments.map((appartment, index) => (
					<CustomMarker
						appartment={appartment}
						key={index}
						onPress={() => setSelectedApartment(appartment)}
					/>
				))}
			</MapView>

			{/* display custom selected apartment component */}
			{selectedApartment && (
				<AppartmentListItem
					appartment={selectedApartment}
					containerStyle={{
						position: "absolute",
						bottom:
							typeof snapPoints[0] === "number"
								? snapPoints[0] + 10
								: 100,
						right: 10,
						left: 10,
					}}
				/>
			)}

			{/* display bottom sheet */}
			<BottomSheet
				// ref={bottomSheet}
				// enablePanDownToClose // enables fully closing the bottom sheet
				index={1} //opens at the position of index 1 of the snappoint array.
				snapPoints={snapPoints}
				onChange={() => console.log("onChanged")}
				onAnimate={(from, to) =>
					console.log("From: ", from, "To: ", to)
				}
				// gestureEventsHandlersHook={gestureHandle}
			>
				<View style={{ flex: 1 }}>
					<Text style={styles.listItem}>
						Over {Appartments.length} places!
					</Text>
					<BottomSheetFlatList
						data={Appartments}
						contentContainerStyle={{
							gap: 10,
							padding: 10,
						}}
						renderItem={({ item }) => (
							<AppartmentListItem appartment={item} />
						)}
					/>
				</View>
			</BottomSheet>
		</View>
	)
}

export default AirBnB

const styles = StyleSheet.create({
	map: { width: "100%", height: "100%" },
	listItem: {
		textAlign: "center",
		fontFamily: "InterSemi",
		fontSize: 16,
		marginBottom: 5,
		marginVertical: 30,
	},
})
