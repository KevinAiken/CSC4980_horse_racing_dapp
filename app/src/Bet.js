import React, {Component} from "react";
import AppNavbar from "./AppNavbar";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './Bet.css';
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
                <h1 className="display-3">Select your horse and race, then place a bet.</h1>
                <FormGroup>
                    <Label for="horses" className="horseLabel">Horses</Label>
                    <Input type="select" name="selectHorse" id="horseSelector">
                        <option>God's Wraith</option>
                        <option>Majestic Thunder</option>
                        <option>Brick</option>
                        <option>Rigatoni Fastaroni</option>
                        <option>John Adams</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="races" className="horseLabel">Races</Label>
                    <Input type="select" name="selectRace" id="raceSelector">
                        <option>Filler value</option>
                        <option>Filler value</option>
                        <option>Filler value</option>
                        <option>Filler value</option>
                        <option>Filler value</option>
                    </Input>
                </FormGroup>
                <input type="text" onKeyDown={this.handleKeyDown} />
                <Button color="success" className="button">Bet</Button>
                <div>{this.getTxStatus()}</div>
            </div>
        );
    }
}

export default Bet;