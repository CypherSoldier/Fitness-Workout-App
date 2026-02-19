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
    <div className="flex">
      {/*<MuscleGroupSidebar
        groups={MUSCLE_GROUPS}
        selected={selectedGroup}
        onSelect={setSelectedGroup}
      /> */}

      <ModernSidebar menuItems={menuItems} selected={selectedGroup} onSelect={setSelectedGroup}/>
      <div className="flex-1 p-4">
        <h2 className="text-2xl mb-4">{selectedGroup} Analytics</h2>
        
        {selectedGroup === 'All' ? (
          <>
          {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <MetricCard 
                title="Total Volume" 
                value={`${processedData['All']?.grandTotal?.toFixed(0) || 0} kg`} 
              />
              <MetricCard 
                title="Total Exercises" 
                value={`${processedData['All']?.totalExercises || 0} exercises/week`} 
              />
            </div>

          <div className='h-96 w-full flex'>
            {/* Overall Volume Trend */}
            <AnalyticsChart
              type="pie"
              title="Total sets per muscle group"
              data={{
                labels: processedData['All']?.muscleGroupVolumes.muscle_groups || [],
                datasets: [{ 
                  label: 'Sets', 
                  data: processedData['All']?.muscleGroupVolumes.sets || [], 
                  backgroundColor: [
                    'rgb(255, 99, 132)',   // red
                    'rgb(255, 159, 64)',   // orange
                    'rgb(255, 205, 86)',   // yellow
                    'rgb(75, 192, 192)',   // green
                    'rgb(54, 162, 235)',   // blue
                    ] 
                }]
              }}
            />

            <AnalyticsChart
              type="pie"
              title="Total volume per muscle group"
              data={{
                labels: processedData['All']?.muscleGroupVolumes.muscle_groups || [],
                datasets: [{ 
                  label: 'Volume(kg)', 
                  data: processedData['All']?.muscleGroupVolumes.volume || [], 
                  backgroundColor: [
                    'rgb(255, 99, 132)',   // red
                    'rgb(255, 159, 64)',   // orange
                    'rgb(255, 205, 86)',   // yellow
                    'rgb(75, 192, 192)',   // green
                    'rgb(54, 162, 235)',   // blue
                    ] 
                }]
              }}
            />
          </div>
          </>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <MetricCard 
                title="< Placeholder >" 
                value={'-'} 
              />
              <MetricCard 
                title="Total Sets" 
                value={`${processedData[selectedGroup]?.sets || 0} sets`} 
                alert={''} 
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

            <div className='h-96 w-full flex'>
              {/* Volume Trend Chart */}
              <AnalyticsChart
                type="pie"
                title="Volume Load Trend (Weekly)"s
                data={{
                  labels: processedData[selectedGroup]?.volumeTrend.labels || [],
                  datasets: [{ 
                    label: 'Total Volume (kg)', 
                    data: processedData[selectedGroup]?.volumeTrend.data || [], 
                    backgroundColor: [
                      'rgb(255, 99, 132)',   // red
                      'rgb(255, 159, 64)',   // orange
                      'rgb(255, 205, 86)',   // yellow
                      'rgb(75, 192, 192)',   // green
                      'rgb(54, 162, 235)',   // blue
                      ]
                  }]
                }} 
              /> 
            </div>
            
            
            {/* Strength Curve (Line Chart) 
            <AnalyticsChart
              type="line"
              title="Strength Progression (Estimated 1RM)"
              data={{
                labels: processedData[selectedGroup]?.strengthTrend.labels || [],
                datasets: [{ 
                  label: 'Est. 1RM (kg)', 
                  data: processedData[selectedGroup]?.strengthTrend.data || [], 
                  borderColor: 'rgba(54, 162, 235, 1)',
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  fill: true,
                  tension: 0.4
                }]
              }}
            /> */}
            
          </>
        )}
      </div>
    </div>
  );
}

export default AnalyticsPage;