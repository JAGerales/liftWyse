import { Text, View, Button, StyleSheet } from 'react-native';
import React, {useEffect, useState} from 'react';
import Swiper from 'react-native-deck-swiper'
import  Card  from '@/components/liftCard'
import { fetchWorkouts } from '@/firebase/fbService';
import { usePathname } from 'expo-router';

interface Workout {
  workoutName: string;
  setNumber: number;
  targetReps: number;
  targetWeight: number;
  id?: string;
}

const LiftPage: React.FC<[]> = () => {
  const [allSwiped, setAllSwiped] = useState(false);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

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

  const getData = async () => {
    try {
      if (workouts.length > 0){
        return;
      }
      setLoading(true);
      const data = await fetchWorkouts(1); // should pass in unique userId
      setWorkouts(data);
    } catch (error){
      console.log('Error fetching workout data:', error);
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pathname === '/lift') {
      getData();
    }
  }, [pathname]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading workouts...</Text>
      </View>
    );
  }

  console.log('Current workouts state:', workouts);

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
          renderCard={(card: Workout) => {
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