import { useState} from "react";
import { SignInUser } from "../assets/services/auth";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'


const SignIn = (props) => {
  
    let navigate = useNavigate()
  
  
    const [formValues, setFormValues] = useState({ email: '', password: '' })
  
    const handleChange = (e) => {
      setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      const payload = await SignInUser(formValues)
      setFormValues({ email: '', password: '' })
      props.setUser(payload)
      navigate('/musclegroup')
    }
  
    return (
        <div>
            <h1 className="login-title">Muscle Memory</h1>
        <div className="container">
          <form onSubmit={handleSubmit} className="form">
            <div className="formGroup">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                onChange={handleChange}
                name="email"
                type="email"
                placeholder=""
                value={formValues.email}
                className="input"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                value={formValues.password}
                className="input"
                required
              />
            </div>
            <button
              disabled={!formValues.email || !formValues.password}
              className="button"
            >
              Sign In
            </button>
          </form>
          <div className="registerLink">
            <p>
              Not a member yet?  <Link to="/register">Register here</Link>
            </p>
            <p className="forgot-password">
             <Link to="/update-password">Forgot Password</Link>
          </p>
          </div>
        </div>
        </div>
      );
    };
  
  export default SignIn


