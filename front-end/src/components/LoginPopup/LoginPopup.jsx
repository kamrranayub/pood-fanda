import React, { useState, useContext } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);

    const [currState, setCurrentState] = useState("Login");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prev => ({ ...prev, [name]: value }));
    }

    const onLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            let endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register";
            const response = await axios.post(url + endpoint, data);

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
                toast.success(currState === "Login" ? "Welcome back!" : "Account created!");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
        setLoading(false);
    }

    return (
        <div className='login-popup' onClick={() => setShowLogin(false)}>
            <form onSubmit={onLogin} className='login-popup-container' onClick={e => e.stopPropagation()}>
                <div className="login-popup-title">
                    <h2>{currState === "Login" ? "Welcome Back" : "Create Account"}</h2>
                    <img src={assets.cross_icon} alt="Close" onClick={() => setShowLogin(false)} />
                </div>
                <div className="login-popup-inputs">
                    {currState !== "Login" && (
                        <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Full Name" required />
                    )}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Email Address" required />
                    <div className="password-input-wrapper">
                        <input
                            name='password'
                            onChange={onChangeHandler}
                            value={data.password}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                        />
                        <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Hide" : "Show"}
                        </span>
                    </div>
                </div>
                <button type='submit' disabled={loading}>
                    {loading ? "Please wait..." : (currState === "Login" ? "Sign In" : "Create Account")}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>I agree to the terms & conditions</p>
                </div>
                {currState === "Login"
                    ? <p>New here? <span onClick={() => setCurrentState("Sign Up")}>Create Account</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Sign In</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
