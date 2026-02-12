import React, { useState } from 'react';

const ProfilePage = () => {
  const [units, setUnits] = useState('');
  const [workoutDays, setWorkoutDays] = useState(0);
  const [primaryGoal, setPrimaryGoal] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [priorityMuscleGroups, setPriorityMuscleGroups] = useState([]);
  const [injuryHistory, setInjuryHistory] = useState('');
  const [equipmentAvailable, setEquipmentAvailable] = useState([]);
  /* auto-calculated from logs, not user input
  calculate using the Epley formula: 1RM = weight × (1 + reps/30) or the Brzycki formula: 1RM = weight × (36 / (37 - reps))
  const [benchPR, setBenchPR] = useState('');
  const [squatPR, setSquatPR] = useState('');
  const [deadliftPR, setDeadliftPR] = useState('');
  const [ohpPR, setOHPPR] = useState('');
  */

  // onChange={(e) => setDisplayName(e.target.value)}

    // temp test data for user input
  const inputData = {
    units: units,
    workoutDays: workoutDays,
    primaryGoal: primaryGoal,
    experienceLevel: experienceLevel,
    selectedDate: selectedDate,
    priorityMuscleGroups: priorityMuscleGroups,
    injuryHistory: injuryHistory,
    equipmentAvailable: equipmentAvailable,
  };

  console.log('Current input data:', inputData);

  

  return (
    <div className="min-h-screen bg-[#1e2225] py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-8">

        {/* 1. Basic Info Card */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-[#282c30]">
          <div className="border-b border-gray-20 px-6 py-4"
            style={{ backgroundColor: 'rgba(17,183,122,.856)' }}>
            <h1 className="text-xl font-semibold text-white">My Profile</h1>
          </div>

          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                  CW
                </div>
              </div>

              {/* Name & email + button */}
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold text-white">Caleb Wagner</h2>
                <p className="mt-1 text-white">caleb.wagner@email.com</p>

                <button
                  type="button"
                  className="mt-4 inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-50"
                  style={{ backgroundColor: 'rgba(17,183,122,.856)' }}
                >
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Training Preferences */}
            <div className="mt-10 border- pt-8">
              <h3 className="text-lg font-medium text-white">Training Preferences</h3>

              <dl className="mt-4 space-y-5 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-white">Units</dt>
                  <dd className="flex items-center gap-6">
                    <label className="flex items-center gap-2">
                      <input onClick={() => setUnits('metric')} type="checkbox" readOnly className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                      <span className="text-white">Metric (kg/cm)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input onClick={() => setUnits('imperial')} type="checkbox" readOnly className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                      <span className="text-white">Imperial</span>
                    </label>
                  </dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt className="text-white">Default Sets × Reps</dt>
                  <dd className="font-medium text-white">4 × 8</dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt className="text-white">Workout Days / Week</dt>
                  <dd className="font-medium text-white">
                    <input
                      type="number"
                      value={workoutDays}
                      onChange={(e) => setWorkoutDays(e.target.value)}
                      placeholder="e.g. 3"
                      required
                      className="text-white w-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* 2. Training Profile Card */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-[#282c30]"
        style={{borderColor: '#3a3f44',
                    '--tw-ring-color': 'rgba(17,183,122,.5)'}}>
          <div className="border-b border-gray-200 px-6 py-4"
            style={{ backgroundColor: 'rgba(17,183,122,.856)' }}>
            <h2 className="text-lg font-medium text-white">🎯 Training Profile</h2>
          </div>

          <div className="p-6">
            <dl className="space-y-5 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-white">Primary Goal</dt>
                <dd className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <input onClick={() => setPrimaryGoal('strength')} type="checkbox" readOnly className="h-4 w-4 rounded border-gray-300 text-indigo-600" />
                    <span className="text-white">Strength</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input onClick={() => setPrimaryGoal('hypertrophy')} type="checkbox" readOnly className="h-4 w-4 rounded border-gray-300" />
                    <span className="text-white">Hypertrophy</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input onClick={() => setPrimaryGoal('endurance')} type="checkbox" readOnly className="h-4 w-4 rounded border-gray-300" />
                    <span className="text-white">Endurance</span>
                  </label>
                </dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-white">Experience Level</dt>
                <dd className="font-medium text-white">
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="text-white w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="" disabled>Select level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-white">Training Since</dt>
                <dd className="font-medium text-white">
                  <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="text-white w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                </dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-white">Priority Muscle Groups</dt>
                <dd className="font-medium text-white">
                  <input type="text" value={priorityMuscleGroups} onChange={(e) => setPriorityMuscleGroups(e.target.value)} placeholder="e.g. Chest, Back" className="text-white w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                </dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-white">Injury History</dt>
                <dd className="text-white max-w-prose">
                  <input type="text" value={injuryHistory} onChange={(e) => setInjuryHistory(e.target.value)} placeholder="e.g. None, or Knee injury in 2022" className="text-white w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                </dd>
              </div>

              <div className="flex justify-between items-start">
                <dt className="text-white pt-1">Equipment Available</dt>
                <dd className="flex flex-wrap gap-x-6 gap-y-2 text-white">
                  {['Barbell', 'Dumbbells', 'Bench'].map(item => (
                    <label key={item} className="flex items-center gap-2">
                      <input
                        onClick={() => setEquipmentAvailable(item)}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* 3. Personal Records Card */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-[#282c30]">
          <div className="border-b border-gray-200 px-6 py-4"
            style={{ backgroundColor: 'rgba(17,183,122,.856)' }}>
            <h2 className="text-lg font-medium text-white">💪 Personal Records (auto-calculated from logs)</h2>
          </div>

          <div className="divide-y divide-gray-100 ">
            {[
              { lift: 'Bench Press', value: '52 kg', date: 'Feb 1, 2026' },
              { lift: 'Squat', value: '100 kg', date: 'Jan 28, 2026' },
              { lift: 'Deadlift', value: '120 kg', date: 'Jan 25, 2026' },
              { lift: 'Overhead Press', value: '35 kg', date: 'Jan 30, 2026' },
            ].map((record) => (
              <div
                key={record.lift}
                className="flex justify-between items-center px-6 py-4 hover:bg-gray-50/60 transition-colors"
              >
                <div className="font-medium text-white">{record.lift}</div>
                <div className="text-right">
                  <div className="font-semibold text-white">{record.value}</div>
                  <div className="text-xs text-gray-500">{record.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
