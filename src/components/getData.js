import React from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as constants from './../constant'


class FetchData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      nextPage: -1,
    };

    this.prevButtonClick = this.prevButtonClick.bind(this);
    this.nextButtonClick = this.nextButtonClick.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
  }

  limit = 10;
  page = 1;

  redirectToHome = () => {
    this.props.history.push("/");
  };

  componentDidMount() {
    this.fetchDataFromApi({});
  }

  fetchDataFromApi(data) {
    fetch(`${constants.APIURL}users/?page=${this.page}&limit=${this.limit}`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.getData.data,
            nextPage: result.getData.nextPage,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  nextButtonClick() {
    console.log(this, "(****");
    console.log("in next button", this.state.nextPage);
    this.page = this.state.nextPage;
    this.fetchDataFromApi();
  }

  prevButtonClick() {
    console.log("in prev button", this.state.nextPage);
    this.page = this.page - 1;
    this.fetchDataFromApi();
  }

  refreshPage() {
    console.log("refresh page", this.state.nextPage);

    this.fetchDataFromApi();
  }

  renderTableData() {
    return this.state.items.map((student, index) => {
      const { id, body, name, email, postId } = student; //destructuring
      return (
        <tr key={id}>
          <td>{postId}</td>
          <td>{id}</td>
          <td>{name}</td>
          <td>{email}</td>
          <td>{body}</td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    let header = Object.keys(this.state.items[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <h1>
            Data from API <Button onClick={this.redirectToHome} style={{ marginLeft: 400 }}>Back</Button>
          </h1>

          <table id="students">
            <tbody>
              <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
            </tbody>
          </table>

          <Button
            style={{ marginRight: 20 }}
            variant="primary"
            disabled={this.page === 1}
            onClick={this.prevButtonClick}
          >
            Prev Page
          </Button>
          <Button
            variant="secondary"
            style={{ marginRight: 20 }}
            disabled={this.state.nextPage === -1}
            onClick={this.nextButtonClick}
          >
            Next Page
          </Button>

          <Button variant="secondary" onClick={this.refreshPage}>
            Refresh
          </Button>
        </div>
      );
    }
  }
}

export default FetchData;
