import { Alert } from "react-native";
import {
	initPaymentSheet,
	presentPaymentSheet,
} from "@stripe/stripe-react-native";

import { supabase } from "./supabase";

const fetchPaymentSheetParams = async (amount: number) => {
	const { data, error } = await supabase.functions.invoke("payment-sheet", {
		body: { amount },
	});

	if (data) return data;

	Alert.alert("Error fetching payment sheet params!", error.message);

	return {};
};

export const initialisePaymentSheet = async (amount: number) => {
	const { paymentIntent, publishableKey, customer, ephemeralKey } =
		await fetchPaymentSheetParams(amount);

	if (!paymentIntent || !publishableKey) return;

	await initPaymentSheet({
		merchantDisplayName: "Food Ordering",
		paymentIntentClientSecret: paymentIntent,
		customerId: customer,
		customerEphemeralKeySecret: ephemeralKey,
		defaultBillingDetails: { name: "Julius Caesar" },
	});
};

export const openPaymentSheet = async () => {
	const { error } = await presentPaymentSheet();

	if (error) {
		Alert.alert("Error opening payment sheet!", error.message);

		return false;
	}

	return true;
};
