import { Link } from "react-router-dom"


const MuscleGroup = ({muscleGroups}) => {
    return (
        <div>
            <h1 className="group-title">Muscle Map</h1>
            <div className="group-container">
            {muscleGroups.map(muscle => (
                <div key={muscle.id} className="muscle-box">
                    <Link to={`/movements/${muscle._id}`}>
                    <h4 className="muscle-name">{muscle.name}</h4>
                    <img src={muscle.image} alt={muscle.name} />
                    </Link>
                </div>
            ))}
            </div>
        </div>
    );
}

export default MuscleGroup