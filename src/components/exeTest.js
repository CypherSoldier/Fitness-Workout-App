import { Trash2, Edit2 } from 'lucide-react';

function SavedExe({ savedExercises, onDeleteExercise, onEditExercise }) {
  const deleteExercise = (index) => { //
    onDeleteExercise(index); //
  };

  const editExercise = (index) => { //
    onEditExercise(index); //
  };

    return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#1e2225' }}>
      <div className="max-w-7xl mx-auto">
          {savedExercises.map((exercise, index) => (
            <div 
              key={index}
              className="rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              style={{ 
                backgroundColor: '#282c30',
                borderColor: '#3a3f44'
              }}
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={exercise.image} 
                  alt={exercise.name}
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute inset-0"
                />
                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: 'rgba(17,183,122,.856)' }}
                  >
                    {exercise.exercise}
                  </span>
                </div>
              </div>

              {/* Body Section */}
              <div className="p-4">
                {/* Top - Exercise Name */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {exercise.name}
                  </h3>
                </div>

                {/* Bottom - Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div 
                    className="text-center p-3 rounded-lg"
                    style={{ backgroundColor: '#1e2225' }}
                  >
                    <div className="text-xs text-gray-400 mb-1">Sets</div>
                    <div className="text-sm font-semibold text-white">
                      {exercise.sets}
                    </div>
                  </div>
                  <div 
                    className="text-center p-3 rounded-lg"
                    style={{ backgroundColor: '#1e2225' }}
                  >
                    <div className="text-xs text-gray-400 mb-1">Reps</div>
                    <div className="text-sm font-semibold text-white">
                      {exercise.reps}
                    </div>
                  </div>
                  <div 
                    className="text-center p-3 rounded-lg"
                    style={{ backgroundColor: '#1e2225' }}
                  >
                    <div className="text-xs text-gray-400 mb-1">Weight</div>
                    <div className="text-sm font-semibold text-white">
                      {exercise.kgs}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => editExercise(index)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-white transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: 'rgba(17,183,122,.856)' }}
                  >
                    <Edit2 size={16} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => deleteExercise(index)}
                    className="flex items-center justify-center px-4 py-2.5 rounded-lg font-medium text-white transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: 'rgba(173, 17, 17, 0.67)' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
  }

export default SavedExe;