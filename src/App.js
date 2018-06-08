import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/css/bootstrap.min.css';
import "./styles/custom.css";
import Navigation from './components/Navigation';

class App extends Component {
  render() {
    return (
      <div>
      <Navigation />
      <div className="container">
        <h1>Wine Lottery App</h1>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">Participant Name</th>
      <th scope="col">Delete name from the list</th>

    </tr>
  </thead>
  <tbody>
   
    <tr>
      <th scope="row">Matti Meikäläinen</th>
      <td><button className="btn btn-warning btn-sm">Delete name</button></td>

      </tr>
  </tbody>
</table>
      </div>
      </div>
    );
  }
}

export default App;
