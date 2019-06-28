import React from "react";
import { Form, Button, Container, Col } from "react-bootstrap";
// import { Modal } from "react-bootstrap-modal";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import PropTypes from "prop-types";
// import App from ".../App";
import "react-tabs/style/react-tabs.css";
import "../css/Client.css";

class Client extends React.Component {
  state = {
    isBillingAddressSame: false,
    canAppearOnInvoice: false,
    enableContactEmail: false,
    showModal: false,
    user: {
      details: {},
      companyContact: {
        contactAddress: {}
      },
      contractAddress: {},
      billingAddress: {}
    }
  };

  componentDidMount() {
    if (
      this.props.location.state != null ||
      this.props.location.state != undefined
    ) {
      console.log("Calling..");
      this.fetchClient();
    }
  }

  onChangeAction = () => {
    console.log("isBillingAddressSame :: ", this.state.isBillingAddressSame);
    this.setState(
      {
        isBillingAddressSame: !this.state.isBillingAddressSame // flip boolean value
      },
      function() {
        // console.log(this.state);
      }.bind(this)
    );
    /* 
    TODO: add logic for populating address, if true
     */
  };

  onChangeAppearOnInvoice = () => {
    console.log("this :: ", this);
    this.setState(
      {
        canAppearOnInvoice: !this.state.canAppearOnInvoice // flip boolean value
      },
      function() {
        // console.log(this.state);
      }.bind(this)
    );
  };

