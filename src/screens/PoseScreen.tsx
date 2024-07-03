import * as posedetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { Camera } from "expo-camera";
import { CameraType } from "expo-camera/build/Camera.types";
import { ExpoWebGLRenderingContext } from "expo-gl";
import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { loadMoveNetModel } from "../../model";
import PoseSkeleton from "../components/PoseSkeleton";
import {
  autoRender,
  cameraPreViewHeight,
  cameraPreViewWidth,
} from "../contants";
import { poseImages } from "../data";
import { getOutputTensorHeight, getOutputTensorWidth } from "../helper";
import CircularProgressBar from "../components/CircularProgressBar";

const TensorCamera = cameraWithTensors(Camera);

export const PoseScreen = ({ route }: any) => {
  const { pose } = route.params;
  const cameraRef = useRef(null);
  const rafId = useRef<number | null>(null);
  const [tfReady, setTfReady] = useState(false);
  const [model, setModel] = useState<posedetection.PoseDetector>();
  const [poses, setPoses] = useState<posedetection.Pose[]>();
  const [poseClassifier, setPoseClassifier] = useState<any>(null);
  const [cameraType, setCameraType] = useState<CameraType>(
    Camera.Constants.Type.back
  );
  const [percentage, setPercentage] = useState(0);
  const [success, setSuccess] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [timerStarted, setTimerStarted] = useState(false);

  const startTimer = () => {
    setStartTime(Date.now() - elapsedTime);
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
    if (intervalId) {
      clearInterval(intervalId);
    }
    setElapsedTime(Date.now() - startTime);
  };

  useEffect(() => {
    if (timerRunning) {
      const id = setInterval(() => {
        const currentElapsedTime = Date.now() - startTime;
        const currentPercentage = (currentElapsedTime / (60 * 1000)) * 100;
        setPercentage(currentPercentage > 100 ? 100 : currentPercentage);

        if (currentPercentage >= 100) {
          setSuccess(true);
          clearInterval(id);
        }
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [timerRunning, startTime]);

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

    !success ? loop() : null;
  };

  const handleTimer = (value: boolean) => {
    console.log(value);
    if (value) {
      startTimer();
      setTimerStarted(true);
    }
    if (!value) {
      setTimerStarted(false);
      stopTimer();
    }
  };

  if (!tfReady) {
    return (
      <View style={styles.loadingMsg}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
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
          poseName={pose}
          poses={poses}
          poseClassifier={poseClassifier}
          cameraType={cameraType}
          handleTimer={(value: boolean) => handleTimer(value)}
          timerStarted={timerStarted}
        />

        <CircularProgressBar radius={50} duration={0} percentage={percentage} />
        <Text>{success ? "exercise completed" : ""}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: cameraPreViewWidth,
    height: cameraPreViewHeight,
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
});
