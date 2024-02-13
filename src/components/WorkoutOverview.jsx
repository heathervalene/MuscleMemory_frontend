import { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom'
import Client from '../assets/services/api'
import UpdateWorkout from './UpdateWorkout';



const WorkoutOverview = () => {
   let { id } = useParams();
  
    const [workouts, setWorkouts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [movement, setMovement] = useState([]);
    const [daysSinceLastWorkout, setDaysSinceLastWorkout] = useState(null); 
    const [heaviestWorkout, setHeaviestWorkout] = useState(null);
    const [totalSets, setTotalSets] = useState(0);
    const [totalReps, setTotalReps] = useState(0);
    const [workoutFrequency, setWorkoutFrequency] = useState(0);
    const [totalWorkouts, setTotalWorkouts] = useState(0);




 
    const fetchWorkouts = async () => {
      try {
     const res = await Client.get('/workouts');

     console.log(res.data)

        setWorkouts(res.data);
        setMovement(res.data.movement);

        if (res.data.length > 0) {
            const lastWorkoutDate = new Date(res.data[0].date);
            const today = new Date();
            
          
            const oneDay = 24 * 60 * 60 * 1000; 
            const daysDifference = Math.round(Math.abs((today - lastWorkoutDate) / oneDay));
    
            setDaysSinceLastWorkout(daysDifference);
          }
          const heaviestWorkout = res.data.reduce((maxWeightWorkout, workout) => {
            if (maxWeightWorkout === null || workout.weight > maxWeightWorkout.weight) {
              return workout;
            }
            return maxWeightWorkout;
          }, null);
    
          setHeaviestWorkout(heaviestWorkout);
      
      const totalSets = res.data.reduce((total, workout) => total + workout.sets, 0);
      const totalReps = res.data.reduce((total, workout) => total + workout.reps, 0);

      setTotalSets(totalSets);
      setTotalReps(totalReps);

     
      const firstWorkoutDate = res.data.length > 0 ? new Date(res.data[res.data.length - 1].date) : new Date();
      const totalDays = Math.round(Math.abs((today - firstWorkoutDate) / (24 * 60 * 60 * 1000)));
      const workoutFrequency = res.data.length > 1 ? Math.round(totalDays / (res.data.length - 1)) : 0;

      setWorkoutFrequency(workoutFrequency);

     
      setTotalWorkouts(res.data.length);

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
          <div className="overview-stats">
            {daysSinceLastWorkout !== null && (
              <div className="widget">
                <div>Days since last workout: {daysSinceLastWorkout}</div>
              </div>
            )}
            {heaviestWorkout !== null && (
              <div className="widget">
                <div>Biggest Lift: {heaviestWorkout.movement.name} - {heaviestWorkout.weight} lbs</div>
              </div>
            )}
            <div className="widget">
              <div>Total Sets: {totalSets}</div>
            </div>
            <div className="widget">
              <div>Total Reps: {totalReps}</div>
            </div>
            <div className="widget">
              <div>Workout Frequency: {workoutFrequency} days per workout</div>
            </div>
            <div className="widget">
              <div>Total Workouts: {totalWorkouts}</div>
            </div>
          </div>
          <div className="workout-list">
            {workouts.map((workout) => (
              <div key={workout._id} className="workout-item">
                <div>{new Date(workout.date).toLocaleDateString()}</div>
                <div className="workout-notes">Movement: {workout.movement.name}</div>
                <div>sets: {workout.sets}</div>
                <div>reps: {workout.reps}</div>
                <div>weight: {workout.weight} lbs</div>
                <div className="workout-notes">Notes: {workout.notes}</div>
                <div className="button-container">
                  <button onClick={() => deleteWorkout(workout._id)} className="delete-button">Delete</button>
                  <button onClick={() => openUpdateWorkout(workout)} className="delete-button">Update</button>
                </div>
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
            }
  
  export default WorkoutOverview;