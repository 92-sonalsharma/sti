import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <nav class="navbar navbar-inverse">
            <div class="container-fluid">
              <div class="navbar-header">
                <a class="navbar-brand" href="#">
                  IQVIA-STI
                </a>
              </div>
              <ul class="nav navbar-nav">
                <li class="active">
                  <a href="#">Home</a>
                </li>
                <li class="dropdown">
                  <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                    Invoicing
                    <span class="caret" />
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <a href="#">Manage Invoice Tables</a>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul class="nav navbar-nav navbar-right">
                {/* <li>
                  <a href="#">
                    <span class="glyphicon glyphicon-user" /> Sign Up
                  </a>
                </li> */}
                <li>
                  <a href="#">
                    <span class="glyphicon glyphicon-log-in" /> Login
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
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
          <a class="btn btn-primary btn-lg" href="#" role="button">
            Sign Up
          </a>
        </div>
      </div>
    );
  }
}

export default App;
