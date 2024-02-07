import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Client from '../assets/services/api'


const Movement = () => {
    let { id } = useParams();
    const [movement, setMovement] = useState('');

    const fetchMovement = async () => {
        let res = await Client.get(`/movements/${id}`);
        setMovement(res.data);
    }

    useEffect(() => {
        fetchMovement();
    }, [id])

    console.log("current movement state", movement)

    return (
        <div>
            <h1>Movement Details</h1>
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