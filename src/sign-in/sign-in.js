import React, { Component } from 'react';
import AuthAPIService from '../services/auth-api-service';
import TokenService from '../services/token-service';
import './sign-in.css';

export default class SignIn extends Component {
    state = {
        error: null,
    };

    handleSignIn = (e) => {
        e.preventDefault();
        const { username, password } = e.target;
        this.setState({ error: null })
        const user = { 
            email: username.value, 
            password: password.value,
        }
        AuthAPIService.signinUser(user).then(signinResponse => {
            TokenService.saveAuthToken(signinResponse.authToken)
            this.props.handleAuthToken(signinResponse.authToken)
            fetch(`https://mighty-taiga-07413.herokuapp.com/api/lists`, {
                method: 'GET',
                headers: {
                    'authorization': `bearer ${signinResponse.authToken}`
                }
            }).then((listRes) => {
                if(!listRes.ok){
                    return listRes.json().then(e => Promise.reject(e))
                }
                return listRes.json()
            }).then((listRes) => {
                this.props.setLists(listRes)
                fetch(`https://mighty-taiga-07413.herokuapp.com/api/items`, {
                    method: 'GET',
                    headers: {
                        'authorization' : `bearer ${signinResponse.authToken}`
                    }
                }).then((itemRes) => {
                    if(!itemRes.ok){
                        return itemRes.json().then(e => Promise.reject(e))
                    }
                    return itemRes.json()
                }).then((itemRes) => {
                    this.props.setItems(itemRes)
                    fetch(`https://mighty-taiga-07413.herokuapp.com/api/users`, {
                        method: 'GET',
                        headers: {
                            'authorization' : `bearer ${signinResponse.authToken}`
                        }
                    }).then((userRes) => {
                        if(!userRes.ok){
                            return userRes.json().then(e => Promise.reject(e))
                        }
                        return userRes.json()
                    }).then((userRes) => {
                        this.props.setUser(userRes)
                    })
                })
            })
            this.props.history.push('/dashboard');
        }).catch((res) => {
            this.setState({ error: res.message });
        })
    }

    render() {
        return (
            <div>
                <header>
                    <h3>List Manager</h3>
                    <button onClick={() => this.props.history.push('/')}>Back</button>
                    <button onClick={() => this.props.history.push('/sign-up')}>Sign Up</button>
                </header>
                <div className='sign-in-form'>
                    <h1>Sign In</h1>
                    <form onSubmit={this.handleSignIn}>
                        {this.state.error && <p className="error">{this.state.error}</p>}
                        <label htmlFor="username">Email:</label>
                        <input type="email" id="username" name="username" />
                        <br />
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" />
                        <br />
                        <button className="submit-button" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}