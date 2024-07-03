import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Svg, Line, Circle } from "react-native-svg";
import { Camera } from "expo-camera";
import {
  getOutputTensorHeight,
  getOutputTensorWidth,
  landMarksToEmbedding,
} from "../helper";
import {
  cameraPreViewHeight,
  cameraPreViewWidth,
  isAndroid,
  minKeyPointSCore,
} from "../contants";
import { classNo, keypointConnections } from "../data";

interface PoseSkeletonProps {
  poseName: string;
  poses: any;
  poseClassifier: any;
  cameraType: any;
  handleTimer: (value: boolean) => void;
  timerStarted: boolean;
}

const PoseSkeleton: FC<PoseSkeletonProps> = ({
  poseName,
  poses,
  poseClassifier,
  cameraType,
  handleTimer,
  timerStarted,
}) => {
  if (!poses || poses.length === 0) {
    return <View />;
  }
  const [skeletonColor, setSkeletonColor] = useState<string>("red");

  const renderPose = () => {
    let input = poses[0].keypoints?.map((keypoint: any) => {
      return [keypoint.x, keypoint.y];
    });
    const processedInput = landMarksToEmbedding(input);
    const classification = poseClassifier.predict(processedInput);
    classification.array().then((data: any) => {
      const pose = classNo.Warrior;
      if (data[0][pose] > 0.9) {
        console.log(data[0][pose], "accuracy");
        if (!timerStarted) {
          handleTimer(true);
        }
        setSkeletonColor("green");
      } else {
        if (timerStarted) {
          handleTimer(false);
        }
        setSkeletonColor("red");
      }
    });

    const keypoints = poses[0].keypoints
      .filter((k: any) => (k.score ?? 0) > minKeyPointSCore)
      .map((k: any) => {
        const flipX = isAndroid || cameraType === Camera.Constants.Type.back;
        const x = flipX ? getOutputTensorWidth() - k.x : k.x;
        const y = k.y;
        const cx = (x / getOutputTensorWidth()) * cameraPreViewWidth;
        const cy = (y / getOutputTensorHeight()) * cameraPreViewHeight;
        return (
          <Circle
            key={`skeletonkp_${k.name}`}
            cx={cx}
            cy={cy}
            r="4"
            strokeWidth="2"
            fill={skeletonColor}
            stroke="white"
          />
        );
      });

    const lines = keypointConnections.map((line, idx) => {
      const from = poses[0].keypoints.find((k: any) => k.name === line.from);
      const to = poses[0].keypoints.find((k: any) => k.name === line.to);
      if (
        !from ||
        !to ||
        from.score < minKeyPointSCore ||
        to.score < minKeyPointSCore
      ) {
        return null;
      }
      const flipX = isAndroid || cameraType === Camera.Constants.Type.back;
      const x1 = flipX ? getOutputTensorWidth() - from.x : from.x;
      const y1 = from.y;
      const x2 = flipX ? getOutputTensorWidth() - to.x : to.x;
      const y2 = to.y;
      const cx1 = (x1 / getOutputTensorWidth()) * cameraPreViewWidth;
      const cy1 = (y1 / getOutputTensorHeight()) * cameraPreViewHeight;
      const cx2 = (x2 / getOutputTensorWidth()) * cameraPreViewWidth;
      const cy2 = (y2 / getOutputTensorHeight()) * cameraPreViewHeight;
      return (
        <Line
          key={`skeletonline_${idx}`}
          x1={cx1}
          y1={cy1}
          x2={cx2}
          y2={cy2}
          stroke={skeletonColor}
          strokeWidth="2"
        />
      );
    });

    return (
      <Svg style={styles.svg}>
        {keypoints}
        {lines}
      </Svg>
    );
  };

  return renderPose();
};

export default PoseSkeleton;

const styles = StyleSheet.create({
  svg: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 30,
  },
});
