import React, { Component } from 'react';
import './edit-list.css';

export default class EditList extends Component {
    render() {
        return (
            <div>
                <nav>
                    <h3>List Manager</h3>
                    <button>Cancel</button>                    
                    <button onClick={() => this.props.history.push('/')}>Log Out</button>
                </nav>
                <section className='edit-list-form'>
                    <h1>Edit List</h1>
                    <form>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value="List Name" />
                        <br />
                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" name="description" value="List description" />
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                </section>
            </div>
        )
    }
}