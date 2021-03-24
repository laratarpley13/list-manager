import React, { Component } from 'react';
import './landing.css';

export default class Landing extends Component {
    render() {
        return (
            <div>
                <header>
                    <h3>List Manager</h3>
                    <button onClick={() => this.props.history.push('/sign-up')}>Sign Up</button>
                    <button onClick={() => this.props.history.push('/sign-in')}>Sign In</button>
                </header>
                <section className='landing-page'>
                    <h1>Organize, Share, and Manage Your Lists</h1>
                    <p>How it works: Get a preview of all your lists and items, create new lists, add items within a list, cross of items as you complete them, and share a list with a friend to help you complete your tasks and goals.</p>
                </section>
            </div>
        )
    }
}