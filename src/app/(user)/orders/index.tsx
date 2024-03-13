import { FlatList, StyleSheet, Text } from "react-native";

import OrderListItem from "@/src/components/OrderListItem";
import orders from "@/assets/data/orders";

export default function OrdersScreen() {
	return (
		<FlatList
			data={orders}
			renderItem={({ item }) => <OrderListItem order={item} />}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
