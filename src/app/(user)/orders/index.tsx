import { ActivityIndicator, FlatList, Text } from "react-native";

import OrderListItem from "@/src/components/OrderListItem";
import { useUserOrderList } from "@/src/api/orders";

export default function OrdersScreen() {
	const { data: orders, isLoading, error } = useUserOrderList();

	if (isLoading) return <ActivityIndicator />;

	if (error) return <Text>Failed to fetch data!</Text>;

	return (
		<FlatList
			data={orders}
			renderItem={({ item }) => <OrderListItem order={item} />}
		/>
	);
}
