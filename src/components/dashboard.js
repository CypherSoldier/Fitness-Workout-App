import NavBar from './navbar.js';
import DropDown from './dropdown.js';
import AddExercise from './addExercise.js';
import SavedExe from './exeTest.js';
import React, { useState, useEffect} from 'react';
import axios from 'axios';

//main header
function Body() {
  //
  const [showForm, setShowForm] = useState(false); // show form is set to false ---> line 54: 'if(showForm)' is true then...
  const [savedExercises, setSavedExercises] = useState([]); //The initial value for savedExercises is set to an empty array []

  useEffect(() => { //*******************
    // Retrieve saved exercises from local storage on component mount
    const exercisesFromStorage = JSON.parse(localStorage.getItem('savedExercises')) || [];
    setSavedExercises(exercisesFromStorage);
  }, []);

  //This function gets called from the AddExercise[0] component when a user submits a new exercise.
  const handleAddExercise = (newExercise) => {
    setSavedExercises([...savedExercises, newExercise]); //newExercise object is added to the empty array savedExercices
    setShowForm(false); // Hide the form after adding exercise
  };//

  const handleDeleteExercise = (index) => { //**************
    const updatedExercises = [...savedExercises];
    updatedExercises.splice(index, 1);
    setSavedExercises(updatedExercises);
    localStorage.setItem('savedExercises', JSON.stringify(updatedExercises));
  };
  //console.log(handleAddExercise);

  return (
    <div className='fitness'>
      <header id="colorChange" className='fitness-header'>
      <DropDown />
      <img className="icon" src="https://www.svgrepo.com/show/475044/dumbbell.svg" alt='logo'></img>
      <NavBar />
      </header>
      <Main showForm={showForm} //
      setShowForm={setShowForm} 
      handleAddExercise={handleAddExercise} 
      savedExercises={savedExercises} 
      onDeleteExercise={handleDeleteExercise}
      setSavedExercises={setSavedExercises}/>
    </div>
  );
}

//ternary conditional operator: if(showForm == true) then render <AddExercise/> else render <SavedExe/>
//The !showForm part flips the value of showForm (e.g., if it was true, it becomes false and vice versa).
//The button text changes dynamically based on showForm --> line 59
function Main({ showForm, handleAddExercise, setShowForm, savedExercises, onDeleteExercise}) {
  return (
    <div className="main-board">
      <div className="days">
        {showForm ? (<AddExercise handleAddExercise={handleAddExercise} />) : (<SavedExe savedExercises={savedExercises} onDeleteExercise={onDeleteExercise}/>)}
        <button className="addExe" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Back to Dashboard' : 'Show Form'}
        </button>
      </div>
    </div>
  );
}
//FIGURE OUT HOW THE ADDING OF EXERCISE COMPONENT WORKS**********
//ALSO ASK AI TO EXPLAIN HOW THE PROPS WORK FOR MORE CLARIFICATION***********
export default Body;

/*
<div>
  <SavedExe savedExercises={savedExercises} />
</div>
*/
