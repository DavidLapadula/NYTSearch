import React, { Component } from "react";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/SearchForm";
import { List, ListItem } from "../../components/List";
import Button from "../../components/Button";
import Jumbotron from "../../components/Jumbotron";
import Card from "../../components/Card";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class Articles extends Component {

  // state = {
  //   title: "",
  //   startDate: "",
  //   endDate: "",
  //   results: [],
  //   saved: []
  // };

  constructor(props) {
    super(props)
      this.state = {
        title: "",
        startDate: moment(), 
        endDate: moment(),
        results: [],
        saved: []
      }
  }

  handleChange = ({ startDate, endDate }) => {
    startDate = startDate || this.state.startDate
    endDate = endDate || this.state.endDate
    if (startDate.isAfter(endDate)) {
      endDate = startDate
    }
    this.setState({ startDate, endDate })
  }
  handleChangeStart = (startDate) => this.handleChange({ startDate })
  handleChangeEnd = (endDate) => this.handleChange({ endDate })

  // componentDidMount() {
  //   this.getAllSaved();
  // }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  handleFormSubmit = event => {
    event.preventDefault();

    if (2 > 1) {
      API.getArticles(
        this.state.title,
        this.state.startDate,
        this.state.endDate
      )
        .then(res => this.setState({
          results: [...res.data.response.docs]
        }))
        .then(() => {
          console.log(this.state.results)
        })
        .catch(err => console.log(err));
    }
  };

  saveArticle = index => {
    let { headline: title, web_url: url, pub_date: date } = this.state.results[index]

    API.saveArticle({
      title: title.main,
      url,
      date
    })
      .then(res => {
        this.getAllSaved();
      })
      .catch(err => console.log(err));
  }

  getAllSaved = () => {
    API.getSavedArticles()
      .then(res => this.setState({
        saved: [...res.data]
      }))
      .then(() => {
        console.log(this.state.saved)
      })
      .catch(err => console.log(err));
  }

  deleteArticle = (id) => {
    API.deleteArticle(id)
      .then(() => {
        console.log(this.state.saved)
        this.getAllSaved()
      })
      .catch(err => console.log(err));
  }


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
              <Col size="12">
                <form>
                  <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="title"
                    placeholder="Title (required)"
                  />
                  {/* <Input
                    value={this.state.startDate}
                    onChange={this.handleInputChange}
                    name="startDate"
                    placeholder="Start Date (required)"
                  />
                  <Input
                    value={this.state.endDate}
                    onChange={this.handleInputChange}
                    name="endDate"
                    placeholder="End Date (required)"
                  /> */}
                  <DatePicker
                    selected={this.state.startDate}
                    selectsStart
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeStart}
                  />

                  <DatePicker
                    selected={this.state.endDate}
                    selectsEnd
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeEnd}
                  />

                  <FormBtn
                    disabled={!this.state.title}
                    onClick={this.handleFormSubmit}
                  >
                    Submit Article
              </FormBtn>
                </form>
              </Col>
            </Card>
            <Card
              header="Results"
            >
              {this.state.results.length ? (
                <List>
                  {this.state.results.map((article, index) => (
                    <ListItem
                      key={article.web_url}
                      url={article.web_url}
                      title={article.headline.main}
                      date={article.pub_date}>
                      <Button onClick={() => this.saveArticle(index)}>
                        Save!
                      </Button>
                    </ListItem>
                  ))}
                </List>
              ) : (
                  <h3>No Results to Display</h3>
                )}
            </Card>
            <Card
              header="Saved"
            >
              {this.state.saved.length ? (
                <List>
                  {this.state.saved.map((saved) => (
                    <ListItem
                      key={saved._id}
                      url={saved.url}
                      title={saved.title}
                      date={saved.date}>
                      <Button onClick={() => this.deleteArticle(saved._id)}>
                        Delete
                      </Button>
                    </ListItem>
                  ))}
                </List>
              ) : (
                  <h3>Nothing Saved</h3>
                )}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
