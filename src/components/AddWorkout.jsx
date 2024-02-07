import { useNavigate } from "react-router-dom";
import Client from "../assets/services/api";
import { useState, useEffect } from "react";

const AddWorkout = () => {
    const navigate = useNavigate();

    const initialWorkoutState = {
        name: "",
        muscleGroups: {},
        notes: "", // Add notes to initial state
    };

    const [newWorkout, setNewWorkout] = useState(initialWorkoutState);
    const [muscles, setMuscles] = useState([]);

    useEffect(() => {
        const fetchMuscles = async () => {
            try {
                const response = await Client.get('/musclegroups');
                setMuscles(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMuscles();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewWorkout((prevWorkout) => ({
            ...prevWorkout,
            [name]: value,
        }));
    };

    const handleMuscleChange = (muscleId, field, value) => {
        setNewWorkout((prevWorkout) => ({
            ...prevWorkout,
            muscleGroups: {
                ...prevWorkout.muscleGroups,
                [muscleId]: {
                    ...(prevWorkout.muscleGroups[muscleId] || {}),
                    [field]: value,
                },
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await Client.post('/workouts', newWorkout);
            navigate('/workoutdetail');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Log your Workout</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Workout Name:
                    <input
                        type="text"
                        name="name"
                        value={newWorkout.name}
                        onChange={handleChange}
                    />
                </label>

                {muscles.map((muscle) => (
                    <div key={muscle._id}>
                        <label>
                            {muscle.name} - Sets:
                            <input
                                type="number"
                                name={`muscleGroups.${muscle._id}.sets`}
                                value={newWorkout.muscleGroups[muscle._id]?.sets || 0}
                                onChange={(e) =>
                                    handleMuscleChange(muscle._id, "sets", parseInt(e.target.value, 10))
                                }
                            />
                        </label>

                        <label>
                            Reps:
                            <input
                                type="number"
                                name={`muscleGroups.${muscle._id}.reps`}
                                value={newWorkout.muscleGroups[muscle._id]?.reps || 0}
                                onChange={(e) =>
                                    handleMuscleChange(muscle._id, "reps", parseInt(e.target.value, 10))
                                }
                            />
                        </label>

                        <label>
                            Weight:
                            <input
                                type="number"
                                name={`muscleGroups.${muscle._id}.weight`}
                                value={newWorkout.muscleGroups[muscle._id]?.weight || 0}
                                onChange={(e) =>
                                    handleMuscleChange(muscle._id, "weight", parseInt(e.target.value, 10))
                                }
                            />
                        </label>
                    </div>
                ))}
                <div>
                    <label htmlFor="notes">Notes:</label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={newWorkout.notes}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddWorkout;
