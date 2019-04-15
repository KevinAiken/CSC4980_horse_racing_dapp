import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from './HorsEther.PNG';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <Navbar color="light" light expand="md" background-color="#e3f2fd">
            <NavbarBrand tag={Link} to="/">
                <img src={logo} style={{width:75}}/>
                HorsEther
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/bet">Place Bets</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/past-races">Past Races</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/profile">Profile</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>;
    }
}