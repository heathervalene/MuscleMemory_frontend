import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import Client from '../assets/services/api'


const WorkoutOverview = () => {
    let { id } = useParams();
  
    const [workouts, setWorkouts] = useState([]);
    const [movementId, setMovementId] = useState('');
  
    const fetchWorkouts = async () => {
      try {
        const res = await Client.get('/workouts');
        setWorkouts(res.data);
        // setMovementId(response.data.movementId);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };
  
    const deleteWorkout = async (id) => {
      try {
        await Client.delete(`workouts/${id}`);
        fetchWorkouts();
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      fetchWorkouts();
    }, []);
  
    return (
      <div>
        <h1>My Workouts</h1>
        {workouts.map((workout) => (
          <div key={workout._id}>
            <div>{workout.movement}</div>
            <div>sets: {workout.sets}</div>
            <div>reps: {workout.reps}</div>
            <div>weight: {workout.weight} lbs</div>
            <div>{new Date(workout.date).toLocaleDateString()}</div>
            <button onClick={() => deleteWorkout(workout._id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  };
  
  export default WorkoutOverview;