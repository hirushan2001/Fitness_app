// Home.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import WorkoutCard from "../components/WorkoutCard";
import workouts from "../Data/workouts";
import { useClickCount } from "../contexts/ClickCountContext";

export default function Home({ navigation }) {
  const [bodyPartList, setBodyPartList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { clickCount, incrementClickCount } = useClickCount();

  useEffect(() => {
    const fetchBodyParts = async () => {
      try {
        const response = await fetch(
          "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "exercisedb.p.rapidapi.com",
              "x-rapidapi-key":
                "df6d8b0ccbmsha56850229e8f6adp1c317cjsn66611239aeee",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setBodyPartList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBodyParts();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#78ff6f" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.Toptext}>TRAIN LIKE PROFESSIONAL</Text>
      <View style={styles.header}>
        <Text style={styles.headerText}>Exercises</Text>
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/img12.jpg")}
            style={styles.headerImage}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cardlist}>
          {workouts.map((workout, index) => (
            <WorkoutCard key={index} {...workout} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.floatingButton}>
        <Text style={styles.buttonText}>{clickCount}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 16,
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
  Toptext: {
    color: "#78ff6f",
    marginLeft: 10,
    fontSize: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
    marginLeft: 10,
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cardlist: {
    marginTop: 30,
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#78ff6f",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#121212",
    fontSize: 18,
    fontWeight: "bold",
  },
});
