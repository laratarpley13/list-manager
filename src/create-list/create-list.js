import React, { Component } from 'react';
import TokenService from '../services/token-service';
import './create-list.css';

export default class CreateList extends Component {
    logout = () => {
        TokenService.clearAuthToken();
        this.props.history.push('/')
    }

    render() {
        return(
            <div>
                <header>
                    <h3>List Manager</h3>
                    <button onClick={() => this.props.history.push('/dashboard')}>Dashboard</button>
                    <button onClick={() => this.logout()}> Log Out</button>
                </header>
                <section className='create-list-form'>
                <h1>Create New List</h1>
                    <form onSubmit={e => {
                        this.props.history.push('/dashboard');
                        this.props.handleListAdd(e)
                    }}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required/>
                        <br />
                        <button className="cancel-list-create" onClick={() => this.props.history.push('/dashboard')}>Cancel</button>
                        <button className="create-list" type="submit">Submit</button>
                    </form>
                </section>
            </div>
        )
    }
}