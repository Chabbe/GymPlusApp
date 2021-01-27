import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import ExerciseModel from '../../../models/exerciseModel';
import { workerData } from 'worker_threads';

export interface IMenuProps{
  showMenu: boolean;
}

export default function Footer (props: IMenuProps) {

  const [createWorkoutView, setCreateWorkoutView] = useState(true);
  const [fetchedExercises, setFetchedExercises] = useState([]);
  const [workOutArray, setWorkoutArray] = useState([]);
  const [workOutName, setWorkoutName] = useState("");

  const checkedCSS = {
    color: 'green',
    fontWeight: '700',
  }

  const uncheckedCSS = {
    color: 'red',
  }

  useEffect(() => {
    getExercises();
  }, []);
   
  
  function getExercises() {
    axios.get('http://localhost:8000/exercise').then((res) => {
      setFetchedExercises(res.data);
    });
  }
  
  let stringyArray = JSON.stringify(workOutArray);
  
  function checkExercise(event: ChangeEvent<HTMLInputElement>) {
    if(stringyArray.search(event.target.value) === -1){
      setWorkoutArray(workOutArray => workOutArray.concat(JSON.parse(event.target.value)))
      console.log('workoutArray', workOutArray);
    }
     else {
       return
    }
  }
  
  function toggleCreateWorkoutView() {
      createWorkoutView ? setCreateWorkoutView(false) : setCreateWorkoutView(true)
  }

  function nameOfWorkout(event: ChangeEvent<HTMLInputElement>) {
    setWorkoutName(event.target.value);
    console.log(event.target.value);
  }

  function postAndCreateWorkout() {
    console.log('Postin =', {exercise: workOutArray, nameOfWorkout: workOutName});
    axios.post('http://localhost:8000/workout', {exercise: workOutArray, nameOfWorkout: workOutName})
    .then((res) => {
      console.log('response gotten', res);
    });
    setWorkoutArray([]);
    toggleCreateWorkoutView();
  }

  return(
    <div>
      {!props.showMenu &&
        <div className="menu">
          {createWorkoutView && 
          <div>
            <span>Profile</span>
            <span onClick={toggleCreateWorkoutView}>Create Workout</span>
            <span>About</span>
            <span>Settings</span>
          </div>}
          {!createWorkoutView && 
          <div className="workout-view">
            <span>Create Workout</span>
            <form>
            <label className="create-label">Name of workout<br/>
              <input type="text" onChange={nameOfWorkout}/>
            </label>
            {fetchedExercises.map((item: ExerciseModel) => {
                return (
                <label>{item.name} | {item.muscles.toString().toUpperCase()}
                  <input className="exercise-input" type="checkbox" key={item.name.toString()} value={JSON.stringify(item)} onChange={checkExercise}></input>
                  <i className="far fa-check-circle" style={stringyArray.search(JSON.stringify(item)) === -1 ? uncheckedCSS : checkedCSS}></i>
                </label>
                )        
            })}
            </form>
            <span onClick={postAndCreateWorkout} className="save-workout">Save Workout</span>
          </div>}
        </div>}
    </div>
  );
}