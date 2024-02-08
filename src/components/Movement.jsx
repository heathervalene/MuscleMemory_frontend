import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Client from '../assets/services/api'

const Movement = () => {
    let { id } = useParams();
    const [movements, setMovement] = useState([]);
    const [muscleId, setMuscleId] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const fetchMovement = async () => {
        let url = `/movements/${id}`;
    
        if (selectedType) {
            url += `?type=${selectedType}`;
        }
    
        try {
            let res = await Client.get(url);




            setMovement(res.data.movements);
            setMuscleId(res.data.muscleId);
        } catch (error) {
            console.error('Error fetching movement data:', error);
            // Handle error state or display an error message
        }
    }

    useEffect(() => {
        fetchMovement();
    }, [id, selectedType])

    return (
        <div>
            <h1>Movement Details</h1>
            <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
            >
                <option value="">All Types</option>
                <option value="bodyweight">Body Weight</option>
                <option value="dumbbell">Dumbbell</option>
                <option value="machine">Machine</option>
            </select>

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
                <p>No movements found.</p>
            )} 
    
            <Link to='/musclegroup'>Back to Muscle Map</Link>
        </div>
    );
}

export default Movement;

