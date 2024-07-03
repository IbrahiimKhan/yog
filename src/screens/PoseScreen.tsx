import * as posedetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { Camera } from "expo-camera";
import { CameraType } from "expo-camera/build/Camera.types";
import { ExpoWebGLRenderingContext } from "expo-gl";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";
import { loadMoveNetModel } from "../../model";
import {
  autoRender,
  cameraPreViewHeight,
  cameraPreViewWidth,
  isAndroid,
  minKeyPointSCore,
  outputTensorHeight,
  outputTensorWidth,
} from "../contants";
import { classNo, keypointConnections } from "../data";
import {
  getOutputTensorHeight,
  getOutputTensorWidth,
  landMarksToEmbedding,
} from "../helper";
import PoseSkeleton from "../components/PoseSkeleton";

const TensorCamera = cameraWithTensors(Camera);

export const PoseScreen = () => {
  const cameraRef = useRef(null);
  const rafId = useRef<number | null>(null);
  const [tfReady, setTfReady] = useState(false);
  const [model, setModel] = useState<posedetection.PoseDetector>();
  const [poses, setPoses] = useState<posedetection.Pose[]>();
  const [poseClassifier, setPoseClassifier] = useState<any>(null);
  const [cameraType, setCameraType] = useState<CameraType>(
    Camera.Constants.Type.back
  );

  useEffect(() => {
    async function prepare() {
      rafId.current = null;

      await Camera.requestCameraPermissionsAsync();
      await tf.ready();
      const poseClassifierModel = await tf.loadLayersModel(
        "https://models.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json"
      );

      setPoseClassifier(poseClassifierModel);

      const model = await loadMoveNetModel();
      setModel(model);

      setTfReady(true);
    }

    prepare();
  }, []);

  useEffect(() => {
    return () => {
      if (rafId.current != null && rafId.current !== 0) {
        cancelAnimationFrame(rafId.current);
        rafId.current = 0;
      }
    };
  }, []);

  const handleCameraStream = async (
    images: IterableIterator<tf.Tensor3D>,
    updatePreview: () => void,
    gl: ExpoWebGLRenderingContext
  ) => {
    const loop = async () => {
      const imageTensor = images.next().value as tf.Tensor3D;
      const poses = await model!.estimatePoses(
        imageTensor,
        undefined,
        Date.now()
      );
      setPoses(poses);
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
    return (
      <View style={styles.loadingMsg}>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.containerPortrait}>
        <TensorCamera
          ref={cameraRef}
          style={styles.camera}
          autorender={autoRender}
          type={cameraType}
          resizeWidth={getOutputTensorWidth()}
          resizeHeight={getOutputTensorHeight()}
          resizeDepth={3}
          onReady={handleCameraStream}
        />
        <PoseSkeleton
          poses={poses}
          poseClassifier={poseClassifier}
          cameraType={cameraType}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  containerPortrait: {
    position: "relative",
    width: cameraPreViewWidth,
    height: cameraPreViewHeight,
    // marginTop: Dimensions.get("window").height / 2 - CAM_PREVIEW_HEIGHT / 2,
  },

  loadingMsg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  svg: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 30,
  },
  fpsContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 80,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, .7)",
    borderRadius: 2,
    padding: 8,
    zIndex: 20,
  },
  cameraTypeSwitcher: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 180,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, .7)",
    borderRadius: 2,
    padding: 8,
    zIndex: 20,
  },
});
