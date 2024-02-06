//
import React, { useState } from 'react';

function AddExercise() {
    const [nameValue, setNameValue] = useState('');
    const [setsValue, setSetsValue] = useState(0);
    const [repsValue, setRepsValue] = useState(0);
    const [kgsValue, setKgsValue] = useState(0);
    const [exerciseValue, setExerciseValue] = useState('');
    
    const handleInputChange = (event) => {
        setSetsValue(event.target.value);
        //setRepsValue(event.target.value);
        //setKgsValue(event.target.value);
        console.log('Sets value:', setsValue);
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
    const [savedExercises, setSavedExercises] = useState([]);

    const handleFormSubmit = (event) => {
        event.preventDefault();

        // Save the current exercise to the list
        setSavedExercises([...savedExercises, nameValue]);

        // Clear the input field after saving
        setNameValue('');
    }
    //

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
                    <input className="inDetail" type="number" id="sets" value={setsValue} onChange={handleInputChange} min="0"/>
                </label>
                <label>
                    <p>Reps</p>
                    <input className="inDetail" type="number" id="reps" defaultValue={0} min="1"/>
                </label>
                <label>
                    <p>kg</p>
                    <input className="inDetail" type="number" id="kg" defaultValue={0} min="1"/>
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

export default AddExercise;

/*<div className="savedExercises">
    <h2>Saved Exercises:</h2>
        <ul>
            {savedExercises.map((exercise, index) => (
                <li key={index}>{exercise}</li>
                ))}
        </ul>
</div>*/