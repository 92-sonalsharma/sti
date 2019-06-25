import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ClientList from './components/client/js/ManageClients'
import { Route, Switch, Link } from 'react-router-dom';
import {Navbar, Nav, NavDropdown,Button} from 'react-bootstrap';

function HomePage(){
  return(
    <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-4">IQVIA-STI</h1>
            <p class="lead">
              IQVIA-STI is in the business of generating and managing pharmacy
              discount cards for their pharma customers.
            </p>
          </div>
          <hr class="my-4" />
          <p className="App-intro">
            To get started, <code>register</code> yourself.
          </p>
          <Button variant="outline-primary">Sign Up</Button>
        </div>
  );
}

function NavBar(){
  return(
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
  <Navbar.Brand href="/">IQVIA-STI</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <NavDropdown title="Invoicing" id="collasible-nav-dropdown">
        <NavDropdown.Item href="/clients">Manage Invoice Tables</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav>
      <Nav.Link href="#deets">
                    <span class="glyphicon glyphicon-log-in" /> Login
                  </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
  );
}

class App extends Component {
  render() {
    return (
      <div>
      <NavBar />
        <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/clients" component={ClientList} />
      </Switch>
      </div>
    );
  }
}

export default App;
