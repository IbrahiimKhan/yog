import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, View, Text } from "react-native";
import Svg, { Circle, Defs, G, LinearGradient, Stop } from "react-native-svg";

interface CircularProgressBarProps {
  percentage?: number;
  radius?: number;
  strokeWidth?: number;
  duration?: number;
  textColor?: string;
  max?: number;
  gradientColors?: string[];
}

interface valueTypeProps {
  value: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(Text);

const CircularProgressBar: FC<CircularProgressBarProps> = ({
  percentage = 90,
  radius = 40,
  strokeWidth = 10,
  duration = 2000,
  textColor = "gray",
  max = 100,
  gradientColors = ["black", "blue"],
}): ReactElement => {
  const [displayText, setDisplayText] = useState("");

  const circleRef = useRef<Circle>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const halfCircle = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const animation = (toValue: number): void => {
      Animated.timing(animatedValue, {
        toValue,
        duration,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start();
    };

    animation(percentage);

    const listener = (v: valueTypeProps): void => {
      const maxPercentage = (100 * v.value) / max;
      const strokeDashoffset =
        circumference - (circumference * maxPercentage) / 100;
      setDisplayText(`${Math.round(v.value)}%`);

      if (circleRef.current) {
        circleRef.current.setNativeProps({ strokeDashoffset });
      }
    };

    animatedValue.addListener(listener);

    return () => {
      animatedValue.removeListener(listener);
    };
  }, [animatedValue, circumference, duration, max, percentage]);

  const stops = gradientColors.map((color, index) => (
    <Stop
      key={index}
      offset={`${(index * 100) / (gradientColors.length - 1)}%`}
      stopColor={color}
    />
  ));

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            {stops}
          </LinearGradient>
        </Defs>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke="gray"
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeOpacity={0.2}
          />
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            stroke="url(#grad)"
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <Animated.Text style={[styles.text, { color: textColor }]}>
        {displayText ? displayText : 0}
      </Animated.Text>
    </View>
  );
};

export default CircularProgressBar;

const styles = StyleSheet.create({
  text: {
    position: "absolute",
    textAlign: "center",
  },
});
