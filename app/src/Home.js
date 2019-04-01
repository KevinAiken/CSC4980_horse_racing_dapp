import Web3 from "web3";
import {Component} from "react";
import React from "react";
import AppNavbar from "./AppNavbar";

const web3 = new Web3(Web3.givenProvider);

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { accounts: []};
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        web3.eth.getAccounts().then(data => this.setState({ accounts: data}));
    }


    render() {
        const { accounts } = this.state;
        return (
            <div className="App">
                <AppNavbar/>
                <header className="App-header">
                    <p>
                        Your ethereum account is: {accounts[0]}
                    </p>
                </header>
            </div>
        );
    }
}

export default Home;