import React, { Component } from 'react';
import Context from '../Context';
import TokenService from '../services/token-service';
import './edit-list.css';

export default class EditList extends Component {
    static contextType = Context;

    logout = () => {
        TokenService.clearAuthToken();
        this.props.history.push('/landing')
    }

    render() {
        const { lists } = this.context;
        const targetListId = parseInt(this.props.match.params.listId);
        let targetList = lists.filter(list => list.id === targetListId);
        targetList = targetList[0];

        return (
            <div>
                <nav>
                    <h3>List Manager</h3>
                    <button onClick={() => this.props.history.push(`/list/${targetListId}`)}>Cancel</button>                    
                    <button onClick={() => this.logout()}>Log Out</button>
                </nav>
                <section className='edit-list-form'>
                    <h1>Edit List</h1>
                    <form onSubmit={e => {
                        this.props.handleListEdit(e, targetListId)
                        this.props.history.push(`/list/${targetListId}`);
                    }}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" defaultValue={targetList.name} />
                        <br />
                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" name="description" defaultValue={targetList.description} />
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                </section>
            </div>
        )
    }
}