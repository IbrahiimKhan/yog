import React, { ReactElement, useState } from "react";
import { StyleSheet, Image } from "react-native";
import * as tf from "@tensorflow/tfjs";
import { Camera, CameraType } from "expo-camera";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  bundleResourceIO,
  cameraWithTensors,
} from "@tensorflow/tfjs-react-native";
import { poseImages } from "../data";
import { ExpoWebGLRenderingContext } from "expo-gl";

export const PoseScreen = ({ route }: { route: any }): ReactElement => {
  const { pose } = route.params;
  const TensorCamera = cameraWithTensors(Camera);
  const [cameraType, setCameraType] = useState<CameraType>(
    Camera.Constants.Type.front
  );

  const handleCameraStream = async (
    images: IterableIterator<tf.Tensor3D>,
    updatePreview: () => void,
    gl: ExpoWebGLRenderingContext
  ) => {
    const loop = async () => {
      const imageTensor = images.next().value as tf.Tensor3D;
      console.log(imageTensor);
    };

    loop();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TensorCamera
        // ref={cameraRef}
        style={styles.camera}
        // autorender={AUTO_RENDER}
        type={cameraType}
        // resizeWidth={getOutputTensorWidth()}
        // resizeHeight={getOutputTensorHeight()}
        resizeDepth={3}
        // rotation={getTextureRotationAngleInDegrees()}
        onReady={handleCameraStream}
      />
    </SafeAreaView>
  );
};

export default PoseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
});
