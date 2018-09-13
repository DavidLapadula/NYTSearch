import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron"
import Card from "../../components/Card"

class Articles extends Component {


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="12">
            <Jumbotron>
              <p className="display-2">React to the NYT</p>
              <h3 className="font-3">Search, Save, Visit, and Comment on headlines!</h3>
            </Jumbotron>
            <Card
              header="Search"
            >
            </Card>
            <Card
              header="Results"
            >
            </Card>
            <Card
              header="Saved"
            >
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;