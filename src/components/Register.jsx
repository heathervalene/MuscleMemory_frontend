import { useState } from 'react'
import {RegisterUser} from '../assets/services/auth'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    let navigate = useNavigate()
  
    const [formValues, setFormValues] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  
    const handleChange = (e) => {
      setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      await RegisterUser({
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
      })
      setFormValues({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
      navigate('/signin')
    }
  
    return (
      <div className="container" >
        <div className="form" >
          <form onSubmit={handleSubmit}>
            <div className="formGroup" >
              <label className="label" htmlFor="name">Name</label>
              <input className="input"
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="John Smith"
                value={formValues.name}
                required
              />
            </div>
            <div className="formGroup">
              <label className="label" htmlFor="email">Email</label>
              <input className="input"
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="example@example.com"
                value={formValues.email}
                required
              />
            </div>
  
            <div className="formGroup">
              <label className="label" htmlFor="password">Password</label>
              <input className="input"
                onChange={handleChange}
                type="password"
                name="password"
                value={formValues.password}
                required
              />
            </div>
            <div className="formGroup">
              <label className="label" htmlFor="confirmPassword">Confirm Password</label>
              <input className="input"
                onChange={handleChange}
                type="password"
                name="confirmPassword"
                value={formValues.confirmPassword}
                required
              />
            </div>
            <button className="button"
              disabled={
                !formValues.email ||
                (!formValues.password &&
                  formValues.confirmPassword === formValues.password)
              }
            >
              Register
            </button>
          </form>
        </div>
      </div>
    )
  }
  
  export default Register