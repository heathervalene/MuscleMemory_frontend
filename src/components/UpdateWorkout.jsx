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

  const customModalStyles = {
    content: {
      maxWidth: '400px', 
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid white',
      borderRadius: '20px',
      height: '500px',
      backgroundColor: '#212529', 
    },
  };



    return (
        <Modal
          isOpen={true} 
          onRequestClose={closeModal}
          style={customModalStyles}
        >
            <div>
          <h2 className="overview-title">Update Workout</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="formGroup">
            <label htmlFor="sets" className="label">Sets:</label>
            <input className="input"
              type="number"
              name="sets"
              value={updatedWorkout.sets}
              onChange={handleChange}
              required
            />
            </div>
            <div className="formGroup">
            <label htmlFor="reps" className="label">Reps:</label>
            <input className="input"
              type="number"
              name="reps"
              value={updatedWorkout.reps}
              onChange={handleChange}
              required
            />
        </div>
        <div className="formGroup">
            <label htmlFor="weight" className="label">Weight:</label>
            <input className="input"
              type="number"
              name="weight"
              value={updatedWorkout.weight}
              onChange={handleChange}
              required
            />
        </div>
        <div className="formGroup">
            <label htmlFor="date" className="label">Date:</label>
            <input className="input"
              type="date"
              name="date"
              value={updatedWorkout.date}
              onChange={handleChange}
              required
            />
           
        </div>
            <button className="button" type="submit">Update</button>
            <button className="button" type="button" onClick={closeModal}>Cancel</button>
          </form>
          </div>
        </Modal>
       
      );
    };


export default UpdateWorkout