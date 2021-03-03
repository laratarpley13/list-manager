import React from 'react';
import './edit-item.css';

export default function EditItem() {
    return (
        <div>
            <nav>
                <h3>List Manager</h3>
                <button>Cancel</button>
                <button>Log Out</button>
            </nav>
            <section className='edit-item-form'>
                <h1>Edit Item</h1>
                <form>
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" value="Item Name" />
                    <br />
                    <label for="description">Description:</label>
                    <input type="text" id="description" name="description" value="Item description" />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </section>
        </div>
    )
}