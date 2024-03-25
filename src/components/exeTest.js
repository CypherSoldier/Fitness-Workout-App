function SavedExe({ savedExercises }) {
    return (
      <div className="wOne">
        {savedExercises.map((exercise, index) => (
        <div className="savedExercises">
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