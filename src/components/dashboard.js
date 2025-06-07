import React, { useState, useEffect } from 'react';
import NavBar from './navbar.js';
import AddExercise from './addExercise.js';
import SavedExe from './exeTest.js';

function Body() {
  const [showForm, setShowForm] = useState(false);
  const [savedExercises, setSavedExercises] = useState([]);

  // Retrieve saved exercises from localStorage on mount
  useEffect(() => {
    const exercisesFromStorage = JSON.parse(localStorage.getItem('savedExercises')) || [];
    console.log('Retrieved from storage:', exercisesFromStorage);
    setSavedExercises(exercisesFromStorage);
  }, []);

  // Add a new exercise and update localStorage
  const handleAddExercise = (newExercise) => {
    setSavedExercises((prevExercises) => {
      const updatedExercises = [...prevExercises, newExercise];
      localStorage.setItem('savedExercises', JSON.stringify(updatedExercises)); // Step 1 fix
      return updatedExercises;
    });
    setShowForm(false);
  };

  // Delete an exercise and update localStorage
  const handleDeleteExercise = (index) => {
    setSavedExercises((prevExercises) => {
      const updatedExercises = prevExercises.filter((_, i) => i !== index);
      localStorage.setItem('savedExercises', JSON.stringify(updatedExercises)); // Step 2 fix
      return updatedExercises;
    });
  };

  return (
    <div className='fitness'>
      <nav id="colorChange" className='fitness-header'>
        <NavBar />
      </nav>
      <Main 
        showForm={showForm}
        setShowForm={setShowForm}
        handleAddExercise={handleAddExercise}
        savedExercises={savedExercises}
        onDeleteExercise={handleDeleteExercise}
      />
    </div>
  );
}

function Main({ showForm, handleAddExercise, setShowForm, savedExercises, onDeleteExercise }) {
  return (
    <div className="main-board">
      <div className="days">
        {showForm ? (
          <AddExercise handleAddExercise={handleAddExercise} />
        ) : (
          <SavedExe savedExercises={savedExercises} onDeleteExercise={onDeleteExercise} />
        )}
        <button className="addExe" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Back to Dashboard' : 'Show Form'}
        </button>
      </div>
    </div>
  );
}

export default Body;