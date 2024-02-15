import NavBar from './navbar.js'
import Days from './days.js'
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

  console.log(savedExercises);

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
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Back to Dashboard' : 'Show Form'}
        </button>
      </div>
    </div>
  );
}

/*
{showForm ? (
<AddExercise handleAddExercise={handleAddExercise} />
) : (
<SavedExe savedExercises={savedExercises} />
)}
<button onClick={() => setShowForm(!showForm)}>
{showForm ? 'Back to Dashboard' : 'Show Form'}
</button>
*/

// only up to 7 days can be added, id="day1" is there by default, user can add more days and delete
/*function Days() {
  return (
    <div className="days">
      <div id="day1"></div>
      <div>
        <button id="add"></button>
        <button id="delete"></button>
      </div>
    </div>
  );
}*/

export default Body;
