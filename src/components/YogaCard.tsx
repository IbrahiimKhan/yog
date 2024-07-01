import React, { FC, ReactElement } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Surface } from "react-native-paper";
import { poseImages } from "../data";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

type YogaCardProps = {
  title: string;
};

export const YogaCard: FC<YogaCardProps> = ({ title }): ReactElement => {
  const navigation = useNavigation();
  console.log(title);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("POSE", { pose: title })}
    >
      <Surface elevation={1} style={styles.surface}>
        <Image
          source={poseImages[title]}
          resizeMode="contain"
          style={{ width: 150, height: 150 }}
        />
        <Text variant="labelLarge">{title}</Text>
      </Surface>
    </TouchableOpacity>
  );
};

export default YogaCard;

const styles = StyleSheet.create({
  surface: {
    padding: 10,
    backgroundColor: "white",
  },
});
