import PropTypes from 'prop-types';
import React, { useState } from 'react';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

function LoginPage({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        setToken(token);
    }

    return (
        <div className="items">
            <form className="info" onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <label>Remember Me</label>
                <input type="checkbox"/>
                <div className="loginButton">
                    <button className="loginButtonStyle" type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired
  }

export default LoginPage;