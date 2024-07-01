import { useNavigation } from "@react-navigation/native";
import React, { ReactElement } from "react";
import { FlatList, StyleSheet } from "react-native";
import SectionHeader from "../components/SectionHeader";
import YogaCard from "../components/YogaCard";
import { poseInstructions } from "../data";
import { SafeAreaView } from "react-native-safe-area-context";

export const YogaScreen = ({ route }: { route: any }): ReactElement => {
  const navigation = useNavigation();
  const { plan } = route.params;

  const poses = poseInstructions.filter((pose) => pose.difficulty === plan);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        numColumns={2}
        data={poses}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 20,
        }}
        renderItem={({ item }) => <YogaCard title={item.name} />}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

export default YogaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    paddingHorizontal: 24,
  },
});
