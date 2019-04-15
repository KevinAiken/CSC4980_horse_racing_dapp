import React, {Component} from "react";

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

        return (
            <div>
                <p>Races that took place in the past go here, with the outcome</p>
                <p>My stored string for example purposes: {myString && myString.value}</p>
            </div>
        );
    }
}

export default PastRaces;