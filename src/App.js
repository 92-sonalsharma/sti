import React, { Component } from "react";
import "./App.css";
import ClientList from "./components/client/js/ManageClients";
import Client from "./components/client/js/Client";
import { Route, Switch } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Jumbotron,
  Container
} from "react-bootstrap";

function HomePage() {
  return (
    <div>
      <Jumbotron fluid>
        <Container>
          <h1>IQVIA-STI</h1>
          <p>
            IQVIA-STI is in the business of generating and managing pharmacy
            discount cards for their pharma customers.
          </p>
          <hr class="my-4" />
          <p className="App-intro">
            To get started, <code>register</code> yourself.
          </p>
          <a class="btn btn-primary btn-lg" href="#" role="button">
            Sign Up
          </a>
        </Container>
      </Jumbotron>
    </div>
  );
}

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">IQVIA-STI</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Invoicing" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/clients">
              Manage Invoice Tables
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link href="#">
          <span className="glyphicon glyphicon-log-in" /> Login
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
          <Route path="/modifyClient" component={Client} />
          <Route path="/modifyClient/edit/:id" component={Client} />
        </Switch>
      </div>
    );
  }
}

export default App;
