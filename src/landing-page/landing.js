import React, { Component } from 'react';
import './landing.css';

export default class Landing extends Component {
    render() {
        return (
            <div>
                <nav>
                    <h3>List Manager</h3>
                    <button onClick={() => this.props.history.push('/sign-up')}>Sign Up</button>
                    <button onClick={() => this.props.history.push('/sign-in')}>Sign In</button>
                </nav>
                <section className='landing-page'>
                    <h1>Organize, Share, and Manage Your Lists</h1>
                    <p>Create multiple lists, check off items as you complete them, and share an un-editable list with your partner, friend, family member to help you complete your tasks together.</p>
                    <button>Explore More</button>
                </section>
            </div>
        )
    }
}