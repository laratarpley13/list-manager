import React, { Component } from 'react';
import AuthAPIService from '../services/auth-api-service';
import './sign-up.css';

export default class SignUp extends Component {
    state = {
        error: null,
    };

    //set up authentication in the back-end
    handleSubmit = e => {
        e.preventDefault();
        const { newUsername, newPassword, confirmPassword } = e.target;
        console.log(newPassword.value === confirmPassword.value) //debugging
        this.setState({ error: null })
        if (newPassword.value !== confirmPassword.value) {
            this.setState({ error: "Passwords do not match"})
        } else {
            AuthAPIService.postUser({
                email: newUsername.value,
                password: newPassword.value,
            }).then(user => {
                this.props.history.push('/sign-in')
            }).catch((res) => {
                if(res.message.includes('duplicate key')){
                    this.setState({error:'That email already exists'});
                } else {
                    this.setState({ error: res.message });
                }
            })
        }
    }

    render() {
        return (
            <div>
                <header>
                    <h3>List Manager</h3>
                    <button onClick={() => this.props.history.push('/')}>Back</button>
                    <button onClick={() => this.props.history.push('/sign-in')}>Sign In</button>
                </header>
                <div className='sign-up-form'>
                    <h1>Sign Up</h1>
                    <form onSubmit={this.handleSubmit}>
                        {this.state.error && <p className="error">{this.state.error}</p>}
                        <label htmlFor="new-username">Email:</label>
                        <input type="email" id="new-username" name="newUsername" />
                        <br /> 
                        <label htmlFor="new-password">Create Password:</label>
                        <input type="password" id="new-password" name="newPassword" />
                        <br />
                        <label htmlFor="confirm-password">Confirm Password:</label>
                        <input type="password" id="confirm-password" name="confirmPassword" />
                        <br />
                        <button className="submit-button" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}