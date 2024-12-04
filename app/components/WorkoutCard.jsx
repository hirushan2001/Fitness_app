import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useClickCount } from '../contexts/ClickCountContext';

const WorkoutCard = ({ title, bodyPart, level, equipment, type, duration, image, navigation }) => {
  const { incrementClickCount } = useClickCount(); 
  const handlePress = () => {
    incrementClickCount(); 
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
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
};

const styles = StyleSheet.create({
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
    fontSize: 17,
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

export default WorkoutCard;
