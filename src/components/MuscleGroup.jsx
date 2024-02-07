import { Link } from "react-router-dom"


const MuscleGroup = ({muscleGroups}) => {
    return (
        <div>
            <h1>Muscle Map</h1>
            {muscleGroups.map(muscle => (
                <div key={muscle.id}>
                    <Link to={`/movements/${muscle._id}`}>
                    <h4>{muscle.name}</h4>
                    <img src={muscle.image} alt={muscle.name} />
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default MuscleGroup