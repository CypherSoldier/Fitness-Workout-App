import React, { useState, useEffect } from 'react';
//import NavBar from './navbar.js';
import AddExercise from './addExercise.js';
import SavedExe from './exeTest.js';
import SearchBar from './searchbar.js';

function Body(props) {
  const [showForm, setShowForm] = useState(false);
  const [savedExercises, setSavedExercises] = useState([]);
  const [inputText, setInputText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  
  useEffect(() => {
    const exercisesFromStorage = JSON.parse(localStorage.getItem('savedExercises')) || [];
    console.log('Retrieved from storage:', exercisesFromStorage);
    setSavedExercises(exercisesFromStorage);
  }, []);

  const handleAddExercise = (newExercise) => {
    setSavedExercises((prevExercises) => {
      const updatedExercises = [...prevExercises, newExercise];
      localStorage.setItem('savedExercises', JSON.stringify(updatedExercises)); // Step 1 fix
      return updatedExercises;
    });
    setShowForm(false);
  };

  const handleDeleteExercise = (index) => {
    setSavedExercises((prevExercises) => {
      const updatedExercises = prevExercises.filter((_, i) => i !== index);
      localStorage.setItem('savedExercises', JSON.stringify(updatedExercises)); // Step 2 fix
      return updatedExercises;
    });
  };

  const filteredData = savedExercises.filter((el) => {
    if (props.input === '') {
      return true;
    }
    else {
      return el.exercise.toLowerCase().includes(inputText);
    }
  })

  const editData = (index) => {
    setEditIndex(index);
    setShowForm(true);
  }

  const handleSaveExercise = (updatedExercise) => {
    setSavedExercises((prevExercises) => {
      const updatedExercises = [...prevExercises];
      updatedExercises[editIndex] = updatedExercise;
      localStorage.setItem('savedExercises', JSON.stringify(updatedExercises));
      return updatedExercises;
    });
    setEditIndex(null);
    setShowForm(false);
  };

  return (
    <div className='fitness'>
      <nav id="colorChange" className='fitness-header'>
        
      </nav>
      {!showForm ? ( <SearchBar setInputText={setInputText}/> ) : null}
      <Main 
        showForm={showForm}
        setShowForm={setShowForm}
        handleAddExercise={handleAddExercise}
        savedExercises={savedExercises}
        onDeleteExercise={handleDeleteExercise}
        filteredData={filteredData}
        onEditExercise={editData}
        editIndex={editIndex}
        handleSaveExercise={handleSaveExercise} 
      />
    </div>
  );
}

function Main({ showForm, handleAddExercise, setShowForm, savedExercises, onDeleteExercise, filteredData, onEditExercise, handleSaveExercise, editIndex }) {
  return (
    <div className="main-board">
      <div className="days">
        {showForm ? (
          <AddExercise 
          handleAddExercise={editIndex !== null ? handleSaveExercise : handleAddExercise} 
          initialValues={editIndex !== null ? savedExercises[editIndex] : null} 
          />
        ) : (
            filteredData.map((item, index) => (
                <SavedExe key={index} 
                savedExercises={[item]} 
                onDeleteExercise={() => onDeleteExercise(index)} 
                onEditExercise={() => onEditExercise(index)} />
            ))
        )}
        <button className="addExe" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Back to Dashboard' : 'Show Form'}
        </button>
      </div>
    </div>
  );
}

export default Body;