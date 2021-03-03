import React from 'react'
import './dashboard.css'

export default function Dashboard() {
    return(
        <div>
            <nav>
                <h3>List Manager</h3>
                <button>Add List</button>
                <button>Log Out</button>
            </nav>
            <section className='dashboard-page'>
                <h1>Dashboard</h1>
                <div className="lists">
                    <div className="list-preview">
                        <h3>Example 1</h3>
                        <p>Last Edited: 01/01/2021</p>
                        <p>This is an example description</p>
                        <ul>
                            <li>Item 1</li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                            <li>Item 4</li>
                            <li>Item 5</li>
                            <li>Item 6</li>
                            <li>Item 7</li>
                        </ul>
                        <button>View</button>
                        <button>Share</button>
                    </div>
                    <div className="list-preview">
                        <h3>Example 2</h3>
                        <p>Last Edited: 02/02/2021</p>
                        <p>This is an example description</p>
                        <ul>
                            <li>Item 1</li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                            <li>Item 4</li>
                            <li>Item 5</li>
                            <li>Item 6</li>
                            <li>Item 7</li>
                        </ul>
                        <button>View</button>
                        <button>Share</button>
                    </div>
                </div>
            </section>
        </div>
    )
}