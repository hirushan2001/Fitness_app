import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React,{useEffect} from 'react';
import { useState } from 'react';

const WorkoutCard = ({ title, bodyPart,level, equipment, type, duration, image,navigation }) => (
  <TouchableOpacity style={styles.cardContainer}>
    <View style={styles.cardContent}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.workoutImage} resizeMode="cover" />
      </View>
      <View style={styles.cardTextContainer}>
        <Text style={styles.levelText}>{level}</Text>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.equipmentText}>{equipment}</Text>
        <Text style={styles.typeText}>{type}</Text>
        {duration && <Text style={styles.durationText}>Total time: {duration}</Text>}
      </View>
      <TouchableOpacity
       style={styles.tryButton}
       onPress={() => navigation.navigate('Exercise', { bodyPart })}>
  <Text style={styles.tryButtonText}>TRY</Text>
</TouchableOpacity>

    </View>
  </TouchableOpacity>
);

export default function Home({navigation}) {

  const  [bodyPartList,setbodyPartList] = useState([]);
  useEffect(() => {
    const fetchBodyParts = async () => {
      try {
        const response = await fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', {
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
        setbodyPartList(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBodyParts();
  }, []);


 
  console.log(bodyPartList);

  const workouts = [
    {
      title: 'Strong and Big Chest',
      bodyPart: 'back',
      level: 'Advanced Level',
      equipment: 'Full Equipment',
      type: 'Strength',
      duration: '45 minutes',
      image: require('../../assets/images/img1.jpg'), // Add your image path
    },
    {
      title: 'Back Workout',
      bodyPart: 'cardio',
      level: 'Beginner Level',
      equipment: 'Full Equipment',
      type: 'Strength',
      duration: '55 minutes',
      image: require('../../assets/images/img2.jpg'), // Add your image path
    },
    {
      title: 'The Total Attack',
      bodyPart: 'chest',
      level: 'Advanced Level',
      equipment: 'Basic Equipment',
      type: 'Endurance',
      duration: '55 minutes',
      image: require('../../assets/images/img3.jpg'), // Add your image path
    },
    {
      title: 'The Total Attack',
      bodyPart: 'lower arms',
      level: 'Advanced Level',
      equipment: 'Basic Equipment',
      type: 'Endurance',
      duration: '55 minutes',
      image: require('../../assets/images/img4.jpg'), // Add your image path
    },
    {
      title: 'The Total Attack',
      bodyPart: 'neck',
      level: 'Advanced Level',
      equipment: 'Basic Equipment',
      type: 'Endurance',
      duration: '55 minutes',
      image: require('../../assets/images/img5.jpg'), // Add your image path
    },
    {
      title: 'The Total Attack',
      bodyPart: 'shoulders',
      level: 'Advanced Level',
      equipment: 'Basic Equipment',
      type: 'Endurance',
      duration: '55 minutes',
      image: require('../../assets/images/img6.jpg'), // Add your image path
    },
    {
      title: 'The Total Attack',
      bodyPart: 'upper arms',
      level: 'Advanced Level',
      equipment: 'Basic Equipment',
      type: 'Endurance',
      duration: '55 minutes',
      image: require('../../assets/images/img7.jpg'), // Add your image path
    },
    {
      title: 'The Total Attack',
      bodyPart: 'upper legs',
      level: 'Advanced Level',
      equipment: 'Basic Equipment',
      type: 'Endurance',
      duration: '55 minutes',
      image: require('../../assets/images/img8.jpg'), // Add your image path
    },
    {
      title: 'The Total Attack',
      level: 'Advanced Level',
      bodyPart: 'lower legs',
      equipment: 'Basic Equipment',
      type: 'Endurance',
      duration: '55 minutes',
      image: require('../../assets/images/img9.jpg'), // Add your image path
    },
    {
      title: 'The Total Attack',
      bodyPart: 'waist',
      level: 'Advanced Level',
      equipment: 'Basic Equipment',
      type: 'Endurance',
      duration: '55 minutes',
      image: require('../../assets/images/img10.jpg'), // Add your image path
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.Toptext}>TRAIN LIKE PROFESSIONAL</Text>
      <View style={styles.header}>
        <Text style={styles.headerText}>Exercises</Text>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/img12.jpg')}
            style={styles.headerImage}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cardlist}>
          {workouts.map((workout, index) => (
            <WorkoutCard key={index} {...workout} navigation={navigation}/>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 16,
  },
  Toptext: {
    color: '#78ff6f',
    marginLeft: 10,
    fontSize: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 34,
    fontWeight: 'bold',
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
  cardContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 90,
    height: 110,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  workoutImage: {
    width: '100%',
    height: '100%',
  },
  cardTextContainer: {
    flex: 1,
  },
  levelText: {
    color: '#4eff42',
    fontSize: 12,
    marginBottom: 4,
  },
  titleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  equipmentText: {
    color: '#808080',
    fontSize: 12,
    marginBottom: 4,
  },
  typeText: {
    color: '#808080',
    fontSize: 12,
  },
  durationText: {
    color: '#808080',
    fontSize: 12,
    marginTop: 4,
  },
  tryButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
  tryButtonText: {
    color: 'white',
    fontSize: 12,
  },
});