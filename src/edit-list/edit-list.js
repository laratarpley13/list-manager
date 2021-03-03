import React from 'react';
import './edit-list.css';

export default function EditList() {
    return (
        <div>
            <nav>
                <h3>List Manager</h3>
                <button>Dashboard</button>
                
                <button>Log Out</button>
            </nav>
            <section className='edit-list-form'>
                <h1>Edit List</h1>
                <form>
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" value="List Name" />
                    <br />
                    <label for="description">Description:</label>
                    <input type="text" id="description" name="description" value="List description" />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </section>
        </div>
    )
}