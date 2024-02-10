import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Client from "../assets/services/api";
import {Link} from "react-router-dom";


const AddWorkout = () => {

    let { movementId } = useParams();
  const navigate = useNavigate();
  const [newWorkout, setNewWorkout] = useState({
    movementId: movementId,
    sets: 0,
    reps: 0,
    weight: 0,
    notes: "",
    date: new Date().toISOString().split('T')[0],
  });

  const [movement, setMovement] = useState("");

  useEffect(() => {
    if (newWorkout.movementId) {
      Client.get(`/movements/${newWorkout.movementId}`) 
        .then(response => {
          setMovement(response.data.movements);
        })
        .catch(error => {
          console.error('Error fetching movement details:', error);
        });
    }
  }, [newWorkout.movementId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewWorkout({ ...newWorkout, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Client.post('/workouts', newWorkout);
      
    } catch (error) {
      console.error("Error adding workout:", error);
    }
    navigate('/workoutoverview');
  };

  return (
    <div>
        <div className="form-container">
      <h2 className="form-title">{movement.name ? `Add Workout for ${movement.name}` : 'Add Workout'}</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formGroup">
        <label htmlFor="sets" className="label">Sets:</label>
        <input className="input"
          type="number"
          name="sets"
          value={newWorkout.sets}
          onChange={handleChange}
          required
        />
            </div>
            <div className="formGroup">
        <label htmlFor="reps" className="label">Reps:</label>
        <input className="input"
          type="number"
          name="reps"
          value={newWorkout.reps}
          onChange={handleChange}
          required
        />
    </div>
    <div className= "formGroup">
        <label htmlFor="weight" className="label">Weight:</label>
        <input className="input"
          type="number"
          name="weight"
          value={newWorkout.weight}
          onChange={handleChange}
          required
        />
    </div>
    <div className="formGroup">
        <label htmlFor="notes" className="label">Notes:</label>
        <textarea className="textarea-input"
          name="notes"
          value={newWorkout.notes}
          onChange={handleChange}
        ></textarea>
    </div>
    <div className="formGroup">
        <label htmlFor="date" className="label">Date:</label>
        <input className="input"
          type="date"
          name="date"
          value={newWorkout.date}
          onChange={handleChange}
          required
        />
</div>
        <button type="submit" className="button">Submit</button>
      </form>
      <Link to="/musclegroup" className="back-link">Back to Muscle Map</Link>
      </div>
      
      
    </div>
  );
};

export default AddWorkout;


