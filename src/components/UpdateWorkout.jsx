import { useState } from 'react';
import Modal from 'react-modal';
import Client from '../assets/services/api'

const UpdateWorkout = ({workout, closeModal, setWorkouts}) => {

const [updatedWorkout, setUpdatedWorkout] = useState({
    sets: workout.sets,
    reps: workout.reps,
    weight: workout.weight,
    date: workout.date.slice(0, 10),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedWorkout({ ...updatedWorkout, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await Client.put(`/workouts/${workout._id}`, updatedWorkout);
      setWorkouts((prevWorkouts) =>
        prevWorkouts.map((prevWorkout) =>
          prevWorkout._id === workout._id ? { ...prevWorkout, ...updatedWorkout } : prevWorkout
        )
      );
  
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };



    return (
        <Modal
          isOpen={true} 
          onRequestClose={closeModal}
        >
          <h2>Update Workout</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="sets">Sets:</label>
            <input
              type="number"
              name="sets"
              value={updatedWorkout.sets}
              onChange={handleChange}
              required
            />
    
            <label htmlFor="reps">Reps:</label>
            <input
              type="number"
              name="reps"
              value={updatedWorkout.reps}
              onChange={handleChange}
              required
            />
    
            <label htmlFor="weight">Weight:</label>
            <input
              type="number"
              name="weight"
              value={updatedWorkout.weight}
              onChange={handleChange}
              required
            />
    
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              name="date"
              value={updatedWorkout.date}
              onChange={handleChange}
              required
            />
    
            <button type="submit">Update</button>
            <button type="button" onClick={closeModal}>Cancel</button>
          </form>
        </Modal>
      );
    };


export default UpdateWorkout