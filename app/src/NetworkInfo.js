import Web3 from "web3";
import {Component} from "react";
import React from "react";
import AppNavbar from "./AppNavbar";
import myData from './contracts/Race.json';

const rpcNetwork = 'http://localhost:8545';

const web3 = new Web3(new Web3.providers.HttpProvider(rpcNetwork));

const contractAddress = "0xD2A3eEe09BFc36d6d2087BC952Dba86873e2Cf74";
//const ethAccount = "";

//let myContract = new web3.eth.Contract(JSON.parse(myData), contractAddress);


class NetworkInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {accounts: []};
    }

    componentDidMount() {
        web3.eth.getAccounts().then(data => this.setState({ accounts: data}));
        web3.eth.getBalance("0x7b25699014D5Fb2fdc43692883416548C24e2C59")
            .then(data => this.setState({ balance: data}));
        //web3.eth.sendSignedTransaction()

    }

    render() {


        return (
            <div className="App">
                <AppNavbar/>
                <p>Network in use: {rpcNetwork}</p>
                <p>Accounts in web3.eth.getAccounts():
                    {this.state.accounts.map((account) => <li>{account}</li>)}
                </p>
                <p>Balance of the first account:
                    {this.state.balance}
                </p>
                <button onClick = {console.log("Hello")}>button</button>
            </div>
        );
    }
}

export default NetworkInfo;