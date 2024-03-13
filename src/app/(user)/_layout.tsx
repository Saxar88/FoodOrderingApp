import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Tabs } from "expo-router";

import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import { useAuth } from "@/src/providers/AuthProvider";

function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
	const { session } = useAuth();
	const colorScheme = useColorScheme();

	if (!session) return <Redirect href={"/"} />;

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: useClientOnlyValue(false, true),
			}}>
			<Tabs.Screen name="index" options={{ href: null }} />
			<Tabs.Screen
				name="menu"
				options={{
					title: "Menu",
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="cutlery" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="orders"
				options={{
					title: "Orders",
					headerShown: false,
					tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
				}}
			/>
		</Tabs>
	);
}
