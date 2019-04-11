import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './About';
import NetworkInfo from './NetworkInfo';


class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/about' exact={true} component={About}/>
                    <Route path='/network-info' exact={true} component={NetworkInfo}/>
                </Switch>
            </Router>
        )
    }
}

export default App;
