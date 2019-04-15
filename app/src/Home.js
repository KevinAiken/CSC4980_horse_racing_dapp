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
            } else if(drizzleState.web3.status === 'failed') {
                this.setState({loading: 'failed'});
            }
        });
    }

    /*
    This method will run after the home component is unmounted
     */
    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        // if web3 connection has failed, display failure
        // if loading display loading
        // once loaded display content
        if (this.state.loading === 'failed') {
                return (<div className="App">
                <AppNavbar/>
                <p>Connection to Blockchain has failed. Is Metamask installed and access granted?</p>
                </div>);
        } else if (this.state.loading) {
            return (<div className="App">
                <AppNavbar/>
                <p>Connecting to Blockchain via injected Web3</p>
            </div>);
        } else {
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
}

export default Home;