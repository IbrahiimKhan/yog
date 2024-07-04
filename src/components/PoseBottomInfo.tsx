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
};
export const PoseBottomInfo: FC<PoseBottomInfoProps> = ({
  img,
  success,
}): ReactElement => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View>
          <Image resizeMode="contain" source={img} style={styles.pose} />
        </View>
        <View>
          <CircularProgressBar radius={50} duration={0} percentage={0} />
          <Text>{success ? "Wow! You've done it" : ""}</Text>
        </View>
      </View>
    </>
  );
};

export default PoseBottomInfo;

const styles = StyleSheet.create({
  pose: {
    width: Dimensions.get("window").width / 2,
    height: 200,
  },
});
