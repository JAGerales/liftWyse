// contains reusable functions for adding, querying, updating, and deleting.
import { database } from "./fbDatabase";
import { getDatabase, ref, set, push } from 'firebase/database'

// Add workout inserts set info into the DB
// TODO: Add userId
const addWorkout = async (workoutName, userSet, userId = 1) => {
    // workout: array of sets to be iterated over
    const db = database;
    const dbRef = ref(db, `users/${userId}/workouts/`);

    const data = {
        userId,
        workoutName,
        ...userSet
    };

    try{
        const newWorkoutRef = push(dbRef);
        await set(newWorkoutRef, data);
        console.log("Workout added!");
    } catch (error){
        console.error("Error adding workout:", error);
    }
};

// Fetch each set info from DB in FIFO order [ TEST ]
const fetchWorkouts = async (userId = 1) => { // userId is passed as arg
    const db = database;
    const dbRef = ref(db, `users/${userId}/workouts`);
    const workouts = [];
    try{
        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const workout = childSnapshot.val();
                workouts.push({
                    id: childSnapshot.key,
                    ...workout,
                });
            });
            console.log("Fetched workouts:", workouts);
        });
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