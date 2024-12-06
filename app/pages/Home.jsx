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
  Modal,
} from "react-native";
import WorkoutCard from "../components/WorkoutCard";
import workouts from "../Data/workouts";
import { useClickCount } from "../contexts/ClickCountContext";
import { useRoute } from "@react-navigation/native";

export default function Home({ navigation }) {
  const route = useRoute();
  const {email} = route.params;
  const [bodyPartList, setBodyPartList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { clickCount } = useClickCount();
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

  useEffect(() => {
    const fetchBodyParts = async () => {
      try {
        const response = await fetch(
          "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
          {
            headers: {
              "x-rapidapi-host": "exercisedb.p.rapidapi.com",
              "x-rapidapi-key": "478a860e9dmsh0741bd374912284p1489d8jsnbe5ab15d665f",
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

  console.log(bodyPartList);

  const toggleProfileModal = () => {
    setIsProfileModalVisible(!isProfileModalVisible);
  };

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
      <Text style={styles.Toptext}>{email}</Text>
      <View style={styles.header}>
        <Text style={styles.headerText}>Exercises</Text>
        <TouchableOpacity onPress={toggleProfileModal}>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={isProfileModalVisible}
        onRequestClose={toggleProfileModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Profile Details</Text>
              <TouchableOpacity onPress={toggleProfileModal}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.profileInfo}>
              <Image
                source={require("../../assets/images/img12.jpg")}
                style={styles.profileImage}
              />
              <Text style={styles.profileEmail}>{email}</Text>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{clickCount}</Text>
                  <Text style={styles.statLabel}>Workouts</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{bodyPartList.length}</Text>
                  <Text style={styles.statLabel}>Categories</Text>
                </View>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={() => {
                toggleProfileModal();
                navigation.navigate('Signin');
              }}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
    marginTop: 20,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#121212',
    width: '80%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    color: '#78ff6f',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileInfo: {
    alignItems: 'center',
    width: '100%',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileEmail: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#78ff6f',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#fff',
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: '#78ff6f',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
  },
});