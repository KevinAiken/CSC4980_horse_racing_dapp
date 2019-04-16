import React, {Component} from "react";
import {Button} from "reactstrap";

/*
This page allows players to view upcoming races and place bets
 */
class Admin extends Component {
    state = { stackId: null };

    getTxStatus = () => {
        const {transactions, transactionStack } = this.props.drizzleState;

        const txHash = transactionStack[this.state.stackId];

        if (!txHash) return null;
        if(typeof (transactions[txHash] && transactions[txHash].status) == 'undefined')
            return "Transaction status: Waiting on user to reply in MetaMask";
        else
            return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
    };

    createRace = () => {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.HorsEther;

        const stackId = contract.methods["createRace"].cacheSend({
            from: drizzleState.accounts[0]
        });

        this.setState({ stackId });
    };

    render() {
        return (
            <div>
                <Button onClick={() => this.createRace()}>Create a race</Button>
                <div>Transaction status: {this.getTxStatus()}</div>
            </div>
        );
    }
}

export default Admin;