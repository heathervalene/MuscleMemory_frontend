import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Client from "../assets/services/api";


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

  const [movementName, setMovementName] = useState("");

  useEffect(() => {
    if (newWorkout.movementId) {
      Client.get(`/movements/${newWorkout.movementId}`) 
        .then(response => {
          setMovementName(response.data.name);
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
    navigate('/musclegroups');
  };

  return (
    <div>
      <h2>{movementId ? `Add Workout for ${movementId}` : 'Add Workout'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="sets">Sets:</label>
        <input
          type="number"
          name="sets"
          value={newWorkout.sets}
          onChange={handleChange}
          required
        />

        <label htmlFor="reps">Reps:</label>
        <input
          type="number"
          name="reps"
          value={newWorkout.reps}
          onChange={handleChange}
          required
        />

        <label htmlFor="weight">Weight:</label>
        <input
          type="number"
          name="weight"
          value={newWorkout.weight}
          onChange={handleChange}
          required
        />

        <label htmlFor="notes">Notes:</label>
        <textarea
          name="notes"
          value={newWorkout.notes}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          name="date"
          value={newWorkout.date}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddWorkout;


