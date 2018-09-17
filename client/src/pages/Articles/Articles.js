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
import swal from 'sweetalert';

class Articles extends Component {

  //Set the state
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      startDate: moment(),
      endDate: moment(),
      results: [],
      saved: [],
      date: moment().format("DD-MM-YYYY")
    }
  }
  //When the page loads, query the db for all saved articles
  componentDidMount() {
    this.getAllSaved();
  }

  // Funtctions for handling the date value of the picker element
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

  // Function for setting the title of the word to be searched
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  // When the user submits a form, check if all the values are the state
  // then query the NYT api and set the results array to the results using spread
  handleFormSubmit = event => {
    event.preventDefault();

    if (!this.state.title) {
      swal({
        title: "You need to enter a title!",
        icon: "warning",
        dangerMode: true,
      });
      return;
    }
    if (this.state.title && this.state.startDate && this.state.endDate) {
      this.setState({
        results: []
      })
      API.getArticles(
        this.state.title,
        this.state.startDate.format("YYYYMMDD"),
        this.state.endDate.format("YYYYMMDD")
      )
        .then((res) => {
          if (res.data.response.docs.length) {
            for (let i = 0; i < 5; i++) {
              this.setState({
                results: this.state.results.concat(res.data.response.docs[i])
              })
            }

          } else {
            swal({
              title: "Nothing to show! Try Again",
              icon: "warning",
              dangerMode: true,
            })
          }

        })
        .catch(err => console.log(err));
    }

  };

  // when a save button is clicked, de-structure the results array at the index specified and save it to the db
  // when that is done, query the db for all the saved articles
  saveArticle = index => {
    let { headline: title, web_url: url, pub_date: date } = this.state.results[index]
    this.setState({
      results: this.state.results.filter((_, i) => i !== index)
    });
    let savedDate = this.state.date; 
    API.saveArticle({
      title: title.main,
      url,
      date, 
      savedDate
    })
      .then(res => {
        this.getAllSaved();
      })
      .catch(err => console.log(err));
  };

  // function for getting all the saved articles and spreading them into the saved array
  getAllSaved = () => {
    API.getSavedArticles()
      .then(res => this.setState({
        saved: [...res.data]
      }))
      .catch(err => console.log(err));
  };

  // delete saved article at specified id and then get all the saved articles from the database
  deleteArticle = (id) => {
    API.deleteArticle(id)
      .then(() => {
        this.getAllSaved()
      })
      .catch(err => console.log(err));
  };


  render() {
    return (
      <Row className="w-100 full-br">
        <Col size="12" className="p-0">
          <Jumbotron>
            <p className="display-2">React to the NYT</p>
            <h3 className="font-3">Search and save articles!</h3>
          </Jumbotron>
          <Row>
            {/* Check if there are any to save using ternary */}
            <Col size="lg-6" className="p-0">
              <Card header="Saved" className="cardBr">
                {this.state.saved.length ? (
                  <List>
                    {this.state.saved.map((saved) => (
                      <ListItem
                        key={saved._id}
                        url={saved.url}
                        title={saved.title}
                        savedDate={saved.savedDate}
                        date={moment(saved.date, "YYYY-MM-DD").format("DD-MM-YYYY")}>
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
            {/* Input Card for sending queries */}
            <Col size="lg-6" className="p-0">
              <Card header="Search">
                <form>
                  <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="title"
                    placeholder="Title (required)"
                  />
                  {/* Sub row for saved and search cards */}
                  <Row>
                    <Col size="sm-6" className="p-0">
                      <p className="d-inline">Start:</p>
                      <DatePicker
                        className="rounded p-1"
                        selected={this.state.startDate}
                        selectsStart
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChangeStart}
                      />
                    </Col>
                    <Col size="sm-6" className="p-0">
                      <p className="d-inline">End:</p>
                      <DatePicker
                        className="rounded p-1"
                        selected={this.state.endDate}
                        selectsEnd
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChangeEnd}
                      />
                    </Col>
                  </Row>
                  <FormBtn
                    // disabled={!this.state.title}
                    onClick={this.handleFormSubmit}>
                    Submit Search
                  </FormBtn>
                </form>
              </Card>
            </Col>
          </Row>
          {/* Card for displaying the query results
              Using ternary to check if they are there and
              display message if they are not */}
          <Card header="Results">
            {this.state.results.length ? (
              <List>
                {this.state.results.map((article, index) => (
                  <ListItem
                    key={article.web_url}
                    url={article.web_url}
                    title={article.headline.main}
                    date={moment(article.pub_date, "YYYY-MM-DD").format("DD-MM-YYYY")}>
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
        </Col>
      </Row>
    );
  }
}

export default Articles;
