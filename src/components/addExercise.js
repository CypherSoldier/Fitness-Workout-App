import React, { useState } from 'react';

const defaultImageURL = 'https://static.vecteezy.com/system/resources/previews/015/159/229/non_2x/steel-dumbbell-icon-simple-active-workout-vector.jpg';
//we use handleAddExercise to store our object containing the values in 'newExercise'
//and allowing the handleAddExercise to access the object
function AddExercise({ handleAddExercise, initialValues }) {
    const [setsValue, setSetsValue] = useState(initialValues?.sets || 0);
    const [repsValue, setRepsValue] = useState(initialValues?.reps || 0);
    const [kgsValue, setKgsValue] = useState(initialValues?.kgs || 0);
    const [exerciseValue, setExerciseValue] = useState(initialValues?.exercise || '');
    const [nameValue, setNameValue] = useState(initialValues?.name || '');
    const [imageFile, setImageFile] = useState(initialValues?.image || defaultImageURL);

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
    // CREATE
    function handleImageInput(event) {
        console.log(event.target.files);
        setImageFile(URL.createObjectURL(event.target.files[0]));
    }

    const handleFormSubmit = async (event) => {
    event.preventDefault();

    const newExercise = {
        name: nameValue,
        sets: Number(setsValue),
        reps: Number(repsValue),
        kgs: Number(kgsValue),
        exercise: exerciseValue,
        image: imageFile
    };

    try {
        // 🧠 This actually sends the data to your Express backend
        /*
        await fetch('http://localhost:5000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newExercise),
        });
        // const response = await axios.post('http://localhost:5000/submit', newExercise);
        */
        // Locally store it and update dashboard
        handleAddExercise(newExercise);

        // Clear form
        setNameValue('');
        setSetsValue(0);
        setRepsValue(0);
        setKgsValue(0);
        setExerciseValue('chest');
        setImageFile(defaultImageURL);
    } catch (error) {
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
                    <button className='save' type="submit">Save Workout</button>
                </div>
            </form>
        </div>
    );
}

export default AddExercise;
