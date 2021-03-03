import React from 'react';
import './sign-in.css';

export default function SignIn() {
    return (
        <div>
            <nav>
                <h3>List Manager</h3>
                <button>Sign Up</button>
                <button>Sign In</button>
            </nav>
            <div className='sign-in-form'>
                <h1>Sign In</h1>
                <form>
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" />
                    <br />
                    <label for="password">Password:</label>
                    <input type="text" id="password" name="password" />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}