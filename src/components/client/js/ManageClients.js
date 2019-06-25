import React from 'react';
import { Card } from 'react-bootstrap';

class ClientList extends React.Component {

    state = {
        users: []
    };

    getUsers = async () => {
        const resp = await fetch('http://172.16.6.77:9090/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await resp.json();;
        console.log(data);
        this.setState(...this.state, { users: data });
        console.log(this.state);
    }

    componentWillMount(){
        this.getUsers();
    }

    componentDidMount(){
        this.timer = setInterval(()=> this.getUsers(), 5000)
       }

    render() {
        return (
            <div>
                Client list here!
                {this.state.users.map(item => (<ClientItem user={item} />))}
            </div>
        );
    }
}

function ClientItem(props) {
    return (

        <div> 
            <Card style={{ width: '50rem',margin :'auto' }}>
                <Card.Body>
                    <Card.Title>{props.user.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">SSN: {props.user.ssn}</Card.Subtitle>
                    <Card.Text>
                        <span style={{ margin: '0 2rem' }}>Company: {props.user.company}</span>
                        <span style={{ margin: '0 2rem' }}>Email: {props.user.emailId}</span>
                    </Card.Text>
                    <Card.Link href="#">Edit</Card.Link>
                    <Card.Link href="#">Delete</Card.Link>
                </Card.Body>
            </Card>
        </div>

    );
}
export default ClientList;