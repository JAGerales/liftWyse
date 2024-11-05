import { Text, View, Button, StyleSheet } from 'react-native';
import React, {useState, useEffect} from 'react';
import Swiper from 'react-native-deck-swiper'
import  Card  from '@/components/liftCard'
import { StackNavigationProp } from '@react-navigation/stack';
import { fetchWorkouts } from '@/firebase/fbService';

interface LiftPageProps {
  navigation: StackNavigationProp<any>;
}

interface Workout {
  workoutName: string;
  setNumber: number;
  targetReps: number;
  targetWeight: number;
}

const LiftPage: React.FC<LiftPageProps> = ({navigation}) => {
  // 1) react hook (onEffect?) to call function that queries for cards X
  // 2) insert each card into cardData array in FIFO order
  // 3) display each card for further processing 
  // 3a) TODO: ADD BOOLEAN TO EACH SET (Complete/ Incomplete)
  // 3b) TODO: ADD NOTE WRITING FUNCTIONALITY 
  // 3a and 3b for history db path

  const [allSwiped, setAllSwiped] = useState(false);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  // cardData: [workoutName, setNumber, reps, setWeight]

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
    navigation.navigate('plan');
  }

  useEffect(() => {
    const getData = async () => {
      try{
        const data = await fetchWorkouts(1);
        setWorkouts(data);
      } catch (error) {
        console.error('Error fetching workout data:', error);
      }
    };
  
    getData();
  }, []);

  return ( // GRAB CARD VALS FROM DB (TODO) GRAB STACK SIZE FROM DB (TODO) HANDLE CALL TO ACTION (TODO) HANDLE SYMBOL PRESS TO SWIPE (TODO)
    <View style={styles.container}>
      {workouts.length === 0 || allSwiped ? (
        <View style={styles.finishedContainer}>
          <Text style={styles.finishedText}>No Workouts. Want to add more?</Text>
          <Button title="Add Workout" onPress={handleAddWorkout} />
        </View>
        
      ) : (
        <Swiper
          cards={workouts}
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