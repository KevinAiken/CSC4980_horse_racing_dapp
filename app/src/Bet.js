import React, {Component} from "react";
import { Button, FormGroup, Label, Input} from 'reactstrap';
import './Bet.css';

/*
This page allows players to view upcoming races and place bets
 */
class Bet extends Component {
    state = { stackId: null, dataKey: null };

    componentDidMount() {
            const {drizzle} = this.props;
            const contract = drizzle.contracts.HorsEther;

            const dataKey = contract.methods["getAllRaces"].cacheCall();

            this.setState({ dataKey });
    }


    placeBet = (horse, race, amount) => {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.HorsEther;

        //todo replace this with actual parameters for createbet
        const stackId = contract.methods["createBet"].cacheSend(horse, race, amount, {
            from: drizzleState.accounts[0], value: 1000000000000000000
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
        const { HorsEther } = this.props.drizzleState.contracts;

        const myString = HorsEther.getAllRaces[this.state.dataKey];

        return (
            <div>
                <h1>Select your horse and race, then place a bet.</h1>
                <p>{myString && myString.value}</p>
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
                <input type="text" /> Ether
                <Button color="success" className="button" onClick={() => this.placeBet(1, 3, 1)}>Bet</Button>
                <div>Transaction Status: {this.getTxStatus()}</div>
            </div>
        );
    }
}

export default Bet;