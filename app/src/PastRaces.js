import React, {Component} from "react";
import { Table } from 'reactstrap';
/*
This page introduces HorsEther to the user
 */
class PastRaces extends Component {
    state = { dateKey: null };

    componentDidMount() {
        const {drizzle} = this.props;
        const contract = drizzle.contracts.MyStringStore;

        const dataKey = contract.methods["myString"].cacheCall();

        this.setState({ dataKey });
    }

    render() {
        const { MyStringStore } = this.props.drizzleState.contracts;

        const myString = MyStringStore.myString[this.state.dataKey];
        
        let headerS = {margin: '18px',};

        return (
            <div>
                 {/* <p>Races that took place in the past go here, with the outcome</p>
                <p>My stored string for example purposes: {myString && myString.value}</p>  */}

                <h1 style={headerS}>Past Races Results</h1>
                <Table hover>
                    <thead>
                        <tr>
                            <th> Race ID </th>
                            <th> Winning Horse</th>
                            <th> Time </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> #2238 </td>
                            <td> Jeopardy </td>
                            <td> 15:04 </td>
                        </tr>
                        <tr>
                            <td> #2443 </td>
                            <td> Superman </td>
                            <td> 13:41 </td>
                        </tr>
                        <tr>
                            <td> #2678 </td>
                            <td> Sandwich </td>
                            <td> 09:36 </td>
                        </tr>
                        <tr>
                            <td> #2998 </td>
                            <td> Aloe </td>
                            <td> 07:10 </td>
                        </tr>
                    </tbody>
                </Table>
                
            </div>
        );
    }
}

export default PastRaces;