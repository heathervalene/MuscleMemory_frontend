import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Client from '../assets/services/api'


const WorkoutOverview = () => {
    const [workouts, setWorkouts] = useState([]);
  
    useEffect(() => {
      const fetchWorkouts = async () => {
        try {
          const response = await Client.get('/workouts'); 
          setWorkouts(response.data); 
        } catch (error) {
          console.error('Error fetching workouts:', error);
        }
      };
  
      fetchWorkouts();
    }, []); 
  
    return (
      <div>
        <h1>My Workouts</h1>
        {workouts.map(workout => (
          <div key={workout._id}>
            <div>{workout.movement}</div>
            <div>{workout.date}</div>
            
          </div>
        ))}
      </div>
    );
  };
  
  export default WorkoutOverview;