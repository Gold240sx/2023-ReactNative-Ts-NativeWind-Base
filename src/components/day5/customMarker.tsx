import { View, Text } from "react-native"
import { Marker } from "react-native-maps"
import React from "react"

const CustomMarker = ({ appartment, onPress }: any) => {
	return (
		<Marker
			onPress={onPress}
			coordinate={{
				latitude: appartment.lattitude,
				longitude: appartment.longitude,
			}}
			// title={appartment.title}
			// description="hello there"
		>
			<View
				style={{
					backgroundColor: "white",
					padding: 3,
					paddingHorizontal: 10,
					borderWidth: 1,
					borderColor: "gray",
					borderRadius: 20,
				}}>
				<Text style={{ fontFamily: "InterBold" }}>
					$ {appartment.price}
				</Text>
			</View>
		</Marker>
	)
}

export default CustomMarker
