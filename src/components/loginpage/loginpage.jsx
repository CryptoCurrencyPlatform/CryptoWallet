import React, { useState } from 'react';
import './login_page.css';

// To adapt the React code to match the HTML form and JavaScript validation you provided, you'll need to convert it to a functional equivalent. Here's how you can do it:

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const validateUser = () => {
        fetch('users.csv')
            .then(response => response.text())
            .then(data => {
                const users = data.split('\n').map(line => line.split(','));
                const userExists = users.some(user => user[0] === username && user[1] === password);

                if (userExists) {
                    alert('Access granted');
                    // Redirect to another page or perform any action
                } else {
                    alert('Access denied');
                }
            })
            .catch(error => {
                console.error('Error reading the CSV file:', error);
            });
    }

    return (
        <div className='main-container'>
            <div className='main-frame-background1'>
                <div className='main-frame'>
                    <span className='type-username'>Log in</span>
                    <div className='username-input'>
                        <label for="use-rname" className='username-input-1'>Username</label><br />
                        <input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className='password-input'>
                        <label for="password" className='password'>Password</label><br />
                        <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className='continue-button'>
                        <input type="button" value="Continue" className='continue' onClick={validateUser} />
                    </div>
                </div>
            </div>
        </div>
    );
}