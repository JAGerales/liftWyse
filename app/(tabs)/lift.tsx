import { StyleSheet } from 'react-native';
import  Card  from '@/components/liftCard'

export default function HomeScreen() {
  const handleSwipeRight = () => {

  }
  const handleSwipeLeft = () => {
    
  }
  const handleAddNote = () => {
    
  }

  return (
  <Card 
  workoutName="Workout Name" 
  setNumber={4} 
  targetReps={12} 
  targetWeight={135} 
  onSwipeRight={handleSwipeRight} 
  onSwipeLeft={handleSwipeLeft} 
  onAddNote={handleAddNote} 
  />
  
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
