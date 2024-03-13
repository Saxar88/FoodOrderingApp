import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import Colors from "@/src/constants/Colors";
import { OrderStatusList } from "@/src/types";

export default function OrderDetailsScreen() {
	const { id } = useLocalSearchParams();

	const order = orders.find((o) => o.id.toString() === id);

	if (!order) {
		return <Text>Order not found!</Text>;
	}

	return (
		<View style={{ flex: 1, padding: 10, gap: 20 }}>
			<Stack.Screen options={{ title: `Order #${id}` }} />
			<OrderListItem order={order} />;
			<FlatList
				data={order.order_items}
				renderItem={({ item }) => <OrderItemListItem item={item} />}
				ListHeaderComponent={() => <OrderListItem order={order} />}
				ListFooterComponent={() => (
					<>
						<Text style={{ fontWeight: "bold" }}>Status</Text>
						<View style={{ flexDirection: "row", gap: 5 }}>
							{OrderStatusList.map((status) => (
								<Pressable
									key={status}
									onPress={() => console.warn("Update status")}
									style={{
										borderColor: Colors.light.tint,
										borderWidth: 1,
										padding: 10,
										borderRadius: 5,
										marginVertical: 10,
										backgroundColor:
											order.status === status
												? Colors.light.tint
												: "transparent",
									}}>
									<Text
										style={{
											color:
												order.status === status ? "white" : Colors.light.tint,
										}}>
										{status}
									</Text>
								</Pressable>
							))}
						</View>
					</>
				)}
			/>
		</View>
	);
}
