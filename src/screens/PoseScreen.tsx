import React, { ReactElement, useEffect, useRef, useState } from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import * as tf from "@tensorflow/tfjs";
import { Camera, CameraType } from "expo-camera";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  bundleResourceIO,
  cameraWithTensors,
} from "@tensorflow/tfjs-react-native";
import { poseImages } from "../data";
import { ExpoWebGLRenderingContext } from "expo-gl";
import { autoRender, outputTensorHeight, outputTensorWidth } from "../contants";

export const PoseScreen = ({ route }: { route: any }): ReactElement => {
  const { pose } = route.params;
  const TensorCamera = cameraWithTensors(Camera);
  const [tfReady, setTfReady] = useState(false);
  const rafId = useRef<number | null>(null);
  const [cameraType, setCameraType] = useState<CameraType>(
    Camera.Constants.Type.front
  );

  useEffect(() => {
    async function prepare() {
      // Camera permission.
      await Camera.requestCameraPermissionsAsync();

      // Wait for tfjs to initialize the backend.
      await tf.ready();
      setTfReady(true);
    }

    prepare();
  }, []);

  const handleCameraStream = async (
    images: IterableIterator<tf.Tensor3D>,
    updatePreview: () => void,
    gl: ExpoWebGLRenderingContext
  ) => {
    const loop = async () => {
      const imageTensor = images.next().value as tf.Tensor3D;
      tf.dispose([imageTensor]);
      if (rafId.current === 0) {
        return;
      }
      if (!autoRender) {
        updatePreview();
        gl.endFrameEXP();
      }
      rafId.current = requestAnimationFrame(loop);
    };
    loop();
  };

  if (!tfReady) {
    return <Text>loading the camera</Text>;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <TensorCamera
          style={styles.camera}
          autorender={autoRender}
          type={cameraType}
          resizeDepth={3}
          resizeWidth={outputTensorWidth}
          resizeHeight={outputTensorHeight}
          onReady={handleCameraStream}
        />
      </SafeAreaView>
    );
  }
};

export default PoseScreen;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  camera: {
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
});
