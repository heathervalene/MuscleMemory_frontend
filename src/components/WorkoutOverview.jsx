import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import Client from '../assets/services/api'
import UpdateWorkout from './UpdateWorkout';
import { Line } from 'react-chartjs-2';


const WorkoutOverview = () => {
   let { id } = useParams();
  
    const [workouts, setWorkouts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [movement, setMovement] = useState([]);

 
    const fetchWorkouts = async () => {
      try {
     const res = await Client.get('/workouts');

     console.log(res.data)

        setWorkouts(res.data);
        setMovement(res.data.movement);

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

    const openUpdateWorkout = (workout) => {
        setSelectedWorkout(workout);
        setIsModalOpen(true);
      };
  
    useEffect(() => {
      fetchWorkouts();
    }, []);



 
  
    return (
      <div>
        
        <h1 className="overview-title">My Workouts</h1>
        <div className="workout-list">
        {workouts.map((workout) => (
          <div key={workout._id} className="workout-item">
             <div>{new Date(workout.date).toLocaleDateString()}</div>
            <div>Movement: {workout.name}</div>
            <div>sets: {workout.sets}</div>
            <div>reps: {workout.reps}</div>
            <div>weight: {workout.weight} lbs</div>
            <div className="workout-notes">Notes: {workout.notes}</div>
           
            <button onClick={() => deleteWorkout(workout._id)} className="delete-button">Delete</button>
            <button onClick={() => openUpdateWorkout(workout)} className="delete-button">Update</button>
          </div>
        ))}
        {isModalOpen && selectedWorkout && (
        <UpdateWorkout
          workout={selectedWorkout}
          closeModal={() => setIsModalOpen(false)}
          setWorkouts={setWorkouts}
        />
        )}
        </div>
        
      </div>
    );
  };
  
  export default WorkoutOverview;