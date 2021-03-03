import React from 'react';
import './sign-up.css';

export default function SignUp() {
    return (
        <div>
            <nav>
                <h3>List Manager</h3>
                <button>Sign Up</button>
                <button>Sign In</button>
            </nav>
            <div className='sign-up-form'>
                <h1>Sign Up</h1>
                <form>
                    <label for="new-username">Create Username:</label>
                    <input type="text" id="new-username" name="new-username" />
                    <br /> 
                    <label for="new-password">Create Password:</label>
                    <input type="text" id="new-password" name="new-password" />
                    <br />
                    <label for="confirm-password">Confirm Password:</label>
                    <input type="text" id="confirm-password" name="confirm-password" />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}