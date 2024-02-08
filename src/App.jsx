import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { CheckSession } from './assets/services/auth'
import './App.css'
import Client from './assets/services/api'
import Register from './components/Register'
import SignIn from './components/SIgnin'
import Nav from './components/Nav'
import About from './components/About'
import MuscleGroup from './components/MuscleGroup'
import AddWorkout from './components/AddWorkout'
import WorkoutDetail from './components/WorkoutDetail'
import Resources from './components/Resources'
import Movement from './components/Movement'

function App() {

  const [user, setUser] = useState(null)
  const [muscleGroups, setMuscleGroups] = useState([])

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  useEffect(() => {

    const getMuscleGroups = async () => {
      let response = await Client.get('/musclegroups')
      setMuscleGroups(response.data)
    }
    getMuscleGroups() },[])

    const handleLogOut = () => {
      setUser(null)
      localStorage.clear()
    }
  

  return (
    <div>

    <header>
     <Nav
     user={user}
     handleLogOut={handleLogOut}
     />

    </header>
    <main> 
    <Routes>
     <Route path ='/about' element={<About/>} />
     <Route path="/signin" element={<SignIn setUser={setUser} />} />
     <Route path="/register" element={<Register />} />
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
