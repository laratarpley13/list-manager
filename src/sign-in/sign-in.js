import React, { Component } from 'react';
import './sign-in.css';

export default class SignIn extends Component {
    render() {
        return (
            <div>
                <nav>
                    <h3>List Manager</h3>
                    <button onClick={() => this.props.history.push('/')}>Back</button>
                    <button onClick={() => this.props.history.push('/sign-up')}>Sign Up</button>
                </nav>
                <div className='sign-in-form'>
                    <h1>Sign In</h1>
                    <form>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" />
                        <br />
                        <label htmlFor="password">Password:</label>
                        <input type="text" id="password" name="password" />
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}