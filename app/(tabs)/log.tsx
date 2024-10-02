import React, {useState} from "react";
import { View, Button,  StyleSheet, Text, ScrollView, Modal, Pressable, TextInput, TouchableOpacity} from "react-native"
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
  const [repsInput, setRepsInput] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddSet = () => { // should be able to pass user data into this new object 
    const newSet = { 
      setNumber: sets.length + 1, 
      reps: parseInt(repsInput) || 0, 
      setWeight: parseInt(weightInput) || 0
    }; 

    setSets([...sets, newSet]);

    setRepsInput("");
    setWeightInput("");
    setModalVisible(false);
  };

  const handleAddWorkout = () => { // REST API that should send workout info to db
    console.log("Workout Added!");
  };

  return (
    <View style={styles.container}>

      <Text style={styles.header}>Plan Workout</Text>

      {/* Workout Picker */}
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
          <Button title="Add Set" onPress={() => setModalVisible(true)} color="white" />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style = {styles.modalContent}>
            <Text style={styles.modalHeader}>Add Set</Text>


            <TextInput
              style={styles.input}
              placeholder="Enter reps"
              placeholderTextColor="black"
              keyboardType="numeric"
              value={repsInput}
              onChangeText={setRepsInput}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter weight (lbs)"
              placeholderTextColor="black"
              keyboardType="numeric"
              value={weightInput}
              onChangeText={setWeightInput}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddSet}>
                <Text style={styles.buttonTitle}>Confirm Set</Text>

            </TouchableOpacity>
            
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark semi-transparent background
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 5,
    color: "black",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#f44',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4A148C', // Button background color
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 8, // Rounded corners
  },
  buttonTitle: {
    color: 'white', // Text color
    fontSize: 18, // Text size
    fontWeight: 'bold', // Bold text
    textAlign: 'center', // Center the text
  },
});
