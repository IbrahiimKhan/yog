import { Platform } from "react-native";
import * as posedetection from "@tensorflow-models/pose-detection";

const isAndroid = Platform.OS === "android";
const isIOS = Platform.OS === "ios";
const loadModelFrom = false;
export const autoRender = false;

// The size of the resized output from TensorCamera.
export const outputTensorWidth = 180;
export const outputTensorHeight = outputTensorWidth / (isIOS ? 9 / 16 : 3 / 4);
export const loadModelFromBundle = false;

//model configuration constant

export const movenetModelConfig: posedetection.MoveNetModelConfig = {
  modelType: posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
  enableSmoothing: true,
};
