//
import React, { useState } from 'react';

function AddExercise() {
    const [setsValue, setSetsValue] = useState(0);
    const [repsValue, setRepsValue] = useState(0);
    const [kgsValue, setKgsValue] = useState(0);
    const [exerciseValue, setExerciseValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [savedExercises, setSavedExercises] = useState([]);
    
    const handleInputChangeSets = (event) => {
        setSetsValue(event.target.value);
        console.log('Sets value:', setsValue);
    };

    const handleInputChangeReps = (event) => {
        setRepsValue(event.target.value);
        console.log('Sets value:', repsValue);
    };

    const handleInputChangeKgs = (event) => {
        setKgsValue(event.target.value);
        console.log('Sets value:', kgsValue);
    };
    
    const handleExerciseChange = (event) => {
        setExerciseValue(event.target.value);
        console.log(exerciseValue);
    };

    const handleNameInput = (event) => {
        setNameValue(event.target.value);
        console.log(nameValue);
    }

    //
    const handleFormSubmit = (event) => {
        event.preventDefault();

        const newExercise = {
            name: nameValue,
            sets: setsValue,
            reps: repsValue,
            kgs: kgsValue,
            exercise: exerciseValue
        };

        setSavedExercises([...savedExercises, newExercise]);

        // Clear the input fields after saving
        setNameValue('');
        setSetsValue(0);
        setRepsValue(0);
        setKgsValue(0);
        setExerciseValue('chest'); // reset exercise value to default
    }
    //
    console.log(savedExercises);

    return (
        <div className="form">
            <form className="exeInfo" onSubmit={handleFormSubmit}>
                <label>
                    <p>Name</p>
                    <input type="text" value={nameValue} onChange={handleNameInput} />
                </label>
                <label>
                    <p>Choose Exercise</p>
                    <select onChange={handleExerciseChange}>
                        <option value="chest">Chest</option>
                        <option value="back">Back</option>
                        <option value="triceps">Triceps</option>
                        <option value="biceps">Biceps</option>
                        <option value="shoulders">Shoulders</option>
                        <option value="legs">Legs</option>
                        <option value="abs">Abs</option>
                        <option value="isolation">Isolation</option>
                    </select>
                </label>
                <div className="int">
                <label>
                    <p>Sets</p>
                    <input className="inDetail" type="number" id="sets" value={setsValue} onChange={handleInputChangeSets} min="0"/>
                </label>
                <label>
                    <p>Reps</p>
                    <input className="inDetail" type="number" id="reps" value={repsValue} onChange={handleInputChangeReps} min="1"/>
                </label>
                <label>
                    <p>kg</p>
                    <input className="inDetail" type="number" id="kg" value={kgsValue} onChange={handleInputChangeKgs} min="1"/>
                </label>
                </div>
                <label>
                    <p>--image--</p>
                    <input type="file" />
                </label>
                <div className="saveExe">
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    );
}

/*export function SavedExe({savedExercises}) {
    return(
        <div className="savedExercises">
                <h2>Saved Exercises:</h2>
                {savedExercises.map((exercise, index) => (
                <div className="body" key={index}>
                    <div className="top">
                        <p>{exercise.name}</p>
                        <span>{exercise.exercise}</span>
                    </div>
                    <div className="bottom">
                        <span>{exercise.sets}</span>
                        <span>{exercise.reps}</span>
                        <span>{exercise.kgs}</span>
                    </div>
                </div>))}       
        </div>
    );
}*/

export default AddExercise;