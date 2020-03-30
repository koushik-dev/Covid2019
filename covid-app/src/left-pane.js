import React from 'react';
import './left-pane.css';

function LeftPane({ children }) {
    return (
        <div className="left-pane">
            <h2>COVID-19 Tracker</h2>
            { children }
        </div>
    )
}

export default LeftPane;