import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNavigator } from "./BottomTabNavigator";

const Stack = createNativeStackNavigator();

export const RootStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ROOT" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};
