import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './Home';
import Profile from './Profile';
import PastRaces from './PastRaces';
import Bet from './Bet';
import AppNavbar from "./AppNavbar";
import {Alert} from "reactstrap";
import Admin from "./Admin";


class App extends Component {
    state = {loading: true, drizzleState: null};

    componentDidMount() {
        const { drizzle } = this.props;

        this.unsubscribe = drizzle.store.subscribe(() => {
            const drizzleState = drizzle.store.getState();

            if (drizzleState.drizzleStatus.initialized) {
                this.setState({loading: false, drizzleState});
            } else if (drizzleState.web3.status === 'failed') {
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

    // setting up routes here so entering URLs will load specific components
    render() {
        if (this.state.loading === 'failed') {
            return (
                <div>

                    <Router>
                        <Alert color="danger">
                            Connecting to the blockchain has failed. Is Metamask installed and permission granted?
                        </Alert>
                        <div className='App'>
                        </div>
                    </Router>
                </div>);
        } else if (this.state.loading) {
            return (
                <div>
                    <Router>
                        <AppNavbar/>
                        <div className='App'>
                            <p>Connecting to Blockchain via injected Web3...</p>
                        </div>
                    </Router>
                </div>)
        } else {
            return (
                <Router>
                    <AppNavbar/>
                    <div className='App'>
                        <Switch>
                            <Route path='/' exact={true} component={Home}/>
                            <Route path='/bet' exact={true} render={(props) => <Bet drizzle={this.props.drizzle}
                                                                                       drizzleState={this.state.drizzleState}/>}/>
                            <Route path='/past-races' exact={true}
                                   render={(props) => <PastRaces drizzle={this.props.drizzle}
                                                               drizzleState={this.state.drizzleState}/>}/>
                            <Route path='/profile' exact={true} render={(props) => <Profile drizzle={this.props.drizzle}
                                                                                               drizzleState={this.state.drizzleState}/>}/>
                            <Route path='/admin' exact={true} render={(props) => <Admin drizzle={this.props.drizzle}
                                                                                        drizzleState={this.state.drizzleState}/>}/>
                        </Switch>
                    </div>
                </Router>
            );
        }
    }
}

export default App;
