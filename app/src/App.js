import React, {Component} from 'react';
import './App.css';
import Home from './Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import About from './About';
import NetworkInfo from './NetworkInfo';

import {Drizzle} from "drizzle";
import MyStringStore from "./contracts/MyStringStore.json";

const options = {
    contracts: [MyStringStore],
    web3: {
        fallback: {
            type: "ws",
            url: "ws://127.0.0.1:8545",
        },
    },
};

const drizzle = new Drizzle(options);

class App extends Component {
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
