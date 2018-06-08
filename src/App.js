import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/css/bootstrap.min.css';
import "./styles/custom.css";
import firebase from './firebase'


import Navigation from './components/Navigation';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); // <-- add this line
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      user: this.state.username
    }
    itemsRef.push(item);
    this.setState({
      currentItem: '',
      username: ''
    });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  componentDidMount() {
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        });
      }
      this.setState({
        items: newState
      });
    });
  }
  
  render() {

    return (
      <div>
        <Navigation />
       
        <div className="container">
        <ul>
        {this.state.items.map((item) => {
          return (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>brought by: {item.user}</p>
            </li>
          )
        })}
      </ul>          <h1>Wine Lottery App</h1>
          <form onSubmit={this.handleSubmit}>
          <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
          <input type="text" name="currentItem" placeholder="What are you bringing ?" onChange={this.handleChange} value={this.state.currentItem} />
          <button>Add Item</button>
        </form>
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
