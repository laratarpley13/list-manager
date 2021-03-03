import React from 'react';
import './create-list.css';

export default function CreateList() {
    return(
        <div>
            <nav>
                <h3>List Manager</h3>
                <button>Dashboard</button>
                <button>Log Out</button>
            </nav>
            <section className='create-list-form'>
            <h1>Create New List</h1>
                <form>
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" />
                    <br />
                    <label for="description">Description:</label>
                    <input type="text" id="description" name="description" />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </section>
        </div>
    )
}