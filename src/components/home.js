
import React from "react";

class home extends React.Component {
  redirect = () => {
    this.props.history.push("/getData/");
  };

  render() {
    return (
      <div>
        <h1>Hello Shivani</h1>
        <button onClick={this.redirect}>Fetch data</button>
      </div>
    );
  }
}

export default home;
