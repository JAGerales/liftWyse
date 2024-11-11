import React, { useState } from 'react';
import { Modal, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type ToggleablePickerProps = {
  selectedWorkout: string;
  onSelectWorkout: (workout: string) => void;
}
export default function ToggleablePicker({ selectedWorkout, onSelectWorkout }: ToggleablePickerProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const workouts = ['Squat', 'Bench', 'Deadlift'];

  const handleValueChange = (itemValue: string) => {
    onSelectWorkout(itemValue);
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      {/* Touchable to open the modal */}
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectedText}>{selectedWorkout || "Squat"}</Text>
      </TouchableOpacity>

      {/* Modal for the picker */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.pickerText}> Select Workout </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedWorkout}
              onValueChange={handleValueChange}
            >
              {workouts.map((workout, index) => (
                <Picker.Item key={index} label={workout} value={workout} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -200,
    marginTop: -135
  },
  pickerButton: {
    width: 200, // Make the button more rectangular
    height: 40, // Control the height to make it less padded
    backgroundColor: '#D5B9F5', // Light purple for the button
    borderRadius: 8, // Small border radius for rounded edges
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
    marginVertical: 10, // Reduce the vertical margin for less space above/below
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: "bold", 
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
  },
  pickerContainer: {
    backgroundColor: '#E8DAEF',
    borderRadius: 10,
    padding: 16,
    width: '80%',
  },
  pickerText: {
    alignItems: 'center',
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: '#D5B9F5', // Light purple for the button
    borderRadius: 8, // Small border radius for rounded edges
    marginVertical: 10, // Reduce the vertical margin for less space above/below
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  }
});
