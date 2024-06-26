//the props are declared to access the contents of 'savedExercises'
//and to delete the whole component **************
function SavedExe({ savedExercises, onDeleteExercise }) {
  const deleteExercise = (index) => { //
    onDeleteExercise(index); //
  };

    //https://legacy.reactjs.org/docs/lists-and-keys.html --- .map()
    //https://www.codementor.io/@riza/different-ways-to-map-a-list-in-react-js-24deu7alb2
    //https://www.freecodecamp.org/news/how-to-render-lists-in-react/
    return (
      <div className="wOne">
        {savedExercises.map((exercise, index) => (
        <div className="savedExercises" key={index}>
          <div className="image">
          <img alt="user" className="img" src={exercise.image}/>
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
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
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

/*
https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/dumbbell.png
*/