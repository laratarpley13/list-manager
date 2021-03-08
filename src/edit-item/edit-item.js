import React, { Component } from 'react';
import Context from '../Context';
import TokenService from '../services/token-service';
import './edit-item.css';

export default class EditItem extends Component {
    static contextType = Context;

    logout = () => {
        TokenService.clearAuthToken();
        this.props.history.push('/landing')
    }

    render() {
        const { items } = this.context
        const targetItemId = parseInt(this.props.match.params.itemId)
        let targetItem = items.filter(item => item.id === targetItemId);
        targetItem = targetItem[0];

        return (
            <div>
                <nav>
                    <h3>List Manager</h3>
                    <button onClick={() => this.props.history.goBack()}>Cancel</button>
                    <button onClick={() => this.logout()}>Log Out</button>
                </nav>
                <section className='edit-item-form'>
                    <h1>Edit Item</h1>
                    <form onSubmit={e => {
                        this.props.handleItemEdit(e, targetItem);
                        this.props.history.goBack();
                    }}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" defaultValue={targetItem.name} />
                        <br />
                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" name="description" defaultValue={targetItem.description} />
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                </section>
            </div>
        )
    }
}