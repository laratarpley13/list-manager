import React, { Component } from 'react';
import Context from '../Context';
import TokenService from '../services/token-service';
import './dashboard.css';

export default class Dashboard extends Component {
    static contextType = Context;

    logout = () => {
        TokenService.clearAuthToken();
        this.props.history.push('/')
    }

    render() {
        const { user, lists, items } = this.context;

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
                                {/* <p>Date Created: {list.date}</p> */}
                                <button onClick={() => this.props.history.push(`/list/${user.id}/${list.id}`)}>View</button>
                                <button onClick={() => 
                                    {
                                        navigator.clipboard.writeText(`http://localhost:3000/list/${user.id}/${list.id}`);
                                        alert('A shareable link has been copied to your clipboard.')
                                    }
                                    
                                }>Share</button>
                                <ul>
                                    {items.filter(item => item.listid === list.id).map(filteredItem => (
                                        <li key={filteredItem.id} className={filteredItem.active ? 'check-item': null}>{filteredItem.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        )
    }
}