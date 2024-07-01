import { Platform } from "react-native";

const isAndroid = Platform.OS === "android";
const isIOS = Platform.OS === "ios";

export const autoRender = false;

// The size of the resized output from TensorCamera.
export const outputTensorWidth = 180;
export const outputTensorHeight = outputTensorWidth / (isIOS ? 9 / 16 : 3 / 4);
