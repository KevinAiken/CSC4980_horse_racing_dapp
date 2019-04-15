import React, {Component} from 'react';
import './App.css';
import Home from './Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import About from './About';
import NetworkInfo from './NetworkInfo';

import {Drizzle} from "drizzle";
import MyStringStore from "./contracts/MyStringStore.json";

const drizzleOptions = {
    contracts: [MyStringStore],
    web3: {
        fallback: {
            type: "ws",
            url: "", //setting this will override the default, making drizzle fail if metamask is not installed
        },
    },
};

// instantiating drizzle

const drizzle = new Drizzle(drizzleOptions);

class App extends Component {
    // setting up routes here so entering URLs will load specific components
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={(props) => <Home drizzle={drizzle}/>}/>
                    <Route path='/about' exact={true} component={About}/>
                    <Route path='/network-info' exact={true} component={NetworkInfo}/>
                </Switch>
            </Router>
        )
    }
}

export default App;
