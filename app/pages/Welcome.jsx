import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function Welcome({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(50)).current;
  const subtitleTranslateY = useRef(new Animated.Value(70)).current;
  const buttonScale = useRef(new Animated.Value(0.8)).current;
  const imageScale = useRef(new Animated.Value(1.2)).current;
  const imageTranslateX = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(imageScale, {
        toValue: 1,
        friction: 8,
        tension: 5,
        useNativeDriver: true,
      }),
      Animated.timing(imageTranslateX, {
        toValue: 0,
        duration: 4000,
        useNativeDriver: true,
      }),

      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.spring(titleTranslateY, {
            toValue: 0,
            friction: 5,
            tension: 40,
            useNativeDriver: true,
          }),
        ]),

        Animated.spring(subtitleTranslateY, {
          toValue: 0,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),

        Animated.spring(buttonScale, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <Animated.View
        style={[
          styles.imageContainer,
          {
            transform: [{ scale: imageScale }, { translateX: imageTranslateX }],
          },
        ]}
      >
        <Image
          source={require("../../assets/images/welcome.jpg")}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.9)", "rgba(0,0,0,0.5)", "transparent"]}
          style={styles.gradient}
        />
      </Animated.View>

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Animated.Text
          style={[
            styles.title,
            {
              transform: [{ translateY: titleTranslateY }],
              opacity: fadeAnim,
            },
          ]}
        >
          Let Get Rid Of Your{"\n"}Skinny Body
        </Animated.Text>

        <Animated.Text
          style={[
            styles.subtitle,
            {
              transform: [{ translateY: subtitleTranslateY }],
              opacity: fadeAnim,
            },
          ]}
        >
          Find your way to the perfect body
        </Animated.Text>

        <Animated.View
          style={[
            {
              width: "100%",
              alignItems: "center",
              transform: [{ scale: buttonScale }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Signin")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.signUpText}>
              Don't have an account?{" "}
              <Text style={styles.signUpLink}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  imageContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 34,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#AAAAAA",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#FFFFFF",
    width: "90%",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
  signUpText: {
    color: "#AAAAAA",
    fontSize: 14,
  },
  signUpLink: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
