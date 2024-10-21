import './SignupPage.css';
import React, { useContext, useState } from 'react';
import signUp from '../../features/authentication/services/signUp';
import { useNavigate } from 'react-router-dom';
import logIn from '../../features/authentication/services/logIn';
import UserContext from '../../context/UserContext';
import { validateSignUp } from '../../lib/validation';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errors, setErrors] = useState([]);
    
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const validateAndSignUp = (e) => {
        const inputValues = {
            username, password, email, firstName, lastName
        };
        const errorMessages = validateSignUp(
            {...inputValues, passwordConfirmation}
        );
        setErrors(errorMessages);
        if (errorMessages.length === 0) {
            signUp(inputValues).then((res) => {
                logInUsingSignup();
            }).catch((err) => {
                const errorMessage = err.response.data.errors.message;
                setErrors([`${errorMessage}`]);
            })
        }
    }

    const logInUsingSignup = () => {
        logIn(username, password).then((res) => {
            setUser({token: res.data.token});
            navigate('/');
        }).catch((err) => {
            navigate('/login');
        });
    }

    let validationErrorContent = null;
    if (errors.length !== 0) {
        validationErrorContent = errors.map(error => 
            <div className='validation-error' key={error}>
                <p>Error: {error}</p>
            </div>
        )
    }

    return (
        <div className='signup'>
            <div className='signup__container'>
                <h2 className='signup__heading'>Twitter Sign Up</h2>
                <div className='signup__form'>
                    <input
                        className="signup__form-input form-input"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        className="signup__form-input form-input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        className="signup__form-input form-input"
                        type="password"
                        name="password"
                        placeholder="Password Confirmation"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required
                    />
                    <input
                        className="signup__form-input form-input"
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="signup__form-input form-input"
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        className="signup__form-input form-input"
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <button className='signup__sign-up-btn btn' onClick={validateAndSignUp}>
                        Sign Up
                    </button>
                    {validationErrorContent}
                </div>
            </div>
        </div>
    );
}

export default SignupPage;