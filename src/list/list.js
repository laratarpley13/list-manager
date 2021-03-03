import React from 'react';
import './list.css';

export default function List() {
    return (
        <div>
            <nav>
                <h3>List Manager</h3>
                <button>Dashboard</button>
                <button>Log Out</button>
            </nav>
            <section className='list-info'>
                <h1>List Name</h1>
                <p>Date Created: 01/01/2021</p>
                <p>List Description</p>
                <form className='add-item'>
                    <h3>Add Item</h3>
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" />
                    <br />
                    <label for="description">Description:</label>
                    <input type="text" id="description" name="description" />
                    <br />
                    <button type="submit">Submit</button>
                </form>
                <ul className="list-items">
                    <li className="item">
                        <h4>Item Name</h4>
                        <p>Optional Description</p>
                        <button>Complete</button>
                        <button>Edit</button>
                        <button>Delete</button>
                    </li>
                    <li className="item">
                        <h4>Item Name</h4>
                        <p>Optional Description</p>
                        <button>Complete</button>
                        <button>Edit</button>
                        <button>Delete</button>
                    </li>
                    <li className="item">
                        <h4>Item Name</h4>
                        <p>Optional Description</p>
                        <button>Complete</button>
                        <button>Edit</button>
                        <button>Delete</button>
                    </li>
                    <li className="item">
                        <h4>Item Name</h4>
                        <p>Optional Description</p>
                        <button>Complete</button>
                        <button>Edit</button>
                        <button>Delete</button>
                    </li>
                    <li className="item">
                        <h4>Item Name</h4>
                        <p>Optional Description</p>
                        <button>Complete</button>
                        <button>Edit</button>
                        <button>Delete</button>
                    </li>
                    <li className="item">
                        <h4>Item Name</h4>
                        <p>Optional Description</p>
                        <button>Complete</button>
                        <button>Edit</button>
                        <button>Delete</button>
                    </li>
                    <li className="item">
                        <h4>Item Name</h4>
                        <p>Optional Description</p>
                        <button>Complete</button>
                        <button>Edit</button>
                        <button>Delete</button>
                    </li>
                </ul>
                <div className="list-options">
                    <button>Edit List</button>
                    <button>Delete List</button>
                </div>
            </section>
        </div>
    )
}