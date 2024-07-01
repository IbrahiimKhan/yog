import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackNavigator } from "./navigation/RootStackNavigator";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
