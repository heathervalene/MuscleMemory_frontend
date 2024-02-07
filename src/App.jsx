import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
import About from './components/About'
import MuscleGroup from './components/MuscleGroup'
import AddWorkout from './components/AddWorkout'
import WorkoutDetail from './components/WorkoutDetail'

function App() {
  

  return (
    <div>

    <header>
     <Nav />
    </header>
    <main> 
    <Routes>
     <Route path ='/about' element={<About/>} />
     <Route path ='/musclegroup' element={<MuscleGroup/>} />
     <Route path ='/addworkout' element={<AddWorkout/>} />
     <Route path = '/workoutdetail' element={<WorkoutDetail/>} />
    </Routes>
    </main>
    <footer></footer>
   </div>
  )
}

export default App
