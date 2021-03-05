import React, { Component } from 'react';
import Context from '../Context';
import './list.css';

export default class List extends Component {
    static contextType = Context;
    render() {
        const { lists, items } = this.context

        const targetListId = parseInt(this.props.match.params.listId);
        let targetList = lists.filter(list => list.id === targetListId);
        targetList = targetList[0];

        return (
            <div>
                <nav>
                    <h3>List Manager</h3>
                    <button onClick={() => this.props.history.push('/dashboard')}>Dashboard</button>
                    <button onClick={() => this.props.history.push('/')}>Log Out</button>
                </nav>
                <section className='list-info'>
                    <h1>{targetList.name}</h1>
                    <p>Date Created: {targetList.date}</p>
                    <p>{targetList.description}</p>
                    <form className='add-item' onSubmit={e => {
                        this.props.handleItemAdd(e, targetListId);
                        e.target.reset();    
                    }}>
                        <h3>Add Item</h3>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required />
                        <br />
                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" name="description" required />
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                    <ul className="list-items">
                        {items.filter(item => item.listId === targetListId).map(filteredItem => 
                            <li key={filteredItem.id}>
                                <h4>{filteredItem.name}</h4>
                                <p>{filteredItem.description}</p>
                                <button>Complete</button>
                                <button>Edit</button>
                                <button>Delete</button>
                            </li>    
                        )}
                    </ul>
                    <div className="list-options">
                        <button>Edit List</button>
                        <button>Delete List</button>
                    </div>
                </section>
            </div>
        )
    }
}