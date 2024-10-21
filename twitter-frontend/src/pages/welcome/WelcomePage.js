import React, { useContext, useState } from 'react';
import './WelcomePage.css';
import largeLogo  from '../../assets/images/twitter-logo-300x300.png';
import { validateLogin } from '../../lib/validation';
import logIn from '../../features/authentication/services/logIn';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const {user, setUser} = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const validateAndLogin = (e) => {
        const errorMessages = validateLogin({username, password});
        setErrors(errorMessages);
        if (errorMessages.length === 0) {
            logIn(username, password).then((res) => {
                setUser({token: res.data.token});
            }).catch((err) => {
                const errorMessage = err.response.data.errors.message;
                setErrors([`${errorMessage}`]);
            });
        }
    }

    const goToSignUpPage = (e) => {
        navigate('/signup');
    }

    /* TIPS:
      1) Prevent form from changing the URL to .../welcome?username=...
         -> hacky way: remove form
    */

    let validationErrorContent = null;
    if (errors.length !== 0) {
        validationErrorContent = errors.map(error => 
            <div className='validation-error' key={error}>
                <p>Error: {error}</p>
            </div>
        )
    }

    return (
        <div className='welcome'>
            <div className='container two-column-md'>
                <div className='welcome__col-1 flex-col-centre'>
                    <div className='welcome__logo-img'>
                        <img src={largeLogo} alt="Twitter Clone Logo" />
                    </div>
                    <div className='welcome__logo-text'>
                        Twitter
                    </div>
                </div>
                <div className='welcome__col-2'>
                    <h2 className='welcome__slogan'>Log In Now</h2>
                    <div className='welcome__col-2-form'>
                        <input
                            className="welcome__form-input form-input"
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            className="welcome__form-input form-input"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button className='welcome__login-btn btn' onClick={validateAndLogin}>
                            Log In
                        </button>
                        <button className='welcome__signup-btn btn' onClick={goToSignUpPage}>
                            Sign Up
                        </button>
                        {validationErrorContent}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;


