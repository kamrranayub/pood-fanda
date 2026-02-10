import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({setShowLogin}) => {

    const [currState, setCurrentState] = useState("Login"); // Login, Sign Up

  return (
    <div className='login-popup'>
        <form className='login-popup-container'>
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img src={assets.cross_icon} alt="Close" onClick={() => setShowLogin(false)} />
            </div>
            <div className="login-popup-inputs">
                {currState === "Login"?<></>:<input type="text" placeholder="Your Name" />}
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
            </div>
            <button>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>I agree to the terms & conditions</p>
            </div>
            {currState === "Login"
            ?<p>Create New Account <span onClick={()=>setCurrentState("Sign Up")}>Click Here</span></p>
            :<p>Already Have an Account? <span onClick={()=>setCurrentState("Login")}>Login</span></p>
            }
        </form>
    </div>
  )
}

export default LoginPopup