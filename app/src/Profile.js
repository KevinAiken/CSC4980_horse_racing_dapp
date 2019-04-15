import React, {Component} from "react";

/*
This page shows the user their ethereum address and balance
 */
class Profile extends Component {
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
                <p>This page should show the users address and eth</p>
                <p>My stored string for example purposes: {myString && myString.value}</p>
            </div>
        );
    }
}

export default Profile;