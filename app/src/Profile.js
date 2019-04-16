import React, {Component} from "react";

/*
This page shows the user their ethereum address and balance
 */
class Profile extends Component {
    state = { dateKey: null, accountAddress: null, accountBalance: null };

    componentDidMount() {
        const {drizzle} = this.props;
        const contract = drizzle.contracts.MyStringStore;

        const dataKey = contract.methods["myString"].cacheCall();


        drizzle.web3.eth.getAccounts().then(e => this.setState({ accountAddress: e[0]}));

        drizzle.web3.eth.getAccounts().then(e => drizzle.web3.eth.getBalance(e[0])
            .then(z => this.setState({ accountBalance: (z/1000000000000000000).toFixed(3)})));

        this.setState({ dataKey });
    }


    render() {
        const { MyStringStore } = this.props.drizzleState.contracts;

        const myString = MyStringStore.myString[this.state.dataKey];


        return (
            <div>
                <p>Your Ethereum Address: {this.state.accountAddress}</p>
                <p>Balance: {this.state.accountBalance} eth</p>
                {/*<p>My stored string for example purposes: {myString && myString.value}</p>*/}
            </div>
        );
    }
}

export default Profile;