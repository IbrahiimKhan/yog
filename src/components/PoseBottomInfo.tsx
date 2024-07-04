import React, { FC, ReactElement } from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
  Text,
} from "react-native";
import CircularProgressBar from "./CircularProgressBar";

type PoseBottomInfoProps = {
  img: ImageSourcePropType;
  success: boolean;
  percentage: number;
};
export const PoseBottomInfo: FC<PoseBottomInfoProps> = ({
  img,
  success,
  percentage,
}): ReactElement => {
  return (
    <View style={styles.container}>
      <View>
        <Image resizeMode="contain" source={img} style={styles.pose} />
      </View>
      <View style={styles.progressContainer}>
        <CircularProgressBar radius={50} duration={0} percentage={percentage} />
        <Text>{success ? "Wow! You've done it" : ""}</Text>
      </View>
    </View>
  );
};

export default PoseBottomInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  pose: {
    width: Dimensions.get("window").width / 2,
    height: 200,
  },
  progressContainer: {
    padding: 20,
  },
});
