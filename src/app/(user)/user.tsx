import React from "react";
import { Button, View } from "react-native";

import { supabase } from "@/src/lib/supabase";

const UserScreen = () => {
	return (
		<View>
			<Button
				onPress={async () => await supabase.auth.signOut()}
				title="Sign out"
			/>
		</View>
	);
};

export default UserScreen;
