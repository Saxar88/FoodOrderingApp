import { Stack, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { PizzaSize } from "@/src/types";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
	const { id } = useLocalSearchParams();

	const product = products.find((p) => p.id.toString() === id);

	if (!product) {
		return <Text>Product not found!</Text>;
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: product.name }} />
			<Image
				source={{ uri: product.image || defaultPizzaImage }}
				style={styles.image}
			/>
			<Text style={{ fontSize: 20 }}>{product.name}</Text>
			<Text style={styles.price}>${product.price}</Text>
		</View>
	);
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		padding: 10,
	},
	image: {
		width: "100%",
		aspectRatio: 1,
	},
	price: {
		fontSize: 18,
		fontWeight: "bold",
	},
});
