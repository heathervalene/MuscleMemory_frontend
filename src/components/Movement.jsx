import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Client from '../assets/services/api'

const Movement = () => {
    let { id } = useParams();
    const [movements, setMovement] = useState([]);
    const [muscleId, setMuscleId] = useState('');
   

    const fetchMovement = async () => {
        try {
            let res = await Client.get(`/movements/${id}`);
            setMovement(res.data.movements);
            setMuscleId(res.data.muscleId);
        } catch (error) {
            console.error('Error fetching movement data:', error);
        }
    }

    useEffect(() => {
        fetchMovement();
    }, [id])

    return (
        <div>
            <h1>Movement Details</h1>
            {movements.length > 0 ? (
                movements.map((movement) => (
                    <div key={movement.id}>
                        <h2>{movement.name}</h2>
                        <div>{movement.description}</div>
                        <img src={movement.image} alt={movement.name} />
                        <div>{movement.workoutType}</div>
                        <Link to={`/addworkout/${movement._id}`}>Add Workout</Link>
                    </div>
                ))
             ) : (
                <p>Loading...</p>
            )} 
    
            <Link to='/musclegroup'>Back to Muscle Map</Link>
        </div>
    );
}

export default Movement;

