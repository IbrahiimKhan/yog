import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { HomeScreen } from "../screens/HomeScreen";
import { PoseScreen } from "../screens/PoseScreen";
import { YogaScreen } from "../screens/YogaScreen";

const Stack = createNativeStackNavigator();

export const RootStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ROOT" component={HomeScreen} />
      <Stack.Screen name="YOGA" component={YogaScreen} />
      <Stack.Screen name="POSE" component={PoseScreen} />
    </Stack.Navigator>
  );
};
