import { useState } from "react";

function SavedExe({ savedExercises, onDeleteExercise }) {
  const deleteExercise = (index) => {
    onDeleteExercise(index);
  };

    return (
      <div className="wOne">
        {savedExercises.map((exercise, index) => (
        <div className="savedExercises" key={index}>
          <div className="image">
          <img alt="user" className="img" src="https://d3gbf3ykm8gp5c.cloudfront.net/content/uploads/2019/09/01090644/Bryan-Habana-running-away-against-Samoa-2007-World-Cup-PA.jpg"/>
          </div>
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
          </div>
          <div className="deleteButton">
          <button className="deleteExe" onClick={() => deleteExercise(index)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
          </svg>
          </button>
          </div>
      </div>
      ))}
      </div>
    );
  }

export default SavedExe;
/*
image
name
muscle
sets reps kgs      
*/     