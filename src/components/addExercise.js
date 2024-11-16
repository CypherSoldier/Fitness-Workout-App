import React, { useState } from 'react';
import axios from 'axios';

const defaultImageURL = 'https://static.vecteezy.com/system/resources/previews/015/159/229/non_2x/steel-dumbbell-icon-simple-active-workout-vector.jpg';
//we use handleAddExercise to store our object containing the values in 'newExercise'
//and allowing the handleAddExercise to access the object
function AddExercise({ handleAddExercise }) {
    const [setsValue, setSetsValue] = useState(0);
    const [repsValue, setRepsValue] = useState(0);
    const [kgsValue, setKgsValue] = useState(0);
    const [exerciseValue, setExerciseValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [imageFile, setImageFile] = useState(defaultImageURL);

    const handleInputChangeSets = (event) => {
        setSetsValue(event.target.value);
    };
    //event.target gives you the element that triggered the event
    //event.target.value retrieves the value of that element (an input field)

    //see https://www.w3schools.com/react/react_forms.asp for optimisation

    const handleInputChangeReps = (event) => {
        setRepsValue(event.target.value);
    };

    const handleInputChangeKgs = (event) => {
        setKgsValue(event.target.value);
    };
    
    const handleExerciseChange = (event) => {
        setExerciseValue(event.target.value);
    };

    const handleNameInput = (event) => {
        setNameValue(event.target.value);
    }

    //The above updates the corresponding state variable with the new value from the input field

    //Creates a temporary URL for the uploaded image and stores 
    //it in imageFile using URL.createObjectURL.
    function handleImageInput(event) {
        console.log(event.target.files);
        setImageFile(URL.createObjectURL(event.target.files[0]));
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        //object stores all entered information
        const newExercise = {
            name: nameValue,
            sets: setsValue,
            reps: repsValue,
            kgs: kgsValue,
            exercise: exerciseValue,
            image: imageFile
        };
        console.log(newExercise);

        try {
            // Make POST request to your backend API endpoint
            //const response = await axios.post('http://localhost:5000/submit', newExercise);

            // Handle success response from backend
            //console.log(response.data); // Log response from backend
            handleAddExercise(newExercise); // Call the function passed from Body to add new exercise

            // Store the submitted exercise in local storage if needed

            // Clear the input fields after saving
            setNameValue('');
            setSetsValue(0);
            setRepsValue(0);
            setKgsValue(0);
            setExerciseValue('chest'); // reset exercise value to default
            setImageFile(defaultImageURL);
        } catch (error) {
            // Handle error from backend
            console.error('There was an error submitting the form!', error);
        }
    };
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
                    <p>Upload Image</p>
                    <input type="file" id="img" onChange={handleImageInput}/>
                </label>
                <div className="saveExe">
                    <button className='save' type="submit">Add Workout</button>
                </div>
            </form>
        </div>
    );
}

export default AddExercise;