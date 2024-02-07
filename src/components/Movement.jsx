import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Client from '../assets/services/api'


const Movement = () => {
    let { id } = useParams();
    const [movement, setMovement] = useState('');
    const [selectedType, setSelectedType] = useState('')

    const fetchMovement = async () => {
        let url = `/movements/${id}`;

        if(selectedType) {
            url += `?type=${selectedType}`
        }
        let res = await Client.get(`/movements/${id}`);
        setMovement(res.data);
    }

    useEffect(() => {
        fetchMovement();
    }, [id,selectedType])



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
            {movement ? (
                <div>
                    <h2>{movement.name}</h2>
                    <div>{movement.description}</div>
                    <img src={movement.image} alt={movement.name} />
                    <div>{movement.workoutType}</div>
                </div>
            ) : (
                <p>Loading movement details...</p>
            )}
            <Link to='/musclegroup'>Back to Muscle Map</Link>
        </div>
    )
}

export default Movement