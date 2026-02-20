// AnalyticsPage.jsx (Parent Component)
import { useState, useEffect } from 'react';
import ModernSidebar from '../components/analytics/AnalyticsSidebar';
import AnalyticsChart from '../components/analytics/AnalyticsChart';
import MetricCard from '../components/analytics/MetricCard';
import { computeMuscleStats, buildMuscleMap, groupByMuscle, buildAllSummary } from '../utils/helpers';
import { BicepsFlexed } from 'lucide-react';

// Muscle groups from document (expand as needed)
const MUSCLE_GROUPS = ['Chest', 'Back', 'Legs', 'Shoulders', 'Biceps', 'Triceps', 'Abs', 'Isolation', 'All']

 const menuItems = [
    { id: 'home', icon: BicepsFlexed, label: 'Chest' },
    { id: 'explore', icon: BicepsFlexed, label: 'Back' },
    { id: 'trending', icon: BicepsFlexed, label: 'Shoulders' },
    { id: 'notifications', icon: BicepsFlexed, label: 'Biceps'},
    { id: 'messages', icon: BicepsFlexed, label: 'Triceps' },
    { id: 'bookmarks', icon: BicepsFlexed, label: 'Legs' },
    { id: 'profile', icon: BicepsFlexed, label: 'Isolation' },
    { id: 'other', icon: BicepsFlexed, label: 'All' },
  ];

function AnalyticsPage() {
  const [processedData, setProcessedData] = useState({});
  const [selectedGroup, setSelectedGroup] = useState('Chest');

  useEffect(() => {
    // Import and use the local JSON file
    import('../utils/exercises.json')
      .then(module => {
        const data = module.default;
        const aggregated = processWorkoutData(data);
        setProcessedData(aggregated);
      })
      .catch(error => console.error('Error loading workout data:', error));
  }, []);

  // Process data: Group by muscle, calculate metrics ***
  const processWorkoutData = (data) => {
    // Map exercises to muscle groups (from your JSON data)
    const muscleGroupMap = {};
    
    buildMuscleMap(data, muscleGroupMap)

    const aggregated = {};

    // Initialize all muscle groups
    MUSCLE_GROUPS.forEach(group => {
      if (group !== 'All') {
        aggregated[group] = { 
          logs: [], 
          volumeTrend: { labels: [], data: [] },
          count: 0, // length of unique_logs
          totalVolume: 0, // sum of kgs in unique_logs
          unique_logs: [], // no duplicates/keep most recent
          sets: 0 // total sets
        };
      }
    });

    // Group logs by muscle group
    groupByMuscle(data, aggregated)

    //console.log('Aggregated Structure:', aggregated);

    for (let object of Object.values(aggregated)) {
      computeMuscleStats(object)
    }

    aggregated['All'] = buildAllSummary(aggregated)

    return aggregated;
  };

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden">
      {/* Sidebar - assuming ModernSidebar is already styled; enhance if needed */}
      <ModernSidebar 
        menuItems={menuItems} 
        selected={selectedGroup} 
        onSelect={setSelectedGroup}
      />

      <main className="flex-1 overflow-y-auto p-6">
        <header className="mb-8 bg-gray-950" >
          <h2 className="text-3xl font-bold text-emerald-400">{selectedGroup} Analytics</h2>
          <p className="text-gray-400 mt-1">Volume trends, sets distribution & progress insights</p>
        </header>

        {selectedGroup === 'All' ? (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              <MetricCard 
                title="Total Volume" 
                value={`${processedData['All']?.grandTotal?.toFixed(0) || 0} kg`} 
              />
              <MetricCard 
                title="Total Exercises" 
                value={`${processedData['All']?.totalExercises || 0} exercises`} 
              />
              {/* Add more metrics as needed, e.g. streak, avg volume delta */}
            </div>

            {/* Charts - side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <AnalyticsChart
                  type="pie"
                  title="Total Sets per Muscle Group"
                  data={{
                    labels: processedData['All']?.muscleGroupVolumes.muscle_groups || [],
                    datasets: [{ 
                      label: 'Sets', 
                      data: processedData['All']?.muscleGroupVolumes.sets || [], 
                      backgroundColor: [
                        '#ef4444', '#f59e0b', '#eab308', '#10b981', '#3b82f6', '#8b5cf6'
                      ],
                      borderWidth: 1,
                      borderColor: '#111827'
                    }]
                  }}
                />
              </div>

              <div className="h-80">
                <AnalyticsChart
                  type="pie"
                  title="Total Volume per Muscle Group (kg)"
                  data={{
                    labels: processedData['All']?.muscleGroupVolumes.muscle_groups || [],
                    datasets: [{ 
                      label: 'Volume (kg)', 
                      data: processedData['All']?.muscleGroupVolumes.volume || [], 
                      backgroundColor: [
                        '#ef4444', '#f59e0b', '#eab308', '#10b981', '#3b82f6', '#8b5cf6'
                      ],
                      borderWidth: 1,
                      borderColor: '#111827'
                    }]
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Group-specific stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
              <MetricCard 
                title="Total Sets" 
                value={`${processedData[selectedGroup]?.sets || 0} sets`} 
              />
              <MetricCard 
                title="Total Volume" 
                value={`${processedData[selectedGroup]?.totalVolume?.toFixed(0) || 0} kg`} 
              />
              <MetricCard 
                title="Personal Records" 
                value={`${processedData[selectedGroup]?.count || 0} exercises`} 
              />
            </div>

            {/* Trend chart - full width */}
            <div className="h-96">
              <AnalyticsChart
                type="line"  // Changed to line → better for trends over time
                title="Volume Load Trend (Weekly)"
                data={{
                  labels: processedData[selectedGroup]?.volumeTrend.labels || [],
                  datasets: [{ 
                    label: 'Total Volume (kg)', 
                    data: processedData[selectedGroup]?.volumeTrend.data || [], 
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    tension: 0.3,
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#111827',
                    pointHoverRadius: 6,
                  }]
                }}
              />
            </div>

            {/* Bonus: Add space for future AI insights card */}
            {/* <div className="mt-8 p-6 bg-gray-900/70 rounded-xl border border-gray-800">
              <h3 className="text-lg font-semibold text-emerald-300 mb-3">AI Insights</h3>
              <p className="text-gray-300">Coming soon: plateau detection, recovery recommendations...</p>
            </div> */}
          </>
        )}
      </main>
    </div>
  );
}

export default AnalyticsPage;