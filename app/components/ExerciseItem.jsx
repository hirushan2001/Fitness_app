import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";

const ExerciseItem = ({ item, onPress }) => {
  const [loading, setLoading] = useState(true);

  return (
    <TouchableOpacity style={styles.exerciseCard} onPress={onPress}>
      <View style={styles.exerciseDetails}>
        <Text style={styles.exerciseName}>{item.name.toUpperCase()}</Text>

        <View style={styles.imageContainer}>
          {loading && (
            <ActivityIndicator
              size="large"
              color="#78ff6f"
              style={styles.loadingIndicator}
            />
          )}
          <Image
            source={{ uri: item.gifUrl }}
            style={styles.exerciseImage}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Equipment:</Text>
          <Text style={styles.value}>{item.equipment}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Target:</Text>
          <Text style={styles.value}>{item.target}</Text>
        </View>

        {item.secondaryMuscles?.length > 0 && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Secondary Muscles:</Text>
            <Text style={styles.value}>{item.secondaryMuscles.join(", ")}</Text>
          </View>
        )}

        <Text style={styles.label}>Instructions:</Text>
        {Array.isArray(item.instructions) && item.instructions.length > 0 ? (
          item.instructions.map((instruction, index) => (
            <Text key={index} style={styles.instructionItem}>
              {"\u2022 "}
              {instruction.trim()}
            </Text>
          ))
        ) : (
          <Text style={styles.noInstructions}>No instructions available</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  exerciseCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  exerciseDetails: {
    flexDirection: "column",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  exerciseImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    position: "absolute",
  },
  loadingIndicator: {
    position: "absolute",
    alignSelf: "center",
    top: "50%",
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#78ff6f",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    color: "#FFFFFF",
    marginRight: 5,
    fontWeight: "bold",
  },
  value: {
    fontWeight: "400",
    color: "#C0C0C0",
  },
  instructionItem: {
    marginLeft: 15,
    marginVertical: 2,
    color: "#C0C0C0",
  },
  noInstructions: {
    color: "#707070",
    fontStyle: "italic",
    marginLeft: 15,
  },
});

export default ExerciseItem;
