import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import HorsEther from "./contracts/HorsEther";
import {Drizzle} from "drizzle";

const drizzleOptions = {
    contracts: [HorsEther],
    web3: {
        fallback: {
            type: "ws",
            url: "", //setting this will override the default, making drizzle fail if metamask is not installed
        },
    },
};

// instantiating drizzle

const drizzle = new Drizzle(drizzleOptions);
ReactDOM.render(<App drizzle={drizzle}/>, document.getElementById('root'));


