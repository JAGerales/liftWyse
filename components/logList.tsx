// imports
import React, {useEffect, useState} from "react"
import { StyleSheet, Text, View, TouchableOpacity, Touchable } from "react-native"
import { MaterialIcons } from "@expo/vector-icons";

type LogListProps = {
  setNumber: number;
  reps: number;
  setWeight: number;
};


export default function LogList({ setNumber, reps, setWeight }: LogListProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [adjustedReps, setAdjustedReps] = useState(reps);
  const [adjustedWeight, setAdjustedWeight] = useState(setWeight);

  // CREATE HANDLER FOR NOTE CREATION (PASS SET NUMBER)
  
  const checkValues = () => {
    // If number && greater than 999, set to 1000 | display value less than 999 or 0
    const finalReps = !isNaN(reps) && reps > 999 ? 1000 : reps || 0;
    const finalWeight = !isNaN(setWeight) && setWeight > 999 ? 1000 : setWeight || 0;

    setAdjustedReps(finalReps);
    setAdjustedWeight(finalWeight);
  };

  useEffect(() => {
    checkValues();
  }, [reps, setWeight]);

  return (
    <View style={styles.listItem}> 
      
      {/* Abomination */}
      <Text style={styles.text}>
        Set {setNumber} : &nbsp;  
        {adjustedReps === 1000 && adjustedWeight === 1000 
          ? `${adjustedReps}+ Reps | ${adjustedWeight}+ LBs`
          : adjustedReps === 1000 
            ? `${adjustedReps}+ Reps | ${adjustedWeight} LBs`
            : adjustedWeight === 1000 
              ? `${adjustedReps} Reps | ${adjustedWeight}+ LBs`
              : `${adjustedReps} Reps | ${adjustedWeight} LBs`
          }
      </Text>

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
  