import React, {Component} from "react";
import AppNavbar from "./AppNavbar";
// import SetString from "./SetString";
// import ReadString from "./ReadString";

/*
This page allows players to view upcoming races and place bets
 */
class Bet extends Component {
    state = { stackId: null };

    handleKeyDown = e => {
        if (e.keyCode === 13) {
            this.setValue(e.target.value);
        }
    };

    setValue = value => {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.MyStringStore;

        const stackId = contract.methods["set"].cacheSend(value, {
            from: drizzleState.accounts[0]
        });

        this.setState({ stackId });
    };

    getTxStatus = () => {
        const {transactions, transactionStack } = this.props.drizzleState;

        const txHash = transactionStack[this.state.stackId];

        if (!txHash) return null;
        if(typeof (transactions[txHash] && transactions[txHash].status) == 'undefined')
            return "Transaction status: Waiting on user to reply in MetaMask";
        else
            return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
    };

    render() {
        return (
            <div>
                <input type="text" onKeyDown={this.handleKeyDown} />
                <div>{this.getTxStatus()}</div>
                <p>This page should allow a user to view horses to bet on and place bets</p>
            </div>
        );
    }
}

export default Bet;