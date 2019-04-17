import React, {Component} from "react";
import {Button, Table} from 'reactstrap';

/*
This page introduces HorsEther to the user
 */
class PastRaces extends Component {
    state = { stackId: null, dataKey: null, races: []};

    componentDidMount() {
        const {drizzle} = this.props;
        const contract = drizzle.contracts.HorsEther;

        const dataKey = contract.methods["getNumberOfRaces"].cacheCall();

        this.setState({dataKey: dataKey});
    }

    async getRaces(numberOfRaces) {
        const { drizzle } = this.props;
        const contract = drizzle.contracts.HorsEther;

        let races = [];

        for(let i=0; i < numberOfRaces; i++){
            let inside = [];
            let race = await contract.methods["getRace"](i).call();

            let dateTime = new Date(race[2]*1000);
            let now = new Date();
            if(dateTime < now) {

                inside.push(<td key={1}>{i}</td>);
                inside.push(<td key={2}>{race[0].length}</td>);
                if (race[1]) {
                    inside.push(<td key={3}>Yes</td>);
                } else {
                    inside.push(<td key={3}>No</td>);
                }
                inside.push(<td key={4}>{dateTime.toLocaleTimeString() + " " + (dateTime.getMonth() + 1) + "/" +
                dateTime.getDate() + "/" + dateTime.getFullYear()}</td>);
                inside.push(<td key={5}>{race[3]}</td>);
                if (race[4] != -1) {
                    inside.push(<td key={6}>{parseInt(race[4]) + 1}</td>)
                } else {
                    inside.push(<td key={6}>Not Evaluated</td>)
                }

                races.push(await <tr key={i}>{inside}</tr>);
            }
        }
        console.log(races);

        this.setState({ races: races })
    };

    render() {

        const {HorsEther} = this.props.drizzleState.contracts;

        const numberOfRaces = HorsEther.getNumberOfRaces[this.state.dataKey];

        let headerS = {margin: '18px',};

        return (
            <div>
                <h1 style={headerS}>Past Races Results</h1>
                <Button style={{margin: '10px'}} color="warning" className="button" onClick={() =>
                    this.getRaces(numberOfRaces && numberOfRaces.value)}>
                    Load Races
                </Button>

                <Table hover>
                    <thead>
                    <tr>
                        <th>Race</th>
                        <th>Number of Horses</th>
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

export default PastRaces;