import React, { FC, ReactElement, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as posedetection from "@tensorflow-models/pose-detection";
import {
  cameraPreViewHeight,
  cameraPreViewWidth,
  isAndroid,
  minKeyPointSCore,
  outputTensorHeight,
  outputTensorWidth,
} from "../contants";
import { Camera, CameraType } from "expo-camera";
import Svg, { Circle, Line } from "react-native-svg";
import { classNo, keypointConnections } from "../data";
import * as tf from "@tensorflow/tfjs";
import { landMarksToEmbedding } from "../helper";

type PoseSkeletonProps = {
  poses: posedetection.Pose[] | undefined;
  cameraType: CameraType;
};

export const PoseSkeleton: FC<PoseSkeletonProps> = ({
  poses,
  cameraType,
}): ReactElement => {
  const [keypoints, setKeypoints] = useState<ReactElement[] | null>([]);
  const [lines, setLines] = useState<ReactElement[] | null>([]);
  const [tfReady, setTfReady] = useState(false);
  const [poseClassifier, setPoseClassifier] = useState<any>(null);
  const [input, setInput] = useState<any>(null);

  useEffect(() => {
    if (poses != null && poses.length > 0) {
      const keypointElements = poses[0].keypoints
        .filter((k) => (k.score ?? 0) > minKeyPointSCore)
        .map((k) => {
          const flipX = isAndroid || cameraType === Camera.Constants.Type.back;
          const x = flipX ? outputTensorWidth - k.x : k.x;
          const y = k.y;
          const cx = (x / outputTensorWidth) * cameraPreViewWidth;
          const cy = (y / outputTensorHeight) * cameraPreViewHeight;
          return (
            <Circle
              key={`skeletonkp_${k.name}`}
              cx={cx}
              cy={cy}
              r="4"
              strokeWidth="2"
              fill="red"
              stroke="white"
            />
          );
        });

      const lineElements = keypointConnections.map((line, idx) => {
        const from = poses[0].keypoints.find((k) => k.name === line.from);
        const to = poses[0].keypoints.find((k) => k.name === line.to);
        if (
          !from ||
          !to ||
          from.score < minKeyPointSCore ||
          to.score < minKeyPointSCore
        ) {
          return null;
        }
        const flipX = isAndroid || cameraType === Camera.Constants.Type.back;
        const x1 = flipX ? outputTensorWidth - from.x : from.x;
        const y1 = from.y;
        const x2 = flipX ? outputTensorWidth - to.x : to.x;
        const y2 = to.y;
        const cx1 = (x1 / outputTensorWidth) * cameraPreViewWidth;
        const cy1 = (y1 / outputTensorHeight) * cameraPreViewHeight;
        const cx2 = (x2 / outputTensorWidth) * cameraPreViewWidth;
        const cy2 = (y2 / outputTensorHeight) * cameraPreViewHeight;
        return (
          <Line
            key={`skeletonline_${idx}`}
            x1={cx1}
            y1={cy1}
            x2={cx2}
            y2={cy2}
            stroke="white"
            strokeWidth="2"
          />
        );
      });

      setKeypoints(keypointElements);
      setLines(lineElements);
      let input = poses[0].keypoints?.map((keypoint) => {
        return [keypoint.x, keypoint.y];
      });
      setInput(input);
    } else {
      setKeypoints([]);
      setLines([]);
    }
  }, [poses, cameraType]);

  useEffect(() => {
    async function prepare() {
      await tf.ready();
      const poseClassifierModel = await tf.loadLayersModel(
        "https://models.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json"
      );
      setPoseClassifier(poseClassifierModel);
      setTfReady(true);
    }

    prepare();
  }, []);

  if (input) {
    const processedInput = landMarksToEmbedding(input);
    const classification = poseClassifier.predict(processedInput);
    classification.array().then((data: any) => {
      const result = classNo.Tree;
      console.log(data[0], "accracy");
      if (data[0][result] > 0.97) {
        console.log("pose name is", result);
      } else {
        console.log("there some errors");
      }
    });
  }

  return (
    <Svg style={styles.svg}>
      {keypoints}
      {lines}
    </Svg>
  );
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
