import {Component} from "react";
import React from "react";
import AppNavbar from "./AppNavbar";

class Home extends Component {

    render() {
        return (
            <div className="App">
                <AppNavbar/>
                <p>Home page goes here</p>
            </div>
        );
    }
}

export default Home;