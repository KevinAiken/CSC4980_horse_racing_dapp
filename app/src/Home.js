import React, {Component} from "react";
import {Button, Jumbotron, NavItem, NavLink} from "reactstrap";
import {Link} from "react-router-dom";

/*
This page introduces HorsEther to the user
 */
class Home extends Component {
    render() {
        return (
            <div className="container">
                <Jumbotron>
                    <h1 className="display-3">Welcome to HorsEther</h1>
                    <p className="lead">Place bets on simulated horse races with Ethereum</p>
                    <hr className="my-2" />
                    <p>Click below to start placing bets.</p>
                    <p className="lead">
                        <Button color="warning"><Link  to='/bet' style={{ textDecoration: 'none', color: 'black' }}>Get Started</Link></Button>
                    </p>
                </Jumbotron>
            </div>
        );
    }
}

export default Home;