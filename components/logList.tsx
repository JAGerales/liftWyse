// imports
import React, {useState} from "react"
import { StyleSheet, Text, View, TouchableOpacity, Touchable } from "react-native"
import { MaterialIcons } from "@expo/vector-icons";

type LogListProps = {
  setNumber: number;
  reps: number;
  setWeight: number;
};


export default function LogList({ setNumber, reps, setWeight }: LogListProps) {
  const [isChecked, setIsChecked] = useState(false);

  // CREATE HANDLER FOR NOTE CREATION (PASS SET NUMBER)
  
  return (
    <View style={styles.listItem}> 
      {/* Set Details */}
      <Text style={styles.text}>Set {setNumber}:       {reps} Reps    |    {setWeight} LBs</Text> 

      {/* Checkbox */}
      <TouchableOpacity onPress={() => setIsChecked(!isChecked)} style={styles.checkbox}>
        <MaterialIcons
          name={isChecked? 'check-box' : 'check-box-outline-blank'}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log(`Edit Note for ${setNumber}`)} style={styles.editButton}>
        <MaterialIcons name="edit" size={24} color="black"></MaterialIcons>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-between', // Spread out the text, checkbox, and edit button
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#D5B9F5', // Slightly darker purple for the list items
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    flex: 1, // Allows the text to take up the available space
    fontSize: 16,
  },
  checkbox: {
    marginRight: 10, // Space between the checkbox and the edit icon
  },
  editButton: {
    marginLeft: 10, // Space between the text and the edit button
  },
});
  