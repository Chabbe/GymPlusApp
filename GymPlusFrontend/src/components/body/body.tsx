import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import WorkoutModel from '../../models/workoutModel';
import ExerciseModel from '../../models/exerciseModel';

export default function Body() {

    const [fetchedWorkouts, setFetchedWorkouts] = useState([]);
    const [changeSheet, setChangeSheet] = useState(true);
    const [activeWorkout, setActiveWorkout] = useState({
        nameOfWorkout: "", 
        exercise: [
            {_id: 0, 
            name: "Choose a workout to get started.", 
            weight: 0, 
            reps: 0, 
            muscles: ""},
    ]});
    const [showInput, setShowInput] = useState(false);

    useEffect(() => {
        getWorkouts();
      }, []);

      const grayCSS = {
          zIndex: '1',
          backgroundColor: '#6F6F6F',
          color: '#fff',
        };
        
        const orangeCSS = {
            backgroundColor: 'orange',
            color: '#000'
        }
        
        const underLine = {
            textDecoration: 'underline',
        }
        
        const noUnderLine = {
            textDecoration: 'none',
        }
        
        function toggleCSS() {
            changeSheet ? setChangeSheet(false) : setChangeSheet(true)
            getWorkouts();
        }
        
        function getWorkouts() {
            axios.get('http://localhost:8000/workout').then((res) => {
                setFetchedWorkouts(res.data);
                console.log('fetched workouts =', res.data);
            });
        }

        function renderOnActive(workout: any) {
            setActiveWorkout(workout);
            setShowInput(true);
        }  

        function updateReps(data: any, event: ChangeEvent<HTMLInputElement>) {
            console.log('data =', data);
            console.log('event =', event.target.value);
            console.log('POSTING');
            axios.put('http://localhost:8000/workout', {reps: event.target.value, id: data._id});
        }
        function updateWeight(exercise: ExerciseModel, workout: WorkoutModel) {
            console.log('POSTING');
            axios.put('http://localhost:8000/workout', {weight: exercise.weight, id: workout}).then(res => {

            });
        }

        function updateWorkout() {
            axios.put('http://localhost:8000/workout', activeWorkout).then(() =>
                console.log('Posted =', activeWorkout)
            )
        }
        
        return(
            <div className="body">
                <div className="session sheets" style={changeSheet ? grayCSS : orangeCSS}>
                    <span className="sheet-header span-header" onClick={toggleCSS} style={changeSheet ? underLine : noUnderLine}>Active</span>
                    <div className="workout-container">
                        {activeWorkout && <div>
                        <span className="workout-name">{activeWorkout.nameOfWorkout}</span></div>}
                        {activeWorkout.exercise.map((item: any, i) => {
                            return (
                                <div>
                                    <div>
                                        <span className="workout-item first">{item.name}</span>
                                    </div>
                                    <div className="second">
                                        <span>{item.muscles}</span>
                                    </div>
                                    {showInput && <React.Fragment> <div className="third">
                                        <label className="workout-label">Weight
                                            <input type="number" value={item.weight} key={i} name="weight" onChange={(e) => {
                                                let newExercises = [...activeWorkout.exercise]
                                                newExercises.splice(i, 1, {...item, weight: e.target.value})
                                                setActiveWorkout(() => ({...activeWorkout, exercise: newExercises}))}} onBlur={updateWorkout}></input>
                                        </label>
                                    </div>
                                    <div className="fourth">
                                        <label className="workout-label">Reps
                                            <input type="number" value={item.reps} key={i} name="reps" onBlur={updateWorkout}
                                                onChange={(e) => {
                                                let newExercises = [...activeWorkout.exercise]
                                                newExercises.splice(i, 1, {...item, reps: e.target.value})
                                                setActiveWorkout(() => ({...activeWorkout, exercise: newExercises}))}}
                                            ></input>
                                        </label>
                                    </div></React.Fragment>}
                                </div>
                            )        
                        })}
                        </div>
                </div>
                <div className="saved-sessions sheets" style={changeSheet ? orangeCSS : grayCSS}>
                    <span  className="sheet-header span-header" onClick={toggleCSS} style={changeSheet ? noUnderLine : underLine}>Saved</span>
                    {fetchedWorkouts.map((item: WorkoutModel, i) => {
                        return (
                            <span className="workout-span" key={i} onClick={() => renderOnActive(item)}>{item.nameOfWorkout}</span>
                    )        
                    })}
                </div>
            </div>
    );
}