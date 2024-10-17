import React, { useState } from 'react';
import './WelcomePage.css';
import largeLogo  from '../../assets/images/twitter-logo-300x300.png';

const WelcomePage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const validateAndLogin = () => {

    }

    /* TIPS:
      1) Prevent form from changing the URL to .../welcome?username=...
         -> hacky way: remove form
    */

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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;


