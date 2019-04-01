import React, { Component } from 'react';
import AppNavbar from './AppNavbar';

class About extends Component {
    render() {
        return (
            <div className="App">
                <AppNavbar/>
                <header className="App-header">
                    <p>
                        This is an about page
                    </p>
                </header>
            </div>
        )
    }
}

export default About;