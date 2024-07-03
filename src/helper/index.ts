import * as tf from "@tensorflow/tfjs";
import { isAndroid, outputTensorHeight, outputTensorWidth } from "../contants";
import { points } from "../data";

export const getOutputTensorWidth = () => {
  return isAndroid ? outputTensorWidth : outputTensorHeight;
};

export const getOutputTensorHeight = () => {
  return isAndroid ? outputTensorHeight : outputTensorWidth;
};

const getCenterPoints = (
  landmarks: tf.Tensor,
  left_bodypart: number,
  right_bodypart: number
) => {
  const left = tf.gather(landmarks, left_bodypart, 1);
  const right = tf.gather(landmarks, right_bodypart, 1);
  const center = tf.add(tf.mul(left, 0.5), tf.mul(right, 0.5));
  return center;
};

const getPoseSize = (landmarks: tf.Tensor, torso_size_multiplier = 2.5) => {
  const hips_center = getCenterPoints(
    landmarks,
    points.LEFT_HIP,
    points.RIGHT_HIP
  );
  const shoulders_center = getCenterPoints(
    landmarks,
    points.LEFT_SHOULDER,
    points.RIGHT_SHOULDER
  );
  const torso_size = tf.norm(tf.sub(shoulders_center, hips_center));
  let poseCenterNew = getCenterPoints(
    landmarks,
    points.LEFT_HIP,
    points.RIGHT_HIP
  );
  poseCenterNew = tf.expandDims(poseCenterNew, 1);
  poseCenterNew = tf.broadcastTo(poseCenterNew, [1, 17, 2]);

  const d = tf.gather(tf.sub(landmarks, poseCenterNew), 0, 0);
  const max_dist = tf.max(tf.norm(d, "euclidean", 0));

  const pose_size = tf.maximum(
    tf.mul(torso_size, torso_size_multiplier),
    max_dist
  );
  return pose_size;
};

const normalisePoseLandmarks = (landmarks: tf.Tensor) => {
  let pose_center = getCenterPoints(
    landmarks,
    points.LEFT_HIP,
    points.RIGHT_HIP
  );
  pose_center = tf.expandDims(pose_center, 1);
  pose_center = tf.broadcastTo(pose_center, [1, 17, 2]);
  landmarks = tf.sub(landmarks, pose_center);

  const pose_size = getPoseSize(landmarks, 2.5);
  landmarks = tf.div(landmarks, pose_size);
  return landmarks;
};

export const landMarksToEmbedding = (landmarks: any) => {
  const normalizedLandmarks = normalisePoseLandmarks(
    tf.expandDims(landmarks, 0)
  );
  const embedding = tf.reshape(normalizedLandmarks, [1, 34]);
  return embedding;
};
