import React, { Component } from 'react';
import './edit-item.css';

export default class EditItem extends Component {
    render() {
        return (
            <div>
                <nav>
                    <h3>List Manager</h3>
                    <button>Cancel</button>
                    <button onClick={() => this.props.history.push('/')}>Log Out</button>
                </nav>
                <section className='edit-item-form'>
                    <h1>Edit Item</h1>
                    <form>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value="Item Name" />
                        <br />
                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" name="description" value="Item description" />
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                </section>
            </div>
        )
    }
}