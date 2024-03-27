import NavBar from './navbar.js'
import DropDown from './dropdown.js';
import AddExercise from './addExercise.js';
import SavedExe from './exeTest.js';
import React, { useState } from 'react'; //

//main header
function Body() {
  //
  const [showForm, setShowForm] = useState(false);
  const [savedExercises, setSavedExercises] = useState([]);

  const handleAddExercise = (newExercise) => {
    setSavedExercises([...savedExercises, newExercise]);
    setShowForm(false); // Hide the form after adding exercise
  };//

  //console.log(handleAddExercise);

  return (
    <div className='fitness'>
      <header id="colorChange" className='fitness-header'>
      <DropDown />
      <img className="icon" src="https://www.svgrepo.com/show/475044/dumbbell.svg" alt='logo'></img>
      <NavBar />
      </header>
      <Main showForm={showForm} setShowForm={setShowForm} handleAddExercise={handleAddExercise} savedExercises={savedExercises} />
    </div>
  );
}

function Main({ showForm, setShowForm, handleAddExercise, savedExercises }) {
  return (
    <div className="main-board">
      <div className="days">
        {showForm ? (
          <AddExercise handleAddExercise={handleAddExercise} />
        ) : (
          <SavedExe savedExercises={savedExercises} />
        )}
        <button className="addExe" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Back to Dashboard' : 'Show Form'}
        </button>
      </div>
    </div>
  );
}

export default Body;

/*
<div>
  <SavedExe savedExercises={savedExercises} />
</div>
*/
