import React, { Component } from 'react';
import Context from '../Context';
import TokenService from '../services/token-service';
import './list.css';

export default class List extends Component {
    static contextType = Context;

    logout = () => {
        TokenService.clearAuthToken();
        this.props.history.push('/landing')
    }

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
                    <button onClick={() => this.logout()}>Log Out</button>
                </nav>
                <section className='list-info'>
                    <h1>{targetList.name}</h1>
                    <p>Last Edited: {targetList.date}</p>
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
                                <h4 className={filteredItem.active ? 'check-item': null}>{filteredItem.name}</h4>
                                <p>{filteredItem.description}</p>
                                {filteredItem.active
                                    ? <button onClick={() => this.props.toggleClass(filteredItem)}>Un-Check</button>
                                    : <button onClick={() => this.props.toggleClass(filteredItem)}>Check-Off</button>
                                }
                                <button onClick={() => this.props.history.push(`/edit-item/${filteredItem.id}`)}>Edit</button>
                                <button onClick={() => this.props.handleItemDelete(filteredItem.id)}>Delete</button>
                            </li>    
                        )}
                    </ul>
                    <div className="list-options">
                        <button onClick={() => this.props.history.push(`/edit-list/${targetListId}`)}>Edit List</button>
                        <button onClick={() => {
                            this.props.history.push(`/dashboard`);
                            this.props.handleDeleteList(targetListId);
                        }}>Delete List</button>
                    </div>
                </section>
            </div>
        )
    }
}