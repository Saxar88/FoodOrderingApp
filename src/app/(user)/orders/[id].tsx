import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

import OrderListItem from "@/src/components/OrderListItem";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { useOrderDetails } from "@/src/api/orders";
import { useUpdateOrderSubscription } from "@/src/api/orders/subscriptions";

export default function OrderDetailsScreen() {
	const { id: idString } = useLocalSearchParams();
	const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

	const { data: order, isLoading, error } = useOrderDetails(id);

	useUpdateOrderSubscription(id);

	if (isLoading) return <ActivityIndicator />;

	if (error) return <Text>Failed to fetch product!</Text>;

	return (
		<View style={{ flex: 1, padding: 10, gap: 20 }}>
			<Stack.Screen options={{ title: `Order #${id}` }} />
			<OrderListItem order={order} />;
			<FlatList
				data={order.order_items}
				renderItem={({ item }) => <OrderItemListItem item={item} />}
			/>
		</View>
	);
}
