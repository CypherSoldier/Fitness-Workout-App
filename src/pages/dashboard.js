import React, { useState, useEffect } from 'react';
import AddExercise from '../components/exercise_form';
import SavedExe from '../components/exercise_card';
import SearchBar from '../components/searchbar';
import DayFilterSidebar from '../components/day_sidebar';
//import NavBar from './navbar';
import { Plus } from 'lucide-react';

// Anything marked with 'R*' is temporarily disabled/modified -> counterpart is 'T*'
function Body(props) {
  const [showForm, setShowForm] = useState(false);
  const [savedExercises, setSavedExercises] = useState([]);
  const [inputText, setInputText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  
  // R*
  useEffect(() => {
    const exercisesFromStorage = JSON.parse(localStorage.getItem('savedExercises')) || [];
    console.log('Retrieved from storage:', exercisesFromStorage);
    setSavedExercises(exercisesFromStorage);
  }, []); 

  /* T* 
  useEffect(() => {
      axios.get('http://localhost:5000/exercises')
        .then(response => {
          setSavedExercises(response.data)
        })
        .catch(error => {
          console.error('There was an error fetching the items!', error);
        });
  }, []);
  */

  const handleAddExercise = (newExercise) => {
    setSavedExercises((prevExercises) => {
      const updatedExercises = [...prevExercises, newExercise];
      localStorage.setItem('savedExercises', JSON.stringify(updatedExercises)); // Step 1 fix
      return updatedExercises;
    });
    setShowForm(false);
  };

  // R*
  const handleDeleteExercise = (index) => {
    setSavedExercises((prevExercises) => {
      const updatedExercises = prevExercises.filter((_, i) => i !== index);
      localStorage.setItem('savedExercises', JSON.stringify(updatedExercises)); // Step 2 fix
      return updatedExercises;
    });
  };

  /* T*
  const handleDeleteExercise = (id) => {
    axios.delete(`http://localhost:5000/${id}`)
      .then(() => {
        setSavedExercises(prev =>
          prev.filter(exercise => exercise._id !== id)
        );
      })
      .catch(error => {
        console.error(error);
    });
  };
  */

  const filteredData = savedExercises.filter((el) => {
    const nameMatch = props.input === '' || el.exercise.toLowerCase().includes(inputText.toLowerCase());

    const dayMatch = !selectedDay || el.day === selectedDay; // ← assumes your data has "day" field

    return nameMatch && dayMatch;
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

  /* under fitness
  <nav id="colorChange" className='fitness-header'>
        <NavBar/>
      </nav>
  */
  return (
    <div className="fitness flex h-screen">
      <DayFilterSidebar
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <div className="flex-1 overflow-auto">
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
    </div>
  );
}

function Main({ showForm, handleAddExercise, setShowForm, savedExercises, onDeleteExercise, filteredData, onEditExercise, handleSaveExercise, editIndex }) {
  return (
    <div className="main-board">
      <h1 className="text-3xl font-bold text-white mb-8 p-2">Your Exercises</h1>
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
        <button
        className="fixed bottom-8 right-12 group rounded-xl p-4 transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 z-50"
        style={{ 
          backgroundColor: 'rgba(17,183,122,.856)',
          boxShadow: '0 4px 20px rgba(17,183,122,.3)'
        }}
        onClick={() => setShowForm(!showForm)}
      >
        <Plus 
          size={32} 
          className={`text-white transition-transform duration-300 ${showForm ? 'rotate-45' : ''}`}
          strokeWidth={3} 
        />
        
        {/* Tooltip */}
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 rounded-lg text-sm font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" style={{ backgroundColor: '#282c30' }}>
          {showForm ? 'Close' : 'Add Exercise'}
        </span>
        </button>
      </div>
    </div>
  );
}

export default Body;