import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import * as posedetection from "@tensorflow-models/pose-detection";
import { loadModelFromBundle, movenetModelConfig } from "../src/contants";

if (loadModelFromBundle) {
  const modelJson = require("./model.json");
  const modelWeights1 = require("./group1-shard1of2.bin");
  const modelWeights2 = require("./group1-shard2of2.bin");
  movenetModelConfig.modelUrl = bundleResourceIO(modelJson, [
    modelWeights1,
    modelWeights2,
  ]);
}

export async function loadMoveNetModel() {
  try {
    const movenetModel = await posedetection.createDetector(
      posedetection.SupportedModels.MoveNet,
      movenetModelConfig
    );
    return movenetModel;
  } catch (error) {
    console.error("Error loading MoveNet model:", error);
    throw error;
  }
}
