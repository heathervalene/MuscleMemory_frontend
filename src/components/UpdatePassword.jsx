import { useState } from "react"
import Client from "../assets/services/api"
import { useNavigate } from "react-router-dom";



const UpdatePassword = () => {

    let navigate = useNavigate()

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value)
    }

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value)
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleUpdatePassword = async () => {
        try {
          const oldPassword = 'oldPasswordValue'; 
          const newPassword = 'newPasswordValue'; 
          const confirmPassword = 'confirmPasswordValue'; 
      
          await Client.put('/users/updatepassword', {
            oldPassword,
            newPassword,
            confirmPassword,
          });
      
          navigate('/signin');
        } catch (error) {
          console.error("Error updating password:", error);
        }
      };
    

    return (
        <div>
             <h2>Update Password</h2>
      <form>
        <label>
          Old Password:
          <input
            type="password"
            value={oldPassword}
            onChange={handleOldPasswordChange}
          />
        </label>
        <br />
        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </label>
        <br />
        <label>
          Confirm New Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleUpdatePassword}>
          Update Password
        </button>
      </form>
        </div>
    )
}

export default UpdatePassword