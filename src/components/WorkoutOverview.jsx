import { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom'
import Client from '../assets/services/api'
import UpdateWorkout from './UpdateWorkout';
import { LineChart, XAxis, YAxis, Line, CartesianGrid, Tooltip, Legend, Bar, BarChart, LabelList } from 'recharts';




const WorkoutOverview = () => {
   let { id } = useParams();
  
    const [workouts, setWorkouts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [movement, setMovement] = useState([]);
    const [heaviestWorkout, setHeaviestWorkout] = useState(null);
    const [totalSets, setTotalSets] = useState(0);
    const [totalReps, setTotalReps] = useState(0);
    const [totalWorkouts, setTotalWorkouts] = useState(0);
    const [today, setToday] = useState(new Date());
    const [selectedMovement, setSelectedMovement] = useState(null);

 
    const fetchWorkouts = async () => {
      try {
     const res = await Client.get('/workouts');
     const sortedWorkouts = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
     setWorkouts(sortedWorkouts);
        setMovement(res.data.movement);

       
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

    useEffect(() => {
        setToday(new Date());
      }, []);

      const uniqueMovements = [...new Set(workouts.map((workout) => workout.movement.name))];

      const handleMovementChange = (event) => {
        const selectedMovementName = event.target.value;
        setSelectedMovement(selectedMovementName);
      };
    
      const filteredWorkouts = selectedMovement
        ? workouts.filter((workout) => workout.movement.name === selectedMovement)
        : workouts;
 
        const sortedWorkouts = [...workouts].sort((a, b) => new Date(a.date) - new Date(b.date));

  
    return (
        <div>
          <h1 className="overview-title">My Workout Overview</h1>
          <div className="data-container">
          <div className="line-chart-container">
            <div className="reps-data-title">Total Reps/Sets over time</div>
        <LineChart width={600} height={300} data={workouts} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sets" stroke="#8884d8" />
          <Line type="monotone" dataKey="reps" stroke="#82ca9d" />
        </LineChart>
      </div>
      <div className="bar-chart-container">
        <div className="weight-data-title">Weights per Movement</div>
        <div className="dropdown-container">
        <label>Select a Workout:</label>
        <select onChange={handleMovementChange}>
          <option value="">All Workouts</option>
          {uniqueMovements.map((movement, index) => (
            <option key={index} value={movement}>
              {movement}
            </option>
          ))}
        </select>
      </div>
      <div className="bar-chart-container">
      <BarChart width={600} height={300} data={filteredWorkouts} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="weight" fill="#8884d8">
            <LabelList dataKey="weight" position="top" />
          </Bar>
        </BarChart>
      </div>
      </div>
          </div>
          <div className="overview-stats">
            
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
              <div>Total Workouts: {totalWorkouts}</div>
            </div>
          </div>
          

          <h1 className="overview-title">My Workout Overview</h1>
    <div className="workout-list">
      {sortedWorkouts.reduce((acc, workout) => {
        const workoutDate = new Date(workout.date).toLocaleDateString();

    
        const existingBoxIndex = acc.findIndex((box) => box.date === workoutDate);

        if (existingBoxIndex !== -1) {
    
          acc[existingBoxIndex].workouts.push(workout);
        } else {
 
          acc.push({
            date: workoutDate,
            workouts: [workout],
          });
        }

        return acc;
      }, []).map((box, boxIndex) => (
        <div key={boxIndex} className="workout-item">
          <div className="date">Date: {box.date}</div>
          {box.workouts.map((workout, workoutIndex) => (
            <div key={workoutIndex}>
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