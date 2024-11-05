import { Text, View, Button, StyleSheet } from 'react-native';
import React, {useState} from 'react';
import Swiper from 'react-native-deck-swiper'
import  Card  from '@/components/liftCard'

const LiftPage: React.FC<[]> = () => {
  const [allSwiped, setAllSwiped] = useState(false);
  const cardData = [
    { workoutName: 'Bench Press', setNumber: 1, targetReps: 8, targetWeight: 185 },
    { workoutName: 'Bench Press', setNumber: 2, targetReps: 8, targetWeight: 185 },
    { workoutName: 'Bench Press', setNumber: 3, targetReps: 6, targetWeight: 185 },
  ];
 
  const handleSwipeRight = () => {
    console.log("right");
  }
  const handleSwipeLeft = () => {
    console.log("left");
  }
  const handleAddNote = () => {
    console.log("note");
  }

  const handleAddWorkout = () => {
    setAllSwiped(false);
    // button to navigate to plan 
  }

  return ( // GRAB CARD VALS FROM DB (TODO) GRAB STACK SIZE FROM DB (TODO) HANDLE CALL TO ACTION (TODO) HANDLE SYMBOL PRESS TO SWIPE (TODO)
    <View style={styles.container}>
      {cardData.length === 0 || allSwiped ? (
        <View style={styles.finishedContainer}>
          <Text style={styles.finishedText}>No Workouts. Want to add more?</Text>
          <Button title="Add Workout" onPress={handleAddWorkout} />
        </View>
        
      ) : (
        <Swiper
          cards={cardData}
          renderCard={(card) => {
            return (
              <Card
                workoutName={card.workoutName}
                setNumber={card.setNumber}
                targetReps={card.targetReps}
                targetWeight={card.targetWeight}
                onSwipeLeft={() => handleSwipeLeft()}
                onSwipeRight={() => handleSwipeRight()}
                onAddNote={handleAddNote}
                />
            );
          }}
          onSwipedAll={() => setAllSwiped(true)}
          cardIndex={0}
          stackSize={3}
          backgroundColor='transparent'
          verticalSwipe={false}
          horizontalSwipe={true}
          />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8DAEF',
  },
  finishedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishedText: {
    fontSize: 24,
    color: '#ff0000', // Red color for the message
    textAlign: 'center',
  },
});

export default LiftPage;