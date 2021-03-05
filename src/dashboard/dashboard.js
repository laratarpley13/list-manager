import React, { Component } from 'react'
import Context from '../Context'
import './dashboard.css'

export default class Dashboard extends Component {
    static contextType = Context;
    render() {
        const { lists, items } = this.context;

        return(
            <div>
                <nav>
                    <h3>List Manager</h3>
                    <button onClick={() => this.props.history.push('/create-list')}>Add List</button>
                    <button onClick={() => this.props.history.push('/')}>Log Out</button>
                </nav>
                <section className='dashboard-page'>
                    <h1>Dashboard</h1>
                    <div className="lists">
                        {lists.map((list) => 
                            <div key={list.id} className="list-preview">
                                <h3>{list.name}</h3>
                                <p>Last Edited: {list.date}</p>
                                <p>{list.description}</p>
                                <ul>
                                    {items.filter(item => item.listId === list.id).map(filteredItem => (
                                        <li key={filteredItem.id} className={filteredItem.active ? 'check-item': null}>{filteredItem.name}</li>
                                    ))}
                                </ul>
                                <button onClick={() => this.props.history.push(`/list/${list.id}`)}>View</button>
                                <button>Share</button>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        )
    }
}