import React, {Component} from "react";
import {Button, Input, Label, Table} from "reactstrap";

/*
This page allows players to view upcoming races and place bets
 */
class Admin extends Component {
    state = { stackId: null, dataKey: null, races: [],
        raceTime: "2019-04-10T10:30:00-0400", password: "", password2: "",
        raceSelection: ""};

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

    getTxStatus = () => {
        const {transactions, transactionStack } = this.props.drizzleState;

        const txHash = transactionStack[this.state.stackId];

        if (!txHash) return null;
        if(typeof (transactions[txHash] && transactions[txHash].status) == 'undefined')
            return "Transaction status: Waiting on user to reply in MetaMask";
        else
            return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
    };

    createRace = (raceTime, password) => {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.HorsEther;

        var raceDate = new Date(raceTime);
        var resultUnixTimeStamp = raceDate.getTime();

        console.log(resultUnixTimeStamp);
        const stackId = contract.methods["createRace"].cacheSend([32, 77, 63, 22, 51], resultUnixTimeStamp/1000, password, {
            from: drizzleState.accounts[0]
        });

        this.setState({ stackId });
    };

    evaluateRace = (raceSelection, password) => {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.HorsEther;

        const stackId = contract.methods["evaluateRace"].cacheSend(raceSelection, password, {
            from: drizzleState.accounts[0]
        });

        this.setState({ stackId });
    };

    async getRaces(numberOfRaces) {
        const { drizzle } = this.props;
        const contract = drizzle.contracts.HorsEther;

        let races = [];

        for(let i=0; i < numberOfRaces; i++){
            let inside = [];
            let race = await contract.methods["getRace"](i).call();
            inside.push(<td key={1}>{i}</td>);
            inside.push(<td key={2}>{race[0].length}</td>);
            inside.push(<td key={3}>{race[1].toString()}</td>);
            console.log(race[2]);
            let dateTime = new Date(race[2]*1000);
            inside.push(<td key={4}>{dateTime.toLocaleTimeString() + " " + (dateTime.getMonth()+1) + "/" +
                        dateTime.getDate() +"/"+ dateTime.getFullYear()}</td>);
            inside.push(<td key={5}>{race[3]}</td>);
            if(race[4] != -1){
                inside.push(<td key={6}>{parseInt(race[4]) + 1}</td>)
            } else {
                inside.push(<td key={6}>Not Evaluated</td>)
            }

            races.push(await <tr key={i}>{inside}</tr>);
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
                <div>
                <Label>
                    Race Time
                    <Input type="datetime-local"
                        name="raceTime" value={this.state.raceTime} onChange={this.handleInputChange}/>
                </Label>
                <Label>
                    Admin Password
                    <Input type="password"
                           name="password" value={this.state.password} onChange={this.handleInputChange}/>
                </Label>
                <Button style={{margin: '10px'}} onClick={() =>
                        this.createRace(this.state.raceTime, this.state.password)}>
                    Create a race
                </Button>
                </div>
                <div>{this.getTxStatus()}</div>

                <p>Overall Number of races: {numberOfRaces && numberOfRaces.value}</p>

                <div>
                    <Label>
                        Race
                        <Input type="text"
                               name="raceSelection" value={this.state.raceSelection} onChange={this.handleInputChange}/>
                    </Label>
                    <Label>
                        Admin Password
                        <Input type="password"
                               name="password2" value={this.state.password2} onChange={this.handleInputChange}/>
                    </Label>
                    <Button style={{margin: '10px'}} onClick={() =>
                        this.evaluateRace(this.state.raceSelection, this.state.password2)}>
                        Evaluate Race
                    </Button>
                </div>

                <Button style={{margin: '10px'}} color="warning" className="button" onClick={() =>
                    this.getRaces(numberOfRaces && numberOfRaces.value)}>
                    Load Races
                </Button>

                <Table hover>
                    <thead>
                    <tr>
                        <th>Race Index</th>
                        <th>Number of horses</th>
                        <th>Race Evaluated</th>
                        <th>Race Time</th>
                        <th>Number of Bets Placed</th>
                        <th>Winner</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.races}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Admin;