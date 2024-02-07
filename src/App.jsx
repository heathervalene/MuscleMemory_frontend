import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Client from './assets/services/api'
import Nav from './components/Nav'
import About from './components/About'
import MuscleGroup from './components/MuscleGroup'
import AddWorkout from './components/AddWorkout'
import WorkoutDetail from './components/WorkoutDetail'
import Resources from './components/Resources'
import Movement from './components/Movement'

function App() {

  const [muscleGroups, setMuscleGroups] = useState([])

  useEffect(() => {

    const getMuscleGroups = async () => {
      let response = await Client.get('/musclegroups')
      setMuscleGroups(response.data)
    }
    getMuscleGroups() },[])
  

  return (
    <div>

    <header>
     <Nav />
    </header>
    <main> 
    <Routes>
     <Route path ='/about' element={<About/>} />
     <Route path ='/musclegroup' element={<MuscleGroup muscleGroups={muscleGroups}/>} />
     <Route path="/movements/:id" element={<Movement />} />
     <Route path ='/addworkout' element={<AddWorkout/>} />
     <Route path = '/workoutdetail' element={<WorkoutDetail/>} />
     <Route path = '/resources' element={<Resources/>} />
    </Routes>
    </main>
    <footer></footer>
   </div>
  )
}

export default App
