import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';


const web3 = new Web3(Web3.givenProvider);
class App extends Component {

    constructor(props) {
        super(props);
        this.state = { accounts: []};
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        web3.eth.getAccounts().then(data => this.setState({ accounts: data}));
    }


  render() {
        const { accounts } = this.state;
        return (
          <div className="App">
            <header className="App-header">
              <p>
                Your ethereum account is: {accounts[0]}
              </p>
            </header>
          </div>
        );
  }
}

export default App;
