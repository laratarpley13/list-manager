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
                <header>
                    <h3>List Manager</h3>
                    <button onClick={() => this.props.history.push('/create-list')}>Add List</button>
                    <button onClick={() => this.logout()}>Log Out</button>
                </header>
                <section className='dashboard-page'>
                    <h1>Dashboard</h1>
                    <div className="lists">
                        {lists.map((list) => 
                            <div key={list.id} className="list-preview" onClick={() => this.props.history.push(`/list/${user.id}/${list.id}`)}>
                                <h3>{list.name}</h3>
                                <div className="button" onClick={(e) => 
                                    {
                                        e.stopPropagation()
                                        navigator.clipboard.writeText(`https://list-manager.vercel.app/list/${user.id}/${list.id}`);
                                        alert('A shareable link has been copied to your clipboard.')
                                    }
                                    
                                }><i className="fas fa-share-square button"></i></div>
                                <ul>
                                    {items.filter(item => item.listid === list.id).map(filteredItem => (
                                        <li key={filteredItem.id} className={`preview-item ${filteredItem.active ? 'check-item': null}`}>{filteredItem.name}</li>
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