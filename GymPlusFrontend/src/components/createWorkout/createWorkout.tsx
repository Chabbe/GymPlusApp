import React, { useState, useEffect, ChangeEvent } from 'react';
import ExerciseModel from "../../models/exerciseModel";
import axios from 'axios';

export default function AdminTool() {
    
    const [exercise, setExercise] = useState({});
    const [fetchedExercises, setFetchedExercises] = useState([]);

    useEffect(() => {
        getExercises();
      }, []);

    function postExercise() {
        console.log('Sending: ', exercise);
        axios
        .post('http://localhost:8000/exercise', { exercise })
        .then((res) => {
            console.log('response gotten', res);
        });
    };

    function getExercises() {
        axios.get('http://localhost:8000/exercise').then((res) => {
            setFetchedExercises(res.data);
        });
     }

    // function createSession() {
    //     console.log(exercise);
    // }
    function createNewExercise(event: ChangeEvent<HTMLInputElement>) {
        setExercise({
            ...exercise,
            [event.target.name]:
              event.target.name === 'weights || reps'
                ? parseInt(event.target.value):
                event.target.value,
          });
    };
    

  return(
        <div>
            <div>
                <input 
                type="text" 
                name="name"
                placeholder="Name"
                onChange={createNewExercise}/>
                <input
                type="number"
                name="weights"
                placeholder="weights"
                onChange={createNewExercise}/>
                <input 
                type="number"
                name="reps"
                placeholder="reps"
                onChange={createNewExercise}/>
                <input
                type="text" 
                name="muscles"
                placeholder="muscles"
                onChange={createNewExercise}/>
                <button onClick={postExercise}>POST EXERCISE</button>
            </div>
            
            {fetchedExercises.map((item: ExerciseModel, index: number) => {
                return (
                <li key={index}>{item.name} {item.muscles}</li>
                )        
            })}
            {/* <div>
                <input type="text" placeholder="Name"/>
                <input type="number" placeholder="weights"/>
                <input type="number" placeholder="number"/>
                <input type="text" placeholder="muscles"/>
                <button onClick={createSession}>POST WORKOUT</button>
            </div> */}
        </div>
    );
  };