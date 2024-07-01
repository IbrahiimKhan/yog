import { useNavigation } from "@react-navigation/native";
import React, { ReactElement } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import PlanCard from "../components/PlanCard";
import SectionHeader from "../components/SectionHeader";

const levels = ["Easy", "Normal", "Hard"];

export const HomeScreen = (): ReactElement => {
  const navigation = useNavigation();

  const navigateToPlan = (plan: string) => {
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
