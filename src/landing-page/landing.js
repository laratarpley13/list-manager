import React from 'react';
import './landing.css';

export default function Landing() {
    return (
        <div>
            <nav>
                <h3>List Manager</h3>
                <button onClick>Sign Up</button>
                <button>Sign In</button>
            </nav>
            <section className='landing-page'>
                <h1>Organize, Share, and Manage Your Lists</h1>
                <p>Create multiple lists, check off items as you complete them, and share an un-editable list with your partner, friend, family member to help you complete your tasks together.</p>
                {/* <button>Explore More</button> */}
            </section>
        </div>
    )
}