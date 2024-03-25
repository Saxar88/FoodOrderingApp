import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";

import { CartItem, Tables } from "../types";

type CartType = {
	items: CartItem[];
	addItem: (product: Tables<"products">, size: CartItem["size"]) => void;
	updateQuantity: (itemId: string, ammount: -1 | 1) => void;
	total: number;
};

const CartContext = createContext<CartType>({
	items: [],
	addItem: () => {},
	updateQuantity: () => {},
	total: 0,
});

const CartProvider = ({ children }: PropsWithChildren) => {
	const [items, setItems] = useState<CartItem[]>([]);

	const addItem = (product: Tables<"products">, size: CartItem["size"]) => {
		const existingItem = items.find(
			(item) => item.product === product && item.size === size
		);

		if (existingItem) {
			updateQuantity(existingItem.id, 1);
			return;
		}

		const newCartItem: CartItem = {
			id: randomUUID(),
			product,
			product_id: product.id,
			size,
			quantity: 1,
		};

		setItems([newCartItem, ...items]);
	};

	const updateQuantity = (itemId: string, ammount: -1 | 1) => {
		const updatedItems = items
			.map((item) =>
				item.id !== itemId
					? item
					: { ...item, quantity: item.quantity + ammount }
			)
			.filter((item) => item.quantity > 0);
		setItems(updatedItems);
	};

	const total = items.reduce(
		(sum, item) => (sum += item.product.price * item.quantity),
		0
	);

	return (
		<CartContext.Provider value={{ items, addItem, updateQuantity, total }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
