import React, {Component} from "react";
import AppNavbar from "./AppNavbar";
import SetString from "./SetString";
import ReadString from "./ReadString";

class Home extends Component {
    state = {loading: true, drizzleState: null};

    componentDidMount() {
        const {drizzle} = this.props;

        this.unsubscribe = drizzle.store.subscribe(() => {
            const drizzleState = drizzle.store.getState();

            if (drizzleState.drizzleStatus.initialized) {
                this.setState({loading: false, drizzleState});
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        if (this.state.loading) return (<div className="App">
            <AppNavbar/>
            <p>Loading Drizzle...</p>
        </div>);


        return (
            <div className="App">
                <AppNavbar/>
                <ReadString
                    drizzle={this.props.drizzle}
                    drizzleState={this.state.drizzleState}
                />
                <SetString
                    drizzle={this.props.drizzle}
                    drizzleState={this.state.drizzleState}
                />
            </div>
        );
    }
}

export default Home;