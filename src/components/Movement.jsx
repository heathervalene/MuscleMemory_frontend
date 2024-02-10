import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Client from '../assets/services/api'

const Movement = () => {
    let { id } = useParams();
    const [movements, setMovement] = useState([]);
    const [muscle, setMuscle] = useState('');
   

    const fetchMovement = async () => {
        try {
            let res = await Client.get(`/movements/${id}`);
            setMovement(res.data.movements);
            setMuscle(res.data.muscle);
        } catch (error) {
            console.error('Error fetching movement data:', error);
        }
    }

    useEffect(() => {
        fetchMovement();
    }, [id])

    return (
        <div className="movement-container">
        <h1 className="movement-title"> {muscle.name}</h1>
        {movements.length > 0 ? (
          movements.map((movement) => (
            <div key={movement.id} className="movement-item">
              <img src={movement.image} alt={movement.name} />
              <div className="movement-details">
                <h2>
                  {movement.name}
                  <span className={`workout-type ${movement.workoutType.toLowerCase()}`}>
                    {movement.workoutType}
                  </span>
                </h2>
                <div>{movement.description}</div>
                <div className="add-movement">
                <Link to={`/addworkout/${movement._id}`} >
                  Add Workout
                </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
        <Link to="/musclegroup">Back to Muscle Map</Link>
      </div>
    );
}

export default Movement;

