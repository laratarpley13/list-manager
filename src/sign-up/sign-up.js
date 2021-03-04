import React, { Component } from 'react';
import './sign-up.css';

export default class SignUp extends Component {
    render() {
        return (
            <div>
                <nav>
                    <h3>List Manager</h3>
                    <button onClick={() => this.props.history.push('/')}>Back</button>
                    <button onClick={() => this.props.history.push('/sign-in')}>Sign In</button>
                </nav>
                <div className='sign-up-form'>
                    <h1>Sign Up</h1>
                    <form>
                        <label htmlFor="new-username">Create Username:</label>
                        <input type="text" id="new-username" name="new-username" />
                        <br /> 
                        <label htmlFor="new-password">Create Password:</label>
                        <input type="text" id="new-password" name="new-password" />
                        <br />
                        <label htmlFor="confirm-password">Confirm Password:</label>
                        <input type="text" id="confirm-password" name="confirm-password" />
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}