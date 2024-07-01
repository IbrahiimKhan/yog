import React, { FC } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

type PlanCardProps = {
  level: "Easy" | "Normal" | "Hard";
};

export const PlanCard: FC<PlanCardProps> = ({ level }) => {
  const getImage = (level: "Easy" | "Normal" | "Hard") => {
    switch (level) {
      case "Easy":
        return require("../../assets/images/level/level1.png");
      case "Normal":
        return require("../../assets/images/level/level2.png");
      case "Hard":
        return require("../../assets/images/level/level3.png");
      default:
        return null;
    }
  };

  return (
    <ImageBackground
      resizeMode="contain"
      source={getImage(level)}
      style={[
        styles.bgImage,
        { alignItems: level === "Normal" ? "flex-end" : "flex-start" },
      ]}
    ></ImageBackground>
  );
};

export default PlanCard;

const styles = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    padding: 10,
  },
});
