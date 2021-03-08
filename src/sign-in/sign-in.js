import React, { Component } from 'react';
import TokenService from '../services/token-service';
import { API_BASE_URL } from '../config';
import './sign-in.css';

export default class SignIn extends Component {
    handleSignIn = (e) => {
        e.preventDefault();
        const { username, password } = e.target;
        const user = { 
            username: username.value, 
            password: password.value,
        }
        /* fetch(`${API_BASE_URL}/api/auth/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => res.json()).then(signinResponse => {
            TokenService.saveAuthToken(signinResponse.authToken)
            this.props.history.push('/dashboard');
        }).catch(err => console.error(err)) */

        TokenService.saveAuthToken('akhld78shd4hld65dl');
        this.props.history.push('/dashboard');
    }

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
                    <form onSubmit={this.handleSignIn}>
                        <label htmlFor="username">Email:</label>
                        <input type="email" id="username" name="username" defaultValue="demo@demo.com" />
                        <br />
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" defaultValue="P@ssword123!" />
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}