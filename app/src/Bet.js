import React, {Component} from "react";
import {Button, Input, Label, Table} from 'reactstrap';

/*
This page allows players to view upcoming races and place bets
 */
class Bet extends Component {
    state = {stackId: null, dataKey: null, raceSelected: 0, horseSelected: 0, betAmount: 0.00, races: []};

    // only here to bind the handleInputChange method
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        const {drizzle} = this.props;
        const contract = drizzle.contracts.HorsEther;

        const dataKey = contract.methods["getNumberOfRaces"].cacheCall();

        this.setState({dataKey: dataKey});
    }

    placeBet = (race, horse, amount) => {
        console.log("Placing bet on race " + race + " for horse " + horse + " in the amount of " +
            amount + " ETH");
        const {drizzle, drizzleState} = this.props;
        const contract = drizzle.contracts.HorsEther;

        const stackId = contract.methods["createBet"].cacheSend(race, horse, amount * 1000000000000000000 , {
            from: drizzleState.accounts[0], value: amount * 1000000000000000000
        });

        this.setState({stackId: stackId});
    };

    // Live updates transaction status
    getTxStatus = () => {
        const {transactions, transactionStack} = this.props.drizzleState;

        const txHash = transactionStack[this.state.stackId];

        if (!txHash) return null;

        if (typeof (transactions[txHash] && transactions[txHash].status) == 'undefined')
            return "Transaction status: Waiting on user to reply in MetaMask";
        else
            return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
    };

    async getRaces(numberOfRaces) {
        const { drizzle } = this.props;
        const contract = drizzle.contracts.HorsEther;

        let races = [];

        for(let i=0; i < numberOfRaces; i++){
            let inside = [];
            let race = await contract.methods["getRace"](i).call();
            let dateTime = new Date(race[2]*1000);

            let now = new Date();
            if(dateTime > now)  {
                inside.push(<td key={1}>{i}</td>);
                inside.push(<td key={2}>{race[0].length}</td>);
                inside.push(<td key={5}>{race[3]}</td>);

                inside.push(<td key={4}>{dateTime.toLocaleTimeString() + " " + (dateTime.getMonth() + 1) + "/" +
                dateTime.getDate() + "/" + dateTime.getFullYear()}</td>);


                races.push(await <tr key={i}>{inside}</tr>);
            }
        }
        console.log(races);

        this.setState({ races: races })
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const {HorsEther} = this.props.drizzleState.contracts;

        const numberOfRaces = HorsEther.getNumberOfRaces[this.state.dataKey];
        return (
            <div className="container">
                <h2 style={{margin: '18px',}}>Upcoming Races</h2>
                <Button style={{margin: '10px'}} color="warning" className="button" onClick={() =>
                    this.getRaces(numberOfRaces && numberOfRaces.value)}>
                    Load Races
                </Button>
                <Table hover>
                    <thead>
                    <tr>
                        <th>Race</th>
                        <th>Number of Horses</th>
                        <th>Total Bets</th>
                        <th>Race Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.races}
                    </tbody>
                </Table>


                <h2>Place Bets</h2>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <Label>
                            Race
                            <Input type="number" placeholder="Race" name="raceSelected"
                                   value={this.state.raceSelected} onChange={this.handleInputChange}/>
                        </Label>
                    </div>
                    <div className="form-group col-md-4">
                        <Label>Horse
                            <Input type="select" name="horseSelected" onChange={this.handleInputChange}
                                   id="horseSelector" value={this.state.horseSelected}>
                                <option selected>Select a Horse...</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </Input>
                        </Label>
                    </div>
                    <div className="form-group col-md-4">
                        <Label>
                            Bet Amount (ETH)
                            <Input type="number" step="0.01" min="0.00" placeholder="Bet Amount" name="betAmount"
                                   value={this.state.betAmount} onChange={this.handleInputChange}/>
                        </Label>
                    </div>
                </div>
                <Button color="warning" className="button" onClick={() =>
                    this.placeBet(this.state.raceSelected, this.state.horseSelected-1, this.state.betAmount)}>
                    Bet
                </Button>
                <div>{this.getTxStatus()}</div>
            </div>
        );
    }
}

export default Bet;