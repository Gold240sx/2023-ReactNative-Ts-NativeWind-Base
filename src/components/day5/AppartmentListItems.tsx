import { View, Text, StyleSheet, Image, ViewStyle } from "react-native"
import { Marker } from "react-native-maps"
import Appartments from "@assets/data/day5/appartments.json"
import React from "react"

type AppartmentListItemProps = {
	appartment: (typeof Appartments)[0]
	containerStyle?: ViewStyle
}

const AppartmentListItem = ({
	appartment,
	containerStyle,
}: AppartmentListItemProps) => {
	return (
		<View style={[styles.card, containerStyle]}>
			<Image source={{ uri: appartment.image }} style={styles.image} />
			<View style={styles.rightContainer}>
				<Text style={styles.title}>{appartment.title}</Text>
				<Text style={styles.description}>
					Stay at this appartment for an affordable price!
				</Text>
				<View style={styles.footer}>
					<Text style={styles.price}>$ {appartment.price} night</Text>
					<Text style={styles.price}>
						★ {appartment.numberOfStars}
					</Text>
				</View>
			</View>
		</View>
	)
}

export default AppartmentListItem

const styles = StyleSheet.create({
	card: {
		backgroundColor: "white",
		margin: 10,
		overflow: "hidden",
		borderRadius: 20,
		flexDirection: "row",
	},
	title: {
		fontFamily: "InterBold",
		fontSize: 16,
		marginBottom: 10,
	},
	description: {
		color: "gray",
	},
	image: {
		width: 150,
		aspectRatio: 1,
		// borderRadius: 10,
	},
	rightContainer: {
		padding: 10,
		flex: 1,
	},
	price: {
		fontFamily: "InterBold",
	},
	footer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: "auto",
	},
})
