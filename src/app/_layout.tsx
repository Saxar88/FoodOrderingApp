import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "../components/useColorScheme";
import AuthProvider from "../providers/AuthProvider";
import CartProvider from "../providers/CartProvider";
import QueryProvider from "../providers/QueryProvider";
import { StripeProvider } from "@stripe/stripe-react-native";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	});

	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	const colorScheme = useColorScheme();

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<AuthProvider>
				<StripeProvider
					publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""}>
					<QueryProvider>
						<CartProvider>
							<Stack>
								<Stack.Screen name="(admin)" options={{ headerShown: false }} />
								<Stack.Screen name="(user)" options={{ headerShown: false }} />
								<Stack.Screen name="(auth)" options={{ headerShown: false }} />
								<Stack.Screen
									name="cart"
									options={{
										title: "Shopping cart",
										presentation: "modal",
									}}
								/>
							</Stack>
						</CartProvider>
					</QueryProvider>
				</StripeProvider>
			</AuthProvider>
		</ThemeProvider>
	);
}
