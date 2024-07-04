import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { ReactElement } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import PlanCard, { PlanCardProps } from "../components/PlanCard";
import SectionHeader from "../components/SectionHeader";
import { RootNavigatorParamList } from "../types/navigation";

const levels: PlanCardProps["level"][] = ["Easy", "Normal", "Hard"];

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootNavigatorParamList,
  "YOGA"
>;

export const HomeScreen = (): ReactElement => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const navigateToPlan = (plan: PlanCardProps["level"]) => {
    navigation.navigate("YOGA", { plan });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionHeader title="Choose A Plan" />
      {levels.map((level) => (
        <TouchableOpacity
          key={level}
          onPress={() => navigateToPlan(level)}
          style={styles.planCard}
        >
          <PlanCard level={level} />
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  planCard: {
    marginTop: 16,
  },
});
