import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import ExerciseItem from "../components/ExerciseItem";

export default function Exercise() {
  const route = useRoute();
  const { bodyPart } = route.params;
  const navigation = useNavigation();
  const [bodyPartListData, setBodyPartListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(bodyPart);

  // fetch data from API
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const baseUrl = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`;
        const response = await fetch(baseUrl, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "exercisedb.p.rapidapi.com",
            "x-rapidapi-key":
              "478a860e9dmsh0741bd374912284p1489d8jsnbe5ab15d665f",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setBodyPartListData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load exercises");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, [bodyPart]);

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
            <StatusBar barStyle="light-content" backgroundColor="#121212" />

      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)} Exercises
        </Text>
      </View>
      <FlatList
        data={bodyPartListData}
        renderItem={({ item }) => <ExerciseItem item={item} />}
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
});
