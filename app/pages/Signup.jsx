import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const insets = useSafeAreaInsets();

  const handleSignup = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    console.log("Email:", email);
    console.log("Password:", password);
    Alert.alert("Success", "Account created successfully!");
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/img2.jpg")}
              style={styles.image}
              resizeMode="cover"
            />
            <LinearGradient
              colors={["rgba(0,0,0,0.9)", "rgba(0,0,0,0.5)", "transparent"]}
              style={styles.gradient}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#AAA"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#AAA"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#AAA"
              secureTextEntry
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
              <Text style={styles.signinText}>
                Already have an account?{" "}
                <Text style={styles.signinLink}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    color: "#FFF",
    fontSize: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  signinText: {
    color: "#AAA",
    fontSize: 14,
  },
  signinLink: {
    color: "#FFF",
    fontWeight: "600",
  },
});
