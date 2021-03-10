import React, { Component } from 'react';
import Context from '../Context';
import TokenService from '../services/token-service';
import './dashboard.css';

export default class Dashboard extends Component {
    static contextType = Context;

    shareList = (selectedList) => {
        console.log(`http://localhost:3000/share/${selectedList.id}`)
        const selectedListUrl = `http://localhost:3000/share/${selectedList.id}`
        alert(`Copy this link to share your list:\n${selectedListUrl}`)
    }

    logout = () => {
        TokenService.clearAuthToken();
        this.props.history.push('/')
    }

    render() {
        const { lists, items } = this.context;

        return(
            <div>
                <nav>
                    <h3>List Manager</h3>
                    <button onClick={() => this.props.history.push('/create-list')}>Add List</button>
                    <button onClick={() => this.logout()}>Log Out</button>
                </nav>
                <section className='dashboard-page'>
                    <h1>Dashboard</h1>
                    <div className="lists">
                        {lists.map((list) => 
                            <div key={list.id} className="list-preview">
                                <h3>{list.name}</h3>
                                <p>Date Created: {list.date}</p>
                                <ul>
                                    {items.filter(item => item.listId === list.id).map(filteredItem => (
                                        <li key={filteredItem.id} className={filteredItem.active ? 'check-item': null}>{filteredItem.name}</li>
                                    ))}
                                </ul>
                                <button onClick={() => this.props.history.push(`/list/${list.id}`)}>View</button>
                                <button onClick={() => 
                                    {
                                        navigator.clipboard.writeText(`http://localhost:3000/share/${list.id}`);
                                        alert('A shareable link has been copied to your clipboard.')
                                    }
                                    
                                }>Share</button>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        )
    }
}