function SavedExe({savedExercises}) {
    return(
        <div className="savedExercises">
            <div className="image"><img className="img" src="https://img.sarugbymag.co.za/wp-content/uploads/2019/10/Manu_Tuilagi_England_All_Blacks_old_Getty_Images.jpg"/></div>
            <h2>Saved Exercises:</h2>
                {savedExercises.map((exercise, index) => (
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
                </div>))}
        </div>
    );
};

export default SavedExe;

/*
image
name
muscle
sets reps kgs
*/