import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Client from '../assets/services/api'

const Movement = ({user}) => {
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
              <img src={movement.image} alt={movement.name} className="movement-img" />
              <div className="movement-details">
                <h2>
                  {movement.name}
                  <span className={`workout-type ${movement.workoutType.toLowerCase().replace(/\s+/g, '-')}`}>
                    {movement.workoutType}
                  </span>
                </h2>
                <div>{movement.description}</div>
                <div className="add-movement">
                    {user ? (
                <Link to={`/addworkout/${movement._id}`} className="add-button">
                  Add Workout
                </Link>
                    ) : (
                        <span className="add-button-disabled">Sign in to log your workout!</span>
                      )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
        <Link to="/musclegroup" className="back-link">Back to Muscle Map</Link>
      </div>
    );
}

export default Movement;

