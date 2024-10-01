import React, {useState} from "react";
import { View, Button,  StyleSheet, Text, ScrollView} from "react-native"
import { Divider } from '@rneui/themed';
import LogList from "../../components/logList"
import ToggleablePicker from "@/components/picker";

type SetType = {
  setNumber: number,
  reps: number,
  setWeight: number;
};

export default function LogPage() {
  const [sets, setSets] = useState<SetType[]>([]);

  const handleAddSet = () => { // should add workout into history
    const newSet = { setNumber: sets.length + 1, reps: 12, setWeight: 135}; // example
    setSets([...sets, newSet]);
  };

  const handleAddWorkout = () => { // REST API that should send workout info to db
    console.log("Workout Added!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Log Workout</Text>
      <ToggleablePicker></ToggleablePicker>
      <Divider width={5}/>
      <View style={styles.scrollContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {sets && sets.length > 0 ? (
          sets.map((set, index) => ( // list of sets
            <LogList key={index} setNumber={set.setNumber} reps={set.reps} setWeight={set.setWeight} />
          ))
        ) : (
          <Text style={styles.containerProp}>No Sets Logged Yet.</Text> // No sets logged
        )}
      </ScrollView>
      </View>
      
      <View style={styles.setButton}>
          <Button title="Add Set" onPress={handleAddSet} color="white" />
      </View>
      <Divider width={5}/>
      <View style={styles.workoutButton}>
        <Button title="Add Workout" onPress={handleAddWorkout} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    paddingHorizontal: 16,
    justifyContent: "flex-start",
    backgroundColor: '#E8DAEF', // Light purple background
    padding: 16,
  },
  containerProp: {
    display: "flex",
    fontSize: 16,
    fontWeight: "light",
    paddingTop: 20,
    textAlign: "center",
    height: 100,
  },
  scrollContainer: {
    flex: 1, // This makes the ScrollView expand and take up available space
    marginBottom: 20, // Add space between ScrollView and Add Set button
  },
  scrollContent: {
    flexGrow: 1, // Ensures content grows without pushing up the header
  },
  header: {
    fontSize: 24, // Large text for the header
    marginTop: -75,
    textAlign: "center",
    fontWeight: 'bold', // Bold font for emphasis
    marginBottom: 20, // Space between header and list
    color: '#4A148C', // Optional color to match your theme
  },
  workoutButton: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: '#4A148C'
  },
  setButton: {
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: '#4A148C',
    marginBottom: 10
  },
});
