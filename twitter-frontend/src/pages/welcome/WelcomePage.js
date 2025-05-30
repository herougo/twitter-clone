import React, { useContext, useState } from 'react';
import './WelcomePage.css';
import largeLogo  from '../../assets/images/twitter-logo-300x300.png';
import { validateLogin } from '../../lib/validation';
import { logIn } from '../../features/authentication';
import UserContext from '../../context/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import useAxiosWrapper from '../../hooks/useAxiosWrapper';

const WelcomePage = () => {
    const {user, setUser} = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const {axiosWithHeader} = useAxiosWrapper();
    const navigate = useNavigate();

    if (user !== null) {
        return <Navigate to='/'></Navigate>
    }

    const validateAndLogin = async (e) => {
        const errorMessages = validateLogin({username, password});
        setErrors(errorMessages);
        if (errorMessages.length === 0) {
            let res = null;
            try {
                res = await logIn({
                    axiosFunction: axiosWithHeader,
                    payload: {username, password}
                });
            } catch (err) {
                setErrors([`${err.message}`]);
                return;
            };

            setUser({
                id: res.data.userId,
                username,
                token: res.data.token,
                profilePicPath: res.data.profilePicPath
            });
            navigate('/');
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


