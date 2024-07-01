import React, { ReactElement } from "react";
import { StyleSheet, Image } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { poseImages } from "../data";

export const PoseScreen = ({ route }: { route: any }): ReactElement => {
  const { pose } = route.params;
  return <SafeAreaView></SafeAreaView>;
};

export default PoseScreen;

const styles = StyleSheet.create({});
