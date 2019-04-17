import React, {Component} from "react";

/*
This page shows the user their ethereum address and balance
 */
class Profile extends Component {
    state = { dateKey: null, accountAddresses: null, accountBalance: null };

    componentDidMount() {
        const {drizzle} = this.props;

        drizzle.web3.eth.getAccounts().then(e => this.setState({ accountAddresses: e[0]}));

        drizzle.web3.eth.getAccounts().then(e => drizzle.web3.eth.getBalance(e[0])
            .then(z => this.setState({ accountBalance: (z/1000000000000000000).toFixed(3)})));
    }


    render() {

        return (
            <div>
                <h1>Your Profile</h1>

                <p>Your Ethereum Address: {this.state.accountAddresses}</p>
                <p>Balance: {this.state.accountBalance} ETH</p>
            </div>
        );
    }
}

export default Profile;