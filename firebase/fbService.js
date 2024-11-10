// contains reusable functions for adding, querying, updating, and deleting.
import { database, dbFunctions } from "./fbDatabase";

// Add workout inserts set info into the DB
// TODO: Add userId
const addWorkout = async (workoutName, userSet, userId = 1) => {
    // workout: array of sets to be iterated over
    const db = database; 
    const dbRef = dbFunctions.ref(db, `users/${userId}/workouts/`);

    const data = {
        userId,
        workoutName,
        ...userSet
    };

    try{
        const newWorkoutRef = dbFunctions.push(dbRef);
        await dbFunctions.set(newWorkoutRef, data);
        console.log("Workout added!");
    } catch (error){
        console.error("Error adding workout:", error);
    }
};

// Fetch each set info from DB in FIFO order [ TEST ]
const fetchWorkouts = async (userId = 1) => { // userId is passed as arg
    const db = database;
    const dbRef = dbFunctions.ref(db, `users/${userId}/workouts`);
    const workouts = [];
    try{
        const snapshot = await dbFunctions.get(dbRef);

        if (snapshot.exists()){
            snapshot.forEach((childSnapshot) => {
                const workoutData = childSnapshot.val();
                console.log("workout data:", workoutData);
                const workout = {
                    workoutName: workoutData.workoutName || 'Untitled Workout',
                    setNumber: workoutData.setNumber,
                    targetReps: workoutData.targetReps,
                    targetWeight: workoutData.targetWeight,
                    id: childSnapshot.key
                    
                }
                workouts.push(workout);
            });
        }

    } catch (error){
        console.error("Error fetching workouts:", error);
    }

    return workouts;
}

export { addWorkout, fetchWorkouts };

/*
GOALS
1) Get workout name from picker
2) Fetch card info from db
2.5) Test querying
3) Delete workouts from db and insert into history tree
*/