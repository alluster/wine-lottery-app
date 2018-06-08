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
      // randomName: "",
    }
    this.handleChange = this.handleChange.bind(this);
    // this.getRandomName = this.getRandomName.bind(this);
    
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
  
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  // getRandomName() {
  //   console.log(this.state.items)
  //   const { items } = this.state
  //   var randomItem = items[Math.floor(Math.random()*items.length)];
  //   this.setState({ randomNames: [...this.state.randomNames, randomItem] }) //add name to random list
  //   return this.setState({randomName: randomItem})
  //     }

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
  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  render() {

    return (
      <div>
        <Navigation />

        <div className="container">

          <h1>Wine Lottery App</h1>
          <p> {this.state.randomName}</p>

          <form onSubmit={this.handleSubmit}>
          <div className="form-group  margin-top-50">

            <input type="text" className="form-control" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
            <button className="btn btn-primary btn-lg margin-top-50" >Submit name to the wine lottery</button>
            </div>
          </form>
          <table className="table  margin-top-50">
            <thead>
              <tr>
                <th scope="col">Participant Name</th>
                <th scope="col">Delete name from the list</th>

              </tr>
            </thead>
            <tbody>
                {this.state.items.map((item) => {
                  return (
                    <tr>
                      <th key={item.id}>
                        {item.user}
                      </th>
                      <td key={item.id}>
                        <button className="btn btn-sm btn-primary"onClick={() => this.removeItem(item.id)}>Remove name from the list</button>
                      </td>
                    </tr>
                  )
                })}

            </tbody>
          </table>

          <button className="btn btn-sm btn-primary">Lotter Name</button>
          </div>
      </div>
    );
  }
}

export default App;