  handleChange = event => {
    // console.log("this.state :: ", this.state);
    // console.log("event.id :: ", event.target.id);
    // console.log("event.value :: ", event.target.value);
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    });
    if (this.state.user.companyContact.transmissionType === "email") {
      this.setState({ enableContactEmail: true });
    }
  };

  handleChangeDetails = event => {
    this.setState({
      user: {
        ...this.state.user,
        details: {
          ...this.state.user.details,
          [event.target.name]: event.target.value
        }
      }
    });
  };

  handleChangeContact = event => {
    this.setState({
      user: {
        ...this.state.user,
        companyContact: {
          ...this.state.user.companyContact,
          [event.target.name]: event.target.value
        }
      }
    });
  };

  handleCompanyContactAddress = event => {
    this.setState({
      user: {
        ...this.state.user,
        companyContact: {
          ...this.state.user.companyContact,
          contactAddress: {
            ...this.state.user.companyContact.contactAddress,
            [event.target.name]: event.target.value
          }
        }
      }
    });
  };

  handleChangeBilling = event => {
    this.setState({
      user: {
        ...this.state.user,
        billingAddress: {
          ...this.state.user.billingAddress,
          [event.target.name]: event.target.value
        }
      }
    });
  };

  handleChangeContractAddress = event => {
    this.setState({
      user: {
        ...this.state.user,
        contractAddress: {
          ...this.state.user.contractAddress,
          [event.target.name]: event.target.value
        }
      }
    });
  };

  validate = () => {
    /***
     apply validations here,
     also check if currentUser is empty or not
       */
    let companyNameError = "";
    if (
      this.state.user.details.name === null ||
      this.state.user.details.name === undefined ||
      this.state.user.details.name === ""
    ) {
      companyNameError = "Empty/Invalid company name";
    }
    console.log(companyNameError);
    //for email we can check like (this.state.user.details.name.includes('@)))
  };

  get initialState() {
    return {
      isBillingAddressSame: false,
      canAppearOnInvoice: false,
      enableContactEmail: false,
      showModal: false,
      user: {
        details: {},
        companyContact: {
          contactAddress: {}
        },
        contractAddress: {},
        billingAddress: {}
      }
    };
  }

  handleSubmit = async event => {
    console.log("Inside........");
    console.log("this.state.user : ", this.state.user);
    // const isValidForm = this.validate();
    // if (isValidForm) {
    event.preventDefault();
    const resp = await fetch("https://localhost:8080/company/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.user)
    });
    const data = await resp.status;
    if (data == 200) {
      alert("Client updated!");
      this.setState(this.initialState);
      // this.setState({ ...this.state, showModal: true });
    }
    console.log("data >>>> ", data);
    // }
  };

  fetchClient = async event => {
    const resp = await fetch(
      `https://localhost:8080/company/${this.props.location.state.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const data = await resp.json();
    console.log(data);
    this.setState(...this.state, { user: data });
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Tabs>
            <TabList>
              <Tab>Details</Tab>
              <Tab>Contact</Tab>
              <Tab>Contract Address</Tab>
              <Tab>Billing Address</Tab>
            </TabList>

            {/* Company Details section */}
            <TabPanel>
              <Form.Group row>
                <Form.Label column sm="2">
                  Company
                </Form.Label>
                <Col sm={10} className="float-right">
                  <Form.Control
                    type="text"
                    placeholder="Enter company name"
                    name="companyName"
                    value={this.state.user.companyName}
                    onChange={this.handleChange}
                    required="required"
                  />
                </Col>
              </Form.Group>

              <Form.Group row>
                <Form.Label column sm="2">
                  Company Abbrev
                </Form.Label>
                <Col sm={10} className="float-right">
                  <Form.Control
                    type="text"
                    placeholder="Enter company short name"
                    name="abbreviation"
                    value={this.state.user.abbreviation}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group row>
                <Form.Label column sm="2">
                  Address 1
                </Form.Label>
                <Col sm={10} className="float-right">
                  <Form.Control
                    type="text"
                    placeholder="Enter address 1"
                    name="address1"
                    value={this.state.user.details.address1}
                    onChange={this.handleChangeDetails}
                  />
                </Col>
              </Form.Group>

              <Form.Group row>
                <Form.Label column sm="2">
                  Address 2
                </Form.Label>
                <Col sm={10} className="float-right">
                  <Form.Control
                    type="text"
                    placeholder="Enter address 2"
                    name="address2"
                    value={this.state.user.details.address2}
                    onChange={this.handleChangeDetails}
                  />
                </Col>
              </Form.Group>

              <Form.Group row>
                <Form.Label column sm="2">
                  Address 3
                </Form.Label>
                <Col sm={10} className="float-right">
                  <Form.Control
                    type="text"
                    placeholder="Enter address 3"
                    name="address3"
                    value={this.state.user.details.address3}
                    onChange={this.handleChangeDetails}
                  />
                </Col>
              </Form.Group>

              <Form.Group row>
                <Form.Label column sm="2">
                  City
                </Form.Label>
                <Col sm={10} className="float-right">
                  <Form.Control
                    type="text"
                    placeholder="Enter city"
                    name="city"
                    value={this.state.user.details.city}
                    onChange={this.handleChangeDetails}
                  />
                </Col>
              </Form.Group>

              <Form.Group row>
                <Form.Label column sm="2">
                  Province/State
                </Form.Label>
                <Col sm={10} className="float-right">
                  <Form.Control
                    type="text"
                    placeholder="Enter province/state"
                    name="state"
                    value={this.state.user.details.state}
                    onChange={this.handleChangeDetails}
                  />
                </Col>
              </Form.Group>

              <Form.Group row>
                <Form.Label column sm="2">
                  Country
                </Form.Label>
                <Col sm={10} className="float-right">
                  <Form.Control
                    type="text"
                    placeholder="Enter country name"
                    name="country"
                    value={this.state.user.details.country}
                    onChange={this.handleChangeDetails}
                  />
                </Col>
              </Form.Group>

              <Form.Group row>
                <Form.Label column sm="2">
                  Postal/Zip Code
                </Form.Label>
                <Col sm={10} className="float-right">
                  <Form.Control
                    type="text"
                    placeholder="Enter postal/zip code"
                    name="zip"
                    value={this.state.user.details.zip}
                    onChange={this.handleChangeDetails}
                  />
                </Col>
              </Form.Group>
            </TabPanel>

            {/* Contact details section */}
            <TabPanel>
              <h2>Contact details here</h2>
              <Form>
                <Form.Group row>
                  <Form.Label column sm="2">
                    First Name
                  </Form.Label>
                  <Col sm={10} className="float-right">
                    <Form.Control
                      type="text"
                      placeholder="Enter first name"
                      name="firstName"
                      value={this.state.user.companyContact.firstName}
                      onChange={this.handleChangeContact}
                    />
                  </Col>
                </Form.Group>
                <Form.Group row>
                  <Form.Label column sm="2">
                    Last Name
                  </Form.Label>
                  <Col sm={10} className="float-right">
                    <Form.Control
                      type="text"
                      placeholder="Enter last name"
                      name="lastName"
                      value={this.state.user.companyContact.lastName}
                      onChange={this.handleChangeContact}
                    />
                  </Col>
                </Form.Group>
                <Form.Group row>
                  <Form.Label column sm="2">
                    Address
                  </Form.Label>
                  <Col sm={10} className="float-right">
                    <Form.Control
                      type="text"
                      placeholder="Enter address 1"
                      name="address1"
                      value={
                        this.state.user.companyContact.contactAddress.address1
                      }
                      onChange={this.handleCompanyContactAddress}
                    />
                  </Col>
                </Form.Group>
                <Form.Group row>
                  <Form.Label column sm="2" />
                  <Col sm={10} className="float-right">
                    <Form.Control
                      type="text"
                      placeholder="Enter address 2"
                      name="address2"
                      value={
                        this.state.user.companyContact.contactAddress.address2
                      }
                      onChange={this.handleCompanyContactAddress}
                    />
                  </Col>
                </Form.Group>
                <Form.Group row>
                  <Form.Label column sm="2" />
                  <Col sm={10} className="float-right">
                    <Form.Control
                      type="text"
                      placeholder="Enter address 3"
                      name="address3"
                      value={
                        this.state.user.companyContact.contactAddress.address3
                      }
                      onChange={this.handleCompanyContactAddress}
                    />
                  </Col>
                </Form.Group>
                {/* <Form.Group row>
                  <Form.Label column sm="2" />
                  <Col sm={10} className="float-right">
                    <input
                      type="checkbox"
                      checked={this.state.isBillingAddressSame}
                      onChange={this.onChangeAction}
                    />
                    <span style={{ padding: "10px" }}>Use Billing Address</span>
                    <Form.Label column sm="2" />
                    <input
                      type="checkbox"
                      checked={this.state.canAppearOnInvoice}
                      onChange={this.onChangeAppearOnInvoice}
                    />
                    <span style={{ padding: "10px" }}>Appear on Invoice</span>
                  </Col>
                </Form.Group> 
                <br />
                <Form.Group row>
                  <Form.Label column sm="2">
                    Transmission Type
                  </Form.Label>
                  <Col sm={10} className="float-right">
                    <select
                      className="browser-default custom-select"
                      name="transmissionType"
                      onChange={this.handleChange}
                    >
                      <option>Choose your option</option>
                      <option value="none">None</option>
                      <option value="paperMail">Paper Mail</option>
                      <option value="email">Email</option>
                    </select>
                  </Col>
                </Form.Group>*/}
                <br />
                <br />
                <Form.Group row>
                  <Form.Label column sm="2">
                    Email
                  </Form.Label>
                  <Col sm={10} className="float-right">
                    <Form.Control
                      type="email"
                      placeholder="Enter email id"
                      name="emailId"
                      value={this.state.user.companyContact.emailId}
                      onChange={this.handleChangeContact}
                    />
                  </Col>
                </Form.Group>
              </Form>
            </TabPanel>

            {/* Contract address section */}
            <TabPanel>
              <h2>Contract address here</h2>
              <Form>
                <Form.Group row>
                  <Form.Label column sm="2">
                    Address 1
                  </Form.Label>
                  <Col sm={10} className="float-right">
                    <Form.Control
                      type="text"
                      placeholder="Enter address 1"
                      name="address1"
                      value={this.state.user.contractAddress.address1}
                      onChange={this.handleChangeContractAddress}
                    />
                  </Col>
                </Form.Group>
                <Form.Group row>
                  <Form.Label column sm="2">
                    Address 2
                  </Form.Label>
                  <Col sm={10} className="float-right">
                    <Form.Control
                      type="text"
                      placeholder="Enter address 2"
                      name="address2"
                      value={this.state.user.contractAddress.address2}
                      onChange={this.handleChangeContractAddress}
                    />
                  </Col>
                </Form.Group>
                <Form.Group row>
                  <Form.Label column sm="2">
                    Address 3
                  </Form.Label>
                  <Col sm={10} className="float-right">
                    <Form.Control
                      type="text"
                      placeholder="Enter address 3"
                      name="address3"
                      value={this.state.user.contractAddress.address3}
                      onChange={this.handleChangeContractAddress}
                    />
                  </Col>
                </Form.Group>

                <Form.Group row>
                  <Form.Label column sm="2">
                    City
                  </Form.Label>
                  <Col sm={10} className="float-right">
                    <Form.Control
                      type="text"
                      placeholder="Enter city"
                      name="city"
                      value={this.state.user.contractAddress.city}
                      onChange={this.handleChangeContractAddress}
                    />
                  </Col>
                </Form.Group>

                <Form.Group row>
                  <Form.Label column sm="2">
                    Province/State
                  </Form.Label>
                  <Col sm={10} className="float-right">
                    <Form.Control
                      type="text"
                      placeholder="Enter province/state"
                      name="state"
                      value={this.state.user.contractAddress.state}
                      onChange={this.handleChangeContractAddress}
                    />
                  </Col>
                </Form.Group>

                <Form.Group row>
                  <Form.Label column sm="2">
                    Country
                  </Form.Label>
                  <Col sm={10} className="float-right">
                    <Form.Control
                      type="text"
                      placeholder="Enter country name"
                      name="country"
                      value={this.state.user.contractAddress.country}
                      onChange={this.handleChangeContractAddress}
                    />
                  </Col>
                </Form.Group>

                <Form.Group row>
                  <Form.Label column sm="2">
                    Postal/Zip Code
                  </Form.Label>
                  <Col sm={10} className="float-right">
                    <Form.Control
                      type="text"
                      placeholder="Enter postal/zip code"
                      name="zip"
                      value={this.state.user.contractAddress.zip}
                      onChange={this.handleChangeContractAddress}
                    />
                  </Col>
                </Form.Group>
              </Form>
            </TabPanel>

            {/* Billing address section */}
            <TabPanel>
              <h2>Billing address here</h2>
              <Form>
                <Form.Group row>
                  <Form.Label column sm="2">
                    Address 1
                  </Form.Label>
                  <Col sm={10} className="float-right">
                    <Form.Control
                      type="text"
                      placeholder="Enter address 1"
                      name="address1"
                      value={this.state.user.billingAddress.address1}
                      onChange={this.handleChangeBilling}
                    />
                  </Col>
                </Form.Group>
                <Form.Group row>
                  <Form.Label column sm="2">
                    Address 2
                  </Form.Label>
                  <Col sm={10} className="float-right">
                    <Form.Control
                      type="text"
                      placeholder="Enter address 2"
                      name="address2"
                      value={this.state.user.billingAddress.address2}
                      onChange={this.handleChangeBilling}
                    />
                  </Col>
                </Form.Group>
                <Form.Group row>
                  <Form.Label column sm="2">
                    Address 3
                  </Form.Label>
                  <Col sm={10} className="float-right">
                    <Form.Control
                      type="text"
                      placeholder="Enter address 3"
                      name="address3"
                      value={this.state.user.billingAddress.address3}
                      onChange={this.handleChangeBilling}
                    />
                  </Col>
                </Form.Group>

                <Form.Group row>
                  <Form.Label column sm="2">
                    City
                  </Form.Label>
                  <Col sm={10} className="float-right">
                    <Form.Control
                      type="text"
                      placeholder="Enter city"
                      name="city"
                      value={this.state.user.billingAddress.city}
                      onChange={this.handleChangeBilling}
                    />
                  </Col>
                </Form.Group>

                <Form.Group row>
                  <Form.Label column sm="2">
                    Province/State
                  </Form.Label>
                  <Col sm={10} className="float-right">
                    <Form.Control
                      type="text"
                      placeholder="Enter province/state"
                      name="state"
                      value={this.state.user.billingAddress.state}
                      onChange={this.handleChangeBilling}
                    />
                  </Col>
                </Form.Group>

                <Form.Group row>
                  <Form.Label column sm="2">
                    Country
                  </Form.Label>
                  <Col sm={10} className="float-right">
                    <Form.Control
                      type="text"
                      placeholder="Enter country name"
                      name="country"
                      value={this.state.user.billingAddress.country}
                      onChange={this.handleChangeBilling}
                    />
                  </Col>
                </Form.Group>

                <Form.Group row>
                  <Form.Label column sm="2">
                    Postal/Zip Code
                  </Form.Label>
                  <Col sm={10} className="float-right">
                    <Form.Control
                      type="text"
                      placeholder="Enter postal/zip code"
                      name="zip"
                      value={this.state.user.billingAddress.zip}
                      onChange={this.handleChangeBilling}
                    />
                    <Form.Text style={{ fontSize: "12px" }}>
                      **Address used to determine the appropriate sales tax rate
                      to apply to invoices**
                    </Form.Text>
                  </Col>
                </Form.Group>
              </Form>
            </TabPanel>
          </Tabs>
          <Button
            variant="primary"
            type="submit"
            style={{ margin: "20px", textAlign: "right" }}
            onSubmit={this.handleSubmit}
          >
            Submit
          </Button>
        </Form>
        {/* <Modal show={this.state.showModal}>
          <Modal.Header closeButton>
            <Modal.Title>Client Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>Client updated successfully!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick="data-dismiss">
              Close
            </Button>
          </Modal.Footer>
        </Modal> */}
      </Container>
    );
  }
}

export default Client;
