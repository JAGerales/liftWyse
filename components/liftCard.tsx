import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import { PanGestureHandler, GestureHandlerRootView, PanGestureHandlerGestureEvent  } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

interface CardProps {
  workoutName: string;
  setNumber: number;
  targetReps: number;
  targetWeight: number;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
  onAddNote: () => void;
}

const Card: React.FC<CardProps> = ({ workoutName, setNumber, targetReps, targetWeight, onSwipeRight, onSwipeLeft, onAddNote }) => {
  const translateX = useSharedValue(0);

  const handleGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    translateX.value = event.nativeEvent.translationX;
  };

  const handleSwipeEnd = () => {
    if (translateX.value > width * 0.1825) {
      runOnJS(onSwipeRight)();
    } else if (translateX.value < -width * 0.1825) {
      runOnJS(onSwipeLeft)();
    }
    translateX.value = withSpring(0);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={handleGestureEvent} onEnded={handleSwipeEnd}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <Text style={styles.heading}>{workoutName}</Text>
          <Text style={styles.subheading}>Set {setNumber || 'N/A'}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Reps: {targetReps || 'N/A'}</Text>
            <Text style={styles.infoText}>Weight: {targetWeight || 'N/A'} lbs</Text>
          </View>
          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={onSwipeLeft} style={styles.iconButton}>
              <Text style={styles.iconText}>❌</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onAddNote} style={styles.noteButton}>
              <Text style={styles.noteText}>Add Note</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSwipeRight} style={styles.iconButton}>
              <Text style={styles.iconText}>✔️</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { // fix for background here ? 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  card: {
    width: width * 0.9,
    height: height * 0.75,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    justifyContent: 'space-between',
    borderWidth: 1,  // Added for layout visualization
    borderColor: 'lightgray',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5, 
  },
  subheading: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  infoText: {
    fontSize: 18,
    color: '#333',
    marginVertical: 5,  // Added space between Reps and Weight
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 10,
  },
  iconButton: {
    padding: 10,
  },
  iconText: {
    fontSize: 30,
  },
  noteButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  noteText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Card;
