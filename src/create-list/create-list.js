import React, { Component } from 'react';
import './create-list.css';

export default class CreateList extends Component {
    render() {
        return(
            <div>
                <nav>
                    <h3>List Manager</h3>
                    <button onClick={() => this.props.history.push('/dashboard')}>Dashboard</button>
                    <button onClick={() => this.props.history.push('/')}> Log Out</button>
                </nav>
                <section className='create-list-form'>
                <h1>Create New List</h1>
                    <form onSubmit={e => {
                        this.props.history.push('/dashboard');
                        this.props.handleListAdd(e)
                    }}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required/>
                        <br />
                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" name="description" required />
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                </section>
            </div>
        )
    }
}