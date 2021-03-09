import React, { Component } from 'react';
import Context from '../Context';
import './share.css';

export default class Share extends Component {
    static contextType = Context;

    state = {
        targetList: this.context.lists.filter(list => list.id === parseInt(this.props.match.params.listId))[0],
        items: this.context.items.filter(item => item.listId === parseInt(this.props.match.params.listId)),
    }

    toggleClass = (selectedItem) => {
        const currentState = selectedItem.active;

        const toggleSelectedItem = {
            id: selectedItem.id,
            name: selectedItem.name,
            description: selectedItem.description,
            listId: parseInt(this.props.match.params.listId),
            active: !currentState
        }

        this.setState({
            items: this.state.items.map(item =>
            (item.id !== selectedItem.id) ? item : toggleSelectedItem)
        })
    }

    /*  
        Will need to add method to get specific list for specific user 
        once back-end api has been set up so this section can be stand alone?
    */

    render() {
        /* const { lists, items } = this.context

        const targetListId = parseInt(this.props.match.params.listId);
        let targetList = lists.filter(list => list.id === targetListId);
        targetList = targetList[0]; */
        console.log(this.state.targetList) //debugging
        console.log(this.state.items) //debugging

        return (
            <div>
                <nav>
                    <h3>List Manager</h3>
                    <button onClick={() => this.props.history.push('/')}>Home</button>
                    <button onClick={() => this.props.history.push('/sign-in')}>Sign In</button>
                </nav>
                <section className='share-list-view'>
                    <h1>{this.state.targetList.name}</h1>
                    <p>{this.state.targetList.description}</p>
                    <ul classname="list-items">
                        {this.state.items.map(item => 
                            <li key={item.id}>
                                <h4 className={item.active ? 'check-item': null}>{item.name}</h4>
                                <p>{item.description}</p>
                                {item.active
                                    ? <button onClick={() => this.toggleClass(item)}>Un-Check</button>
                                    : <button onClick={() => this.toggleClass(item)}>Check-Off</button>
                                }
                            </li>    
                        )}
                    </ul>
                </section>
            </div>
        )
    }
}