import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";

import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import {
	useDeleteProduct,
	useInsertProduct,
	useProduct,
	useUpdateProduct,
} from "@/src/api/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";

const CreateProductScreen = () => {
	const [image, setImage] = useState<string | null>(null);
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [errors, setErrors] = useState("");

	const router = useRouter();

	const { id: idString } = useLocalSearchParams();
	const id = parseFloat(
		typeof idString === "string" ? idString : idString?.[0]
	);

	const isUpdating = !!id;

	const { mutate: insertProduct } = useInsertProduct();
	const { mutate: updateProduct } = useUpdateProduct();
	const { data: updatingProduct } = useProduct(id);
	const { mutate: deleteProduct } = useDeleteProduct();

	useEffect(() => {
		if (updatingProduct) {
			setName(updatingProduct.name);
			setImage(updatingProduct.image);
			setPrice(updatingProduct.price.toString());
		}
	}, [updatingProduct]);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	const resetFields = () => {
		setName("");
		setPrice("");
	};

	const validateInput = () => {
		setErrors("");

		if (!name) {
			setErrors("Name is required!");
			return false;
		}

		if (!price) {
			setErrors("Price is required!");
			return false;
		}

		if (isNaN(parseFloat(price))) {
			setErrors("Price is not a number!");
			return false;
		}

		return true;
	};

	const onCreate = () => {
		if (!validateInput()) return;

		insertProduct(
			{ name, image, price: parseFloat(price) },
			{
				onSuccess: () => {
					resetFields();
					router.back();
				},
			}
		);
	};

	const onUpdate = () => {
		if (!validateInput()) return;

		updateProduct(
			{ id, name, image, price: parseFloat(price) },
			{
				onSuccess: () => {
					resetFields();
					router.back();
				},
			}
		);
	};

	const onSubmit = () => {
		if (isUpdating) {
			onUpdate();
		} else {
			onCreate();
		}
	};

	const onDelete = () => {
		deleteProduct(id, {
			onSuccess: () => {
				resetFields();
				router.replace("/(admin)");
			},
		});
	};

	const confirmDelete = () => {
		Alert.alert("Confirm", "Are you sure you want to delete this product?", [
			{ text: "Cancel" },
			{ text: "Delete", style: "destructive", onPress: onDelete },
		]);
	};

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{ title: isUpdating ? "Update product" : "Create product" }}
			/>

			<Image
				source={{ uri: image || defaultPizzaImage }}
				style={styles.image}
			/>
			<Text onPress={pickImage} style={styles.textButton}>
				Select image
			</Text>

			<Text style={styles.label}>Name</Text>
			<TextInput
				value={name}
				onChangeText={setName}
				placeholder="name"
				style={styles.input}
			/>

			<Text style={styles.label}>Price ($)</Text>
			<TextInput
				value={price}
				onChangeText={setPrice}
				placeholder="9.99"
				style={styles.input}
				keyboardType="numeric"
			/>

			<Text style={{ color: "red" }}>{errors}</Text>
			<Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
			{isUpdating && (
				<Text onPress={confirmDelete} style={styles.textButton}>
					Delete
				</Text>
			)}
		</View>
	);
};

export default CreateProductScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 10,
	},
	image: {
		width: "50%",
		aspectRatio: 1,
		alignSelf: "center",
	},
	textButton: {
		fontWeight: "bold",
		color: Colors.light.tint,
		alignSelf: "center",
		marginVertical: 10,
	},
	label: {
		fontSize: 16,
		color: "gray",
	},
	input: {
		backgroundColor: "white",
		padding: 10,
		borderRadius: 5,
		marginTop: 5,
		marginBottom: 5,
	},
});
