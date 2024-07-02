import { Dimensions, Platform } from "react-native";
import * as posedetection from "@tensorflow-models/pose-detection";

export const isAndroid = Platform.OS === "android";
export const isIOS = Platform.OS === "ios";
export const loadModelFrom = false;
export const autoRender = false;
export const minKeyPointSCore = 0.3;
export const cameraPreViewWidth = Dimensions.get("window").width;
export const cameraPreViewHeight = Dimensions.get("window").height;

// The size of the resized output from TensorCamera.
export const outputTensorWidth = cameraPreViewWidth;
export const outputTensorHeight = cameraPreViewHeight;
export const loadModelFromBundle = false;

//model configuration constant

export const movenetModelConfig: posedetection.MoveNetModelConfig = {
  modelType: posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
  enableSmoothing: true,
};
