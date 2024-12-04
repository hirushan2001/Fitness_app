import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import {Image} from 'expo-image';


export default function Exercise() {
  const route = useRoute();
  const { bodyPart } = route.params; 
  const navigation = useNavigation();
  const [bodyPartListData, setBodyPartListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const baseUrl = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`;
        const response = await fetch(baseUrl, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
            'x-rapidapi-key': 'df6d8b0ccbmsha56850229e8f6adp1c317cjsn66611239aeee',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setBodyPartListData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load exercises');
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, [bodyPart]);
  const renderExerciseItem = ({ item }) => (

<TouchableOpacity style={styles.exerciseCard}>
  <View style={styles.exerciseDetails}>
    {/* Exercise Name */}
    <Text style={styles.exerciseName}>{item.name}</Text>
    <Image source={{uri: item.gifUrl}} style={styles.exerciseImage} />
    {/* Equipment */}
    <View style={styles.infoRow}>
      <Text style={styles.label}>Equipment:</Text>
      <Text style={styles.value}>{item.equipment}</Text>
    </View>

    {/* Target */}
    <View style={styles.infoRow}>
      <Text style={styles.label}>Target:</Text>
      <Text style={styles.value}>{item.target}</Text>
    </View>

    {/* Secondary Muscles */}
    <View style={styles.infoRow}>
      <Text style={styles.label}>Secondary Muscles:</Text>
      <Text style={styles.value}>{item.secondaryMuscles.join(", ")}</Text>
    </View>

    {/* Instructions */}
    <Text style={styles.label}>Instructions:</Text>
    {Array.isArray(item.instructions) && item.instructions.length > 0 ? (
      item.instructions.map((instruction, index) => (
        <Text key={index} style={styles.instructionItem}>
          {"\u2022 "}{instruction.trim()}
        </Text>
      ))
    ) : (
      <Text style={styles.noInstructions}>No instructions available</Text>
    )}
  </View>
</TouchableOpacity>

  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Loading exercises...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)} Exercises</Text>
      </View>
      <FlatList
        data={bodyPartListData}
        renderItem={renderExerciseItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#78ff6f", 
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 20,
  },
  errorText: {
    color: "#e74c3c", 
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  headerContainer: {
    backgroundColor: "#00111",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  backButton: {
    padding: 11,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 10,
  },
  listContainer: {
    padding: 15,
  },
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
  exerciseImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 18,
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
