import React, { ReactElement } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import PlanCard from "../components/PlanCard";
import SectionHeader from "../components/SectionHeader";

export const HomeScreen = (): ReactElement => {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <SafeAreaView style={styles.container}>
      <SectionHeader title="Choose A Plan" />
      <PlanCard level="Easy" />
      <PlanCard level="Normal" />
      <PlanCard level="Hard" />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    paddingHorizontal: 24,
  },
});
