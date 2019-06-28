import React from "react";
import { Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

class ClientList extends React.Component {
  state = {
    users: []
  };

  getUsers = async () => {
    const resp = await fetch("https://localhost:3030/companys", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await resp.json();
    console.log(data);
    this.setState(...this.state, { users: data });
    console.log(this.state);
  };

  /**
   * forwards edit request
   */
  editClient = async event => {
    console.log("event :: ", event.target.id);
  };

  componentWillMount() {
    this.getUsers();
  }

  /* componentDidMount() {
    this.timer = setInterval(() => this.getUsers(), 5000);
  } */

  render() {
    return (
      <Container>
        <div>
          {/* <h4>Client Information</h4> */}

          <Link to={`/modifyClient`}>
            <span className="glyphicon glyphicon-plus" />
            <Button variant="outline-primary" style={{ margin: "20px" }}>
              Add Client
            </Button>
          </Link>

          {this.state.users.map(item => (
            <ClientItem user={item} />
          ))}
        </div>
      </Container>
    );
  }
}

function ClientItem(props) {
  return (
    <div>
      <Card style={{ width: "50rem", margin: "auto" }}>
        <Card.Body>
          <Card.Title>{props.user.abbreviation}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Id: {props.user.id}
          </Card.Subtitle>
          <Card.Text>
            <span>Company: {props.user.companyName}</span>
          </Card.Text>
          <Link
            to={{
              pathname: "/modifyClient/edit",
              state: {
                id: props.user.id
              }
            }}
          >
            Edit
          </Link>
          {/* <Card.Link href="#">Delete</Card.Link> */}
        </Card.Body>
      </Card>
    </div>
  );
}
export default ClientList;
