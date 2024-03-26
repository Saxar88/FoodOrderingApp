import { Stack, useLocalSearchParams } from "expo-router";
import {
	ActivityIndicator,
	FlatList,
	Pressable,
	Text,
	View,
} from "react-native";

import OrderListItem from "@/src/components/OrderListItem";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import Colors from "@/src/constants/Colors";
import { useOrderDetails, useUpdateOrder } from "@/src/api/orders";
import { OrderStatusList } from "@/src/types";

export default function OrderDetailsScreen() {
	const { id: idString } = useLocalSearchParams();
	const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

	const { data: order, isLoading, error } = useOrderDetails(id);
	const { mutate: updateOrder } = useUpdateOrder();

	const updateStatus = (status) => {
		updateOrder({ id, updatedFields: { status } });
	};

	if (isLoading) return <ActivityIndicator />;

	if (error || !order) return <Text>Failed to fetch products!</Text>;

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
									onPress={() => updateStatus(status)}
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
